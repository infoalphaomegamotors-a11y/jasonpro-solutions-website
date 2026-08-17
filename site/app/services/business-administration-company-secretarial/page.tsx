import type { Metadata } from "next";
import ServiceSalesPage from "@/components/service/ServiceSalesPage";

export const metadata: Metadata = {
  title: "Business Administration & Company Secretarial Support | JasonPro Solutions",
  description: "Structured business administration and company secretarial support for records, documents, recurring filings and operational organisation.",
};

export default function BusinessAdministrationPage(){
  return <ServiceSalesPage
    eyebrow="BUSINESS ADMINISTRATION + COMPANY SECRETARIAL SUPPORT"
    title="KEEP THE BUSINESS"
    accent="ORGANISED."
    intro="JasonPro supports businesses with structured administration, document organisation and recurring company-secretarial workflows. The service is designed to reduce avoidable disorder around records, deadlines, forms and business documents while keeping regulated legal, accounting and tax advice within the appropriate professional scope."
    outcomes={[
      {title:"Reduce administrative drift.",copy:"Create repeatable structures for records, documents and recurring business tasks instead of rebuilding the process each time."},
      {title:"Improve document readiness.",copy:"Keep common business information and supporting records organised so routine applications, updates and submissions are easier to prepare."},
      {title:"Create clearer responsibilities.",copy:"Define what information is required, who supplies it and what step comes next so administrative work does not depend on memory alone."},
    ]}
    capabilities={[
      {num:"01",title:"Business records + document organisation",copy:"Structure company records, recurring documents and administrative information so they are easier to retrieve and maintain.",meta:"Registers · Document sets · Filing structures · Templates"},
      {num:"02",title:"Company secretarial administration",copy:"Support routine company-secretarial preparation and administrative follow-through within the scope of the service, with specialist legal or accounting matters referred where necessary.",meta:"Administrative support · Company records · Routine updates"},
      {num:"03",title:"Application + form preparation support",copy:"Help organise information and supporting documents for recurring business or regulatory application processes without presenting the service as legal advice.",meta:"Checklists · Supporting documents · Form preparation"},
      {num:"04",title:"Operational templates + admin systems",copy:"Create practical templates, trackers and lightweight systems that reduce repeated manual administration inside the business.",meta:"Templates · Trackers · Workflow support · Document systems"},
    ]}
    process={[
      {num:"01",title:"Scope",copy:"Define the administrative task, required records and any specialist advice that falls outside JasonPro’s role."},
      {num:"02",title:"Collect",copy:"Create a clear checklist and organise the information or documents needed for the task."},
      {num:"03",title:"Prepare",copy:"Structure the documents, forms, records or administrative workflow for review and submission."},
      {num:"04",title:"Maintain",copy:"Where appropriate, establish a reusable record or reminder system so the next cycle is easier to manage."},
    ]}
    fit={[
      "A small business that needs better administrative organisation.",
      "A company preparing recurring forms, records or supporting documents.",
      "A founder who needs templates and repeatable business-document workflows.",
      "An organisation that wants administrative support connected to a broader digital system.",
      "A business that understands specialist legal, tax and accounting advice may require separate qualified professionals.",
    ]}
    ctaTitle="TURN REPEATED ADMIN INTO A CONTROLLED PROCESS."
  />;
}
