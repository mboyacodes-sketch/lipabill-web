"use client";

import { useMemo, useState } from "react";
import {
  railLabel,
  regions,
  starterIds,
  type RegionCatalog,
  type RegionId,
} from "@/lib/rails";

export function RailsStage() {
  const [regionId, setRegionId] = useState<RegionId>("KE");
  const region = useMemo(
    () => regions.find((item) => item.id === regionId) ?? regions[0],
    [regionId]
  );
  const [picked, setPicked] = useState<Set<string>>(
    () => new Set(starterIds(regions[0]))
  );

  function chooseCountry(next: RegionCatalog) {
    setRegionId(next.id);
    setPicked(new Set(starterIds(next)));
  }

  function toggleRail(id: string) {
    setPicked((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        if (next.size === 1) return current;
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  const wallets = region.rails.filter((rail) => rail.kind === "wallet");
  const banks = region.rails.filter((rail) => rail.kind === "bank");
  const visibleMoves = region.sample.filter((move) => picked.has(move.railId));
  const primary = railLabel(region, region.primaryWallet);

  return (
    <section id="rails" className="rails-stage scroll-mt-8">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-sky">
          On this phone
        </p>
        <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-[clamp(1.75rem,1.2rem+2vw,2.75rem)] font-semibold leading-[1.08] tracking-tight text-white">
              Kenya is live.
              <br />
              More countries soon.
            </h2>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-sky/85">
              Wallets and banks already send confirmation texts. LipaBill
              keeps the ones you choose in Kenya — encrypted here, not in a
              cloud account. Tanzania, Uganda, and Rwanda are coming soon.
              Send and Pay stay Kenya M-Pesa.
            </p>
          </div>
          <p
            className="hidden text-sm text-sky/70 lg:block"
            aria-label="East Africa"
          >
            {regions.map((item, index) => (
              <span key={item.id}>
                {index > 0 ? (
                  <span className="mx-2 text-sky/30" aria-hidden>
                    ·
                  </span>
                ) : null}
                <span
                  className={
                    item.id === region.id ? "font-medium text-white" : undefined
                  }
                >
                  {item.city}
                </span>
              </span>
            ))}
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Country"
          className="mt-10 grid grid-cols-2 gap-2 sm:flex"
        >
          {regions.map((item) => {
            const selected = item.id === region.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="rails-panel"
                id={`country-${item.id}`}
                onClick={() => chooseCountry(item)}
                className={`rails-stamp ${selected ? "is-on" : ""}`}
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="font-semibold tracking-tight">{item.id}</span>
                  {item.comingSoon ? (
                    <span className="rounded-md bg-white/15 px-1.5 py-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.12em]">
                      Soon
                    </span>
                  ) : null}
                </span>
                <span className="mt-1 block text-sm font-medium">
                  {item.name}
                </span>
                <span className="mt-0.5 block text-[0.7rem] uppercase tracking-[0.14em] opacity-70">
                  {item.currencySymbol}
                </span>
              </button>
            );
          })}
        </div>

        <div
          id="rails-panel"
          role="tabpanel"
          aria-labelledby={`country-${region.id}`}
          className="mt-8 grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_18.5rem]"
        >
          <div className="order-2 xl:order-1">
            {region.comingSoon ? (
              <p
                role="status"
                className="mb-6 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm leading-relaxed text-white"
              >
                <span className="font-semibold">Coming soon.</span>{" "}
                {region.name} is on the map — the ledger for these wallets is
                not on Google Play yet. Kenya is live today.
              </p>
            ) : null}
            <div className={region.comingSoon ? "pointer-events-none opacity-55" : undefined}>
            <RailGroup
              label="Mobile money"
              hint="The wallets on this SIM"
              rails={wallets}
              picked={picked}
              primaryId={region.primaryWallet}
              onToggle={toggleRail}
              size="lg"
            />
            <RailGroup
              className="mt-7"
              label="Banks"
              hint="Confirmation SMS from the same inbox"
              rails={banks}
              picked={picked}
              primaryId={region.primaryWallet}
              onToggle={toggleRail}
              size="sm"
            />

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <p className="text-sky/80">
                <span className="font-semibold tabular-nums text-white">
                  {picked.size}
                </span>
                <span className="text-sky/50"> / {region.rails.length}</span>
                {" "}on this ledger
              </p>
              <button
                type="button"
                className="font-medium text-sky hover:text-white"
                onClick={() =>
                  setPicked(new Set(region.rails.map((rail) => rail.id)))
                }
              >
                Use all
              </button>
              <button
                type="button"
                className="font-medium text-sky hover:text-white"
                onClick={() => setPicked(new Set([region.primaryWallet]))}
              >
                Primary only
              </button>
            </div>

            <dl className="mt-8 grid gap-3 sm:grid-cols-3">
              <Fact
                label="Ledger"
                value="On this phone"
                detail="Encrypted. No LipaBill account."
              />
              <Fact
                label="Send & Pay"
                value={region.canSendPay ? "Kenya M-Pesa" : "Not in this country"}
                detail={
                  region.canSendPay
                    ? "Confirm, then it runs on this device."
                    : "Ledger only for now."
                }
              />
              <Fact
                label="Fuliza"
                value={region.hasFuliza ? "In the picture" : "Not on this rail"}
                detail={
                  region.hasFuliza
                    ? "Kenya M-Pesa overdraft sits in history."
                    : "Shown when the wallet sends it."
                }
              />
            </dl>
            </div>
          </div>

          <div className="order-1 xl:order-2">
            <PhonePreview
              region={region}
              primary={primary}
              picked={picked}
              moves={visibleMoves}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function RailGroup({
  label,
  hint,
  rails,
  picked,
  primaryId,
  onToggle,
  size,
  className = "",
}: {
  label: string;
  hint: string;
  rails: RegionCatalog["rails"];
  picked: Set<string>;
  primaryId: string;
  onToggle: (id: string) => void;
  size: "lg" | "sm";
  className?: string;
}) {
  if (rails.length === 0) return null;
  return (
    <div className={className}>
      <div>
        <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-sky">
          {label}
        </p>
        <p className="mt-1 text-xs text-sky/55">{hint}</p>
      </div>
      <div
        role="group"
        aria-label={label}
        className={`mt-3 flex flex-wrap ${size === "lg" ? "gap-2" : "gap-1.5"}`}
      >
        {rails.map((rail) => {
          const on = picked.has(rail.id);
          const isPrimary = rail.id === primaryId;
          return (
            <button
              key={rail.id}
              type="button"
              aria-pressed={on}
              onClick={() => onToggle(rail.id)}
              className={`rails-chip ${size === "lg" ? "rails-chip-lg" : "rails-chip-sm"} ${
                on ? "is-on" : ""
              }`}
            >
              {rail.label}
              {isPrimary ? (
                <span className="rails-chip-mark">Balance</span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Fact({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4">
      <dt className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-sky/70">
        {label}
      </dt>
      <dd className="mt-2 text-sm font-semibold text-white">{value}</dd>
      <p className="mt-1 text-xs leading-relaxed text-sky/60">{detail}</p>
    </div>
  );
}

function PhonePreview({
  region,
  primary,
  picked,
  moves,
}: {
  region: RegionCatalog;
  primary: string;
  picked: Set<string>;
  moves: RegionCatalog["sample"];
}) {
  const chips = region.rails.filter((rail) => picked.has(rail.id)).slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-[18.5rem] xl:sticky xl:top-8">
      <div className="rails-phone">
        <div className="rails-phone-bezel">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-mute">
            Available · {primary}
          </p>
          <p className="mt-1 text-[1.65rem] font-semibold tracking-tight text-ink">
            <span className="text-lg font-medium text-ink-soft">
              {region.currencySymbol}
            </span>{" "}
            {region.available}
          </p>

          <div className="mt-4 flex gap-1.5 overflow-hidden">
            <span className="rails-mini-chip is-on">All</span>
            {chips.map((chip) => (
              <span key={chip.id} className="rails-mini-chip">
                {chip.label}
              </span>
            ))}
          </div>

          <ul className="mt-5 space-y-2.5">
            {moves.length === 0 ? (
              <li className="rounded-xl bg-mist px-3 py-4 text-sm text-mute">
                Turn a wallet on to see the picture.
              </li>
            ) : (
              moves.map((move) => (
                <li
                  key={`${move.who}-${move.railId}`}
                  className="flex items-baseline justify-between gap-3 rounded-xl bg-mist px-3 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">
                      {move.who}
                    </p>
                    <p className="text-[0.7rem] text-mute">
                      {railLabel(region, move.railId)}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm font-medium tabular-nums text-ink">
                    {region.currencySymbol} {move.amount}
                  </p>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
      <p className="mt-3 text-center text-xs leading-relaxed text-sky/55">
        {region.comingSoon
          ? `${region.name} is coming soon. Kenya is the country on Google Play today.`
          : "Same first-run choice as the app. Change it later in Settings — the ledger refreshes from this inbox."}
      </p>
    </div>
  );
}
