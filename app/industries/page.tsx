import type { Metadata } from "next";
import Link from "next/link";
import { industries, industryShort } from "@/data/industries";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { pageMeta, breadcrumbSchema, industriesSchema } from "@/lib/seo";

// The industries hub: one crawlable entry point linking to all 14
// /industries/[slug] pages. Drives internal linking + AEO for "AI for X".
export const metadata: Metadata = pageMeta({
  title: "AI Across Industries",
  description:
    "AI built for your industry: banking, healthcare, retail, fintech, insurance, logistics, real estate, education, and more. See what Stallwart builds for each.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <div>
      <JsonLd
        schema={[
          industriesSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Industries", path: "/industries" },
          ]),
        ]}
      />

      <section className="px-[var(--space-gutter)] pb-[var(--space-section)] pt-32 lg:pt-40">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="eyebrow">AI across your industry</p>
            <h1 className="font-display mt-3 text-display-lg font-light leading-[1.05]">
              Whatever you run,{" "}
              <span className="text-gold-sheen italic">AI fits it.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-[length:var(--text-step-2)] leading-relaxed text-[var(--fg)]/80">
              We build production AI for the way your industry actually works. Pick
              yours to see what we would build and the outcomes it drives.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
              <Reveal key={ind.slug}>
                <Link
                  href={`/industries/${ind.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6 transition-colors duration-300 hover:border-[var(--accent)]/50"
                >
                  <h2 className="font-display text-[length:var(--text-step-2)] font-light leading-tight">
                    AI for {ind.name}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--fg)]/65">
                    In {industryShort(ind.name)}, we build AI that {ind.title}
                  </p>
                  <span className="link-draw mt-4 inline-block text-sm font-medium text-[var(--accent-text)]">
                    See AI for {industryShort(ind.name)}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
