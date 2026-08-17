import type { Metadata } from "next";
import Link from "next/link";
import InteriorHeader from "@/components/InteriorHeader";
import ProjectBriefForm from "@/components/ProjectBriefForm";

export const metadata: Metadata = {
  title: "Start a Project | JasonPro Solutions",
  description: "Start a JasonPro Solutions project, request a quote or discuss a website, system, brand, automation or digital business challenge.",
};

export default function ContactPage(){return <main className="interior-page"><InteriorHeader/><section className="contact-layout"><div className="contact-intro"><span>START A PROJECT</span><h1>TELL ME WHAT<br/>YOU&apos;RE TRYING<br/><em>TO BUILD.</em></h1><p>Give me the business problem, the goal and what success should look like. We can work out the right solution from there.</p><div style={{display:"grid",gridTemplateColumns:"1fr",gap:"10px",margin:"28px 0"}}><Link href="/quote" style={{border:"1px solid #ccc",padding:"16px",fontSize:"10px",letterSpacing:".1em"}}>I NEED A QUOTATION →</Link><Link href="/consultation" style={{border:"1px solid #ccc",padding:"16px",fontSize:"10px",letterSpacing:".1em"}}>I NEED TO DISCUSS THE RIGHT SOLUTION →</Link><Link href="/faq" style={{border:"1px solid #ccc",padding:"16px",fontSize:"10px",letterSpacing:".1em"}}>I HAVE QUESTIONS FIRST →</Link></div><div className="contact-direct"><small>DIRECT CONTACT</small><a href="mailto:Marupingjason@gmail.com">Marupingjason@gmail.com</a><a href="tel:+26776534997">+267 76534997</a><span>Gaborone, Botswana</span></div></div><ProjectBriefForm/></section></main>}
