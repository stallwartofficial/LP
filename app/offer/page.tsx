import type { Metadata } from "next";
import { ServiceCatalog } from "@/components/ServiceCatalog";
import { IndustryExplorer } from "@/components/IndustryExplorer";
import { Process } from "@/components/Process";
import { TechStack } from "@/components/TechStack";
import { ContactBanner } from "@/components/ContactBanner";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, serviceSchema, industriesSchema, pageMeta, webPageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "AI Agents, SaaS & Custom AI Systems",
  description:
    "Stallwart is an AI-first engineering company. We build anything AI: agents, AI + SaaS products, RAG and AI infrastructure, and custom AI systems, engineered to production on one standard.",
  path: "/offer",
});

// Capability overview. No products: the four things we build, the engine they
// run on, how we work, and the FAQ. Reuses the home-page bento and engine so the
// story stays identical across the site.
export default function OfferPage() {
  return (
    <div>
      <JsonLd
        schema={[
          serviceSchema(),
          industriesSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "What We Build", path: "/offer" },
          ]),
          webPageSchema({ name: "What We Build", description: "Stallwart builds AI agents, SaaS products, RAG infrastructure, and custom AI systems, engineered to production.", path: "/offer" }),
        ]}
      />
      <ServiceCatalog />
      <IndustryExplorer />
      <Process />
      <TechStack />
      <ContactBanner />
    </div>
  );
}
