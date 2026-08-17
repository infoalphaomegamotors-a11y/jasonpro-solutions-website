import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { AppRole, Profile } from "@/lib/supabase/types";

export async function getSessionProfile(): Promise<Profile | null> {
  if (!isSupabaseConfigured) return null;
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase.from("profiles").select("id,email,full_name,phone,company_name,country,role").eq("id", user.id).maybeSingle();
  return (data as Profile | null) ?? {
    id: user.id,
    email: user.email ?? null,
    full_name: null,
    phone: null,
    company_name: null,
    country: null,
    role: "customer",
  };
}

export async function requireSession(next = "/portal") {
  if (!isSupabaseConfigured) return null;
  const profile = await getSessionProfile();
  if (!profile) redirect(`/auth/sign-in?next=${encodeURIComponent(next)}`);
  return profile;
}

export async function requireRole(allowed: AppRole[], next: string) {
  const profile = await requireSession(next);
  if (!profile) return null;
  if (!allowed.includes(profile.role)) redirect("/portal?access=denied");
  return profile;
}
