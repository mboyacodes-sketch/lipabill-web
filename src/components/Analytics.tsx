"use client";

import { Analytics as VercelAnalytics, type BeforeSendEvent } from "@vercel/analytics/next";

/**
 * Collapse pay and social share paths so unique tokens/handles do not
 * fragment traffic. Never leave payment identifiers in the URL we send.
 */
export function redactAnalyticsUrl(url: string): string {
  try {
    const parsed = new URL(url, "https://lipabill.app");
    const parts = parsed.pathname.split("/").filter(Boolean);

    if (parts[0] === "p") {
      parsed.pathname = parts.length >= 2 ? "/p/[token]" : "/p";
      parsed.search = "";
      parsed.hash = "";
      return parsed.toString();
    }

    if (parts[0] === "s" && parts.length >= 3) {
      parsed.pathname = `/s/[platform]/[handle]`;
      parsed.search = "";
      parsed.hash = "";
      return parsed.toString();
    }

    return parsed.toString();
  } catch {
    return url;
  }
}

function beforeSend(event: BeforeSendEvent): BeforeSendEvent | null {
  return { ...event, url: redactAnalyticsUrl(event.url) };
}

export function Analytics() {
  return <VercelAnalytics beforeSend={beforeSend} />;
}
