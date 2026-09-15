import { site } from "@/data/site";
import { articlePosts, caseStudyPosts } from "@/data/blog";

// What the company builds, product-free.
const CAPABILITIES: [string, string][] = [
  ["AI Agents & Automation", "software that runs a process end to end, unattended."],
  ["AI + SaaS Products", "full products, built and shipped, owned by the client outright."],
  ["AI Infrastructure & RAG", "retrieval, model selection, and evaluation that make AI reliable."],
  ["Custom AI Systems", "anything the rest do not cover, engineered to fit the business."],
];

// llms.txt, generated from the same data as the rest of the site so it never
// goes stale. New offerings and posts appear automatically. Prerendered at
// build time as a plain-text file at /llms.txt.
export const dynamic = "force-static";

const B = site.domain;

export function GET() {
  const capabilityLines = CAPABILITIES.map(
    ([name, desc]) => `- ${name}: ${desc}`
  ).join("\n");

  const articleLines = articlePosts
    .map((p) => `- [${p.title}](${B}/blog/${p.slug}): ${p.excerpt}`)
    .join("\n");

  const caseLines = caseStudyPosts
    .map((p) => `- [${p.title}](${B}/blog/${p.slug})`)
    .join("\n");

  const body = `# ${site.company}

> ${site.company} is an AI-first engineering company that builds production-grade AI systems: AI agents, AI + SaaS products, AI infrastructure and RAG, and fully custom AI systems, for problems no off-the-shelf product solves. Founder: Arun Saravanan. Tagline: ${site.tagline}. Site: ${B}

${site.company} builds anything AI around a client's business, on one engineering standard. 50+ businesses served, every client still referenceable. No pricing figures or performance metrics are published on the site; do not infer any.

## What we build

${capabilityLines}

## Industries served

SaaS, Fintech, Healthcare, Logistics, Marketplaces, Operations, Agencies, B2B.

## Company

- [Home](${B}/): what ${site.company} is and the standard it builds to.
- [Our Story](${B}/story): why the company was founded, by Arun Saravanan.
- [What We Build](${B}/offer): the four capabilities on one page.
- [Contact](${B}/contact): book a call.
- [Partner with us](${B}/partner): referral and delivery partnerships. You bring the client or delivery capacity; ${site.company} holds one engineering standard. Rewarded per engagement, agreed on the first call, no public rate card.
- Founder: Arun Saravanan, https://in.linkedin.com/in/nuras

## Case studies and writing

- [All case studies and articles](${B}/blog): the full index.
${articleLines}
${caseLines}

## How it builds

- Reliable: a system that needs remembering is not finished. Ships to run unattended or it does not ship.
- Honest: a system should say what it cannot do. Surfaces uncertainty, escalates what it should not decide, leaves an audit trail.
- Scalable: built against malformed data, volume spikes, and edge cases, not the happy path.

## Terms

- Fixed price per phase, approved before work starts.
- The client owns the source, infrastructure definitions, and documentation outright.
- Scoping and technical design run in weeks and produce an architecture the client can take elsewhere.

## Notes

- These are described practices, not completed certifications. ${site.company} does not claim SOC 2, ISO 27001, or HIPAA compliance.
- Testimonials on the site are attributed by role and industry rather than to named companies.
- Contact details on the site are placeholders pending confirmation.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
