import { NextResponse } from "next/server";
import { site } from "@/lib/site";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WINDOW_MS = 60 * 60 * 1000;
const MAX_HITS = 8;

const hits = new Map<string, number[]>();

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "local";
}

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_HITS) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function trustedHost(hostname: string) {
  if (
    hostname === new URL(site.url).hostname ||
    hostname === "localhost" ||
    hostname === "127.0.0.1"
  ) {
    return true;
  }
  // This deployment only (set by Vercel) — never a blanket *.vercel.app allow.
  const hosts = [
    process.env.VERCEL_URL,
    process.env.VERCEL_BRANCH_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
  ]
    .filter(Boolean)
    .map((value) => String(value).replace(/^https?:\/\//, "").split("/")[0]);
  return hosts.includes(hostname);
}

/** Reject cross-site POSTs (CSRF / drive-by list pollution). */
function isTrustedBrowserRequest(request: Request) {
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      return trustedHost(new URL(origin).hostname);
    } catch {
      return false;
    }
  }

  const referer = request.headers.get("referer");
  if (referer) {
    try {
      return trustedHost(new URL(referer).hostname);
    } catch {
      return false;
    }
  }

  return false;
}

function isAllowedWebhook(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return false;
    return (
      parsed.hostname === "script.google.com" ||
      parsed.hostname.endsWith(".google.com") ||
      parsed.hostname.endsWith(".googleusercontent.com")
    );
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!isTrustedBrowserRequest(request)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  if (rateLimited(clientIp(request))) {
    return NextResponse.json(
      { error: "Too many tries. Wait a bit and try again." },
      { status: 429 },
    );
  }

  let body: { email?: unknown; company?: unknown; consent?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }

  // Honeypot — filled fields look like success to bots.
  if (typeof body.company === "string" && body.company.trim()) {
    return NextResponse.json({ ok: true });
  }

  if (body.consent !== true) {
    return NextResponse.json(
      { error: "Tick the box if you want product notes." },
      { status: 400 },
    );
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  if (!EMAIL.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }

  const webhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhook || !isAllowedWebhook(webhook)) {
    return NextResponse.json(
      { error: "Signup isn't available yet." },
      { status: 503 },
    );
  }

  try {
    const sheet = await fetch(webhook, {
      method: "POST",
      redirect: "manual",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        submittedAt: new Date().toISOString(),
      }),
    });

    const accepted =
      sheet.ok || sheet.status === 301 || sheet.status === 302 || sheet.status === 0;
    if (!accepted) {
      return NextResponse.json(
        { error: "Couldn't save that. Try again." },
        { status: 502 },
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Couldn't save that. Try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
