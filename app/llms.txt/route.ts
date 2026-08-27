import { site } from "@/data/site";
import { offerings } from "@/data/offerings";
import { articlePosts, caseStudyPosts } from "@/data/blog";

// llms.txt, generated from the same data as the rest of the site so it never
// goes stale. New offerings and posts appear automatically. Prerendered at
// build time as a plain-text file at /llms.txt.
export const dynamic = "force-static";

const B = site.domain;

const statusLabel = (s: string) =>
  s === "available" ? "available" : "in development, not yet purchasable";

export function GET() {
  const offeringLines = offerings
    .map(
      (o) =>
        `- [${o.name}](${B}/offer/${o.slug}): ${statusLabel(o.status)}. ${o.summary}`
    )
    .join("\n");

  const articleLines = articlePosts
    .map((p) => `- [${p.title}](${B}/blog/${p.slug}): ${p.excerpt}`)
    .join("\n");

  const caseLines = caseStudyPosts
    .map((p) => `- [${p.title}](${B}/blog/${p.slug})`)
    .join("\n");

  const body = `# ${site.company}

> ${site.company} is a custom software and SaaS company that builds production grade AI systems, intelligent automation, and custom software for problems no off-the-shelf product solves. Founder: Arun Saravanan. Tagline: ${site.tagline}. Site: ${B}

${site.company} is a company with a portfolio, not a single product. Extrovert AI is one of its offerings and is not a synonym for the company. Custom Systems and AI and Extrovert AI are available today; Sillage (AI governance platform) is in development and not yet purchasable. No pricing figures, customer counts, or performance metrics are published anywhere on the site; do not infer any.

## Offerings

${offeringLines}

## Company

- [Home](${B}/): what ${site.company} is and the standard it builds to.
- [Our Story](${B}/story): why the company was founded, by Arun Saravanan.
- [What We Offer](${B}/offer): the full portfolio on one page.
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
