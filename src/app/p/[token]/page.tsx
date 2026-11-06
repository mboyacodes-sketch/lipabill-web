import type { Metadata } from "next";
import { PayLinkLanding } from "@/components/PayLinkLanding";
import { payLinkPreview, parsePayToken } from "@/lib/paylink-parse";
import { absoluteUrl, site } from "@/lib/site";

type Props = { params: Promise<{ token: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token: raw } = await params;
  const token = decodeURIComponent(raw);
  const target = parsePayToken(token);
  const preview = payLinkPreview(target);
  const url = absoluteUrl(`/p/${token}`);
  return {
    title: { absolute: preview.title },
    description: preview.description,
    robots: { index: false, follow: false },
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      title: preview.title,
      description: preview.description,
      url,
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: preview.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: preview.title,
      description: preview.description,
      images: [absoluteUrl("/opengraph-image")],
    },
  };
}

export default async function PayLinkPage({ params }: Props) {
  const { token: raw } = await params;
  const token = decodeURIComponent(raw);
  const target = parsePayToken(token);
  return <PayLinkLanding token={token} target={target} />;
}
