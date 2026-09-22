import type { Metadata } from "next";
import Link from "next/link";
import { Story } from "@/components/Story";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

// Compact principles strip for About. The full editorial ledger lives at
// /principles; this surfaces the four titles + mottos so the belief system is
// present on the About page, then links through.
const PRINCIPLES = [
  { n: "01", h: "Build from first principles", motto: "Start from what is true." },
  { n: "02", h: "Momentum, why not today?", motto: "Speed is a habit." },
  { n: "03", h: "Customer obsession", motto: "Their reality decides good." },
  { n: "04", h: "Craft with the team", motto: "The right idea, not mine." },
];

export const metadata: Metadata = pageMeta({
  title: "About Stallwart",
  description:
    "Why Stallwart exists, who builds it, and the principles behind every system: reliable, honest, scalable. The origin, how we operate, and the one engineering standard.",
  path: "/story",
});

// About: the founder origin and full story, then the principles we operate by
// and the engineering standard, all in one place.
export default function StoryPage() {
  return (
    <div>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/story" },
        ])}
      />
      <Story />

      {/* Principles */}
      <section className="section-y rule-t px-[var(--space-gutter)]">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">Principles</p>
              <h2 className="font-display mt-3 text-display-sm font-light">
                What we believe,{" "}
                <span className="text-gold-sheen italic">before we build.</span>
              </h2>
            </div>
            <Link href="/principles" className="link-draw shrink-0 text-sm font-medium text-[var(--accent-text)]">
              Read all four in full →
            </Link>
          </div>

          <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((p) => (
              <li key={p.n} className="bg-[var(--bg)] p-6">
                <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--accent-text)]">
                  {p.n}
                </span>
                <h3 className="font-display mt-3 text-[length:var(--text-step-1)] font-light leading-snug">
                  {p.h}
                </h3>
                <p className="text-gold-sheen font-display mt-2 text-sm italic">
                  {p.motto}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

    </div>
  );
}
