import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { absoluteUrl, launchDayLabel } from "@/lib/site";

const title = "Tickets and QR codes on this phone";
const description =
  "SGR, event tickets, and a pay QR live in the same LipaBill wallet as your history. Show them at the gate even without data.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "SGR ticket QR",
    "Madaraka Express ticket",
    "event ticket QR Kenya",
    "offline boarding pass Kenya",
  ],
  alternates: { canonical: "/sgr" },
  openGraph: {
    title: `${title} — LipaBill`,
    description,
    url: "/sgr",
  },
};

export default function SgrPage() {
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
          url: absoluteUrl("/sgr"),
          description,
          isPartOf: { "@id": absoluteUrl("/#website") },
          about: { "@id": absoluteUrl("/#app") },
        }}
      />

      <article className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue">
          Money on this phone
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          The ticket sits with the payment
        </h1>
        <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-soft">
          You already paid for the trip or the night out. LipaBill keeps that
          QR on this phone next to Send, Pay, and your history — so you can
          show it at the gate without another app or a data connection. Event
          tickets and SGR / Madaraka Express are here now. Flight boarding is
          coming.
        </p>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-ink">
            How a pass gets in
          </h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            Scan a code, paste details, import a PKPass or e-ticket, or pull a
            booking SMS. Camera is optional and only used when you scan. The
            pass stays on the device — LipaBill does not upload ticket files
            to a cloud account.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-ink">At the gate</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            Open the pass offline. Brightness can stay high while you show the
            code. Reminders land before travel day so the ticket is ready
            before you leave the house.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-ink">
            Same wallet as Send and Pay
          </h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            A ticket is money already spent. A receive QR is money coming in.
            Both belong with your history on this phone. Read how payments
            work on the{" "}
            <Link href="/mpesa" className="font-medium text-blue hover:underline">
              payments page
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
