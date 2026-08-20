import Link from "next/link";
import InteriorHeader from "@/components/InteriorHeader";

const groups = [
  {
    label: "CORE DIGITAL CAPABILITIES",
    intro: "The primary JasonPro offer: digital products, operational systems and creative technology built around measurable business problems.",
    services: [
      {id:"01",title:"WEB DESIGN & DEVELOPMENT",copy:"Premium websites, product interfaces and web applications engineered around trust, usability, performance and conversion.",meta:"Websites · Web apps · UX/UI · Performance",href:"/services/web-design-development"},
      {id:"02",title:"BUSINESS SYSTEMS & SAAS",copy:"Operational systems, portals and SaaS products that reduce manual work, improve visibility and create scalable workflows.",meta:"Dashboards · Portals · SaaS · Workflow automation",href:"/services/business-systems-saas"},
      {id:"03",title:"GRAPHIC DESIGN & BRAND IDENTITY",copy:"Distinct brand systems and commercial creative work designed to make businesses recognisable, consistent and credible.",meta:"Identity · Campaigns · Marketing collateral",href:"/services/graphic-design-brand-identity"},
      {id:"04",title:"AI, AUTOMATION & INTELLIGENCE",copy:"Practical AI and automation applied to repetitive workflows, customer journeys and decision support.",meta:"Automation · AI workflows · Assistants",href:"/services/ai-automation-intelligence"},
      {id:"05",title:"BUSINESS INTELLIGENCE & DATA",copy:"Dashboards and reporting systems that turn operational information into clearer business decisions.",meta:"Analytics · Reporting · Decision systems",href:"/services/business-intelligence-data"},
      {id:"06",title:"COMMERCE & DIGITAL PRODUCTS",copy:"Online stores, digital products and membership experiences designed as complete buying and delivery systems.",meta:"E-commerce · Digital goods · Membership architecture",href:"/services/commerce-digital-products"},
    ],
  },
  {
    label: "CREATIVE & CONTENT PRODUCTION",
    intro: "Supporting creative capability for brands that need strong visual communication beyond the interface.",
    services: [
      {id:"07",title:"PHOTOGRAPHY & VISUAL CONTENT",copy:"Commercial photography and authentic visual content planned for websites, campaigns, products and business communication.",meta:"Brand imagery · Products · Portraits · Campaign content",href:"/services/photography-content"},
      {id:"08",title:"CUSTOM CLOTHING & PRINTING",copy:"Custom printed clothing and branded merchandise with controlled artwork, proofing and production preparation.",meta:"T-shirts · Corporate wear · Merchandise · Print artwork",href:"/services/custom-clothing-printing"},
    ],
  },
  {
    label: "BUSINESS SUPPORT",
    intro: "Practical support services kept distinct from JasonPro’s core digital positioning so visitors can understand the offer without ambiguity.",
    services: [
      {id:"09",title:"BUSINESS ADMINISTRATION & COMPANY SECRETARIAL",copy:"Structured administrative support for records, recurring documents, forms and operational organisation.",meta:"Records · Documents · Templates · Admin workflows",href:"/services/business-administration-company-secretarial"},
      {id:"10",title:"VEHICLE SOURCING & SALES",copy:"Vehicle sourcing and sales support built around verified specifications, status information and clearer buyer communication.",meta:"Sourcing · Listings · Cost visibility · Enquiries",href:"/services/vehicle-sourcing-sales"},
    ],
  },
];

export default function ServicesPage(){
  return <main className="interior-page">
    <InteriorHeader/>
    <section className="interior-hero">
      <span>CAPABILITIES / 10</span>
      <h1>DESIGN.<br/>SYSTEMS.<br/><em>BUSINESS LEVERAGE.</em></h1>
      <p>JasonPro&apos;s primary work sits at the intersection of design, technology and operations. Supporting creative and business services are organised separately so the core offer stays clear.</p>
    </section>
    {groups.map(group => <section className="service-group" key={group.label}>
      <header><span>{group.label}</span><p>{group.intro}</p></header>
      <div className="service-list-page">
        {group.services.map(service=><article key={service.id}>
          <span>{service.id}</span>
          <div><h2>{service.title}</h2><p>{service.copy}</p><small>{service.meta}</small></div>
          <Link href={service.href}>EXPLORE SERVICE →</Link>
        </article>)}
      </div>
    </section>)}
    <section className="interior-end"><small>NOT SURE WHAT YOU NEED?</small><h2>START WITH THE BUSINESS PROBLEM.</h2><Link href="/consultation">REQUEST A CONSULTATION →</Link></section>
    <style>{`.service-group>header{padding:64px 5vw 26px;border-top:1px solid #d6d6d1;display:grid;grid-template-columns:minmax(220px,.55fr) 1fr;gap:40px}.service-group>header span{font-size:10px;letter-spacing:.16em;font-weight:800;color:#d91f26}.service-group>header p{max-width:780px;color:#555;line-height:1.65;margin:0}@media(max-width:700px){.service-group>header{grid-template-columns:1fr;gap:14px;padding-top:44px}}`}</style>
  </main>;
}
