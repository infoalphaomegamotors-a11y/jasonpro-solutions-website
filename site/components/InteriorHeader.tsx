"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const links = [
  ["Work", "/work"],
  ["Services", "/services"],
  ["About", "/about"],
  ["Insights", "/insights"],
  ["Shop", "/shop"],
] as const;

export default function InteriorHeader(){
  const [open,setOpen]=useState(false);
  return <>
    <header className="interior-header">
      <Link href="/" className="interior-brand"><Image src="/assets/jasonpro-logo-light.png" alt="JasonPro Solutions" width={168} height={90}/></Link>
      <nav>{links.map(([l,h])=><Link key={l} href={h}>{l}</Link>)}</nav>
      <div className="interior-actions"><Link href="/auth/sign-in" className="interior-login">CLIENT LOGIN</Link><Link href="/contact" className="interior-cta">START A PROJECT →</Link></div>
      <button className="interior-menu-btn" onClick={()=>setOpen(v=>!v)} aria-label={open?"Close navigation":"Open navigation"} aria-expanded={open}><span/><span/></button>
    </header>
    <div className={`interior-mobile-menu ${open?"open":""}`}>
      {links.map(([l,h],i)=><Link key={l} href={h} onClick={()=>setOpen(false)}><span>0{i+1}</span>{l}</Link>)}
      <Link href="/auth/sign-in" onClick={()=>setOpen(false)}><span>06</span>Client Login</Link>
      <Link href="/contact" onClick={()=>setOpen(false)}><span>07</span>Start a Project</Link>
    </div>
    <style jsx>{`.interior-actions{display:flex;align-items:center;gap:14px}.interior-login{font-size:9px;letter-spacing:.11em;color:#bbb;font-weight:800}@media(max-width:1040px){.interior-actions{display:none}}`}</style>
  </>;
}
