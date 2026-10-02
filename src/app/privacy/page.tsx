import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Privacy — LipaBill",
  description:
    "How LipaBill protects your payments, messages, and tickets on your phone.",
};

export default function PrivacyPage() {
  return (
    <main className="flex-1 bg-paper">
      <div className="blob-field border-b border-line/70">
        <SiteHeader solid />
      </div>

      <article className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue">
          Privacy
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Your money stays on your phone
        </h1>
        <p className="mt-3 text-sm text-mute">Last updated: 25 September 2026</p>

        <div className="prose-lipa mt-10 space-y-8 text-[1.05rem] leading-relaxed text-ink-soft">
          <p>
            LipaBill is built so your payments, history, and tickets live on
            this device — not in a LipaBill cloud account. This page explains
            what the app uses, what it doesn’t, and the choices you control.
          </p>

          <section>
            <h2>What stays on your device</h2>
            <p>
              With your permission, LipaBill can read Safaricom M-Pesa
              confirmation messages to show your balance and history. That
              information is stored encrypted on your phone.
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
                <strong>SMS</strong> — optional. Used to build your local M-Pesa
                history from confirmation messages. Other messages aren’t kept
                as your ledger.
              </li>
              <li>
                <strong>Phone</strong> — used when you start a payment you
                confirm in the app.
              </li>
              <li>
                <strong>Contacts</strong> — optional. Helps you find people you
                already know when sending.
              </li>
              <li>
                <strong>Camera</strong> — optional. For scanning ticket codes.
              </li>
              <li>
                <strong>Accessibility</strong> — optional. Helps complete
                payment steps you have already confirmed. It doesn’t run in the
                background for other apps when you’re not paying.
              </li>
              <li>
                <strong>Notifications</strong> — for payment status updates.
              </li>
            </ul>
          </section>

          <section>
            <h2>Improving the app</h2>
            <p>
              To keep LipaBill stable and useful, we use Google Firebase for
              product analytics (for example which screens are opened) and crash
              reports. That information is processed by Google and may include
              device and app details needed for diagnostics. It does not include
              your M-Pesa amounts, recipients, or PIN. Advertising ID collection
              is turned off.
            </p>
          </section>

          <section>
            <h2>What we never do</h2>
            <ul>
              <li>Sell your personal data</li>
              <li>Use your M-Pesa history for advertising</li>
              <li>Store or send your M-Pesa PIN</li>
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
