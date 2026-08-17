import { notFound } from "next/navigation";
import CommerceHeader from "../../../components/CommerceHeader";
import { AddToCartButton } from "../../../components/CommerceClient";
import { products } from "../../../lib/products";

export function generateStaticParams(){ return products.map((product)=>({slug:product.slug})); }

export default function ProductPage({params}:{params:{slug:string}}){
  const product=products.find((item)=>item.slug===params.slug)!; if(!product) notFound();
  return <main className="commerce-page"><CommerceHeader/><section className="product-detail"><div className={`product-detail-art product-${product.accent}`}><span>{product.category}</span><strong>{product.name}</strong><i/></div><div className="product-detail-copy"><small>{product.kind.toUpperCase()} / {product.category.toUpperCase()}</small><h1>{product.name}</h1><p>{product.description}</p><div className="product-deliverables"><span>WHAT'S INCLUDED</span>{product.deliverables.map((item,index)=><div key={item}><b>0{index+1}</b>{item}</div>)}</div><div className="product-purchase"><strong>{product.priceLabel}</strong><AddToCartButton product={product}/></div><p className="commerce-fineprint">Prices shown as quote-based or admin-managed remain intentionally uncommitted until approved commercial pricing is configured.</p></div></section></main>;
}
