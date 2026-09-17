import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { CareersForm } from "@/components/CareersForm";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Internships",
  description:
    "A paid-attention internship at Stallwart for engineering-minded and business-minded people who build. Real ownership, real problems, a real say in what ships.",
  path: "/careers/interns",
});

const benefits = [
  {
    h: "Real work from day one",
    p: "No fetching coffee, no shadowing from the back of the room. You get a real problem and the room to solve it.",
  },
  {
    h: "You own a piece of it",
    p: "Something small but real ships with your name on it, and you stand behind it the way everyone here does.",
  },
  {
    h: "The whole team, not a handler",
    p: "You work beside the people building the thing, ask them anything, and get feedback that actually makes you better.",
  },
  {
    h: "We pay attention to you",
    p: "A real person reads your application and works with you through it. We'll be straight about the setup up front.",
  },
];

// Section heading with a gold underline that draws in on hover.
function HoverHeading({
  children,
  size = "text-display-sm",
}: {
  children: React.ReactNode;
  size?: string;
}) {
  return (
    <h2 className={`group font-display ${size} w-fit font-light`}>
      <span className="relative inline-block">
        {children}
        <span
          aria-hidden="true"
          className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100 motion-reduce:transition-none"
        />
      </span>
    </h2>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <path
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function InternsPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
          { name: "Interns", path: "/careers/interns" },
        ])}
      />
      <main className="px-[var(--space-gutter)] pb-[var(--space-section)] pt-32 lg:pt-40">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/careers"
            className="link-draw text-sm text-[var(--fg)]/72"
          >
            ← Careers
          </Link>

          <p className="eyebrow mt-8">Open role · Internship</p>
          <h1 className="font-display mt-4 text-display-lg font-light">
            <span className="text-gold-sheen">Interns</span>, in Engineering
            and Business.
          </h1>
          <p className="mt-6 text-[length:var(--text-step-2)] leading-relaxed text-[var(--fg)]/80">
            We&apos;re looking for people early in their careers who already
            build things: an engineering background, or a business graduate who
            makes things happen. If that&apos;s you, this is a real seat, not a
            spectator one.
          </p>

          {/* About */}
          <section className="mt-16">
            <HoverHeading>Who you&apos;d be joining</HoverHeading>
            <p className="mt-5 text-[length:var(--text-step-1)] leading-relaxed text-[var(--fg)]/75">
              Stallwart is a small team building software and AI that has to hold
              up long after the demo. We work from first principles and ship
              small and often, because that&apos;s the only way to end up with
              something that actually works. We stay small on purpose, which
              means an intern here isn&apos;t a rounding error. You&apos;re in
              the room.
            </p>
          </section>

          {/* The role */}
          <section className="mt-14">
            <HoverHeading>What you&apos;d actually do</HoverHeading>
            <p className="mt-5 text-[length:var(--text-step-1)] leading-relaxed text-[var(--fg)]/75">
              On the engineering side: take a real problem from first principles,
              build it, and see it through to production. On the business side:
              help us reach the people we build for, sharpen how we talk about
              the work, and move things that have been sitting still. Either way,
              you&apos;ll own something, you&apos;ll talk to whoever has the
              problem, and you&apos;ll finish what you start.
            </p>
          </section>

          {/* Benefits */}
          <section className="mt-14">
            <HoverHeading>What you get</HoverHeading>
            <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {benefits.map((b) => (
                <li key={b.h} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent-text)]"
                  >
                    <Check />
                  </span>
                  <div>
                    <h3 className="font-display text-[length:var(--text-step-1)] leading-tight">
                      {b.h}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--fg)]/70">
                      {b.p}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Apply */}
          <section id="apply" className="mt-20 scroll-mt-28">
            <HoverHeading size="text-display">
              Show us something you&apos;ve{" "}
              <span className="text-gold-sheen italic">built.</span>
            </HoverHeading>
            <p className="mt-4 max-w-2xl text-[length:var(--text-step-1)] leading-relaxed text-[var(--fg)]/75">
              Not a cover letter. Just the thing you&apos;re proud of, in your own
              words. It doesn&apos;t have to be code. That tells us more than a
              résumé ever could.
            </p>
            <div className="mt-10">
              <CareersForm />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
