import type { Metadata } from "next";
import Link from "next/link";
import InteriorHeader from "@/components/InteriorHeader";
import PortfolioGallery, { type PortfolioItem } from "./PortfolioGallery";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Graphic Design Portfolio",
  description: "Selected JasonPro graphic-design work across print, social campaigns, brand identity, product artwork and production.",
};

const fallbackItems: PortfolioItem[] = [
  { id:"fallback-print", title:"Print & Promotional Selection", category:"Print & Promotional", caption:"Representative print and promotional work from the JasonPro archive.", alt_text:"JasonPro print and promotional design selection", image_url:"/portfolio/items/print-collage.jpg", position:10 },
  { id:"fallback-social", title:"Social Campaign Selection", category:"Social Campaigns", caption:"Representative social-media campaign artwork from the JasonPro archive.", alt_text:"JasonPro social media campaign design selection", image_url:"/portfolio/items/social-collage.jpg", position:20 },
  { id:"fallback-brand", title:"Brand Identity Selection", category:"Brand Identity", caption:"Representative brand and identity work from the JasonPro archive.", alt_text:"JasonPro brand identity design selection", image_url:"/portfolio/items/brand-collage.jpg", position:30 },
  { id:"fallback-production", title:"Product & Production Selection", category:"Product & Production", caption:"Representative product artwork, signage and production work from the JasonPro archive.", alt_text:"JasonPro product artwork and production design selection", image_url:"/portfolio/items/production-collage.jpg", position:40 },
];

async function getPortfolioItems(): Promise<PortfolioItem[]> {
  if (!isSupabaseConfigured) return fallbackItems;
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("portfolio_items")
      .select("id,title,category,caption,alt_text,image_url,position")
      .eq("status", "published")
      .order("position", { ascending: true })
      .order("created_at", { ascending: false });
    if (error || !data?.length) return fallbackItems;
    return data as PortfolioItem[];
  } catch {
    return fallbackItems;
  }
}

export default async function GraphicDesignPortfolioPage(){
  const items = await getPortfolioItems();
  return <main className="interior-page gd-portfolio">
    <InteriorHeader/>
    <section className="gd-hero">
      <span>GRAPHIC DESIGN / SELECTED WORK</span>
      <h1>DESIGN THAT<br/>HAD TO WORK<br/><em>IN THE REAL WORLD.</em></h1>
      <p>Commercial print, campaign graphics, identity work, product artwork and signage selected from JasonPro&apos;s real archive. Published work on this page is managed directly from the JasonPro admin dashboard.</p>
    </section>

    <section className="gd-gallery-section">
      <div className="gd-gallery-head"><div><span>LIVE PORTFOLIO</span><h2>SELECTED GRAPHIC<br/>DESIGN WORK.</h2></div><p>{items.length} published portfolio item{items.length===1?"":"s"}. Use the category controls to narrow the work, then open any item for a larger view.</p></div>
      <PortfolioGallery items={items}/>
    </section>

    <section className="gd-context">
      <div><span>WHY THIS ARCHIVE MATTERS</span><h2>THE WORK WAS BUILT ACROSS DIFFERENT OUTPUTS, NOT ONE TEMPLATE.</h2></div>
      <div><p>The source archive contains considerably more work than is practical to show on one page. This portfolio is intentionally edited so the strongest representative work is easier to evaluate.</p><p>Experience across commercial design and production environments means artwork has had to move from design software into print, signage, branded materials and customer-facing campaigns.</p><p>No fictional clients, fabricated results, invented awards or performance statistics are attached to the work.</p></div>
    </section>

    <section className="gd-next"><span>NEED GRAPHIC DESIGN OR A COMPLETE BRAND SYSTEM?</span><h2>BUILD SOMETHING PEOPLE CAN RECOGNISE.</h2><div><Link href="/services/graphic-design-brand-identity">VIEW THE SERVICE →</Link><Link href="/quote">REQUEST A QUOTE</Link></div></section>

    <style>{`
      .gd-portfolio{background:#f5f5f2}.gd-hero{padding:13vh 5vw 9vh;background:#0b0b0b;color:#fff;min-height:720px;display:flex;flex-direction:column;justify-content:center}.gd-hero>span,.gd-gallery-head span,.gd-context span,.gd-next>span{font-size:9px;font-weight:800;letter-spacing:.19em;color:#e12129}.gd-hero h1{font-size:clamp(66px,9vw,145px);line-height:.8;letter-spacing:-.07em;margin:30px 0 42px;max-width:1300px}.gd-hero h1 em{font-style:normal;color:#e12129}.gd-hero p{max-width:780px;color:#b7b7b7;font-size:16px;line-height:1.75}.gd-gallery-section{padding:10vh 5vw 11vh;background:#f3f3f0}.gd-gallery-head{display:grid;grid-template-columns:1.25fr .75fr;gap:7vw;align-items:end;margin-bottom:45px;padding-bottom:28px;border-bottom:1px solid #cfcfca}.gd-gallery-head h2,.gd-context h2,.gd-next h2{font-size:clamp(42px,5.8vw,86px);line-height:.92;letter-spacing:-.055em;margin:20px 0 0}.gd-gallery-head p{color:#606060;line-height:1.7;font-size:14px;max-width:520px;margin:0}.gd-context{padding:11vh 5vw;background:#111;color:#fff;display:grid;grid-template-columns:1fr 1fr;gap:8vw}.gd-context h2{margin-top:24px}.gd-context>div+div p{color:#aaa;font-size:15px;line-height:1.8;margin:0 0 24px}.gd-next{padding:11vh 5vw;background:#e12129;color:#fff}.gd-next>span{color:#fff}.gd-next h2{max-width:1050px;margin:25px 0 40px}.gd-next>div{display:flex;gap:10px;flex-wrap:wrap}.gd-next a{display:inline-block;padding:15px 18px;background:#090909;color:#fff;font-size:9px;font-weight:800;letter-spacing:.1em}.gd-next a+ a{background:transparent;border:1px solid rgba(255,255,255,.65)}@media(max-width:900px){.gd-gallery-head,.gd-context{grid-template-columns:1fr}.gd-hero{min-height:620px}}@media(max-width:620px){.gd-hero{min-height:auto;padding-top:11vh}.gd-hero h1{font-size:14.5vw}.gd-hero p{font-size:14px}.gd-next>div{display:grid}.gd-next a{text-align:center}}
    `}</style>
  </main>;
}
