"use client";

import { useState } from "react";
import type { FaqCategory } from "@/data/faqs";

export function FaqSearch({ categories }: { categories: FaqCategory[] }) {
  const [query, setQuery] = useState("");
  const q = query.toLowerCase().trim();

  const filtered = q
    ? categories
        .map((cat) => ({
          ...cat,
          items: cat.items.filter(
            (f) =>
              f.question.toLowerCase().includes(q) ||
              f.answer.toLowerCase().includes(q)
          ),
        }))
        .filter((cat) => cat.items.length > 0)
    : categories;

  const totalShown = filtered.reduce((n, c) => n + c.items.length, 0);

  return (
    <>
      {/* Search bar */}
      <div className="relative mt-10">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--fg)]/40">
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search questions..."
          className="w-full rounded-2xl border border-[var(--hairline-strong)] bg-[var(--bg)] py-3.5 pl-12 pr-4 text-[length:var(--text-step-0)] text-[var(--fg)] outline-none transition-colors placeholder:text-[var(--fg)]/40 focus:border-[var(--accent)]"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[var(--fg)]/50 hover:text-[var(--fg)]/80"
            aria-label="Clear search"
          >
            Clear
          </button>
        )}
      </div>

      {q && (
        <p className="mt-4 text-right font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--fg)]/50">
          {String(totalShown).padStart(2, "0")} result{totalShown !== 1 ? "s" : ""}
        </p>
      )}

      {/* Results */}
      {totalShown === 0 ? (
        <div className="mt-12 text-center">
          <p className="font-display text-[length:var(--text-step-2)] font-light text-[var(--fg)]/70">
            Oops, we don&apos;t have an answer for that yet.
          </p>
          <p className="mt-4 text-[length:var(--text-step-0)] text-[var(--fg)]/55">
            Book a call and we&apos;ll answer it directly.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/contact"
              className="group relative inline-flex items-center overflow-hidden rounded-full bg-[var(--fg)] px-7 py-3.5 text-sm font-medium text-[var(--bg)]"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-full bg-[var(--accent)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
              />
              <span className="relative transition-colors group-hover:text-[var(--color-ink)]">
                Book a call
              </span>
            </a>
            <a
              href="mailto:contact@stallwart.in"
              className="link-draw text-sm font-medium text-[var(--accent-text)]"
            >
              contact@stallwart.in
            </a>
          </div>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="link-draw mt-6 text-sm text-[var(--fg)]/50"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="mt-8 space-y-14">
          {filtered.map((cat) => (
            <section key={cat.slug}>
              <h2 className="font-display text-[length:var(--text-step-2)] font-light">
                {cat.title}
              </h2>
              <dl className="mt-6 border-t border-[var(--hairline)]">
                {cat.items.map((f, i) => (
                  <div
                    key={f.question}
                    className="row-nudge grid gap-x-10 gap-y-2 border-b border-[var(--hairline)] py-6 sm:grid-cols-[minmax(0,19rem)_minmax(0,1fr)]"
                  >
                    <dt className="flex items-baseline gap-3 font-display text-[length:var(--text-step-1)] leading-snug">
                      <span
                        aria-hidden="true"
                        className="font-mono text-[10px] tracking-[0.2em] text-[var(--accent-text)]"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {f.question}
                    </dt>
                    <dd className="text-sm leading-relaxed text-[var(--fg)]/70">
                      {f.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      )}
    </>
  );
}
