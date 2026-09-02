import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Principles",
  description:
    "What Stallwart believes: build from first principles, keep momentum, stay obsessed with the customer, and craft with the team.",
  path: "/principles",
});

const principles = [
  {
    n: "01",
    h: "Build from first principles",
    p: "We don't copy the standard approach just because it exists. We break a problem down to what's actually true and build up from there. It's slower to start, and it's the only way to end up with something that holds.",
  },
  {
    n: "02",
    h: "Momentum, why not today?",
    p: "Speed is a habit, not a sprint. When something can ship today, we ask why it isn't. A small piece in front of real use beats a perfect plan that never leaves the doc.",
  },
  {
    n: "03",
    h: "Customer obsession",
    p: "We build for the person with the problem, not for our own cleverness. Their reality decides what good means. We'd rather ship the plain thing that helps than the elegant thing that doesn't.",
  },
  {
    n: "04",
    h: "Craft with the team",
    p: "There's usually a best idea, and you can feel when you've found the right abstraction. We get there through discourse, not ego. Being right yourself is good; getting the right idea to emerge from the room is an order of magnitude better.",
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
        <div className="mx-auto max-w-4xl">
          <p className="eyebrow">Principles</p>
          <h1 className="font-display mt-4 max-w-3xl text-display-lg font-light">
            What we believe,{" "}
            <span className="text-gold-sheen italic">before we build.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[length:var(--text-step-1)] text-[var(--fg)]/70">
            Four, held to. Hover a line to read the why.
          </p>

          {/* Hover list: titles stay, each description reveals on hover (desktop)
              and stays open on mobile, where there is no hover. All text is in
              the DOM, so the page stays fully crawlable. */}
          <ol className="mt-14">
            {principles.map((p) => (
              <li
                key={p.n}
                className="group grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-6 border-b border-[var(--hairline)] first:border-t sm:gap-x-10"
              >
                <span
                  aria-hidden="true"
                  className="py-7 font-mono text-xs tracking-[0.2em] text-[var(--accent-text)]/70 transition-colors duration-300 group-hover:text-[var(--accent-text)] sm:text-sm"
                >
                  {p.n}
                </span>
                <h2 className="font-display py-7 text-[length:var(--text-step-3)] font-light leading-tight transition-colors duration-300 group-hover:text-[var(--accent-text)]">
                  {p.h}
                </h2>
                <div className="col-start-2 -mt-3 overflow-hidden pb-7 sm:h-0 sm:pb-0 sm:group-hover:h-auto sm:group-hover:pb-7">
                  <p className="max-w-2xl text-[length:var(--text-step-1)] leading-relaxed text-[var(--fg)]/70 opacity-100 transition-[opacity,transform] duration-400 ease-[var(--ease-out-expo)] sm:-translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 motion-reduce:transition-none">
                    {p.p}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-16 text-sm text-[var(--fg)]/72">
            The longer version is the{" "}
            <Link href="/story" className="link-draw font-medium text-[var(--accent-text)]">
              founder&apos;s story →
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
