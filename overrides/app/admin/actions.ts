"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth/session";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const briefStatuses = new Set(["new","reviewing","qualified","quoted","won","lost","archived"]);
const productStatuses = new Set(["draft","active","archived"]);
const ticketStatuses = new Set(["open","in_progress","waiting_customer","resolved","closed"]);

async function adminClient() {
  const profile = await requireRole(["admin","content_manager"], "/admin");
  if (!profile) throw new Error("Admin access required");
  return { profile, supabase: await createServerSupabaseClient() };
}

export async function updateBriefStatus(formData: FormData) {
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "");
  if (!id || !briefStatuses.has(status)) return;
  const { profile, supabase } = await adminClient();
  const { error } = await supabase.from("project_briefs").update({ status }).eq("id", id);
  if (error) throw new Error("Could not update project brief");
  await supabase.from("audit_logs").insert({ actor_id: profile.id, action: "brief.status.updated", resource_type: "project_brief", resource_id: id, metadata: { status } });
  revalidatePath("/admin");
}

export async function updateProductStatus(formData: FormData) {
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "");
  if (!id || !productStatuses.has(status)) return;
  const { profile, supabase } = await adminClient();
  const { error } = await supabase.from("products").update({ status }).eq("id", id);
  if (error) throw new Error("Could not update product");
  await supabase.from("audit_logs").insert({ actor_id: profile.id, action: "product.status.updated", resource_type: "product", resource_id: id, metadata: { status } });
  revalidatePath("/admin");
}

export async function updateTicketStatus(formData: FormData) {
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "");
  if (!id || !ticketStatuses.has(status)) return;
  const { profile, supabase } = await adminClient();
  const { error } = await supabase.from("support_tickets").update({ status }).eq("id", id);
  if (error) throw new Error("Could not update support ticket");
  await supabase.from("audit_logs").insert({ actor_id: profile.id, action: "ticket.status.updated", resource_type: "support_ticket", resource_id: id, metadata: { status } });
  revalidatePath("/admin");
}
