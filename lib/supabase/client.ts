import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Browser Supabase client using the PUBLIC anon key. This is safe to ship to the
// browser: the anon key is publishable, and Row Level Security limits it to the
// single INSERT policy on `career_applications` (no SELECT/UPDATE/DELETE). It
// reads NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.
//
// NEVER use the secret key here — that lives only in lib/supabase/server.ts,
// which must not be imported into any client component.

// Minimal typed schema for the one table this client touches, so inserts are
// type-checked. created_at, id, and status are set by table defaults and are
// never sent from the browser.
export type Database = {
  public: {
    Tables: {
      career_applications: {
        Row: {
          id: number;
          created_at: string;
          name: string;
          email: string;
          linkedin_url: string | null;
          github_url: string | null;
          project_description: string;
          status: string;
        };
        Insert: {
          name: string;
          email: string;
          linkedin_url?: string | null;
          github_url?: string | null;
          project_description: string;
        };
        Update: {
          name?: string;
          email?: string;
          linkedin_url?: string | null;
          github_url?: string | null;
          project_description?: string;
          status?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

let client: SupabaseClient<Database> | null = null;

export function supabaseBrowser(): SupabaseClient<Database> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase env vars missing: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }
  // Reuse one instance across submissions.
  client ??= createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
