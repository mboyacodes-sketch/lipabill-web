"use client";

import { useCallback, useState } from "react";
import {
  LinkLandingCopyRow,
  LinkLandingPanel,
  LinkLandingShell,
} from "@/components/LinkLandingShell";
import { copyText, openPlayStore } from "@/lib/paylink-open";
import {
  socialShareLabel,
  socialSharePreview,
  type SocialSharePlatform,
} from "@/lib/social-share";

type Props = {
  platform: SocialSharePlatform | null;
  handle: string;
  profileUrl: string;
};

export function SocialShareLanding({ platform, handle, profileUrl }: Props) {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1600);
  }, []);

  const onCopyValue = useCallback(
    async (label: string, value: string) => {
      try {
        await copyText(value);
        showToast(`Copied ${label.toLowerCase()}`);
      } catch {
        showToast("Couldn’t copy");
      }
    },
    [showToast],
  );

  if (!platform) {
    return (
      <LinkLandingShell toast={toast} brandCaption="Social link">
        <LinkLandingPanel>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-[#dc2626]">
            Unavailable
          </p>
          <h1 className="mt-2 text-[1.125rem] font-semibold tracking-tight text-ink">
            This social link isn’t valid
          </h1>
          <p className="mt-1.5 text-sm font-medium leading-snug text-ink-soft">
            Ask for a fresh code from Request → Socials in LipaBill.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => openPlayStore()}
              className="flex min-h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold text-blue"
            >
              Get LipaBill
            </button>
          </div>
        </LinkLandingPanel>
      </LinkLandingShell>
    );
  }

  const label = socialShareLabel(platform);
  const preview = socialSharePreview(platform, handle);
  const handleLabel = platform === "whatsapp" ? "Phone" : "Handle";

  return (
    <LinkLandingShell toast={toast} brandCaption="Social link">
      <LinkLandingPanel>
        <p className="inline-flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-blue">
          <span className="h-1.5 w-1.5 rounded-full bg-blue" aria-hidden />
          {label}
        </p>
        <h1 className="mt-2 text-[1.125rem] font-semibold tracking-tight leading-snug text-ink">
          Open this profile
        </h1>
        <p className="mt-1.5 text-sm font-medium leading-snug text-ink-soft">
          Tap the {handleLabel.toLowerCase()} to copy it, then continue in{" "}
          {label} — or get LipaBill to share your own code.
        </p>

        <div className="mt-4 overflow-hidden rounded-[18px] border border-line bg-sky-soft">
          <LinkLandingCopyRow
            label={handleLabel}
            // Copy the real handle; WhatsApp phones are masked on screen / OG only.
            value={handle}
            display={preview.displayHandle}
            valueClassName={`text-[clamp(1.25rem,1.05rem+1.2vw,1.45rem)] font-semibold tracking-tight leading-[1.2] text-ink${
              platform === "whatsapp" ? " tabular-nums" : ""
            }`}
            onCopy={onCopyValue}
          />
        </div>

        <div className="mt-4 flex flex-col gap-1.5">
          <a
            href={profileUrl}
            className="flex min-h-11 items-center justify-center rounded-xl bg-blue px-4 text-sm font-semibold tracking-tight text-white shadow-[0_10px_22px_-14px_rgba(26,63,156,0.85)] no-underline"
          >
            Open {label}
          </a>
          <button
            type="button"
            onClick={() => openPlayStore()}
            className="flex min-h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold text-blue"
          >
            Get LipaBill
          </button>
        </div>
        <p className="mt-1 text-center text-[0.7rem] font-medium leading-snug text-mute">
          Shared from LipaBill Request → Socials.
        </p>
      </LinkLandingPanel>
    </LinkLandingShell>
  );
}
