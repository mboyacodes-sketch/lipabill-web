import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { absoluteUrl, site } from "@/lib/site";

const description =
  "How LipaBill keeps your transactions, messages, and tickets on your phone, and which permissions are optional.";

export const metadata: Metadata = {
  title: "Privacy",
  description,
  alternates: {
    canonical: "/privacy",
    types: { "text/plain": "/llms.txt" },
  },
  openGraph: {
    title: "Privacy — LipaBill",
    description,
    url: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="flex-1 bg-paper">
      <div className="blob-field border-b border-line/70">
        <SiteHeader solid />
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Privacy — LipaBill",
          url: absoluteUrl("/privacy"),
          description,
          dateModified: "2026-10-24",
          isPartOf: { "@id": absoluteUrl("/#website") },
        }}
      />
      <article className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue">
          Privacy
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Your money stays on your phone
        </h1>
        <p className="mt-3 text-sm text-mute">Last updated: 24 October 2026</p>

        <div className="prose-lipa mt-10 space-y-8 text-[1.05rem] leading-relaxed text-ink-soft">
          <p>
            LipaBill is built so your payments, history, and tickets live on
            this device — not in a LipaBill cloud account. This page explains
            what the app uses, what it doesn’t, and the choices you control.
            Data that never leaves your phone (including M-Pesa SMS and your
            ledger) is not “collected” under Google Play’s Data Safety
            definition. Product analytics and crash reports sent to Google are.
          </p>

          <section>
            <h2>What stays on your device</h2>
            <p>
              LipaBill’s core money-management feature reads Safaricom M-Pesa
              confirmation SMS (sender MPESA), with your permission, to build
              an encrypted transaction history, available balance, and spending
              overview on this phone. SMS content is processed and stored only
              on the device. It is not uploaded to LipaBill (there is no
              LipaBill cloud ledger) and is not sent to Google Firebase.
            </p>
            <p>
              Tickets you add — photos, PDFs, passes, or booking details — also
              stay on the device so you can open them offline. Contacts and
              camera, if you allow them, are used on the phone and not
              uploaded.
            </p>
            <p>
              We don’t run a LipaBill server that holds your ledger or SMS. If
              you clear app storage or uninstall LipaBill, that on-device data
              goes with it.
            </p>
          </section>

          <section>
            <h2>Permissions you may see</h2>
            <p>
              You decide what to allow. Turning a permission off simply limits
              the related feature.
            </p>
            <ul>
              <li>
                <strong>SMS</strong> — used to build your local M-Pesa
                money-management ledger from Safaricom confirmation messages
                (sender MPESA). Other messages, including OTPs, are not kept as
                your ledger. You can deny SMS; history, balance, and insights
                then stay empty.
              </li>
              <li>
                <strong>Phone</strong> — used when you start a Send, Pay, or
                Repeat payment you confirm in the app (including choosing a
                Safaricom SIM on dual-SIM phones).
              </li>
              <li>
                <strong>Contacts</strong> — optional. Helps you find people you
                already know when sending.
              </li>
              <li>
                <strong>Camera</strong> — optional. For scanning ticket codes.
              </li>
              <li>
                <strong>AccessibilityService API</strong> — optional. Used only
                to help complete Safaricom M-Pesa USSD steps for Send, Pay, and
                Repeat payments you start and confirm in the app. After you
                confirm and enter your PIN on LipaBill’s keypad, the service may
                read on-screen USSD prompts and fill the next step for that
                payment session only. It doesn’t read SMS, doesn’t change system
                settings, and doesn’t control unrelated apps when you’re not
                paying. LipaBill is not an accessibility tool for disabilities.
                You can turn “LipaBill M-Pesa payments” off in Android
                Accessibility settings anytime.
              </li>
              <li>
                <strong>Notifications</strong> — for payment status updates.
              </li>
            </ul>
          </section>

          <section>
            <h2>Launch list</h2>
            <p>
              If you leave your email on this website, we store that address in
              a Google Sheet so we can tell you when the Android app is
              available. We don&apos;t use it for anything else. Email{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a> to
              be removed.
            </p>
          </section>

          <section>
            <h2>Improving the app</h2>
            <p>
              To keep LipaBill stable and useful, the play build sends product
              analytics (for example which screens are opened, whether SMS
              permission was granted, and payment flow type such as
              send/pay/repeat) and crash reports to Google Firebase. That is
              the data Google Play treats as collected and shared. It may
              include device and app details needed for diagnostics. It does
              not include your M-Pesa SMS bodies, ledger amounts, recipients,
              or PIN. Advertising ID collection is turned off.
            </p>
          </section>

          <section>
            <h2>What we never do</h2>
            <ul>
              <li>Sell your personal data</li>
              <li>Use your transaction history for advertising</li>
              <li>Store or send your payment PIN</li>
              <li>Upload your M-Pesa SMS, ledger, or full inbox off this phone</li>
            </ul>
          </section>

          <section>
            <h2>Your choices</h2>
            <p>
              Deny any permission in Android Settings. Clear LipaBill’s storage
              or uninstall the app to remove payment history and tickets kept on
              the device. We don’t keep a LipaBill cloud copy of that ledger.
              Analytics and crash data held by Google follow Google’s deletion
              processes where they apply.
            </p>
          </section>

          <section>
            <h2>Questions</h2>
            <p>
              Reach us at{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a> or
              visit our{" "}
              <Link href="/support">support page</Link>.
            </p>
          </section>

          <section>
            <h2>Updates</h2>
            <p>
              If this policy changes, we’ll update the date at the top of this
              page.
            </p>
          </section>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
