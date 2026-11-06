/** Platforms supported in Android SocialLink.Platform (Request → Socials). */
export const socialPlatforms = [
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

export const socialsPath = "/socials";

export const socialsCopy = {
  kicker: "Request · Socials",
  title: "Share your socials",
  short:
    "Save the handles you use. Friends scan a code and land on your page — app if they have it, web if they don’t.",
  detail:
    "On Request, switch to Socials. Add WhatsApp, Instagram, TikTok, and more from +. Tap a row for the code, swipe right to edit, left to remove. Handles stay on this phone only — LipaBill does not host a public profile page for you.",
} as const;
