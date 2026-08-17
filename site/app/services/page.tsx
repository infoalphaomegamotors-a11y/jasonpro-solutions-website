import Link from "next/link";
import InteriorHeader from "@/components/InteriorHeader";

const services=[
  {id:"01",title:"WEB DESIGN & DEVELOPMENT",copy:"Premium websites, product interfaces and web applications engineered around trust, usability, performance and conversion.",meta:"Websites · Web apps · UX/UI · Performance",href:"/services/web-design-development"},
  {id:"02",title:"BUSINESS SYSTEMS & SAAS",copy:"Operational systems, portals and SaaS products that reduce manual work, improve visibility and create scalable workflows.",meta:"Dashboards · Portals · SaaS · Automation",href:"/services/business-systems-saas"},
  {id:"03",title:"GRAPHIC DESIGN & BRAND IDENTITY",copy:"Distinct brand systems designed to make businesses recognisable, consistent and commercially credible.",meta:"Identity · Campaigns · Marketing collateral",href:"/services/graphic-design-brand-identity"},
  {id:"04",title:"AI, AUTOMATION & INTELLIGENCE",copy:"Practical AI and automation applied to repetitive workflows, customer journeys and decision support.",meta:"Automation · AI workflows · Assistants",href:"/services/ai-automation-intelligence"},
  {id:"05",title:"BUSINESS INTELLIGENCE & DATA",copy:"Dashboards and reporting systems that turn operational data into clearer business decisions.",meta:"Analytics · Reporting · Decision systems",href:"/services/business-intelligence-data"},
  {id:"06",title:"COMMERCE & DIGITAL PRODUCTS",copy:"Online stores, memberships, subscriptions and digital-product experiences designed as complete buying systems.",meta:"E-commerce · Memberships · Digital goods",href:"/services/commerce-digital-products"},
  {id:"07",title:"PHOTOGRAPHY & VISUAL CONTENT",copy:"Commercial photography and authentic visual content planned for websites, campaigns, products and business communication.",meta:"Brand imagery · Products · Portraits · Campaign content",href:"/services/photography-content"},
  {id:"08",title:"BUSINESS ADMINISTRATION & COMPANY SECRETARIAL",copy:"Structured administrative support for records, recurring documents, forms and operational organisation.",meta:"Records · Documents · Templates · Admin workflows",href:"/services/business-administration-company-secretarial"},
  {id:"09",title:"VEHICLE SOURCING & SALES",copy:"Vehicle sourcing and sales support built around verified specifications, status information and clearer buyer communication.",meta:"Sourcing · Listings · Cost visibility · Enquiries",href:"/services/vehicle-sourcing-sales"},
  {id:"10",title:"CUSTOM CLOTHING & PRINTING",copy:"Custom printed clothing and branded merchandise with controlled artwork, proofing and production preparation.",meta:"T-shirts · Corporate wear · Merchandise · Print artwork",href:"/services/custom-clothing-printing"},
];

export default function ServicesPage(){
  return <main className="interior-page">
    <InteriorHeader/>
    <section className="interior-hero">
      <span>CAPABILITIES / 10</span>
      <h1>WE DON&apos;T SELL<br/>DECORATION.<br/><em>WE BUILD LEVERAGE.</em></h1>
      <p>Design, technology, operations and commercial thinking combined into complete business solutions.</p>
    </section>
    <section className="service-list-page">
      {services.map(service=><article key={service.id}>
        <span>{service.id}</span>
        <div><h2>{service.title}</h2><p>{service.copy}</p><small>{service.meta}</small></div>
        <Link href={service.href}>EXPLORE SERVICE →</Link>
      </article>)}
    </section>
    <section className="interior-end"><small>NOT SURE WHAT YOU NEED?</small><h2>START WITH THE BUSINESS PROBLEM.</h2><Link href="/contact">START A PROJECT →</Link></section>
  </main>;
}
