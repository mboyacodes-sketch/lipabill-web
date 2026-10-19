import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { absoluteUrl } from "@/lib/site";

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
          dateModified: "2026-10-19",
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
        <p className="mt-3 text-sm text-mute">Last updated: 19 October 2026</p>

        <div className="prose-lipa mt-10 space-y-8 text-[1.05rem] leading-relaxed text-ink-soft">
          <p>
            LipaBill is built so your payments, history, and tickets live on
            this device — not in a LipaBill cloud account. This page explains
            what the app uses, what it doesn’t, and the choices you control.
          </p>

          <section>
            <h2>What stays on your device</h2>
            <p>
              With your permission, LipaBill can read payment confirmation
              messages to show your balance and history. That information is
              stored encrypted on your phone.
            </p>
            <p>
              Tickets you add — photos, PDFs, passes, or booking details — also
              stay on the device so you can open them offline.
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
                <strong>SMS</strong> — optional. Used to build your local
                transaction history from payment confirmation messages. Other
                messages aren’t kept as your ledger.
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
                You can turn “LipaBill Repeat Payment” off in Android
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
              <a href="mailto:mboya.codes@gmail.com">mboya.codes@gmail.com</a> to
              be removed.
            </p>
          </section>

          <section>
            <h2>Improving the app</h2>
            <p>
              To keep LipaBill stable and useful, we use Google Firebase for
              product analytics (for example which screens are opened) and crash
              reports. That information is processed by Google and may include
              device and app details needed for diagnostics. It does not include
              your payment amounts, recipients, or PIN. Advertising ID collection
              is turned off.
            </p>
          </section>

          <section>
            <h2>What we never do</h2>
            <ul>
              <li>Sell your personal data</li>
              <li>Use your transaction history for advertising</li>
              <li>Store or send your payment PIN</li>
              <li>Upload your full SMS inbox</li>
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
              <a href="mailto:mboya.codes@gmail.com">mboya.codes@gmail.com</a> or
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
