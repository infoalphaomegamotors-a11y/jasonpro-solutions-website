import { createServerSupabaseClient } from "@/lib/supabase/server";

export type PortalData = {
  projects: Array<{ id: string; name: string; status: string; summary: string | null; target_launch_date: string | null }>;
  milestones: Array<{ id: string; project_id: string; title: string; status: string; position: number; due_at: string | null }>;
  files: Array<{ id: string; project_id: string; file_name: string; mime_type: string | null; created_at: string }>;
  invoices: Array<{ id: string; invoice_number: string; status: string; currency: string; total_amount: number; amount_paid: number; due_at: string | null }>;
  tickets: Array<{ id: string; subject: string; status: string; priority: string; created_at: string }>;
};

export async function getPortalData(): Promise<PortalData> {
  const supabase = await createServerSupabaseClient();
  const [projects, milestones, files, invoices, tickets] = await Promise.all([
    supabase.from("client_projects").select("id,name,status,summary,target_launch_date").order("created_at", { ascending: false }),
    supabase.from("project_milestones").select("id,project_id,title,status,position,due_at").order("position"),
    supabase.from("project_files").select("id,project_id,file_name,mime_type,created_at").order("created_at", { ascending: false }).limit(50),
    supabase.from("invoices").select("id,invoice_number,status,currency,total_amount,amount_paid,due_at").order("created_at", { ascending: false }),
    supabase.from("support_tickets").select("id,subject,status,priority,created_at").order("created_at", { ascending: false }).limit(50),
  ]);

  return {
    projects: (projects.data ?? []) as PortalData["projects"],
    milestones: (milestones.data ?? []) as PortalData["milestones"],
    files: (files.data ?? []) as PortalData["files"],
    invoices: (invoices.data ?? []) as PortalData["invoices"],
    tickets: (tickets.data ?? []) as PortalData["tickets"],
  };
}
