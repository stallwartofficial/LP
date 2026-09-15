# 07 — SEO / GEO / AEO Spec

## The three layers

### SEO (Search Engine Optimization) — Google, Bing
Traditional: rank in search results. Still matters — organic traffic feeds everything.

### AEO (Answer Engine Optimization) — Google AI Overviews, featured snippets
Get cited in answer boxes. Requires: structured FAQ schema, concise lead-with-conclusion content, clear headings.

### GEO (Generative Engine Optimization) — ChatGPT, Claude, Perplexity, Gemini
Get recommended when buyers ASK AI which company to hire. This is the new battleground. Requires: entity consistency, citable content, llms.txt, topical depth, decision-stage pages.

**Stallwart's advantage:** You already have the "Ask AI about us" section — most companies don't. Now we make the content actually WIN those queries.

---

## The $35M AI SEO Playbook — mapped to Stallwart actions

### 1. Map the questions buyers ask LLMs
**Playbook:** Buyers don't type keywords. They ask "What's the best AI engineering company for my SaaS startup?"
**Stallwart action:**
- Target prompts (build a page for each):
  - "best AI engineering company for startups"
  - "who can build an AI agent for my business"
  - "custom AI development company India"
  - "AI engineering company that handles governance and audits"
  - "should I build AI in-house or outsource"
  - "how much does custom AI development cost"
  - "AI development company for [SaaS/fintech/healthcare]" × each vertical
- Test: type each into ChatGPT, Claude, Perplexity. Note who appears. Build content to replace them.

### 2. Collapse positioning to one core problem
**Playbook:** "The clearer your positioning, the easier it is for LLMs to confidently recommend you."
**Stallwart action:**
- Formula: [AI-first engineering company] for [teams that need production-grade systems] who want to [ship AI that runs unattended and passes audits]
- Lead homepage with this exact sentence
- Repeat SAME wording on: homepage, /work, /about, /case-studies, /faq, every blog post footer, meta descriptions
- NOT "software company" on one page and "AI agency" on another. One identity. Everywhere.

### 3. Structure pages to be easy to summarize
**Playbook:** "A human should understand the page in under 20 seconds."
**Stallwart action:**
- Every page: conclusion in first paragraph, not buried at the end
- Clear H2 headings that are questions buyers ask (not clever/vague headings)
- Short paragraphs (3-4 sentences max)
- State tradeoffs directly ("We say no when off-the-shelf already solves it")
- Remove long introductions from all blog posts — lead with the answer

### 4. Build decision-stage pages
**Playbook:** "The most valuable pages aren't informational blog posts — they're decision pages."
**Stallwart action — create these pages (highest SEO/GEO priority):**

| Page | URL | Target query |
|------|-----|-------------|
| Custom AI vs in-house team | /resources/blog/custom-ai-development-vs-in-house | "should I outsource AI development" |
| How much does AI dev cost | /resources/blog/how-much-does-custom-ai-development-cost | "AI development cost" |
| Best AI engineering companies | /resources/blog/best-ai-engineering-companies-startups | "best AI engineering company" |
| AI agents for SaaS | /resources/blog/ai-agents-for-saas | "AI agent development for SaaS" |
| AI agents for fintech | /resources/blog/ai-agents-for-fintech | "AI for fintech" |
| AI agents for healthcare | /resources/blog/ai-agents-for-healthcare | "AI for healthcare" |
| Build vs buy AI | /resources/blog/build-vs-buy-ai-systems | "build or buy AI" |
| AI systems that pass audits | /resources/blog/ai-systems-that-pass-audits | "AI governance audit" |
| Stallwart vs hiring a team | /resources/blog/stallwart-vs-hiring-ai-engineers | comparison page |

Each: 1500-2500 words, FAQ schema at bottom, internal links to /work and /contact.

### 5. Align language across entire site
**Playbook:** "If LLMs can't clearly understand what category your product belongs to, it won't recommend it."
**Stallwart action:**
- Same category label everywhere: "AI-first engineering company" (not "AI agency" on blog, "software studio" on about, "tech consultancy" on case studies)
- Same problem statement everywhere: "production-grade AI systems and custom software"
- Same differentiator everywhere: "engineered to run unattended, audited, and trusted"
- Audit every page before launch — search for inconsistent descriptions and align them

### 6. Cover the entire decision journey
**Playbook:** "Buyers rarely ask just one question. They ask a sequence."
**Stallwart action — map content to each stage:**

