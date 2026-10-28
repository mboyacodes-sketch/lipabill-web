import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { absoluteUrl, launchCountdownPaused, launchDayLabel } from "@/lib/site";

const title = "The trip you already paid for";
const description =
  "SGR, event tickets, and a pay QR are part of your money picture — the thing the money already became, or money on its way in. Show them at the gate even without data.";

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
          What the money became
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          The trip you already paid for
        </h1>
        <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-soft">
          The fare, the night out — that money already became something. LipaBill
          keeps the QR with the rest of the picture, so you can show it at the
          gate without another app or a data connection. Event tickets and SGR
          / Madaraka Express are here now. Flight boarding is coming.
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
            Same picture as Send and Pay
          </h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            A ticket is what the money already became. A receive QR is money
            on its way in. Both belong with where your money went. Read how
            money moves on the{" "}
            <Link href="/mpesa" className="font-medium text-blue hover:underline">
              payments page
            </Link>
            .
          </p>
        </section>

        <p className="mt-12 text-sm text-mute">
          {launchCountdownPaused
            ? "Launch date to follow."
            : `Android launch is ${launchDayLabel()}.`}{" "}
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
