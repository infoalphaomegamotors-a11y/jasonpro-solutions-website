import type { Metadata } from "next";
import Link from "next/link";
import InteriorHeader from "@/components/InteriorHeader";
import ProjectBriefForm from "@/components/ProjectBriefForm";

export const metadata: Metadata = {
  title: "Request a Consultation",
  description: "Request a JasonPro Solutions consultation to clarify a business, design, system, automation or digital problem before scoping a solution.",
};

export default function ConsultationPage(){return <main className="interior-page"><InteriorHeader/><section className="contact-layout"><div className="contact-intro"><span>REQUEST A CONSULTATION</span><h1>START WITH<br/>THE PROBLEM.<br/><em>NOT THE TOOL.</em></h1><p>Use this route when something needs to improve but the right solution is not yet clear. Describe the current process, where the friction occurs and what a better result would look like. JasonPro can then determine the most useful next step.</p><div className="contact-direct"><small>USEFUL CONTEXT</small><span>What happens today?</span><span>Where is time, money or customer confidence being lost?</span><span>Who uses or depends on the current process?</span><span>What would make the discussion successful?</span></div><p style={{marginTop:"24px"}}><Link href="/services">Explore capabilities →</Link></p></div><ProjectBriefForm mode="consultation"/></section></main>}
