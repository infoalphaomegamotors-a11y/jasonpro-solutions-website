"use server";

import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type BriefState = { status: "idle" | "success" | "error"; message?: string };

function text(formData: FormData, key: string, max = 10000) {
  return String(formData.get(key) ?? "").trim().slice(0, max);
}

function line(label: string, value: string) {
  return value ? `${label}: ${value}` : "";
}

export async function submitProjectBrief(_state: BriefState, formData: FormData): Promise<BriefState> {
  if (!isSupabaseConfigured) return { status: "error", message: "Project submission is temporarily unavailable. Please use the direct email or phone contact for now." };
  if (text(formData, "website", 200)) return { status: "success", message: "Thank you." }; // honeypot

  const full_name = text(formData, "name", 160);
  const email = text(formData, "email", 320).toLowerCase();
  const phone = text(formData, "phone", 60) || null;
  const company_name = text(formData, "company", 200) || null;
  const service = text(formData, "service", 160);
  const budget_range = text(formData, "budget", 160) || null;
  const timeline = text(formData, "timeline", 160) || null;
  const briefInput = text(formData, "brief", 8500);
  const intent = text(formData, "intent", 40) || "project";
  const privacyConsent = text(formData, "privacy_consent", 20);

  if (full_name.length < 2 || !email.includes("@") || service.length < 2 || briefInput.length < 20 || privacyConsent !== "yes") {
    return { status: "error", message: "Please complete your name, email, service, a useful brief and the privacy consent field." };
  }

  const structuredContext = [
    `ENQUIRY TYPE: ${intent.toUpperCase()}`,
    line("PROJECT STAGE", text(formData, "project_stage", 200)),
    line("EXISTING WEBSITE / SYSTEM", text(formData, "existing_url", 500)),
    line("ASSETS / CONTENT STATUS", text(formData, "assets_status", 200)),
    line("CONSULTATION METHOD", text(formData, "consultation_method", 200)),
    line("PREFERRED DATE / TIME", text(formData, "preferred_time", 200)),
    line("REFERRAL SOURCE", text(formData, "referral_source", 200)),
  ].filter(Boolean).join("\n");

  const brief = `${briefInput}\n\n--- STRUCTURED ENQUIRY CONTEXT ---\n${structuredContext}`.slice(0, 10000);
  const source = `website:${intent}`.slice(0, 120);

  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { error } = await supabase.from("project_briefs").insert({
    user_id: user?.id ?? null,
    full_name, email, phone, company_name, service, budget_range, timeline, brief, source, status: "new",
  });

  if (error) {
    console.error("Project brief insert failed", { code: error.code });
    return { status: "error", message: "I couldn't submit the brief right now. Please use the direct email or phone contact and try again later." };
  }
  return { status: "success", message: intent === "quote" ? "Quotation request received. JasonPro can now review the scope and follow up." : intent === "consultation" ? "Consultation request received. JasonPro can now review the context and follow up." : "Brief received. JasonPro can now review the project requirements and follow up." };
}
