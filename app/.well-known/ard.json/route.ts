import { site } from "@/data/site";

export const dynamic = "force-static";

export function GET() {
  const ard = {
    schema_version: "1.0",
    name: site.company,
    description: site.description,
    url: site.domain,
    type: "engineering_company",
    category: "AI Engineering Services",

    // Stallwart is a custom engineering company, not a SaaS product.
    // There is no public API, SDK, developer portal, or integration endpoint.
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
      booking_url: `${site.domain}/contact`,
    },

    resources: {
      llms_txt: `${site.domain}/llms.txt`,
      sitemap: `${site.domain}/sitemap.xml`,
      robots: `${site.domain}/robots.txt`,
      faq: `${site.domain}/faq`,
      trust: `${site.domain}/trust`,
      how_it_works: `${site.domain}/how-it-works`,
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

    not_applicable: {
      public_api: "Stallwart does not offer a public API. It builds custom systems for clients.",
      sdk: "No SDK. Stallwart is not a software product.",
      developer_portal: "No developer portal. Stallwart is a services company.",
      webhooks: "No public webhooks. Custom integrations are built per engagement.",
      mcp_server: "No MCP server. Stallwart is not a tool or platform.",
      self_serve: "No self-serve signup. Engagements begin with a call.",
    },

    founder: {
      name: "Arun Saravanan",
      role: "Founder",
      linkedin: "https://in.linkedin.com/in/nuras",
    },

    location: {
      country: "India",
      state: "Tamil Nadu",
      remote: true,
      serves: "worldwide",
    },

    founded: 2021,
  };

  return new Response(JSON.stringify(ard, null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
