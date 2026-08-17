import type { Metadata } from "next";
import { Offerings } from "@/components/Offerings";
import { Engagement } from "@/components/TrustLayer";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, offeringListSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "What We Offer",
  description:
    "Stallwart's portfolio, Extrovert AI, AI Editing, and the AI Compliance Office. Systems engineered to take work off a team permanently.",
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
      <Engagement />
      <Faq heading="How we work" />
    </div>
  );
}
