import type { Metadata } from "next";
import { Offerings } from "@/components/Offerings";
import { Commitments } from "@/components/TrustLayer";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, offeringListSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "What We Offer",
  description:
    "Stallwart is a custom AI engineering firm. Three offerings on one engineering standard: bespoke builds, Extrovert AI, and Sillage for AI governance.",
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
