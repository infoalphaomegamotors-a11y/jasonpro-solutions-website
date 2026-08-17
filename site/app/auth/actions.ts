"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export type AuthState = { error?: string; success?: string };
export type SignUpState = { error?: string; success?: string };

const productionSiteUrl = "https://jasonpro-solutions-2026.netlify.app";
function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || productionSiteUrl).replace(/\/$/, "");
}

export async function signInAction(_state: AuthState, formData: FormData): Promise<AuthState> {
  if (!isSupabaseConfigured) return { error: "Authentication is not connected yet." };
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/portal");
  if (!email || !password) return { error: "Enter your email address and password." };
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "Sign-in failed. Check your credentials and try again." };
  redirect(next.startsWith("/") ? next : "/portal");
}

export async function signOutAction() {
  if (isSupabaseConfigured) {
    const supabase = await createServerSupabaseClient();
    await supabase.auth.signOut();
  }
  redirect("/");
}

export async function signUpAction(_state: SignUpState, formData: FormData): Promise<SignUpState> {
  if (!isSupabaseConfigured) return { error: "Account creation is not connected yet." };
  const fullName = String(formData.get("full_name") ?? "").trim().slice(0, 160);
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (fullName.length < 2 || !email.includes("@") || password.length < 8) {
    return { error: "Enter your name, a valid email address and a password of at least 8 characters." };
  }
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${siteUrl()}/auth/callback?next=/portal`,
    },
  });
  if (error) return { error: error.message || "Account creation failed. Please try again." };
  if (data.session) redirect("/portal");
  return { success: "Account created. Check your email and confirm your address before signing in." };
}

export async function requestPasswordResetAction(_state: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!email.includes("@")) return { error: "Enter a valid email address." };
  if (!isSupabaseConfigured) return { error: "Password recovery is not connected yet." };
  const supabase = await createServerSupabaseClient();
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl()}/auth/callback?next=/auth/update-password`,
  });
  return { success: "If an account exists for that email, a secure password-reset link has been sent." };
}

export async function updatePasswordAction(_state: AuthState, formData: FormData): Promise<AuthState> {
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirm_password") ?? "");
  if (password.length < 8) return { error: "Use a password of at least 8 characters." };
  if (password !== confirmPassword) return { error: "The passwords do not match." };
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Your recovery session is missing or has expired. Request a new reset link." };
  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: "Password could not be updated. Request a new reset link and try again." };
  return { success: "Password updated successfully. You can continue using your account." };
}
