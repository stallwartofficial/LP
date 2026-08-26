"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

type Status = "idle" | "loading" | "success" | "error";

const fieldClass =
  "mt-2 w-full rounded-xl border border-[var(--hairline-strong)] bg-transparent px-4 py-3 outline-none transition-colors placeholder:text-[var(--fg)]/35 focus:border-[var(--accent)]";
const labelClass = "block text-sm font-medium text-[var(--fg)]/85";

// Partner inquiry form. Posts JSON to /api/partner-inquiry, which forwards it
// server-side (webhook now, Firebase later). Same interaction model as the
// contact form: inline validation surfaced from the server, one honest reply.
export function PartnerForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/partner-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Request failed");
      }

      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : null);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-[var(--accent)]/40 bg-[var(--surface)] p-8"
      >
        <span
          aria-hidden="true"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--color-ink)]"
        >
          ✓
        </span>
        <p className="font-display mt-5 text-[length:var(--text-step-2)]">
          Got it.
        </p>
        <p className="mt-3 text-[var(--fg)]/70">
          We&apos;ll review the fit and be in touch. If it&apos;s a match, the
          first call sorts out terms and the reward, together.
        </p>
        <Link
          href="/offer"
          className="link-draw mt-6 inline-block text-sm font-medium text-[var(--accent-text)]"
        >
          Meanwhile, see what we build →
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6 sm:p-8"
    >
      <div className="space-y-5">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jordan Mehta"
            className={`field ${fieldClass}`}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jordan@company.com"
            className={`field ${fieldClass}`}
          />
        </div>

        <div>
          <label htmlFor="company" className={labelClass}>
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            autoComplete="organization"
            placeholder="Company name"
            className={`field ${fieldClass}`}
          />
        </div>

        <div>
          <label htmlFor="partnerType" className={labelClass}>
            Partnership type
          </label>
          <select
            id="partnerType"
            name="partnerType"
            defaultValue=""
            className={`field ${fieldClass}`}
          >
            <option value="">Select…</option>
            <option value="Referral">Referral</option>
            <option value="Delivery or implementation">
              Delivery or implementation
            </option>
          </select>
        </div>

        <div>
          <label htmlFor="website" className={labelClass}>
            Website or LinkedIn{" "}
            <span className="font-normal text-[var(--fg)]/65">(optional)</span>
          </label>
          <input
            id="website"
            name="website"
            type="text"
            autoComplete="url"
            placeholder="company.com"
            className={`field ${fieldClass}`}
          />
        </div>

        <div>
          <label htmlFor="message" className={labelClass}>
            What do you have in mind?{" "}
            <span className="font-normal text-[var(--fg)]/65">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="The clients you work with, or the delivery capacity you bring…"
            className={`field ${fieldClass}`}
          />
        </div>
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="mt-5 rounded-xl border border-red-500/40 bg-red-500/5 p-3 text-sm text-red-600 dark:text-red-400"
        >
          {error ?? "Something went wrong."} Please try again shortly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="group relative mt-7 w-full overflow-hidden rounded-full bg-[var(--fg)] px-7 py-4 text-sm font-medium text-[var(--bg)] disabled:opacity-60"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full bg-[var(--accent)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-disabled:translate-x-[-100%]"
        />
        <span className="relative transition-colors group-hover:text-[var(--color-ink)]">
          {status === "loading" ? "Sending…" : "Send inquiry"}
        </span>
      </button>

      <p className="mt-4 text-center text-xs text-[var(--fg)]/65">
        We reply to every serious inquiry from a person, not a sequence.
      </p>
    </form>
  );
}
