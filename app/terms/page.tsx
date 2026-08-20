import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";

// Terms of service.
//
// TEMPLATE, NOT LEGAL ADVICE. Plain-language starting point for an informational
// marketing site. Governing law is stated as Delaware, USA (the primary market);
// engagements are governed by separate signed agreements, not this page. Have
// counsel review before relying on it, and update "Last updated" on any change.
const LAST_UPDATED = "August 19, 2026";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that govern use of the ${site.company} website.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="px-[var(--space-gutter)] pb-[var(--space-section)] pt-32 lg:pt-40">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 className="font-display mt-4 text-display-lg font-light">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-[var(--fg)]/60">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="mt-12 space-y-10 text-[length:var(--text-step-1)] leading-relaxed text-[var(--fg)]/80">
          <section>
            <p>
              These terms govern your use of the {site.company} website. By using
              the site you agree to them. If you do not agree, please do not use
              the site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-display-sm font-light text-[var(--fg)]">
              Use of the site
            </h2>
            <p className="mt-4">
              You may view and use the site for lawful, informational purposes.
              You agree not to misuse it, interfere with its operation, attempt to
              access it by unauthorized means, or use it to infringe the rights of
              others.
            </p>
          </section>

          <section>
            <h2 className="font-display text-display-sm font-light text-[var(--fg)]">
              Intellectual property
            </h2>
            <p className="mt-4">
              The site&apos;s content, design, wordmark, and logo are owned by
              {" "}
              {site.company} or its licensors and are protected by law. You may
              not copy, reproduce, or create derivative works from them without
              our written permission.
            </p>
          </section>

          <section>
            <h2 className="font-display text-display-sm font-light text-[var(--fg)]">
              Services and engagements
            </h2>
            <p className="mt-4">
              The site describes our offerings for information only and is not an
              offer or a binding proposal. Any engagement is governed by a
              separate written agreement between you and {site.company}; where
              that agreement conflicts with these terms, the agreement controls.
            </p>
          </section>

          <section>
            <h2 className="font-display text-display-sm font-light text-[var(--fg)]">
              No warranty
            </h2>
            <p className="mt-4">
              The site is provided &ldquo;as is&rdquo; without warranties of any
              kind. We do not guarantee that it will be uninterrupted,
              error-free, or that the information on it is complete or current.
            </p>
          </section>

          <section>
            <h2 className="font-display text-display-sm font-light text-[var(--fg)]">
              Limitation of liability
            </h2>
            <p className="mt-4">
              To the fullest extent permitted by law, {site.company} is not liable
              for any indirect, incidental, or consequential loss arising from
              your use of the site. Third-party links are provided for convenience
              and we are not responsible for their content.
            </p>
          </section>

          <section>
            <h2 className="font-display text-display-sm font-light text-[var(--fg)]">
              Governing law and changes
            </h2>
            <p className="mt-4">
              These terms are governed by the laws of the State of Delaware,
              United States, without regard to conflict-of-law rules. We may
              update these terms, and material changes will be reflected in the
              date above.
            </p>
          </section>

          <section>
            <h2 className="font-display text-display-sm font-light text-[var(--fg)]">
              Contact
            </h2>
            <p className="mt-4">
              Questions about these terms? Email{" "}
              <a
                href={`mailto:${site.contact.email}`}
                className="link-draw text-[var(--accent-text)]"
              >
                {site.contact.email}
              </a>
              , or read our{" "}
              <Link
                href="/privacy"
                className="link-draw text-[var(--accent-text)]"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
