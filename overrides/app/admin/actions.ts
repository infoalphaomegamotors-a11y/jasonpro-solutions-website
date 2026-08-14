"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth/session";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const briefStatuses = new Set(["new","reviewing","qualified","quoted","won","lost","archived"]);
const productStatuses = new Set(["draft","active","archived"]);
const ticketStatuses = new Set(["open","in_progress","waiting_customer","resolved","closed"]);
const projectStatuses = new Set(["lead","discovery","strategy","design","development","review","launch","complete","on_hold"]);
const appRoles = new Set(["customer","member","client","content_manager","admin"]);

async function adminClient(roles: Array<"admin"|"content_manager"> = ["admin","content_manager"]) {
  const profile = await requireRole(roles, "/admin");
  if (!profile) throw new Error("Admin access required");
  return { profile, supabase: await createServerSupabaseClient() };
}

async function audit(supabase:any, actorId:string, action:string, resourceType:string, resourceId:string, metadata:Record<string,unknown>) {
  await supabase.from("audit_logs").insert({ actor_id: actorId, action, resource_type: resourceType, resource_id: resourceId, metadata });
}

export async function updateBriefStatus(formData: FormData) {
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "");
  if (!id || !briefStatuses.has(status)) return;
  const { profile, supabase } = await adminClient();
  const { error } = await supabase.from("project_briefs").update({ status }).eq("id", id);
  if (error) throw new Error("Could not update project brief");
  await audit(supabase, profile.id, "brief.status.updated", "project_brief", id, { status });
  revalidatePath("/admin");
}

export async function updateProductStatus(formData: FormData) {
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "");
  if (!id || !productStatuses.has(status)) return;
  const { profile, supabase } = await adminClient();
  const { error } = await supabase.from("products").update({ status }).eq("id", id);
  if (error) throw new Error("Could not update product");
  await audit(supabase, profile.id, "product.status.updated", "product", id, { status });
  revalidatePath("/admin");
}

export async function updateTicketStatus(formData: FormData) {
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "");
  if (!id || !ticketStatuses.has(status)) return;
  const { profile, supabase } = await adminClient();
  const { error } = await supabase.from("support_tickets").update({ status }).eq("id", id);
  if (error) throw new Error("Could not update support ticket");
  await audit(supabase, profile.id, "ticket.status.updated", "support_ticket", id, { status });
  revalidatePath("/admin");
}

export async function updateProjectStatus(formData: FormData) {
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "");
  if (!id || !projectStatuses.has(status)) return;
  const { profile, supabase } = await adminClient();
  const { error } = await supabase.from("client_projects").update({ status }).eq("id", id);
  if (error) throw new Error("Could not update project");
  await audit(supabase, profile.id, "project.status.updated", "client_project", id, { status });
  revalidatePath("/admin");
  revalidatePath("/portal");
}

export async function createClientProject(formData: FormData) {
  const clientId = String(formData.get("client_id") || "");
  const name = String(formData.get("name") || "").trim().slice(0, 160);
  const summary = String(formData.get("summary") || "").trim().slice(0, 1200);
  if (!clientId || name.length < 3) return;
  const { profile, supabase } = await adminClient();
  const { data, error } = await supabase.from("client_projects").insert({ client_id: clientId, name, summary: summary || null, status: "discovery" }).select("id").single();
  if (error || !data) throw new Error("Could not create client project");
  await audit(supabase, profile.id, "project.created", "client_project", data.id, { client_id: clientId, name });
  revalidatePath("/admin");
  revalidatePath("/portal");
}

export async function updateUserRole(formData: FormData) {
  const id = String(formData.get("id") || "");
  const role = String(formData.get("role") || "");
  if (!id || !appRoles.has(role)) return;
  const { profile, supabase } = await adminClient(["admin"]);
  if (id === profile.id) throw new Error("You cannot change your own admin role here.");
  const { error } = await supabase.from("profiles").update({ role }).eq("id", id);
  if (error) throw new Error("Could not update user role");
  await audit(supabase, profile.id, "profile.role.updated", "profile", id, { role });
  revalidatePath("/admin");
}
