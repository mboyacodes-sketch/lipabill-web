import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { absoluteUrl, launchDayLabel } from "@/lib/site";

const title = "M-Pesa money management on Android";
const description =
  "LipaBill reads Safaricom M-Pesa confirmation SMS on this phone to build an encrypted ledger and balance, then Send, Pay, and Repeat without putting your history in the cloud.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "M-Pesa app Kenya",
    "M-Pesa transaction history",
    "M-Pesa SMS ledger",
    "Send money Android Kenya",
    "Paybill till Pochi",
  ],
  alternates: { canonical: "/mpesa" },
  openGraph: {
    title: `${title} — LipaBill`,
    description,
    url: "/mpesa",
  },
};

export default function MpesaPage() {
  return (
    <main className="flex-1 bg-paper">
      <div className="blob-field border-b border-line/70">
        <SiteHeader solid />
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `${title} — LipaBill`,
          url: absoluteUrl("/mpesa"),
          description,
          isPartOf: { "@id": absoluteUrl("/#website") },
          about: { "@id": absoluteUrl("/#app") },
        }}
      />

      <article className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue">
          Kenya · Safaricom M-Pesa
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          M-Pesa history, Send &amp; Pay — on this phone
        </h1>
        <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-soft">
          LipaBill is an M-Pesa money-management app for Android in Kenya.
          Confirmation SMS stay on the device. Send and Pay still work when
          data is weak, because they use M-Pesa USSD after you confirm.
        </p>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-ink">
            SMS for money management — not OTPs
          </h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            With SMS allowed, LipaBill reads Safaricom confirmation messages
            (sender MPESA) and builds an encrypted ledger, available balance,
            and spending overview. Fuliza, savings, and airtime sit in that
            same history. Promo messages and OTPs are not kept as your ledger.
            LipaBill does not send SMS and is not your default messaging app.
            Deny SMS and history stays empty.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-ink">
            Send, Pay, Repeat after you confirm
          </h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            Send to a person. Pay Paybill, till, or Pochi. Repeat a past
            payment. You confirm the amount and recipient in LipaBill, enter
            your PIN on LipaBill’s keypad (it is not stored), then M-Pesa USSD
            runs on the Safaricom line you pick. Accessibility Service is
            optional and only fills that payment session.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-ink">
            Nothing leaves as a LipaBill cloud ledger
          </h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            There is no LipaBill account for your history. Uninstall or clear
            storage and that on-device data goes with it. Details are in the{" "}
            <Link href="/privacy" className="font-medium text-blue hover:underline">
              privacy policy
            </Link>
            .
          </p>
        </section>

        <p className="mt-12 text-sm text-mute">
          Android launch is {launchDayLabel()}.{" "}
          <Link href="/#notify" className="font-medium text-blue hover:underline">
            Get early access
          </Link>
          .
        </p>
      </article>

      <SiteFooter />
    </main>
  );
}
