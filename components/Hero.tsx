import Link from "next/link";
import { site } from "@/data/site";
import { LogoScroll } from "./LogoScroll";
import { RevealOnLoad } from "./Reveal";
import { HeroField } from "./HeroField";
import { FlipWords } from "./FlipWords";
import { TerminalBuild } from "./TerminalBuild";

// The company hero.
//
// Enterprise, text-first: a centred column that lands with nothing but the
// tagline, the headline, the subhead, and two CTAs. No set piece competes with
// the claim. The trust strip sits below, so opening the page shows the promise,
// the actions, and who we build for without a scroll.
//
// Server component. Headline, subhead, and CTAs are in the initial HTML, so the
// h1 is crawlable with no JavaScript.
// A few key phrases in the subhead are lifted into Fraunces italic (the display
// face, already loaded) for an editorial accent against the sans body. No new
// fonts, so no performance cost. Phrases not present are simply skipped.
const EMPHASISE = [
  "we build the system that solves it",
  "built for production",
];

function emphasise(text: string): React.ReactNode[] {
  let nodes: React.ReactNode[] = [text];
  for (const phrase of EMPHASISE) {
    nodes = nodes.flatMap((node) => {
      if (typeof node !== "string" || !node.includes(phrase)) return [node];
      const segs = node.split(phrase);
      const out: React.ReactNode[] = [];
      segs.forEach((seg, i) => {
        if (seg) out.push(seg);
        if (i < segs.length - 1) {
          out.push(
            <span
              key={`${phrase}-${i}`}
              className="font-display italic text-[var(--fg)]/95"
            >
              {phrase}
            </span>
          );
        }
      });
      return out;
    });
  }
  return nodes;
}

export function Hero() {
  // Two lines, split on the pipe. Weight carries the hierarchy: line one sits
  // light, line two lands in medium, so the pair reads as claim then payoff.
  // The gold emphasis word can fall on either line.
  const { headline, headlineEmphasis } = site.hero;
  const [lineOne = "", lineTwo = ""] = headline.split("|");

  const renderLine = (line: string, weight: string) => {
    const cls = `block ${weight} lg:whitespace-nowrap`;
    const at = line.indexOf(headlineEmphasis);
    if (at === -1) return <span className={cls}>{line}</span>;
    return (
      <span className={cls}>
        {line.slice(0, at)}
        <span className="text-gold-sheen italic">{headlineEmphasis}</span>
        {line.slice(at + headlineEmphasis.length)}
      </span>
    );
  };

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden px-[var(--space-gutter)] pb-8 pt-24 lg:pt-28">
      {/* Amber glow, radial-masked dot grid, and corner crosshairs. */}
      <HeroField />

      {/* Split hero: the claim on the left, a live build artifact on the right. */}
      <div className="mx-auto grid w-full max-w-[108rem] flex-1 items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
        {/* ---------------------------- Left: claim ---------------------------- */}
        <div className="text-center lg:text-left">
          <RevealOnLoad index={0} y={8}>
            <div className="flex items-center justify-center gap-3 lg:justify-start">
              <span aria-hidden="true" className="h-px w-8 bg-[var(--accent)] sm:w-12" />
              <p className="font-display text-[length:var(--text-step-1)] italic tracking-wide text-[var(--accent-text)]">
                {site.hero.tagline}
              </p>
            </div>
          </RevealOnLoad>

          {/* H1 is the LCP element: no reveal wrapper so it paints immediately. */}
          <h1 className="font-display mt-6 text-[clamp(2rem,1.1rem+3.4vw,3.6rem)] leading-[1.05]">
            {renderLine(lineOne, "font-light")}
            {renderLine(lineTwo, "font-medium")}
          </h1>

          {/* Flip-board scope line: the one motion moment in the copy. */}
          <RevealOnLoad index={1}>
            <p className="mt-5 flex items-baseline justify-center gap-2 font-display text-[length:var(--text-step-3)] text-[var(--fg)]/80 lg:justify-start">
              <span>We build</span>
              <FlipWords words={[...site.hero.flipWords]} />
            </p>
          </RevealOnLoad>

          <RevealOnLoad index={2}>
            <div className="mt-6">
              <p className="mx-auto max-w-2xl font-display text-[length:var(--text-step-2)] font-light leading-relaxed text-[var(--fg)]/80 lg:mx-0">
                {emphasise(site.hero.subhead[0])}
              </p>
            </div>
          </RevealOnLoad>

          <RevealOnLoad
            index={3}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <Link
              href={site.hero.primaryCta.href}
              className="group relative inline-flex items-center overflow-hidden rounded-full bg-[var(--fg)] px-8 py-4 text-sm font-medium text-[var(--bg)]"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-full bg-[var(--accent)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
              />
              <span className="relative transition-colors group-hover:text-[var(--color-ink)]">
                {site.hero.primaryCta.label}
              </span>
            </Link>
            <Link
              href={site.hero.secondaryCta.href}
              className="btn-wipe inline-flex items-center rounded-full border border-[var(--hairline-strong)] px-8 py-4 text-sm font-medium text-[var(--fg)]"
            >
              {site.hero.secondaryCta.label}
            </Link>
          </RevealOnLoad>

          {/* Industry nudge, below the buttons: a live pulse dot as a static
              invitation to click through to the industry explorer. */}
          <RevealOnLoad index={4} className="mt-6 flex justify-center lg:justify-start">
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
          </RevealOnLoad>
        </div>

        {/* ------------------------ Right: build artifact ---------------------- */}
        <RevealOnLoad index={2} className="w-full">
          <TerminalBuild />
        </RevealOnLoad>
      </div>

      {/* Trust strip below the claim, still inside the hero. */}
      <div className="-mx-[var(--space-gutter)]">
        <RevealOnLoad index={4} className="mt-10">
          <LogoScroll inHero />
        </RevealOnLoad>
      </div>
    </section>
  );
}
