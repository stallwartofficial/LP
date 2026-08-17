import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a demo with Stallwart and see Extrovert AI in action.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-8">
        <Contact />
      </main>
      <Footer />
    </>
  );
}
