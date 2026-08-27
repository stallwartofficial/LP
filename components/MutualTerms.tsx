"use client";

import { useState } from "react";
import type { CSSProperties } from "react";

// The mutual-terms set piece: two panels that meet on a central rail. The
// exchange node between them is a button; clicking it swaps which side each
// column sits on, with the incoming content sliding in from the side it came
// from and the node spinning a half turn. It is a light, optional flourish on
// the "a partnership is mutual" idea, so it is a client island and the rest of
// the page stays static. Fully keyboard operable and reduced-motion safe.

const columns = [
  {
    label: "What you get",
    items: [
      "Systems built to one standard, so your name on the work is safe.",
      "A reward per engagement, agreed up front, never a stale public rate.",
      "A straight answer on fit, fast, including a no.",
    ],
  },
  {
    label: "What we expect",
    items: [
      "Real context on the client, or the delivery capacity you bring.",
      "Room to build it correctly, not only quickly.",
      "Honesty about scope, the same standard we hold ourselves to.",
    ],
  },
];

const CheckMark = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent-text)]"
  >
    <path
      className="check-draw"
      style={{ "--len": 30 } as CSSProperties}
      d="M20 6 9 17l-5-5"
    />
  </svg>
);

function Panel({
  column,
  side,
  animate,
}: {
  column: (typeof columns)[number];
  side: "left" | "right";
  animate: boolean;
}) {
  // Incoming content slides in from the side it travelled from.
  const anim = animate
    ? side === "left"
      ? "swap-from-right"
      : "swap-from-left"
    : "";
  const edge =
    side === "left"
      ? "sm:rounded-r-none sm:border-r-0 sm:pr-12"
      : "sm:rounded-l-none sm:pl-12";
  return (
    <div
      className={`rounded-2xl border border-[var(--hairline)] bg-[var(--surface)]/60 p-6 ${edge}`}
    >
      {/* key on the label so a swap remounts this and replays the slide. */}
      <div key={column.label} className={anim}>
        <p className="eyebrow">{column.label}</p>
        <ul className="mt-4 space-y-3">
          {column.items.map((item) => (
            <li
              key={item}
              className="flex items-baseline gap-3 text-sm text-[var(--fg)]/85"
            >
              <CheckMark />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function MutualTerms() {
  const [swapped, setSwapped] = useState(false);
  // Don't animate on first paint, only after the user swaps.
  const [touched, setTouched] = useState(false);

  const left = swapped ? columns[1] : columns[0];
  const right = swapped ? columns[0] : columns[1];

  return (
    <div className="relative mt-10 grid gap-6 sm:grid-cols-2 sm:gap-0">
      {/* Central rail (desktop). */}
      <div
        aria-hidden="true"
        className="absolute inset-y-8 left-1/2 hidden w-px -translate-x-1/2 overflow-hidden bg-[var(--hairline)] sm:block"
      >
        <span className="spine-y block h-full w-full bg-[var(--accent)]/35" />
      </div>

      <Panel column={left} side="left" animate={touched} />
      <Panel column={right} side="right" animate={touched} />

      {/* Exchange node = swap control. Hidden on mobile where the columns
          stack; there is no left/right to trade. */}
      <button
        type="button"
        onClick={() => {
          setSwapped((s) => !s);
          setTouched(true);
        }}
        aria-label="Swap the two columns"
        aria-pressed={swapped}
        className="group absolute left-1/2 top-1/2 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[var(--hairline-strong)] bg-[var(--bg)] text-[var(--accent-text)] transition-colors duration-300 hover:border-[var(--accent)]/70 sm:flex"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 motion-reduce:transition-none"
          style={{ transform: swapped ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <path d="M4 9h13l-3.2-3.2" />
          <path d="M20 15H7l3.2 3.2" />
        </svg>
      </button>
    </div>
  );
}
