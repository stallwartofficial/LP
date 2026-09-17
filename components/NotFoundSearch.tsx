"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/data/site";

// Search box for the 404. The site has no server-side search index, so this
// runs a site-scoped web search (honest and functional) rather than a dead
// input. Opens results in the same tab.
export function NotFoundSearch() {
  const [q, setQ] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    const host = site.domain.replace(/^https?:\/\//, "");
    const url = `https://www.google.com/search?q=${encodeURIComponent(
      `site:${host} ${query}`
    )}`;
    window.location.href = url;
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row">
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search the site…"
        aria-label="Search the site"
        className="field w-full rounded-full border border-[var(--hairline-strong)] bg-transparent px-5 py-3 outline-none transition-colors placeholder:text-[var(--placeholder-fg)] focus:border-[var(--accent)]"
      />
      <button
        type="submit"
        className="shrink-0 rounded-full border border-[var(--hairline-strong)] px-6 py-3 text-sm font-medium text-[var(--fg)] transition-colors hover:border-[var(--accent)]"
      >
        Search
      </button>
    </form>
  );
}
