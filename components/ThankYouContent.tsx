"use client";

import { useEffect } from "react";
import Link from "next/link";

// The Cal.com booking link, e.g. "stallwart/intro-call". Public by nature, so a
// NEXT_PUBLIC_ env var is correct. Falls back to a plain link if unset.
const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK || "";

export function ThankYouContent() {
  // Fire the GA4 conversion here: this page loads only after a real, successful
  // submission, so it is the honest conversion point.
  useEffect(() => {
    (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.(
      "event",
      "generate_lead",
      { method: "contact_form" }
    );
  }, []);

  const calSrc = CAL_LINK
    ? `https://cal.com/${CAL_LINK}?embed=true&theme=dark`
    : "";

  return (
    <section className="px-[var(--space-gutter)] pb-[var(--space-section)] pt-36 lg:pt-44">
      <div className="mx-auto max-w-3xl">
        <span
          aria-hidden="true"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)] text-lg text-[var(--color-ink)]"
        >
          ✓
        </span>

        <h1 className="font-display mt-6 text-display-lg font-light leading-[1.05]">
          Got it.{" "}
          <span className="text-gold-sheen italic">Now pick a time.</span>
        </h1>
        <p className="mt-5 max-w-xl text-[length:var(--text-step-1)] text-[var(--fg)]/75">
          Your message is in and a confirmation is on its way to your inbox. To
          move fast, book a call below. Otherwise we will reply shortly to find a
          time.
        </p>

        {/* Cal.com inline embed */}
        {calSrc ? (
          <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--surface)]">
            <iframe
              src={calSrc}
              title="Book a call with Stallwart"
              className="h-[70vh] min-h-[560px] w-full"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-8">
            <p className="text-[var(--fg)]/75">
              The booking calendar is being set up. We will reach out by email to
              find a time.
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href="/offer"
            className="link-draw text-sm font-medium text-[var(--accent-text)]"
          >
            See what we build →
          </Link>
          <Link
            href="/"
            className="link-draw text-sm font-medium text-[var(--fg)]/70 hover:text-[var(--fg)]"
          >
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
