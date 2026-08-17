"use server";

import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type BriefState = { status: "idle" | "success" | "error"; message?: string };

function text(formData: FormData, key: string, max = 10000) {
  return String(formData.get(key) ?? "").trim().slice(0, max);
}

export async function submitProjectBrief(_state: BriefState, formData: FormData): Promise<BriefState> {
  if (!isSupabaseConfigured) return { status: "error", message: "Project submission is ready in code but the database is not connected yet. Please use the direct email or phone contact for now." };
  if (text(formData, "website", 200)) return { status: "success", message: "Thank you." }; // honeypot

  const full_name = text(formData, "name", 160);
  const email = text(formData, "email", 320).toLowerCase();
  const phone = text(formData, "phone", 60) || null;
  const company_name = text(formData, "company", 200) || null;
  const service = text(formData, "service", 160);
  const budget_range = text(formData, "budget", 160) || null;
  const timeline = text(formData, "timeline", 160) || null;
  const brief = text(formData, "brief", 10000);

  if (full_name.length < 2 || !email.includes("@") || service.length < 2 || brief.length < 20) {
    return { status: "error", message: "Please complete your name, email, service and a useful project brief of at least 20 characters." };
  }

  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { error } = await supabase.from("project_briefs").insert({
    user_id: user?.id ?? null,
    full_name, email, phone, company_name, service, budget_range, timeline, brief, source: "website", status: "new",
  });

  if (error) {
    console.error("Project brief insert failed", { code: error.code });
    return { status: "error", message: "I couldn't submit the brief right now. Please use the direct email or phone contact and try again later." };
  }
  return { status: "success", message: "Brief received. JasonPro can now review the project requirements and follow up with you." };
}
