"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { BlogPost, BlogCategory } from "@/data/blog";
import { blogCategories } from "@/data/blog";
import { getOffering } from "@/data/offerings";
import { BlogDiagram } from "@/components/BlogDiagram";

// Card grid for the blog index. Replaces the ruled editorial list with a
// three-up grid of cards, each carrying a branded top panel (surface with a
// warm radial in the accent), a meta strip, title, excerpt, and a footer that
// pairs the category pill with the arrow. Voice stays Stallwart: warm ink on
// dark surface, Fraunces for display, no pastels or illustrations.
//
// Search filters by title, excerpt, topic (keyword cluster), industry, and
// persona so a visitor can find the case study for their scenario without
// scrolling the whole index.

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

function CardTopPanel({ post }: { post: BlogPost }) {
  const offeringName =
    getOffering(post.offering)?.name ?? post.offering.replace(/-/g, " ");

  return (
    // The diagrams are wide and flat (roughly 3:1 to 2.5:1), so aspect-[2/1]
    // matches them without leaving a slab of dead space above and below.
    <div className="relative aspect-[2/1] w-full overflow-hidden rounded-t-xl border-b border-[var(--hairline)] bg-[var(--surface)]">
      {/* Warm radial keeps the panel on-brand behind the diagram or fallback. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_100%_0%,color-mix(in_oklab,var(--accent)_12%,transparent),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,var(--hairline-strong),transparent)]"
      />
      {post.diagram ? (
        // Diagram fills the panel edge-to-edge. Text inside the SVG scales
        // up as the panel widens, which is the readability lever.
        <div className="absolute inset-0 flex items-center justify-center px-3 py-2">
          <BlogDiagram name={post.diagram} compact />
        </div>
      ) : (
        // Posts without a diagram get the offering label as a graphic fallback.
        <div className="absolute inset-0 flex items-end justify-between p-5">
          <span className="font-display max-w-[70%] text-[length:var(--text-step-1)] italic leading-tight text-[var(--fg)]/85">
            {offeringName}
          </span>
        </div>
      )}
      <span className="absolute right-4 top-4 rounded-full border border-[var(--hairline-strong)] bg-[var(--bg)]/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent-text)] backdrop-blur">
        {post.kind === "case-study" ? "Case study" : "Article"}
      </span>
    </div>
  );
}

function Card({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="card-lift group flex flex-col overflow-hidden rounded-xl border border-[var(--hairline)] bg-[var(--surface)]/60 transition-colors hover:border-[var(--accent)]"
      aria-label={`${post.kind === "case-study" ? "Case study" : "Article"}: ${post.title}`}
    >
      <CardTopPanel post={post} />

      {/* Every row inside the body is a fixed slot so the card is the same
          height whether the title wraps to two lines or three, and whether
          the excerpt fills two lines or one. That is the only way a grid of
          14 posts reads as one system rather than a ransom note. */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--fg)]/60">
          <time dateTime={post.publishedAt}>{fmtDate(post.publishedAt)}</time>
          <span>{post.readingMinutes} min read</span>
        </div>

        {/* Sans-serif for card titles: Fraunces is the display face for the
            hero and article body, and at 15px in a 2-3 line wrap it starts
            to read as decoration rather than a label. Plex Sans medium
            keeps the scannability of a card. */}
        {/* Fixed slot heights via inline style so every card is the same
            height regardless of title length. Line-clamp caps long content;
            the fixed height fills for short content. Numbers derive from
            font-size * leading-snug * lines: 15 * 1.375 * 3 = 62; 13 * 1.375
            * 2 = 36. */}
        <h2
          className="mt-3 line-clamp-3 overflow-hidden text-[15px] font-medium leading-snug text-[var(--fg)] transition-colors group-hover:text-[var(--accent-text)]"
          style={{ height: "62px" }}
        >
          {post.title}
        </h2>

        <p
          className="mt-2 line-clamp-2 overflow-hidden text-[13px] leading-snug text-[var(--fg)]/70"
          style={{ height: "36px" }}
        >
          {post.excerpt}
        </p>

        <span className="mt-auto pt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--fg)]/60">
          {post.industry ?? post.topic.split(",")[0].trim()}
        </span>
      </div>
    </Link>
  );
}

