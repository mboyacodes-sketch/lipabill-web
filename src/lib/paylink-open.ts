/** Client-side open helpers for the pay-link landing (no raw URL concat). */

export const MPESA_PACKAGE = "com.safaricom.mpesa.lifestyle";
export const MPESA_SCHEME_URL = "fintechoneapp://open";
export const MPESA_INTENT_URL =
  `intent://open#Intent;scheme=fintechoneapp;package=${MPESA_PACKAGE};end`;
export const MPESA_STORE_URL =
  `https://play.google.com/store/apps/details?id=${MPESA_PACKAGE}`;
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.lipabill.app";

const TOKEN_ALPHABET =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

/** Same rules as paylink.js tokenFrom — base62, length 8–40. */
export function sanitizePayToken(raw: string | null | undefined): string | null {
  const trimmed = (raw || "").trim();
  if (!trimmed) return null;
  const lower = trimmed.toLowerCase();
  let body: string | null = null;
  const markers = ["lipabill://p/", "https://lipabill.app/p/"] as const;
  for (const marker of markers) {
    if (lower.startsWith(marker)) {
      body = trimmed.slice(marker.length);
      break;
    }
  }
  if (body == null) {
    if (lower.includes("://") || lower.includes("/") || lower.includes(".")) {
      return null;
    }
    body = trimmed;
  }
  const clean = body.split("?")[0].split("#")[0].replace(/^\/+|\/+$/g, "").split("/")[0];
  if (clean.length < 8 || clean.length > 40) return null;
  for (const ch of clean) {
    if (!TOKEN_ALPHABET.includes(ch)) return null;
  }
  return clean;
}

export function openLipaBill(token: string): boolean {
  const clean = sanitizePayToken(token);
  if (!clean) return false;
  window.location.href = `lipabill://p/${clean}`;
  return true;
}

export function openPlayStore(): void {
  window.location.href = PLAY_STORE_URL;
}

/**
 * Opens My OneApp when installed. Falls back to Play Store only if the page
 * is still visible after a short wait.
 */
export function openMpesa(): void {
  if (!/Android/i.test(navigator.userAgent || "")) {
    window.location.href = MPESA_STORE_URL;
    return;
  }

  let leftPage = false;
  const markLeft = () => {
    leftPage = true;
  };
  const onVisibility = () => {
    if (document.hidden) markLeft();
  };
  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("pagehide", markLeft);
  window.addEventListener("blur", markLeft);

  window.location.href = MPESA_INTENT_URL;

  window.setTimeout(() => {
    if (leftPage || document.hidden) return;
    window.location.href = MPESA_SCHEME_URL;
  }, 350);

  window.setTimeout(() => {
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("pagehide", markLeft);
    window.removeEventListener("blur", markLeft);
    if (leftPage || document.hidden) return;
    window.location.href = MPESA_STORE_URL;
  }, 1600);
}

export async function copyText(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const area = document.createElement("textarea");
  area.value = text;
  document.body.appendChild(area);
  area.select();
  try {
    document.execCommand("copy");
  } finally {
    document.body.removeChild(area);
  }
}
