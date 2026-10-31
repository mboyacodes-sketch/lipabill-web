export const site = {
  name: "LipaBill",
  url: "https://lipabill.app",
  email: "support@lipabill.app",
  locale: "en_KE",
  title: "LipaBill — Your money has a story. See it clearly.",
  description:
    "Rent, family, a night out, the train you already booked. LipaBill is a local-first money tracker for Kenya on Google Play — the ledger stays on this phone, then you can send, pay, or show the code even when data is weak. Tanzania, Uganda, and Rwanda are coming soon.",
  shortDescription:
    "Your money has a story. See it clearly — then send, pay, or show the code.",
  keywords: [
    "LipaBill",
    "East Africa money tracker",
    "local first finance Android",
    "mobile money Kenya Tanzania Uganda Rwanda",
    "money management Android Kenya",
    "Send money Android Kenya",
    "Paybill till Pochi",
    "SGR ticket QR",
    "Madaraka Express ticket",
    "see your money Kenya",
    "M-Pesa Airtel Money KCB ledger",
  ],
} as const;

/** Close of 6 November 2026, East Africa Time. Eight days after 29 October. */
export const launchAt = "2026-11-07T00:00:00+03:00";
export const launchDayIso = "2026-11-06";

/** When true, the homepage clock does not tick and a pause banner sits on top. */
export const launchCountdownPaused = true;

export const launchPauseCopy = {
  badge: "Paused",
  line: "The launch clock is paused for a moment.",
  detail: "We’re still lining up the picture.",
} as const;

/** Calendar day the countdown is counting down to, in East Africa Time. */
export function launchDayLabel() {
  const endOfLaunchDay = new Date(Date.parse(launchAt) - 1);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Nairobi",
  }).format(endOfLaunchDay);
}

export const playStore = {
  url: "https://play.google.com/store/apps/details?id=com.lipabill.app",
  enabled: true,
} as const;

/** True once the Play listing is public. Countdown and waitlist-as-hero yield to this. */
export const isPlayLive = playStore.enabled;

export const launchLiveCopy = {
  badge: "Live",
  line: "LipaBill is on Google Play.",
  detail:
    "Kenya, Android, today. See where the money went on this phone — not in a LipaBill cloud. Tanzania, Uganda, and Rwanda are coming soon.",
  cta: "Get the app",
} as const;

/** Play Console “Delete data URL” — https://lipabill.app/delete */
export const deleteDataPath = "/delete";

/** Homepage — customer questions only. */
export const homeFaqs = [
  {
    question: "What is LipaBill?",
    answer:
      "LipaBill is a local-first money tracker: where it went, what keeps costing you, and the next move — send, pay, get paid, or show the ticket you already bought. It is not a bank. Kenya is live on Google Play. Tanzania, Uganda, and Rwanda are coming soon. Send and Pay still run on Kenya M-Pesa today.",
  },
  {
    question: "Does it work when data is weak?",
    answer:
      "Yes. The picture stays on the phone, so history, pay QR, and tickets still open. Send and Pay still run on this device — even when the internet is slow.",
  },
  {
    question: "Are tickets part of that picture?",
    answer:
      "Yes. A ticket is what the money already became — the trip or the night out. A receive QR is money on its way in. Event passes, SGR / Madaraka Express, and a pay link sit with your history. Show them at the gate even without data.",
  },
  {
    question: "When can I download it?",
    answer: isPlayLive
      ? "LipaBill is on Google Play for Android in Kenya. Open the listing from this site. Tanzania, Uganda, and Rwanda are coming soon."
      : launchCountdownPaused
        ? "The launch clock is paused for a moment. Leave your email on this page and we’ll write when LipaBill is on Google Play."
        : `LipaBill comes to Android on ${launchDayLabel()}. Leave your email on this page and we’ll write when it’s on Google Play.`,
  },
] as const;

/** Support — includes how SMS and permissions work. */
export const supportFaqs = [
  ...homeFaqs,
  {
    question: "Does LipaBill read all my SMS?",
    answer:
      "No. If you allow SMS, it reads confirmation texts from the wallets and banks you enable — M-Pesa, Airtel Money, KCB, and others in Kenya today. Tanzania, Uganda, and Rwanda are coming soon. It does not send SMS, does not keep OTPs, and is not your default messaging app.",
  },
  {
    question: "Do I have to allow every permission?",
    answer:
      "No. First launch only asks for SMS, phone, and Accessibility. Contacts, camera, and notifications wait until you need them. You can deny any of them.",
  },
  {
    question: "Does my data live in the cloud?",
    answer:
      "Your history and tickets stay on this phone. There is no LipaBill account that holds your money story. Read more in our privacy policy.",
  },
  {
    question: "How do I delete my LipaBill data?",
    answer:
      "Uninstall LipaBill or clear its storage to remove the on-device picture. If you left an email on this website, write to support@lipabill.app. Full steps: lipabill.app/delete.",
  },
] as const;

/** @deprecated use homeFaqs or supportFaqs */
export const faqs = homeFaqs;

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}

