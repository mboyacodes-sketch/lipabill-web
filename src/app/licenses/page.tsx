import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc } from "@/components/LegalDoc";
import { legal, thirdPartyMarks } from "@/lib/legal";

const description =
  "Who owns LipaBill images, which font we use, and which names belong to other companies.";

export const metadata: Metadata = {
  title: "Licenses",
  description,
  alternates: { canonical: "/licenses" },
  openGraph: { title: "Licenses — LipaBill", description, url: "/licenses" },
};

export default function LicensesPage() {
  return (
    <LegalDoc
      kicker="Licenses"
      title="Copyright, fonts, and names"
      description={description}
      path="/licenses"
    >
      <p>
        This page is so we do not present other people’s work, or other
        people’s brands, as ours.
      </p>

      <section>
        <h2>LipaBill work</h2>
        <p>
          The LipaBill wordmark, app icon, product screenshots, pass mock-ups,
          and marketing layout on this site are © {new Date().getFullYear()}{" "}
          LipaBill, unless a caption says otherwise. You may not copy them to
          sell another app. Fair quotation of the site for review is fine.
        </p>
        <p>
          Phone frames on the homepage show LipaBill screens, not another
          product. Sample ledger rows (names, amounts) are illustrated. They
          are not real customer reviews or live accounts.
        </p>
      </section>

      <section>
        <h2>Font</h2>
        <p>
          Body type is <strong>Montserrat</strong> (Julieta Ulanovsky and
          contributors), licensed under the SIL Open Font License 1.1. We
          serve it with Next.js <code>next/font</code>, which hosts the files
          with this site at build time. Visiting lipabill.app does not load
          the font from Google’s servers in the browser.
        </p>
        <p>
          OFL text:{" "}
          <a
            href="https://openfontlicense.org/"
            rel="noopener noreferrer"
            target="_blank"
          >
            openfontlicense.org
          </a>
          .
        </p>
      </section>

      <section>
        <h2>Photographs and illustrations</h2>
        <p>
          Pass cards and device shots in <code>/public</code> are LipaBill
          originals or composites we made for this product. They are not
          official Kenya Railways, airline, or event-promoter artwork. We do
          not sell stock photography on this site.
        </p>
      </section>

      <section>
        <h2>Google Play badge</h2>
        <p>
          Google Play and the Google Play logo are trademarks of Google LLC.
          The download link follows Google’s branding rules. LipaBill is
          distributed on Play; Google does not endorse LipaBill beyond listing
          it.
        </p>
      </section>

      <section>
        <h2>Other companies’ names</h2>
        <p>
          These names appear because they are how money or tickets already
          move in East Africa. LipaBill is not those companies, is not
          sponsored by them, and is not their official app:
        </p>
        <p>{thirdPartyMarks.join(", ")}.</p>
        <p>
          Using a name here does not grant us their marks. If you own a mark
          and want a wording change, email{" "}
          <a href={`mailto:${legal.email}`}>{legal.email}</a>.
        </p>
      </section>

      <section>
        <h2>No fake social proof</h2>
        <p>
          This website does not publish customer reviews, star ratings, or
          “as seen in” logos. Play Store ratings, if any, live on Google Play
          — not copied here.
        </p>
      </section>

      <section>
        <h2>See also</h2>
        <p>
          <Link href="/terms">Terms</Link> cover the licence to use the app.{" "}
          <Link href="/privacy">Privacy</Link> covers data.
        </p>
      </section>
    </LegalDoc>
  );
}
