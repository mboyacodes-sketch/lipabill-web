"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { trackPayLink } from "@/lib/paylink-analytics";
import { maskCode, maskPayIdentifier } from "@/lib/paylink-mask";
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

function viewModel(target: PayLinkTarget) {
  if (target.kind === "PHONE") {
    return {
      chip: "Send money",
      title: "Send to this number",
      subtitle:
        "Tap the number to copy it, then finish in M-Pesa — or open LipaBill if you already have it.",
      destLabel: "Phone",
      destValue: target.identifier,
      destDisplay: maskPayIdentifier("PHONE", target.identifier),
      account: null as string | null,
      accountDisplay: null as string | null,
      hint: "Tap each value to copy, then paste it in M-Pesa Send money.",
    };
  }
  if (target.kind === "TILL") {
    return {
      chip: "Buy goods",
      title: "Pay this till",
      subtitle:
        "Tap the till to copy it, then use Buy Goods in M-Pesa — or open LipaBill if you already have it.",
      destLabel: "Till",
      destValue: target.identifier,
      destDisplay: maskPayIdentifier("TILL", target.identifier),
      account: null,
      accountDisplay: null,
      hint: "Tap each value to copy, then paste it in M-Pesa Buy Goods.",
    };
  }
  return {
    chip: "Pay bill",
    title: "Pay this bill",
    subtitle:
      "Tap business number and account separately to copy each one — then finish Pay Bill in M-Pesa.",
    destLabel: "Business number",
    destValue: target.identifier,
    destDisplay: maskPayIdentifier("PAYBILL", target.identifier),
    account: target.account,
    accountDisplay: target.account ? maskCode(target.account) : null,
    hint: "Tap each value to copy it on its own for M-Pesa Pay Bill.",
  };
}

export function PayLinkLanding({ token, target }: Props) {
  const [toast, setToast] = useState<string | null>(null);
  const kind = target?.kind ?? "invalid";

  useEffect(() => {
    trackPayLink("paylink_view", { kind });
  }, [kind]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1600);
  }, []);

  const onCopyValue = useCallback(
    async (label: string, value: string) => {
      try {
        await copyText(value);
        trackPayLink("paylink_copy", {
          kind,
          field: label.toLowerCase(),
        });
        showToast(`Copied ${label.toLowerCase()}`);
      } catch {
        showToast("Couldn’t copy");
      }
    },
    [kind, showToast],
  );

  if (!target) {
    return (
      <Shell toast={toast}>
        <section className="rounded-[24px] border border-line bg-paper/95 px-5 pb-4 pt-5 shadow-[0_18px_40px_-28px_rgba(15,28,51,0.35)] backdrop-blur-[2px]">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-[#dc2626]">
            Unavailable
          </p>
          <h1 className="mt-2 text-[1.125rem] font-semibold tracking-tight text-ink">
            This link isn’t valid anymore
          </h1>
          <p className="mt-1.5 text-sm font-medium leading-snug text-ink-soft">
            Ask for a fresh one, or open M-Pesa and enter the details yourself.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                trackPayLink("paylink_open_mpesa", { kind: "invalid" });
                openMpesa();
              }}
              className="flex min-h-11 items-center justify-center rounded-xl border border-line bg-paper px-4 text-sm font-semibold tracking-tight text-ink"
            >
              Open M-Pesa
            </button>
            <button
              type="button"
              onClick={() => {
                trackPayLink("paylink_open_store", { kind: "invalid" });
                openPlayStore();
              }}
              className="flex min-h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold text-blue"
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
      <section className="rounded-[24px] border border-line bg-paper/95 px-5 pb-4 pt-5 shadow-[0_18px_40px_-28px_rgba(15,28,51,0.35)] backdrop-blur-[2px]">
        <p className="inline-flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-blue">
          <span className="h-1.5 w-1.5 rounded-full bg-blue" aria-hidden />
          {vm.chip}
        </p>
        <h1 className="mt-2 text-[1.125rem] font-semibold tracking-tight leading-snug text-ink">
          {vm.title}
        </h1>
        <p className="mt-1.5 text-sm font-medium leading-snug text-ink-soft">
          {vm.subtitle}
        </p>

        <div className="mt-4 overflow-hidden rounded-[18px] border border-line bg-sky-soft">
          <CopyRow
            label={vm.destLabel}
            value={vm.destValue}
            display={vm.destDisplay}
            valueClassName="text-[clamp(1.25rem,1.05rem+1.2vw,1.45rem)] font-semibold tracking-tight leading-[1.2] tabular-nums text-ink"
            onCopy={onCopyValue}
          />
          {vm.account && vm.accountDisplay ? (
            <CopyRow
              label="Account"
              value={vm.account}
              display={vm.accountDisplay}
              bordered
              valueClassName="text-[0.9375rem] font-semibold tracking-tight text-ink"
              onCopy={onCopyValue}
            />
          ) : null}
          {amount != null ? (
            <CopyRow
              label="Amount"
              value={String(amount)}
              display={
                <span className="flex items-baseline gap-1.5">
                  <span className="text-xs font-semibold text-mute">KES</span>
                  <span className="text-[clamp(1.2rem,1.05rem+0.9vw,1.35rem)] font-semibold tracking-tight tabular-nums text-ink">
                    {amount.toLocaleString("en-KE")}
                  </span>
                </span>
              }
              bordered
              onCopy={onCopyValue}
            />
          ) : null}
        </div>

        <div className="mt-4 flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => {
              trackPayLink("paylink_open_mpesa", { kind });
              openMpesa();
            }}
            className="flex min-h-11 items-center justify-center rounded-xl bg-blue px-4 text-sm font-semibold tracking-tight text-white shadow-[0_10px_22px_-14px_rgba(26,63,156,0.85)]"
          >
            Open M-Pesa
          </button>
          <button
            type="button"
            onClick={() => {
              trackPayLink("paylink_open_app", { kind });
              openLipaBill(token);
            }}
            className="flex min-h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold text-blue"
          >
            Open in LipaBill
          </button>
          <button
            type="button"
            onClick={() => {
              trackPayLink("paylink_open_store", { kind });
              openPlayStore();
            }}
            className="flex min-h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold text-blue"
          >
            Get LipaBill
          </button>
        </div>
        <p className="mt-1 text-center text-[0.7rem] font-medium leading-snug text-mute">
          {vm.hint}
        </p>
      </section>
    </Shell>
  );
}

function CopyRow({
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

function Shell({
  children,
  toast,
}: {
  children: ReactNode;
  toast: string | null;
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
              Payment link
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
