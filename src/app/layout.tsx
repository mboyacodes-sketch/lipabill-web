import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { FreezeBanner } from "@/components/SiteChrome";
import { absoluteUrl, site } from "@/lib/site";
import "./globals.css";

const sans = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s — LipaBill",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "LipaBill",
    "Transaction Wallet",
    "offline payments",
    "Android",
    "send money",
    "SGR tickets",
    "Kenya",
  ],
  category: "finance",
  alternates: {
    canonical: "/",
    types: {
      "text/plain": "/llms.txt",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/brand/favicon.png", sizes: "64x64", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.shortDescription,
  },
};

const identity = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": absoluteUrl("/#organization"),
      name: site.name,
      url: site.url,
      logo: absoluteUrl("/icon-512.png"),
      email: site.email,
      address: {
        "@type": "PostalAddress",
        addressCountry: "KE",
      },
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "en-KE",
      publisher: { "@id": absoluteUrl("/#organization") },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-KE" className={`${sans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans text-ink">
        <JsonLd data={identity} />
        <FreezeBanner />
        {children}
      </body>
    </html>
  );
}
