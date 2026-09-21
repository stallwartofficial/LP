import Link from "next/link";
import { site } from "@/data/site";
import { NotFoundSearch } from "@/components/NotFoundSearch";

// Branded 404, no dead ends: a primary CTA, a working search, and the main
// destinations as exits. Navbar/Footer come from the root layout. Responsive:
// stacks cleanly at phone width, search field goes full-width.
const EXITS = [
  { label: "What We Build", href: "/offer" },
  { label: "Case studies", href: "/blog" },
  { label: "About", href: "/story" },
  { label: "Careers", href: "/careers" },
];

export default function NotFound() {
  return (
    <section className="px-[var(--space-gutter)] pb-[var(--space-section)] pt-40 lg:pt-52">
      {/* Structured error body for agents: hidden from visual rendering,
          readable via page text extraction. */}
      <div hidden data-agent-error="true">
        <pre>{`# 404 Not Found

The requested page does not exist on ${site.company} (${site.domain}).

## ${site.company} is a custom AI engineering company, not a SaaS product or API.

If you are looking for:
- API documentation: not applicable. ${site.company} does not have a public API.
- SDK or developer tools: not applicable. ${site.company} is not a software product.
- Developer portal: not applicable. ${site.company} is a services company.
- OpenAPI spec: not applicable. No API exists.

## Valid pages

- Home: ${site.domain}
- What we build: ${site.domain}/offer
- How it works: ${site.domain}/how-it-works
- FAQ: ${site.domain}/faq
- Trust & Security: ${site.domain}/trust
- Contact: ${site.domain}/contact
- Blog: ${site.domain}/blog
- Industries: ${site.domain}/industries

## Machine-readable resources

- LLMs.txt: ${site.domain}/llms.txt
- Agent instructions: ${site.domain}/agents.md
- Agent discovery: ${site.domain}/.well-known/ard.json
- Agent skills: ${site.domain}/.well-known/agent-skills
- Sitemap: ${site.domain}/sitemap.xml
`}</pre>
      </div>

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
          The page you asked for does not exist. Search for what you need, book a
          call, or jump to one of the main pages below.
        </p>

        {/* Primary action + search */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/contact"
            className="group relative inline-flex items-center overflow-hidden rounded-full bg-[var(--fg)] px-7 py-3.5 text-sm font-medium text-[var(--bg)]"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 -translate-x-full bg-[var(--accent)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
            />
            <span className="relative transition-colors group-hover:text-[var(--color-ink)]">
              {site.cta.primary}
            </span>
          </Link>
          <Link href="/" className="link-draw text-sm font-medium text-[var(--accent-text)]">
            Back home →
          </Link>
        </div>

        <NotFoundSearch />

        <ul className="mt-12">
          {EXITS.map((link, i) => (
            <li key={link.href} className="rule-t last:rule-b">
              <Link
                href={link.href}
                className="group flex items-baseline gap-5 py-5 transition-[padding] duration-500 hover:pl-3"
              >
                <span aria-hidden="true" className="text-xs text-[var(--accent-text)]">
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