type SortKey = "newest" | "oldest" | "case-studies" | "articles";
const SORT_LABELS: Record<SortKey, string> = {
  newest: "Newest first",
  oldest: "Oldest first",
  "case-studies": "Case studies first",
  articles: "Articles first",
};

// Filter facets: "All", each pillar category that actually has posts, and a
// cross-cutting "Case studies" facet keyed on `kind` rather than category.
type Facet = "All" | "Case studies" | BlogCategory;

export function BlogCardGrid({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");
  const [facet, setFacet] = useState<Facet>("All");
  const q = query.trim().toLowerCase();

  // Only offer facets that have at least one post, so the bar never shows an
  // empty category. Order follows the canonical taxonomy.
  const facets = useMemo<Facet[]>(() => {
    const present = new Set(posts.map((p) => p.category));
    const cats = blogCategories.filter((c) => present.has(c));
    const hasCase = posts.some((p) => p.kind === "case-study");
    return ["All", ...(hasCase ? (["Case studies"] as Facet[]) : []), ...cats];
  }, [posts]);

  const filtered = useMemo(() => {
    const byFacet = posts.filter((p) => {
      if (facet === "All") return true;
      if (facet === "Case studies") return p.kind === "case-study";
      return p.category === facet;
    });
    const matched = q
      ? byFacet.filter((p) =>
          [p.title, p.excerpt, p.topic, p.industry ?? "", p.persona ?? ""]
            .join(" ")
            .toLowerCase()
            .includes(q)
        )
      : byFacet.slice();
    const byDate = (a: BlogPost, b: BlogPost) =>
      b.publishedAt.localeCompare(a.publishedAt);
    switch (sort) {
      case "oldest":
        return matched.sort((a, b) => a.publishedAt.localeCompare(b.publishedAt));
      case "case-studies":
        return matched.sort((a, b) => {
          if (a.kind !== b.kind) return a.kind === "case-study" ? -1 : 1;
          return byDate(a, b);
        });
      case "articles":
        return matched.sort((a, b) => {
          if (a.kind !== b.kind) return a.kind === "article" ? -1 : 1;
          return byDate(a, b);
        });
      case "newest":
      default:
        return matched.sort(byDate);
    }
  }, [posts, q, sort, facet]);

  return (
    <div>
      {/* Category facets. Clickable, keyboard-focusable, single-select. All
          posts are already in the DOM (server-rendered); these only filter the
          visible set, so the page stays crawl-safe with no URL fan-out. */}
      <div
        role="tablist"
        aria-label="Filter by category"
        className="mb-6 flex flex-wrap gap-2"
      >
        {facets.map((f) => {
          const active = facet === f;
          return (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFacet(f)}
              className={`rounded-full border px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
                active
                  ? "border-[var(--accent)] bg-[var(--accent)]/12 text-[var(--accent-text)]"
                  : "border-[var(--hairline-strong)] text-[var(--fg)]/65 hover:border-[var(--accent)] hover:text-[var(--fg)]"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-xl">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search case studies and articles"
            aria-label="Search blog posts"
            className="w-full rounded-full border border-[var(--hairline-strong)] bg-[var(--surface)]/60 px-5 py-3 pr-12 text-sm text-[var(--fg)] placeholder:text-[var(--fg)]/45 outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/25"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs text-[var(--accent-text)]"
          >
            {q ? filtered.length : "⌕"}
          </span>
        </div>

        {/* Sort control. Native <select> so keyboard + screen reader users get
            the correct interaction for free, styled to match the search pill. */}
        <label className="flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--fg)]/65">
          <span>Order</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-full border border-[var(--hairline-strong)] bg-[var(--surface)]/60 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--fg)] outline-none transition focus:border-[var(--accent)]"
          >
            {(Object.keys(SORT_LABELS) as SortKey[]).map((k) => (
              <option key={k} value={k} className="bg-[var(--bg)] text-[var(--fg)]">
                {SORT_LABELS[k]}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-[var(--fg)]/65">
          Nothing matched &quot;{query}&quot;. Try a broader term, or clear the
          search.
        </p>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {filtered.map((post) => (
            <li key={post.slug}>
              <Card post={post} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
