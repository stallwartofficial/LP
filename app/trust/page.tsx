import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/data/site";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Trust & Security",
  description:
    "How Stallwart handles security, data, and AI governance: encryption, data ownership, human override, regional residency, and readiness for SOC 2, ISO 42001, and the EU AI Act.",
  path: "/trust",
});

const LAST_UPDATED = "August 30, 2026";

// Honest posture page. It describes practices and readiness, not certifications
// Stallwart does not hold. Where a framework is named, it is "built to map onto"
// / "audit-ready", never "certified". Subprocessors are the marketing site's
// real infrastructure.
const commitments = [
  {
    h: "Encrypted in transit and at rest",
    p: "TLS 1.2 or higher in transit, AES-256 at rest. Keys stay server-side and are never exposed to the browser.",
  },
  {
    h: "Your data stays yours",
    p: "Your data is never sold and never used to train shared or third-party models. In engagements, you own the code, the infrastructure definitions, and the documentation outright.",
  },
  {
    h: "Human override, always",
    p: "Every action a system takes is logged and reversible, and any run can be paused. Governance and rollback are part of the build, not a later phase.",
  },
  {
    h: "Regional data handling",
    p: "Where an engagement requires it, data stays resident in the region you choose, and residency-constrained and on-premise deployments are supported.",
  },
];

export default function TrustPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Trust & Security", path: "/trust" },
        ])}
      />
      <main className="px-[var(--space-gutter)] pb-[var(--space-section)] pt-32 lg:pt-40">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">Trust &amp; security</p>
          <h1 className="font-display mt-4 text-display-lg font-light">
            Built to be{" "}
            <span className="text-gold-sheen italic">audited.</span>
          </h1>
          <p className="mt-6 text-[length:var(--text-step-1)] leading-relaxed text-[var(--fg)]/75">
            The exposure with AI is rarely that it makes a mistake. It is that
            when a regulator, customer, or board member asks how a decision was
            reached, nobody can answer. Security, data ownership, and
            accountability are stated here up front — the same standard we hold
            in every system we ship.
          </p>
          <p className="mt-4 text-sm text-[var(--fg)]/50">
            Last updated: {LAST_UPDATED}
          </p>

          <div className="mt-14 space-y-12">
            <section>
              <h2 className="font-display text-display-sm font-light">
                Our commitments
              </h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {commitments.map((c) => (
                  <li
                    key={c.h}
                    className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-5"
                  >
                    <h3 className="font-display text-[length:var(--text-step-1)] leading-tight">
                      {c.h}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--fg)]/70">
                      {c.p}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-display text-display-sm font-light">
                Compliance posture
              </h2>
              <p className="mt-4 text-[length:var(--text-step-1)] leading-relaxed text-[var(--fg)]/80">
                We build systems to be <strong>audit-ready</strong> rather than
                audited after the fact. Architecture, data flow, decision
                boundaries, and evidence trails are designed to map cleanly onto
                the frameworks an audit invokes — including{" "}
                <strong>SOC 2</strong>, <strong>ISO/IEC 42001</strong>, and the{" "}
                <strong>EU AI Act</strong> — so readiness is a standing state, not
                a scramble.
              </p>
              <p className="mt-4 text-sm text-[var(--fg)]/55">
                To be precise: this describes how we design and document systems,
                not a claim to hold these certifications ourselves. Where a
                specific attestation is required for an engagement, we will tell
                you honestly where things stand.
              </p>
            </section>

            <section>
              <h2 className="font-display text-display-sm font-light">
                Reporting a vulnerability
              </h2>
              <p className="mt-4 text-[length:var(--text-step-1)] leading-relaxed text-[var(--fg)]/80">
                Found something? Email{" "}
                <a
                  href={`mailto:${site.contact.email}`}
                  className="link-draw text-[var(--accent-text)]"
                >
                  {site.contact.email}
                </a>{" "}
                with the details. We read every report from a person and respond.
                See also our{" "}
                <Link href="/privacy" className="link-draw text-[var(--accent-text)]">
                  Privacy Policy
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
