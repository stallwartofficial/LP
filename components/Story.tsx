import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

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
            Who is behind Stallwart?
          </h1>

          <p className="mt-5 text-[length:var(--text-step-1)] text-[var(--fg)]/75">
            Stallwart was founded by {site.founder.fullName}, an engineer with
            five-plus years building AI systems. He couldn&apos;t buy the
            standard he wanted, so he built it.
          </p>
        </div>

        {/* --- Prose: last on mobile, bottom-left on desktop. --- */}
        <div className="order-3 space-y-6 text-[length:var(--text-step-1)] leading-relaxed text-[var(--fg)]/85 lg:col-start-1 lg:row-start-2">
            <p className="[&::first-letter]:font-display [&::first-letter]:mr-2 [&::first-letter]:float-left [&::first-letter]:text-[3.75rem] [&::first-letter]:font-light [&::first-letter]:leading-[0.82] [&::first-letter]:text-[var(--accent-text)]">
              {site.founder.fullName} does not talk much on video calls. He
              listens, takes his notes, and ships. Five-plus years in, the pattern
              is a career.
            </p>

            <p>
              He built like two people at once. A designer with an eye for
              form. A security engineer with the assumption that everything
              breaks. He started shipping at a small startup, where he moved
              an app from tenth to second in its store ranking in a week and
              lifted downloads ten percent on the way. Then a role at scale,
              inside the kind of engineering organization whose internal
              tools decide whether thousands of people can do their jobs.
              Then a studio, where he led a frontend team and set the
              quality bar for every ticket that left the door. Then a
              stretch inside a product used across Fortune 500 companies, on
              the load-bearing parts most engineers would rather skip.
            </p>

            <p>
              He was integrating AI into the load-bearing parts of a live
              product while the industry was still arguing about what AI
              even was. Not the visible layer. Infrastructure. Migrations that ran themselves. Quiet
              automations that shipped, held, and never asked for attention.
              Somewhere in there, the thesis formed: the AI industry has a
              confidence problem, not a capability problem. Software gets
              sold on how well it performs in a controlled demo, and the gap
              between that and real life becomes the customer&apos;s problem
              the moment the invoice clears. He watched enough teams inherit
              that gap to stop waiting for someone else to fix it.
            </p>

            {/* Pull quote — lifted from the aside signature so the sharpest
                line on the page sits inside the story flow. */}
            <blockquote className="my-8 border-l-2 border-[var(--accent)] pl-6 font-display text-[length:var(--text-step-2)] font-light italic leading-snug text-[var(--fg)]">
              &ldquo;I build to one standard: reliable, honest, scalable, in
              that order. If a system needs me to keep it running, I have
              not finished it.&rdquo;
            </blockquote>

            <p>
              So he built it. The dream he had carried since college became
              the job. {site.company} is what he wanted to be able to hire.
              Systems that report what they do not know. That keep a record
              of what they did. That hold under weight, not because anyone
              is watching, but because they were built to. He grew up
              watching Ratan Tata build with patience and without theatre,
              and {site.company} is being built in that lineage: a small team
              by design, careful, one honest ship at a time.
            </p>

            <p>
              Building {site.company} feels the same. Start from what
              would go wrong, not from what would look good. Ship the
              smallest honest version and put it in front of real use. Hand
              the team the keys, not a dependency. When {site.company}{" "}
              leaves, nothing goes with it. The work so far spans regulated
              industries, professional services, creative practices, and B2B
              software, and clients keep coming back. That is the whole point.
            </p>

            <p>
              He gives back, too. He has mentored 500+ students into
              engineering, and he still makes time for it today.
            </p>

            <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-baseline sm:gap-8">
              <Link
                href="/offer"
                className="link-draw text-[length:var(--text-step-1)] font-medium text-[var(--accent-text)]"
              >
                See what he builds
              </Link>
              <Link
                href="/principles"
                className="link-draw text-[length:var(--text-step-0)] font-medium text-[var(--fg)]/80"
              >
                See how he builds
              </Link>
            </div>
          </div>

        {/* --- Portrait: second on mobile, sticky right column on desktop. --- */}
        <div className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-start lg:sticky lg:top-32">
          <div className="pinboard rounded-2xl border border-[var(--hairline)] p-7 sm:p-8">
            <figure className="photo-taped bg-[var(--bg-raised)] p-2.5">
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--surface)]">
                <Image
                  src="/images/arun-saravanan-founder-stallwart.jpg"
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
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--fg)]/75">
                    Signed
                  </span>
                  <span
                    aria-hidden="true"
                    className="block h-[76px] w-[112px] bg-[var(--fg)]/85"
                    style={{
                      maskImage: "url(/images/arun-saravanan-signature.png)",
                      WebkitMaskImage: "url(/images/arun-saravanan-signature.png)",
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

            {/* The signed quote used to live here too; it now sits inside
                the article body as a pull quote, so this slot is intentionally
                left to the signature above and the LinkedIn touch below. */}

            {/* A warm, verifiable touch: reach the founder personally. */}
            <a
              href="https://in.linkedin.com/in/nuras"
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw mt-5 inline-block whitespace-nowrap text-sm font-medium text-[var(--accent-text)]"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-2 inline-block h-4 w-4 align-[-3px]"
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
