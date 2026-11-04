import type { ReactNode } from "react";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { legal } from "@/lib/legal";
import { absoluteUrl } from "@/lib/site";

export function LegalDoc({
  kicker,
  title,
  description,
  path,
  children,
}: {
  kicker: string;
  title: string;
  description: string;
  path: string;
  children: ReactNode;
}) {
  return (
    <main className="flex-1 bg-paper">
      <div className="blob-field border-b border-line/70">
        <SiteHeader solid />
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `${title} — LipaBill`,
          url: absoluteUrl(path),
          description,
          dateModified: legal.updatedIso,
          isPartOf: { "@id": absoluteUrl("/#website") },
          about: { "@id": absoluteUrl("/#app") },
        }}
      />
      <article className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue">
          {kicker}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-mute">
          Last updated: {legal.updatedLabel}
        </p>
        <div className="prose-lipa mt-10 space-y-8 text-[1.05rem] leading-relaxed text-ink-soft">
          {children}
        </div>
        <LegalAlso />
      </article>
      <SiteFooter />
    </main>
  );
}

function LegalAlso() {
  const links = [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "/cookies", label: "Cookies" },
    { href: "/refunds", label: "Refunds" },
    { href: "/licenses", label: "Licenses" },
    { href: "/delete", label: "Delete data" },
  ];
  return (
    <nav
      aria-label="Other legal pages"
      className="mt-14 border-t border-line pt-8"
    >
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-mute">
        Also
      </p>
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {links.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="font-medium text-blue hover:underline">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
