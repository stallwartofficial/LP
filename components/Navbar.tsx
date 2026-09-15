"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { ThemeToggle } from "./ThemeToggle";

// Grouped nav: one direct link (What We Build) plus two dropdowns (Company,
// Resources) that mirror the footer columns, so Careers, Principles, and the
// rest are reachable again. Dropdowns open on hover and on keyboard focus
// (focus-within), no extra JS state. One primary action: Book a call.
type NavItem = { label: string; href: string };
type NavEntry = { label: string; href?: string; items?: NavItem[] };

const NAV: NavEntry[] = [
  { label: "What We Build", href: "/offer" },
  {
    label: "Company",
    items: [
      { label: "Our Story", href: "/story" },
      { label: "Principles", href: "/principles" },
      { label: "Careers", href: "/careers" },
      { label: "Partner", href: "/partner" },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Blog", href: "/blog" },
      { label: "Guides", href: "/guides" },
      { label: "Glossary", href: "/glossary" },
      { label: "FAQ", href: "/faq" },
      { label: "Trust & Security", href: "/trust" },
    ],
  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const active = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const linkCls = (href: string) =>
    `link-draw text-sm transition-colors ${
      active(href)
        ? "text-[var(--accent-text)]"
        : "text-[var(--fg)]/70 hover:text-[var(--accent-text)]"
    }`;

  return (
    <header
      className={`pointer-events-none fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
        scrolled
          ? "border-[var(--hairline)] bg-[var(--bg)]/85 shadow-[0_10px_40px_-16px_rgba(0,0,0,0.5)] backdrop-blur-xl"
          : "border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className={`pointer-events-auto flex w-full items-center justify-between gap-6 px-[var(--space-gutter)] transition-all duration-500 ${
          scrolled ? "py-3" : "py-4 sm:py-5"
        }`}
      >
        <Link href="/" className="group flex shrink-0 items-center gap-2.5" aria-label={`${site.company}, home`}>
          <Image
            src="/images/stallwart-lion-mark.png"
            alt="Stallwart lion mark"
            width={218}
            height={256}
            sizes="36px"
            priority
            draggable={false}
            className="logo-bounce h-9 w-auto"
          />
          <span className="text-lg font-medium uppercase tracking-[0.16em] font-[family-name:var(--font-wordmark)]">
            {site.company}
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-7 lg:flex">
            {NAV.map((entry) =>
              entry.items ? (
                <li key={entry.label} className="group relative">
                  <button
                    type="button"
                    className="link-draw flex items-center gap-1 text-sm text-[var(--fg)]/70 transition-colors group-hover:text-[var(--accent-text)] group-focus-within:text-[var(--accent-text)]"
                    aria-haspopup="true"
                  >
                    {entry.label}
                  </button>
                  <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <ul className="min-w-[13rem] rounded-xl border border-[var(--hairline)] bg-[var(--bg)]/95 p-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl">
                      {entry.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            aria-current={active(item.href) ? "page" : undefined}
                            className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                              active(item.href)
                                ? "bg-[var(--surface)] text-[var(--accent-text)]"
                                : "text-[var(--fg)]/75 hover:bg-[var(--surface)] hover:text-[var(--fg)]"
                            }`}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={entry.href}>
                  <Link href={entry.href!} aria-current={active(entry.href!) ? "page" : undefined} className={linkCls(entry.href!)}>
                    {entry.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          <div className="flex shrink-0 items-center gap-1.5">
            <ThemeToggle />
            <Link
              href="/contact"
              className="group relative hidden overflow-hidden rounded-full bg-[var(--fg)] px-5 py-2.5 text-sm font-medium text-[var(--bg)] sm:inline-flex"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-full bg-[var(--accent)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
              />
              <span className="relative transition-colors group-hover:text-[var(--color-ink)]">
                {site.cta.primary}
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--hairline-strong)] lg:hidden"
            >
              <span aria-hidden="true" className="relative block h-2.5 w-4">
                <span className={`absolute left-0 block h-[1.5px] w-4 bg-current transition-transform duration-300 ${menuOpen ? "top-1 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 block h-[1.5px] w-4 bg-current transition-transform duration-300 ${menuOpen ? "top-1 -rotate-45" : "top-2"}`} />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile sheet: every group expanded into sections. */}
      <div
        id="mobile-nav"
        hidden={!menuOpen}
        className="pointer-events-auto fixed inset-0 z-40 flex flex-col overflow-y-auto bg-[var(--bg)]/98 px-[var(--space-gutter)] pb-10 pt-6 backdrop-blur-2xl lg:hidden"
      >
        <div className="flex items-center justify-between">
          <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5" aria-label={`${site.company}, home`}>
            <Image src="/images/stallwart-lion-mark.png" alt="Stallwart lion mark" width={218} height={256} sizes="36px" className="logo-bounce h-9 w-auto" />
            <span className="text-lg font-medium uppercase tracking-[0.16em] font-[family-name:var(--font-wordmark)]">{site.company}</span>
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--hairline-strong)] text-[var(--fg)] transition-colors hover:border-[var(--accent)]"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" className="h-4 w-4">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="mt-10 flex flex-1 flex-col gap-8">
          {NAV.map((entry) =>
            entry.items ? (
              <div key={entry.label}>
                <p className="eyebrow">{entry.label}</p>
                <ul className="mt-3 flex flex-col gap-1">
                  {entry.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="font-display block py-1.5 text-[length:var(--text-step-2)] font-light transition-colors hover:text-[var(--accent-text)]"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <Link
                key={entry.href}
                href={entry.href!}
                onClick={() => setMenuOpen(false)}
                className="font-display block text-[length:var(--text-step-3)] font-light transition-colors hover:text-[var(--accent-text)]"
              >
                {entry.label}
              </Link>
            )
          )}
        </div>

        <Link
          href="/contact"
          onClick={() => setMenuOpen(false)}
          className="rounded-full bg-[var(--accent)] px-6 py-4 text-center font-medium text-[var(--color-ink)]"
        >
          {site.cta.primary}
        </Link>
      </div>
    </header>
  );
}
