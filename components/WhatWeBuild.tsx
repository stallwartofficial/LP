import { Reveal } from "@/components/Reveal";
import { TerminalBuild } from "@/components/TerminalBuild";

// "What we build": the statement headline, then the four capabilities delivered
// as the output of a terminal query. On-brand for an AI engineering company and
// alive, without becoming a card grid. The terminal text is crawlable and the
// motion is a reduced-motion-safe enhancement (see TerminalBuild).
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
          </Reveal>

          <Reveal>
            <TerminalBuild />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
