import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { absoluteUrl, launchDayLabel } from "@/lib/site";

const title = "See the picture. Then move.";
const description =
  "Where your money went, from the confirmation texts you already get. Then send or pay even when data is weak. M-Pesa is how it moves today.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "mobile money Kenya",
    "money management Android Kenya",
    "Send money Android Kenya",
    "Paybill till Pochi",
    "M-Pesa app Kenya",
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
          See, then move · M-Pesa today
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Where it went. Then the next payment.
        </h1>
        <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-soft">
          LipaBill is not a bank. It puts your money picture together from the
          confirmation texts you already get — then you can send or pay even
          when data is weak. M-Pesa is how money moves today.
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
            on LipaBill’s keypad (it is not stored), then the payment runs on
            the Safaricom line you pick. Share a receive QR when money is
            coming to you. Tickets you already paid for are part of the same
            picture — see{" "}
            <Link href="/sgr" className="font-medium text-blue hover:underline">
              passes
            </Link>
            .
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-ink">
            That picture stays on this phone
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
