import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { Offerings } from "@/components/Offerings";
import { SocialProof } from "@/components/SocialProof";
import { CaseStudies } from "@/components/CaseStudies";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Story />
        <Offerings />
        <SocialProof />
        <CaseStudies />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
