"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import type { BlogPost, BlogCategory } from "@/data/blog";
import { blogCategories } from "@/data/blog";
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

// Generative per-post covers. Every card without a bespoke diagram gets a
// graphic that is UNIQUE to the post (seeded by its slug) but whose shape
// family is set by the pillar category, so a card still reads as its pillar
// while no two cards look alike. Deterministic (pure function of the slug) so
// server and client render identically. Same gold-line idiom as the diagrams.
const cs = "var(--accent)";
const cm = "color-mix(in oklab, var(--accent) 55%, transparent)";
const cf = "color-mix(in oklab, var(--fg) 24%, transparent)";
const coverSvg = (children: ReactNode) => (
  <svg viewBox="0 0 240 120" fill="none" className="h-full w-full" aria-hidden="true">
    {children}
  </svg>
);

// FNV-1a hash of the slug, then a small deterministic PRNG (mulberry32).
function seededRng(slug: string) {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  let a = h >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rint = (r: () => number, lo: number, hi: number) =>
  lo + Math.floor(r() * (hi - lo + 1));

type Gen = (r: () => number) => ReactNode;

// Agents & Automation: a root node branching to a seeded number of leaves,
// some of which branch again. Reads as an orchestration tree.
const genAgents: Gen = (r) => {
  const leaves = rint(r, 3, 5);
  const xs = 150 + Math.floor(r() * 30);
  return (
    <>
      {Array.from({ length: leaves }).map((_, i) => {
        const y = 22 + ((96 - 22) * i) / (leaves - 1) + (r() * 10 - 5);
        return <path key={i} d={`M60 60C110 60 ${xs - 40} ${y} ${xs} ${y}`} stroke={cf} />;
      })}
      {Array.from({ length: leaves }).map((_, i) => {
        const y = 22 + ((96 - 22) * i) / (leaves - 1) + (r() * 10 - 5);
        return <rect key={i} x={xs} y={y - 9} width="26" height="18" rx="4" stroke={i === leaves - 1 ? cs : cf} />;
      })}
      <circle cx="48" cy="60" r="12" stroke={cs} />
      <circle cx="48" cy="60" r="3.5" fill={cs} />
    </>
  );
};

// Infrastructure & RAG: a central core with a seeded number of spokes to
// satellite stores at varied angles and radii.
const genInfra: Gen = (r) => {
  const spokes = rint(r, 4, 6);
  const nodes = Array.from({ length: spokes }).map((_, i) => {
    const a = (i / spokes) * Math.PI * 2 + r() * 0.5;
    const rad = 34 + r() * 16;
    return { x: 120 + Math.cos(a) * rad * 1.5, y: 60 + Math.sin(a) * rad };
  });
  return (
    <>
      {nodes.map((n, i) => (
        <path key={`l${i}`} d={`M120 60L${n.x} ${n.y}`} stroke={cf} />
      ))}
      {nodes.map((n, i) => (
        <circle key={`n${i}`} cx={n.x} cy={n.y} r={4 + r() * 2} stroke={i % 3 === 0 ? cs : cf} />
      ))}
      <rect x="104" y="48" width="32" height="24" rx="6" stroke={cs} />
      <circle cx="120" cy="60" r="2.5" fill={cs} />
    </>
  );
};

// Production Engineering: a seeded telemetry signal over a baseline, with
// checkpoint nodes. Reads as observability / a running system.
const genProduction: Gen = (r) => {
  const pts = 7 + rint(r, 0, 2);
  let d = "";
  const coords: { x: number; y: number }[] = [];
  for (let i = 0; i < pts; i++) {
    const x = 24 + (192 * i) / (pts - 1);
    const y = 40 + r() * 40;
    coords.push({ x, y });
    d += `${i === 0 ? "M" : "L"}${x.toFixed(0)} ${y.toFixed(0)}`;
  }
  return (
    <>
      <path d="M24 92h192" stroke={cf} />
      <path d={d} stroke={cs} />
      {coords.filter((_, i) => i % 2 === 0).map((c, i) => (
        <circle key={i} cx={c.x} cy={c.y} r="3" fill={cm} />
      ))}
    </>
  );
};

// Governance & Compliance: a shield holding a seeded stack of audit records,
// with a check. Reads as evidence / an auditable system.
const genGovernance: Gen = (r) => {
  const rows = rint(r, 3, 4);
  return (
    <>
      <path d="M120 22l38 13v24c0 27-18 38-38 47-20-9-38-20-38-47V35l38-13Z" stroke={cf} />
      {Array.from({ length: rows }).map((_, i) => {
        const w = 30 + r() * 26;
        return <rect key={i} x={120 - w / 2} y={44 + i * 12} width={w} height="5" rx="2.5" fill={i === 0 ? cm : cf} />;
      })}
      <path d="M108 62l9 9 16-18" stroke={cs} />
    </>
  );
};

// Commercial: a seeded bar series with a trend line over it. Reads as a
// decision / an economics view.
const genCommercial: Gen = (r) => {
  const n = 5 + rint(r, 0, 2);
  const bars = Array.from({ length: n }).map((_, i) => {
    const x = 28 + (184 * i) / (n - 1);
    const h = 14 + r() * 46;
    return { x, h };
  });
  const line = bars.map((b, i) => `${i === 0 ? "M" : "L"}${b.x.toFixed(0)} ${(92 - b.h - 6).toFixed(0)}`).join("");
  return (
    <>
      {bars.map((b, i) => (
        <rect key={i} x={b.x - 6} y={92 - b.h} width="12" height={b.h} rx="2" stroke={i === n - 1 ? cs : cf} />
      ))}
      <path d={line} stroke={cm} />
    </>
  );
};

// Matrix of vectors with a seeded few lit. */
const genMatrix: Gen = (r) => {
  const cols = 8;
  const rows = 5;
  return (
    <>
      {Array.from({ length: cols }).map((_, c) =>
        Array.from({ length: rows }).map((_, ry) => {
          const lit = r() > 0.82;
          return (
            <circle
              key={`${c}-${ry}`}
              cx={30 + c * 26}
              cy={20 + ry * 20}
              r={lit ? 3.5 : 2}
              stroke={lit ? cs : cf}
              fill={lit ? cm : "none"}
            />
          );
        }),
      )}
    </>
  );
};

// Offset layered cards climbing up-right. */
const genLayers: Gen = (r) => {
  const n = rint(r, 3, 4);
  return (
    <>
      {Array.from({ length: n }).map((_, i) => (
        <rect
          key={i}
          x={60 + i * 26}
          y={78 - i * 18}
          width="80"
          height="40"
          rx="8"
          stroke={i === n - 1 ? cs : cf}
        />
      ))}
    </>
  );
};

// Concentric orbits with a seeded satellite. */
const genOrbit: Gen = (r) => {
  const rings = rint(r, 2, 3);
  const a = r() * Math.PI * 2;
  const orbitR = 26 + rings * 8;
  return (
    <>
      {Array.from({ length: rings }).map((_, i) => (
        <circle key={i} cx="120" cy="60" r={18 + i * 14} stroke={cf} />
      ))}
      <circle cx="120" cy="60" r="4" fill={cs} />
      <circle cx={120 + Math.cos(a) * orbitR} cy={60 + Math.sin(a) * orbitR * 0.7} r="5" stroke={cs} />
      <circle cx={120 + Math.cos(a + 2) * (orbitR - 14)} cy={60 + Math.sin(a + 2) * (orbitR - 14) * 0.7} r="3.5" stroke={cm} />
    </>
  );
};

// Left-to-right flow of nodes with arrow links. */
const genFlow: Gen = (r) => {
  const n = rint(r, 3, 4);
  const ys = Array.from({ length: n }).map(() => 44 + r() * 32);
  const xs = Array.from({ length: n }).map((_, i) => 40 + (160 * i) / (n - 1));
  return (
    <>
      {xs.slice(0, -1).map((x, i) => (
        <path key={i} d={`M${x + 10} ${ys[i]}L${xs[i + 1] - 10} ${ys[i + 1]}`} stroke={cf} />
      ))}
      {xs.map((x, i) => (
        <rect key={`r${i}`} x={x - 12} y={ys[i] - 11} width="24" height="22" rx="5" stroke={i === n - 1 ? cs : cf} />
      ))}
    </>
  );
};

// Scattered constellation with a connecting spine. */
const genConstellation: Gen = (r) => {
  const n = rint(r, 5, 7);
  const pts = Array.from({ length: n }).map(() => ({ x: 30 + r() * 180, y: 20 + r() * 80 }));
  return (
    <>
      {pts.slice(0, -1).map((p, i) => (
        <path key={i} d={`M${p.x.toFixed(0)} ${p.y.toFixed(0)}L${pts[i + 1].x.toFixed(0)} ${pts[i + 1].y.toFixed(0)}`} stroke={cf} />
      ))}
      {pts.map((p, i) => (
        <circle key={`c${i}`} cx={p.x} cy={p.y} r={i % 3 === 0 ? 4 : 2.5} stroke={i % 3 === 0 ? cs : cf} />
      ))}
    </>
  );
};

// Overlapping sine waves. */
const genWave: Gen = (r) => {
  const mk = (amp: number, phase: number, stroke: string) => {
    let d = "M12 60";
    for (let x = 12; x <= 228; x += 6) {
      const y = 60 + Math.sin((x / 30) + phase) * amp;
      d += `L${x} ${y.toFixed(1)}`;
    }
    return <path d={d} stroke={stroke} />;
  };
  return (
    <>
      {mk(14 + r() * 10, r() * 6, cf)}
      {mk(22 + r() * 12, r() * 6, cs)}
    </>
  );
};

// Nested concentric rounded rectangles. */
const genNested: Gen = (r) => {
  const n = rint(r, 3, 4);
  const off = 12 + Math.floor(r() * 6);
  return (
    <>
      {Array.from({ length: n }).map((_, i) => (
        <rect
          key={i}
          x={40 + i * off}
          y={20 + i * (off * 0.7)}
          width={160 - i * off * 2}
          height={80 - i * off * 1.4}
          rx="10"
          stroke={i === n - 1 ? cs : cf}
        />
      ))}
    </>
  );
};

// The full archetype pool. Each post is assigned one by a hash of its slug so
// covers vary card-to-card, with the internals seeded for extra variation.
const ARCHETYPES: Gen[] = [
  genAgents,
  genInfra,
  genProduction,
  genGovernance,
  genCommercial,
  genMatrix,
  genLayers,
  genOrbit,
  genFlow,
  genConstellation,
  genWave,
  genNested,
];

// A second, independent hash so the archetype pick does not correlate with the
// PRNG stream used for the internals.
function pickHash(slug: string) {
  let h = 5381;
  for (let i = 0; i < slug.length; i++) h = (Math.imul(h, 33) + slug.charCodeAt(i)) | 0;
  return h >>> 0;
}

function coverFor(post: BlogPost): ReactNode {
  const gen = ARCHETYPES[pickHash(post.slug) % ARCHETYPES.length];
  return coverSvg(gen(seededRng(post.slug)));
}

function CardTopPanel({ post }: { post: BlogPost }) {
  const cover = coverFor(post);

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
        // Posts without a bespoke diagram get an on-brand category cover, so
        // every card carries a graphic. The category label sits at the corner.
        <>
          <div className="absolute inset-0 flex items-center justify-center px-6 py-4 opacity-90">
            {cover}
          </div>
          <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg)]/55">
            {post.category ?? "Commercial"}
          </span>
        </>
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
  const [sort, setSort] = useState<SortKey>("newest");
  const [facet, setFacet] = useState<Facet>("All");

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
    const matched = byFacet.slice();
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
  }, [posts, sort, facet]);

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

      <div className="mb-10 flex justify-end">
        {/* Sort control. Native <select> so keyboard + screen reader users get
            the correct interaction for free. */}
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
          Nothing in this category yet.
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
