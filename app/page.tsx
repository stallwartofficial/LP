import { Hero } from "@/components/Hero";
import { KineticBand, ProductionProperties } from "@/components/KineticBand";
import { StoryTeaser } from "@/components/StoryTeaser";
import { HowWeBuild } from "@/components/HowWeBuild";
import { OfferingsTeaser } from "@/components/OfferingsTeaser";
import { Architecture } from "@/components/Architecture";
import { SocialProof } from "@/components/SocialProof";
import { InsightsTeaser } from "@/components/InsightsTeaser";
import { Commitments } from "@/components/TrustLayer";
import { ContactBanner } from "@/components/ContactBanner";
import { JsonLd } from "@/components/JsonLd";
import { offeringListSchema, webSiteSchema } from "@/lib/seo";

// The company's front door.
//
// Reading order is an argument: what we are, why we exist, the standard we hold
// ourselves to, then the three systems as substantial modules with their real
// signal paths, then the shared core those systems are built on, then the
// production properties that follow from it, then proof, thinking, and close.
//
// The portfolio and architecture sections sit adjacent on purpose: the modules
// show three mechanisms, the architecture shows they are one engine. That
// sequence is what makes "three systems, one standard" a structural claim
// rather than a heading.
export default function Home() {
  return (
    <>
      <JsonLd schema={[webSiteSchema(), offeringListSchema()]} />
      <Hero />
      <StoryTeaser />
      <HowWeBuild />
      <KineticBand />
      <OfferingsTeaser />
      <Architecture />
      <ProductionProperties />
      <SocialProof />
      <InsightsTeaser />
      <Commitments />
      <ContactBanner />
    </>
  );
}
