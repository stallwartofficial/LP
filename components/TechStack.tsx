import { Reveal } from "@/components/Reveal";

// "The stack we build on": the models, tools, and infrastructure behind the
// work, as three auto-scrolling marquee rows. Everything stays in the DOM, so
// the concrete tech nouns still count for search and answer engines (GEO/SEO),
// but it reads as a dynamic ticker rather than an exposed inventory. Each group
// leads with a gold label chip. A visually-hidden list carries the full,
// non-duplicated content for accessibility and crawlers. Server component.
const GROUPS: { label: string; items: string[] }[] = [
  { label: "Models & LLMs", items: ["Claude (Opus, Sonnet)", "GPT-4o / GPT-5", "Gemini", "Llama", "Mistral", "Qwen", "DeepSeek", "Embeddings", "Whisper", "Open-weight fine-tunes"] },
  { label: "Agents & Orchestration", items: ["LangGraph", "LangChain", "LlamaIndex", "CrewAI", "AutoGen", "Semantic Kernel", "Model Context Protocol", "Tool / function calling"] },
  { label: "Retrieval & Vector", items: ["pgvector", "Pinecone", "Weaviate", "Qdrant", "Milvus", "Redis", "Elasticsearch", "Hybrid search", "Rerankers"] },
  { label: "Data & Pipelines", items: ["Snowflake", "BigQuery", "Databricks", "Airflow", "dbt", "Kafka", "Spark", "PostgreSQL"] },
  { label: "Cloud & Infrastructure", items: ["AWS", "Google Cloud", "Azure", "Vercel", "Cloudflare", "Kubernetes", "Docker", "Terraform"] },
  { label: "MLOps & Serving", items: ["vLLM", "Ray", "BentoML", "Triton", "MLflow", "Weights & Biases", "LangSmith", "Langfuse"] },
  { label: "Languages & Frameworks", items: ["Python", "TypeScript", "Next.js", "React", "FastAPI", "Node.js", "Go", "PyTorch"] },
  { label: "Security & Governance", items: ["SSO & RBAC", "Audit logging", "PII redaction", "Guardrails", "Evals & testing", "Encryption", "SOC 2-ready patterns"] },
];

// Three rows: split the groups so each marquee carries a good mix.
const ROWS = [GROUPS.slice(0, 3), GROUPS.slice(3, 6), GROUPS.slice(6)];

type Chip = { kind: "label" | "item"; text: string };

function chipsFor(groups: typeof GROUPS): Chip[] {
  return groups.flatMap((g) => [
    { kind: "label" as const, text: g.label },
    ...g.items.map((t) => ({ kind: "item" as const, text: t })),
  ]);
}

function Row({ chips, reverse = false, duration = 60 }: { chips: Chip[]; reverse?: boolean; duration?: number }) {
  const doubled = [...chips, ...chips];
  return (
    <div className="marquee-host overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <div
        aria-hidden="true"
        className={`${reverse ? "animate-marquee-right" : "animate-marquee"} flex w-max shrink-0 items-center`}
        style={{ animationDuration: `${duration}s` }}
      >
        {doubled.map((c, i) => (
          <span key={`${c.text}-${i}`} className="pr-2">
            {c.kind === "label" ? (
              <span className="rounded-full border border-[var(--accent)]/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent-text)]">
                {c.text}
              </span>
            ) : (
              <span className="rounded-full border border-[var(--hairline)] px-3 py-1.5 text-xs text-[var(--fg)]/75">
                {c.text}
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

export function TechStack() {
  return (
    <section aria-labelledby="stack-heading" className="section-y rule-t">
      <div className="mx-auto max-w-6xl px-[var(--space-gutter)]">
        <Reveal>
          <p className="eyebrow">The stack we build on</p>
          <h2 id="stack-heading" className="font-display mt-3 text-display-sm font-light">
            The best tools for the job, <span className="text-gold-sheen italic">not a fixed menu.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--fg)]/75">
            We are not tied to one model or vendor. We pick what fits your problem,
            your data, and your budget, and we can change it as the field moves.
          </p>
        </Reveal>
      </div>

      <div className="mt-10 flex flex-col gap-3">
        <Row chips={chipsFor(ROWS[0])} duration={64} />
        <Row chips={chipsFor(ROWS[1])} reverse duration={54} />
        <Row chips={chipsFor(ROWS[2])} duration={48} />
      </div>

      {/* Real, non-duplicated content for screen readers and crawlers. */}
      <ul className="sr-only">
        {GROUPS.map((g) => (
          <li key={g.label}>
            {g.label}: {g.items.join(", ")}
          </li>
        ))}
      </ul>
    </section>
  );
}
