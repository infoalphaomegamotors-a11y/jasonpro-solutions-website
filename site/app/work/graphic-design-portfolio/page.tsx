import type { Metadata } from "next";
import Link from "next/link";
import InteriorHeader from "@/components/InteriorHeader";

export const metadata: Metadata = {
  title: "Graphic Design Portfolio | JasonPro Solutions",
  description: "A curated selection from JasonPro's graphic-design archive spanning print, social campaigns, brand identity, product artwork and signage.",
};

const categories = [
  {num:"01",title:"Print Design",copy:"Flyers, posters, business cards and promotional layouts created for physical and digital distribution."},
  {num:"02",title:"Social Media Campaigns",copy:"Campaign graphics and promotional artwork designed to communicate quickly in high-attention social environments."},
  {num:"03",title:"Brand Identity",copy:"Logo and identity work exploring recognisable marks, colour, typography and practical brand applications."},
  {num:"04",title:"Product Artwork",copy:"Product stickers, labels and packaging-oriented graphics prepared around real production requirements."},
  {num:"05",title:"Signage + Large Format",copy:"Visual work intended for physical scale, including signage and large-format branded applications."},
];

export default function GraphicDesignPortfolioPage(){
  return <main className="interior-page gd-portfolio">
    <InteriorHeader/>
    <section className="gd-hero">
      <span>GRAPHIC DESIGN ARCHIVE / SELECTED WORK</span>
      <h1>DESIGN THAT<br/>HAD TO WORK<br/><em>IN THE REAL WORLD.</em></h1>
      <p>This is a curated selection from JasonPro’s original design archive, covering commercial print, social-media advertising, identity work, product artwork and signage. The work is shown as evidence of visual range and production experience—not as invented case-study outcomes.</p>
    </section>

    <section className="gd-board">
      <div className="gd-board-head"><span>CURATED ARCHIVE</span><p>16 representative pieces selected from a substantially larger source portfolio.</p></div>
      <img src="/portfolio/graphic-design-portfolio.webp" alt="Curated JasonPro graphic design archive showing print design, social media campaign graphics, brand identity, product artwork and signage"/>
    </section>

    <section className="gd-categories">
      <div className="gd-section-head"><span>WORKING RANGE</span><h2>FROM SCREEN TO PRINT.<br/>FROM CONCEPT TO PRODUCTION.</h2></div>
      <div className="gd-category-list">{categories.map(item=><article key={item.num}><small>{item.num}</small><div><h3>{item.title}</h3><p>{item.copy}</p></div></article>)}</div>
    </section>

    <section className="gd-context">
      <div><span>WHY THIS ARCHIVE MATTERS</span><h2>THE WORK WAS BUILT ACROSS DIFFERENT OUTPUTS, NOT ONE TEMPLATE.</h2></div>
      <div><p>The source archive contains considerably more work than is practical to show on one page. The selection here is intentionally edited to demonstrate the breadth of JasonPro’s graphic-design practice without overwhelming the visitor.</p><p>The archive documents experience across commercial design and production environments, where artwork had to move from design software into print, signage, branded materials and customer-facing campaigns.</p><p>No fictional clients, fabricated results, invented awards or performance statistics have been added to this portfolio.</p></div>
    </section>

    <section className="gd-next"><span>NEED GRAPHIC DESIGN OR A COMPLETE BRAND SYSTEM?</span><h2>BUILD SOMETHING PEOPLE CAN RECOGNISE.</h2><div><Link href="/services/graphic-design-brand-identity">VIEW THE SERVICE →</Link><Link href="/contact">START A PROJECT</Link></div></section>

    <style>{`
      .gd-portfolio{background:#f5f5f2}.gd-hero{padding:13vh 5vw 9vh;background:#0b0b0b;color:#fff;min-height:720px;display:flex;flex-direction:column;justify-content:center}.gd-hero>span,.gd-board-head span,.gd-section-head>span,.gd-context span,.gd-next>span{font-size:9px;font-weight:800;letter-spacing:.19em;color:#e12129}.gd-hero h1{font-size:clamp(66px,9vw,145px);line-height:.8;letter-spacing:-.07em;margin:30px 0 42px;max-width:1300px}.gd-hero h1 em{font-style:normal;color:#e12129}.gd-hero p{max-width:740px;color:#b7b7b7;font-size:16px;line-height:1.75}.gd-board{padding:8vh 5vw 10vh;background:#fff}.gd-board-head{display:flex;justify-content:space-between;gap:30px;align-items:end;margin-bottom:32px;border-bottom:1px solid #d4d4cf;padding-bottom:18px}.gd-board-head p{margin:0;max-width:500px;text-align:right;color:#666;font-size:12px}.gd-board img{display:block;width:100%;max-width:1200px;margin:0 auto;image-rendering:auto;box-shadow:0 20px 60px rgba(0,0,0,.08)}.gd-categories{padding:10vh 5vw;background:#ecece8}.gd-section-head{display:grid;grid-template-columns:190px 1fr;gap:50px;margin-bottom:55px}.gd-section-head h2,.gd-context h2,.gd-next h2{font-size:clamp(42px,5.8vw,86px);line-height:.92;letter-spacing:-.055em;margin:0}.gd-category-list{border-top:1px solid #c6c6c1}.gd-category-list article{display:grid;grid-template-columns:90px 1fr;padding:35px 0;border-bottom:1px solid #c6c6c1}.gd-category-list small{color:#e12129}.gd-category-list h3{font-size:clamp(30px,3.7vw,54px);letter-spacing:-.045em;margin:0 0 12px}.gd-category-list p{max-width:780px;color:#5b5b5b;line-height:1.7;font-size:14px}.gd-context{padding:11vh 5vw;background:#111;color:#fff;display:grid;grid-template-columns:1fr 1fr;gap:8vw}.gd-context h2{margin-top:24px}.gd-context>div+div p{color:#aaa;font-size:15px;line-height:1.8;margin:0 0 24px}.gd-next{padding:11vh 5vw;background:#e12129;color:#fff}.gd-next>span{color:#fff}.gd-next h2{max-width:1050px;margin:25px 0 40px}.gd-next>div{display:flex;gap:10px;flex-wrap:wrap}.gd-next a{display:inline-block;padding:15px 18px;background:#090909;color:#fff;font-size:9px;font-weight:800;letter-spacing:.1em}.gd-next a+ a{background:transparent;border:1px solid rgba(255,255,255,.65)}
      @media(max-width:900px){.gd-section-head,.gd-context{grid-template-columns:1fr}.gd-board-head{align-items:start;flex-direction:column}.gd-board-head p{text-align:left}.gd-hero{min-height:620px}}
      @media(max-width:620px){.gd-hero{min-height:auto;padding-top:11vh}.gd-hero h1{font-size:14.5vw}.gd-hero p{font-size:14px}.gd-category-list article{grid-template-columns:45px 1fr}.gd-next>div{display:grid}.gd-next a{text-align:center}}
    `}</style>
  </main>;
}
