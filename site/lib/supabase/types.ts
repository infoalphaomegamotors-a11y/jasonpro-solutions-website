export type AppRole = "customer" | "member" | "client" | "content_manager" | "admin";
export type OrderStatus = "draft" | "pending" | "confirmed" | "paid" | "fulfilled" | "cancelled" | "refunded";
export type ProjectStatus = "lead" | "discovery" | "strategy" | "design" | "development" | "review" | "launch" | "complete" | "on_hold";

export type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  phone: string | null;
  company_name: string | null;
  country: string | null;
  role: AppRole;
};

export type AdminSnapshot = {
  products: number | null;
  orders: number | null;
  briefs: number | null;
  activeProjects: number | null;
  members: number | null;
  source: "supabase" | "unconfigured";
};
