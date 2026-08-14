import Link from "next/link";
import InteriorHeader from "@/components/InteriorHeader";

const services=[
  {id:"01",title:"WEB DESIGN & DEVELOPMENT",copy:"Premium websites, product interfaces and web applications engineered around trust, usability, performance and conversion.",meta:"Websites · Web apps · UX/UI · Performance",href:"/services/web-design-development",priority:true},
  {id:"02",title:"BUSINESS SYSTEMS & SAAS",copy:"Operational systems, portals and SaaS products that reduce manual work, improve visibility and create scalable workflows.",meta:"Dashboards · Portals · SaaS · Automation",href:"/services/business-systems-saas",priority:true},
  {id:"03",title:"GRAPHIC DESIGN & BRAND IDENTITY",copy:"Distinct brand systems designed to make businesses recognisable, consistent and commercially credible.",meta:"Identity · Campaigns · Marketing collateral",href:"/services/graphic-design-brand-identity",priority:true},
  {id:"04",title:"AI, AUTOMATION & INTELLIGENCE",copy:"Practical AI and automation applied to repetitive workflows, customer journeys and decision support.",meta:"Automation · AI workflows · Assistants",href:"/services/ai-automation-intelligence",priority:true},
  {id:"05",title:"BUSINESS INTELLIGENCE & DATA",copy:"Dashboards and information systems that turn operational data into clearer business decisions.",meta:"Analytics · Reporting · Decision systems",href:"/contact",priority:false},
  {id:"06",title:"COMMERCE & DIGITAL PRODUCTS",copy:"Online stores, memberships, subscriptions and digital-product experiences designed to sell and scale.",meta:"E-commerce · Memberships · Digital goods",href:"/contact",priority:false},
];

export default function ServicesPage(){
  return <main className="interior-page">
    <InteriorHeader/>
    <section className="interior-hero">
      <span>CAPABILITIES / 06</span>
      <h1>WE DON&apos;T SELL<br/>DECORATION.<br/><em>WE BUILD LEVERAGE.</em></h1>
      <p>Design, technology and business thinking combined into complete commercial solutions.</p>
    </section>
    <section className="service-list-page">
      {services.map(service=><article key={service.id}>
        <span>{service.id}</span>
        <div><h2>{service.title}</h2><p>{service.copy}</p><small>{service.meta}</small></div>
        <Link href={service.href}>{service.priority?"EXPLORE SERVICE →":"DISCUSS THIS →"}</Link>
      </article>)}
    </section>
    <section className="interior-end"><small>NOT SURE WHAT YOU NEED?</small><h2>START WITH THE BUSINESS PROBLEM.</h2><Link href="/contact">START A PROJECT →</Link></section>
  </main>;
}
