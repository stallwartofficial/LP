"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Cookie consent as a slim, non-modal bottom bar that echoes the floating-nav
// language (hairline, blur, soft shadow) rather than a page-blocking modal, so
// it never steps on the hero's first impression. The choice is stored, so it
// appears once and never nags again. Entrance is delayed a beat and disabled
// under reduced motion.
//
// NOTICE MODEL (India/US primary audience): the site runs Google Analytics and
// Microsoft Clarity, disclosed plainly here and in the Privacy policy, with the
// opt-out paths documented there. "Got it" records the acknowledgement so the
// notice appears once. When the EU market is targeted, switch to prior-consent
// gating (Google Consent Mode v2 or gate the analytics on the stored value).
const STORAGE_KEY = "stallwart-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* storage blocked, treat as undecided */
    }
    if (stored) return;

    // Let the hero land before the bar slides up.
    const t = setTimeout(() => {
      setVisible(true);
      requestAnimationFrame(() => setEntered(true));
    }, 700);
    return () => clearTimeout(t);
  }, []);

  function choose(choice: "all" | "essential") {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* storage blocked, dismiss for this session anyway */
    }
    setEntered(false);
    setTimeout(() => setVisible(false), 300);
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-[80] flex justify-center px-[var(--space-gutter)] pb-4 transition-all duration-300 motion-reduce:transition-none ${
        entered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className="pointer-events-auto flex w-full max-w-3xl flex-col gap-4 rounded-2xl border border-[var(--hairline-strong)] bg-[var(--surface)]/95 p-5 shadow-[0_12px_48px_-12px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:flex-row sm:items-center sm:gap-6 sm:py-3 sm:pl-6 sm:pr-3">
        <p className="text-sm text-[var(--fg)]/75">
          We use cookies, including Google Analytics and Microsoft Clarity, to
          understand how this site is used. See our{" "}
          <Link href="/privacy" className="link-draw text-[var(--accent-text)]">
            Privacy policy
          </Link>{" "}
          for the details and how to opt out.
        </p>
        <div className="flex shrink-0 items-center gap-2 sm:ml-auto">
          <button
            type="button"
            onClick={() => choose("all")}
            className="group relative overflow-hidden rounded-full bg-[var(--fg)] px-6 py-3 text-sm font-medium text-[var(--bg)]"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 -translate-x-full bg-[var(--accent)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
            />
            <span className="relative transition-colors group-hover:text-[var(--color-ink)]">
              Got it
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
