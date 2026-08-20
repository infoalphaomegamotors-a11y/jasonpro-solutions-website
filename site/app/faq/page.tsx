import type { Metadata } from "next";
import Link from "next/link";
import InteriorHeader from "@/components/InteriorHeader";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers about JasonPro Solutions projects, websites, systems, branding, timelines, pricing, ownership, support and client information.",
};

const groups = [
  {
    title: "WORKING WITH JASONPRO",
    items: [
      ["What does JasonPro Solutions specialise in?","The primary offer combines web design and development, business systems and SaaS, graphic design and brand identity, practical AI/automation, business intelligence and commerce architecture. Photography, print production, administration and vehicle sourcing are supporting services rather than equal parts of the core digital positioning."],
      ["How does a new project start?","Choose the route that matches your situation. Start a Project is for a general project brief, Request a Quote is for work with a reasonably defined scope, and Request a Consultation is for a real business problem where the right solution is still unclear."],
      ["What is the best way to know whether JasonPro is a fit?","Review the relevant service page and selected work, then describe the problem and desired outcome. JasonPro is strongest where design judgement, systems thinking, production awareness and practical implementation need to work together."],
    ],
  },
  {
    title: "WEB, SYSTEMS & AUTOMATION",
    items: [
      ["Do you only build normal business websites?","No. Projects can range from a focused commercial website to authenticated web applications, client portals, dashboards, internal systems, ecommerce experiences and SaaS products. The solution should follow the job users need to complete."],
      ["Can you redesign an existing website?","Yes. A redesign can include positioning, information architecture, UX, visual design, frontend implementation and production hardening. The existing site should be audited first so useful content or functionality is not discarded without reason."],
      ["Can JasonPro build a business system from our current manual process?","Yes. The preferred approach is to map roles, records, approvals, repeated tasks, exceptions and reporting needs first, then design the system around the actual operation rather than simply digitising every manual step."],
      ["When should a process be automated?","Automation is most useful when the workflow is repeatable, the inputs and decisions are reasonably stable, and the cost of delay or manual effort can be observed. An unclear process should usually be simplified before it is automated."],
      ["Can you integrate payments or subscriptions?","Yes when they are part of an approved project, but a payment provider is selected only after account eligibility, settlement, security and production requirements are verified. JasonPro does not present an unconfigured payment prototype as a live transaction system."],
    ],
  },
  {
    title: "BRANDING, CONTENT & PRODUCTION",
    items: [
      ["Do you provide logo design only?","A standalone mark can be part of a project, but a professional identity normally needs a usable system: logo variants, typography, colour, applications and production-ready artwork. The exact scope depends on the brief."],
      ["Can JasonPro work with an existing brand?","Yes. Existing brand assets should be assessed before replacement. The goal is to preserve useful recognition, correct inconsistency and improve the parts that are limiting communication or production."],
      ["Do you handle print or custom clothing production?","JasonPro can prepare and coordinate design for print, branded apparel and related production work. Quantities, garment/material choice, artwork, proof approval and production requirements should be confirmed before quotation or manufacture."],
    ],
  },
  {
    title: "PRICING, TIMELINES & REVISIONS",
    items: [
      ["How much does a project cost?","There is no single responsible price for custom work because scope varies substantially. A focused website, a brand identity system and a multi-role SaaS platform are different engagements. The quote route collects enough context to price the defined work rather than publishing misleading one-size-fits-all figures."],
      ["How long does a project take?","Timeline depends on scope, content readiness, integrations, decision speed, review cycles, production requirements and testing. A working timeline is agreed after the scope and dependencies are understood."],
      ["How are revisions handled?","Revision stages and approval points should be defined in the project scope. Consolidated feedback from the authorised decision-maker reduces rework and prevents conflicting instructions. Material changes after approval may affect cost or delivery dates."],
      ["What happens if the scope changes?","Small clarifications may fit inside the agreed work, but new pages, workflows, integrations, deliverables or production requirements can require a revised scope, quotation or timeline. Scope changes should be made visible rather than absorbed silently."],
    ],
  },
  {
    title: "OWNERSHIP, SUPPORT & CLIENT INFORMATION",
    items: [
      ["Who owns the finished work?","Ownership and licence terms should be stated in the applicable quotation or project agreement. Client-specific deliverables can transfer or be licensed as agreed, while pre-existing JasonPro methods, reusable components and third-party licensed materials retain their existing rights unless explicitly stated otherwise."],
      ["Do you provide source files or source code?","That depends on the project agreement and the type of asset. Editable design files, software source code, licensed fonts, stock assets and reusable components should not be assumed to transfer automatically unless the scope says they do."],
      ["Do you offer maintenance after launch?","Yes where ongoing support is required. Maintenance should define what is monitored or updated, what response expectations apply, what is excluded and whether work outside the maintenance scope is quoted separately."],
      ["How are client files and project information handled?","The client portal architecture uses authenticated access and private project-file storage. Client-visible files are intended to use controlled, time-limited access rather than public storage links. Privacy and retention expectations are explained in the Privacy Notice."],
      ["Do you guarantee business results?","No. JasonPro can improve design quality, usability, workflow structure, information clarity and technical execution, but commercial outcomes also depend on factors outside the website or system. Results are not presented as guaranteed unless a specific written agreement expressly says otherwise."],
    ],
  },
];

export default function FaqPage(){
  let counter=0;
  return <main className="interior-page"><InteriorHeader/><section className="interior-hero"><span>FAQ / WORKING WITH JASONPRO</span><h1>CLARITY BEFORE<br/><em>COMMITMENT.</em></h1><p>Project decisions, scope, pricing, ownership, support and information handling—answered before they become avoidable friction.</p></section>
    <section className="faq-groups">{groups.map(group=><section key={group.title} className="faq-group"><header><span>{group.title}</span></header>{group.items.map(([q,a])=>{counter+=1;return <article key={q}><span>{String(counter).padStart(2,"0")}</span><div><h2>{q}</h2><p>{a}</p></div></article>})}</section>)}</section>
    <section className="interior-end"><small>STILL NEED TO DISCUSS IT?</small><h2>CHOOSE THE RIGHT NEXT STEP.</h2><div style={{display:"flex",gap:"10px",flexWrap:"wrap"}}><Link href="/contact">START A PROJECT →</Link><Link href="/quote">REQUEST A QUOTE →</Link><Link href="/consultation">REQUEST A CONSULTATION →</Link></div></section>
    <style>{`.faq-groups{padding:4vh 5vw 10vh;background:#f5f5f2}.faq-group{margin:0 0 70px}.faq-group>header{padding:18px 0;border-bottom:2px solid #111}.faq-group>header span{font-size:9px;letter-spacing:.18em;color:#d91f26;font-weight:800}.faq-group article{display:grid;grid-template-columns:70px minmax(0,1fr);gap:24px;padding:32px 0;border-bottom:1px solid #d4d4cf}.faq-group article>span{font-size:10px;color:#d91f26;font-weight:800}.faq-group h2{font-size:clamp(24px,3vw,44px);letter-spacing:-.04em;margin:0 0 12px}.faq-group p{max-width:850px;color:#555;line-height:1.7;margin:0}@media(max-width:560px){.faq-group article{grid-template-columns:42px 1fr;gap:12px}.faq-group{margin-bottom:52px}}`}</style>
  </main>
}
