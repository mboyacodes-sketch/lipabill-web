import type { ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

/** Shared chrome for interior marketing / legal pages. */
export function PageShell({
  jsonLd,
  children,
  after,
}: {
  jsonLd?: object;
  children: ReactNode;
  /** Optional content between the article area and footer (e.g. RailsStage). */
  after?: ReactNode;
}) {
  return (
    <main className="flex-1 bg-paper">
      <div className="border-b border-line/70">
        <SiteHeader />
      </div>
      {jsonLd ? <JsonLd data={jsonLd} /> : null}
      {children}
      {after}
      <SiteFooter />
    </main>
  );
}
