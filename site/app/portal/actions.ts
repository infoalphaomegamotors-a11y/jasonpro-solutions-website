"use server";

import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/auth/session";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type TicketState = { error?: string; success?: string };
export type ProfileState = { error?: string; success?: string };

export async function createSupportTicket(_: TicketState, formData: FormData): Promise<TicketState> {
  const profile = await requireSession("/portal");
  if (!profile) return { error: "Please sign in again." };
  const subject = String(formData.get("subject") || "").trim().slice(0, 140);
  const body = String(formData.get("body") || "").trim().slice(0, 4000);
  const projectId = String(formData.get("project_id") || "").trim();
  if (subject.length < 3 || body.length < 10) return { error: "Add a clear subject and a message of at least 10 characters." };
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("support_tickets").insert({ user_id: profile.id, project_id: projectId || null, subject, body, priority: "normal", status: "open" });
  if (error) return { error: "Your support request could not be submitted. Please try again." };
  revalidatePath("/portal");
  return { success: "Support request submitted." };
}

export async function updateProfileAction(_: ProfileState, formData: FormData): Promise<ProfileState> {
  const profile = await requireSession("/portal");
  if (!profile) return { error: "Please sign in again." };
  const fullName = String(formData.get("full_name") || "").trim().slice(0, 160);
  const phone = String(formData.get("phone") || "").trim().slice(0, 60);
  const companyName = String(formData.get("company_name") || "").trim().slice(0, 180);
  const country = String(formData.get("country") || "Botswana").trim().slice(0, 120);
  if (fullName.length < 2) return { error: "Enter your full name." };
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("profiles").update({ full_name: fullName, phone: phone || null, company_name: companyName || null, country: country || "Botswana", updated_at: new Date().toISOString() }).eq("id", profile.id);
  if (error) return { error: "Your profile could not be updated." };
  revalidatePath("/portal");
  return { success: "Profile updated." };
}
