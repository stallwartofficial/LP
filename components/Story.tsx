import Image from "next/image";
import { site } from "@/data/site";
import { offerings } from "@/data/offerings";

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
              Businesses rarely fail at strategy. They fail at follow through.
              The work that has to happen every day, by someone, on time, and
              that nobody has ever found interesting. The enquiry that came in
              at seven in the evening. The draft that sat in review for nine
              days. The compliance question everyone quietly hoped belonged to
              somebody else.
            </p>

            <p>
              {site.founder.name} founded {site.company} on the observation that
              this is the same failure everywhere, and that it is almost never a
              failure of care. Nobody in those buildings needed a lecture about
              rigour. There were simply more things to hold than there were
              hands to hold them, and the things that got dropped were always
              the ones that mattered later rather than now.
            </p>

            <p>
              The obvious answer in 2026 is to point AI at the problem. That is
              where most of it goes wrong. A model that is confident and
              unaccountable does not remove the work, it moves the work to
              whoever now has to check it. The organisation ends up with a new
              category of risk and the same backlog.
            </p>

            <p>
              So that became the specification rather than the marketing.
              Reliable, because a system that needs remembering has not removed
              any work. Honest, because a system that hides its own uncertainty
              is a liability wearing the costume of an asset. Scalable, because
              anything that only works at demo volume was a prototype, whatever
              the invoice said.
            </p>

            <p>
              The first system built to that standard was{" "}
              <strong className="font-medium text-[var(--fg)]">
                {offerings[0].name}
              </strong>
              , because the cost of dropped work showed most plainly there. It
              will not be the last. The same failure lives in AI governance,
              where nobody can account for how a decision was reached, which is
              why {offerings[2].name} is being built to the same standard.
            </p>

            <p>
              The name is the standard. {site.tagline.replace(".", "")} means
              the system holds past the point where a demo ends: at real volume,
              on the exceptions nobody scoped, on the day the person who
              understood it is somewhere else.
            </p>
          </div>

        {/* --- Portrait: second on mobile, sticky right column on desktop. --- */}
        <div className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-start lg:sticky lg:top-32">
          <div className="pinboard rounded-2xl border border-[var(--hairline)] p-7 sm:p-8">
            <figure className="photo-taped bg-[var(--bg-raised)] p-2.5">
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--surface)]">
                <Image
                  src="/images/founder.jpg"
                  alt={`${site.founder.name}, ${site.founder.role} of ${site.company}`}
                  fill
                  sizes="(min-width: 1024px) 24rem, 80vw"
                  className="object-cover object-top"
                />
              </div>
              <figcaption className="mt-3 px-1 pb-1">
                <span className="font-display block text-[length:var(--text-step-1)] italic">
                  {site.founder.name}
                </span>
                <span className="font-mono mt-0.5 block text-[9px] uppercase tracking-[0.16em] text-[var(--fg)]/70">
                  {site.founder.role}
                </span>
                <span className="mt-2 block text-xs leading-snug text-[var(--fg)]/70">
                  {site.founder.credential}
                </span>
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
