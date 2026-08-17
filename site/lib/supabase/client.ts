import { createClient } from "@supabase/supabase-js";
import { supabaseConfig } from "./config";

export function createBrowserSupabaseClient() {
  if (!supabaseConfig.url || !supabaseConfig.publishableKey) {
    throw new Error("Supabase browser environment variables are not configured.");
  }
  return createClient(supabaseConfig.url, supabaseConfig.publishableKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
  });
}
