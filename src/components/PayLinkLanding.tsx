"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState, type ReactNode } from "react";
import type { PayLinkTarget } from "@/lib/paylink-parse";
import {
  copyText,
  openLipaBill,
  openMpesa,
  openPlayStore,
} from "@/lib/paylink-open";

type Props = {
  token: string;
  target: PayLinkTarget | null;
};

function copyPayload(target: PayLinkTarget): string {
  let payload =
    target.kind === "PAYBILL"
      ? `${target.identifier} ${target.account || ""}`.trim()
      : target.identifier;
  if (target.amountShillings) {
    payload += ` KES ${target.amountShillings}`;
  }
  return payload;
}

function viewModel(target: PayLinkTarget) {
  if (target.kind === "PHONE") {
    return {
      chip: "Send money",
      title: "Send to this number",
      subtitle:
        "Copy it, then finish the send in M-Pesa — or open LipaBill if you already have it.",
      destLabel: "Phone",
      destValue: target.identifier,
      account: null as string | null,
      hint: "Copy the number, then paste it in M-Pesa Send money.",
    };
  }
  if (target.kind === "TILL") {
    return {
      chip: "Buy goods",
      title: "Pay this till",
      subtitle:
        "Copy the till, then use Buy Goods in M-Pesa — or open LipaBill if you already have it.",
      destLabel: "Till",
      destValue: target.identifier,
      account: null,
      hint: "Copy the till, then paste it in M-Pesa Buy Goods.",
    };
  }
  return {
    chip: "Pay bill",
    title: "Pay this bill",
    subtitle:
      "Copy business and account, then use Pay Bill in M-Pesa — or open LipaBill if you already have it.",
    destLabel: "Business number",
    destValue: target.identifier,
    account: target.account,
    hint: "Copy both numbers, then paste them in M-Pesa Pay Bill.",
  };
}

