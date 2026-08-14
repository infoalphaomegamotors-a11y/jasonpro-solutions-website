import type { Metadata } from "next";
import ServiceSalesPage from "@/components/service/ServiceSalesPage";

export const metadata: Metadata = {
  title: "AI, Automation & Business Intelligence | JasonPro Solutions",
  description: "Practical AI workflows, automation and business intelligence systems designed to reduce repetitive work and improve decision visibility.",
};

export default function AiAutomationIntelligencePage(){
  return <ServiceSalesPage
    eyebrow="AI + AUTOMATION + BUSINESS INTELLIGENCE"
    title="AUTOMATE WHAT"
    accent="SHOULD NOT BE MANUAL."
    intro="JasonPro applies automation and AI to real operational bottlenecks—repetitive administration, fragmented information, slow handovers and decision gaps. The emphasis is controlled, useful automation with clear human oversight, not technology added for appearance."
    outcomes={[
      {title:"Remove repetitive work.",copy:"Identify repeatable steps that can be automated safely so people spend less time copying, chasing, sorting and re-entering information."},
      {title:"Improve response speed.",copy:"Connect triggers, notifications and structured workflows so important actions move without depending on constant manual follow-up."},
      {title:"Make information usable.",copy:"Turn operational data into dashboards, summaries and decision support that help the business understand what is happening and what needs attention."},
    ]}
    capabilities={[
      {num:"01",title:"Automation opportunity mapping",copy:"Review workflows to identify repetitive steps, handoff delays, error-prone tasks and areas where automation can create measurable operational value.",meta:"Workflow analysis · Triggers · Exceptions · Human review"},
      {num:"02",title:"AI-assisted business workflows",copy:"Use language models and structured automation where they can improve drafting, classification, summarisation, intake or decision support without removing necessary human judgement.",meta:"AI workflows · Assistants · Classification · Summarisation"},
      {num:"03",title:"Notifications + operational orchestration",copy:"Connect systems and business events to reminders, status updates and controlled actions so processes move more consistently.",meta:"Email · Scheduled jobs · Alerts · Workflow automation"},
      {num:"04",title:"Dashboards + reporting",copy:"Design role-relevant views that surface useful operational metrics, statuses and trends without overwhelming users with unnecessary charts.",meta:"Dashboards · KPI views · Reporting · Decision support"},
      {num:"05",title:"AI-enabled product features",copy:"Integrate AI into customer or internal products only where the feature has a clear purpose, safe fallback behaviour and appropriate data boundaries.",meta:"Product AI · Guardrails · Structured outputs · Human-in-the-loop"},
    ]}
    process={[
      {num:"01",title:"Find the bottleneck",copy:"Start with the slow, repetitive or error-prone business process—not with a preferred AI tool."},
      {num:"02",title:"Define control",copy:"Specify data access, user roles, exceptions, approval points and what must remain under human judgement."},
      {num:"03",title:"Prototype",copy:"Test the smallest useful automation or intelligence layer before expanding scope."},
      {num:"04",title:"Measure + improve",copy:"Monitor usefulness, failure cases and operational impact so automation remains an asset rather than hidden complexity."},
    ]}
    proof={[
      {label:"SYSTEM PRODUCT",title:"ApplyBW",copy:"ApplyBW demonstrates JasonPro’s broader approach to structured digital workflows, role-based product experiences and operational automation around a real service platform.",href:"/work/applybw"},
      {label:"INTERNAL OPERATIONS",title:"JasonPro Platform",copy:"The JasonPro platform itself combines admin operations, client workflows, project tracking, support and structured backend processes rather than relying on disconnected manual tools."},
    ]}
    fit={[
      "A business repeating the same administrative tasks across email, WhatsApp and spreadsheets.",
      "A team that needs alerts, structured handoffs or approval workflows.",
      "A company with operational data but limited visibility into what requires attention.",
      "A product that could benefit from carefully scoped AI-assisted features.",
      "An organisation that wants automation with human oversight, clear permissions and measurable purpose.",
    ]}
    ctaTitle="START WITH THE BOTTLENECK. THEN DESIGN THE AUTOMATION."
  />;
}
