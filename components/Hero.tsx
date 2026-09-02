import Link from "next/link";
import { site } from "@/data/site";
import { LogoScroll } from "./LogoScroll";
import { RevealOnLoad } from "./Reveal";
import { HeroField } from "./HeroField";

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
  "the work that can't be solved off the shelf",
  "first principles to production",
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
    const cls = `block ${weight}`;
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
      {/* Centered amber glow, radial-masked dot grid, and corner crosshairs. */}
      <HeroField />

      {/* ------------------------- The claim, centred ------------------------- */}
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center text-center">
        <RevealOnLoad index={0} y={8}>
          <div className="flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-[var(--accent)] sm:w-12" />
            <p className="font-display text-[length:var(--text-step-1)] italic tracking-wide text-[var(--accent-text)]">
              {site.hero.tagline}
            </p>
            <span aria-hidden="true" className="h-px w-8 bg-[var(--accent)] sm:w-12" />
          </div>
        </RevealOnLoad>

        {/* H1 is the LCP element on the home page: render it in the initial
            HTML with no reveal animation so it paints immediately. Wrapping it
            in RevealOnLoad delayed LCP by ~500ms on mobile-throttled. */}
        <h1 className="font-display text-hero mt-6">
          {renderLine(lineOne, "font-light")}
          {renderLine(lineTwo, "font-medium")}
        </h1>

        <RevealOnLoad index={2}>
          <div className="mt-7 max-w-5xl space-y-2 text-[clamp(1.05rem,0.95rem+0.55vw,1.24rem)] leading-relaxed text-[var(--fg)]/75">
            {site.hero.subhead.map((para, i) => (
              <p
                key={para}
                className={
                  i === site.hero.subhead.length - 1
                    ? "font-semibold text-[var(--fg)]/90"
                    : undefined
                }
              >
                {emphasise(para)}
              </p>
            ))}
          </div>
        </RevealOnLoad>

        <RevealOnLoad
          index={3}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href={site.hero.secondaryCta.href}
            className="btn-wipe inline-flex items-center rounded-full bg-[var(--fg)] px-8 py-4 text-sm font-medium text-[var(--bg)]"
          >
            {site.hero.secondaryCta.label}
          </Link>
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
