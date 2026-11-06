import Image from "next/image";
import Link from "next/link";
import { PlayStoreButton } from "@/components/PlayStoreButton";
import { legalPaths } from "@/lib/legal";
import { site } from "@/lib/site";

const navLinks = [
  { href: "/#rails", label: "Countries", className: "hidden hover:text-ink sm:inline" },
  { href: "/socials", label: "Socials", className: "hidden hover:text-ink sm:inline" },
  { href: legalPaths.privacy, label: "Privacy", className: "hidden hover:text-ink sm:inline" },
  { href: legalPaths.support, label: "Support", className: "hidden hover:text-ink sm:inline" },
] as const;

const footerLinks = [
  { href: "/#rails", label: "Countries" },
  { href: "/mpesa", label: "Payments" },
  { href: "/socials", label: "Socials" },
  { href: "/sgr", label: "Passes" },
  { href: legalPaths.support, label: "Support" },
  { href: legalPaths.privacy, label: "Privacy" },
  { href: legalPaths.terms, label: "Terms" },
  { href: legalPaths.cookies, label: "Cookies" },
  { href: legalPaths.refunds, label: "Refunds" },
  { href: legalPaths.licenses, label: "Licenses" },
  { href: legalPaths.delete, label: "Delete data" },
] as const;

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-5 py-4 sm:px-8 sm:py-5 lg:px-10">
      <Link
        href="/"
        aria-label="LipaBill home"
        className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-ink"
      >
        <Image
          src="/brand/lipabill-logo.png"
          alt=""
          width={36}
          height={36}
          className="h-9 w-9"
          priority
        />
        LipaBill
      </Link>
      <nav className="flex items-center gap-4 text-sm text-ink-soft sm:gap-6" aria-label="Primary">
        {navLinks.map((item) => (
          <Link key={item.href} href={item.href} className={item.className}>
            {item.label}
          </Link>
        ))}
        <PlayStoreButton />
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <>
      <section className="border-t border-line/70 bg-bar text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-12 sm:flex-row sm:items-center sm:px-8 sm:py-14">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-sky">
              See, then move
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Understand the picture. Then send, pay, or show the code.
            </h2>
          </div>
          <PlayStoreButton tone="onDark" />
        </div>
      </section>

      <footer className="border-t border-white/10 bg-bar pb-10 pt-2 text-sky/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="flex items-center gap-2 font-medium text-white/90">
            <Image
              src="/brand/lipabill-logo.png"
              alt=""
              width={28}
              height={28}
              className="h-7 w-7"
            />
            LipaBill
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {footerLinks.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-5 pt-4 text-xs leading-relaxed text-sky/60 sm:px-8">
          <p>
            LipaBill is a Kenya product. Not a bank, not an e-money issuer, and
            not a Central Bank of Kenya authorised payment service provider.
            Not affiliated with Safaricom, M-Pesa, Airtel, KCB, Kenya Railways,
            or Google. Contact{" "}
            <a className="text-sky hover:text-white" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            . Kenya.
          </p>
          <p className="mt-2 text-sky/70">
            © {new Date().getFullYear()} LipaBill.
          </p>
        </div>
      </footer>
    </>
  );
}
