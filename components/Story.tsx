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
              {site.founder.name} builds quietly, and then he stands behind what
              he built. {founderYearsWord.charAt(0).toUpperCase() +
                founderYearsWord.slice(1)}{" "}
              years into putting AI into production systems, he has made peace
              with the unglamorous truth of the work: the demo is the easy part.
              What matters is the eighty percent nobody applauds, the part that
              has to be correct at 2am, when the person who wrote it is asleep.
            </p>

            <p>
              He was building with AI before the market took it seriously, when
              most treated it as an experimental layer rather than
              infrastructure. His background is in SaaS, where downtime, drift, or
              an unaccountable model is not an inconvenience but a customer
              relationship at risk. One platform he built in those years is still
              in production today, quietly organizing the documentation of teams
              who will never meet him. It did not ship fast. It shipped correct,
              and it stayed correct, long after the people who built it moved on.
            </p>

            <p>
              {site.company} is the standard he wanted and could not buy. The AI
              industry, he will tell you plainly, has a confidence problem, not a
              capability problem: systems get sold on how convincingly they
              perform in a controlled demo, and the gap between that and
              real-world reliability becomes the customer&apos;s problem the
              moment the invoice clears. He built {site.company} to close that
              gap, engineering AI systems that report their own uncertainty
              instead of asserting through it, and that are built to be audited,
              not just believed.
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
                <span className="mt-2.5 block text-sm leading-relaxed text-[var(--fg)]/75">
                  {site.founder.credential}
                </span>
                {/* Signed sign-off: a labelled row on a hairline, so the
                    signature reads as an intentional autograph rather than a
                    floating graphic. Theme-colored mask so the white-ink source
                    shows in both modes; the printed name above stays the
                    accessible identifier. */}
                <span className="mt-4 flex items-end justify-between gap-3 border-t border-[var(--hairline)] pt-3.5">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--fg)]/45">
                    Signed
                  </span>
                  <span
                    aria-hidden="true"
                    className="block h-[76px] w-[112px] bg-[var(--fg)]/85"
                    style={{
                      maskImage: "url(/images/arun-signature.png)",
                      WebkitMaskImage: "url(/images/arun-signature.png)",
                      maskRepeat: "no-repeat",
                      WebkitMaskRepeat: "no-repeat",
                      maskSize: "contain",
                      WebkitMaskSize: "contain",
                      maskPosition: "right bottom",
                      WebkitMaskPosition: "right bottom",
                    }}
                  />
                </span>
              </figcaption>
            </figure>

            {/* A first-person line, directly below the photo, that pairs with
                the signature: the founder speaking in his own voice. */}
            <blockquote className="mt-5 border-t border-[var(--hairline)] pt-5 font-display text-[length:var(--text-step-1)] font-light italic leading-snug text-[var(--fg)]/85">
              &ldquo;I build to one standard: reliable, honest, scalable, in that
              order. If a system needs me to keep it running, I have not finished
              it.&rdquo;
            </blockquote>

            {/* A warm, verifiable touch: reach the founder personally. */}
            <a
              href="https://www.linkedin.com/in/nuras/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent-text)]"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
              </svg>
              Reach {site.founder.name} on LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
