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
      <header className="px-[var(--space-gutter)] pb-4 pt-32 lg:pt-40">
        <div className="mx-auto grid max-w-6xl items-end gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-10 bg-[var(--accent)]" />
              <p className="eyebrow">Our story</p>
            </div>

            <h1 className="font-display mt-5 text-display-lg font-light">
              Reliable, honest, scalable.
              <br />
              <span className="text-gold-sheen italic">In that order.</span>
            </h1>

            <p className="mt-5 max-w-xl text-[length:var(--text-step-1)] text-[var(--fg)]/75">
              {site.positioning}
            </p>

          </div>

          {/* Portrait pinned at the top of the page, so the story opens with a
              person rather than with a wall of prose. */}
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
          </div>
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

          {/* The thesis on paper, so the one quoted moment reads as a
              document rather than as more body copy. */}
          <blockquote className="my-14">
            <div className="note-pin mx-auto max-w-xl rounded-sm bg-[var(--bg-raised)] p-7 sm:p-9">
              <p className="font-display text-[length:var(--text-step-3)] font-light leading-tight">
                Building systems with AI that are built beyond the demo. Reliable
                enough to leave alone, honest enough to trust, and scalable
                enough to still be right at ten times the volume.
              </p>
              <footer className="rule-t mt-6 pt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--fg)]/70">
                {site.founder.name}, {site.founder.role}
              </footer>
              <p className="mt-4 text-sm text-[var(--fg)]/70">
                {site.founder.credential}
              </p>
            </div>
          </blockquote>

          {/* The three principles, as the spine of the company. */}
          <div className="pinboard my-14 rounded-2xl border border-[var(--hairline)] px-5 pb-8 pt-12 sm:px-7">
            <ol className="grid gap-8 sm:grid-cols-3 sm:gap-6">
              {site.pillars.map((pillar, i) => (
                <li
                  key={pillar.key}
                  className="note-pin rounded-sm bg-[var(--bg-raised)] p-5"
                  style={
                    {
                      "--note-rot": i === 1 ? "0.8deg" : i === 0 ? "-1.1deg" : "-0.5deg",
                      "--tape-rot": i === 1 ? "-1.6deg" : "1.4deg",
                    } as React.CSSProperties
                  }
                >
                  <span className="font-mono text-[10px] tracking-[0.18em] text-[var(--accent-text)]">
                    {pillar.number}
                  </span>
                  <h2 className="font-display mt-2 text-[length:var(--text-step-2)] leading-tight">
                    {pillar.title}
                  </h2>
                  <p className="mt-2 text-sm leading-snug text-[var(--fg)]/75">
                    {pillar.claim}
                  </p>
                </li>
              ))}
            </ol>
          </div>

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
