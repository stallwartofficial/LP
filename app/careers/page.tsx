import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { Faq } from "@/components/Faq";
import { CareersForm } from "@/components/CareersForm";
import { Reveal } from "@/components/Reveal";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Careers",
  description:
    "We hire people, not résumés. Show us something you've built and shipped, and a real person reads every application. Come build software and AI that actually works.",
  path: "/careers",
});

// Thin line icons, drawn (never emoji): one stroke weight, currentColor.
function Icon({ name }: { name: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-full w-full",
  };
  switch (name) {
    case "key":
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="4" />
          <path d="M11 11l8 8M17 17l2-2M15 15l2-2" />
        </svg>
      );
    case "tag":
      return (
        <svg {...common}>
          <path d="M3 12V4h8l9 9-8 8-9-9Z" />
          <circle cx="7.5" cy="7.5" r="1.2" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <path d="M3 6h18v12H3zM3 7l9 6 9-6" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="M5 13l4 4L19 7" />
        </svg>
      );
    default:
      return null;
  }
}

// Concrete working habits, said plainly, as a conversation.
const howWeWork = [
  "You talk to the person with the problem, not a document about it. You hear it first-hand, then go build.",
  "We ship small and often. Little pieces in front of real use, so bugs show up while they're still cheap.",
  "A review is a conversation, not a gate. The newest person is allowed to question the oldest code.",
  "You own it all the way to production. Not a ticket you close and forget: a thing with your name on it.",
];

// One positive section: who fits, and what you get.
const fitsIf = [
  "you'd rather own one thing fully than touch ten halfway",
  "finishing a thing excites you more than starting it",
  "you'll say “this won't work” early instead of hiding it",
  "you're early in your career but already think in systems",
];
const countOn = [
  {
    icon: "key",
    h: "Real ownership",
    p: "One problem, yours, end to end.",
  },
  {
    icon: "tag",
    h: "Pay explained openly",
    p: "No games. We tell you how we got to the number.",
  },
  {
    icon: "clock",
    h: "Trusted with your time",
    p: "We care about the work, not the hours or the chair.",
  },
  {
    icon: "mail",
    h: "Every application answered",
    p: "A real person reads yours. You always hear back.",
  },
];

const process = [
  {
    n: "1",
    t: "A first conversation",
    meta: "30 min",
    d: "We get to know each other and check for real fit. No trick questions.",
  },
  {
    n: "2",
    t: "A real problem",
    meta: "your pace",
    d: "A small, practical exercise close to the actual work. Never free labour.",
  },
  {
    n: "3",
    t: "Meet the team",
    meta: "60 min",
    d: "You talk to the people you'd work with, and interview us just as hard.",
  },
  {
    n: "4",
    t: "An offer, plainly",
    meta: "the fun part",
    d: "If it's a yes, we explain the whole offer and give you room to decide.",
  },
];

