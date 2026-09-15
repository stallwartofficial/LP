# Stallwart.in Redesign — Changes from Current Site

## Page-by-page changes

|Page|Current state|What changes|What stays|
|-|-|-|-|
|**Homepage hero**|"AI systems engineered to run unattended, audited, and trusted" + generic dark bg|Living 4-layer architecture visualization as bg. Broadened copy covering full AI+software scope. Sticky mobile CTA bar.|Tagline spirit. Industry ticker.|
|**Nav**|What we build (dropdown: 3 products) · Company · Resources|Flat: Work · Case Studies · Resources · About · \[Book a Call]. No dropdowns. No Extrovert/Sillage links.|Lion mark logo. Book a Call CTA.|
|**Proof strip**|None|NEW: "11 engagements · every client still referenceable" + client names/logos strip|—|
|**What We Build**|3 offerings (Custom Systems, Extrovert, Sillage)|4 capability cards: AI Agents \& Automation · SaaS \& Software · AI Infra \& LLM Systems · AI-Native Visibility. Real screenshots.|—|
|**Architecture**|4-layer text list (Intelligence → Production)|Interactive visualization — hover/tap layers, particle flow between nodes. Same 4 layers.|All 4-layer content (it's strong).|
|**Terms section**|8-item grid (Ownership, Cost, Time, etc.)|Same content, new visual treatment (surface-1 cards, Phosphor icons)|All 8 terms — they're a conversion weapon.|
|**Case studies**|3 blog-post-style cards|Featured card (large) + 2 smaller. Real metrics. Link to /case-studies hub.|The 3 case studies themselves.|
|**Testimonials**|Carousel with duplicates (renders 3×)|Masonry layout, 6 best quotes only, no duplicates. Company names in amber.|The testimonial content.|
|**Founder**|Photo + quote + bio|Same content, better layout (image left, text right, radius-lg photo not circle)|All founder content (it's well-written).|
|**Ask AI About Us**|4 links (ChatGPT, Claude, Perplexity, Google)|5 links (add Gemini). Upgraded prompts — organic buyer questions, not "tell me about Stallwart."|The concept (it's genuinely rare and smart).|
|**Final CTA**|"Tell us what keeps falling through"|Same copy, Apple-style full viewport — just the headline + button, nothing else.|Copy.|
|**Footer**|Full nav: Company · Resources · What we build (3 products)|Compact: Company · Resources · Contact. Quiet "Stallwart family" line. Ask AI links repeated.|Privacy/Terms links.|
|**/work**|/offer with 3 product cards|Pillar page: 4 capability deep-dives + decision-stage content sections (vs in-house, cost, build vs buy)|—|
|**/case-studies**|Blog posts tagged as case studies|Dedicated hub + individual pages with Problem → Approach → Outcome → Testimonial structure|Case study content.|
|**/contact**|Single form page|Multi-step form (4 steps: need → timeline → budget → details). Thank-you page with Cal.com embed. Auto-email + WhatsApp notification.|—|
|**/about**|Separate /story + /principles|Merged into one /about page. Story + principles + terms.|All story/principles content.|
|**/faq**|Exists, unclear structure|Rewritten with positioning-consistent answers. FAQPage schema. AEO-optimized.|—|
|**/resources**|Separate /blog + /guides + /glossary|Unified hub. Blog + guides + ebook chapters. 3 ebooks written from scratch (20 chapters).|Existing blog posts. Glossary.|
|**/trust**|Exists|Keep, add compliance badge strip if applicable|Trust content.|
|**404**|Default Next.js|Custom: headline + search + CTA + recent posts|—|
|**Extrovert AI page**|/offer/extrovert-ai|DELETED. 301 → homepage.|—|
|**Sillage page**|/offer/sillage|DELETED. 301 → homepage.|—|
|**/partner**|Exists|DELETED.|—|
|**/principles**|Exists|DELETED. Merged into /about. 301 → /about.|—|
|**/story**|Exists|DELETED. Merged into /about. 301 → /about.|—|

## Design changes

|Element|Current|New|
|-|-|-|
|Color palette|Unclear dark theme|Deep void (#050507) + warm amber (#E8A430) accent|
|Typography|Looks template/AI-generated|Satoshi (variable, self-hosted) + JetBrains Mono for code|
|Icons|Unknown|Phosphor Icons (regular weight)|
|Card style|Identical grids|Staggered/varied sizes, surface elevation system|
|Spacing|Cramped, text-heavy|Apple-level whitespace: 128px section gaps, one idea per viewport|
|Animations|None visible|Hero load sequence + architecture viz particles + scroll reveals (minimal, intentional)|
|Mobile|Responsive but basic|Mobile-first, sticky CTA bar, full-screen nav overlay, tap-to-expand architecture|

## New additions (didn't exist before)

|Addition|Purpose|
|-|-|
|Multi-step contact form|Higher conversion — less friction than wall-of-fields|
|Auto-email to customer|Instant acknowledgment builds trust|
|Email + WhatsApp to Arun and Me |Never miss a lead|
|Cal.com on thank-you page|Skip the wait — book immediately|
|llms.txt|AI crawler guidance for GEO|
|3 ebooks (20 chapters)|GEO content engine — indexable, citable authority pages|
|Decision-stage blog posts|Pages LLMs cite when buyers compare (cost, build vs buy, alternatives)|
|Supabase leads table|Track every submission with UTM data|
|Plausible analytics|Privacy-first tracking, no cookie banner|
|Sticky mobile CTA|Always-visible "Book a Call" on mobile|
|FAQPage schema|AEO — answers LLMs pull directly|
|Dynamic OG images|Social sharing looks professional per page|



