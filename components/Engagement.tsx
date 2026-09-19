import { Reveal } from "@/components/Reveal";

// A short engagement-terms band right before the closing CTA: the three things
// that most often decide whether someone reaches out. Plain, reassuring, and
// conversion-focused. Server component. The full terms live in "How we operate"
// on the home page; this is the compressed, decision-making version.
const TERMS: { title: string; line: string }[] = [
  {
    title: "Fixed price per phase",
    line: "Approved up front, never billed by the hour. You know the cost before we start.",
  },
  {
    title: "Weeks, not months",
    line: "A committed build date, and working software you can see early, not a year-long project.",
  },
  {
    title: "You own everything",
    line: "Code, infrastructure, and data are yours to keep. No lock-in, no hostage situations.",
  },
];

export function Engagement() {
  return (
    <section aria-labelledby="engagement-heading" className="section-y rule-t px-[var(--space-gutter)]">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow">Working with us</p>
          <h2 id="engagement-heading" className="font-display mt-3 text-display-sm font-light">
            Simple terms, <span className="text-gold-sheen italic">stated up front.</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {TERMS.map((t) => (
            <Reveal key={t.title}>
              <div className="h-full rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6 transition-colors duration-300 hover:border-[var(--accent)]/45">
                <h3 className="font-display text-[length:var(--text-step-2)] font-light">{t.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--fg)]/70">{t.line}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
