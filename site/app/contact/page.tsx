import type { Metadata } from "next";
import Link from "next/link";
import InteriorHeader from "@/components/InteriorHeader";
import ProjectBriefForm from "@/components/ProjectBriefForm";

export const metadata: Metadata = {
  title: "Start a Project",
  description: "Start a JasonPro Solutions project for a website, business system, brand, automation, data solution or related business challenge.",
};

export default function ContactPage(){return <main className="interior-page"><InteriorHeader/><section className="contact-layout"><div className="contact-intro"><span>START A PROJECT</span><h1>TELL US WHAT<br/>YOU&apos;RE TRYING<br/><em>TO IMPROVE.</em></h1><p>Start with the business problem, the desired outcome and what is getting in the way today. JasonPro will use that context to determine the right design, system, creative or operational response.</p><div style={{display:"grid",gridTemplateColumns:"1fr",gap:"10px",margin:"28px 0"}}><Link href="/quote" style={{border:"1px solid #ccc",padding:"16px",fontSize:"10px",letterSpacing:".1em"}}>DEFINED SCOPE? REQUEST A QUOTATION →</Link><Link href="/consultation" style={{border:"1px solid #ccc",padding:"16px",fontSize:"10px",letterSpacing:".1em"}}>NOT SURE WHAT YOU NEED? REQUEST A CONSULTATION →</Link><Link href="/faq" style={{border:"1px solid #ccc",padding:"16px",fontSize:"10px",letterSpacing:".1em"}}>QUESTIONS FIRST? READ THE FAQ →</Link></div><div className="contact-direct"><small>DIRECT CONTACT</small><a href="mailto:Marupingjason@gmail.com">Marupingjason@gmail.com</a><a href="tel:+26776534997">+267 76534997</a><a href="https://wa.me/26776534997" target="_blank" rel="noreferrer">WhatsApp: +267 76534997</a><span>Gaborone, Botswana</span></div></div><ProjectBriefForm mode="project"/></section></main>}
