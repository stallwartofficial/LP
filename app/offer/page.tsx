import type { Metadata } from "next";
import { Offerings } from "@/components/Offerings";
import { Commitments } from "@/components/TrustLayer";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, offeringListSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "What We Offer",
  description:
    "Stallwart builds custom AI engineering engagements, Extrovert AI, AI Compliance and Governance, and AI Video Creation. Four systems on one engineering standard.",
  alternates: { canonical: "/offer" },
};

// The portfolio overview. Offering-specific depth (features, integrations,
// product FAQs) lives at /offer/[slug], not here.
export default function OfferPage() {
  return (
    <div>
      <JsonLd
        schema={[
          offeringListSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "What We Offer", path: "/offer" },
          ]),
        ]}
      />
      <Offerings />
      <Commitments />
      <Faq heading="How we work" />
    </div>
  );
}
