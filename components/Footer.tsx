import Image from "next/image";
import Link from "next/link";
import { navLinks, site } from "@/data/site";
import { offerings } from "@/data/offerings";

// Editorial footer: the wordmark at display scale, then real columns. Also a
// genuine SEO surface, every offering is linked from every page.
export function Footer() {
  return (
    <footer className="rule-t px-[var(--space-gutter)] pb-10 pt-[var(--space-section)]">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            {/* Brand sign-off: the emblem over the wordmark. Reuses the 19KB
                navbar mark, so no extra asset weight. */}
            <Image
              src="/images/logo-mark.png"
              alt=""
              width={49}
              height={44}
              className="h-11 w-auto"
            />
            <p className="font-display text-display-sm mt-3 font-light leading-none">
              {site.company}
            </p>
            <p className="mt-3 max-w-xs text-[var(--fg)]/60">
              {site.companyDescriptor}.
            </p>
            <p className="mt-4 text-sm font-medium text-[var(--accent-text)]">
              {site.tagline}
            </p>

            {/* End-of-page action: footers are a real conversion catch-point. */}
            <Link
              href="/contact"
              className="link-draw mt-6 inline-block text-sm font-medium text-[var(--fg)]"
            >
              {site.cta.primary} →
            </Link>
          </div>

          <nav aria-label="Footer">
            <h2 className="eyebrow">Company</h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-draw text-sm text-[var(--fg)]/70 hover:text-[var(--fg)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow">What we build</h2>
            <ul className="mt-5 space-y-3">
              {offerings.map((offering) => (
                <li key={offering.slug}>
                  <Link
                    href={`/offer/${offering.slug}`}
                    className="link-draw text-sm text-[var(--fg)]/70 hover:text-[var(--fg)]"
                  >
                    {offering.name}
                    {offering.status === "in-development" && (
                      <span className="ml-1.5 text-xs text-[var(--fg)]/65">
                        (soon)
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="eyebrow mt-8">Get in touch</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="link-draw text-sm text-[var(--fg)]/70 hover:text-[var(--fg)]"
                >
                  {site.contact.email}
                </a>
              </li>
              <li className="flex gap-5">
                <a
                  href={site.social.linkedin}
                  className="group inline-flex items-center gap-2 text-sm text-[var(--fg)]/70 transition-colors hover:text-[var(--fg)]"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                  </svg>
                  LinkedIn
                </a>
                <a
                  href={site.social.twitter}
                  className="group inline-flex items-center gap-2 text-sm text-[var(--fg)]/70 transition-colors hover:text-[var(--fg)]"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.22-6.82-5.96 6.82H1.66l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.02 4.12H5.06l12.02 15.65z" />
                  </svg>
                  X
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="rule-t mt-14 flex flex-col gap-3 pt-6 text-xs text-[var(--fg)]/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.company}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href="/privacy"
              className="link-draw hover:text-[var(--fg)]"
            >
              Privacy
            </Link>
            <Link href="/terms" className="link-draw hover:text-[var(--fg)]">
              Terms
            </Link>
            <span>{site.areaServed.join(" · ")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
