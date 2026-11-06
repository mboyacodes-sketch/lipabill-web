export const site = {
  name: "LipaBill",
  url: "https://lipabill.app",
  email: "support@lipabill.app",
  locale: "en_KE",
  title: "LipaBill — Your money has a story. See it clearly.",
  description:
    "Rent, family, a night out, the train you already booked. LipaBill is a local-first money tracker for Kenya, Tanzania, Uganda, and Rwanda on Google Play — the ledger stays on this phone, then you can send, pay, or show the code even when data is weak. Send and Pay still run on Kenya M-Pesa.",
  shortDescription:
    "Your money has a story. See it clearly — then send, pay, share a social code, or show a pass.",
  keywords: [
    "LipaBill",
    "East Africa money tracker",
    "local first finance Android",
    "mobile money Kenya Tanzania Uganda Rwanda",
    "money management Android Kenya",
    "Send money Android Kenya",
    "Paybill till Pochi",
    "LipaBill socials QR",
    "SGR ticket QR",
    "Madaraka Express ticket",
    "see your money Kenya",
    "M-Pesa Airtel Money KCB ledger",
  ],
} as const;

/** Public release date (schema.org / Play messaging). */
export const launchDayIso = "2026-11-06";

export const playStore = {
  url: "https://play.google.com/store/apps/details?id=com.lipabill.app",
} as const;

export const launchLiveCopy = {
  badge: "Live",
  line: "LipaBill is on Google Play.",
  detail:
    "Kenya, Tanzania, Uganda, and Rwanda on Android. See where the money went on this phone — not in a LipaBill cloud. Send and Pay still run on Kenya M-Pesa.",
  cta: "Get the app",
} as const;

/** Play Console “Delete data URL” — https://lipabill.app/delete */
export const deleteDataPath = "/delete";

/** Homepage — customer questions only. */
export const homeFaqs = [
  {
    question: "What is LipaBill?",
    answer:
      "LipaBill is a local-first money tracker: where it went, what keeps costing you, and the next move — send, pay, get paid, share a social code, or show the ticket you already bought. It is not a bank. Kenya, Tanzania, Uganda, and Rwanda are live on Google Play. Send and Pay still run on Kenya M-Pesa today.",
  },
  {
    question: "Does it work when data is weak?",
    answer:
      "Yes. The picture stays on the phone, so history, pay QR, social codes, and tickets still open. Send and Pay still run on this device — even when the internet is slow.",
  },
  {
    question: "What are Socials?",
    answer:
      "On Request, Socials lets you save handles for WhatsApp, Instagram, TikTok, and more, then show a QR so friends open your page — native app if they have it, web if they don’t. Handles stay on this phone. LipaBill does not host a public profile for you.",
  },
  {
    question: "Are tickets part of that picture?",
    answer:
      "Yes. A ticket is what the money already became — the trip or the night out. A receive QR is money on its way in. Event passes, SGR / Madaraka Express, and a pay link sit with your history. Show them at the gate even without data.",
  },
  {
    question: "When can I download it?",
    answer:
      "LipaBill is on Google Play for Android in Kenya, Tanzania, Uganda, and Rwanda. Open the listing from this site.",
  },
] as const;

