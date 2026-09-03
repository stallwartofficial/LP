import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Glossary",
  description:
    "Plain-English definitions of the terms behind production AI and go-to-market: AI SDR, AI governance, SOC 2, ISO 42001, EU AI Act, observability, AEO, and more.",
  path: "/glossary",
});

// Plain, honest definitions. Answer-engine friendly: term + a self-contained,
// quotable sentence. Kept in the site voice — the mechanism, not the vocabulary.
const terms = [
  {
    term: "AI SDR",
    def: "An AI system that does a sales-development rep's job end to end (researching the account, finding the angle, writing and sending outreach, and following up) rather than a tool a human rep operates.",
  },
  {
    term: "AI GTM engine",
    def: "An autonomous go-to-market system that runs outbound from first contact to booked meeting, so the motion no longer depends on a person working each account by hand.",
  },
  {
    term: "AI governance",
    def: "The controls, records, and evidence that let an organization account for how an AI system decides and behaves, so that when a regulator, customer, or board asks, there is an answer.",
  },
  {
    term: "Production-grade AI",
    def: "An AI system engineered to run unattended under real data, real volume, and real edge cases, with observability and rollback built in, the opposite of a demo that works once.",
  },
  {
    term: "The last 80 percent",
    def: "The load-bearing work a prototype skips: validation, retries, permissions, escalation paths, observability, and rollback. It is where most enterprise AI fails to reach production.",
  },
  {
    term: "Observability",
    def: "The ability to see what a system is actually doing in production (its inputs, decisions, failures, and rollbacks) as they happen, rather than reconstructing them after an incident.",
  },
  {
    term: "Human override",
    def: "A guarantee that every action an AI system takes is logged, reversible, and pausable by a person at any time.",
  },
  {
    term: "SOC 2",
    def: "An auditing standard for how a company manages customer data across five trust criteria: security, availability, processing integrity, confidentiality, and privacy.",
  },
  {
    term: "ISO/IEC 42001",
    def: "The international standard for an AI management system: how an organization governs the AI it builds and operates, from risk to accountability.",
  },
  {
    term: "EU AI Act",
    def: "The European Union's regulation that classifies AI systems by risk and attaches obligations that scale with that risk, from transparency duties to strict requirements for high-risk uses.",
  },
  {
    term: "AEO (Answer Engine Optimization)",
    def: "Writing and structuring content so AI answer engines can quote it accurately, a superset of SEO, aimed at machines that summarize rather than just rank.",
  },
  {
    term: "White-label partnership",
    def: "An arrangement where a partner sells a provider's product under their own brand while the provider powers the technology invisibly; the product and the customer relationship stay the partner's.",
  },
  {
    term: "SEO (Search Engine Optimization)",
    def: "The practice of writing and structuring content so search engines rank it for the queries a target reader actually types. Answers the question: can we be found in a list of ten blue links.",
  },
  {
    term: "GEO (Generative Engine Optimization)",
    def: "The practice of writing content so generative search surfaces (Google AI Overviews, Perplexity, ChatGPT search) select and quote it in their generated answers, rather than the older goal of ranking in a link list.",
  },
  {
    term: "Grounding",
    def: "Anchoring a model's output in specific source material, retrieved documents, structured data, or verifiable facts, so the response can be audited against the source rather than trusted on its confidence alone.",
  },
  {
    term: "Retrieval Augmented Generation (RAG)",
    def: "A pattern where a model is given relevant documents retrieved from a knowledge base at query time, so its answer is grounded in that material instead of only its trained weights.",
  },
  {
    term: "Prompt injection",
    def: "An adversarial input that tricks a model into ignoring its original instructions and following the attacker's instead. A core threat model for any AI system that reads untrusted content.",
  },
  {
    term: "Guardrail",
    def: "A runtime control that constrains what an AI system is allowed to say or do. Unlike a policy document, a guardrail intervenes at the moment of the decision.",
  },
  {
    term: "Evaluation harness",
    def: "The tests an AI system is graded against continuously, not once. Catches regressions when a prompt, model, or dependency changes.",
  },
  {
    term: "Model drift",
    def: "Slow degradation in a model's outputs over time as the world it sees shifts away from the world it was trained on. Detected by continuous evaluation, not by intuition.",
  },
  {
    term: "Deliverability",
    def: "The share of sent outbound email that lands in the recipient's primary inbox instead of promotions or spam. A function of sender reputation, authentication, and relevance to the recipient.",
  },
  {
    term: "Domain warmup",
    def: "The gradual ramp of sending volume on a fresh sending domain, so inbox providers build trust in it before real campaigns run. Skipping it burns the domain.",
  },
  {
    term: "Reply rate",
    def: "The percentage of sent outbound messages that receive any reply. A blunt measure of relevance; positive reply rate is the sharper one.",
  },
  {
    term: "Positive reply rate",
    def: "The percentage of sent outbound messages that receive an interested reply, not just any reply. The number that decides whether an outbound program actually books meetings.",
  },
  {
    term: "Meeting-book rate",
    def: "The percentage of sent outbound messages that convert to a booked meeting. The number a founder or a VP of Sales cares about, because it maps directly to pipeline.",
  },
  {
    term: "Lead scoring",
    def: "Ranking inbound or replied leads by how likely they are to convert, from real intent signals (role, fit, engagement) rather than politeness. Determines who gets the human's time first.",
  },
  {
    term: "Model card",
    def: "A short, structured document that describes an AI system: what it does, what it was trained on, how it was evaluated, what it should not be used for, and who owns it. The starting point of a governable system.",
  },
  {
    term: "Red teaming",
    def: "Structured attempts to break an AI system before real users do: adversarial prompts, edge cases, and abuse scenarios, run as part of building the system rather than after an incident.",
  },
];

export default function GlossaryPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Glossary", path: "/glossary" },
        ])}
      />
      <main className="px-[var(--space-gutter)] pb-[var(--space-section)] pt-32 lg:pt-40">
        <div className="mx-auto max-w-4xl">
          <p className="eyebrow">Glossary</p>
          <h1 className="font-display mt-4 max-w-3xl text-display-lg font-light">
            The vocabulary,{" "}
            <span className="text-gold-sheen italic">defined plainly.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[length:var(--text-step-1)] text-[var(--fg)]/70">
            The terms that come up around production AI and go-to-market, each in
            one clear sentence, no jargon defending itself with more jargon.
          </p>

          <dl className="mt-14 divide-y divide-[var(--hairline)] border-t border-[var(--hairline)]">
            {terms.map((t) => (
              <div
                key={t.term}
                className="grid gap-2 py-7 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-10"
              >
                <dt
                  id={t.term.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                  className="font-display text-[length:var(--text-step-2)] font-light leading-tight text-[var(--fg)] scroll-mt-28"
                >
                  {t.term}
                </dt>
                <dd className="text-[length:var(--text-step-1)] leading-relaxed text-[var(--fg)]/75">
                  {t.def}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </main>
    </>
  );
}
