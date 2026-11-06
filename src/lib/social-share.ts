import { socialPlatforms } from "@/lib/socials";

/** Matches Android SocialLink.Platform.storageKey values. */
export const socialSharePlatforms = [
  "whatsapp",
  "facebook",
  "instagram",
  "tiktok",
  "youtube",
  "x",
  "telegram",
  "linkedin",
  "threads",
] as const;

export type SocialSharePlatform = (typeof socialSharePlatforms)[number];

const labels: Record<SocialSharePlatform, string> = {
  whatsapp: "WhatsApp",
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  x: "X",
  telegram: "Telegram",
  linkedin: "LinkedIn",
  threads: "Threads",
};

export function isSocialSharePlatform(value: string): value is SocialSharePlatform {
  return (socialSharePlatforms as readonly string[]).includes(value.toLowerCase());
}

export function socialShareLabel(platform: SocialSharePlatform): string {
  return labels[platform];
}

export function canonicalSocialHandle(
  platform: SocialSharePlatform,
  raw: string
): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (platform === "whatsapp") {
    const digits = trimmed.replace(/\D/g, "");
    return digits.length >= 9 && digits.length <= 15 ? digits : null;
  }
  if (platform === "linkedin") {
    const clean = trimmed
      .replace(/^https?:\/\//i, "")
      .replace(/^www\./i, "")
      .replace(/^linkedin\.com\/in\//i, "")
      .replace(/^linkedin\.com\//i, "")
      .replace(/^\/+|\/+$/g, "")
      .replace(/[^A-Za-z0-9_-]/g, "")
      .slice(0, 100);
    return clean || null;
  }
  if (platform === "youtube") {
    const clean = trimmed
      .replace(/^@/, "")
      .replace(/^https?:\/\//i, "")
      .replace(/^www\./i, "")
      .replace(/^youtube\.com\//i, "")
      .replace(/^@/, "")
      .replace(/[^A-Za-z0-9_.-]/g, "")
      .slice(0, 100);
    return clean || null;
  }
  const clean = trimmed
    .replace(/^@/, "")
    .replace(/\/+$/, "")
    .split("/")
    .pop()!
    .replace(/[^A-Za-z0-9._-]/g, "")
    .slice(0, 64);
  return clean || null;
}

export function socialProfileUrl(platform: SocialSharePlatform, handle: string): string {
  const clean = canonicalSocialHandle(platform, handle) || handle.replace(/^@/, "");
  switch (platform) {
    case "instagram":
      return `https://instagram.com/${clean}`;
    case "x":
      return `https://x.com/${clean}`;
    case "tiktok":
      return `https://www.tiktok.com/@${clean}`;
    case "whatsapp":
      return `https://wa.me/${clean}`;
    case "telegram":
      return `https://t.me/${clean}`;
    case "youtube":
      return `https://youtube.com/@${clean}`;
    case "facebook":
      return `https://facebook.com/${clean}`;
    case "linkedin":
      return `https://www.linkedin.com/in/${clean}`;
    case "threads":
      return `https://www.threads.net/@${clean}`;
  }
}

export function socialSharePreview(
  platform: SocialSharePlatform,
  handle: string
): { title: string; description: string; displayHandle: string } {
  const label = socialShareLabel(platform);
  const displayHandle =
    platform === "whatsapp"
      ? handle
      : platform === "linkedin"
        ? handle
        : `@${handle.replace(/^@/, "")}`;
  return {
    title: `${label} ${displayHandle} · LipaBill`,
    description: `Find me on ${label} (${displayHandle}). Open this LipaBill link to continue in the app or on the web.`,
    displayHandle,
  };
}

/** Marketing page labels — keep in sync for docs. */
export const socialSharePlatformLabels = socialPlatforms;
