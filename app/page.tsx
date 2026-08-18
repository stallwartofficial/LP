import { Hero } from "@/components/Hero";
import { OfferingsTeaser } from "@/components/OfferingsTeaser";
import { StoryTeaser } from "@/components/StoryTeaser";
import { HowWeBuild } from "@/components/HowWeBuild";
import { Architecture } from "@/components/Architecture";
import { InsightsTeaser } from "@/components/InsightsTeaser";
import { SocialProof } from "@/components/SocialProof";
import { Commitments } from "@/components/TrustLayer";
import { ContactBanner } from "@/components/ContactBanner";
import { JsonLd } from "@/components/JsonLd";
import { offeringListSchema, webSiteSchema } from "@/lib/seo";

// The company front door.
//
// ORDER answers a buyer's questions in the order they are actually asked:
//
//   1  Hero            who you are, with the schematic that backs the claim
//   2  LogoScroll      the trust bar, where a trust bar belongs
//   3  OfferingsTeaser what can I buy, four compact cards
//   4  StoryTeaser     why you exist, once they know what you sell
//   5  HowWeBuild      the standard, as a specification
//   6  Architecture    the one engine underneath all four systems
//   7  InsightsTeaser  proof
//   8  SocialProof     accounts by role and sector
//   9  Commitments     the terms: cost, duration, ownership
//  10  ContactBanner   the ask
//
// REMOVED in this pass: the "BUILT BEYOND" marquee band, which was decoration
// between two sections that did not need separating; the standalone production
// properties strip, whose four figures repeated claims made in full sentences
// elsewhere; and the "Four steps" engagement block, which described process
// nobody asked about. The terms worth keeping from it now open Commitments.
export default function Home() {
  return (
    <>
      <JsonLd schema={[webSiteSchema(), offeringListSchema()]} />
      <Hero />
      <OfferingsTeaser />
      <HowWeBuild />
      <Architecture />
      <Commitments />
      <InsightsTeaser />
      <StoryTeaser />
      <SocialProof />
      <ContactBanner />
    </>
  );
}
