import Link from "next/link";
import { site } from "@/data/site";
import { LogoScroll } from "./LogoScroll";
import { RevealOnLoad } from "./Reveal";

// The company hero.
//
// Enterprise, text-first: a centred column that lands with nothing but the
// tagline, the headline, the subhead, and two CTAs. No set piece competes with
// the claim. The trust strip sits below, so opening the page shows the promise,
// the actions, and who we build for without a scroll.
//
// Server component. Headline, subhead, and CTAs are in the initial HTML, so the
// h1 is crawlable with no JavaScript.
export function Hero() {
  // Two lines, split on the pipe. The gold emphasis word can sit on either
  // line; line two carries the outline treatment.
  const { headline, headlineEmphasis } = site.hero;
  const [lineOne = "", lineTwo = ""] = headline.split("|");

  const renderLine = (line: string, outlined: boolean) => {
    const cls = outlined ? "text-outline block" : "block";
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
    <section className="relative isolate overflow-hidden px-[var(--space-gutter)] pb-8 pt-24 lg:pb-12 lg:pt-32">
      {/* One faint drifting wash, centred behind the headline. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="animate-aurora absolute -top-[30%] left-1/2 h-[52vh] w-[80vw] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,var(--glow)_0%,transparent_62%)] blur-3xl" />
      </div>

      {/* ------------------------- The claim, centred ------------------------- */}
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <RevealOnLoad index={0} y={8}>
          <div className="flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-[var(--accent)] sm:w-12" />
            <p className="font-display text-[length:var(--text-step-1)] italic tracking-wide text-[var(--accent-text)]">
              {site.hero.tagline}
            </p>
            <span aria-hidden="true" className="h-px w-8 bg-[var(--accent)] sm:w-12" />
          </div>
        </RevealOnLoad>

        <RevealOnLoad index={1} y={16}>
          <h1 className="font-display text-hero mt-6 font-normal">
            {renderLine(lineOne, false)}
            {renderLine(lineTwo, true)}
          </h1>
        </RevealOnLoad>

        <RevealOnLoad index={2}>
          <div className="mt-6 max-w-2xl space-y-4 text-[length:var(--text-step-1)] leading-relaxed text-[var(--fg)]/75">
            {site.hero.subhead.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
        </RevealOnLoad>

        <RevealOnLoad
          index={3}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
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

      {/* Trust strip below the claim, still inside the hero. */}
      <div className="mx-auto max-w-6xl">
        <RevealOnLoad index={4} className="mt-14 lg:mt-16">
          <LogoScroll inHero />
        </RevealOnLoad>
      </div>
    </section>
  );
}
