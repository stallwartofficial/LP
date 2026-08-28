import { createClient } from "@supabase/supabase-js";

// Server-only Supabase client using the SECRET key, so it bypasses RLS and can
// insert form submissions. NEVER import this into a client component or anything
// that ships to the browser: the secret key must stay on the server. It reads
// SUPABASE_SECRET_KEY, which deliberately has no NEXT_PUBLIC_ prefix.
export function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase env vars missing: set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY."
    );
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
