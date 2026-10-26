import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { absoluteUrl, launchDayLabel } from "@/lib/site";

const title = "M-Pesa money management on Android";
const description =
  "See your M-Pesa history and balance on this phone. Send and pay when data is weak. Built from the confirmation texts you already get.";

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
          LipaBill is where your M-Pesa lives on this phone. It is not a bank,
          and it is not Safaricom. History comes from the confirmation texts
          you already get. Send and Pay still work when data is weak.
        </p>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-ink">
            SMS for money management — not OTPs
          </h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            If you allow SMS, LipaBill reads Safaricom confirmation texts
            (sender MPESA) to show your balance and what you spent. Fuliza,
            savings, and airtime sit in that same history. Other messages,
            including OTPs, are not kept. LipaBill does not send SMS. If you
            turn SMS off, history stays empty.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-ink">
            Send, Pay, Repeat after you confirm
          </h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            Send to a person. Pay Paybill, till, or Pochi. Repeat a past
            payment. You confirm the amount and who gets paid, enter your PIN
            on LipaBill’s keypad (it is not stored), then M-Pesa runs on the
            Safaricom line you pick.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-ink">
            Your history stays on this phone
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
