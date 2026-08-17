import Link from "next/link";
import { PortalPrototype } from "@/components/CommerceClient";
import PortalDashboard from "@/components/portal/PortalDashboard";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { requireSession } from "@/lib/auth/session";
import { getPortalData } from "@/lib/data/portal";

export const metadata = { title: "Client Portal — JasonPro Solutions" };

export default async function PortalPage(){
  if (!isSupabaseConfigured) return <main className="portal-page"><header className="portal-header"><Link href="/">← JASONPRO SOLUTIONS</Link><span>CLIENT / MEMBER PORTAL — READY FOR CONNECTION</span></header><PortalPrototype/></main>;
  const profile = await requireSession("/portal");
  if (!profile) return null;
  const data = await getPortalData();
  return <main className="portal-page"><header className="portal-header"><Link href="/">← JASONPRO SOLUTIONS</Link><span>SECURE CLIENT / MEMBER PORTAL</span></header><PortalDashboard profile={profile} data={data}/></main>;
}
