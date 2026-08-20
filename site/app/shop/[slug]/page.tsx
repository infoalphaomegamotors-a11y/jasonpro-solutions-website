import Link from "next/link";
import { notFound } from "next/navigation";
import CommerceHeader from "../../../components/CommerceHeader";
import { products } from "../../../lib/products";

export function generateStaticParams(){ return products.map((product)=>({slug:product.slug})); }

export default function ProductPage({params}:{params:{slug:string}}){
  const product=products.find((item)=>item.slug===params.slug); if(!product) notFound();
  const actionLabel = product.kind === "service" ? "REQUEST THIS SERVICE →" : product.kind === "physical" ? "REQUEST PRODUCTION QUOTE →" : "ENQUIRE ABOUT THIS PRODUCT →";
  return <main className="commerce-page"><CommerceHeader/><section className="product-detail"><div className={`product-detail-art product-${product.accent}`}><span>{product.category}</span><strong>{product.name}</strong><i/></div><div className="product-detail-copy"><small>{product.kind.toUpperCase()} / {product.category.toUpperCase()}</small><h1>{product.name}</h1><p>{product.description}</p><div className="product-deliverables"><span>WHAT&apos;S INCLUDED</span>{product.deliverables.map((item,index)=><div key={item}><b>0{index+1}</b>{item}</div>)}</div><div className="product-purchase"><strong>{product.priceLabel}</strong><Link href="/quote" className="commerce-primary">{actionLabel}</Link></div><p className="commerce-fineprint">JasonPro is not presenting an unconfigured payment flow as a live checkout. Quote-based and not-yet-priced offers move into a scope review before any commercial commitment is made.</p></div></section></main>;
}
