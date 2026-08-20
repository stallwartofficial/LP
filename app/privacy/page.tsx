import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";

// Privacy policy.
//
// TEMPLATE, NOT LEGAL ADVICE. This is a plain-language starting point derived
// from what the site actually does (a contact form posting to a webhook, a
// theme preference in localStorage, standard server logs). Covers India (DPDP
// Act), the US, and EEA/UK visitors (GDPR: legal bases, cookies, transfers,
// rights). Have counsel review before relying on it, and update the "Last
// updated" date whenever the substance changes.
const LAST_UPDATED = "August 19, 2026";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.company} collects, uses, and protects personal data.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="px-[var(--space-gutter)] pb-[var(--space-section)] pt-32 lg:pt-40">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 className="font-display mt-4 text-display-lg font-light">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-[var(--fg)]/60">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="mt-12 space-y-10 text-[length:var(--text-step-1)] leading-relaxed text-[var(--fg)]/80">
          <section>
            <p>
              This policy explains how {site.company} (&ldquo;we&rdquo;,
              &ldquo;us&rdquo;) handles personal data when you visit{" "}
              {site.domain.replace("https://", "")} or contact us. We collect the
              minimum needed to respond to you and to run the site, and we do not
              sell personal data.
            </p>
          </section>

          <section>
            <h2 className="font-display text-display-sm font-light text-[var(--fg)]">
              Information we collect
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                <strong className="font-medium text-[var(--fg)]">
                  Information you provide.
                </strong>{" "}
                When you use the contact form, we collect your name, work email,
                company, team size, area of interest, and anything you write in
                the message field.
              </li>
              <li>
                <strong className="font-medium text-[var(--fg)]">
                  Technical information.
                </strong>{" "}
                Standard server logs (IP address, browser type, pages requested)
                created automatically when any site is visited.
              </li>
              <li>
                <strong className="font-medium text-[var(--fg)]">
                  Preferences.
                </strong>{" "}
                Your light or dark theme choice is stored locally in your browser
                and never sent to us.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-display-sm font-light text-[var(--fg)]">
              How we use it
            </h2>
            <p className="mt-4">
              To respond to your inquiry, to provide and secure the site, and to
              keep records of our correspondence. For visitors in the EEA or UK,
              our legal bases under the GDPR are your consent, which you may
              withdraw at any time, and our legitimate interest in operating and
              securing the business.
            </p>
          </section>

          <section>
            <h2 className="font-display text-display-sm font-light text-[var(--fg)]">
              Cookies
            </h2>
            <p className="mt-4">
              We use no advertising or third-party analytics cookies. The only
              client-side storage is your light or dark theme preference, kept in
              your browser and never sent to us, so no cookie-consent banner is
              required.
            </p>
          </section>

          <section>
            <h2 className="font-display text-display-sm font-light text-[var(--fg)]">
              Who we share it with
            </h2>
            <p className="mt-4">
              Service providers that help us operate, such as hosting and the
              intake endpoint that receives contact-form submissions. They
              process data on our behalf under contract. We may disclose data
              where required by law. A current list of processors is available on
              request.
            </p>
          </section>

          <section>
            <h2 className="font-display text-display-sm font-light text-[var(--fg)]">
              Retention and international transfers
            </h2>
            <p className="mt-4">
              We keep inquiry data only as long as needed for the purpose above or
              as the law requires, then delete it. We operate across India and the
              United States, so your data may be processed in either location.
              Where data is transferred out of the EEA or UK, we rely on Standard
              Contractual Clauses or another lawful transfer mechanism.
            </p>
          </section>

          <section>
            <h2 className="font-display text-display-sm font-light text-[var(--fg)]">
              Your rights
            </h2>
            <p className="mt-4">
              Subject to applicable law, you may request access to, correction of,
              or deletion of your personal data, and you may withdraw consent at
              any time. If you are in the EEA or UK, you also have the right to
              restrict or object to processing, to data portability, and to lodge
              a complaint with your local supervisory authority. To exercise a
              right, email{" "}
              <a
                href={`mailto:${site.contact.email}`}
                className="link-draw text-[var(--accent-text)]"
              >
                {site.contact.email}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-display-sm font-light text-[var(--fg)]">
              Security and changes
            </h2>
            <p className="mt-4">
              We use reasonable technical and organizational measures to protect
              personal data. No method of transmission is perfectly secure. We may
              update this policy; material changes will be reflected in the date
              above.
            </p>
          </section>

          <section>
            <h2 className="font-display text-display-sm font-light text-[var(--fg)]">
              Contact
            </h2>
            <p className="mt-4">
              Questions about this policy? Email{" "}
              <a
                href={`mailto:${site.contact.email}`}
                className="link-draw text-[var(--accent-text)]"
              >
                {site.contact.email}
              </a>
              , or see our{" "}
              <Link href="/terms" className="link-draw text-[var(--accent-text)]">
                Terms of Service
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