export function PayLinkLanding({ token, target }: Props) {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1600);
  }, []);

  const onCopy = useCallback(async () => {
    if (!target) return;
    try {
      await copyText(copyPayload(target));
      showToast("Copied — paste in M-Pesa");
    } catch {
      showToast("Couldn’t copy");
    }
  }, [showToast, target]);

  if (!target) {
    return (
      <Shell toast={toast}>
        <section className="rounded-[28px] border border-line bg-paper px-[22px] pb-5 pt-6 shadow-[0_18px_40px_-28px_rgba(15,28,51,0.35)]">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-[#dc2626]">
            Unavailable
          </p>
          <h1 className="mt-2.5 text-[1.375rem] font-bold tracking-[-0.03em] text-ink">
            This link isn’t valid anymore
          </h1>
          <p className="mt-2 text-[0.9375rem] font-medium leading-snug text-ink-soft">
            Ask for a fresh one, or open M-Pesa and enter the details yourself.
          </p>
          <div className="mt-5 flex flex-col gap-2">
            <button
              type="button"
              onClick={openMpesa}
              className="flex min-h-[52px] items-center justify-center rounded-[14px] border border-line bg-paper px-4 text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink"
            >
              Open M-Pesa
            </button>
            <button
              type="button"
              onClick={openPlayStore}
              className="flex min-h-11 items-center justify-center rounded-[14px] px-4 text-sm font-semibold text-blue"
            >
              Get LipaBill
            </button>
          </div>
        </section>
      </Shell>
    );
  }

  const vm = viewModel(target);
  const amount = target.amountShillings;

  return (
    <Shell toast={toast}>
      <section className="rounded-[28px] border border-line bg-paper px-[22px] pb-5 pt-6 shadow-[0_18px_40px_-28px_rgba(15,28,51,0.35)]">
        <p className="inline-flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-blue">
          <span className="h-1.5 w-1.5 rounded-full bg-blue" aria-hidden />
          {vm.chip}
        </p>
        <h1 className="mt-2.5 text-[1.375rem] font-bold tracking-[-0.03em] leading-snug text-ink">
          {vm.title}
        </h1>
        <p className="mt-2 text-[0.9375rem] font-medium leading-snug text-ink-soft">
          {vm.subtitle}
        </p>

        <div className="mt-5 rounded-[22px] border border-line bg-sky-soft px-[18px] py-5">
          <div className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-mute">
            {vm.destLabel}
          </div>
          <div className="mt-1.5 text-[clamp(1.625rem,1.2rem+2.2vw,2rem)] font-bold tracking-[-0.035em] leading-[1.15] break-words tabular-nums text-ink">
            {vm.destValue}
          </div>
          {vm.account ? (
            <div className="mt-2.5 border-t border-line/80 pt-2.5">
              <div className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-mute">
                Account
              </div>
              <div className="mt-1 text-[1.0625rem] font-semibold tracking-[-0.02em] break-words">
                {vm.account}
              </div>
            </div>
          ) : null}
          {amount != null ? (
            <div className="mt-3.5 flex items-baseline gap-1.5">
              <span className="text-sm font-semibold text-mute">KES</span>
              <span className="text-[clamp(1.5rem,1.15rem+1.5vw,1.75rem)] font-bold tracking-[-0.03em] tabular-nums text-ink">
                {amount.toLocaleString("en-KE")}
              </span>
            </div>
          ) : null}
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <button
            type="button"
            onClick={onCopy}
            className="flex min-h-[52px] items-center justify-center rounded-[14px] bg-blue px-4 text-[0.9375rem] font-semibold tracking-[-0.01em] text-white shadow-[0_10px_22px_-14px_rgba(26,63,156,0.85)]"
          >
            Copy details
          </button>
          <button
            type="button"
            onClick={openMpesa}
            className="flex min-h-[52px] items-center justify-center rounded-[14px] border border-line bg-paper px-4 text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink"
          >
            Open M-Pesa
          </button>
          <button
            type="button"
            onClick={() => openLipaBill(token)}
            className="flex min-h-11 items-center justify-center rounded-[14px] px-4 text-sm font-semibold text-blue"
          >
            Open in LipaBill
          </button>
          <button
            type="button"
            onClick={openPlayStore}
            className="flex min-h-11 items-center justify-center rounded-[14px] px-4 text-sm font-semibold text-blue"
          >
            Get LipaBill
          </button>
        </div>
        <p className="mt-1 text-center text-xs font-medium leading-snug text-mute">
          {vm.hint}
        </p>
      </section>
    </Shell>
  );
}

function Shell({
  children,
  toast,
}: {
  children: ReactNode;
  toast: string | null;
}) {
  return (
    <main className="flex min-h-[100dvh] justify-center bg-[radial-gradient(ellipse_80%_50%_at_50%_-8%,rgba(47,107,255,0.14),transparent_55%),var(--mist)] px-5 pb-[max(28px,env(safe-area-inset-bottom))] pt-[max(32px,env(safe-area-inset-top))]">
      <div className="flex w-full max-w-[400px] flex-col gap-5">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 self-start text-ink no-underline"
          aria-label="LipaBill home"
        >
          <Image
            src="/brand/lipabill-logo.png"
            alt=""
            width={36}
            height={36}
            className="rounded-[10px]"
          />
          <span>
            <span className="block text-base font-bold tracking-[-0.02em] leading-tight">
              LipaBill
            </span>
            <span className="mt-0.5 block text-xs font-medium text-mute">
              Payment link
            </span>
          </span>
        </Link>

        {children}

        <p className="text-center text-xs font-medium leading-snug text-mute">
          Shared from LipaBill ·{" "}
          <Link href="/" className="font-semibold text-blue no-underline">
            lipabill.app
          </Link>
        </p>
      </div>

      <div
        role="status"
        className={`pointer-events-none fixed bottom-[max(24px,env(safe-area-inset-bottom))] left-1/2 z-20 -translate-x-1/2 rounded-full bg-ink px-3.5 py-2.5 text-[0.8125rem] font-semibold text-white transition-opacity ${
          toast ? "opacity-100" : "opacity-0"
        }`}
      >
        {toast || " "}
      </div>
    </main>
  );
}
