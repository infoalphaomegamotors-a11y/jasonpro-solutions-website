"use server";

import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/auth/session";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type TicketState = { error?: string; success?: string };

export async function createSupportTicket(_: TicketState, formData: FormData): Promise<TicketState> {
  const profile = await requireSession("/portal");
  if (!profile) return { error: "Please sign in again." };

  const subject = String(formData.get("subject") || "").trim().slice(0, 140);
  const body = String(formData.get("body") || "").trim().slice(0, 4000);
  const projectId = String(formData.get("project_id") || "").trim();
  if (subject.length < 3 || body.length < 10) return { error: "Add a clear subject and a message of at least 10 characters." };

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("support_tickets").insert({
    user_id: profile.id,
    project_id: projectId || null,
    subject,
    body,
    priority: "normal",
    status: "open",
  });

  if (error) return { error: "Your support request could not be submitted. Please try again." };
  revalidatePath("/portal");
  return { success: "Support request submitted." };
}
