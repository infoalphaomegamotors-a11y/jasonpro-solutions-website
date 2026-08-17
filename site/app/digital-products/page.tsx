import Link from "next/link";
import CommerceHeader from "../../components/CommerceHeader";

const categories=[
  ["01","BUSINESS TOOLS","Templates, documents and repeatable systems that reduce avoidable admin work."],
  ["02","DESIGN RESOURCES","Reusable creative assets and production-ready design resources."],
  ["03","PREMIUM KNOWLEDGE","Specialised reports, analysis and member-only digital content."],
  ["04","FUTURE TOOLS","AI-assisted utilities and focused micro-products as the platform expands."],
];
export default function DigitalProductsPage(){return <main className="commerce-page"><CommerceHeader/><section className="digital-hero"><span>DIGITAL PRODUCTS</span><h1>CREATE ONCE.<br/>DELIVER AT SCALE.</h1><p>The digital-products layer is designed for useful, repeatable products—not low-value downloads added simply to fill a store.</p></section><section className="digital-category-list">{categories.map(([n,title,copy])=><article key={n}><span>{n}</span><h2>{title}</h2><p>{copy}</p><i>→</i></article>)}</section><section className="commerce-callout dark"><span>FIRST RELEASE</span><h2>Products will be published only after content, price, licensing and download rules are approved.</h2><Link href="/shop" className="commerce-primary">VIEW CURRENT CATALOGUE →</Link></section></main>}
