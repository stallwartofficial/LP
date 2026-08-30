import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/data/site";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Careers",
  description:
    "Stallwart hires rarely and deliberately: engineers who care about the last 80 percent, honesty, and systems that hold in production. Open applications welcome.",
  path: "/careers",
});

const traits = [
  {
    h: "You finish the last 80 percent",
    p: "The demo is the easy part. You care about validation, retries, permissions, observability, and what happens at 2am — the work that makes a system real.",
  },
  {
    h: "You're honest before you're impressive",
    p: "You'd rather say “this won't work” early than ship something that looks good and breaks under real data. You explain the mechanism, not the vocabulary.",
  },
  {
    h: "You own outcomes, not tickets",
    p: "You take a problem from first principles, decide what a system must never do, and stand behind what you build long after it ships.",
  },
];

export default function CareersPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
        ])}
      />
      <main className="px-[var(--space-gutter)] pb-[var(--space-section)] pt-32 lg:pt-40">
        <div className="mx-auto max-w-4xl">
          <p className="eyebrow">Careers</p>
          <h1 className="font-display mt-4 max-w-3xl text-display-lg font-light">
            We hire rarely, and{" "}
            <span className="text-gold-sheen italic">deliberately.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[length:var(--text-step-1)] text-[var(--fg)]/70">
            Stallwart is small and senior by design. We&apos;d rather stay that
            way and add one exceptional engineer than grow for the headcount. If
            you build systems that hold in production, we want to know you — even
            when nothing is formally open.
          </p>

          <section className="mt-16">
            <h2 className="font-display text-display-sm font-light">
              What we look for
            </h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-3">
              {traits.map((t) => (
                <li
                  key={t.h}
                  className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-5"
                >
                  <h3 className="font-display text-[length:var(--text-step-1)] leading-tight">
                    {t.h}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--fg)]/70">
                    {t.p}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-16 rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-8">
            <h2 className="font-display text-display-sm font-light">
              Open roles
            </h2>
            <p className="mt-4 max-w-2xl text-[length:var(--text-step-1)] leading-relaxed text-[var(--fg)]/75">
              No formal openings right now — but this page is never really closed.
              If the work above sounds like how you already operate, send a note
              with what you&apos;ve built and why it stayed correct once real work
              hit it. We read every one from a person.
            </p>
            <a
              href={`mailto:${site.contact.email}?subject=Open%20application%20%E2%80%94%20Careers`}
              className="btn-wipe mt-7 inline-block rounded-full bg-[var(--fg)] px-7 py-3.5 text-sm font-medium text-[var(--bg)]"
            >
              Send an open application →
            </a>
          </section>

          <p className="mt-12 text-sm text-[var(--fg)]/60">
            Curious who you&apos;d be working with? Read the{" "}
            <Link href="/story" className="link-draw font-medium text-[var(--accent-text)]">
              founder&apos;s story →
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
