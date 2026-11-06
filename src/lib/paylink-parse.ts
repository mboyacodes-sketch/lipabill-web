import { readFileSync } from "node:fs";
import { join } from "node:path";
import vm from "node:vm";

export type PayLinkKind = "PHONE" | "TILL" | "PAYBILL";

export type PayLinkTarget = {
  kind: PayLinkKind;
  identifier: string;
  account: string | null;
  amountShillings: number | null;
};

type PayLinkWebApi = {
  parse: (raw: string, nowMillis?: number) => PayLinkTarget | null;
  tokenFrom: (raw: string) => string | null;
};

let cached: PayLinkWebApi | null = null;

function loadPayLinkWeb(): PayLinkWebApi {
  if (cached) return cached;
  const code = readFileSync(join(process.cwd(), "public/p/paylink.js"), "utf8");
  const sandbox: Record<string, unknown> = {
    module: { exports: {} },
    exports: {},
    console,
  };
  sandbox.globalThis = sandbox;
  vm.runInNewContext(code, sandbox, { filename: "paylink.js" });
  const api =
    (sandbox.PayLinkWeb as PayLinkWebApi | undefined) ||
    ((sandbox.module as { exports: PayLinkWebApi }).exports);
  if (!api?.parse) {
    throw new Error("PayLinkWeb failed to load");
  }
  cached = api;
  return api;
}

export function parsePayToken(token: string, nowMillis?: number): PayLinkTarget | null {
  const clean = token?.trim();
  if (!clean) return null;
  const api = loadPayLinkWeb();
  return (
    api.parse(clean, nowMillis) ||
    api.parse(`https://lipabill.app/p/${clean}`, nowMillis)
  );
}

export function payLinkPreview(target: PayLinkTarget | null): {
  title: string;
  description: string;
} {
  if (!target) {
    return {
      title: "LipaBill link",
      description: "Ask for a fresh LipaBill pay link, or open M-Pesa and enter the details yourself.",
    };
  }
  const amount =
    target.amountShillings != null
      ? ` · KES ${target.amountShillings.toLocaleString("en-KE")}`
      : "";
  if (target.kind === "PHONE") {
    return {
      title: `Send to ${target.identifier}${amount} · LipaBill`,
      description: `Copy ${target.identifier}${amount}, then finish in M-Pesa — or open LipaBill if you have it.`,
    };
  }
  if (target.kind === "TILL") {
    return {
      title: `Till ${target.identifier}${amount} · LipaBill`,
      description: `Copy till ${target.identifier}${amount}, then finish Buy Goods in M-Pesa — or open LipaBill if you have it.`,
    };
  }
  const account = target.account ? ` · account ${target.account}` : "";
  return {
    title: `Paybill ${target.identifier}${amount} · LipaBill`,
    description: `Copy business ${target.identifier}${account}${amount}, then finish Pay Bill in M-Pesa — or open LipaBill if you have it.`,
  };
}
