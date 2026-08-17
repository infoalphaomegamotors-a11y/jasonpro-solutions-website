import Link from "next/link";
import CommerceHeader from "../../components/CommerceHeader";
const plans=[
 {name:"FREE",copy:"Account foundation for customers who want to manage purchases and future services.",items:["Profile","Order history","Project enquiries"]},
 {name:"MEMBER",copy:"A future paid access layer for premium content, tools and specialised services.",items:["Premium resources","Member-only tools","Saved reports"]},
 {name:"CLIENT",copy:"Project workspace access for active JasonPro service clients.",items:["Project status","Files and approvals","Invoices and support"]},
];
export default function PremiumPage(){return <main className="commerce-page"><CommerceHeader/><section className="premium-hero"><span>MEMBERSHIPS + PREMIUM ACCESS</span><h1>ACCESS BUILT<br/>AROUND VALUE.</h1><p>The architecture supports free accounts, paid memberships, individual products and client-only workspaces. No fake plan pricing is published before commercial approval.</p></section><section className="plan-grid">{plans.map((plan,index)=><article key={plan.name}><span>0{index+1}</span><h2>{plan.name}</h2><p>{plan.copy}</p><div>{plan.items.map(item=><b key={item}>{item}</b>)}</div><Link href={plan.name==="CLIENT"?"/portal":"/contact"}>{plan.name==="CLIENT"?"PREVIEW PORTAL":"REGISTER INTEREST"} →</Link></article>)}</section><section className="premium-note"><b>SERVER ENFORCEMENT, NOT HIDDEN LINKS.</b><p>When authentication is connected, entitlements will be enforced through the server and database layer rather than relying on visual hiding in the interface.</p></section></main>}
