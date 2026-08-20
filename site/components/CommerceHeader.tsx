import Image from "next/image";
import Link from "next/link";
import { CartCount } from "./CommerceClient";

export default function CommerceHeader(){
  return <header className="commerce-header">
    <Link href="/" className="commerce-logo"><Image src="/assets/jasonpro-logo-light.png" alt="JasonPro Solutions" width={150} height={82}/></Link>
    <nav>
      <Link href="/work">Work</Link>
      <Link href="/services">Services</Link>
      <Link href="/about">About</Link>
      <Link href="/insights">Insights</Link>
      <Link href="/shop">Shop</Link>
    </nav>
    <div>
      <Link href="/auth/sign-in">Client Login</Link>
      <Link href="/cart" className="cart-link">Cart <CartCount/></Link>
      <Link href="/contact">Start a Project</Link>
    </div>
  </header>;
}
