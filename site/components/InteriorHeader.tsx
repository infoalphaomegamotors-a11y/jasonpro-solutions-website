"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const links = [
  ["Services", "/services"],
  ["Work", "/work"],
  ["Shop", "/shop"],
  ["Premium", "/premium"],
  ["About", "/about"],
  ["Contact", "/contact"],
] as const;

export default function InteriorHeader(){
  const [open,setOpen]=useState(false);
  return <>
    <header className="interior-header">
      <Link href="/" className="interior-brand"><Image src="/assets/jasonpro-logo-light.png" alt="JasonPro Solutions" width={168} height={90}/></Link>
      <nav>{links.map(([l,h])=><Link key={l} href={h}>{l}</Link>)}</nav>
      <Link href="/contact" className="interior-cta">START A PROJECT →</Link>
      <button className="interior-menu-btn" onClick={()=>setOpen(v=>!v)} aria-label="Open navigation"><span/><span/></button>
    </header>
    <div className={`interior-mobile-menu ${open?"open":""}`}>{links.map(([l,h],i)=><Link key={l} href={h} onClick={()=>setOpen(false)}><span>0{i+1}</span>{l}</Link>)}</div>
  </>;
}