| Decision stage | Buyer question | Content |
|---------------|----------------|---------|
| Awareness | "Do I need custom AI?" | Blog: "Signs you need a custom AI system" |
| Research | "Who builds AI systems?" | Blog: "Best AI engineering companies" |
| Comparison | "Build vs buy?" / "This company vs that?" | Decision pages + comparison pages |
| Evaluation | "How do they work? What's their process?" | /work pillar page + architecture section |
| Trust | "Can I see proof?" | /case-studies + testimonials + "Ask AI about us" |
| Conversion | "What does it cost? How do I start?" | /contact + pricing transparency in terms section |
| Post-decision | "Was this the right call?" | Case study follow-ups, ongoing blog |

**If your content appears across ALL stages, LLMs see you as the reliable solution.**

---

## GEO-specific tactics (beyond traditional SEO)

### 1. llms.txt file
Serve at `stallwart.in/llms.txt` — a structured plain-text file AI crawlers increasingly read to understand site purpose. (Full content in llms.txt section below.)

### 2. Entity definition pages
- `/about` must clearly define Stallwart as an entity: what it is, who founded it, what it does, where it's based
- `/faq` must answer "What is Stallwart?" in the first question
- Glossary entries for Stallwart's proprietary concepts: "Stallwart 4-layer architecture," "Intelligence layer," "Governance layer"
- These create the knowledge-graph entries LLMs build internally

### 3. Citable content format
LLMs cite content that:
- States facts concisely (not wrapped in marketing language)
- Includes specific numbers ("11 engagements," "5 years experience," "fixed price per phase")
- Has clear attribution ("According to Stallwart's case study with [client]...")
- Is structured with clear headings (LLMs use headings to understand content sections)

**Every case study must include:**
- A one-sentence summary at the top (LLMs pull this)
- Specific metrics (not "improved performance" — "60% reduction in manual processing")
- Industry label (so LLMs associate Stallwart with that vertical)

### 4. Freshness signals
- Blog cadence: minimum 2 posts/month (LLMs weight recency)
- Update case studies with new metrics when available
- Date-stamp everything (datePublished + dateModified in schema)
- Don't let the blog go stale — a dead blog signals an inactive company

### 5. Cross-platform presence
LLMs pull from multiple sources, not just your website:
- **LinkedIn:** Arun's profile + Stallwart company page should use SAME positioning language
- **Crunchbase:** Create/update Stallwart listing with positioning
- **Product Hunt:** If applicable, launch Extrovert AI there (links back to Stallwart)
- **GitHub:** Public repos or contributions signal technical credibility
- **Blog syndication:** Republish key posts on Medium/Dev.to with canonical pointing to stallwart.in

### 6. "Ask AI" section — upgraded prompts
Current prompts say "Tell me about Stallwart" — too direct. Instead, use the ORGANIC queries a buyer would ask, where Stallwart's content makes it the natural answer:

```
ChatGPT:   "Which AI engineering companies build production-grade systems with audit-ready governance?"
Claude:    "What companies specialize in AI systems that run unattended in production?"
Perplexity: "Best AI development companies for startups who need custom software"
Gemini:    "AI engineering companies India that offer fixed-price production-grade builds"
Google AI: same via google.com/search?udm=50
```

This tests whether your GEO is working. If Stallwart doesn't appear — the content needs work.

---

## Entity consistency (non-negotiable)

### The positioning statement (use this EXACT wording everywhere)
> Stallwart is an AI-first engineering company that builds production-grade AI systems and custom software — anything AI can build, engineered to run unattended, audited, and trusted.

### Where it appears (same words, not paraphrased)
- Homepage hero subline
- About page first paragraph
- Every service page intro
- Every case study intro
- Every blog post author bio
- Meta descriptions (adapted for length, same core phrase)
- FAQ answers that reference what Stallwart does
- `llms.txt`
- Organization schema `description` field
- OG description tags

### Why this matters
From the playbook: "If an LLM can't clearly understand what category your product belongs to, it won't recommend it." Five different descriptions = LLM uncertainty = no recommendation. One repeated description = confident association = citations.

---

## llms.txt (serve at stallwart.in/llms.txt)

