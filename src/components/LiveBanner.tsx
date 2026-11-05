"use client";

import { useCallback, useSyncExternalStore } from "react";
import { PlayStoreButton } from "@/components/PlayStoreButton";
import { launchLiveCopy } from "@/lib/site";

const DISMISS_KEY = "lipabill-live-notice-v2";
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
  };
}

function isOpen() {
  try {
    return window.localStorage.getItem(DISMISS_KEY) !== "1";
  } catch {
    return true;
  }
}

export function LiveBanner() {
  const open = useSyncExternalStore(subscribe, isOpen, () => false);

  const dismiss = useCallback(() => {
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* private mode */
    }
    emit();
  }, []);

  if (!open) return null;

  return (
    <div className="pointer-events-none p-4 pb-2">
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
        <div className="flex shrink-0 flex-col items-center justify-center gap-3 sm:items-stretch">
          <PlayStoreButton tone="onDark" />
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
