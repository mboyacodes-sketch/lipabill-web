export const site = {
  name: "LipaBill",
  url: "https://lipabill.mboya.dev",
  email: "mboya.codes@gmail.com",
  locale: "en_KE",
  title: "LipaBill — Offline-First Transaction Wallet",
  description:
    "LipaBill is an Offline-First Transaction Wallet for Android. Send and Pay come first, the ledger stays on your phone, and more Payment Providers can be added over time.",
  shortDescription:
    "Offline-First Transaction Wallet for Android. Send and Pay on your phone, even without internet.",
} as const;

/** Close of 13 October 2026, East Africa Time. One day after the original close. */
export const launchAt = "2026-10-14T00:00:00+03:00";

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

export const faqs = [
  {
    question: "What is LipaBill?",
    answer:
      "An Offline-First Transaction Wallet for Android. Send and Pay come first, and more Payment Providers can be added over time. LipaBill is not a bank.",
  },
  {
    question: "Does my data live in the cloud?",
    answer:
      "Your transaction history and tickets stay on your device. We don’t create a LipaBill cloud account for your ledger. Read more in our privacy policy.",
  },
  {
    question: "Do I have to allow every permission?",
    answer:
      "No. SMS, contacts, camera, and similar permissions are optional. You can deny any of them and still use the parts of the app that don’t need them.",
  },
  {
    question: "When can I download it?",
    answer:
      "Android launch is 13 October 2026. The Play Store button stays off until then. Leave your email on the homepage and we’ll write when it’s ready.",
  },
] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}

export function llmsTxt() {
  return `# ${site.name}

> ${site.shortDescription} The Android app is not on the Play Store yet.

LipaBill is a Transaction Wallet: Send and Pay first, with the ledger on the phone. More Payment Providers can be added over time. There is no LipaBill cloud account for that ledger.

## Early access

Leave an email on the homepage to be told when the Android download is ready: ${absoluteUrl("/#notify")}

## Pages

- [Home](${absoluteUrl("/")}): product overview and early-access form
- [Support](${absoluteUrl("/support")}): what the app is for, contact, and common questions
- [Privacy](${absoluteUrl("/privacy")}): what stays on the device and which permissions are optional
- [Full summary](${absoluteUrl("/llms-full.txt")}): longer factual description for language models

## Contact

Email ${site.email}
`;
}

export function llmsFullTxt() {
  const faq = faqs
    .map((item) => `### ${item.question}\n\n${item.answer}`)
    .join("\n\n");

  return `# ${site.name}

> ${site.description}

This file is a factual summary of the marketing site at ${site.url}. LipaBill is an Offline-First Transaction Wallet for Android. Send and Pay come first. More Payment Providers can be added over time. It is not a bank, and it is not on the Play Store yet.

## What it does

- Send and Pay to people you choose, and to businesses. LipaBill prepares the payment. You confirm the amount and recipient before it leaves.
- With optional SMS permission, read payment confirmation messages to show available balance and a local transaction list. The ledger stays encrypted on the device.
- Keep event tickets and SGR boarding passes on the phone. Scan a code or pull booking details, then open the pass offline.

## What stays on the phone

Payment history, tickets, and settings stay on the device under fingerprint, face, or the phone PIN. LipaBill does not run a server that holds your ledger or SMS. Clearing app storage or uninstalling the app removes that on-device data.

Optional permissions (SMS, contacts, camera, phone, accessibility, notifications) only unlock the features that need them. You can deny any of them.

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
