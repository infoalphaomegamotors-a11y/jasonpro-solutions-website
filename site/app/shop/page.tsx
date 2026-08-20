import type { Metadata } from "next";
import Link from "next/link";
import CommerceHeader from "../../components/CommerceHeader";
import { products } from "../../lib/products";

export const metadata: Metadata = { title: "Shop & Service Packages", description: "Explore selected JasonPro service packages, digital resources and custom production offers. Quote-based items use an enquiry workflow until approved pricing and payment are available." };

export default function ShopPage(){
  return <main className="commerce-page"><CommerceHeader/><section className="commerce-hero"><span>JASONPRO / SELECTED OFFERS</span><h1>START WITH A<br/>CLEAR OFFER.</h1><p>This catalogue presents selected service packages, digital resources and custom production work. Quote-based items move into a structured enquiry rather than a pretend checkout.</p></section><section className="product-grid">{products.map((product,index)=><Link href={`/shop/${product.slug}`} className={`product-card product-${product.accent}`} key={product.slug}><div className="product-number">0{index+1}</div><div className="product-art"><span>{product.category.toUpperCase()}</span><b>{product.name.split(" ").slice(0,2).join(" ")}</b><i/></div><div className="product-copy"><small>{product.kind.toUpperCase()}</small><h2>{product.name}</h2><p>{product.description}</p><div><span>{product.priceLabel}</span><b>VIEW OFFER →</b></div></div></Link>)}</section><section className="commerce-callout"><span>NEED SOMETHING DIFFERENT?</span><h2>Most serious work starts with the problem, not a fixed package.</h2><Link href="/contact" className="commerce-primary">START A PROJECT →</Link></section></main>;
}
