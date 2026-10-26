import Image from "next/image";
import Link from "next/link";

export function FreezeBanner() {
  return (
    <div className="relative overflow-hidden bg-[linear-gradient(100deg,#ffe08a_0%,#ffb020_38%,#ff7a18_100%)] text-[#2a1600]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-8 w-24 -skew-x-12 bg-white/35"
      />
      <div className="relative mx-auto flex max-w-[90rem] flex-col items-center gap-2 px-5 py-2.5 text-center sm:flex-row sm:justify-center sm:gap-3 sm:px-8 sm:py-3 sm:text-left">
        <span className="shrink-0 rounded-full bg-[#2a1600] px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#ffe08a]">
          Awaiting production review
        </span>
        <p className="text-sm font-semibold leading-snug sm:text-[0.95rem]">
          Submitted to the Play Store.
          <span className="font-medium">
            {" "}
            Review is in progress — the download button stays offline until Google clears it.
          </span>
        </p>
      </div>
    </div>
  );
}

export function SiteHeader({ solid = false }: { solid?: boolean }) {
  return (
    <header
      className={`mx-auto flex w-full max-w-[1600px] items-center justify-between px-5 py-4 sm:px-8 sm:py-5 lg:px-10 ${
        solid ? "" : ""
      }`}
    >
      <Link
        href="/"
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
      <nav className="flex items-center gap-4 text-sm text-ink-soft sm:gap-6">
        <Link href="/privacy" className="hidden hover:text-ink sm:inline">
          Privacy
        </Link>
        <Link href="/support" className="hidden hover:text-ink sm:inline">
          Support
        </Link>
        <Link
          href="/#notify"
          className="whitespace-nowrap rounded-xl bg-blue/10 px-3.5 py-2 text-sm font-medium text-blue sm:px-4 sm:py-2.5"
        >
          Early access
        </Link>
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
              Offline-First Transaction Wallet
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Money, payments &amp; tickets — on this phone.
            </h2>
          </div>
          <Link
            href="/#notify"
            className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white px-6 py-3.5 text-sm font-medium text-bar"
          >
            Early access
          </Link>
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
            <Link href="/mpesa" className="hover:text-white">
              M-Pesa
            </Link>
            <Link href="/sgr" className="hover:text-white">
              SGR
            </Link>
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/support" className="hover:text-white">
              Support
            </Link>
          </div>
          <p className="text-sky/70">
            © {new Date().getFullYear()} LipaBill.
          </p>
        </div>
      </footer>
    </>
  );
}
