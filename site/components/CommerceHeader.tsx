import Image from "next/image";
import Link from "next/link";
import { CartCount } from "./CommerceClient";

export default function CommerceHeader(){
  return <header className="commerce-header"><Link href="/" className="commerce-logo"><Image src="/assets/jasonpro-logo-light.png" alt="JasonPro Solutions" width={150} height={82}/></Link><nav><Link href="/shop">Shop</Link><Link href="/digital-products">Digital Products</Link><Link href="/premium">Premium</Link><Link href="/work">Work</Link></nav><div><Link href="/portal">Portal</Link><Link href="/cart" className="cart-link">Cart <CartCount/></Link></div></header>;
}
