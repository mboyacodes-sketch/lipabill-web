import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { PlayStoreCta } from "@/components/PlayStoreButton";
import { absoluteUrl } from "@/lib/site";
import { socialPlatforms, socialsCopy, socialsPath } from "@/lib/socials";

const title = "Share your socials";
const description =
  "LipaBill Socials: save the handles you use, then show a QR so friends open your WhatsApp, Instagram, TikTok, and more — app if they have it, web if they don’t. Stays on this phone.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "LipaBill socials",
    "share WhatsApp QR Kenya",
    "Instagram QR Android",
    "social profile QR East Africa",
  ],
  alternates: { canonical: socialsPath },
  openGraph: {
    title: `${title} — LipaBill`,
    description,
    url: socialsPath,
  },
};

export default function SocialsPage() {
  return (
    <PageShell
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `${title} — LipaBill`,
        url: absoluteUrl(socialsPath),
        description,
        isPartOf: { "@id": absoluteUrl("/#website") },
        about: { "@id": absoluteUrl("/#app") },
      }}
    >
      <article className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue">
          {socialsCopy.kicker}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {socialsCopy.title}
        </h1>
        <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-soft">
          {socialsCopy.detail}
        </p>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-ink">Networks you can add</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            WhatsApp uses your number with a country code. Everything else is a
            username or handle. Names below belong to those companies — LipaBill
            is not affiliated with them.
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-ink">
            {socialPlatforms.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-ink">How a friend opens it</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            The QR holds the normal https profile link, so any camera works. If
            they have the native app, LipaBill prefers opening that. You can also
            copy or share the link from the code sheet.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-ink">
            Same Request screen as pay QR
          </h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            Payments is for money coming in — phone, till, or paybill. Socials is
            for the profiles people already look for. Tickets and passes stay
            under{" "}
            <Link href="/sgr" className="font-medium text-blue hover:underline">
              what the money became
            </Link>
            .
          </p>
        </section>

        <PlayStoreCta note="Socials ships in LipaBill on Google Play for Android." />
      </article>
    </PageShell>
  );
}
