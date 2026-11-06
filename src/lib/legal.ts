import { playStore, site } from "@/lib/site";

/** Public legal facts. Do not invent a company number, PIN, or street address here. */
export const legal = {
  updatedIso: "2026-11-02",
  updatedLabel: "2 November 2026",
  tradingName: "LipaBill",
  product: "LipaBill Android app and lipabill.app",
  country: "Kenya",
  countryCode: "KE",
  email: site.email,
  packageId: "com.lipabill.app",
  playUrl: playStore.url,
  governingLaw: "the laws of Kenya",
  odpc: "https://www.odpc.go.ke/",
  cookieName: "lb_consent",
  cookieMaxAgeDays: 180,
} as const;

export const legalPaths = {
  privacy: "/privacy",
  terms: "/terms",
  cookies: "/cookies",
  refunds: "/refunds",
  licenses: "/licenses",
  delete: "/delete",
  support: "/support",
} as const;

export const thirdPartyMarks = [
  "Safaricom",
  "M-Pesa",
  "Airtel",
  "Airtel Money",
  "KCB",
  "Equity",
  "MTN",
  "Google Play",
  "Madaraka Express",
  "SGR",
  "WhatsApp",
  "Facebook",
  "Instagram",
  "TikTok",
  "YouTube",
  "X",
  "Telegram",
  "LinkedIn",
  "Threads",
] as const;
