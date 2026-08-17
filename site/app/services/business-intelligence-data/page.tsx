import type { Metadata } from "next";
import ServiceSalesPage from "@/components/service/ServiceSalesPage";

export const metadata: Metadata = {
  title: "Business Intelligence & Data | JasonPro Solutions",
  description: "Operational dashboards, reporting systems and decision-support views that turn business data into clearer action.",
};

export default function BusinessIntelligenceDataPage(){
  return <ServiceSalesPage
    eyebrow="BUSINESS INTELLIGENCE + DATA"
    title="TURN BUSINESS DATA"
    accent="INTO DECISIONS."
    intro="JasonPro designs reporting and information systems that help businesses understand what is happening without drowning in disconnected spreadsheets. The emphasis is on useful operational visibility: the right measures, the right context and the right level of detail for the person making the decision."
    outcomes={[
      {title:"See what matters.",copy:"Bring important operational information into one structured view instead of searching through separate files and message threads."},
      {title:"Reduce reporting friction.",copy:"Standardise recurring reporting so teams spend less time manually rebuilding the same summaries."},
      {title:"Support better decisions.",copy:"Present status, trends and exceptions in a way that helps users identify what needs attention rather than just displaying more charts."},
    ]}
    capabilities={[
      {num:"01",title:"KPI + reporting design",copy:"Define useful measures, reporting cadence and decision context before building dashboards around arbitrary metrics.",meta:"KPIs · Operational measures · Reporting logic · Data quality"},
      {num:"02",title:"Operational dashboards",copy:"Build role-relevant dashboards for sales, projects, customers, services or internal operations using the data the business actually maintains.",meta:"Dashboards · Status views · Filters · Drill-down"},
      {num:"03",title:"Management reporting systems",copy:"Structure recurring business reports so they can be generated and reviewed more consistently over time.",meta:"Recurring reports · Summaries · Management views"},
      {num:"04",title:"Data workflow improvement",copy:"Reduce duplicate capture, inconsistent fields and disconnected records before attempting advanced analytics.",meta:"Data structures · Validation · Workflow cleanup"},
    ]}
    process={[
      {num:"01",title:"Define",copy:"Identify the decisions the business needs to make and the information required to make them."},
      {num:"02",title:"Clean",copy:"Review where the data comes from, how reliable it is and which definitions need standardisation."},
      {num:"03",title:"Design",copy:"Create the reporting hierarchy, dashboard views and exception states around real users and decisions."},
      {num:"04",title:"Control",copy:"Establish ownership, review cadence and improvement rules so the reporting system remains useful."},
    ]}
    fit={[
      "A business with operational data spread across multiple spreadsheets or systems.",
      "A manager who needs clear status visibility without manually assembling reports.",
      "A team that wants consistent KPI definitions before investing in advanced analytics.",
      "An organisation that needs dashboards connected to real operational workflows.",
    ]}
    ctaTitle="MEASURE WHAT HELPS THE BUSINESS ACT."
  />;
}
