"use client";

import { useState } from "react";
import { site } from "@/data/site";

// "How we build" as an interactive mindmap.
//
// Three branches radiate from a Stallwart core. Selecting a branch promotes it:
// its own accent takes over, its sub branches draw in, and the detail panel
// swaps. Hover previews, click commits, arrow keys move. It is a real tablist,
// so the interaction is not mouse only.
//
// COLOUR: every branch has two tokens (see globals.css). `-fill` is decorative
// and may be the bright brand gold; `-text` is measured AA safe against the
// current theme's background. Type only ever uses `-text`.
//
// SEO: all three panels are rendered in the DOM and only visually collapsed, so
// a crawler reads the whole argument without running the interaction.

const branches = [
  { fill: "var(--branch-reliable-fill)", text: "var(--branch-reliable-text)" },
  { fill: "var(--branch-honest-fill)", text: "var(--branch-honest-text)" },
  { fill: "var(--branch-scalable-fill)", text: "var(--branch-scalable-text)" },
];

export function HowWeBuild() {
  const [active, setActive] = useState(0);
  const pillars = site.pillars;
  const tone = branches[active] ?? branches[0];

  return (
    <section
      aria-labelledby="how-we-build-heading"
      className="section-y rule-t px-[var(--space-gutter)]"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="eyebrow">How we build</p>
          <h2
            id="how-we-build-heading"
            className="font-display mt-4 text-display-sm font-light"
          >
            <span className="text-gold-sheen italic">Built Beyond</span> is a
            specification, not a slogan.
          </h2>
          <p className="mt-4 text-[var(--fg)]/70">
            {site.positioning} Three things have to be true before a system
            ships with our name on it.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* --------------------------- The map --------------------------- */}
          <div
            role="tablist"
            aria-label="How Stallwart builds"
            aria-orientation="vertical"
          >
            {/* Core node */}
            <div
              className="relative z-10 mb-1 inline-flex items-center gap-3 rounded-full border bg-[var(--bg)] px-4 py-2 transition-colors duration-500"
              style={{ borderColor: tone.fill }}
            >
              <span
                aria-hidden="true"
                className="animate-soft-pulse h-2 w-2 rounded-full"
                style={{ background: tone.fill }}
              />
              <span className="font-display text-[length:var(--text-step-1)]">
                {site.company}
              </span>
            </div>

            <ul>
              {pillars.map((pillar, i) => {
                const selected = i === active;
                const t = branches[i] ?? branches[0];
                const isLast = i === pillars.length - 1;

                return (
                  <li key={pillar.key} className="relative pl-8">
                    {/* Spine plus an elbow into the node. */}
                    <span
                      aria-hidden="true"
                      className="absolute left-2 top-0 w-px bg-[var(--hairline-strong)]"
                      style={{ height: isLast ? "2.4rem" : "100%" }}
                    />
                    <span
                      aria-hidden="true"
                      className="absolute left-2 top-[2.4rem] h-px w-5 transition-colors duration-500"
                      style={{
                        background: selected ? t.fill : "var(--hairline-strong)",
                      }}
                    />

                    <button
                      type="button"
                      role="tab"
                      id={`branch-tab-${pillar.key}`}
                      aria-selected={selected}
                      aria-controls={`branch-panel-${pillar.key}`}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                          e.preventDefault();
                          setActive((i + 1) % pillars.length);
                        }
                        if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                          e.preventDefault();
                          setActive((i - 1 + pillars.length) % pillars.length);
                        }
                      }}
                      className="group w-full py-4 text-left"
                    >
                      <span className="flex items-baseline gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full border transition-all duration-500"
                          style={{
                            borderColor: selected
                              ? t.fill
                              : "var(--hairline-strong)",
                            background: selected ? t.fill : "transparent",
                            transform: selected ? "scale(1.35)" : "scale(1)",
                          }}
                        />
                        <span className="min-w-0">
                          <span className="flex items-baseline gap-2.5">
                            <span
                              className="font-display text-[length:var(--text-step-2)] transition-colors duration-500"
                              style={{ color: selected ? t.text : undefined }}
                            >
                              {pillar.title}
                            </span>
                            <span
                              aria-hidden="true"
                              className="text-[10px] tracking-[0.18em] text-[var(--fg)]/65"
                            >
                              {pillar.number}
                            </span>
                          </span>
                          <span className="mt-1 block text-sm text-[var(--fg)]/70">
                            {pillar.claim}
                          </span>
                        </span>
                      </span>

                      {/* Sub branches draw in when selected. */}
                      <span
                        className="grid transition-all duration-500 ease-[var(--ease-out-expo)]"
                        style={{
                          gridTemplateRows: selected ? "1fr" : "0fr",
                          opacity: selected ? 1 : 0,
                        }}
                      >
                        <span className="overflow-hidden">
                          <span className="mt-3 block space-y-2 pl-[1.4rem] pt-1">
                            {pillar.branches.map((b) => (
                              <span
                                key={b}
                                className="flex items-center gap-2.5 text-xs text-[var(--fg)]/70"
                              >
                                <span
                                  aria-hidden="true"
                                  className="h-px w-3 shrink-0"
                                  style={{ background: t.fill }}
                                />
                                {b}
                              </span>
                            ))}
                          </span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ------------------------ Detail panels ------------------------ */}
          <div className="relative lg:sticky lg:top-32 lg:self-start">
            {pillars.map((pillar, i) => {
              const selected = i === active;
              const t = branches[i] ?? branches[0];

              return (
                <div
                  key={pillar.key}
                  role="tabpanel"
                  id={`branch-panel-${pillar.key}`}
                  aria-labelledby={`branch-tab-${pillar.key}`}
                  // Not `hidden`: kept in the DOM and visually collapsed so the
                  // full argument stays crawlable and quotable.
                  className={
                    selected
                      ? "relative opacity-100 transition-opacity duration-500"
                      : "pointer-events-none absolute inset-0 h-0 overflow-hidden opacity-0"
                  }
                >
                  <div
                    className="rounded-2xl border bg-[var(--surface)] p-7 transition-colors duration-500 sm:p-9"
                    style={{
                      borderColor: `color-mix(in oklab, ${t.fill} 45%, transparent)`,
                    }}
                  >
                    <span
                      className="text-[10px] font-medium uppercase tracking-[0.2em]"
                      style={{ color: t.text }}
                    >
                      {pillar.number} · {pillar.title}
                    </span>

                    <p className="font-display mt-4 text-[length:var(--text-step-3)] font-light leading-tight">
                      {pillar.claim}
                    </p>

                    <p className="mt-5 text-[var(--fg)]/75">
                      {pillar.description}
                    </p>

                    <p
                      className="rule-t mt-7 flex items-start gap-2.5 pt-5 text-sm font-medium"
                      style={{ color: t.text }}
                    >
                      <span aria-hidden="true">✓</span>
                      {pillar.proof}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
