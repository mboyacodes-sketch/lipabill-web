import { track } from "@vercel/analytics";
import type { PayLinkKind } from "@/lib/paylink-parse";

type PayLinkEvent =
  | "paylink_view"
  | "paylink_copy"
  | "paylink_open_mpesa"
  | "paylink_open_app"
  | "paylink_open_store";

type PayLinkProps = {
  kind?: PayLinkKind | "invalid";
  field?: string;
};

/** Aggregate pay-link product events. No tokens, numbers, or amounts. */
export function trackPayLink(event: PayLinkEvent, props: PayLinkProps = {}) {
  const data: Record<string, string> = {};
  if (props.kind) data.kind = props.kind;
  if (props.field) data.field = props.field;
  track(event, data);
}
