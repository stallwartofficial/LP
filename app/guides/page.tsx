import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { blogPosts } from "@/data/blog";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Guides",
  description:
    "Practical, plain-English guides and checklists on shipping production AI: readiness, governance, outbound, and adding AI to a product. Written for operators.",
  path: "/guides",
});

// Guides is a curated entry point into the how-to / checklist writing — the
// articles, minus the case studies. It links the same canonical posts under
// /blog rather than duplicating them.
const guides = blogPosts.filter((p) => p.kind === "article");

export default function GuidesPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
        ])}
      />
      <main className="px-[var(--space-gutter)] pb-[var(--space-section)] pt-32 lg:pt-40">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">Guides</p>
          <h1 className="font-display mt-4 max-w-3xl text-display-lg font-light">
            The checklists and explainers,{" "}
            <span className="text-gold-sheen italic">in one place.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[length:var(--text-step-1)] text-[var(--fg)]/70">
            Practical, plain-English writing on getting AI past the demo and into
            production: readiness, governance, outbound, and shipping AI inside a
            product. The mechanism, not the vocabulary.
          </p>

          <ul className="mt-14 divide-y divide-[var(--hairline)] border-t border-[var(--hairline)]">
            {guides.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/blog/${g.slug}`}
                  className="group grid gap-2 py-7 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8"
                >
                  <div>
                    <h2 className="font-display text-[length:var(--text-step-2)] font-light leading-tight transition-colors group-hover:text-[var(--accent-text)]">
                      {g.title}
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--fg)]/65">
                      {g.excerpt}
                    </p>
                  </div>
                  <span className="flex items-center gap-3 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--fg)]/45">
                    {g.readingMinutes} min
                    <span className="arrow-shift text-[var(--accent-text)]">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-12 text-sm text-[var(--fg)]/60">
            Looking for the case studies too?{" "}
            <Link href="/blog" className="link-draw font-medium text-[var(--accent-text)]">
              See everything on the blog →
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
