"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { site } from "@/data/site";
import { offerings } from "@/data/offerings";

type Status = "idle" | "loading" | "success" | "error";

const fieldClass =
  "mt-2 w-full rounded-xl border border-[var(--hairline-strong)] bg-transparent px-4 py-3 outline-none transition-colors placeholder:text-[var(--fg)]/35 focus:border-[var(--accent)]";
const labelClass = "block text-sm font-medium text-[var(--fg)]/85";

// Two-column contact page: the argument on the left, the form on the right.
// A form alone gives a reader no reason to fill it in.
export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      // Surface the server's own message so a validation failure explains
      // itself rather than showing a generic error.
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

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="px-[var(--space-gutter)] pb-[var(--space-section)] pt-36 lg:pt-44"
    >
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-20">
        {/* ---- The argument ---- */}
        <div>
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-[var(--accent)]" />
            <p className="eyebrow">Get in touch</p>
          </div>

          <h1
            id="contact-heading"
            className="font-display mt-6 text-display-lg font-light"
          >
            Tell us what keeps
            <br />
            <span className="text-gold-sheen italic">falling through.</span>
          </h1>

          <p className="mt-7 max-w-xl text-[length:var(--text-step-1)] text-[var(--fg)]/75">
            Bring us the process that only works because someone remembers it.
            We&apos;ll show you which part a system can take over, and say so
            plainly if the answer is none of it.
          </p>

          <dl className="mt-12 grid gap-px bg-[var(--hairline)] sm:grid-cols-2">
            <div className="bg-[var(--bg)] py-5 pr-5">
              <dt className="eyebrow">What happens next</dt>
              <dd className="mt-2 text-sm text-[var(--fg)]/70">
                A real conversation about your workflow, not a scripted product
                tour.
              </dd>
            </div>
            <div className="bg-[var(--bg)] p-5 sm:pt-5">
              <dt className="eyebrow">Who you&apos;ll talk to</dt>
              <dd className="mt-2 text-sm text-[var(--fg)]/70">
                Someone who can answer technical questions, not route them.
              </dd>
            </div>
          </dl>

          <div className="rule-t mt-10 pt-8">
            <p className="eyebrow">Direct</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="link-draw text-[var(--fg)]/75 hover:text-[var(--fg)]"
                >
                  {site.contact.email}
                </a>
              </li>
              <li className="text-[var(--fg)]/60">{site.contact.phone}</li>
              <li className="text-[var(--fg)]/60">
                {site.areaServed.join(" · ")}
              </li>
            </ul>
          </div>
        </div>

        {/* ---- The form ---- */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          {status === "success" ? (
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
                We&apos;ll be in touch shortly to find a time. If it&apos;s
                urgent, reply straight to{" "}
                <a
                  href={`mailto:${site.contact.email}`}
                  className="link-draw text-[var(--accent-text)]"
                >
                  {site.contact.email}
                </a>
                .
              </p>
              <Link
                href="/offer"
                className="link-draw mt-6 inline-block text-sm font-medium text-[var(--accent-text)]"
              >
                Meanwhile, see what we build →
              </Link>
            </div>
          ) : (
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
                    className={fieldClass}
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
                    className={fieldClass}
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
                    className={fieldClass}
                  />
                </div>

                {/* teamSize was already in the data model and the webhook
                    payload but had no field to collect it. */}
                <div>
                  <label htmlFor="teamSize" className={labelClass}>
                    Team size
                  </label>
                  <select
                    id="teamSize"
                    name="teamSize"
                    defaultValue=""
                    className={fieldClass}
                  >
                    <option value="">Select…</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value="200+">200+</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="interest" className={labelClass}>
                    What are you interested in?
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    defaultValue=""
                    className={fieldClass}
                  >
                    <option value="">Select…</option>
                    {offerings.map((o) => (
                      <option key={o.slug} value={o.name}>
                        {o.name}
                        {o.status === "in-development" ? " (in development)" : ""}
                      </option>
                    ))}
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    What keeps falling through?{" "}
                    <span className="font-normal text-[var(--fg)]/65">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="The process that only works because someone remembers it…"
                    className={fieldClass}
                  />
                </div>
              </div>

              {status === "error" && (
                <p
                  role="alert"
                  className="mt-5 rounded-xl border border-red-500/40 bg-red-500/5 p-3 text-sm text-red-600 dark:text-red-400"
                >
                  {error ?? "Something went wrong."} You can also email{" "}
                  {site.contact.email}.
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
                  {status === "loading" ? "Sending…" : site.cta.primary}
                </span>
              </button>

              <p className="mt-4 text-center text-xs text-[var(--fg)]/65">
                No newsletter, no drip sequence. One reply from a person.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
