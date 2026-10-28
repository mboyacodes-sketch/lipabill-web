export const site = {
  name: "LipaBill",
  url: "https://lipabill.app",
  email: "support@lipabill.app",
  locale: "en_KE",
  title: "LipaBill — Your money, on this phone",
  description:
    "See where your money went. Send, pay, or get paid. Open an SGR ticket or event QR from the same phone. Kenya first — M-Pesa today, more wallets next.",
  shortDescription:
    "Your money, on this phone — history, payments, tickets, and pay QR. Kenya.",
  keywords: [
    "LipaBill",
    "mobile money Kenya",
    "money management Android Kenya",
    "Send money Android Kenya",
    "Paybill till Pochi",
    "SGR ticket QR",
    "Madaraka Express ticket",
    "offline mobile money wallet",
    "M-Pesa app Kenya",
  ],
} as const;

/** Close of 6 November 2026, East Africa Time. Eight days after 29 October. */
export const launchAt = "2026-11-07T00:00:00+03:00";
export const launchDayIso = "2026-11-06";

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
  enabled: false,
} as const;

/** Homepage — customer questions only. */
export const homeFaqs = [
  {
    question: "What is LipaBill?",
    answer:
      "LipaBill is where your money lives on this phone: history, Send and Pay, a QR so someone can pay you, and the tickets you already bought. It is not a bank. Send and Pay run on M-Pesa today.",
  },
  {
    question: "Does it work when data is weak?",
    answer:
      "Yes. Your history, balance, pay QR, and tickets stay on the phone, so they still open. Send and Pay still run on this device — even when the internet is slow.",
  },
  {
    question: "Are tickets and QR codes in LipaBill?",
    answer:
      "Yes. A ticket is money you already spent; a receive QR is money coming in. Event passes, SGR / Madaraka Express, and a pay link live in the same wallet as your history. Show them at the gate even without data.",
  },
  {
    question: "When can I download it?",
    answer:
      `LipaBill comes to Android on ${launchDayLabel()}. Leave your email on this page and we’ll write when it’s on Google Play.`,
  },
] as const;

/** Support — includes how SMS and permissions work. */
export const supportFaqs = [
  ...homeFaqs,
  {
    question: "Does LipaBill read all my SMS?",
    answer:
      "No. If you allow SMS, it reads Safaricom M-Pesa confirmation texts (sender MPESA) to build your history and balance. It does not send SMS, does not read OTPs, and is not your default messaging app.",
  },
  {
    question: "Do I have to allow every permission?",
    answer:
      "No. First launch only asks for SMS, phone, and Accessibility. Contacts, camera, and notifications wait until you need them. You can deny any of them.",
  },
  {
    question: "Does my data live in the cloud?",
    answer:
      "Your history and tickets stay on this phone. There is no LipaBill account that holds your money picture. Read more in our privacy policy.",
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
    url: site.url,
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
      "Confirmation texts → history and balance on this phone",
      "Send money and Pay Paybill, till, or Pochi — confirmed before the money moves",
      "Repeat a past payment",
      "Receive with a shareable pay link or QR",
      "Spending insights stored on the phone",
      "Tickets and pay QR in the same on-phone wallet — events, SGR, receive codes, offline",
      "Optional no-spend challenges and weekly check-in",
      "App lock with fingerprint, face, or phone PIN",
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KES",
      availability: "https://schema.org/PreOrder",
      url: absoluteUrl("/#notify"),
    },
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}

export function llmsTxt() {
  return `# ${site.name}

> ${site.shortDescription} The Android app is not on the Play Store yet.

LipaBill is where your money lives on this phone: history, Send and Pay, a QR so someone can pay you, and the tickets you already bought. It is not a bank. Send and Pay run on M-Pesa today. There is no LipaBill account that holds your history.

## Early access

Leave an email on the homepage to be told when the Android download is ready: ${absoluteUrl("/#notify")}

## Pages

- [Home](${absoluteUrl("/")}): product overview and early-access form
- [Payments](${absoluteUrl("/mpesa")}): SMS money management, Send, Pay, Repeat (M-Pesa first)
- [Passes](${absoluteUrl("/sgr")}): tickets and pay QR in the same on-phone wallet
- [Support](${absoluteUrl("/support")}): what the app is for, contact, and common questions
- [Privacy](${absoluteUrl("/privacy")}): what stays on the device and which permissions are optional
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

This file is a factual summary of the marketing site at ${site.url}. LipaBill is where your money lives on this Android: history, Send and Pay, a receive QR, and the tickets you already bought. It is not a bank. Send and Pay run on M-Pesa today. It is not on the Play Store yet.

## What it does

- Send money to people, and Pay Paybill, till, or Pochi. Confirm amount and recipient before the money moves. Dual-SIM phones can choose the Safaricom line.
- Repeat a past payment (automatic M-Pesa USSD screen fill via AccessibilityService after Confirm, or copy details).
- Receive — share a QR or pay link for your phone, till, or paybill.
- With optional SMS permission, read Safaricom M-Pesa confirmation messages for balance and an encrypted local ledger (including Fuliza, savings, airtime).
- Insights charts from that history; optional no-spend challenges and a weekly check-in.
- Tickets and pay QR in the same wallet: events and SGR / Madaraka Express (scan, paste, PKPass, e-ticket, booking SMS), plus pass reminders; share a receive QR for phone, till, or paybill. Flight boarding passes are coming soon.
- Favourites on home; hide balance until you tap; app lock with fingerprint, face, or phone PIN.

## What stays on the phone

Payment history, tickets, and settings stay on the device under fingerprint, face, or the phone PIN. LipaBill does not run a server that holds your ledger or SMS. Clearing app storage or uninstalling the app removes that on-device data.

Optional permissions (SMS, contacts, camera, phone, AccessibilityService, notifications) only unlock the features that need them. You can deny any of them.

To keep the app stable, LipaBill uses Google Firebase for product analytics and crash reports. That does not include payment amounts, recipients, or your PIN. Advertising ID collection is turned off.

## Early access

The download link is not published yet. Leave an email at ${absoluteUrl("/#notify")} and LipaBill will email when the Android app is ready. Those addresses are stored in a Google Sheet and used only for that launch email. Email ${site.email} to be removed.

## Common questions

${faq}

## Contact

Email ${site.email}
Support: ${absoluteUrl("/support")}
Privacy: ${absoluteUrl("/privacy")}
`;
}
