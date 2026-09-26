import { site } from "@/data/site";

export const dynamic = "force-static";

const B = site.domain;

export function GET() {
  const ard = {
    specVersion: "1.0",
    entries: [
      {
        identifier: "urn:air:stallwart:services:stallwart",
        displayName: "Stallwart",
        name: site.company,
        description: site.description,
        url: B,
        type: "application/ai-catalog+json",
        representativeQueries: [
          "Who builds custom AI systems",
          "AI engineering company India",
          "custom AI agents for business",
          "production AI systems company",
          "RAG infrastructure company",
        ],
        category: "AI Engineering Services",

        // Stallwart is a custom engineering company, not a SaaS/API product.
        has_api: false,
        has_sdk: false,
        has_developer_portal: false,

        capabilities: [
          "AI Agents & Automation",
          "AI + SaaS Products",
          "AI Infrastructure & RAG",
          "Custom AI Systems",
        ],

        engagement_model: "custom_engineering",
        pricing_model: "fixed_price_per_phase",

        contact: {
          email: site.contact.email,
          booking_url: `${B}/contact`,
        },

        resources: {
          llms_txt: `${B}/llms.txt`,
          agent_skills: `${B}/.well-known/agent-skills`,
          agents_md: `${B}/agents.md`,
          agent_card: `${B}/.well-known/agent-card.json`,
          sitemap: `${B}/sitemap.xml`,
          robots: `${B}/robots.txt`,
          faq: `${B}/faq`,
          trust: `${B}/trust`,
          how_it_works: `${B}/how-it-works`,
        },

        structured_data: [
          "Organization",
          "WebSite",
          "WebPage",
          "Service",
          "FAQPage",
          "BreadcrumbList",
          "Article",
          "DefinedTermSet",
        ],

        industries: [
          "Healthcare",
          "Banking",
          "Fintech",
          "Insurtech",
          "Retail & E-commerce",
          "Travel & Hospitality",
          "Real Estate & Construction",
          "Aerospace",
          "Education",
          "Media & Advertising",
          "Automotive",
          "Mobility",
          "Communication",
          "Physical AI",
        ],

        founder: {
          name: "Arun Saravanan",
          role: "Founder",
          linkedin: "https://in.linkedin.com/in/nuras",
        },

        location: {
          country: "India",
          remote: true,
          serves: "worldwide",
        },

        founded: 2026,
      },
    ],
  };

  return new Response(JSON.stringify(ard, null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
