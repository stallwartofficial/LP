"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { BlogPost } from "@/data/blog";
import { getReadPosts, markPostRead } from "@/lib/prefs";

// Records that the current post has been opened, on the device only. Renders
// nothing. Mounting it on a post page is all that is needed to remember it.
export function MarkPostRead({ slug }: { slug: string }) {
  useEffect(() => {
    markPostRead(slug);
  }, [slug]);
  return null;
}

// One row of the blog index. It renders identically on the server and on first
// paint (so SSR output, SEO, and layout are untouched), then, after mount, if
// the visitor has opened this post before it is quietly de-emphasized and its
// trailing arrow becomes a check. Both are appearance-only changes (colour and
// a same-width glyph in a monospace cluster), so there is never any layout
// shift: Core Web Vitals are unaffected.
export function BlogPostRow({ post }: { post: BlogPost }) {
  const [read, setRead] = useState(false);

  useEffect(() => {
    setRead(getReadPosts().has(post.slug));
  }, [post.slug]);

  return (
    <li className="border-b border-[var(--hairline)]">
      <Link
        href={`/blog/${post.slug}`}
        className="row-nudge group grid items-baseline gap-2 py-5 sm:grid-cols-[7rem_minmax(0,1fr)_auto] sm:gap-6"
      >
        <span
          className={`font-mono text-[10px] uppercase tracking-[0.14em] ${
            post.kind === "case-study"
              ? "text-[var(--accent-text)]"
              : "text-[var(--fg)]/72"
          }`}
        >
          {post.kind === "case-study" ? "Case study" : "Article"}
        </span>

        <span className="min-w-0">
          <span
            className={`font-display block text-[length:var(--text-step-2)] leading-tight transition-colors group-hover:text-[var(--accent-text)] ${
              read ? "text-[var(--fg)]/72" : ""
            }`}
          >
            {post.title}
          </span>
          <span className="mt-1 block truncate text-sm text-[var(--fg)]/70">
            {post.excerpt}
          </span>
        </span>

        <span className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--fg)]/72">
          <span>{post.readingMinutes}m</span>
          <span
            aria-hidden="true"
            title={read ? "You have opened this before" : undefined}
            className={
              read ? "text-[var(--accent)]" : "arrow-shift text-[var(--accent-text)]"
            }
          >
            {read ? "✓" : "→"}
          </span>
        </span>
      </Link>
    </li>
  );
}
