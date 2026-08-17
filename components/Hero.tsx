import Link from "next/link";
import { site } from "@/data/site";
import { offerings } from "@/data/offerings";
import { RevealOnLoad } from "./Reveal";

// Company hero. Stallwart is the only subject.
//
// The previous version carried a "Systems running" instrument panel, which read
// as a fake dashboard. Removed. Presence now comes from restrained display
// type, the tagline given its own weight, and a live portfolio strip that
// states what the company actually is: three systems, one standard.
//
// Server component: headline, subhead, and CTAs are in the initial HTML, so the
// h1 is crawlable with no JavaScript.
export function Hero() {
  const [line1, line2] = site.hero.headline.split("|");

  return (
    <section className="relative isolate overflow-hidden px-[var(--space-gutter)] pt-32 pb-[var(--space-section)] lg:pt-40">
      {/* Ambient field: one drifting gold wash and a hairline grid for depth. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="animate-aurora absolute -top-[40%] left-1/2 h-[70vh] w-[120vw] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,var(--glow)_0%,transparent_62%)] blur-3xl" />
        <div
          className="absolute inset-x-0 top-0 h-full opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--hairline) 1px, transparent 1px)",
            backgroundSize: "clamp(4rem, 8vw, 8rem) 100%",
            maskImage: "linear-gradient(to bottom, black 0%, transparent 70%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl">
        {/* The tagline, given real presence as the brand line it is. */}
        <RevealOnLoad index={0} y={8}>
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-10 bg-[var(--accent)] sm:w-16"
            />
            <p className="font-display text-[length:var(--text-step-1)] italic tracking-wide text-[var(--accent-text)]">
              {site.tagline}
            </p>
          </div>
        </RevealOnLoad>

        <h1 className="font-display mt-7 max-w-4xl text-display-xl font-light">
          <RevealOnLoad index={1} y={20}>
            <span className="block">{line1}</span>
          </RevealOnLoad>
          <RevealOnLoad index={2} y={20}>
            <span className="block text-[var(--fg)]/55">{line2}</span>
          </RevealOnLoad>
        </h1>

        <RevealOnLoad index={3}>
          <p className="mt-8 max-w-2xl text-[length:var(--text-step-1)] leading-relaxed text-[var(--fg)]/75">
            {site.hero.subhead}
          </p>
        </RevealOnLoad>

        <RevealOnLoad
          index={4}
          className="mt-10 flex flex-wrap items-center gap-3"
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

        {/* Portfolio strip. States what the company is, and doubles as an
            internal link surface on the highest authority page. */}
        <RevealOnLoad index={5} className="rule-t mt-16 pt-8">
          <p className="eyebrow">Three systems, one standard</p>
          <ul className="mt-5 grid gap-px bg-[var(--hairline)] sm:grid-cols-3">
            {offerings.map((offering) => (
              <li key={offering.slug} className="bg-[var(--bg)]">
                <Link
                  href={`/offer/${offering.slug}`}
                  className="group flex h-full flex-col gap-1.5 py-4 pr-4 transition-colors hover:bg-[var(--surface)] sm:px-5"
                >
                  <span className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className={`h-1.5 w-1.5 rounded-full ${
                        offering.status === "available"
                          ? "bg-[var(--accent)]"
                          : "border border-[var(--fg)]/35"
                      }`}
                    />
                    <span className="font-display text-[length:var(--text-step-1)] transition-colors group-hover:text-[var(--accent-text)]">
                      {offering.name}
                    </span>
                  </span>
                  <span className="text-xs leading-snug text-[var(--fg)]/60">
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
