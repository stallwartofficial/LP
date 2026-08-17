"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { navLinks, site } from "@/data/site";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-[var(--bg)]/80 border-b border-[var(--accent)]/15"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8"
      >
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo-mark.png"
            alt={`${site.company} logo`}
            width={36}
            height={36}
            priority
          />
          <span className="font-display text-lg tracking-wide">{site.company}</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-[var(--fg)]/80 transition-colors hover:text-[var(--accent)]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="#contact"
            className="hidden rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-medium text-[var(--color-ink)] transition-transform hover:scale-105 sm:inline-block"
          >
            {site.cta.primary}
          </Link>
        </div>
      </nav>
    </header>
  );
}
