import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Story } from "@/components/Story";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Why Stallwart built Extrovert AI — the origin behind the full AI-powered CRM on autopilot.",
};

export default function StoryPage() {
  return (
    <>
      <Navbar />
      <main className="pt-8">
        <Story />
      </main>
      <Footer />
    </>
  );
}
