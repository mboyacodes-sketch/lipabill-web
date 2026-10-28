import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import {
  absoluteUrl,
  launchCountdownPaused,
  launchDayLabel,
  site,
  supportFaqs,
} from "@/lib/site";

const description =
  "Get help with LipaBill — see your money story, then send, pay, or show the code. Contact, what the app is for, and common questions.";

export const metadata: Metadata = {
  title: "Support",
  description,
  alternates: {
    canonical: "/support",
    types: { "text/plain": "/llms.txt" },
  },
  openGraph: {
    title: "Support — LipaBill",
    description,
    url: "/support",
  },
};

export default function SupportPage() {
  return (
    <main className="flex-1 bg-paper">
      <div className="blob-field border-b border-line/70">
        <SiteHeader solid />
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          url: absoluteUrl("/support"),
          isPartOf: { "@id": absoluteUrl("/#website") },
          mainEntity: supportFaqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }}
      />
      <article className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue">
          Support
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          We’re here to help
        </h1>
        <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-soft">
          LipaBill brings your money picture together.{" "}
          {launchCountdownPaused
            ? "The launch clock is paused for a moment."
            : `Launching ${launchDayLabel()}.`}{" "}
          Here’s how to reach us.
        </p>

        <section className="mt-12 rounded-2xl border border-line bg-sky-soft/50 p-6">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-blue">
            Status
          </p>
          <p className="mt-2 text-xl font-semibold text-ink">
            {launchCountdownPaused
              ? "Paused for a moment"
              : `Launching ${launchDayLabel()}`}
          </p>
          <p className="mt-2 text-ink-soft">
            {launchCountdownPaused
              ? "We’ll start the clock again when the picture is ready. Leave your email and we’ll write when it’s on Google Play."
              : "LipaBill isn’t on Google Play yet. We’ll share the download link here when it is."}
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-ink">Contact</h2>
          <p className="mt-3 text-ink-soft">
            Email{" "}
            <a
              className="font-medium text-blue hover:underline"
              href={`mailto:${site.email}`}
            >
              {site.email}
            </a>
            . Tell us your device model and Android version if you’re reporting
            a problem — it helps us respond faster.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-ink">
            What LipaBill is for
          </h2>
          <ul className="mt-4 space-y-4 text-ink-soft">
            <li>
              <strong className="text-ink">The picture</strong>
              <p className="mt-1">
                Where your money went, from the confirmation texts you already
                get. Charts show what is shaping it.
              </p>
            </li>
            <li>
              <strong className="text-ink">The next move</strong>
              <p className="mt-1">
                Send to people; pay Paybill, till, or Pochi; repeat a past
                payment; or share a QR so someone can pay you. You confirm
                before money leaves.
              </p>
            </li>
            <li>
              <strong className="text-ink">What it became</strong>
              <p className="mt-1">
                A ticket is the trip or night you already paid for. A receive
                QR is money on its way in. Event and SGR codes open offline,
                with reminders before you travel. Flight boarding is coming
                soon.
              </p>
            </li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-ink">
            Common questions
          </h2>
          <div className="mt-6 space-y-6">
            {supportFaqs.map((item) => (
              <Faq key={item.question} q={item.question} a={item.answer} />
            ))}
          </div>
        </section>

        <p className="mt-14 text-sm text-mute">
          Privacy details:{" "}
          <Link href="/privacy" className="font-medium text-blue hover:underline">
            lipabill privacy policy
          </Link>
          . Delete data:{" "}
          <Link href="/delete" className="font-medium text-blue hover:underline">
            lipabill.app/delete
          </Link>
          .
        </p>
      </article>

      <SiteFooter />
    </main>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <h3 className="font-semibold text-ink">{q}</h3>
      <p className="mt-2 leading-relaxed text-ink-soft">{a}</p>
    </div>
  );
}
