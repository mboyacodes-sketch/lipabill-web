"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "done" | "error";

export function NotifyForm({ className = "" }: { className?: string }) {
  const emailId = useId();
  const consentId = useId();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const honeypot = String(form.get("company") || "");
    if (honeypot) return;
    if (!consent) {
      setStatus("error");
      setMessage("Tick the box if you want product notes.");
      return;
    }

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent: true }),
      });
      const payload = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        setStatus("error");
        setMessage(payload.error || "Couldn't save that. Try again.");
        return;
      }

      setEmail("");
      setConsent(false);
      setStatus("done");
      setMessage(
        "You're on the list. We'll email product notes — the app is already on Google Play."
      );
    } catch {
      setStatus("error");
      setMessage("Couldn't save that. Try again.");
    }
  }

  if (status === "done") {
    return (
      <p className={`text-sm font-medium text-blue ${className}`} role="status">
        {message}
      </p>
    );
  }

  return (
    <div className={`w-full max-w-md ${className}`}>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 sm:flex-row">
          <label htmlFor={emailId} className="sr-only">
            Email address
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            maxLength={254}
            placeholder="Email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="min-w-0 flex-1 rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none ring-blue/30 placeholder:text-mute focus-visible:ring-2"
          />
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="hidden"
          />
          <button
            type="submit"
            disabled={status === "sending" || !consent}
            className="shrink-0 rounded-xl bg-blue px-6 py-3 text-sm font-medium text-white disabled:opacity-60"
          >
            {status === "sending" ? "Saving email…" : "Email me notes"}
          </button>
        </div>
        <label
          htmlFor={consentId}
          className="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-mute"
        >
          <input
            id={consentId}
            name="consent"
            type="checkbox"
            required
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-line text-blue focus-visible:ring-2 focus-visible:ring-blue"
          />
          <span>
            I want occasional product notes at this address. I have read the{" "}
            <Link href="/privacy" className="font-medium text-blue hover:underline">
              privacy policy
            </Link>
            . I can stop anytime by emailing support.
          </span>
        </label>
      </form>
      <p className="mt-2 text-xs text-mute">
        Optional. The app is on Google Play — this is only for product notes.
        We do not sell your address.
      </p>
      {status === "error" ? (
        <p className="mt-2 text-sm text-ink" role="alert">
          {message}
        </p>
      ) : null}
    </div>
  );
}
