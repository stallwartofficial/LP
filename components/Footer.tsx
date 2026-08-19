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
            <p className="font-display text-display-sm mt-4 font-light leading-none">
              {site.company}
            </p>
            <p className="mt-4 max-w-xs text-[var(--fg)]/60">
              {site.companyDescriptor}.
            </p>
            <p className="mt-6 text-sm font-medium text-[var(--accent-text)]">
              {site.tagline}
            </p>
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
              <li className="flex gap-4">
                <a
                  href={site.social.linkedin}
                  className="link-draw text-sm text-[var(--fg)]/70 hover:text-[var(--fg)]"
                >
                  LinkedIn
                </a>
                <a
                  href={site.social.twitter}
                  className="link-draw text-sm text-[var(--fg)]/70 hover:text-[var(--fg)]"
                >
                  X
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="rule-t mt-14 flex flex-col gap-2 pt-6 text-xs text-[var(--fg)]/65 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.company}. All rights reserved.
          </p>
          <p>{site.areaServed.join(" · ")}</p>
        </div>
      </div>
    </footer>
  );
}
