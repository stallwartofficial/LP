# 04 — Page Specs

## Design principle (Apple rule)
One idea per viewport. Each section fills the screen, makes its point, and gets out. No cramming two ideas into one scroll frame. 128px between sections on desktop (--space-32), 64px on mobile (--space-16).

---

## Homepage

### Section 1: Hero (full viewport height)
- **Layout:** Centered content, full viewport height (100svh)
- **Content:**
  - Headline: --text-hero, max 2 lines, centered
  - Subline: --text-lg, text-2, max 2 lines, centered, 60ch max-width
  - Primary CTA: amber button "Book a Call"
  - Secondary CTA: ghost button "See Our Work"
- **Visual:** Behind the text — the living architecture visualization. The 4-layer system (Intelligence → Orchestration → Governance → Production) rendered as an interactive node graph with subtle particle flow. Not full-opacity — dimmed to ~15% so text reads cleanly. On scroll, it becomes more visible in the architecture section.
- **Below hero (still in viewport):** Industry ticker — "Built for teams in" + scrolling: SaaS · Fintech · Healthcare · Logistics · Marketplaces · Operations · B2B. Subtle, text-3 color, auto-scrolling.

### Section 2: Proof strip
- **Layout:** Full-width, bg surface-1, thin top/bottom border
- **Content:** Single row: "11 engagements · every client still referenceable" centered, text-2
- **Below:** Client company names (or logos if available) in a horizontal strip, opacity 40%, hover to 100%. Like Clay's logo strip.
- **Height:** Compact — ~120px total. Not a full viewport section.

### Section 3: What We Build (full viewport)
- **Layout:** Left-aligned heading, right-side content
- **Heading:** "What we build." --text-3xl
- **Content:** 4 capability cards (NOT identical grids — 2×2 staggered, featured card larger):
  1. AI Agents & Automation — autonomous agents, workflows, ops automation
  2. SaaS & Software Products — full-stack products, dashboards, internal tools
  3. AI Infrastructure & LLM Systems — model serving, RAG, fine-tuning, cost optimization
  4. AI-Native Visibility — built to rank in AI answer engines + search
- **Each card:** bg surface-1, radius-lg, real screenshot/image inside showing actual work, short description below
- **CTA at bottom:** "See everything we build →" (links to /work)

### Section 4: Architecture (full viewport, the signature)
- **This is the signature visual moment.** The 4-layer architecture visualization now at full prominence.
- **Layout:** Interactive diagram center, layer descriptions around it
- **The 4 layers:**
  1. Intelligence — "Where AI makes a call"
  2. Orchestration — "What keeps work moving without a person"
  3. Governance — "What keeps it inside your rules"
  4. Production — "What keeps it reliable at scale"
- **Interaction:** Clicking/hovering a layer highlights it and shows its description. On mobile: vertical stack with tap to expand.
- **Key line below:** "Every Stallwart build runs through the same four layers. That's why a governance guarantee in one system is a governance guarantee in all of them."

### Section 5: Case studies (full viewport)
- **Layout:** Featured case study (large card, 8-col) + 2 smaller cards below
- **Like Clay's approach:** the case study IS the portfolio piece. Real screenshot, real metric, real problem.
- **Each card:** Image (screenshot of actual work), title, one-line result, tag (industry), read time
- **CTA:** "All case studies →"

### Section 6: The terms (compact, trust-building)
- **Layout:** 2x4 grid of compact term blocks (from current site — these are strong, keep them)
- **Ownership, Cost, Time, Security, Data, Region, Control, Candour**
- **Each:** Icon (Phosphor), bold title, 1-line description. bg surface-1 cards.
- **This section replaces a pricing page** — it's transparent enough to convert.

### Section 7: Testimonials (full viewport)
- **NOT a carousel.** Masonry layout — different height cards based on quote length.
- **Like Clay's approach:** real names, real titles, real companies.
- **Pick the 6 strongest quotes (not all 11 — the repeats in current site are a bug).**
- **Layout:** 3-col masonry desktop, 1-col mobile, bg surface-1 cards
- **Company name in amber** (subtle brand reinforcement)

### Section 8: Founder (half viewport)
- **Layout:** Image left (radius-lg, natural photo), text right
- **The quote + bio from current site — it's strong. Keep it.**
- **Photo:** Real, professional, not circle-cropped.
- **CTA below bio:** "Read the full story →"

### Section 9: Ask AI About Us (compact, powerful)
- **Keep this section from current site — it's a rare AEO move most companies don't have.**
- **Upgrade:** Add Apollo-style prompt links for ChatGPT, Claude, Perplexity, Gemini, Google AI Overview
- **Copy:** "Don't take our word for it. Ask any AI."
- **Layout:** Single row of AI engine logos as clickable links, subtle bg surface-1 bar

