import { PlayStoreButton } from "@/components/PlayStoreButton";

export function LaunchPromo({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex w-full max-w-md flex-col items-center text-center lg:items-start lg:text-left ${className}`}
    >
      <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-blue">
        On Google Play
      </p>
      <p className="mt-2 text-[clamp(1.85rem,1.2rem+1.5vw,2.35rem)] font-semibold tracking-tight text-ink">
        East Africa is live
      </p>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-mute">
        Kenya, Tanzania, Uganda, and Rwanda. Send and Pay stay Kenya M-Pesa.
      </p>
      <div className="mt-5 flex flex-col items-center lg:items-start">
        <PlayStoreButton />
      </div>
    </div>
  );
}
