import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseConfig } from "./config";

export async function createServerSupabaseClient() {
  if (!supabaseConfig.url || !supabaseConfig.publishableKey) {
    throw new Error("Supabase server environment variables are not configured.");
  }

  const cookieStore = await cookies();

  return createServerClient(supabaseConfig.url, supabaseConfig.publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Server Components cannot always write cookies. Middleware refreshes sessions.
        }
      },
    },
  });
}
