"use client";

import { useEffect, useState } from "react";
import { launchLiveCopy, playStore } from "@/lib/site";

const DISMISS_KEY = "lipabill-live-notice-v2";

export function LiveBanner() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(DISMISS_KEY) === "1") setOpen(false);
    } catch {
      /* private mode */
    }
  }, []);

  useEffect(() => {
    const previous = document.body.style.paddingBottom;
    document.body.style.paddingBottom = open ? "9.5rem" : "";
    return () => {
      document.body.style.paddingBottom = previous;
    };
  }, [open]);

  if (!open) return null;

  function dismiss() {
    setOpen(false);
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* private mode */
    }
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <div
        role="status"
        className="pointer-events-auto mx-auto flex max-w-xl flex-col gap-3 overflow-hidden rounded-3xl bg-[#2f6bff] px-5 py-4 text-white shadow-[0_24px_60px_-16px_rgba(15,28,51,0.55)] sm:max-w-2xl sm:flex-row sm:items-center sm:gap-5 sm:px-6 sm:py-5"
      >
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white/80">
            {launchLiveCopy.badge} on Google Play
          </p>
          <p className="mt-1 text-lg font-semibold leading-snug tracking-tight sm:text-xl">
            {launchLiveCopy.line}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-white/85">
            {launchLiveCopy.detail}
          </p>
        </div>
        <div className="flex shrink-0 items-center justify-center gap-3 sm:flex-col sm:items-stretch">
          <a
            href={playStore.url}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap rounded-xl bg-[#0f1c33] px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-black"
          >
            {launchLiveCopy.cta}
          </a>
          <button
            type="button"
            onClick={dismiss}
            className="text-xs font-medium text-white/75 hover:text-white"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
