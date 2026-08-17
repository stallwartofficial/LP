import Link from "next/link";
import { navLinks, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--accent)]/10 px-6 py-12 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-display text-lg">{site.company}</p>
          <p className="text-sm text-[var(--fg)]/60">{site.tagline}</p>
        </div>

        <ul className="flex flex-wrap justify-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-[var(--fg)]/70 hover:text-[var(--accent)]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex gap-4">
          <a
            href={site.social.linkedin}
            className="text-sm text-[var(--fg)]/60 hover:text-[var(--accent)]"
            aria-label="Stallwart on LinkedIn"
          >
            LinkedIn
          </a>
          <a
            href={site.social.twitter}
            className="text-sm text-[var(--fg)]/60 hover:text-[var(--accent)]"
            aria-label="Stallwart on Twitter"
          >
            Twitter
          </a>
        </div>
      </div>

      <p className="mt-8 text-center text-xs text-[var(--fg)]/40">
        © {new Date().getFullYear()} {site.company}. All rights reserved.
      </p>
    </footer>
  );
}
