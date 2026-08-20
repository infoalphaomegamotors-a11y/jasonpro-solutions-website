import type { Metadata } from "next";
import Link from "next/link";
import InteriorHeader from "@/components/InteriorHeader";
import ProjectBriefForm from "@/components/ProjectBriefForm";

export const metadata: Metadata = {
  title: "Request a Quote",
  description: "Request a quotation for a defined JasonPro Solutions website, system, branding, automation, print or business project.",
};

export default function QuotePage(){return <main className="interior-page"><InteriorHeader/><section className="contact-layout"><div className="contact-intro"><span>REQUEST A QUOTE</span><h1>SCOPE FIRST.<br/>THEN A<br/><em>REAL QUOTE.</em></h1><p>Use this route when you already know enough about the required deliverables to price the work responsibly. The form asks for scope, assets, timeline and budget context so unnecessary clarification is reduced.</p><div className="contact-direct"><small>BEFORE SUBMITTING</small><span>List required pages, workflows, quantities or deliverables</span><span>Mention integrations, platforms or production specifications</span><span>State whether content and assets already exist</span><span>Note any genuinely fixed deadline</span></div><p style={{marginTop:"24px"}}><Link href="/consultation">Scope still unclear? Request a consultation →</Link></p></div><ProjectBriefForm mode="quote"/></section></main>}
