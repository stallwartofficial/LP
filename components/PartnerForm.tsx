"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

type Status = "idle" | "loading" | "success" | "error";

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-[var(--hairline-strong)] bg-transparent px-3 py-2.5 text-[13px] outline-none transition-colors placeholder:text-[var(--placeholder-fg)] focus:border-[var(--accent)]";
const labelClass =
  "block text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--fg)]/70";

// Partner inquiry form. Posts JSON to /api/partner, which validates server-side
// and inserts into Supabase (public.partner_submissions). Same interaction model
// as the contact form: inline validation surfaced from the server, one honest reply.
export function PartnerForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/partner", {
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
      <div role="status">
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
    <form onSubmit={handleSubmit} noValidate={false}>
      {/* Honeypot: hidden from humans, tempting to bots. */}
      <input
        type="text"
        name="hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />
      {/* Two-column grid: paired fields per row; the message spans both. */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={100}
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
            maxLength={150}
            autoComplete="email"
            placeholder="jordan@company.com"
            className={`field ${fieldClass}`}
          />
        </div>

        <div>
          <label htmlFor="company" className={labelClass}>
            Organization
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            maxLength={120}
            autoComplete="organization"
            placeholder="Company name"
            className={`field ${fieldClass}`}
          />
        </div>

        <div>
          <label htmlFor="role" className={labelClass}>
            Your role{" "}
            <span className="font-normal text-[var(--fg)]/75">(optional)</span>
          </label>
          <input
            id="role"
            name="role"
            type="text"
            maxLength={100}
            autoComplete="organization-title"
            placeholder="Head of Partnerships"
            className={`field ${fieldClass}`}
          />
        </div>

        <div>
          <label htmlFor="website" className={labelClass}>
            Website{" "}
            <span className="font-normal text-[var(--fg)]/75">(optional)</span>
          </label>
          <input
            id="website"
            name="website"
            type="text"
            inputMode="url"
            maxLength={200}
            autoComplete="url"
            placeholder="company.com"
            pattern="^\s*(https?:\/\/)?[\w-]+(\.[\w-]+)+.*$"
            title="Enter a valid website, e.g. company.com"
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
            required
            className={`field ${fieldClass}`}
          >
            <option value="" disabled>
              Select…
            </option>
            <option value="Solutions">Solutions</option>
            <option value="White-label">White-label</option>
            <option value="Delivery">Delivery</option>
            <option value="Referral">Referral</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelClass}>
            What would you like to build together?{" "}
            <span className="font-normal text-[var(--fg)]/75">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={2000}
            placeholder="The opportunity you see, the customers you serve, or the technology you'd integrate…"
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

      <p className="mt-4 text-center text-xs text-[var(--fg)]/75">
        We reply to every serious inquiry from a person, not a sequence.
      </p>
    </form>
  );
}
