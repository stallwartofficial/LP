import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { AnimatedBeams } from "@/components/AnimatedBeams";

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
              <span className="text-gold-sheen italic">We build the system that solves it.</span>
            </h2>
            <p className="mt-5 max-w-[46ch] text-[length:var(--text-step-1)] text-[var(--fg)]/72">
              Four things, one standard. Whatever you need built, it is one of these,
              taken all the way to production, not a demo.
            </p>
            <div className="mt-6 flex flex-col items-start gap-4">
              <Link
                href="/offer"
                className="link-draw inline-block text-sm font-medium text-[var(--accent-text)]"
              >
                See everything we build
              </Link>
              <Link
                href="/offer#industries"
                className="group inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-[var(--accent)]/40 bg-[color-mix(in_oklab,var(--accent)_8%,transparent)] px-3.5 py-2 text-[11px] font-medium text-[var(--accent-text)] transition-colors duration-300 hover:border-[var(--accent)]/70 sm:px-4 sm:text-sm"
              >
                <span aria-hidden="true" className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60 motion-reduce:hidden" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
                </span>
                Not sure how AI fits your industry? See it here.
              </Link>
            </div>
          </Reveal>

          <Reveal>
            <AnimatedBeams />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
