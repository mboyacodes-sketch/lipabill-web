"use client";

import { useEffect, useState, type ReactNode } from "react";
import { PlayStoreButton } from "@/components/PlayStoreButton";
import {
  launchAt,
  launchCountdownPaused,
  launchDayLabel,
  launchPauseCopy,
  playStore,
} from "@/lib/site";

const LAUNCH_MS = Date.parse(launchAt);

function splitRemaining(now: number) {
  const ms = Math.max(0, LAUNCH_MS - now);
  const totalSeconds = Math.floor(ms / 1000);
  return {
    done: ms === 0,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function LaunchPromo({ className = "" }: { className?: string }) {
  // Stay null until mount so the server HTML and the first client render match.
  // A fresh Date.now() inside render never compares equal and React tears the page down.
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    if (playStore.enabled || launchCountdownPaused) return;
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (playStore.enabled) {
    return (
      <div
        className={`flex w-full max-w-md flex-col items-center text-center lg:items-start lg:text-left ${className}`}
      >
        <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-blue">
          On Google Play
        </p>
        <p className="mt-2 text-[clamp(1.85rem,1.2rem+1.5vw,2.35rem)] font-semibold tracking-tight text-ink">
          Kenya is live
        </p>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-mute">
          Tanzania, Uganda, and Rwanda are coming soon.
        </p>
        <div className="mt-5 flex flex-col items-center lg:items-start">
          <PlayStoreButton />
        </div>
      </div>
    );
  }

  const remaining = now == null ? null : splitRemaining(now);
  const headline = launchCountdownPaused
    ? "On pause"
    : !remaining
      ? "Days to go"
      : remaining.done
        ? "Launch day"
        : remaining.days === 0
          ? "Launching today"
          : `${remaining.days} ${remaining.days === 1 ? "day" : "days"} to go`;

  return (
    <div
      className={`flex w-full max-w-md flex-col items-center text-center lg:items-start lg:text-left ${className}`}
    >
      <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-blue">
        Coming to Google Play
      </p>
      <p className="mt-2 text-[clamp(1.85rem,1.2rem+1.5vw,2.35rem)] font-semibold tracking-tight text-ink">
        {headline}
      </p>
      {launchCountdownPaused ? (
        <CrimeSceneClock>
          <div
            className="grid grid-cols-3 gap-2 opacity-45"
            role="status"
            aria-label="Launch countdown paused"
          >
            <Tick value="—" label="Hours" />
            <Tick value="—" label="Min" />
            <Tick value="—" label="Sec" />
          </div>
          <p className="relative z-20 mt-8 text-xs text-mute">
            We’ll start the clock again when it’s ready.
          </p>
        </CrimeSceneClock>
      ) : (
        <>
          <div
            className="mt-4 grid w-full max-w-xs grid-cols-3 gap-2"
            role="timer"
            aria-label={`Countdown to ${launchDayLabel()}`}
          >
            <Tick value={remaining ? pad(remaining.hours) : "—"} label="Hours" />
            <Tick value={remaining ? pad(remaining.minutes) : "—"} label="Min" />
            <Tick value={remaining ? pad(remaining.seconds) : "—"} label="Sec" />
          </div>
          <p className="mt-3 text-xs text-mute">{launchDayLabel()}</p>
        </>
      )}
      <div className="mt-5 flex flex-col items-center lg:items-start">
        <PlayStoreButton />
        {playStore.enabled ? null : (
          <p className="mt-2 text-xs text-mute">Available on launch day</p>
        )}
      </div>
    </div>
  );
}

function CrimeSceneClock({ children }: { children: ReactNode }) {
  return (
    <div className="relative mt-4 w-full max-w-xs">
      <div className="police-tape p-[7px] shadow-[0_12px_28px_-16px_rgba(0,0,0,0.55)]">
        <div className="relative overflow-hidden bg-paper px-3 pb-4 pt-3">
          {children}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-[-22%] top-[38%] -rotate-[12deg] shadow-[0_6px_18px_-8px_rgba(0,0,0,0.45)]"
          >
            <div className="police-tape h-1.5" />
            <p className="bg-[#f5c400] py-[3px] text-center text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[#111]">
              {launchPauseCopy.badge}
            </p>
            <div className="police-tape h-1.5" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Tick({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl bg-sky-soft px-2 py-2.5 text-center">
      <p className="text-xl font-semibold tabular-nums tracking-tight text-ink">{value}</p>
      <p className="mt-0.5 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-mute">
        {label}
      </p>
    </div>
  );
}

