import Image from "next/image";
import { site } from "@/data/site";
import { offerings } from "@/data/offerings";

// The company's story, told through the founder's conviction.
//
// PUBLICIST NOTE: attributed to Nuras by name and role. No words are quoted, so
// nothing is put in a real person's mouth. If a signed pull quote is wanted,
// see the TODO on site.founder in data/site.ts.
//
// Set as long form editorial: a drop cap, a pulled thesis, and the three
// principles named as the through line to every offering.
export function Story() {
  return (
    <>
      <header className="px-[var(--space-gutter)] pb-4 pt-36 lg:pt-44">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-10 bg-[var(--accent)]" />
            <p className="eyebrow">Our story</p>
          </div>

          <h1 className="font-display mt-6 text-display-lg font-light">
            Reliable, honest, scalable.
            <br />
            <span className="text-gold-sheen italic">In that order.</span>
          </h1>

          <p className="mt-6 text-[length:var(--text-step-1)] text-[var(--fg)]/70">
            {site.positioning}
          </p>
        </div>
      </header>

      <section
        id="story"
        className="px-[var(--space-gutter)] pb-[var(--space-section)] pt-10"
      >
        <div className="mx-auto max-w-3xl">
          <div className="space-y-6 text-[length:var(--text-step-1)] leading-relaxed text-[var(--fg)]/85">
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
          </div>

          {/* The thesis, attributed, with the portrait beside it. Same taped
              material as the home page and the testimonials, so every human
              moment on the site shares one treatment. */}
          <blockquote className="my-14 grid items-center gap-8 sm:grid-cols-[minmax(0,9rem)_minmax(0,1fr)] sm:gap-10">
            <figure className="photo-taped bg-[var(--bg-raised)] p-2.5">
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--surface)]">
                <Image
                  src="/images/founder.jpg"
                  alt={`${site.founder.name}, ${site.founder.role} of ${site.company}`}
                  fill
                  sizes="(min-width: 640px) 9rem, 70vw"
                  className="object-cover object-top"
                />
              </div>
            </figure>

            <div className="border-l-2 border-[var(--accent)] pl-6">
              <p className="font-display text-[length:var(--text-step-3)] font-light leading-tight">
                Building systems with AI that are built beyond the demo. Reliable
                enough to leave alone, honest enough to trust, and scalable
                enough to still be right at ten times the volume.
              </p>
              <footer className="mt-5 text-sm text-[var(--fg)]/70">
                {site.founder.name}, {site.founder.role}
              </footer>
            </div>
          </blockquote>

          {/* The three principles, as the spine of the company. */}
          <ol className="my-14 grid gap-px bg-[var(--hairline)] sm:grid-cols-3">
            {site.pillars.map((pillar) => (
              <li key={pillar.key} className="bg-[var(--bg)] p-6">
                <span className="eyebrow">{pillar.number}</span>
                <h2 className="font-display mt-2 text-[length:var(--text-step-2)]">
                  {pillar.title}
                </h2>
                <p className="mt-2 text-sm text-[var(--fg)]/70">
                  {pillar.claim}
                </p>
              </li>
            ))}
          </ol>

          <div className="space-y-6 text-[length:var(--text-step-1)] leading-relaxed text-[var(--fg)]/85">
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
              , because revenue pipelines were where the cost showed most
              plainly. A buyer arrives at the wrong hour and goes quietly cold.
              It will not be the last. The same failure lives in AI governance,
              where nobody can account for how a decision was reached, and in
              video production, where output is capped by the hours available to
              edit it.
            </p>

            <p>
              The name is the standard. {site.tagline.replace(".", "")} means
              the system holds past the point where a demo ends: at real volume,
              on the exceptions nobody scoped, on the day the person who
              understood it is somewhere else.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
