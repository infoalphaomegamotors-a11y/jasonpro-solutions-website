import type { Metadata } from "next";
import ServiceSalesPage from "@/components/service/ServiceSalesPage";

export const metadata: Metadata = {
  title: "Web Design & Development | JasonPro Solutions",
  description: "Premium websites, web applications and digital experiences designed around trust, usability, performance and conversion.",
};

export default function WebDesignDevelopmentPage(){
  return <ServiceSalesPage
    eyebrow="WEB DESIGN + DEVELOPMENT"
    title="BUILD A WEBSITE"
    accent="THAT EARNS TRUST."
    intro="JasonPro combines visual design, UX, frontend engineering and business thinking to create websites and web applications that do more than look polished. The objective is a digital experience that communicates value clearly, works across devices, performs reliably and gives visitors a reason to act."
    outcomes={[
      {title:"Make capability visible.",copy:"Turn the quality of your business into a digital experience people can understand, evaluate and trust before they speak to you."},
      {title:"Reduce friction.",copy:"Simplify navigation, enquiry paths, account flows and information architecture so users reach the right action with less confusion."},
      {title:"Create a stronger platform.",copy:"Build on a scalable technical foundation that can support future content, commerce, portals, integrations and operational workflows."},
    ]}
    capabilities={[
      {num:"01",title:"Positioning + information architecture",copy:"Clarify what the business offers, who it serves and how pages should guide different visitors toward the right decision.",meta:"Positioning · Sitemap · User journeys · Conversion architecture"},
      {num:"02",title:"UX + interface design",copy:"Design responsive page systems, interaction patterns and visual hierarchy that feel deliberate rather than assembled from generic templates.",meta:"UX · UI systems · Responsive design · Accessibility thinking"},
      {num:"03",title:"Frontend + application development",copy:"Engineer fast, maintainable interfaces and application flows with modern web technologies appropriate to the product and deployment environment.",meta:"Next.js · React · TypeScript · Integrations"},
      {num:"04",title:"Commerce + authenticated experiences",copy:"Extend the website into stores, member areas, client portals, dashboards, protected content and account-based workflows where the business requires them.",meta:"E-commerce · Authentication · Portals · Membership foundations"},
      {num:"05",title:"Performance + production hardening",copy:"Treat responsiveness, metadata, secure configuration, loading states, accessibility and deployment quality as part of the build—not an afterthought.",meta:"Performance · SEO foundations · Security · Deployment"},
    ]}
    process={[
      {num:"01",title:"Discover",copy:"Understand the business problem, users, commercial goal, content and technical constraints."},
      {num:"02",title:"Structure",copy:"Define positioning, information architecture, user journeys and the conversion path before visual polish."},
      {num:"03",title:"Design",copy:"Create the responsive interface system, hierarchy, interaction language and key page experiences."},
      {num:"04",title:"Build + verify",copy:"Develop, connect, test and prepare the experience for production with measurable quality gates."},
    ]}
    proof={[
      {label:"PRODUCT PLATFORM",title:"ApplyBW",copy:"A Botswana-focused employment platform demonstrating product thinking, authenticated workflows and a multi-role web application experience.",href:"/work/applybw"},
      {label:"JASONPRO SYSTEM",title:"JasonPro Solutions",copy:"This platform itself is designed as a portfolio, commercial website, client workspace and operational system rather than a static brochure."},
    ]}
    fit={[
      "A business whose current website undersells the quality of its work.",
      "An organisation that needs both brand credibility and real functionality.",
      "A founder launching a product, service platform or authenticated web application.",
      "A company replacing fragmented pages and manual enquiry flows with one coherent system.",
      "A team that wants design, UX and engineering decisions connected to business outcomes.",
    ]}
    ctaTitle="MAKE THE WEBSITE PART OF THE BUSINESS SYSTEM."
  />;
}
