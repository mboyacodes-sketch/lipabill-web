"use client";

import { useId, useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "done" | "error";

export function NotifyForm({ className = "" }: { className?: string }) {
  const emailId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const honeypot = String(new FormData(event.currentTarget).get("company") || "");
    if (honeypot) return;

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
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
      <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={emailId} className="sr-only">
          Email
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
          className="min-w-0 flex-1 rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none ring-blue/30 placeholder:text-mute focus:ring-2"
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
          disabled={status === "sending"}
          className="shrink-0 rounded-xl bg-blue px-6 py-3 text-sm font-medium text-white disabled:opacity-60"
        >
          {status === "sending" ? "Saving…" : "Notify me"}
        </button>
      </form>
      <p className="mt-2 text-xs text-mute">
        Optional. The app is on Google Play — this is only for product notes.
      </p>
      {status === "error" ? (
        <p className="mt-2 text-sm text-ink" role="alert">
          {message}
        </p>
      ) : null}
    </div>
  );
}
