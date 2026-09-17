import type { Metadata } from "next";
import { ThankYouContent } from "@/components/ThankYouContent";

// Post-submission page. Deliberately noindex: it is a private confirmation, not
// a landing surface, and should never appear in search.
export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return <ThankYouContent />;
}