export function faqJsonLd() {
  return {
    "@type": "FAQPage",
    "@id": absoluteUrl("/#faq"),
    url: absoluteUrl("/"),
    mainEntity: homeFaqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function softwareApplicationJsonLd() {
  return {
    "@type": "SoftwareApplication",
    "@id": absoluteUrl("/#app"),
    name: site.name,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Android",
    url: isPlayLive ? playStore.url : site.url,
    description: site.description,
    image: absoluteUrl("/icon-512.png"),
    screenshot: [
      absoluteUrl("/screenshots/home.jpg"),
      absoluteUrl("/screenshots/send.jpg"),
      absoluteUrl("/screenshots/sgr.jpg"),
    ],
    inLanguage: "en-KE",
    countriesSupported: ["KE"],
    releaseDate: launchDayIso,
    featureList: [
      "See where your money actually went, from confirmation texts on this phone",
      "Kenya wallets on the ledger now; Tanzania, Uganda, and Rwanda coming soon",
      "Send money and Pay Paybill, till, or Pochi on Kenya M-Pesa — confirmed before the money moves",
      "Repeat a past payment",
      "Receive with a shareable pay link or QR",
      "See what is shaping your money — insights and optional habits",
      "Tickets and pay QR as part of the same picture — events, SGR, receive codes, offline",
      "Optional no-spend challenges and weekly check-in",
      "App lock with fingerprint, face, or phone PIN",
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KES",
      availability: isPlayLive
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
      url: isPlayLive ? playStore.url : absoluteUrl("/#notify"),
    },
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}

export function llmsTxt() {
  return `# ${site.name}

> ${site.shortDescription} Kenya is live on Google Play. Tanzania, Uganda, and Rwanda are coming soon.

LipaBill is a local-first money tracker: where it went, what keeps costing you, then the next move — send, pay, get paid, or show the ticket you already bought. It is not a bank. Kenya is live. Send and Pay still run on Kenya M-Pesa today. There is no LipaBill account that holds your history.

## Download

Google Play (Kenya): ${playStore.url}

## Pages

- [Home](${absoluteUrl("/")}): product overview and Google Play link
- [Payments](${absoluteUrl("/mpesa")}): local ledger from the wallets you pick, then Kenya M-Pesa Send, Pay, Repeat
- [Passes](${absoluteUrl("/sgr")}): the trip or night you already paid for, plus a QR so someone can pay you
- [Support](${absoluteUrl("/support")}): what the app is for, contact, and common questions
- [Privacy](${absoluteUrl("/privacy")}): what stays on the device and which permissions are optional
- [Delete data](${absoluteUrl("/delete")}): how to remove LipaBill data on the phone and from this website
- [Full summary](${absoluteUrl("/llms-full.txt")}): longer factual description for language models

## Contact

Email ${site.email}
`;
}

export function llmsFullTxt() {
  const faq = supportFaqs
    .map((item) => `### ${item.question}\n\n${item.answer}`)
    .join("\n\n");

  return `# ${site.name}

> ${site.description}

This file is a factual summary of the marketing site at ${site.url}. LipaBill is a local-first money tracker on Android: where it went, what keeps costing you, then send, pay, a receive QR, and the tickets you already bought. It is not a bank. Kenya is live on Google Play (${playStore.url}). Tanzania, Uganda, and Rwanda are coming soon. Send and Pay still run on Kenya M-Pesa today.

## What it does

- Send money to people, and Pay Paybill, till, or Pochi on Kenya M-Pesa. Confirm amount and recipient before the money moves. Dual-SIM phones can choose the Safaricom line.
- Repeat a past payment (automatic M-Pesa USSD screen fill via AccessibilityService after Confirm, or copy details).
- Receive — share a QR or pay link for your phone, till, or paybill.
- With optional SMS permission, read confirmation messages from the wallets and banks you enable in Kenya (M-Pesa, Airtel Money, KCB, and others) into an encrypted local ledger (including Fuliza, savings, airtime on Kenya M-Pesa). Other East African countries are coming soon.
- Insights charts from that history; optional no-spend challenges and a weekly check-in.
- Tickets as what the money became: events and SGR / Madaraka Express (scan, paste, PKPass, e-ticket, booking SMS), plus pass reminders; share a receive QR for phone, till, or paybill. Flight boarding passes are coming soon.
- Favourites on home; hide balance until you tap; app lock with fingerprint, face, or phone PIN.

## What stays on the phone

Payment history, tickets, and settings stay on the device under fingerprint, face, or the phone PIN. LipaBill does not run a server that holds your ledger or SMS. Clearing app storage or uninstalling the app removes that on-device data.

Optional permissions (SMS, contacts, camera, phone, AccessibilityService, notifications) only unlock the features that need them. You can deny any of them.

To keep the app stable, LipaBill uses Google Firebase for product analytics and crash reports. That does not include payment amounts, recipients, or your PIN. Advertising ID collection is turned off.

## Download

The Android app is on Google Play: ${playStore.url}. Kenya is live. Tanzania, Uganda, and Rwanda are coming soon. Emails collected on this site are only for optional product notes. Email ${site.email} to be removed.

## Common questions

${faq}

## Contact

Email ${site.email}
Support: ${absoluteUrl("/support")}
Privacy: ${absoluteUrl("/privacy")}
Delete data: ${absoluteUrl("/delete")}
`;
}
