import { site } from "@/data/site";

export const dynamic = "force-static";

const B = site.domain;

export function GET() {
  const card = {
    name: site.company,
    description: site.description,
    url: B,
    provider: {
      organization: site.company,
      url: B,
    },
    version: "1.0.0",
    capabilities: {
      streaming: false,
      pushNotifications: false,
    },
    skills: [
      {
        id: "custom-ai-engineering",
        name: "Custom AI Engineering",
        description:
          "Builds production-grade AI systems: agents, SaaS products, RAG infrastructure, and custom AI, for problems no off-the-shelf product solves.",
        tags: [
          "ai-agents",
          "ai-saas",
          "rag",
          "custom-ai",
          "production-systems",
        ],
        examples: [
          "Build an AI agent that handles customer onboarding end to end",
          "Add RAG to our existing product so it answers from our own data",
          "Build a SaaS product with AI at the core",
          "Automate our compliance review workflow with AI",
        ],
      },
    ],
    defaultInputModes: ["text"],
    defaultOutputModes: ["text"],
    authentication: {
      schemes: [],
      credentials: null,
    },
    // Stallwart is not an API or agent platform. This card describes
    // the company for agent discovery, not an executable endpoint.
    documentationUrl: `${B}/llms.txt`,
    contactEmail: site.contact.email,
  };

  return new Response(JSON.stringify(card, null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
