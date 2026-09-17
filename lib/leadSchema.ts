import { z } from "zod";

// One schema, used on the client (before submit) and inside the Server Action
// (the untrusted entry point). Keep the two in sync by importing this in both.
export const leadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Enter a valid email").max(320),
  company: z.string().trim().min(1, "Company is required").max(200),
  teamSize: z.string().max(50).optional().default(""),
  interest: z.string().max(200).optional().default(""),
  message: z.string().max(5000).optional().default(""),
  // Marketing attribution, captured from the URL (utm_source, utm_medium, ...).
  utm: z.record(z.string(), z.string()).optional().default({}),
  // The path the lead submitted from, for context in the notification.
  page: z.string().max(500).optional().default(""),
});

export type LeadInput = z.infer<typeof leadSchema>;
