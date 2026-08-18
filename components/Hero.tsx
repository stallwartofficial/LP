import Link from "next/link";
import { site } from "@/data/site";
import { offerings } from "@/data/offerings";
import { Blueprint } from "./Blueprint";
import { LogoScroll } from "./LogoScroll";
import { CadField } from "./CadField";
import { RevealOnLoad } from "./Reveal";

// The company hero.
//
// WHAT CHANGED. The spec rail across the top ("Stallwart / AI and software
// engineering / 4 systems / US and UAE") is gone: it repeated the wordmark, the
// descriptor, and the footer, and it pushed the headline below the fold. Top
// padding is reduced so the tagline, headline, subhead, CTAs, and the portfolio
// strip all land in one view.
//
// The blueprint sits inside a CadField, so a pointer over the drawing gets a
// crosshair and a live coordinate readout: the instrument a drawing is actually
// read with, rather than a cursor-following glow.
//
// Server component. Headline, subhead, and CTAs are in the initial HTML, so the
// h1 is crawlable with no JavaScript.
export function Hero() {
  // Two lines, split on the pipe. Line one carries the gold emphasis word, line
  // two is outlined, so the pair reads as claim then consequence.
  const { headline, headlineEmphasis } = site.hero;
  const [lineOne = "", lineTwo = ""] = headline.split("|");
  const at = lineOne.indexOf(headlineEmphasis);
  const before = at === -1 ? lineOne : lineOne.slice(0, at);
  const after = at === -1 ? "" : lineOne.slice(at + headlineEmphasis.length);

  return (
    <section className="relative isolate overflow-hidden px-[var(--space-gutter)] pb-12 pt-16 lg:pb-14 lg:pt-20">
      {/* One faint drifting wash. The blueprint is the focal point, so the
          background must not compete with it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="animate-aurora absolute -top-[40%] left-1/2 h-[46vh] w-[90vw] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,var(--glow)_0%,transparent_62%)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-12">
          {/* ------------------------- The claim ------------------------- */}
          <div>
            <RevealOnLoad index={0} y={8}>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-px w-10 bg-[var(--accent)] sm:w-14"
                />
                <p className="font-display text-[length:var(--text-step-1)] italic tracking-wide text-[var(--accent-text)]">
                  {site.tagline}
                </p>
              </div>
            </RevealOnLoad>

            {/* Range inside one headline: the emphasised word solid gold, the
                trailing clause outlined. Presence from contrast, not size. */}
            <RevealOnLoad index={1} y={16}>
              <h1 className="font-display text-hero mt-4 font-normal">
                <span className="block">
                  {before}
                  <span className="text-gold-sheen italic">
                    {headlineEmphasis}
                  </span>
                  {after}
                </span>
                <span className="text-outline block">{lineTwo}</span>
              </h1>
            </RevealOnLoad>

            <RevealOnLoad index={2}>
              <div className="mt-5 max-w-xl space-y-4 text-[length:var(--text-step-1)] leading-relaxed text-[var(--fg)]/75">
                {site.hero.subhead.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
            </RevealOnLoad>

            <RevealOnLoad
              index={3}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              <Link
                href={site.hero.primaryCta.href}
                className="btn-wipe rounded-full bg-[var(--fg)] px-7 py-3.5 text-sm font-medium text-[var(--bg)]"
              >
                {site.hero.primaryCta.label}
              </Link>

              <Link
                href={site.hero.secondaryCta.href}
                className="group inline-flex items-center gap-2 rounded-full border border-[var(--hairline-strong)] px-7 py-3.5 text-sm font-medium transition-colors hover:border-[var(--accent)]"
              >
                {site.hero.secondaryCta.label}
                <span aria-hidden="true" className="arrow-shift">
                  →
                </span>
              </Link>
            </RevealOnLoad>
          </div>

          {/* ----------------------- The set piece ----------------------- */}
          <RevealOnLoad index={2} y={0}>
            <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)]/60 p-4 backdrop-blur-sm sm:p-5">
              <div className="mb-3 flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--fg)]/70">
                <span>System schematic</span>
                <span className="text-[var(--accent-text)]">
                  {site.company} core
                </span>
              </div>
              <CadField>
                <Blueprint />
              </CadField>
            </div>
          </RevealOnLoad>
        </div>

        {/* Trust bar above the portfolio strip, both inside the hero, so
            opening the page shows the CTA, the sectors, and what we build
            without a scroll. */}
        <RevealOnLoad index={4} className="mt-6">
          <LogoScroll inHero />
        </RevealOnLoad>

        {/* ---- Portfolio strip: what we build, status made explicit ---- */}
        <RevealOnLoad index={5} className="mt-5">
          <div className="flex items-baseline justify-between gap-4">
            <p className="eyebrow">What we build</p>
            <Link
              href="/offer"
              className="link-draw font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent-text)]"
            >
              All {offerings.length} →
            </Link>
          </div>

          <ul className="mt-3 grid gap-px bg-[var(--hairline)] sm:grid-cols-3">
            {offerings.map((offering) => (
              <li key={offering.slug} className="bg-[var(--bg)]">
                <Link
                  href={`/offer/${offering.slug}`}
                  className="group flex h-full flex-col gap-1 p-3 transition-colors hover:bg-[var(--surface)]"
                >
                  <span className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                        offering.status === "available"
                          ? "bg-[var(--accent)]"
                          : "border border-[var(--fg)]/40"
                      }`}
                    />
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--fg)]/70">
                      {offering.status === "available" ? "Available" : "In development"}
                    </span>
                  </span>
                  <span className="font-display text-[length:var(--text-step-1)] leading-tight transition-colors group-hover:text-[var(--accent-text)]">
                    {offering.name}
                  </span>
                  <span className="text-xs leading-snug text-[var(--fg)]/70">
                    {offering.tagline}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </RevealOnLoad>
      </div>
    </section>
  );
}
