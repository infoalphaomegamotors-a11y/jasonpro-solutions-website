import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { requireRole } from "@/lib/auth/session";
import { getAdminOperationsData, getAdminSnapshot } from "@/lib/data/admin";
import type { AdminOperationsData } from "@/lib/data/admin";
import { unconfiguredAdminSnapshot } from "@/lib/supabase/adminSnapshot";

export const metadata = { title: "Admin — JasonPro Solutions" };

const unconfiguredOperations: AdminOperationsData = {
  products: [],
  briefs: [],
  tickets: [],
  profiles: [],
  projects: [],
  milestones: [],
  invoices: [],
  files: [],
  portfolio: [],
};

export default async function AdminPage() {
  if (!isSupabaseConfigured) {
    return (
      <main className="admin-page">
        <AdminDashboard
          snapshot={unconfiguredAdminSnapshot}
          operations={unconfiguredOperations}
          profile={null}
          configured={false}
        />
      </main>
    );
  }

  const profile = await requireRole(["admin", "content_manager"], "/admin");
  if (!profile) return null;

  const [snapshot, operations] = await Promise.all([
    getAdminSnapshot(),
    getAdminOperationsData(),
  ]);

  return (
    <main className="admin-page">
      <AdminDashboard
        snapshot={snapshot}
        operations={operations}
        profile={profile}
        configured
      />
    </main>
  );
}
