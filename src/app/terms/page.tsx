import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc } from "@/components/LegalDoc";
import { legal } from "@/lib/legal";
import { site } from "@/lib/site";

const description =
  "Terms for using LipaBill and this website. LipaBill is not a bank and does not hold your money.";

export const metadata: Metadata = {
  title: "Terms",
  description,
  alternates: { canonical: "/terms" },
  openGraph: { title: "Terms — LipaBill", description, url: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalDoc kicker="Terms" title="Terms of use" description={description} path="/terms">
      <p>
        These terms are an agreement between you and LipaBill for the Android
        app ({legal.packageId}) and this website ({site.url}). By installing
        the app or using this site, you agree to them. If you do not agree, do
        not use LipaBill.
      </p>

      <section>
        <h2>Who we are</h2>
        <p>
          LipaBill is a Kenya product. The public contact is{" "}
          <a href={`mailto:${legal.email}`}>{legal.email}</a>. We have not
          listed a company registration number or street address on this site
          because we will not invent one. When a registered Kenyan entity
          exists, this page will name it.
        </p>
      </section>

      <section>
        <h2>What LipaBill is — and is not</h2>
        <p>
          LipaBill is a local-first money tracker and helper on your Android
          phone. It is <strong>not</strong> a bank, e-money issuer, or a
          payment service provider authorised by the Central Bank of Kenya. It
          does not hold a balance for you, does not move value on our servers,
          and is not affiliated with Safaricom PLC, M-Pesa, Airtel, KCB, Kenya
          Railways, Madaraka Express, Google, or any wallet or bank named in
          the app.
        </p>
        <p>
          Send and Pay in Kenya place a Safaricom M-Pesa USSD session on{" "}
          <em>your</em> SIM after you confirm. The money moves on that rail,
          not through LipaBill. You must check the amount and recipient before
          you confirm. LipaBill does not store your PIN.
        </p>
      </section>

      <section>
        <h2>Who may use it</h2>
        <p>
          You must be 18 or older and able to enter a contract under Kenyan
          law. The app is built for Kenya on Google Play. Other East African
          countries named on this site are planned, not a promise that every
          wallet there works today.
        </p>
      </section>

      <section>
        <h2>The ledger and SMS</h2>
        <p>
          If you allow SMS, LipaBill reads confirmation texts from wallets and
          banks you enable, on this device, to build an encrypted history. It
          does not read your whole inbox as a messaging app, does not keep
          OTPs as your ledger, and does not send SMS. Parsing can be wrong.
          The confirmation from your bank or wallet is the source of truth —
          not LipaBill.
        </p>
      </section>

      <section>
        <h2>Tickets and passes</h2>
        <p>
          Tickets you add are copies you already have. LipaBill is not the
          issuer, not a booking office, and not an official SGR, airline, or
          event channel. A gate may still want the original issuer’s pass.
          Illustrations on this website are samples, not live tickets.
        </p>
      </section>

      <section>
        <h2>Your responsibilities</h2>
        <ul>
          <li>Keep the phone and app lock under your control.</li>
          <li>Confirm every payment on LipaBill’s screen before the PIN.</li>
          <li>Do not share your PIN with us or anyone claiming to be LipaBill.</li>
          <li>Do not use the app to commit fraud or to access another person’s money.</li>
        </ul>
      </section>

      <section>
        <h2>The website</h2>
        <p>
          This site describes the product and may collect an email if you ask
          for notes. It is not a shop. Copy, screenshots, and sample ledgers
          are for illustration. See{" "}
          <Link href="/licenses">licenses</Link> and{" "}
          <Link href="/cookies">cookies</Link>.
        </p>
      </section>

      <section>
        <h2>Price</h2>
        <p>
          LipaBill on Google Play is free at the time these terms were last
          updated. There is no LipaBill checkout on this website. See{" "}
          <Link href="/refunds">refunds</Link>.
        </p>
      </section>

      <section>
        <h2>Availability</h2>
        <p>
          The app needs a compatible Android phone (Android 8 and up). Send
          and Pay need a Safaricom line and M-Pesa on that device. Features
          that need a permission stay off if you refuse it. We do not promise
          uninterrupted service, perfect SMS parsing, or that a third-party
          rail will stay the same.
        </p>
      </section>

      <section>
        <h2>Intellectual property</h2>
        <p>
          LipaBill’s name, logo, app, and this website are ours. You get a
          personal, non-exclusive licence to use the app as published on
          Google Play. You do not get our source, marks, or a right to clone
          the service. Third-party names remain their owners’.
        </p>
      </section>

      <section>
        <h2>No warranty</h2>
        <p>
          The app and site are provided as is. To the maximum extent Kenyan
          law allows, we disclaim implied warranties of merchantability,
          fitness for a particular purpose, and non-infringement. We do not
          warrant that the ledger is complete or that a payment you confirm
          will succeed on the carrier’s network.
        </p>
      </section>

      <section>
        <h2>Liability</h2>
        <p>
          LipaBill is not liable for money that moves or fails to move on
          M-Pesa or another rail, for a mis-parsed SMS, for a ticket a gate
          will not accept, or for a permission you granted. Nothing in these
          terms limits liability that Kenyan law does not allow us to limit —
          including fraud by us, or death or personal injury caused by our
          negligence, if that applies. For other claims, our aggregate
          liability is limited to KES 0 if the product is free, or to the
          amount you paid us for LipaBill in the 12 months before the claim
          if you later pay us.
        </p>
      </section>

      <section>
        <h2>Privacy</h2>
        <p>
          How we handle information is in the{" "}
          <Link href="/privacy">privacy policy</Link>. Deletion steps are on{" "}
          <Link href="/delete">delete data</Link>.
        </p>
      </section>

      <section>
        <h2>Ending use</h2>
        <p>
          Uninstall the app at any time. We may stop offering LipaBill or
          change these terms. If terms change, we will update the date on
          this page. Continued use after that date means you accept the new
          terms.
        </p>
      </section>

      <section>
        <h2>Law and disputes</h2>
        <p>
          These terms are governed by {legal.governingLaw}. Kenyan courts
          have jurisdiction, without limiting any rights you have as a
          consumer under the Consumer Protection Act, 2012.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Email <a href={`mailto:${legal.email}`}>{legal.email}</a>. We aim
          to answer within three business days.
        </p>
      </section>
    </LegalDoc>
  );
}
