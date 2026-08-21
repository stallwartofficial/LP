"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navLinks, site } from "@/data/site";
import { ThemeToggle } from "./ThemeToggle";

// Floating capsule nav. It detaches from the page edge on scroll and gains a
// blurred shell, so the header reads as an object over the content rather than
// a band welded to the top of it.
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Playful logo: drag the emblem anywhere and it stays for 5s, then springs
  // back, or snaps back the moment you scroll. Mouse only and disabled under
  // reduced-motion, so it never fights touch scrolling or accessibility.
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const [returning, setReturning] = useState(false);
  const [grabbing, setGrabbing] = useState(false);
  const dragRef = useRef({ active: false, moved: false, ox: 0, oy: 0 });
  const returnTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goHome = useCallback(() => {
    if (returnTimer.current) {
      clearTimeout(returnTimer.current);
      returnTimer.current = null;
    }
    setReturning(true);
    setDrag({ x: 0, y: 0 });
  }, []);

  const onLogoDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const s = dragRef.current;
    s.active = true;
    s.moved = false;
    s.ox = e.clientX - drag.x;
    s.oy = e.clientY - drag.y;
    if (returnTimer.current) clearTimeout(returnTimer.current);
    setReturning(false);
    setGrabbing(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onLogoMove = (e: React.PointerEvent) => {
    const s = dragRef.current;
    if (!s.active) return;
    const x = e.clientX - s.ox;
    const y = e.clientY - s.oy;
    if (Math.abs(x) + Math.abs(y) > 4) s.moved = true;
    setDrag({ x, y });
  };
  const onLogoUp = (e: React.PointerEvent) => {
    const s = dragRef.current;
    if (!s.active) return;
    s.active = false;
    setGrabbing(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* capture may already be released */
    }
    if (s.moved) returnTimer.current = setTimeout(goHome, 5000);
  };

  // Snap back on scroll while the logo is displaced.
  useEffect(() => {
    if ((drag.x === 0 && drag.y === 0) || returning) return;
    const onScroll = () => goHome();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [drag, returning, goHome]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    // Lock the page behind the mobile sheet.
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-[var(--space-gutter)] pt-3 sm:pt-5">
      <nav
        aria-label="Primary"
        className={`pointer-events-auto flex w-full max-w-6xl items-center justify-between gap-6 rounded-full pl-4 pr-2 transition-all duration-500 sm:pl-6 sm:pr-3 ${
          scrolled
            ? "border border-[var(--hairline)] bg-[var(--bg)]/70 py-2 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.25)] backdrop-blur-xl"
            : "border border-transparent py-3"
        }`}
      >
        <Link
          href="/"
          onClick={(e) => {
            // A real drag should not also navigate home.
            if (dragRef.current.moved) {
              e.preventDefault();
              dragRef.current.moved = false;
            }
          }}
          className="group flex shrink-0 items-center gap-2.5"
          aria-label={`${site.company}, home`}
        >
          {/* Intrinsic emblem is 143x128; width/height keep that ratio so Next
              doesn't warn about CSS changing one axis. Rendered at h-9. The
              wrapper carries the drag transform (see the playful-logo logic
              above); the Image keeps its own hover rotate. */}
          <span
            onPointerDown={onLogoDown}
            onPointerMove={onLogoMove}
            onPointerUp={onLogoUp}
            onTransitionEnd={() => setReturning(false)}
            style={{
              transform: `translate(${drag.x}px, ${drag.y}px)`,
              transition: returning
                ? "transform 0.6s cubic-bezier(0.34, 1.4, 0.5, 1)"
                : "none",
              userSelect: "none",
            }}
            className={`relative inline-flex ${
              drag.x || drag.y ? "z-[60]" : ""
            } ${grabbing ? "cursor-grabbing" : "cursor-grab"}`}
          >
            <Image
              src="/images/logo-mark.png"
              alt=""
              width={40}
              height={36}
              priority
              draggable={false}
              className="h-9 w-auto transition-transform duration-500 group-hover:rotate-[8deg]"
            />
          </span>
          <span className="font-display text-lg font-medium tracking-tight">
            {site.company}
          </span>
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`link-draw text-sm transition-colors ${
                    active
                      ? "text-[var(--accent-text)]"
                      : "text-[var(--fg)]/70 hover:text-[var(--fg)]"
                  }`}
                >
                  {link.label}
                </Link>
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
            {/* Gold wipe on hover, reads as premium without a color change. */}
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
      </nav>

      {/* Full-bleed mobile sheet, editorial list, not a cramped dropdown. The
          sheet sits above the nav bar, so it carries its own logo and a close
          button rather than relying on the (now covered) nav controls. */}
      <div
        id="mobile-nav"
        hidden={!menuOpen}
        className="pointer-events-auto fixed inset-0 z-40 flex flex-col bg-[var(--bg)]/98 px-[var(--space-gutter)] pb-10 pt-6 backdrop-blur-2xl lg:hidden"
      >
        <div className="flex items-center justify-between">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2.5"
            aria-label={`${site.company}, home`}
          >
            <Image
              src="/images/logo-mark.png"
              alt=""
              width={40}
              height={36}
              className="h-9 w-auto"
            />
            <span className="font-display text-lg font-medium tracking-tight">
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

        <ul className="mt-10 flex flex-col">
          {navLinks.map((link, i) => {
            const active = pathname === link.href;
            return (
              <li key={link.href} className="rule-b">
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className="flex items-baseline gap-4 py-5"
                >
                  <span className="w-6 shrink-0 text-xs text-[var(--accent-text)]">
                    0{i + 1}
                  </span>
                  <span
                    className={`font-display text-display-sm ${
                      active ? "text-[var(--accent-text)]" : ""
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/contact"
          onClick={() => setMenuOpen(false)}
          className="mt-auto rounded-full bg-[var(--accent)] px-6 py-4 text-center font-medium text-[var(--color-ink)]"
        >
          {site.cta.primary}
        </Link>
      </div>
    </header>
  );
}
