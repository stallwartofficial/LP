import Image from "next/image";
import { site, founderYearsWord } from "@/data/site";

// The company's story, as two fixed columns.
//
// LAYOUT (per owner): left column holds the whole article, heading first, then
// the prose flowing straight down. Right column holds the portrait with the
// founder quote directly beneath it, and stays put (sticky) while the article
// scrolls. No wrapping, no moving the quote to the left.
export function Story() {
  return (
    <section
      id="story"
      className="px-[var(--space-gutter)] pb-[var(--space-section)] pt-32 lg:pt-40"
    >
      {/* Three blocks that stack heading -> portrait -> prose on mobile. On
          desktop the heading and prose share the left column while the portrait
          holds a sticky right column spanning both rows. */}
      <div className="mx-auto grid max-w-6xl items-start gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]">
        {/* --- Heading: first on mobile, top-left on desktop. --- */}
        <div className="order-1 lg:col-start-1 lg:row-start-1">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-10 bg-[var(--accent)]" />
            <p className="eyebrow">Our story</p>
          </div>

          <h1 className="font-display mt-5 text-display-lg font-light">
            Reliable, honest, scalable.
            <br />
            <span className="text-gold-sheen italic">In that order.</span>
          </h1>

          <p className="mt-5 text-[length:var(--text-step-1)] text-[var(--fg)]/75">
            {site.positioning}
          </p>
        </div>

        {/* --- Prose: last on mobile, bottom-left on desktop. --- */}
        <div className="order-3 space-y-6 text-[length:var(--text-step-1)] leading-relaxed text-[var(--fg)]/85 lg:col-start-1 lg:row-start-2">
            <p className="[&::first-letter]:font-display [&::first-letter]:mr-2 [&::first-letter]:float-left [&::first-letter]:text-[3.75rem] [&::first-letter]:font-light [&::first-letter]:leading-[0.82] [&::first-letter]:text-[var(--accent-text)]">
              {site.founder.name} has spent {founderYearsWord} years building AI
              systems for production, not for demos, a distinction the rest of
              the industry
              is only now catching up to. He began working with AI ahead of the
              curve, at a point when most of the market still treated it as an
              experimental layer rather than infrastructure, and has been
              building it into revenue-critical systems ever since.
            </p>

            <p>
              His engineering background is in SaaS: systems built for companies
              where downtime, drift, or an unaccountable model isn&apos;t an
              inconvenience, it&apos;s a customer relationship at risk. One of
              the products from that period, a knowledge platform now used inside
              SaaS teams to organize and surface their own documentation, remains
              in active production today. Not because it shipped fast. Because it
              was engineered to still be correct at scale, long after the people
              who built it had moved on to the next system.
            </p>

            <p>
              That standard is the reason {site.company} exists.{" "}
              {site.founder.name} founded the company on a direct observation:
              the AI industry has a confidence problem, not a capability problem.
              Systems get sold on how convincingly they perform in a controlled
              demo, and the gap between that performance and real-world
              reliability becomes someone else&apos;s problem the moment the
              invoice clears. He built {site.company} to close that gap,
              engineering AI systems that report their own uncertainty instead of
              asserting through it, and that are built to be audited, not just
              believed.
            </p>

            <p>
              The result is a standard, not a slogan: systems reliable enough to
              run without supervision, honest enough to earn trust rather than
              claim it, and engineered from first principles so they hold at
              scale, not just in the room where they were pitched.
            </p>
          </div>

        {/* --- Portrait: second on mobile, sticky right column on desktop. --- */}
        <div className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-start lg:sticky lg:top-32">
          <div className="pinboard rounded-2xl border border-[var(--hairline)] p-7 sm:p-8">
            <figure className="photo-taped bg-[var(--bg-raised)] p-2.5">
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--surface)]">
                <Image
                  src="/images/founder.jpg"
                  alt={`${site.founder.fullName}, ${site.founder.role} of ${site.company}`}
                  fill
                  sizes="(min-width: 1024px) 24rem, 80vw"
                  className="object-cover object-top"
                />
              </div>
              <figcaption className="mt-3 px-1 pb-1">
                <span className="font-display block text-[length:var(--text-step-1)] italic">
                  {site.founder.fullName}
                </span>
                <span className="font-mono mt-0.5 block text-[9px] uppercase tracking-[0.16em] text-[var(--fg)]/70">
                  {site.founder.role}
                </span>
                <span className="mt-2 block text-xs leading-snug text-[var(--fg)]/70">
                  {site.founder.credential}
                </span>
                {/* Arun's signature, as a theme-coloured mask so the white-ink
                    source reads in both light and dark. Decorative: the name
                    above is the real, accessible identifier. */}
                <span
                  aria-hidden="true"
                  className="mt-3 ml-auto block h-[64px] w-[86px] bg-[var(--fg)]/80"
                  style={{
                    maskImage: "url(/images/arun-signature.png)",
                    WebkitMaskImage: "url(/images/arun-signature.png)",
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                    maskSize: "contain",
                    WebkitMaskSize: "contain",
                    maskPosition: "right",
                    WebkitMaskPosition: "right",
                  }}
                />
              </figcaption>
            </figure>

            {/* The quote, directly below the photo, on the same board. */}
            <blockquote className="mt-5 border-t border-[var(--hairline)] pt-5 font-display text-[length:var(--text-step-1)] font-light italic leading-snug text-[var(--fg)]/85">
              &ldquo;Building systems with AI that are built beyond the demo:
              reliable enough to leave alone, honest enough to trust, and
              scalable enough to still be right at ten times the volume.&rdquo;
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
