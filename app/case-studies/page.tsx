import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CaseStudies } from "@/components/CaseStudies";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "How sales teams in SaaS, agencies, and the SMB market use Extrovert AI to close more without doing more.",
};

export default function CaseStudiesIndexPage() {
  return (
    <>
      <Navbar />
      <main className="pt-8">
        <CaseStudies />
      </main>
      <Footer />
    </>
  );
}
