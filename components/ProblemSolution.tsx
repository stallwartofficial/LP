import { Reveal } from "@/components/Reveal";

// Problem -> solution, as a sticky-heading ledger. The heading pins on the left
// while the four pain -> build pairs scroll past on the right, each a numbered
// ruled row (same ledger language as WhatWeBuild / Commitments / FAQ). Calm,
// senior, no cards. On mobile the heading simply sits above the rows.
const PAIRS = [
  {
    n: "01",
    pain: "A process that only works because one person remembers it.",
    build: "We build the agent that runs it, the same way, every time.",
  },
  {
    n: "02",
    pain: "Your team drowns in manual, repetitive work.",
    build: "We build automation that runs unattended, so people do the thinking.",
  },
  {
    n: "03",
    pain: "Your data is everywhere. The answers are nowhere.",
    build: "We build the RAG system, AI that answers straight from your own data, or the dashboard that turns it into decisions.",
  },
  {
    n: "04",
    pain: "You need AI in your product, but do not know where to start.",
    build: "We build the infrastructure, ship it to production, and you own it.",
  },
];

export function ProblemSolution() {
  return (
    <section className="section-y px-[var(--space-gutter)]">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-20">
        {/* Sticky heading */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="eyebrow">The problem</p>
            <h2 className="font-display mt-3 font-light leading-[1.05]" style={{ fontSize: "var(--text-step-5)" }}>
              You already know{" "}
              <span className="text-gold-sheen italic">where it hurts.</span>
            </h2>
            <p className="mt-5 max-w-[40ch] text-[length:var(--text-step-1)] text-[var(--fg)]/72">
              The work that eats your week. The process only one person understands.
              The data you cannot get an answer out of. Point at yours, and read what
              we build for it.
            </p>
          </Reveal>
        </div>

        {/* Ledger of pain -> build */}
        <dl className="border-t border-[var(--hairline)]">
          {PAIRS.map((p) => (
            <div
              key={p.n}
              className="row-nudge grid gap-3 border-b border-[var(--hairline)] py-7"
            >
              <dt className="flex items-baseline gap-4 font-display text-[length:var(--text-step-2)] font-light leading-snug">
                <span aria-hidden="true" className="font-mono text-[10px] tracking-[0.2em] text-[var(--accent-text)]">
                  {p.n}
                </span>
                {p.pain}
              </dt>
              <dd className="flex items-baseline gap-3 pl-[calc(0.25rem+2ch)]">
                <span aria-hidden="true" className="text-[var(--accent-text)]">
                  ↳
                </span>
                <p className="text-[length:var(--text-step-1)] leading-snug text-[var(--fg)]/75">
                  {p.build}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