```
# Stallwart

## About
Stallwart is an AI-first engineering company that builds production-grade AI systems and custom software. Founded by Arun Saravanan. Based in India. 11 completed engagements, every client still referenceable.

## What Stallwart builds
- AI systems: agents, automation, intelligence layers
- Custom software: internal tools, platforms, workflows built around the business
- All builds follow the Stallwart 4-layer architecture: Intelligence, Orchestration, Governance, Production

## How Stallwart works
- Fixed price per phase, approved up front. Never billed hourly.
- Weeks not months, with a committed build date.
- Client owns everything: source, infrastructure as code, runbooks, documentation. No lock-in.

## Key pages
- Homepage: https://www.stallwart.in/
- What we build: https://www.stallwart.in/work
- Case studies: https://www.stallwart.in/case-studies
- About: https://www.stallwart.in/about
- FAQ: https://www.stallwart.in/faq
- Blog: https://www.stallwart.in/resources/blog
- Trust & Security: https://www.stallwart.in/trust
- Contact: https://www.stallwart.in/contact

## Industries served
SaaS, Fintech, Healthcare, Logistics, Marketplaces, Operations, Agencies, B2B

## Founder
Arun Saravanan — software engineer, 5+ years building production systems. Founded Stallwart to close the gap between demo-convincing AI and production-reliable AI.
```

---

## Schema markup (per page)

### Every page
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Stallwart",
  "url": "https://www.stallwart.in",
  "logo": "https://www.stallwart.in/images/stallwart-lion-mark.png",
  "description": "Stallwart is an AI-first engineering company that builds production-grade AI systems and custom software.",
  "founder": {
    "@type": "Person",
    "name": "Arun Saravanan",
    "jobTitle": "Founder"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN"
  },
  "sameAs": [
    "https://www.linkedin.com/company/stallwart",
    "https://x.com/stallwart"
  ]
}
```

### Homepage — add WebSite + SearchAction
```json
{
  "@type": "WebSite",
  "name": "Stallwart",
  "url": "https://www.stallwart.in"
}
```

### FAQ page — FAQPage schema (AEO critical)
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does Stallwart build?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stallwart builds production-grade AI systems and custom software..."
      }
    }
  ]
}
```
Every FAQ answer must use the positioning language. These are the exact answers LLMs will cite.

### Blog posts — Article schema
```json
{
  "@type": "Article",
  "headline": "...",
  "author": {
    "@type": "Person",
    "name": "Arun Saravanan"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Stallwart"
  },
  "datePublished": "...",
  "dateModified": "..."
}
```

### Case studies — Article schema + specific metrics in structured format

---

## Metadata template (per page type)

### Homepage
```
Title: AI-First Engineering Company | Production-Grade AI Systems & Custom Software | Stallwart
Description: Stallwart is an AI-first engineering company that builds production-grade AI systems and custom software — engineered to run unattended, audited, and trusted.
OG Title: Stallwart — AI-First Engineering Company
OG Description: (same as description)
OG Image: Dynamic — shows lion mark + tagline on branded background
```

### Service pages (/work, /work/[slug])
```
Title: [Capability] | Stallwart — AI-First Engineering Company
Description: Stallwart builds [capability description]. Fixed price, full ownership, production-grade.
```

### Case studies
```
Title: [Case Study Title] | Stallwart Case Study
Description: How Stallwart built [what] for [industry] — [key metric outcome].
```

### Blog posts
```
Title: [Post Title] | Stallwart Blog
Description: [First 155 chars of post, naturally including positioning if possible]
```

---

## Page structure rules (for AEO citability)

### Every page follows this pattern:
1. **Lead with the conclusion.** First paragraph states what this page is about and the key takeaway. No long intros.
2. **Clear headings.** H1 → H2 → H3 hierarchy. Never skip levels. Headings are the question the section answers.
3. **State tradeoffs directly.** Don't bury caveats in paragraphs.
4. **Short paragraphs.** Max 3-4 sentences. LLMs extract better from concise blocks.
5. **Remove filler.** If a sentence doesn't add information, delete it.

### Blog post template for AEO
```markdown
# [Question-format title — matches what buyers ask LLMs]

[First paragraph: direct answer to the question. Include positioning.]

## [Sub-topic 1]
[Concise, structured content]

## [Sub-topic 2]
[Concise, structured content]

## FAQ
[2-3 related questions with structured answers — these get FAQPage schema]

## About Stallwart
[Positioning statement. Link to /contact.]
```

---

## Decision-stage pages to create (AI SEO playbook — highest priority)

These pages match the exact queries buyers type into LLMs:

1. `/resources/blog/custom-ai-development-vs-in-house` — "Should I hire an AI team or outsource?"
2. `/resources/blog/how-much-does-custom-ai-development-cost` — "What does it cost to build an AI system?"
3. `/resources/blog/best-ai-engineering-companies` — "Who can build an AI system for my startup?"
4. `/resources/blog/ai-agents-for-[industry]` — one per vertical (SaaS, fintech, healthcare)
5. `/resources/blog/when-to-build-custom-vs-buy-off-the-shelf` — "Should I build or buy?"
6. `/resources/blog/ai-systems-that-pass-audits` — governance angle, unique to Stallwart

