"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Cookie consent as a slim, non-modal bottom bar that echoes the floating-nav
// language (hairline, blur, soft shadow) rather than a page-blocking modal, so
// it never steps on the hero's first impression. The choice is stored, so it
// appears once and never nags again. Entrance is delayed a beat and disabled
// under reduced motion.
//
// HONEST COPY: the site currently sets no tracking cookies (the theme toggle
// uses localStorage), so the wording does not claim trackers that do not exist.
// Both actions simply record the choice; wire real analytics gating to the
// stored value if measurement is ever added.
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
      aria-label="Cookie consent"
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-[80] flex justify-center px-[var(--space-gutter)] pb-4 transition-all duration-300 motion-reduce:transition-none ${
        entered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className="pointer-events-auto flex w-full max-w-3xl flex-col gap-4 rounded-2xl border border-[var(--hairline-strong)] bg-[var(--surface)]/95 p-5 shadow-[0_12px_48px_-12px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:flex-row sm:items-center sm:gap-6 sm:py-3 sm:pl-6 sm:pr-3">
        <p className="text-sm text-[var(--fg)]/75">
          We use cookies to keep your preferences and, if you allow it, to
          measure how this site is used.{" "}
          <Link href="/privacy" className="link-draw text-[var(--accent-text)]">
            Privacy
          </Link>
          .
        </p>
        <div className="flex shrink-0 items-center gap-2 sm:ml-auto">
          <button
            type="button"
            onClick={() => choose("essential")}
            className="rounded-full px-4 py-3 text-sm text-[var(--fg)]/70 transition-colors hover:text-[var(--fg)]"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => choose("all")}
            className="group relative overflow-hidden rounded-full bg-[var(--fg)] px-5 py-3 text-sm font-medium text-[var(--bg)]"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 -translate-x-full bg-[var(--accent)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
            />
            <span className="relative transition-colors group-hover:text-[var(--color-ink)]">
              Accept all
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
