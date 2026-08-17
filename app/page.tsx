import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StoryTeaser } from "@/components/StoryTeaser";
import { OfferingsTeaser } from "@/components/OfferingsTeaser";
import { SocialProof } from "@/components/SocialProof";
import { CaseStudies } from "@/components/CaseStudies";
import { ContactBanner } from "@/components/ContactBanner";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StoryTeaser />
        <OfferingsTeaser />
        <SocialProof />
        <CaseStudies showViewAll />
        <ContactBanner />
      </main>
      <Footer />
    </>
  );
}
