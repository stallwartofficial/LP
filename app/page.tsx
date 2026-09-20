import { Hero } from "@/components/Hero";
import { ProblemSolution } from "@/components/ProblemSolution";
import { WhatWeBuild } from "@/components/WhatWeBuild";
import { StoryTeaser } from "@/components/StoryTeaser";
import { SocialProof } from "@/components/SocialProof";
import { Commitments } from "@/components/TrustLayer";
import { ContactBanner } from "@/components/ContactBanner";
import { JsonLd } from "@/components/JsonLd";
import { webSiteSchema, serviceSchema } from "@/lib/seo";

// The company front door, restructured for conversion + clarity.
//
//   1  Hero             who we are + the flip-board scope, in 5 seconds
//   2  ProblemSolution  the "that's my problem" comprehension moment
//   3  WhatWeBuild      the bento: anything AI, to production
//   4  Architecture     the engine underneath, plain + interactive
//   5  InsightsTeaser   case studies, proof it ships
//   6  Commitments      the terms: ownership, fixed price, no lock-in
//   7  SocialProof      testimonials, real names
//   8  StoryTeaser      the founder, human trust
//   9  AskAI            verify us with any AI (rare GEO signal)
//  10  ContactBanner    the close, Apple-style
export default function Home() {
  return (
    <>
      <JsonLd schema={[webSiteSchema(), serviceSchema()]} />
      <Hero />
      <ProblemSolution />
      <WhatWeBuild />
      <Commitments />
      <SocialProof />
      <StoryTeaser />
      <ContactBanner />
    </>
  );
}