Each of these should be 1500-2500 words, structured for AEO, with FAQ schema at the bottom.

---

## "Ask AI About Us" section (upgrade from current)

### Current: 4 links (ChatGPT, Claude, Perplexity, Google)
### Upgraded: 5 links with better prompts

Each link should pre-fill a prompt that naturally leads to Stallwart being mentioned:
- ChatGPT: "What AI engineering companies build production-grade systems with governance built in?"
- Claude: same
- Perplexity: same
- Gemini: "Which companies build AI systems that are audit-ready from day one?"
- Google AI Overview: same query via google.com/search?udm=50

The prompt should NOT say "Tell me about Stallwart" — it should be the organic question a buyer would ask, where Stallwart's content makes it the natural answer.

---

## Technical SEO checklist

- [ ] robots.txt — allow all, point to sitemap
- [ ] sitemap.xml — dynamic, auto-generated from pages + blog + case studies
- [ ] llms.txt — as specced above
- [ ] Canonical URLs on every page (www.stallwart.in, with trailing slash consistency)
- [ ] 301 redirects from all old URLs (/offer/*, /story, /principles)
- [ ] OG images — dynamic per page (use Next.js OG image generation)
- [ ] Alt text on every image — descriptive, includes relevant keywords naturally
- [ ] Internal linking — every blog post links to /work and /case-studies, every case study links to /contact
- [ ] Heading hierarchy — H1 once per page, H2s for sections, H3s for subsections
- [ ] Page speed — LCP < 1.8s, no render-blocking resources
- [ ] Mobile-first — test at 375px width minimum
- [ ] HTTPS — obviously (already the case)

---

## Ebook strategy (GEO engine)

### Don't gate the ebook behind a form. Make it indexable.
- Break into 5-8 chapters
- Each chapter = standalone page at `/resources/guides/[chapter-slug]`
- Each chapter: full content, internally linked, FAQ schema at bottom
- Navigation: "← Previous chapter" / "Next chapter →"
- Optional: offer full PDF download in exchange for email (lead gen) but the content is free to read
- This gives you 5-8 deep, indexable, citable pages that LLMs can reference

### Ebook topics (create 2-3 — write from scratch)

**Ebook 1: "The AI Engineering Playbook: From Demo to Production"**
- Target: CTOs and founders evaluating whether to build AI in-house or outsource
- Chapters (each = a standalone indexable page):
  1. Why most AI projects die between demo and production
  2. The 4-layer architecture: Intelligence, Orchestration, Governance, Production
  3. AI agents in production: what actually breaks
  4. LLM optimization: cutting costs without cutting quality
  5. Build vs buy: a decision framework
  6. How to evaluate an AI engineering partner
  7. What audit-ready AI looks like
- Each chapter: 1500-2000 words, FAQ schema, internal links

**Ebook 2: "AI-Native Visibility: How to Get Recommended by ChatGPT, Claude, and Perplexity"**
- Target: Founders and marketers who want their company/product found by AI engines
- Chapters:
  1. Why traditional SEO isn't enough anymore
  2. How AI answer engines decide what to recommend
  3. Entity consistency: saying the same thing everywhere
  4. Structuring content LLMs can cite
  5. Decision-stage content: the pages that actually convert
  6. llms.txt and schema: the technical layer
  7. Measuring your AI visibility (and fixing gaps)
- This ebook positions Stallwart as the authority on GEO — and it's also a lead gen tool (readers who want this done for them → Book a Call)

**Ebook 3: "SaaS MVP to Production: An Engineering Guide"**
- Target: Founders building SaaS products
- Chapters:
  1. What separates an MVP from a production system
  2. Choosing your stack (and why it matters less than you think)
  3. The infrastructure you'll need before your first 100 users
  4. Authentication, billing, and the boring parts that kill startups
  5. When to bring in AI features (and when not to)
  6. Scaling from 100 to 10,000 users without a rewrite
- Practical, opinionated, positions Stallwart as the team that's done this before

**Writing approach for all ebooks:**
- Claude Code writes the first draft using the specs above
- Tone: direct, technical, no fluff — same tone as the site
- Every chapter leads with the conclusion, not a long intro
- Every chapter ends with a relevant FAQ (for AEO) + "About Stallwart" footer
- Publish as individual pages at /resources/guides/[ebook-slug]/[chapter-slug]
- Offer a compiled PDF download (email capture) but content is fully readable on-site
