import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { absoluteUrl, faqs } from "@/lib/site";

const description =
  "Get help with LipaBill, the Offline-First Transaction Wallet for Android. Contact, what the app is for, and common questions.";

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
          mainEntity: faqs.map((item) => ({
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
          LipaBill is an Offline-First Transaction Wallet, launching soon. Send
          and Pay come first. Here’s how to reach us.
        </p>

        <section className="mt-12 rounded-2xl border border-line bg-sky-soft/50 p-6">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-blue">
            Status
          </p>
          <p className="mt-2 text-xl font-semibold text-ink">Launching soon</p>
          <p className="mt-2 text-ink-soft">
            LipaBill isn’t on the Play Store yet. We’ll share the download link
            here when it’s ready.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-ink">Contact</h2>
          <p className="mt-3 text-ink-soft">
            Email{" "}
            <a
              className="font-medium text-blue hover:underline"
              href="mailto:mboya.codes@gmail.com"
            >
              mboya.codes@gmail.com
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
              <strong className="text-ink">Send &amp; Pay</strong>
              <p className="mt-1">
                Move money to people and businesses you choose, with a clear
                confirm step before anything goes out.
              </p>
            </li>
            <li>
              <strong className="text-ink">See your spending</strong>
              <p className="mt-1">
                Keep history and insights on this phone so you know where money
                went — even with little or no internet.
              </p>
            </li>
            <li>
              <strong className="text-ink">Tickets in one place</strong>
              <p className="mt-1">
                Hold event and travel passes next to your wallet and show them
                when you need to.
              </p>
            </li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-ink">
            Common questions
          </h2>
          <div className="mt-6 space-y-6">
            {faqs.map((item) => (
              <Faq key={item.question} q={item.question} a={item.answer} />
            ))}
          </div>
        </section>

        <p className="mt-14 text-sm text-mute">
          Privacy details:{" "}
          <Link href="/privacy" className="font-medium text-blue hover:underline">
            lipabill privacy policy
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
