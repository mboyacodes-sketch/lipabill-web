import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc } from "@/components/LegalDoc";
import { legal } from "@/lib/legal";

const description =
  "LipaBill is free on Google Play. How refunds work if Google Play ever charges you, and why there is nothing to refund on this website.";

export const metadata: Metadata = {
  title: "Refunds",
  description,
  alternates: { canonical: "/refunds" },
  openGraph: { title: "Refunds — LipaBill", description, url: "/refunds" },
};

export default function RefundsPage() {
  return (
    <LegalDoc
      kicker="Refunds"
      title="Refund policy"
      description={description}
      path="/refunds"
    >
      <p>
        LipaBill does not take payment on this website and does not hold your
        money. There is no LipaBill checkout, subscription, or in-app product
        for sale at the date on this page.
      </p>

      <section>
        <h2>The Android app</h2>
        <p>
          The listing on Google Play is free. If you paid Google Play for
          LipaBill in error, request a refund from Google using Play’s own
          refund process. We do not receive card details and cannot reverse a
          Play charge from this site.
        </p>
        <p>
          Play’s help article for refunds:{" "}
          <a
            href="https://support.google.com/googleplay/answer/2479637"
            rel="noopener noreferrer"
            target="_blank"
          >
            Request a refund on Google Play
          </a>
          .
        </p>
      </section>

      <section>
        <h2>Money you send with Send or Pay</h2>
        <p>
          Amounts you confirm in LipaBill move on Safaricom M-Pesa (or another
          rail you use), not through LipaBill. We cannot refund a till payment,
          Pochi, or send to a person. Use M-Pesa reversal or the recipient’s
          institution. Check the amount before you confirm.
        </p>
      </section>

      <section>
        <h2>This website</h2>
        <p>
          The email form is free. There is nothing to refund for leaving an
          address. To stop notes, email{" "}
          <a href={`mailto:${legal.email}`}>{legal.email}</a>.
        </p>
      </section>

      <section>
        <h2>If we later charge for LipaBill</h2>
        <p>
          If a paid LipaBill product appears, we will update this page with
          the price, what you get, and how to cancel. Until then, do not treat
          any third-party listing that charges for “LipaBill” as ours unless
          it is the official Play link:{" "}
          <a href={legal.playUrl} rel="noopener noreferrer" target="_blank">
            {legal.playUrl}
          </a>
          .
        </p>
      </section>

      <section>
        <h2>Kenya consumer rights</h2>
        <p>
          Nothing here takes away rights you have under the Consumer
          Protection Act, 2012 that cannot be waived. For the app listing,
          Google Play’s refund rules also apply because Play is the store.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Refund questions: <a href={`mailto:${legal.email}`}>{legal.email}</a>.
          Data deletion is separate — see{" "}
          <Link href="/delete">delete LipaBill data</Link>.
        </p>
      </section>
    </LegalDoc>
  );
}
