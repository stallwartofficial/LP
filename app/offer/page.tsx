import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Offerings } from "@/components/Offerings";

export const metadata: Metadata = {
  title: "What We Offer",
  description:
    "Extrovert AI runs the full lead lifecycle on autopilot: capture, scoring, follow-up, and re-engagement.",
};

export default function OfferPage() {
  return (
    <>
      <Navbar />
      <main className="pt-8">
        <Offerings />
      </main>
      <Footer />
    </>
  );
}
