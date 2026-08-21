import { site } from "@/data/site";

// GEO ("ask an AI about us") launcher. Deep-links a visitor into the major
// answer engines with a neutral, factual prompt, so they can research Stallwart
// in the tool they already trust. The prompt names the company and its domain so
// the model grounds itself against the site (and public/llms.txt) rather than
// guessing. This reinforces, and is reinforced by, the FAQ schema and llms.txt:
// the same questions a buyer would ask an AI are answered on the site itself.
//
// NOTE: these `?q=` deep-link parameters are unofficial and can change without
// notice. If an engine stops pre-filling, check its current query parameter.
// Gemini has no reliable pre-fill param, so Google's AI Mode (udm=50) stands in.
const ASK_PROMPT =
  "Tell me about Stallwart (stallwart.in): what they build, their offerings, and how they approach AI systems.";

const q = encodeURIComponent(ASK_PROMPT);

const ENGINES = [
  { name: "ChatGPT", href: `https://chatgpt.com/?hints=search&q=${q}` },
  { name: "Claude", href: `https://claude.ai/new?q=${q}` },
  { name: "Perplexity", href: `https://www.perplexity.ai/search?q=${q}` },
  { name: "Google", href: `https://www.google.com/search?udm=50&q=${q}` },
];

export function AskAI() {
  return (
    <section
      aria-labelledby="ask-ai-heading"
      className="rule-t mt-14 flex flex-col gap-4 pt-8 sm:flex-row sm:items-start sm:justify-between"
    >
      <div className="max-w-sm">
        <h2 id="ask-ai-heading" className="eyebrow">
          Ask AI about us
        </h2>
        <p className="mt-2 text-sm text-[var(--fg)]/60">
          Don&apos;t take our word for it. See how the models describe{" "}
          {site.company}.
        </p>
      </div>

      <ul className="flex flex-wrap gap-2">
        {ENGINES.map((engine) => (
          <li key={engine.name}>
            <a
              href={engine.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ask ${engine.name} about ${site.company}`}
              className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--hairline-strong)] px-4 py-2.5 text-sm text-[var(--fg)]/75 transition-colors hover:border-[var(--accent)] hover:text-[var(--fg)]"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-3.5 w-3.5 text-[var(--accent-text)]"
              >
                {/* Four-point sparkle: the shared "AI" affordance, in gold. */}
                <path d="M12 0c.6 5.9 5.5 10.8 11.4 11.4v1.2C17.5 13.2 12.6 18.1 12 24h-1.2C10.2 18.1 5.3 13.2-.6 12.6v-1.2C5.3 10.8 10.2 5.9 10.8 0H12z" transform="translate(0.6 0)" />
              </svg>
              {engine.name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