/** Support — includes how SMS and permissions work. */
export const supportFaqs = [
  ...homeFaqs,
  {
    question: "Does LipaBill read all my SMS?",
    answer:
      "No. If you allow SMS, it reads confirmation texts from the wallets and banks you enable — M-Pesa, Airtel Money, MTN MoMo, KCB, and others in Kenya, Tanzania, Uganda, and Rwanda. It does not send SMS, does not keep OTPs, and is not your default messaging app.",
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
    url: playStore.url,
    description: site.description,
    image: absoluteUrl("/icon-512.png"),
    screenshot: [
      absoluteUrl("/screenshots/home.jpg"),
      absoluteUrl("/screenshots/send.jpg"),
      absoluteUrl("/screenshots/sgr.jpg"),
    ],
    inLanguage: "en-KE",
    countriesSupported: ["KE", "TZ", "UG", "RW"],
    releaseDate: launchDayIso,
    featureList: [
      "See where your money actually went, from confirmation texts on this phone",
      "Ledgers for Kenya, Tanzania, Uganda, and Rwanda — wallets and banks you pick",
      "Send money and Pay Paybill, till, or Pochi on Kenya M-Pesa — confirmed before the money moves",
      "Repeat a past payment",
      "Receive with a shareable pay link or QR",
      "Share social profile QRs — WhatsApp, Instagram, TikTok, and more — from Request",
      "See what is shaping your money — insights and optional habits",
      "Tickets and pay QR as part of the same picture — events, SGR, receive codes, offline",
      "Optional no-spend challenges and weekly check-in",
      "App lock with fingerprint, face, or phone PIN",
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KES",
      availability: "https://schema.org/InStock",
      url: playStore.url,
    },
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}

export function llmsTxt() {
  return `# ${site.name}

> ${site.shortDescription} Kenya, Tanzania, Uganda, and Rwanda are live on Google Play.

LipaBill is a local-first money tracker: where it went, what keeps costing you, then the next move — send, pay, get paid, share a social code, or show the ticket you already bought. It is not a bank. Ledgers for Kenya, Tanzania, Uganda, and Rwanda are live. Send and Pay still run on Kenya M-Pesa today. There is no LipaBill account that holds your history.

## Download

Google Play: ${playStore.url}

## Pages

- [Home](${absoluteUrl("/")}): product overview and Google Play link
- [Payments](${absoluteUrl("/mpesa")}): local ledger from the wallets you pick, then Kenya M-Pesa Send, Pay, Repeat
- [Socials](${absoluteUrl("/socials")}): share profile QRs for WhatsApp, Instagram, TikTok, and more from Request
- [Passes](${absoluteUrl("/sgr")}): the trip or night you already paid for, plus a QR so someone can pay you
- [Support](${absoluteUrl("/support")}): what the app is for, contact, and common questions
- [Privacy](${absoluteUrl("/privacy")}): what stays on the device and which permissions are optional
- [Terms](${absoluteUrl("/terms")}): what LipaBill is and is not
- [Cookies](${absoluteUrl("/cookies")}): website cookies
- [Refunds](${absoluteUrl("/refunds")}): the app is free; Play refunds if Google charged you
- [Licenses](${absoluteUrl("/licenses")}): fonts, images, and other companies’ names
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

This file is a factual summary of the marketing site at ${site.url}. LipaBill is a local-first money tracker on Android: where it went, what keeps costing you, then send, pay, a receive QR, social profile codes, and the tickets you already bought. It is not a bank. Kenya, Tanzania, Uganda, and Rwanda are live on Google Play (${playStore.url}). Send and Pay still run on Kenya M-Pesa today.

## What it does

- Send money to people, and Pay Paybill, till, or Pochi on Kenya M-Pesa. Confirm amount and recipient before the money moves. Dual-SIM phones can choose the Safaricom line.
- Repeat a past payment (automatic M-Pesa USSD screen fill via AccessibilityService after Confirm, or copy details).
- Receive — share a QR or pay link for your phone, till, or paybill.
- Socials on Request — save handles for WhatsApp, Facebook, Instagram, TikTok, YouTube, X, Telegram, LinkedIn, and Threads; show a QR or share the https profile link. Handles stay on the phone; LipaBill does not host a public profile page.
- With optional SMS permission, read confirmation messages from the wallets and banks you enable in Kenya, Tanzania, Uganda, and Rwanda (M-Pesa, Airtel Money, MTN MoMo, Mixx, HaloPesa, KCB, and others) into an encrypted local ledger (including Fuliza, savings, airtime on Kenya M-Pesa).
- Insights charts from that history; optional no-spend challenges and a weekly check-in.
- Tickets as what the money became: events and SGR / Madaraka Express (scan, paste, PKPass, e-ticket, booking SMS), plus pass reminders; share a receive QR for phone, till, or paybill. Flight boarding passes are coming soon.
- Favourites on home; hide balance until you tap; app lock with fingerprint, face, or phone PIN.

## What stays on the phone

Payment history, tickets, and settings stay on the device under fingerprint, face, or the phone PIN. LipaBill does not run a server that holds your ledger or SMS. Clearing app storage or uninstalling the app removes that on-device data.

Optional permissions (SMS, contacts, camera, phone, AccessibilityService, notifications) only unlock the features that need them. You can deny any of them.

To keep the app stable, LipaBill uses Google Firebase for product analytics and crash reports. That does not include payment amounts, recipients, or your PIN. Advertising ID collection is turned off.

## Download

The Android app is on Google Play: ${playStore.url}. Kenya, Tanzania, Uganda, and Rwanda are live. Emails collected on this site are only for optional product notes. Email ${site.email} to be removed.

## Common questions

${faq}

## Contact

Email ${site.email}
Support: ${absoluteUrl("/support")}
Privacy: ${absoluteUrl("/privacy")}
Terms: ${absoluteUrl("/terms")}
Cookies: ${absoluteUrl("/cookies")}
Refunds: ${absoluteUrl("/refunds")}
Licenses: ${absoluteUrl("/licenses")}
Delete data: ${absoluteUrl("/delete")}
Socials: ${absoluteUrl("/socials")}
`;
}
