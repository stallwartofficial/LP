import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PrinciplesLedger } from "@/components/PrinciplesLedger";
import { Architecture } from "@/components/Architecture";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Principles",
  description:
    "What Stallwart believes: build from first principles, keep momentum, stay obsessed with the customer, and craft with the team.",
  path: "/principles",
});

// Ledger layout (Option B). Left third of the page is a sticky ledger listing
// all four principles by number and title; the current one is highlighted in
// gold with a rule indicator. Right two-thirds is one principle at a time in
// editorial detail: title, italic gold motto, body, "held against". Reads
// like a private brief: disciplined, high-signal, one item in focus at a time.
const principles = [
  {
    n: "01",
    h: "Build from first principles",
    motto: "Start from what is true.",
    body: "We don't copy the standard approach just because it exists. We break a problem down to what's actually true and build up from there. It's slower to start, and it's the only way to end up with something that holds.",
    against: "cargo cult, copy-paste architecture, borrowed conviction",
    receipt:
      "Every scoping conversation begins with what the failure would cost, not with the reference architecture.",
  },
  {
    n: "02",
    h: "Momentum, why not today?",
    motto: "Speed is a habit.",
    body: "When something can ship today, we ask why it isn't. A small piece in front of real use beats a perfect plan that never leaves the doc. Progress compounds; deliberation without shipping does not.",
    against: "meetings about meetings, endless drafts, waiting-room culture",
    receipt:
      "If a decision is going to be made this week, the smallest reversible version of the work has already started.",
  },
  {
    n: "03",
    h: "Customer obsession",
    motto: "Their reality decides good.",
    body: "We build for the person with the problem, not for our own cleverness. Their reality decides what good means. We'd rather ship the plain thing that helps than the elegant thing that doesn't.",
    against: "cleverness for its own sake, feature theatre, self-referential design",
    receipt:
      "Every review asks a single question first: what did the person on the other end of this feel when they used it.",
  },
  {
    n: "04",
    h: "Craft with the team",
    motto: "The right idea, not mine.",
    body: "There's usually a best idea, and you can feel when you've found the right abstraction. We get there through discourse, not ego. Being right yourself is good; getting the right idea to emerge from the room is an order of magnitude better.",
    against: "loudest voice wins, authorship as ownership, siloed genius",
    receipt:
      "Any conclusion an individual arrives at is walked through the team before it becomes the answer we ship.",
  },
];

export default function PrinciplesPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Principles", path: "/principles" },
        ])}
      />

      <main className="px-[var(--space-gutter)] pb-[var(--space-section)] pt-32 lg:pt-40">
        <div className="mx-auto max-w-6xl">
          {/* ---------------- Hero ---------------- */}
          <div className="max-w-4xl">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-10 bg-[var(--accent)]" />
              <p className="eyebrow">Principles</p>
            </div>
            <h1 className="font-display mt-6 text-display-lg font-light leading-[1.05]">
              What we believe,{" "}
              <span className="text-gold-sheen italic">before we build.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-[length:var(--text-step-1)] text-[var(--fg)]/70">
              Principles are what stay when the calendar gets loud. These four
              are the ones we would keep if we could only keep four.
            </p>
          </div>

          {/* ---------------- Ledger + articles ---------------- */}
          <div className="mt-12 grid gap-10 lg:mt-20 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-24">
            <PrinciplesLedger items={principles.map((p) => ({ n: p.n, h: p.h }))} />

            <div className="flex flex-col">
              {principles.map((p, i) => (
                <article
                  key={p.n}
                  id={`principle-${p.n}`}
                  aria-labelledby={`principle-${p.n}-title`}
                  // Mobile: no min-height, tighter padding so the four
                  // articles are actually scannable. Desktop keeps the
                  // 70vh feel that the ledger-companion layout needs.
                  className={`flex flex-col justify-center py-10 lg:min-h-[70vh] lg:py-16 ${
                    i > 0 ? "border-t border-[var(--hairline)]" : ""
                  }`}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--accent-text)]">
                      Principle {p.n} of 04
                    </span>
                    <span aria-hidden="true" className="h-px flex-1 bg-[var(--hairline)]" />
                  </div>

                  <h2
                    id={`principle-${p.n}-title`}
                    className="font-display mt-6 font-light leading-[1.05]"
                    style={{ fontSize: "clamp(2.25rem, 4.6vw, 4rem)" }}
                  >
                    {p.h}
                  </h2>

                  <p className="text-gold-sheen font-display mt-5 max-w-2xl text-[length:var(--text-step-2)] italic leading-tight">
                    {p.motto}
                  </p>

                  <p className="mt-8 max-w-2xl text-[length:var(--text-step-1)] leading-relaxed text-[var(--fg)]/78">
                    {p.body}
                  </p>

                  <div className="mt-10 grid gap-6 border-t border-[var(--hairline)] pt-6 sm:grid-cols-2">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent-text)]">
                        What we reject
                      </span>
                      <p className="mt-2 text-sm leading-snug text-[var(--fg)]/65">
                        {p.against}
                      </p>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent-text)]">
                        In practice
                      </span>
                      <p className="mt-2 text-sm leading-snug text-[var(--fg)]/65">
                        {p.receipt}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* ---------------- Closing line ---------------- */}
          <div className="mt-24 flex flex-col gap-4 border-t border-[var(--hairline)] pt-8 sm:flex-row sm:items-baseline sm:justify-between">
            <p className="max-w-xl text-[length:var(--text-step-0)] text-[var(--fg)]/72">
              If any of these ever stops being true, we change what is written
              here. Not the other way round.
            </p>
            <Link
              href="/story"
              className="link-draw shrink-0 text-sm font-medium text-[var(--accent-text)]"
            >
              The longer version, in the founder&apos;s story →
            </Link>
          </div>
        </div>
      </main>

      {/* The engineering standard the principles translate into. */}
      <Architecture />
    </>
  );
}
