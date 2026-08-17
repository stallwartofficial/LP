import { Hero } from "@/components/Hero";
import { FactsStrip, KineticBand } from "@/components/KineticBand";
import { StoryTeaser } from "@/components/StoryTeaser";
import { HowWeBuild } from "@/components/HowWeBuild";
import { OfferingsTeaser } from "@/components/OfferingsTeaser";
import { SocialProof } from "@/components/SocialProof";
import { InsightsTeaser } from "@/components/InsightsTeaser";
import { Commitments } from "@/components/TrustLayer";
import { ContactBanner } from "@/components/ContactBanner";
import { JsonLd } from "@/components/JsonLd";
import { offeringListSchema, webSiteSchema } from "@/lib/seo";

// The company's front door.
//
// Reading order is an argument: what we are, the facts, why we exist, the
// standard we hold, what we build, proof, thinking, how we operate, close.
// The kinetic band is a deliberate beat between the standard and the portfolio.
//
// No single offering is the subject of any section. Organization schema is
// emitted globally in layout.tsx; this page adds WebSite and the portfolio
// ItemList so crawlers resolve the company from the root.
export default function Home() {
  return (
    <>
      <JsonLd schema={[webSiteSchema(), offeringListSchema()]} />
      <Hero />
      <FactsStrip />
      <StoryTeaser />
      <HowWeBuild />
      <KineticBand />
      <OfferingsTeaser />
      <SocialProof />
      <InsightsTeaser />
      <Commitments />
      <ContactBanner />
    </>
  );
}
