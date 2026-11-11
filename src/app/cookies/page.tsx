import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc } from "@/components/LegalDoc";
import { legal } from "@/lib/legal";

const description =
  "What cookies LipaBill uses on this website, and how that differs from the Android app.";

export const metadata: Metadata = {
  title: "Cookies",
  description,
  alternates: { canonical: "/cookies" },
  openGraph: { title: "Cookies — LipaBill", description, url: "/cookies" },
};

export default function CookiesPage() {
  return (
    <LegalDoc
      kicker="Cookies"
      title="Cookie policy"
      description={description}
      path="/cookies"
    >
      <p>
        This page is for <strong>lipabill.app</strong>. The Android app does
        not use browser cookies; see the{" "}
        <Link href="/privacy">privacy policy</Link> for SMS, the ledger, and
        Firebase on the phone.
      </p>

      <section>
        <h2>What we use today</h2>
        <p>
          This website does not run advertising, remarketing, or Google
          Analytics. Montserrat is loaded with Next.js self-hosted font files,
          so visiting the site does not set a Google Fonts cookie.
        </p>
        <p>
          We use{" "}
          <a
            href="https://vercel.com/docs/analytics/privacy-policy"
            rel="noopener noreferrer"
            target="_blank"
          >
            Vercel Web Analytics
          </a>{" "}
          for anonymous page views and pay-link product events (for example
          that a link was opened, or that someone tapped Copy / Open M-Pesa).
          It does not use cookies, does not identify a person, and we strip
          pay-link tokens and social handles from paths before they are
          recorded. Payment numbers and amounts are never sent.
        </p>
        <p>
          If you answer the cookie banner, we store one first-party preference
          cookie:
        </p>
        <ul>
          <li>
            <strong>{legal.cookieName}</strong> — value <code>essential</code>{" "}
            or <code>all</code>. Lasts {legal.cookieMaxAgeDays} days. Path{" "}
            <code>/</code>. SameSite=Lax. Purpose: remember that we asked, so
            the banner does not return every visit.
          </li>
        </ul>
        <p>
          There are no optional marketing cookies to turn on. Choosing
          “Accept” or “Essential only” currently has the same effect: we only
          store that preference. We still ask, so the choice is recorded.
          Vercel Web Analytics runs either way because it is cookieless.
        </p>
      </section>

      <section>
        <h2>What we do not use on this site</h2>
        <ul>
          <li>Advertising cookies</li>
          <li>Social-media tracking pixels</li>
          <li>Google Analytics on the website</li>
        </ul>
      </section>

      <section>
        <h2>The email form is not a cookie</h2>
        <p>
          If you type an address and tick the consent box, we send that
          address to a Google Sheet so we can email product notes. That is
          personal data processed with your consent — not a cookie. You can
          say no and still use the rest of the site. Details:{" "}
          <Link href="/privacy">privacy</Link>.
        </p>
      </section>

      <section>
        <h2>The Android app</h2>
        <p>
          The Play build may send product analytics and crash reports to
          Google Firebase. That is not a website cookie. Advertising ID
          collection in the app is turned off.
        </p>
      </section>

      <section>
        <h2>How to change your mind</h2>
        <p>
          Clear cookies for lipabill.app in your browser, or delete the{" "}
          {legal.cookieName} cookie. The banner will ask again. You can also
          email <a href={`mailto:${legal.email}`}>{legal.email}</a>.
        </p>
      </section>
    </LegalDoc>
  );
}
