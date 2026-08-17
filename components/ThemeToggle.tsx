"use client";

import { useTheme } from "@/lib/useTheme";

export function ThemeToggle() {
  const { isDark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--accent)]/30 text-[var(--fg)] transition-colors hover:border-[var(--accent)] focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
    >
      <span aria-hidden="true" className="text-sm">
        {isDark ? "☾" : "☀"}
      </span>
    </button>
  );
}
