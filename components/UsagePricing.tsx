"use client";

import { useState } from "react";

// Compact pay-as-you-go estimator that lives inside the offer action card.
// Model and ranges are the owner's real logic:
//   emails      = spend / $0.03
//   warm leads  = 0.2%–0.8% of emails (min 1)
//   meetings    = 0.1%–0.2% of emails (min 1)
//   cost / lead = spend ÷ warm leads = COST_PER_EMAIL ÷ warm-rate (budget-
//                 independent, so it stays consistent with the warm range)
// Volume and outcomes are shown as ranges so it reads as a rough estimate, not
// a quote. See the note under the tiles.
const COST_PER_EMAIL = 0.03;
const WARM_LOW = 0.002;
const WARM_HIGH = 0.008;
const MEET_LOW = 0.001;
const MEET_HIGH = 0.002;

// Cost per warm lead: cheapest at the best warm rate, dearest at the worst.
const LEAD_COST_LOW = Math.round(COST_PER_EMAIL / WARM_HIGH); // $4
const LEAD_COST_HIGH = Math.round(COST_PER_EMAIL / WARM_LOW); // $15

// Log-scaled slider: the price grows exponentially with position, so entry-
// level budgets ($2-$20) fill the left half of the track and larger ones
// ($20-$250) fill the right half. Anchors the eye on the affordable end
// (default $10 sits just left of centre) instead of stranding it near zero.
const MIN = 2;
const MAX = 250;
const DEFAULT = 10;
// Internal 0-1000 slider steps mapped through exp() for smooth log motion.
const SLIDER_STEPS = 1000;
const LN_MIN = Math.log(MIN);
const LN_MAX = Math.log(MAX);
const posToSpend = (pos: number) =>
  Math.round(Math.exp(LN_MIN + (pos / SLIDER_STEPS) * (LN_MAX - LN_MIN)));
const spendToPos = (s: number) =>
  Math.round(((Math.log(s) - LN_MIN) / (LN_MAX - LN_MIN)) * SLIDER_STEPS);

const nf = (n: number) => n.toLocaleString("en-US");
const atLeastOne = (n: number) => Math.max(1, Math.round(n));
const range = (lo: number, hi: number) =>
  lo === hi ? nf(lo) : `${nf(lo)}–${nf(hi)}`;

function Tile({
  value,
  label,
  accent,
}: {
  value: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-lg border border-[var(--hairline)] bg-[var(--bg)]/40 px-2.5 py-2">
      <p
        className={`text-base font-medium leading-none ${
          accent ? "text-[var(--accent-text)]" : ""
        }`}
      >
        {value}
      </p>
      <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-[var(--fg)]/70">
        {label}
      </p>
    </div>
  );
}

export function UsagePricing() {
  const [spend, setSpend] = useState(DEFAULT);

  const emails = Math.round(spend / COST_PER_EMAIL);
  const warm = range(atLeastOne(emails * WARM_LOW), atLeastOne(emails * WARM_HIGH));
  const meetings = range(
    atLeastOne(emails * MEET_LOW),
    atLeastOne(emails * MEET_HIGH)
  );

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="font-display text-2xl font-light text-[var(--accent-text)]">
          ${nf(spend)}
          <span className="ml-0.5 text-sm font-light text-[var(--fg)]/45">
            /mo
          </span>
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--fg)]/45">
          Pay as you go
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={SLIDER_STEPS}
        step={1}
        value={spendToPos(spend)}
        onChange={(e) => setSpend(posToSpend(Number(e.target.value)))}
        aria-label="Monthly budget in dollars"
        className="mt-2.5 w-full accent-[var(--accent)]"
      />

      <div className="mt-3 grid grid-cols-2 gap-2">
        <Tile value={nf(emails)} label="Emails" />
        <Tile value={warm} label="Warm leads" />
        <Tile value={meetings} label="Meetings" accent />
        <Tile value={`$${LEAD_COST_LOW}–$${LEAD_COST_HIGH}`} label="Cost / lead" />
      </div>

      <p className="mt-2.5 text-[10px] leading-snug text-[var(--fg)]/40">
        Rough estimate, not a quote. Real numbers depend on your market and
        offer.
      </p>
    </div>
  );
}
