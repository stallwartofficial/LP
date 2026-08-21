"use client";

import { useTheme } from "@/lib/useTheme";

// Icon crossfades and rotates rather than swapping, reads as one control
// changing state instead of two icons trading places.
export function ThemeToggle() {
  const { isDark, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="relative flex h-11 w-11 items-center justify-center rounded-full text-[var(--fg)]/70 transition-colors hover:text-[var(--fg)]"
    >
      <span className="relative block h-4 w-4">
        {/* Sun */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          aria-hidden="true"
          className={`absolute inset-0 h-4 w-4 transition-all duration-500 ${
            isDark ? "rotate-0 opacity-100" : "rotate-90 opacity-0"
          }`}
        >
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
        </svg>
        {/* Moon */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          aria-hidden="true"
          className={`absolute inset-0 h-4 w-4 transition-all duration-500 ${
            isDark ? "-rotate-90 opacity-0" : "rotate-0 opacity-100"
          }`}
        >
          <path d="M20 14.5A8.5 8.5 0 019.5 4a7 7 0 108.7 10.4 8.6 8.6 0 011.8.1z" />
        </svg>
      </span>
    </button>
  );
}
