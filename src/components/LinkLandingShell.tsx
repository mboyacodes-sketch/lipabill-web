"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

/** Shared chrome for `/p/…` and `/s/…` landings. */
export function LinkLandingShell({
  children,
  toast,
  brandCaption,
}: {
  children: ReactNode;
  toast: string | null;
  brandCaption: string;
}) {
  return (
    <main className="hero-soft relative flex min-h-[100dvh] justify-center overflow-hidden px-5 pb-[max(28px,env(safe-area-inset-bottom))] pt-[max(28px,env(safe-area-inset-top))]">
      <div className="pointer-events-none absolute inset-x-0 top-[max(1.25rem,env(safe-area-inset-top))] z-0 px-4">
        <p
          aria-hidden
          className="watermark text-center text-[clamp(3rem,16vw,5.5rem)]"
        >
          LipaBill
        </p>
      </div>

      <div className="relative z-10 flex w-full max-w-[400px] flex-col gap-4 pt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 self-start text-ink no-underline"
          aria-label="LipaBill home"
        >
          <Image
            src="/brand/lipabill-logo.png"
            alt=""
            width={32}
            height={32}
            className="rounded-[9px]"
          />
          <span>
            <span className="block text-sm font-semibold tracking-tight leading-tight">
              LipaBill
            </span>
            <span className="mt-0.5 block text-[0.7rem] font-medium text-mute">
              {brandCaption}
            </span>
          </span>
        </Link>

        {children}

        <p className="text-center text-[0.7rem] font-medium leading-snug text-mute">
          Shared from LipaBill ·{" "}
          <Link href="/" className="font-semibold text-blue no-underline">
            lipabill.app
          </Link>
        </p>
      </div>

      <div
        role="status"
        className={`pointer-events-none fixed bottom-[max(24px,env(safe-area-inset-bottom))] left-1/2 z-20 -translate-x-1/2 rounded-full bg-ink px-3.5 py-2 text-[0.75rem] font-semibold text-white transition-opacity ${
          toast ? "opacity-100" : "opacity-0"
        }`}
      >
        {toast || " "}
      </div>
    </main>
  );
}

export function LinkLandingPanel({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-[24px] border border-line bg-paper/95 px-5 pb-4 pt-5 shadow-[0_18px_40px_-28px_rgba(15,28,51,0.35)] backdrop-blur-[2px]">
      {children}
    </section>
  );
}

export function LinkLandingCopyRow({
  label,
  value,
  display,
  bordered = false,
  valueClassName = "",
  onCopy,
}: {
  label: string;
  value: string;
  display?: ReactNode;
  bordered?: boolean;
  valueClassName?: string;
  onCopy: (label: string, value: string) => void | Promise<void>;
}) {
  const shown = display ?? value;
  const ariaShown = typeof shown === "string" ? shown : value;
  return (
    <button
      type="button"
      onClick={() => onCopy(label, value)}
      className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-white/55 active:bg-white/80 ${
        bordered ? "border-t border-line/80" : ""
      }`}
      aria-label={`Copy ${label}: ${ariaShown}`}
    >
      <span className="min-w-0 flex-1">
        <span className="block text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-mute">
          {label}
        </span>
        <span className={`mt-1 block break-words ${valueClassName}`}>
          {shown}
        </span>
      </span>
      <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-[0.625rem] font-semibold tracking-wide text-blue shadow-[0_1px_0_rgba(15,28,51,0.04)]">
        Copy
      </span>
    </button>
  );
}
