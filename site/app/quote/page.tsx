import type { Metadata } from "next";
import Link from "next/link";
import InteriorHeader from "@/components/InteriorHeader";
import ProjectBriefForm from "@/components/ProjectBriefForm";

export const metadata: Metadata = {
  title: "Request a Quote | JasonPro Solutions",
  description: "Request a quotation for a JasonPro Solutions website, business system, branding, automation or digital project.",
};

export default function QuotePage(){return <main className="interior-page"><InteriorHeader/><section className="contact-layout"><div className="contact-intro"><span>REQUEST A QUOTE</span><h1>SCOPE FIRST.<br/>THEN A<br/><em>REAL QUOTE.</em></h1><p>A useful quotation needs enough information to understand the work. Describe the business problem, required outcome, known functionality, timeline and any budget context. If scope is still unclear, choose “I want to discuss options first” in the form.</p><div className="contact-direct"><small>BEFORE SUBMITTING</small><span>Include required pages or workflows</span><span>Mention existing systems or integrations</span><span>State whether content/assets already exist</span><span>Note any deadline that is genuinely fixed</span></div><p style={{marginTop:"24px"}}><Link href="/faq">Read common project questions →</Link></p></div><ProjectBriefForm/></section></main>}
