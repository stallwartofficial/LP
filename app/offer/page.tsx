import type { Metadata } from "next";
import { WhatWeBuild } from "@/components/WhatWeBuild";
import { Architecture } from "@/components/Architecture";
import { Commitments } from "@/components/TrustLayer";
import { Faq } from "@/components/Faq";
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
      <WhatWeBuild />
      <Architecture />
      <Commitments />
      <Faq heading="How we work" />
    </div>
  );
}
