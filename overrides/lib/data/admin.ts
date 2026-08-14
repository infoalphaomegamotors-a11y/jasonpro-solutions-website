import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { AdminSnapshot } from "@/lib/supabase/types";

export type AdminOperationsData = {
  products: Array<{ id:string; name:string; category:string; status:string; price_label:string|null }>;
  briefs: Array<{ id:string; full_name:string; email:string; service:string; status:string; created_at:string }>;
  tickets: Array<{ id:string; subject:string; status:string; priority:string; created_at:string }>;
};

async function count(table: string, filters?: (q: any) => any) {
  const supabase = await createServerSupabaseClient();
  let query: any = supabase.from(table).select("*", { count: "exact", head: true });
  if (filters) query = filters(query);
  const { count, error } = await query;
  if (error) return null;
  return count ?? 0;
}

export async function getAdminSnapshot(): Promise<AdminSnapshot> {
  const [products, orders, briefs, activeProjects, members] = await Promise.all([
    count("products"), count("orders"), count("project_briefs"),
    count("client_projects", q => q.not("status", "in", "(complete,on_hold)")),
    count("memberships", q => q.eq("status", "active")),
  ]);
  return { products, orders, briefs, activeProjects, members, source: "supabase" };
}

export async function getAdminOperationsData(): Promise<AdminOperationsData> {
  const supabase = await createServerSupabaseClient();
  const [products, briefs, tickets] = await Promise.all([
    supabase.from("products").select("id,name,category,status,price_label").order("created_at", { ascending:false }).limit(50),
    supabase.from("project_briefs").select("id,full_name,email,service,status,created_at").order("created_at", { ascending:false }).limit(50),
    supabase.from("support_tickets").select("id,subject,status,priority,created_at").order("created_at", { ascending:false }).limit(50),
  ]);
  return {
    products: (products.data ?? []) as AdminOperationsData["products"],
    briefs: (briefs.data ?? []) as AdminOperationsData["briefs"],
    tickets: (tickets.data ?? []) as AdminOperationsData["tickets"],
  };
}
