import Image from "next/image";
import Link from "next/link";
import InteriorHeader from "@/components/InteriorHeader";
import {caseStudies} from "@/lib/caseStudies";

export const metadata = { title: "Selected Work", description: "JasonPro Solutions case studies and selected graphic design work across web, systems, commerce and visual communication." };

export default function WorkPage(){
  const items=Object.values(caseStudies);
  return <main className="interior-page">
    <InteriorHeader/>
    <section className="interior-hero compact"><span>SELECTED WORK / CASE STUDIES + ARCHIVE</span><h1>REAL PROJECTS.<br/><em>REAL THINKING.</em></h1><p>Deep case studies show the problem-solving process. The graphic archive shows breadth across real production work without inventing business results that were never measured.</p></section>
    <section className="work-section-label"><span>01 / DIGITAL CASE STUDIES</span><p>Product, commerce and sales experiences with live interfaces and documented design decisions.</p></section>
    <section className="work-index">{items.map((p,i)=><Link href={`/work/${p.slug}`} key={p.slug} className={`work-index-item accent-${p.accent}`}><div className="work-index-num">0{i+1}</div><div className="work-index-image"><Image src={p.desktopImage} alt={p.imageAlt} fill sizes="(max-width:800px) 100vw, 55vw"/></div><div className="work-index-copy"><small>{p.type}</small><h2>{p.name}</h2><p>{p.intro}</p><span>VIEW CASE STUDY →</span></div></Link>)}</section>
    <section className="work-archive-feature">
      <div><span>02 / GRAPHIC DESIGN ARCHIVE</span><h2>PRINT. BRAND.<br/>SOCIAL. PRODUCTION.</h2><p>A curated visual archive of real JasonPro design work spanning print, campaign graphics, branding, product artwork and signage.</p><Link href="/work/graphic-design-portfolio">EXPLORE GRAPHIC DESIGN →</Link></div>
      <div className="work-archive-image"><Image src="/portfolio/graphic-design-portfolio.webp" alt="Curated JasonPro graphic design archive" fill sizes="(max-width:800px) 90vw, 48vw"/></div>
    </section>
    <section className="interior-end"><small>NEXT PROJECT</small><h2>YOURS COULD BE HERE.</h2><Link href="/contact">START A PROJECT →</Link></section>
    <style>{`.work-section-label{padding:44px 5vw 22px;border-top:1px solid #ccc;display:grid;grid-template-columns:260px 1fr;gap:35px}.work-section-label span,.work-archive-feature>div>span{font-size:9px;letter-spacing:.16em;color:#d91f26;font-weight:800}.work-section-label p{max-width:700px;color:#555;line-height:1.6;margin:0}.work-archive-feature{padding:9vh 5vw;display:grid;grid-template-columns:.8fr 1.2fr;gap:6vw;align-items:center;background:#0a0a0a;color:#fff}.work-archive-feature h2{font-size:clamp(42px,6vw,86px);line-height:.9;letter-spacing:-.055em;margin:22px 0}.work-archive-feature p{color:#aaa;line-height:1.7;max-width:540px}.work-archive-feature a{display:inline-block;margin-top:25px;padding:15px 18px;background:#d91f26;font-size:9px;font-weight:800;letter-spacing:.1em}.work-archive-image{position:relative;min-height:520px;background:#161616;overflow:hidden}.work-archive-image img{object-fit:contain}@media(max-width:800px){.work-section-label,.work-archive-feature{grid-template-columns:1fr}.work-archive-image{min-height:420px}}`}</style>
  </main>
}
