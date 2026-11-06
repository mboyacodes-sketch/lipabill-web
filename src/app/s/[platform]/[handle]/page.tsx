import type { Metadata } from "next";
import Link from "next/link";
import { playStore, absoluteUrl, site } from "@/lib/site";
import {
  canonicalSocialHandle,
  isSocialSharePlatform,
  socialProfileUrl,
  socialShareLabel,
  socialSharePreview,
} from "@/lib/social-share";

type Props = {
  params: Promise<{ platform: string; handle: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { platform: platformRaw, handle: handleRaw } = await params;
  const platformKey = platformRaw.toLowerCase();
  if (!isSocialSharePlatform(platformKey)) {
    return {
      title: { absolute: "LipaBill social link" },
      description: "Open LipaBill to share your social profile QR.",
      robots: { index: false, follow: false },
    };
  }
  const handle =
    canonicalSocialHandle(platformKey, decodeURIComponent(handleRaw)) ||
    decodeURIComponent(handleRaw);
  const preview = socialSharePreview(platformKey, handle);
  const url = absoluteUrl(`/s/${platformKey}/${encodeURIComponent(handle)}`);
  return {
    title: { absolute: preview.title },
    description: preview.description,
    robots: { index: false, follow: false },
    alternates: { canonical: url },
    openGraph: {
      type: "profile",
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

export default async function SocialSharePage({ params }: Props) {
  const { platform: platformRaw, handle: handleRaw } = await params;
  const platformKey = platformRaw.toLowerCase();
  if (!isSocialSharePlatform(platformKey)) {
    return (
      <main className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col justify-center gap-4 px-5 py-10">
        <p className="text-sm font-semibold text-mute">LipaBill</p>
        <h1 className="text-2xl font-bold tracking-tight">This social link isn’t valid</h1>
        <p className="text-mute">Ask for a fresh code from Request → Socials in LipaBill.</p>
        <Link href={playStore.url} className="font-semibold text-blue underline-offset-2 hover:underline">
          Get LipaBill on Google Play
        </Link>
      </main>
    );
  }
  const handle =
    canonicalSocialHandle(platformKey, decodeURIComponent(handleRaw)) ||
    decodeURIComponent(handleRaw);
  const preview = socialSharePreview(platformKey, handle);
  const profileUrl = socialProfileUrl(platformKey, handle);
  const label = socialShareLabel(platformKey);

  return (
    <main className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col justify-center gap-5 px-5 py-10">
      <p className="text-sm font-semibold tracking-tight text-ink">LipaBill</p>
      <div className="rounded-3xl border border-line/80 bg-paper p-6 shadow-[0_10px_30px_rgba(15,28,51,0.06)]">
        <p className="text-xs font-semibold uppercase tracking-[0.04em] text-mute">
          Request · Socials
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-ink">
          {label} {preview.displayHandle}
        </h1>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-mute">
          Shared from LipaBill. Continue in {label}, or get the app to share your own code.
        </p>
        <div className="mt-6 flex flex-col gap-2.5">
          <a
            href={profileUrl}
            className="flex min-h-[52px] items-center justify-center rounded-full bg-blue px-5 text-center text-[0.95rem] font-semibold text-white"
          >
            Open {label}
          </a>
          <a
            href={playStore.url}
            className="flex min-h-[52px] items-center justify-center rounded-full border border-line bg-mist px-5 text-center text-[0.95rem] font-semibold text-ink"
          >
            Get LipaBill on Google Play
          </a>
          <Link
            href="/"
            className="flex min-h-11 items-center justify-center px-5 text-center text-sm font-semibold text-blue"
          >
            lipabill.app
          </Link>
        </div>
      </div>
    </main>
  );
}
