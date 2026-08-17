import Link from "next/link";
import { navLinks } from "@/data/site";

// Branded 404, no dead ends: every 404 offers the full nav as an exit.
// Navbar/Footer come from the root layout, so this only owns the content.
export default function NotFound() {
  return (
    <section className="px-[var(--space-gutter)] pb-[var(--space-section)] pt-40 lg:pt-52">
      <div className="mx-auto max-w-4xl">
        <p
          aria-hidden="true"
          className="font-display text-display-2xl font-light leading-none text-[var(--accent)]/25"
        >
          404
        </p>

        <h1 className="font-display mt-4 text-display-sm font-light">
          This one fell through.
        </h1>
        <p className="mt-5 max-w-lg text-[length:var(--text-step-1)] text-[var(--fg)]/70">
          Which is ironic, given what we do about that. The page you asked for
          doesn&apos;t exist, here&apos;s everywhere that does.
        </p>

        <ul className="mt-12">
          {navLinks.map((link, i) => (
            <li key={link.href} className="rule-t last:rule-b">
              <Link
                href={link.href}
                className="group flex items-baseline gap-5 py-5 transition-[padding] duration-500 hover:pl-3"
              >
                <span
                  aria-hidden="true"
                  className="text-xs text-[var(--accent-text)]"
                >
                  0{i + 1}
                </span>
                <span className="font-display text-[length:var(--text-step-2)] font-light">
                  {link.label}
                </span>
                <span
                  aria-hidden="true"
                  className="ml-auto text-[var(--accent-text)] transition-transform duration-500 group-hover:translate-x-2"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
