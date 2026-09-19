import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { TerminalBuild } from "@/components/TerminalBuild";

// Homepage hook for "what we build": the statement headline + the terminal, then
// a CTA into the full What We Build page. The full capability catalog and
// industry positioning live on /offer, not here.
export function WhatWeBuild() {
  return (
    <section className="section-y rule-t px-[var(--space-gutter)]" id="what-we-build">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
          <Reveal>
            <p className="eyebrow">What we build</p>
            <h2 className="font-display mt-3 font-light leading-[1.05]" style={{ fontSize: "var(--text-step-6)" }}>
              Bring the problem.<br />
              <span className="text-gold-sheen italic">We build the AI that solves it.</span>
            </h2>
            <p className="mt-5 max-w-[46ch] text-[length:var(--text-step-1)] text-[var(--fg)]/72">
              Four things, one standard. Whatever your business needs from AI, it is
              one of these, engineered to production, not a demo.
            </p>
            <Link
              href="/offer"
              className="link-draw mt-6 inline-block text-sm font-medium text-[var(--accent-text)]"
            >
              See everything we build
            </Link>
          </Reveal>

          <Reveal>
            <TerminalBuild />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
