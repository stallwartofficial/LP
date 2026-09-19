import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Careers",
  description:
    "We hire people who build: from first principles, with momentum, obsessed with the customer, in craft with the team. Interns open in Engineering and Business.",
  path: "/careers",
});

// The four things, given the visual treatment. Copy in a plain, thinking voice.
const principles = [
  {
    h: "Build from first principles",
    p: "We don't copy the standard approach just because it exists. We break a problem down to what's actually true and build up from there. It's slower to start, and it's the only way to end up with something that holds.",
  },
  {
    h: "Momentum, why not today?",
    p: "Speed is a habit, not a sprint. When something can ship today, we ask why it isn't. A small piece in front of real use beats a perfect plan that never leaves the doc.",
  },
  {
    h: "Customer obsession",
    p: "We build for the person with the problem, not for our own cleverness. Their reality decides what good means. We'd rather ship the plain thing that helps than the elegant thing that doesn't.",
  },
  {
    h: "Craft with the team",
    p: "There's usually a best idea, and you can feel when you've found the right abstraction. We get there through discourse, not ego. Being right yourself is good; getting the right idea to emerge from the room is an order of magnitude better.",
  },
];

// Open roles live here. Add an entry (or flip `open`) and the section + the
// "N seats open" line update themselves.
const roles = [
  {
    slug: "interns",
    title: "Interns",
    meta: "Engineering and Business · Internship",
    open: true,
  },
];

const openRoles = roles.filter((r) => r.open);

function seatsLine(n: number): string {
  if (n === 0) return "No roles open right now, but we always read a strong application.";
  const word = n === 1 ? "One seat" : `${n} seats`;
  const fits = n === 1 ? "it fits" : "one fits";
  return `${word} open right now. If ${fits}, it's worth a real application.`;
}

const process = [
  { n: "1", t: "A first conversation", meta: "30 min", d: "We get to know each other and check for real fit. No trick questions." },
  { n: "2", t: "A real problem", meta: "your pace", d: "A small, practical exercise close to the actual work. Never free labor." },
  { n: "3", t: "Meet the team", meta: "60 min", d: "You talk to the people you'd work with, and interview us just as hard." },
  { n: "4", t: "An offer, plainly", meta: "the fun part", d: "If it's a yes, we explain the whole offer and give you room to decide." },
];

export default function CareersPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
        ])}
      />
      <main className="px-[var(--space-gutter)] pb-[var(--space-section)] pt-32 lg:pt-40">
        <div className="mx-auto max-w-4xl">
          {/* ------------------------------ Hero ------------------------------ */}
          <section>
            <p className="eyebrow">Careers</p>
            <h1 className="font-display mt-4 max-w-3xl text-display-lg font-light">
              Come build things that{" "}
              <span className="text-gold-sheen italic">actually work.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-[length:var(--text-step-2)] leading-relaxed text-[var(--fg)]/85">
              We hire people who build. We care, and we build a lot.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href="#roles"
                className="btn-wipe inline-flex items-center gap-2 rounded-full bg-[var(--fg)] px-7 py-3.5 text-sm font-medium text-[var(--bg)]"
              >
                See open roles
              </a>
              <Link
                href="/story"
                className="link-draw text-sm font-medium text-[var(--accent-text)]"
              >
                Read the founder&apos;s story
              </Link>
            </div>
          </section>

          {/* ----------------------------- Open roles ------------------------- */}
          <section id="roles" className="mt-16 scroll-mt-28">
            <h2 className="font-display text-display-sm font-light">Open roles</h2>
            <p className="mt-4 max-w-2xl text-[length:var(--text-step-1)] text-[var(--fg)]/70">
              {seatsLine(openRoles.length)}
            </p>
            <div className="mt-8 space-y-4">
              {openRoles.map((r) => (
                <Link
                  key={r.slug}
                  href={`/careers/${r.slug}`}
                  className="group flex items-center justify-between gap-6 rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6 transition-colors hover:border-[var(--accent)] sm:p-7"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-display text-[length:var(--text-step-2)] leading-tight">
                        {r.title}
                      </span>
                      <span className="rounded-full border border-[var(--accent)]/50 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent-text)]">
                        Open
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm text-[var(--fg)]/72">{r.meta}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* -------------------------- Hiring process ------------------------ */}
          <section className="mt-24">
            <h2 className="font-display text-display-sm font-light">
              How hiring works here
            </h2>
            <p className="mt-4 max-w-2xl text-[length:var(--text-step-1)] text-[var(--fg)]/70">
              No black box. Here is exactly what happens after you reach out.
            </p>
            <ol className="relative mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
              {/* connecting line sits behind the number nodes only */}
              <span
                aria-hidden="true"
                className="absolute left-0 right-0 top-5 hidden h-px bg-[var(--hairline)] lg:block"
              />
              {process.map((s) => (
                <li key={s.n} className="relative">
                  <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[var(--accent)] bg-[var(--bg)] font-mono text-sm text-[var(--accent-text)]">
                    {s.n}
                  </span>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--fg)]/45">
                    {s.meta}
                  </p>
                  <h3 className="font-display mt-1.5 text-[length:var(--text-step-1)] leading-tight">
                    {s.t}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--fg)]/70">
                    {s.d}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          {/* ------------------- We hire people who build --------------------- */}
          <section className="mt-24">
            <h2 className="font-display max-w-2xl text-display font-light">
              We hire people who{" "}
              <span className="text-gold-sheen italic">build.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-[length:var(--text-step-1)] leading-relaxed text-[var(--fg)]/70">
              People who take ownership, think independently, move quickly, and
              care about the quality of what they put into the world. Four things
              matter more than a résumé here.
            </p>
            {/* 2x2, divided by hairlines: reads as designed, not a bullet list. */}
            <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-[var(--hairline)] bg-[var(--hairline)]">
              {principles.map((p, i) => (
                <div key={p.h} className="bg-[var(--bg)] p-7 sm:p-9">
                  <span className="font-display text-[length:var(--text-step-4)] font-light text-[var(--accent-text)]/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display mt-4 text-[length:var(--text-step-2)] leading-snug">
                    {p.h}
                  </h3>
                  <p className="mt-3 text-[length:var(--text-step-0)] leading-relaxed text-[var(--fg)]/70">
                    {p.p}
                  </p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
