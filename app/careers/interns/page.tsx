import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { CareersForm } from "@/components/CareersForm";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Social Media & Creative Intern",
  description:
    "Stallwart is looking for a Social Media & Creative Intern. Someone who notices trends, has good taste, and can turn an idea into something people actually want to see.",
  path: "/careers/interns",
});

const benefits = [
  {
    h: "Real work from day one",
    p: "Your work gets published. Not filed away in a folder called “Intern Ideas”.",
  },
  {
    h: "A real seat at the table",
    p: "You’ll work directly with the team, not through five layers of management.",
  },
  {
    h: "A stipend + internship certificate",
    p: "Because exposure doesn’t pay rent.",
  },
  {
    h: "Room to grow",
    p: "Do great work and there can be an opportunity to continue with Stallwart as we grow.",
  },
];

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
          { name: "Social Media & Creative Intern", path: "/careers/interns" },
        ])}
      />
      <main className="px-[var(--space-gutter)] pb-[var(--space-section)] pt-32 lg:pt-40">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/careers"
            className="link-draw text-sm text-[var(--fg)]/72"
          >
            &larr; Careers
          </Link>

          <p className="eyebrow mt-8">Open role &middot; Internship</p>
          <h1 className="font-display mt-4 text-display-lg font-light">
            <span className="text-gold-sheen">Social Media &amp; Creative</span>{" "}
            Intern.
          </h1>
          <p className="mt-6 text-[length:var(--text-step-2)] leading-relaxed text-[var(--fg)]/80">
            We&apos;re looking for someone who spends a little too much time on
            the internet. In a useful way.
          </p>
          <p className="mt-4 text-[length:var(--text-step-1)] leading-relaxed text-[var(--fg)]/75">
            Someone who notices trends, understands why things work, has good
            taste, and can turn an idea into something people actually want to see.
          </p>
          <p className="mt-4 text-[length:var(--text-step-1)] leading-relaxed text-[var(--fg)]/75">
            You&apos;ll help us run Stallwart&apos;s social presence, from finding
            what&apos;s worth talking about to creating the content and seeing what
            happens after we hit publish.
          </p>

          {/* About */}
          <section className="mt-16">
            <HoverHeading>Who you&apos;d be joining</HoverHeading>
            <p className="mt-5 text-[length:var(--text-step-1)] leading-relaxed text-[var(--fg)]/75">
              Stallwart is a small team building software and AI that has to hold
              up long after the demo. We&apos;re building interesting things. We
              need someone who can help tell those stories without making them
              boring.
            </p>
            <p className="mt-4 text-[length:var(--text-step-1)] leading-relaxed text-[var(--fg)]/75">
              You&apos;ll work directly with the team, get context from what
              we&apos;re actually building, and turn it into content that makes
              people stop scrolling.
            </p>
          </section>

          {/* The role */}
          <section className="mt-14">
            <HoverHeading>What you&apos;d actually do</HoverHeading>
            <p className="mt-5 text-[length:var(--text-step-1)] leading-relaxed text-[var(--fg)]/75">
              Find trends and ideas worth jumping on. Create graphics, short-form
              videos, carousels, memes and whatever else makes sense. Write hooks
              and captions. Help plan and manage our social channels. Look at
              what&apos;s working, learn from it, and try again.
            </p>
            <p className="mt-4 text-[length:var(--text-step-1)] leading-relaxed text-[var(--fg)]/75">
              You don&apos;t need to know everything. You need to notice things,
              make things, and care whether they&apos;re good.
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
              Show us what you&apos;ve{" "}
              <span className="text-gold-sheen italic">made.</span>
            </HoverHeading>
            <p className="mt-4 max-w-2xl text-[length:var(--text-step-1)] leading-relaxed text-[var(--fg)]/75">
              A post that worked, a reel you&apos;re proud of, a brand you admire
              and why. Not a cover letter. Just the thing that shows how you think.
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
