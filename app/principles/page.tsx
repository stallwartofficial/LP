import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Principles",
  description:
    "What Stallwart believes: reliable before scalable, honest by default, the last 80 percent is the job, you own what we build, governed not just working, and plain words.",
  path: "/principles",
});

const principles = [
  {
    n: "01",
    h: "Reliable, honest, scalable — in that order.",
    p: "Correctness comes before growth. A system that scales but drifts is worse than one that is smaller and right. We optimise for the part that has to be correct at 2am, when the person who wrote it is asleep.",
  },
  {
    n: "02",
    h: "Honest by default.",
    p: "We say no when an off-the-shelf tool already solves it or the spend can't be justified. We describe what exists, not what we hope to demo. When you ask where something stands, you get the real answer.",
  },
  {
    n: "03",
    h: "The last 80 percent is the job.",
    p: "The interesting 20 percent demos itself. The load-bearing 80 percent — validation, retries, permissions, escalation, observability, rollback — is what separates a demo from a system you can actually run. That is the work we sign up for.",
  },
  {
    n: "04",
    h: "You own what we build.",
    p: "Source, infrastructure as code, runbooks, and documentation are yours to keep. No lock-in, because a system you cannot maintain without us is not a system we would ship.",
  },
  {
    n: "05",
    h: "Governed, not just working.",
    p: "Every action a system takes is logged, reversible, and pausable. Governance and an evidence trail are part of the build, so that when a regulator, customer, or board asks how a decision was reached, there is an answer.",
  },
  {
    n: "06",
    h: "Plain words.",
    p: "We write for operators who want the mechanism, not the vocabulary. If a thing needs jargon to sound impressive, it probably isn't.",
  },
];

export default function PrinciplesPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Principles", path: "/principles" },
        ])}
      />
      <main className="px-[var(--space-gutter)] pb-[var(--space-section)] pt-32 lg:pt-40">
        <div className="mx-auto max-w-4xl">
          <p className="eyebrow">Principles</p>
          <h1 className="font-display mt-4 max-w-3xl text-display-lg font-light">
            What we believe,{" "}
            <span className="text-gold-sheen italic">before we build.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[length:var(--text-step-1)] text-[var(--fg)]/70">
            A short list, held to. It explains why our systems look the way they
            do — and why we&apos;ll occasionally talk you out of one.
          </p>

          <ol className="mt-16 space-y-12">
            {principles.map((p) => (
              <li
                key={p.n}
                className="grid gap-3 sm:grid-cols-[auto_1fr] sm:gap-8"
              >
                <span
                  aria-hidden="true"
                  className="text-gold-sheen font-display text-[2.5rem] font-light leading-none"
                >
                  {p.n}
                </span>
                <div>
                  <h2 className="font-display text-[length:var(--text-step-2)] font-light leading-tight">
                    {p.h}
                  </h2>
                  <p className="mt-3 text-[length:var(--text-step-1)] leading-relaxed text-[var(--fg)]/75">
                    {p.p}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-16 text-sm text-[var(--fg)]/60">
            The longer version is the{" "}
            <Link href="/story" className="link-draw font-medium text-[var(--accent-text)]">
              founder&apos;s story →
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
