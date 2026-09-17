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

export function ProofBadge({ className = "" }: { className?: string }) {
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
