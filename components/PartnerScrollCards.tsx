"use client";

import { useState } from "react";
import type { PartnerModel } from "./PartnerEcosystem";

// The six partner models as a focus accordion, not a row of equal cards.
//
// All six sit in place; hovering (or focusing) one expands it — wider, lit with
// the gold border and a soft glow, and the only one showing full body copy —
// while the rest recede to number + category + headline. Because cards expand in
// place rather than sliding, hover never fights the pointer. Arrows wrap (06 →
// 01), a thin gold line and an "0X / 06" counter track position. On mobile the
// same content stacks as a plain list.

export function PartnerScrollCards({ models }: { models: PartnerModel[] }) {
  const n = models.length;
  const [active, setActive] = useState(0);

  return (
    <div>
      {/* ---- Desktop: focus accordion ---- */}
      <div className="hidden sm:block">
        <div className="flex gap-3">
          {models.map((m, i) => {
            const on = i === active;
            return (
              <button
                key={m.key}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={on}
                style={{
                  flexGrow: on ? 2.4 : 1,
                  flexBasis: 0,
                  transition:
                    "flex-grow 0.55s cubic-bezier(0.16,1,0.3,1), border-color 0.4s, background-color 0.4s, box-shadow 0.4s, opacity 0.4s",
                }}
                className={`flex h-[15rem] min-w-0 flex-col overflow-hidden rounded-2xl border p-5 text-left ${
                  on
                    ? "border-[var(--accent)]/70 bg-[color-mix(in_oklab,var(--accent)_7%,var(--surface))] opacity-100 shadow-[0_0_50px_-14px_color-mix(in_oklab,var(--accent)_55%,transparent)]"
                    : "border-[var(--hairline)] bg-[var(--surface)] opacity-60"
                }`}
              >
                <span
                  className={`font-display text-xl font-light leading-none ${
                    on ? "text-gold-sheen" : "text-[var(--fg)]/40"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="mt-5 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent-text)]">
                  {m.name}
                </span>
                <h3
                  className={`font-display mt-2 font-light leading-tight ${
                    on
                      ? "text-[length:var(--text-step-2)] text-[var(--fg)]"
                      : "text-[length:var(--text-step-1)] text-[var(--fg)]/85"
                  }`}
                >
                  {m.tagline}
                </h3>

                {/* Only the active card carries the full body + action. */}
                <div
                  className={`grid transition-all duration-500 ${
                    on ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm leading-relaxed text-[var(--fg)]/70">
                      {m.blurb}
                    </p>
                    <a
                      href="#apply"
                      className="link-draw mt-5 inline-block whitespace-nowrap text-sm font-medium text-[var(--accent-text)]"
                    >
                      Explore this partnership →
                    </a>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Controls + progress */}
        <div className="mt-6 flex items-center gap-6">
          <div className="flex gap-3">
            <ArrowButton
              dir="left"
              onClick={() => setActive((a) => (a - 1 + n) % n)}
            />
            <ArrowButton
              dir="right"
              onClick={() => setActive((a) => (a + 1) % n)}
            />
          </div>

          <div className="h-px flex-1 bg-[var(--hairline)]">
            <div
              className="h-px bg-[var(--accent)] transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ width: `${((active + 1) / n) * 100}%` }}
            />
          </div>

          <span className="font-mono text-xs tracking-[0.1em] text-[var(--fg)]/60">
            <span className="text-[var(--accent-text)]">
              {String(active + 1).padStart(2, "0")}
            </span>{" "}
            / {String(n).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* ---- Mobile: plain stacked list ---- */}
      <ul className="space-y-3 sm:hidden">
        {models.map((m, i) => (
          <li
            key={m.key}
            className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-5"
          >
            <div className="flex items-baseline gap-3">
              <span className="text-gold-sheen font-display text-lg font-light leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent-text)]">
                {m.name}
              </span>
            </div>
            <h3 className="font-display mt-2 text-[length:var(--text-step-1)] font-light leading-tight">
              {m.tagline}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--fg)]/75">
              {m.blurb}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ArrowButton({
  dir,
  onClick,
}: {
  dir: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "left" ? "Previous" : "Next"}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--hairline-strong)] text-[var(--fg)]/70 transition-colors hover:border-[var(--accent)]/60 hover:text-[var(--fg)]"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        {dir === "left" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
      </svg>
    </button>
  );
}
