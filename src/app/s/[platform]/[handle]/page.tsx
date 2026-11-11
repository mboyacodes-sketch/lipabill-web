import type { Metadata } from "next";
import { SocialShareLanding } from "@/components/SocialShareLanding";
import { absoluteUrl, site } from "@/lib/site";
import {
  canonicalSocialHandle,
  isSocialSharePlatform,
  socialProfileUrl,
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
    return <SocialShareLanding platform={null} handle="" profileUrl="/" />;
  }
  const handle =
    canonicalSocialHandle(platformKey, decodeURIComponent(handleRaw)) ||
    decodeURIComponent(handleRaw);
  const profileUrl = socialProfileUrl(platformKey, handle);

  return (
    <SocialShareLanding
      platform={platformKey}
      handle={handle}
      profileUrl={profileUrl}
    />
  );
}
