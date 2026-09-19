"use client";

import { CountUp } from "@/components/CountUp";

// Shared social-proof badge: overlapping client photos + two count-up stats.
// One component so the homepage testimonials, the contact page, and anywhere
// else show exactly the same thing. Centered by default.
const AVATARS = [
  "/images/avatars/avatar-1.jpg",
  "/images/avatars/avatar-2.jpg",
  "/images/avatars/avatar-3.jpg",
  "/images/avatars/avatar-4.jpg",
  "/images/avatars/avatar-5.jpg",
  "/images/avatars/avatar-6.avif",
];

export function ProofBadge({
  className = "",
  inline = false,
}: {
  className?: string;
  /** Compact variant: tighter, smaller avatars over a single sentence line. */
  inline?: boolean;
}) {
  if (inline) {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <div className="flex items-center -space-x-2.5">
          {AVATARS.map((src) => (
            <span
              key={src}
              aria-hidden="true"
              className="inline-block h-8 w-8 overflow-hidden rounded-full ring-2 ring-[var(--bg)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
            </span>
          ))}
        </div>
        <p className="mt-3 text-[length:var(--text-step-0)] text-[var(--fg)]/75">
          <span className="font-semibold text-[var(--fg)]">
            <CountUp to={30} />+
          </span>{" "}
          businesses served in 2026.{" "}
          <span className="font-semibold text-[var(--accent-text)]">
            <CountUp to={10} />+
          </span>{" "}
          came back to build again.
        </p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <div className="flex items-center -space-x-3">
        {AVATARS.map((src) => (
          <span
            key={src}
            aria-hidden="true"
            className="inline-block h-11 w-11 overflow-hidden rounded-full ring-2 ring-[var(--bg)]"
          >
            {/* Plain img: local files, object-cover keeps faces framed. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
          </span>
        ))}
      </div>

      <p className="mt-4 flex items-baseline gap-2 leading-none">
        <span className="text-[length:var(--text-step-3)] font-semibold tracking-tight text-[var(--fg)]">
          <CountUp to={30} />+
        </span>
        <span className="text-[length:var(--text-step-0)] text-[var(--fg)]/75">
          businesses served in 2026
        </span>
      </p>
      <p className="mt-2 flex items-baseline gap-2 leading-none">
        <span className="text-[length:var(--text-step-2)] font-semibold tracking-tight text-[var(--accent-text)]">
          <CountUp to={10} />+
        </span>
        <span className="text-[length:var(--text-step-0)] text-[var(--fg)]/75">
          came back to build again
        </span>
      </p>
    </div>
  );
}
