/**
 * Display-only masks for pay-link destinations.
 * Copy actions still use the full value.
 */

/** "0712345678" / "254712345678" → "07** *** 678" */
export function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  const local =
    digits.startsWith("254") && digits.length === 12
      ? `0${digits.slice(3)}`
      : digits;
  if (local.length < 7) return phone;
  return `${local.slice(0, 2)}** *** ${local.slice(-3)}`;
}

/** Till, business number, or account — keep ends, star the middle. */
export function maskCode(raw: string): string {
  const s = raw.trim();
  if (s.length <= 2) return s;
  if (s.length <= 4) {
    return `${s[0]}${"*".repeat(s.length - 2)}${s[s.length - 1]}`;
  }
  const keepStart = 2;
  const keepEnd = 2;
  const middle = s.length - keepStart - keepEnd;
  return `${s.slice(0, keepStart)}${"*".repeat(middle)}${s.slice(-keepEnd)}`;
}

export function maskPayIdentifier(
  kind: "PHONE" | "TILL" | "PAYBILL",
  value: string,
): string {
  return kind === "PHONE" ? maskPhone(value) : maskCode(value);
}
