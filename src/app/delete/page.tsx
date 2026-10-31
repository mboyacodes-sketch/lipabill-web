import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { absoluteUrl, deleteDataPath, site } from "@/lib/site";

const description =
  "How to delete LipaBill data: uninstall the Android app to remove your on-device money picture, and email us to remove a launch-list address.";

const deleteMail = `mailto:${site.email}?subject=${encodeURIComponent(
  "LipaBill data deletion request"
)}&body=${encodeURIComponent(
  "Please delete my LipaBill data.\n\nAndroid app data: I have uninstalled LipaBill or cleared app storage.\nWebsite email to remove (if I left one): \n\n"
)}`;

export const metadata: Metadata = {
  title: "Delete LipaBill data",
  description,
  alternates: {
    canonical: deleteDataPath,
    types: { "text/plain": "/llms.txt" },
  },
  openGraph: {
    title: "Delete LipaBill data",
    description,
    url: deleteDataPath,
  },
};

export default function DeleteDataPage() {
  return (
    <main className="flex-1 bg-paper">
      <div className="blob-field border-b border-line/70">
        <SiteHeader solid />
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Delete LipaBill data",
          url: absoluteUrl(deleteDataPath),
          description,
          dateModified: "2026-10-28",
          isPartOf: { "@id": absoluteUrl("/#website") },
          about: { "@id": absoluteUrl("/#app") },
        }}
      />
      <article className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue">
          LipaBill
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Delete your LipaBill data
        </h1>
        <p className="mt-3 text-sm text-mute">Last updated: 28 October 2026</p>
        <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-soft">
          This page is for the LipaBill Android app (Google Play:
          com.lipabill.app) and this website, lipabill.app. There is no LipaBill
          cloud account that holds your money picture. Follow the steps below.
        </p>

        <section className="mt-10 rounded-2xl border border-line bg-sky-soft/50 p-6 sm:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-blue">
            Steps to request deletion
          </p>
          <ol className="mt-4 list-decimal space-y-4 pl-5 text-[1.05rem] leading-relaxed text-ink">
            <li>
              <strong>On your phone (this removes almost everything).</strong>{" "}
              Uninstall LipaBill, or go to Android Settings → Apps → LipaBill →
              Storage → Clear storage. That deletes your on-device ledger,
              confirmation history, tickets, settings, and app lock on
              that device. LipaBill does not keep a copy. This is immediate —
              there is no extra retention period.
            </li>
            <li>
              <strong>If you left an email on this website.</strong> Email{" "}
              <a className="font-medium text-blue hover:underline" href={deleteMail}>
                {site.email}
              </a>{" "}
              with the subject “LipaBill data deletion request” and the address
              you used. We remove it from the launch list. We aim to do that
              within 7 days. Until then it is kept only to tell you when LipaBill
              is on Google Play.
            </li>
            <li>
              <strong>That is the request.</strong> You do not create a LipaBill
              username. App lock (fingerprint, face, or phone PIN) is only on
              the device and goes away when you uninstall.
            </li>
          </ol>
          <a
            href={deleteMail}
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-blue px-5 py-3 text-sm font-medium text-white"
          >
            Email a deletion request
          </a>
        </section>

        <div className="prose-lipa mt-12 space-y-8 text-[1.05rem] leading-relaxed text-ink-soft">
          <section>
            <h2>What is deleted</h2>
            <ul>
              <li>
                <strong>On the phone, when you uninstall or clear storage:</strong>{" "}
                encrypted ledger and balances, confirmation SMS LipaBill
                stored, tickets and passes, Favourites, settings, and app lock.
                Deleted immediately. Not kept by LipaBill.
              </li>
              <li>
                <strong>On this website, when you email us:</strong> the launch-list
                email address you left on lipabill.app. Removed from our Google
                Sheet, usually within 7 days.
              </li>
            </ul>
          </section>

          <section>
            <h2>What is not a LipaBill copy of your ledger</h2>
            <p>
              Product analytics and crash reports (for example which screens
              opened, whether SMS permission was granted, payment flow type such
              as send/pay/repeat, and crash stacks) go to Google Firebase. They
              do not include your confirmation SMS bodies, amounts, recipients, or PIN.
              LipaBill does not keep a named account we can look up. We cannot
              delete a Google analytics profile we do not operate. Google’s own
              retention applies to those reports.
            </p>
          </section>

          <section>
            <h2>What we never had</h2>
            <p>
              LipaBill does not store your payment PIN, does not upload your SMS
              inbox or ledger to a LipaBill server, and does not sell your data.
              Denying SMS in the app only stops new history; already imported
              rows stay until you clear storage or uninstall.
            </p>
          </section>

          <section>
            <h2>Privacy</h2>
            <p>
              Full policy:{" "}
              <Link href="/privacy">lipabill.app/privacy</Link>. Questions:{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </section>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
