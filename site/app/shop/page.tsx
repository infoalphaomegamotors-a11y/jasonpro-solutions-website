import Link from "next/link";
import CommerceHeader from "../../components/CommerceHeader";
import { products } from "../../lib/products";

export default function ShopPage(){
  return <main className="commerce-page"><CommerceHeader/><section className="commerce-hero"><span>JASONPRO COMMERCE</span><h1>BUY THE WORK.<br/>USE THE SYSTEM.</h1><p>Services, digital products and custom merchandise built around real business needs—not filler products.</p></section><section className="product-grid">{products.map((product,index)=><Link href={`/shop/${product.slug}`} className={`product-card product-${product.accent}`} key={product.slug}><div className="product-number">0{index+1}</div><div className="product-art"><span>{product.category.toUpperCase()}</span><b>{product.name.split(" ").slice(0,2).join(" ")}</b><i/></div><div className="product-copy"><small>{product.kind.toUpperCase()}</small><h2>{product.name}</h2><p>{product.description}</p><div><span>{product.priceLabel}</span><b>VIEW PRODUCT →</b></div></div></Link>)}</section><section className="commerce-callout"><span>NEED SOMETHING CUSTOM?</span><h2>Some of the best work starts with a blank brief.</h2><Link href="/contact" className="commerce-primary">START A PROJECT →</Link></section></main>;
}
