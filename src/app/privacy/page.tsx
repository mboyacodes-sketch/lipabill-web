import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc } from "@/components/LegalDoc";
import { legal } from "@/lib/legal";
import { site } from "@/lib/site";

const description =
  "How LipaBill keeps your transactions, messages, and tickets on your phone, which permissions are optional, and your rights under Kenyan law.";

export const metadata: Metadata = {
  title: "Privacy",
  description,
  alternates: {
    canonical: "/privacy",
    types: { "text/plain": "/llms.txt" },
  },
  openGraph: {
    title: "Privacy — LipaBill",
    description,
    url: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <LegalDoc
      kicker="Privacy"
      title="Your money stays on your phone"
      description={description}
      path="/privacy"
    >
      <p>
        LipaBill is built so your payments, history, and tickets live on this
        device — not in a LipaBill cloud account. This page is the privacy
        policy for the Android app ({legal.packageId}) and {site.url}. It is
        meant to meet the Kenya Data Protection Act, 2019, and Google Play
        Data Safety rules. Data that never leaves your phone (including
        confirmation SMS and your ledger) is not “collected” under Play’s
        definition. Product analytics and crash reports sent to Google are.
      </p>

      <section>
        <h2>Who is responsible</h2>
        <p>
          LipaBill is the data controller for this website and for personal
          data we actually receive (today: optional emails, and Firebase
          events from the Play build). We operate from {legal.country}. Contact:{" "}
          <a href={`mailto:${legal.email}`}>{legal.email}</a>. We have not
          published a company registration number or street address because we
          will not invent one.
        </p>
        <p>
          On-device SMS and the encrypted ledger are processed on your phone
          for the service you asked for. LipaBill does not run a server that
          holds that ledger.
        </p>
      </section>

      <section>
        <h2>What stays on your device</h2>
        <p>
          With your permission, LipaBill reads confirmation SMS from the
          wallets and banks you enable in Kenya, Tanzania, Uganda, and Rwanda —
          M-Pesa, Airtel Money, MTN MoMo, KCB, and others — to build an
          encrypted history, available balance, and spending overview on this
          phone. SMS content is processed and stored only on the device. It is
          not uploaded to LipaBill and is not sent to Google Firebase.
        </p>
        <p>
          Tickets you add — photos, PDFs, passes, or booking details — stay
          on the device. Contacts and camera, if you allow them, are used on
          the phone and not uploaded by LipaBill.
        </p>
        <p>
          If you clear app storage or uninstall LipaBill, that on-device data
          goes with it.
        </p>
      </section>

      <section>
        <h2>Permissions you may see</h2>
        <p>
          You decide what to allow. Turning a permission off limits the
          related feature. Lawful basis under the Data Protection Act: your
          consent for SMS, camera, contacts, notifications, and
          Accessibility; performance of the service you requested for Send /
          Pay after you confirm.
        </p>
        <ul>
          <li>
            <strong>SMS</strong> — local ledger from confirmation messages
            for the wallets you pick. Other messages, including OTPs, are not
            kept as your ledger. Deny SMS and history stays empty. You can
            add or remove providers in Settings.
          </li>
          <li>
            <strong>Phone</strong> — used when you start a Send, Pay, or
            Repeat payment you confirm (including choosing a Safaricom SIM on
            dual-SIM phones).
          </li>
          <li>
            <strong>Contacts</strong> — optional. Helps you pick someone you
            already know when sending. LipaBill uses the system contact
            picker, not a copy of your whole address book.
          </li>
          <li>
            <strong>Camera</strong> — optional. For scanning ticket codes.
          </li>
          <li>
            <strong>AccessibilityService API</strong> — optional. Used only
            to help complete Safaricom M-Pesa USSD steps for Send, Pay, and
            Repeat you start and confirm. After you confirm and enter your
            PIN on LipaBill’s keypad, the service may read on-screen USSD
            prompts and fill the next step for that payment session only. It
            doesn’t read SMS, doesn’t change system settings, and doesn’t
            control unrelated apps when you’re not paying. LipaBill is not an
            accessibility tool for disabilities. You can turn “LipaBill
            M-Pesa payments” off in Android Accessibility settings anytime.
          </li>
          <li>
            <strong>Notifications</strong> — payment status updates.
          </li>
        </ul>
      </section>

      <section>
        <h2>This website</h2>
        <p>
          If you leave your email and tick the consent box, we store that
          address in a Google Sheet so we can send product notes. We do not
          use it for ads. You can refuse and still browse. Email{" "}
          <a href={`mailto:${legal.email}`}>{legal.email}</a> to be removed.
          Cookies: see the <Link href="/cookies">cookie policy</Link>.
        </p>
      </section>

      <section>
        <h2>Improving the app</h2>
        <p>
          The Play build sends product analytics (for example which screens
          are opened, whether SMS permission was granted, and payment flow
          type such as send/pay/repeat) and crash reports to Google Firebase.
          That is the data Google Play treats as collected and shared. It may
          include device and app details needed for diagnostics. It does not
          include confirmation SMS bodies, ledger amounts, recipients, or
          PIN. Advertising ID collection is turned off. Lawful basis:
          legitimate interests in keeping the app stable, and your use of the
          Play build.
        </p>
      </section>

      <section>
        <h2>Where processing happens</h2>
        <p>
          The ledger stays on your phone in Kenya (or wherever you take the
          phone). Emails and Firebase reports are processed by Google, which
          may store them outside Kenya, including in the United States. That
          is a cross-border transfer. We do not sell the data. Google’s terms
          apply to those services.
        </p>
      </section>

      <section>
        <h2>How long we keep it</h2>
        <ul>
          <li>
            On-device ledger and tickets: until you clear storage or
            uninstall.
          </li>
          <li>
            Website email: until you ask us to delete it, or we close the
            list.
          </li>
          <li>
            Firebase: Google’s retention for Analytics and Crashlytics.
          </li>
          <li>
            Cookie preference: up to {legal.cookieMaxAgeDays} days, or until
            you clear it.
          </li>
        </ul>
      </section>

      <section>
        <h2>Your rights (Kenya Data Protection Act, 2019)</h2>
        <p>
          Subject to the Act, you may ask us to: be informed; access personal
          data we hold; correct it; delete it; restrict or object to
          processing; and receive a copy where that applies. We do not make
          solely automated decisions that produce legal effects about you.
        </p>
        <p>
          For the on-device ledger, you already control it: uninstall or
          clear storage. For an email on this site, write to{" "}
          <a href={`mailto:${legal.email}`}>{legal.email}</a>. Steps:{" "}
          <Link href="/delete">delete LipaBill data</Link>.
        </p>
        <p>
          You may complain to the Office of the Data Protection Commissioner:{" "}
          <a href={legal.odpc} rel="noopener noreferrer" target="_blank">
            odpc.go.ke
          </a>
          .
        </p>
      </section>

      <section>
        <h2>Children</h2>
        <p>
          LipaBill is for people 18 and older. We do not knowingly collect
          emails from children. If you believe we have, email{" "}
          <a href={`mailto:${legal.email}`}>{legal.email}</a> and we will
          delete them.
        </p>
      </section>

      <section>
        <h2>What we never do</h2>
        <ul>
          <li>Sell your personal data</li>
          <li>Use your transaction history for advertising</li>
          <li>Store or send your payment PIN</li>
          <li>
            Upload your confirmation SMS, ledger, or full inbox off this phone
          </li>
        </ul>
      </section>

      <section>
        <h2>Questions</h2>
        <p>
          <a href={`mailto:${legal.email}`}>{legal.email}</a> or{" "}
          <Link href="/support">support</Link>. We aim to reply within three
          business days.
        </p>
      </section>

      <section>
        <h2>Updates</h2>
        <p>
          If this policy changes, we update the date at the top of this page.
        </p>
      </section>
    </LegalDoc>
  );
}
