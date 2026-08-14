import type { Metadata } from "next";
import Link from "next/link";
import InteriorHeader from "@/components/InteriorHeader";
import ProjectBriefForm from "@/components/ProjectBriefForm";

export const metadata: Metadata = {
  title: "Request a Consultation | JasonPro Solutions",
  description: "Request a JasonPro Solutions consultation to clarify a website, business system, brand, automation or digital project before scoping.",
};

export default function ConsultationPage(){return <main className="interior-page"><InteriorHeader/><section className="contact-layout"><div className="contact-intro"><span>REQUEST A CONSULTATION</span><h1>START WITH<br/>THE PROBLEM.<br/><em>NOT THE TOOL.</em></h1><p>Use this path when you know something needs to improve but the right solution is not yet clear. Describe the current situation, what is creating friction and what a better outcome should look like. JasonPro can then determine whether the next step is design, a system, automation, branding or a different approach.</p><div className="contact-direct"><small>USEFUL CONTEXT</small><span>What happens today?</span><span>Where is time or money being lost?</span><span>Who uses the current process?</span><span>What would success look like?</span></div><p style={{marginTop:"24px"}}><Link href="/services">Explore capabilities →</Link></p></div><ProjectBriefForm/></section></main>}
