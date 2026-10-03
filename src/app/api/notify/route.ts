import { NextResponse } from "next/server";

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

export async function POST(request: Request) {
  if (rateLimited(clientIp(request))) {
    return NextResponse.json(
      { error: "Too many tries. Wait a bit and try again." },
      { status: 429 },
    );
  }

  let body: { email?: unknown; company?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }

  if (typeof body.company === "string" && body.company.trim()) {
    return NextResponse.json({ ok: true });
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  if (!EMAIL.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }

  const webhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhook) {
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
