import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/portal";
  const authError = searchParams.get("error_description") || searchParams.get("error");

  if (authError) {
    const url = new URL("/auth/sign-in", origin);
    url.searchParams.set("error", authError);
    return NextResponse.redirect(url);
  }

  if (code && isSupabaseConfigured) {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      const url = new URL("/auth/sign-in", origin);
      url.searchParams.set("error", "Authentication link could not be completed. Please sign in again.");
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.redirect(`${origin}${next.startsWith("/") ? next : "/portal"}`);
}
