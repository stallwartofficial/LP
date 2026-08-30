"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { offerings } from "@/data/offerings";
import { ThemeToggle } from "./ThemeToggle";

// Floating capsule nav. Fully transparent over the hero, then on scroll a solid,
// blurred, shadowed shell slides in and follows. Links group to the right in
// three dropdowns — Company, Resources, What we build — plus the Book a Call CTA.

// Short, plain, benefit-led descriptors per product (by slug).
const OFFER_BLURB: Record<string, string> = {
  "custom-ai-engineering": "We build the system your business needs",
  "extrovert-ai": "Runs your outbound, end to end",
  sillage: "Keeps your AI audit-ready",
};

type MenuItem = { label: string; href: string; blurb?: string; soon?: boolean };
type Menu = { label: string; href: string | null; items: MenuItem[] };

const menus: Menu[] = [
  {
    label: "What we build",
    href: "/offer",
    items: offerings.map((o) => ({
      label: o.name,
      href: `/offer/${o.slug}`,
      blurb: OFFER_BLURB[o.slug] ?? o.category,
      soon: o.status === "in-development",
    })),
  },
  {
    label: "Company",
    href: null,
    items: [
      { label: "Our Story", href: "/story" },
      { label: "Principles", href: "/principles" },
      { label: "Careers", href: "/careers" },
      { label: "Partner", href: "/partner" },
    ],
  },
  {
    label: "Resources",
    href: null,
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
  const [open, setOpen] = useState<string | null>(null);
  const timer = useRef<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(null);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen && !open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setOpen(null);
      }
    };
    if (menuOpen) document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, open]);

  const openNow = (label: string) => {
    if (timer.current) window.clearTimeout(timer.current);
    setOpen(label);
  };
  const closeSoon = () => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(null), 120);
  };

  const isActive = (m: Menu) =>
    m.items.some(
      (it) => pathname === it.href || pathname.startsWith(`${it.href}/`)
    );

  const triggerClass = (active: boolean) =>
    `link-draw text-sm transition-colors ${
      active
        ? "text-[var(--accent-text)]"
        : "text-[var(--fg)]/70 hover:text-[var(--fg)]"
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
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label={`${site.company}, home`}
        >
          <Image
            src="/images/logo-lion.png"
            alt=""
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

        {/* Right cluster: three dropdowns + the CTA. */}
        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-7 lg:flex">
            {menus.map((m) => {
              const active = isActive(m);
              const isOpen = open === m.label;
              return (
                <li
                  key={m.label}
                  className="relative"
                  onMouseEnter={() => openNow(m.label)}
                  onMouseLeave={closeSoon}
                >
                  {m.href ? (
                    <Link
                      href={m.href}
                      onFocus={() => openNow(m.label)}
                      aria-current={active ? "page" : undefined}
                      className={triggerClass(active)}
                    >
                      {m.label}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      onFocus={() => openNow(m.label)}
                      onClick={() => setOpen(isOpen ? null : m.label)}
                      className={triggerClass(active)}
                    >
                      {m.label}
                    </button>
                  )}

                  {/* Dropdown panel */}
                  <div
                    className={`absolute top-full pt-3 transition-all duration-200 ${
                      m.label === "What we build"
                        ? "left-0"
                        : "left-1/2 -translate-x-1/2"
                    } ${
                      isOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-1 opacity-0"
                    }`}
                  >
                    <div
                      className={`overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--bg)]/90 p-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl ${
                        m.label === "What we build"
                          ? "w-[21rem]"
                          : "min-w-[12rem]"
                      }`}
                    >
                      {m.items.map((it) =>
                        it.blurb ? (
                          <Link
                            key={it.href}
                            href={it.href}
                            onClick={() => setOpen(null)}
                            className="group flex flex-col rounded-xl px-3.5 py-3 transition-colors hover:bg-[var(--surface)]"
                          >
                            <span className="flex items-center gap-2">
                              <span className="font-display text-[15px] font-light leading-none transition-colors group-hover:text-[var(--accent-text)]">
                                {it.label}
                              </span>
                              {it.soon && (
                                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--fg)]/45">
                                  soon
                                </span>
                              )}
                            </span>
                            <span className="mt-1 text-xs text-[var(--fg)]/55">
                              {it.blurb}
                            </span>
                          </Link>
                        ) : (
                          <Link
                            key={it.href}
                            href={it.href}
                            onClick={() => setOpen(null)}
                            className="block rounded-xl px-3.5 py-2.5 text-sm text-[var(--fg)]/75 transition-colors hover:bg-[var(--surface)] hover:text-[var(--fg)]"
                          >
                            {it.label}
                          </Link>
                        )
                      )}
                      {m.href && (
                        <Link
                          href={m.href}
                          onClick={() => setOpen(null)}
                          className="mt-1 flex items-center gap-1.5 border-t border-[var(--hairline)] px-3.5 py-3 text-xs font-medium text-[var(--accent-text)]"
                        >
                          See everything we build
                          <span aria-hidden="true" className="arrow-shift">
                            →
                          </span>
                        </Link>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
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
                <span
                  className={`absolute left-0 block h-[1.5px] w-4 bg-current transition-transform duration-300 ${
                    menuOpen ? "top-1 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-[1.5px] w-4 bg-current transition-transform duration-300 ${
                    menuOpen ? "top-1 -rotate-45" : "top-2"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Full-bleed mobile sheet: the three groups as sections. */}
      <div
        id="mobile-nav"
        hidden={!menuOpen}
        className="pointer-events-auto fixed inset-0 z-40 flex flex-col overflow-y-auto bg-[var(--bg)]/98 px-[var(--space-gutter)] pb-10 pt-6 backdrop-blur-2xl lg:hidden"
      >
        <div className="flex items-center justify-between">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2.5"
            aria-label={`${site.company}, home`}
          >
            <Image
              src="/images/logo-lion.png"
              alt=""
              width={218}
              height={256}
              sizes="36px"
              className="logo-bounce h-9 w-auto"
            />
            <span className="text-lg font-medium uppercase tracking-[0.16em] font-[family-name:var(--font-wordmark)]">
              {site.company}
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--hairline-strong)] text-[var(--fg)] transition-colors hover:border-[var(--accent)]"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              className="h-4 w-4"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="mt-10 flex flex-col gap-9">
          {menus.map((m) => (
            <section key={m.label}>
              {m.href ? (
                <Link
                  href={m.href}
                  onClick={() => setMenuOpen(false)}
                  className="eyebrow"
                >
                  {m.label}
                </Link>
              ) : (
                <p className="eyebrow">{m.label}</p>
              )}
              <ul className="mt-4 flex flex-col gap-1">
                {m.items.map((it) => (
                  <li key={it.href}>
                    <Link
                      href={it.href}
                      onClick={() => setMenuOpen(false)}
                      className="font-display flex items-center gap-2 py-1.5 text-[length:var(--text-step-2)] font-light"
                    >
                      {it.label}
                      {it.soon && (
                        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--fg)]/45">
                          soon
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <Link
          href="/contact"
          onClick={() => setMenuOpen(false)}
          className="mt-10 rounded-full bg-[var(--accent)] px-6 py-4 text-center font-medium text-[var(--color-ink)]"
        >
          {site.cta.primary}
        </Link>
      </div>
    </header>
  );
}
