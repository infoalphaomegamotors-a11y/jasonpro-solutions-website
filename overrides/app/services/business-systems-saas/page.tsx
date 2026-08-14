import type { Metadata } from "next";
import ServiceSalesPage from "@/components/service/ServiceSalesPage";

export const metadata: Metadata = {
  title: "Business Systems, SaaS & Automation | JasonPro Solutions",
  description: "Custom portals, dashboards, SaaS products and workflow systems designed to reduce manual work and improve operational control.",
};

export default function BusinessSystemsPage(){
  return <ServiceSalesPage
    eyebrow="BUSINESS SYSTEMS + SAAS + AUTOMATION"
    title="TURN MANUAL WORK"
    accent="INTO A SYSTEM."
    intro="JasonPro designs and builds business systems for operations that have outgrown spreadsheets, WhatsApp-only coordination, repeated admin and disconnected tools. The goal is not software for its own sake—it is a clearer workflow, better visibility and a platform the business can actually operate and scale."
    outcomes={[
      {title:"Reduce repeated admin.",copy:"Move recurring tasks, handovers, status checks and fragmented records into structured workflows that are easier to manage."},
      {title:"See the operation clearly.",copy:"Give the right people dashboards, statuses and records so decisions are based on the current state of the business rather than scattered messages."},
      {title:"Create reusable infrastructure.",copy:"Build a system that can support clients, staff, products, reporting, automation and future integrations instead of restarting from scratch as the business grows."},
    ]}
    capabilities={[
      {num:"01",title:"Workflow + operations mapping",copy:"Document how work currently moves, where information is duplicated, where delays occur and which steps should stay human versus become automated.",meta:"Process mapping · Roles · States · Exceptions · Controls"},
      {num:"02",title:"Dashboards + internal systems",copy:"Create secure operational interfaces for records, approvals, tasks, status management and reporting tailored to how the organisation actually works.",meta:"Admin systems · Dashboards · Operational data · Role access"},
      {num:"03",title:"Client + member portals",copy:"Give customers or clients a controlled space for projects, files, invoices, support, downloads, entitlements or service status instead of handling everything manually.",meta:"Client portals · Memberships · Files · Billing visibility"},
      {num:"04",title:"SaaS product development",copy:"Take a repeatable service or workflow and structure it as a web-based product with authentication, multi-role access, subscriptions or usage logic where appropriate.",meta:"SaaS architecture · Auth · Multi-role systems · Product workflows"},
      {num:"05",title:"Automation + business intelligence",copy:"Connect repetitive processes to safe automation and surface useful business information without pretending every process should be automated or AI-driven.",meta:"Automation · Notifications · Reporting · Decision support"},
    ]}
    process={[
      {num:"01",title:"Map",copy:"Define users, current workflow, data, bottlenecks, approvals, exceptions and the cost of the existing process."},
      {num:"02",title:"Model",copy:"Translate the operation into roles, permissions, statuses, records, business rules and measurable system outcomes."},
      {num:"03",title:"Prototype",copy:"Design the critical screens and workflows before committing to full implementation complexity."},
      {num:"04",title:"Build + control",copy:"Implement, secure, test and document the system so operations remain understandable after launch."},
    ]}
    proof={[
      {label:"EMPLOYMENT PLATFORM",title:"ApplyBW",copy:"A multi-role job and career platform combining authenticated dashboards, applications, documents, subscriptions and operational administration.",href:"/work/applybw"},
      {label:"CLIENT OPERATIONS",title:"JasonPro Client System",copy:"JasonPro’s own platform includes role-based administration, project delivery, milestones, invoices, private files, support tickets and account management."},
    ]}
    fit={[
      "A business running important workflows through spreadsheets, calls and WhatsApp threads.",
      "A service company that needs a client portal or controlled document workflow.",
      "A founder turning a repeatable service into a SaaS or subscription product.",
      "An organisation that needs role-based dashboards and better operational visibility.",
      "A team that wants automation applied selectively to real bottlenecks rather than added for appearance.",
    ]}
    ctaTitle="DESIGN THE OPERATION BEFORE AUTOMATING IT."
  />;
}
