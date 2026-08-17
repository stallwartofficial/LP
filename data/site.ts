export const site = {
  company: "Stallwart",
  product: "Extrovert AI",
  tagline: "Built Beyond.",
  productDescriptor: "The Full AI-Powered CRM on Autopilot",
  domain: "https://stallwart.in",
  description:
    "Stallwart builds Extrovert AI — a full AI-powered CRM that captures, scores, and follows up on every lead automatically, so sales teams close more without doing more.",
  contact: {
    email: "hello@stallwart.in", // placeholder — swap with real inbox
    phone: "+1 (000) 000-0000", // placeholder
    address: "Address on file — contact us for details", // placeholder
  },
  cta: {
    primary: "Book a Demo",
  },
  social: {
    linkedin: "https://linkedin.com/company/stallwart", // placeholder
    twitter: "https://twitter.com/stallwart", // placeholder
  },
} as const;

export const navLinks = [
  { label: "Our Story", href: "/story" },
  { label: "What We Offer", href: "/offer" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;
