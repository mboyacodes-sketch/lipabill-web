export const site = {
  name: "LipaBill",
  url: "https://lipabill.mboya.dev",
  email: "mboya.codes@gmail.com",
  locale: "en_KE",
  title: "LipaBill — Offline-first M-Pesa wallet",
  description:
    "LipaBill is an offline-first Android wallet for Safaricom M-Pesa. Send money, pay Paybill and Till, see spending from confirmation SMS, and keep tickets on your phone — even without internet.",
  shortDescription:
    "Offline-first Android wallet for Safaricom M-Pesa. Money, payments, and tickets stay on your phone.",
} as const;

export const faqs = [
  {
    question: "Is LipaBill a bank or Safaricom?",
    answer:
      "No. LipaBill is an independent app that helps you manage M-Pesa activity and tickets on your phone. M-Pesa is a trademark of Safaricom PLC.",
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
      "We’re preparing the Android launch. Leave your email on the homepage and we’ll write when it’s ready.",
  },
] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}

export function llmsTxt() {
  return `# ${site.name}

> ${site.shortDescription} It is not a bank and not Safaricom. The Android app is not on the Play Store yet.

LipaBill helps you send money, pay merchants, follow spending, and keep tickets on the phone. Payment history and tickets stay on the device. There is no LipaBill cloud account for that ledger.

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

This file is a factual summary of the marketing site at ${site.url}. LipaBill is an independent Android app built around Safaricom M-Pesa. It is not a bank, not a Safaricom product, and not on the Play Store yet.

## What it does

- Send money to people you choose, and pay Paybill, Till, and Pochi. LipaBill prepares the payment. You confirm the amount and recipient before it leaves.
- With optional SMS permission, read M-Pesa confirmation messages to show available balance and a local transaction list. The ledger stays encrypted on the device.
- Show charts and totals for income and spending from the history already on the phone, including when the signal is weak.
- Keep event tickets and SGR boarding passes on the phone. Scan a code or pull booking details, then open the pass offline.

## What stays on the phone

Payment history, tickets, and settings stay on the device under fingerprint, face, or the phone PIN. LipaBill does not run a server that holds your ledger or SMS. Clearing app storage or uninstalling the app removes that on-device data.

Optional permissions (SMS, contacts, camera, phone, accessibility, notifications) only unlock the features that need them. You can deny any of them.

To keep the app stable, LipaBill uses Google Firebase for product analytics and crash reports. That does not include M-Pesa amounts, recipients, or your PIN. Advertising ID collection is turned off.

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
