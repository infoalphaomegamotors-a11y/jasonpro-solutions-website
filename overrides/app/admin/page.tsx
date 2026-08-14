import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { requireRole } from "@/lib/auth/session";
import { getAdminOperationsData, getAdminSnapshot } from "@/lib/data/admin";
import { unconfiguredAdminSnapshot } from "@/lib/supabase/adminSnapshot";

export const metadata = { title: "Admin — JasonPro Solutions" };

export default async function AdminPage() {
  if (!isSupabaseConfigured) return <main className="admin-page"><AdminDashboard snapshot={unconfiguredAdminSnapshot} operations={{ products:[], briefs:[], tickets:[] }} profile={null} configured={false}/></main>;
  const profile = await requireRole(["admin", "content_manager"], "/admin");
  if (!profile) return null;
  const [snapshot, operations] = await Promise.all([getAdminSnapshot(), getAdminOperationsData()]);
  return <main className="admin-page"><AdminDashboard snapshot={snapshot} operations={operations} profile={profile} configured/></main>;
}