const careersFaqs = [
  {
    question: "Do I need a degree?",
    answer:
      "No. We hire for how you think and what you've built, not the letters after your name. If you can reason about a system and finish it, we want to talk.",
  },
  {
    question: "There's no role posted for me. Can I still apply?",
    answer:
      "Yes, and this is the most common way people join us. Tell us what you build and how you build it. When the right work appears, we already know you.",
  },
  {
    question: "I'm early in my career. Is it worth trying?",
    answer:
      "It is. Titles matter less here than judgment. If you already care about the last 80 percent of a problem, experience level is not the thing that decides it.",
  },
  {
    question: "Where will I work?",
    answer:
      "We'll be straight with you about location and working setup in the very first conversation, so there are no surprises later.",
  },
  {
    question: "How long until I hear back?",
    answer:
      "We read every application ourselves, so give us a little time. But you will hear back either way. Silence is not our style.",
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
      <main className="px-[var(--space-gutter)] pb-[var(--space-section)] pt-32 lg:pt-36">
        <div className="mx-auto max-w-6xl">
          {/* ------------------------------ Hero ------------------------------ */}
          <section className="grid items-start gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
            {/* Left: the invitation. */}
            <div className="lg:pt-6">
              <p className="eyebrow">Careers</p>
              <h1 className="font-display mt-4 text-display-lg font-light">
                Come build things that{" "}
                <span className="text-gold-sheen italic">actually work.</span>
              </h1>
              <p className="mt-5 text-[length:var(--text-step-2)] leading-relaxed text-[var(--fg)]/85">
                We hire people, not résumés. We care, and we build a lot.
              </p>
              <p className="mt-5 max-w-md text-[length:var(--text-step-1)] leading-relaxed text-[var(--fg)]/70">
                Show us something you&apos;ve built and shipped. That tells us
                more than any CV, and it&apos;s how most people end up here.
                Whoever you are, a real person reads your application.
              </p>
              <p className="mt-6 text-sm text-[var(--fg)]/60">
                Want to know who you&apos;d be building with first? Read the{" "}
                <Link
                  href="/story"
                  className="link-draw font-medium text-[var(--accent-text)]"
                >
                  founder&apos;s story →
                </Link>
              </p>
              <a
                href="#apply"
                className="btn-wipe mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--fg)] px-7 py-3.5 text-sm font-medium text-[var(--bg)] lg:hidden"
              >
                Apply now <span aria-hidden="true">→</span>
              </a>
            </div>

            {/* Right: the form card. */}
            <div className="lg:sticky lg:top-28">
              <CareersForm />
            </div>
          </section>

          {/* -------------------------- Hiring timeline ----------------------- */}
          <section className="mt-28">
            <h2 className="font-display text-display-sm font-light">
              How hiring works here
            </h2>
            <p className="mt-4 max-w-2xl text-[length:var(--text-step-1)] text-[var(--fg)]/70">
              No black box. Here is exactly what happens after you reach out.
            </p>
            <ol className="relative mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              <span
                aria-hidden="true"
                className="absolute left-0 right-0 top-5 hidden h-px bg-[var(--hairline)] lg:block"
              />
              {process.map((s) => (
                <li key={s.n} className="relative">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--accent)] bg-[var(--bg)] font-mono text-sm text-[var(--accent-text)]">
                      {s.n}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--fg)]/45">
                      {s.meta}
                    </span>
                  </div>
                  <h3 className="font-display mt-5 text-[length:var(--text-step-1)] leading-tight">
                    {s.t}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--fg)]/70">
                    {s.d}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          {/* ------------------- How we actually work: talk clouds ----------- */}
          <section className="mt-28">
            <h2 className="font-display text-display-sm font-light">
              How we actually work
            </h2>
            <div className="mx-auto mt-10 max-w-2xl space-y-3">
              {howWeWork.map((line, i) => {
                const mine = i % 2 === 1;
                return (
                  <Reveal
                    key={line}
                    index={i}
                    className={`flex ${mine ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`relative max-w-md rounded-3xl border border-[var(--hairline)] bg-[var(--surface)] px-6 py-4 text-[length:var(--text-step-0)] leading-relaxed text-[var(--fg)]/85 ${
                        mine ? "rounded-br-md" : "rounded-bl-md"
                      }`}
                    >
                      {line}
                      {/* speech tail */}
                      <span
                        aria-hidden="true"
                        className={`absolute -bottom-1.5 h-3 w-3 rotate-45 border-b border-r border-[var(--hairline)] bg-[var(--surface)] ${
                          mine ? "right-6" : "left-6"
                        }`}
                      />
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </section>

          {/* --------------- Who fits + what you can count on ----------------- */}
          <section className="mt-28 grid gap-x-16 gap-y-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-display-sm font-light">
                Who fits right in
              </h2>
              <p className="mt-4 max-w-md text-[length:var(--text-step-1)] text-[var(--fg)]/70">
                We care about builders and shippers. You&apos;ll feel at home if:
              </p>
              <ul className="mt-8 space-y-4">
                {fitsIf.map((t) => (
                  <li key={t} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent-text)]"
                    >
                      <Icon name="check" />
                    </span>
                    <span className="text-[length:var(--text-step-1)] leading-relaxed text-[var(--fg)]/80">
                      {t}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-display-sm font-light">
                What you can count on
              </h2>
              <p className="mt-4 max-w-md text-[length:var(--text-step-1)] text-[var(--fg)]/70">
                Honest, from day one. No fine print.
              </p>
              <ul className="mt-8 space-y-6">
                {countOn.map((c) => (
                  <li key={c.h} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 h-6 w-6 shrink-0 text-[var(--accent-text)]"
                    >
                      <Icon name={c.icon} />
                    </span>
                    <div>
                      <h3 className="font-display text-[length:var(--text-step-1)] leading-tight">
                        {c.h}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--fg)]/70">
                        {c.p}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* ------------------------------ FAQ ------------------------------- */}
        <div className="mt-24">
          <Faq heading="Questions people actually ask" items={careersFaqs} />
        </div>
      </main>
    </>
  );
}
