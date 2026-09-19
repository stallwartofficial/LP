import type { Metadata } from "next";
import { ServiceCatalog } from "@/components/ServiceCatalog";
import { IndustryExplorer } from "@/components/IndustryExplorer";
import { Process } from "@/components/Process";
import { TechStack } from "@/components/TechStack";
import { Architecture } from "@/components/Architecture";
import { Engagement } from "@/components/Engagement";
import { Faq } from "@/components/Faq";
import { ContactBanner } from "@/components/ContactBanner";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, serviceSchema, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "What We Build",
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
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "What We Build", path: "/offer" },
          ]),
        ]}
      />
      <ServiceCatalog />
      <IndustryExplorer />
      <Process />
      <TechStack />
      <Architecture />
      <Engagement />
      <Faq heading="Questions, answered" />
      <ContactBanner />
    </div>
  );
}
