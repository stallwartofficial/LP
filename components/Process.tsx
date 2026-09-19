import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

// "How we work": the engagement, from first call to long-term support, as a
// six-step path. A dashed connector links the numbered icon nodes on desktop;
// on mobile it stacks. Server component, CSS-only. This is the engagement
// journey (distinct from the Architecture diagram, which is what we build on).
const icon = (d: ReactNode) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
    {d}
  </svg>
);

const STEPS: { n: string; icon: ReactNode; title: string; points: string[] }[] = [
  {
    n: "01",
    icon: icon(<><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>),
    title: "Discovery & Mapping",
    points: ["Pin down the goals worth automating", "Map how your team works today", "Agree on priorities and what is ready"],
  },
  {
    n: "02",
    icon: icon(<><path d="M9 18h6M10 22h4" /><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1h6c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2Z" /></>),
    title: "Data & Readiness",
    points: ["Check data quality and governance", "Review your systems and integrations", "Flag scale and security needs early"],
  },
  {
    n: "03",
    icon: icon(<><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><path d="M10 6.5h4a2 2 0 0 1 2 2V14" /></>),
    title: "Architecture & Planning",
    points: ["Design the system and how it fits", "Choose the right models and tools", "Plan the integrations and rollout"],
  },
  {
    n: "04",
    icon: icon(<><path d="m3 3 7.5 18 2.5-8 8-2.5L3 3Z" /></>),
    title: "Build & Integrate",
    points: ["Build the agents, apps, and automation", "Train and tune until it performs", "Wire it into your day-to-day tools"],
  },
  {
    n: "05",
    icon: icon(<><path d="M4 6h16M4 12h16M4 18h16" /><circle cx="9" cy="6" r="2" fill="currentColor" stroke="none" /><circle cx="15" cy="12" r="2" fill="currentColor" stroke="none" /><circle cx="8" cy="18" r="2" fill="currentColor" stroke="none" /></>),
    title: "Deploy & Optimise",
    points: ["Ship to production, built to scale", "Add monitoring and governance", "Keep tuning for speed and cost"],
  },
  {
    n: "06",
    icon: icon(<><path d="M3 17l6-6 4 4 8-8" /><path d="M17 7h4v4" /></>),
    title: "Evolve & Support",
    points: ["Watch reliability and performance", "Improve it with real-world usage", "Grow it as your business grows"],
  },
];

function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent-text)]" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
      <path d="m8.5 12 2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Process() {
  return (
    <section aria-labelledby="process-heading" className="section-y rule-t px-[var(--space-gutter)]">
      <div className="mx-auto max-w-[100rem]">
        <Reveal>
          <p className="eyebrow">How we work</p>
          <h2 id="process-heading" className="font-display mt-3 text-display-sm font-light">
            From idea to production, <span className="text-gold-sheen italic">one path.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--fg)]/75">
            A clear, repeatable engagement, so you always know what happens next
            and what you get at each step.
          </p>
        </Reveal>

        <div className="relative mt-12">
          {/* dashed connector behind the icon nodes (desktop) */}
          <div aria-hidden="true" className="absolute left-0 right-0 top-6 hidden border-t border-dashed border-[var(--hairline-strong)] lg:block" />
          <ol className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-6">
            {STEPS.map((s) => (
              <Reveal as="li" key={s.n}>
                <span className="relative grid h-12 w-12 place-items-center rounded-full border border-[var(--accent)]/40 bg-[var(--bg)] text-[var(--accent-text)]">
                  {s.icon}
                </span>
                <p className="mt-4 font-mono text-[10px] tracking-[0.2em] text-[var(--fg)]/40">{s.n}</p>
                <h3 className="font-display mt-1 text-[length:var(--text-step-1)] font-light leading-tight">
                  {s.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-2 text-sm leading-snug text-[var(--fg)]/70">
                      <Check />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