### Section 10: Final CTA (full viewport)
- **Layout:** Centered, maximum breathing room (Apple-style)
- **Headline:** "Tell us what keeps breaking." --text-4xl
- **Subline:** "Bring us the process that only works because someone remembers it."
- **CTA:** Large amber "Book a Call" button
- **Nothing else in this viewport.** Just the question and the button. Like Apple's closing frames.

### Footer
- **Compact, structured like Apollo's**
- **Columns:** Company (About, Careers, Trust) | Resources (Blog, Guides, Glossary, FAQ) | Get in touch (email, location)
- **Quiet line:** "Part of the Stallwart family — Extrovert AI · Sillage"
- **Bottom row:** © 2026 Stallwart | Privacy | Terms
- **Ask AI about us links** repeated here (like Apollo does)

---

## /work (What We Build)

**Pillar page — this is the SEO/AEO workhorse.**

### Hero
- Headline: "We build AI systems and custom software that runs without babysitting."
- Subline: positioning statement repeated (AEO consistency)

### Capability sections (each a deep-dive)
One section per capability, each deep enough to rank independently:
1. **AI Systems** — agents, automation, intelligence layers. What kinds. Who it's for. How it's built (link to architecture). Case study proof.
2. **Custom Software** — internal tools, platforms, workflows. Same structure.
3. **AI-Native Visibility** — everything built to rank in AI + search. This is the differentiator. Explain the "Ask AI" approach. Link to case studies.

### Each section
- Screenshot/image of real work
- Problem → approach → outcome format
- Specific metrics (not "improved performance")
- CTA: "Book a Call" at each section bottom

### Decision-stage content (AI SEO playbook)
Below capabilities, add comparison/decision sections:
- "Custom AI development vs hiring in-house"
- "How much does custom AI development cost?"
- "When to build custom vs buy off-the-shelf"
These are the pages LLMs cite when buyers are deciding.

---

## /case-studies

### Hub page
- Grid of case study cards (not identical — featured + regular like homepage)
- Filter by industry tag (SaaS, Healthcare, Fintech, etc.)

### Individual case study page
- **Structure (for AEO citability):**
  - Problem (1 paragraph, specific)
  - Approach (what was built, which architecture layers)
  - Outcome (specific metrics)
  - Testimonial from client
  - "Book a Call" CTA at bottom
- **Schema:** Article + FAQPage if applicable
- **This format makes each case study independently citable by LLMs.**

---

## /contact (Book a Call)

### Multi-step form (not one wall of fields — like Explee's simplicity)
**Step 1:** "What do you need?" → 4 options (cards, tap to select):
  - AI system
  - Custom software
  - Automation/workflow
  - Not sure yet

**Step 2:** "What's your timeline?" → 4 options:
  - ASAP
  - 1-3 months
  - 3-6 months
  - Just exploring

**Step 3:** "Budget range" → 4 options:
  - Under $25K
  - $25K - $50K
  - $50K - $100K
  - $100K+

**Step 4:** Contact details:
  - Name (required)
  - Email (required)
  - Company
  - Brief description of what you need

**Submit → /contact/thank-you**

### /contact/thank-you
- Confirmation message: "We got it. Arun will respond within 24 hours."
- Cal.com inline embed: "Want to skip the wait? Book a time now."
- Auto-email fires (instant acknowledgment)
- Arun gets email + WhatsApp notification

---

## /about

**Merge current /story + /principles into one page.**

### Sections
1. **The origin** — Arun's story (from current site — it's strong)
2. **Principles** — the engineering values (from current /principles page)
3. **How we operate** — the transparent terms (can live here AND on homepage)
4. **Team** (if applicable — even just Arun's expanded bio)

---

## /resources

### Hub page
- Unified listing: Blog + Guides + Ebook chapters
- Filter by type (Article, Guide, Case Study, Ebook Chapter)
- Each with: title, description, read time, date, type badge

### /resources/blog/[slug]
- Standard blog post layout: title, date, read time, body (MDX), related posts
- Schema: Article
- "Book a Call" CTA at bottom of every post

### /resources/guides/[slug]
- Ebook chapters live here as individual indexable pages
- Each chapter: standalone content + "Next chapter" navigation
- Not gated — fully readable, fully indexable (this is the GEO engine)

---

## /faq

- Structured FAQ page with proper FAQPage schema
- Questions organized by category: Working With Us, Pricing, Technical, Security
- Each answer: concise, citeable, uses positioning language consistently
- This is the AEO honeypot — LLMs pull FAQ answers directly.

---

## /trust

- Keep current Trust & Security page
- Add compliance badges if applicable (like Apollo's GDPR/SOC2/ISO strip)

---

## Custom 404

- Headline: "This page doesn't exist."
- Search bar
- "Go home" button + "Book a Call" button
- Recent blog posts or case studies as fallback content

---

## Technical pages
- `/privacy` — real privacy policy
- `/terms` — real terms
- Both must exist for enterprise credibility. No placeholder text.
