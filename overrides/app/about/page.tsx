import type { Metadata } from "next";
import Link from "next/link";
import InteriorHeader from "@/components/InteriorHeader";
import { aboutPortrait } from "@/lib/assets/aboutPortrait";

export const metadata: Metadata = {
  title: "About Jason Larona Maruping | JasonPro Solutions",
  description: "Meet Jason Larona Maruping, the multidisciplinary creative behind JasonPro Solutions, with experience across graphic design, photography, web development, print production and business administration.",
};

const experience = [
  {
    period: "AUG 2025 — PRESENT",
    company: "Eljay Business Consultants",
    role: "Office Administrator",
    copy: "Front-office operations, client assistance, calls and enquiries, appointment scheduling, meeting organisation, filing systems, office supplies and day-to-day administrative coordination.",
  },
  {
    period: "APR 2024 — JAN 2025",
    company: "Urban Prints",
    role: "Graphic Designer",
    copy: "Design work spanning user-friendly interfaces, print-ready artwork, client revisions and portfolio management, with photography integrated into selected visual work.",
  },
  {
    period: "APR 2022 — NOV 2023",
    company: "Open Business Services",
    role: "Graphic Designer",
    copy: "Graphic design and production work including business cards, banners, logos, company profiles, brochures, flyers, funeral programmes and letterheads, alongside large-format printing, heat-press work, T-shirt printing and rubber-stamp production.",
  },
  {
    period: "JAN 2020 — DEC 2021",
    company: "Naties Media",
    role: "Graphic Designer",
    copy: "Commercial print and design work including business cards, banners, logos, profiles, brochures, flyers, funeral programmes, letterheads, invoice books, signboards and other printed material.",
  },
];

const disciplines = [
  "GRAPHIC DESIGN",
  "BRAND IDENTITY",
  "PHOTOGRAPHY",
  "WEB DEVELOPMENT",
  "PRINT PRODUCTION",
  "T-SHIRT PRINTING",
  "BUSINESS ADMINISTRATION",
  "DIGITAL SYSTEMS",
];

export default function AboutPage(){
  return <main className="interior-page founder-page">
    <InteriorHeader/>
    <section className="founder-hero">
      <div className="founder-hero-copy">
        <span>FOUNDER / JASONPRO SOLUTIONS</span>
        <h1>JASON LARONA<br/><em>MARUPING.</em></h1>
        <p>Graphic designer, photographer and web developer with practical experience that also extends into print production and business administration.</p>
        <div className="founder-hero-actions"><Link href="/work/graphic-design-portfolio">VIEW GRAPHIC DESIGN WORK →</Link><Link href="/contact">START A PROJECT</Link></div>
      </div>
      <div className="founder-portrait"><img src={aboutPortrait} alt="Jason Larona Maruping, founder of JasonPro Solutions"/><span>DESIGN / SYSTEMS / BUSINESS</span></div>
    </section>

    <section className="founder-story">
      <div><span>01 / THE PRACTICE</span><h2>CREATIVE WORK INFORMED BY HOW BUSINESSES ACTUALLY OPERATE.</h2></div>
      <div className="founder-story-copy">
        <p>JasonPro Solutions is the multidisciplinary practice of Jason Larona Maruping. The source portfolio describes a self-taught graphic-design path built through commercial production environments in Gaborone and Kanye, with almost six years of design experience documented when that portfolio was assembled.</p>
        <p>That background developed across more than screen-based design. It includes preparing artwork for real production, operating around large-format printing and heat-press workflows, producing branded materials, integrating photography into design, developing web skills and later taking on office-administration responsibilities.</p>
        <p>The result is a practical way of working: visual quality matters, but so do the workflow behind the work, the customer experience, the production constraints and the business objective.</p>
      </div>
    </section>

    <section className="founder-disciplines"><span>WORKING DISCIPLINES</span><div>{disciplines.map((item,index)=><article key={item}><small>{String(index+1).padStart(2,"0")}</small><b>{item}</b></article>)}</div></section>

    <section className="founder-experience">
      <div className="founder-section-head"><span>02 / EXPERIENCE</span><h2>FROM COMMERCIAL DESIGN PRODUCTION TO BUSINESS OPERATIONS.</h2></div>
      <div className="founder-experience-list">{experience.map(item=><article key={item.company}><small>{item.period}</small><div><span>{item.company}</span><h3>{item.role}</h3><p>{item.copy}</p></div></article>)}</div>
    </section>

    <section className="founder-principles">
      <article><span>DESIGN</span><h2>Not decoration.</h2><p>Design is used to create recognition, hierarchy, trust and clearer communication across print and digital touchpoints.</p></article>
      <article><span>PRODUCTION</span><h2>Made for the real output.</h2><p>Experience with print and physical production informs decisions about artwork preparation, scale, legibility and execution.</p></article>
      <article><span>SYSTEMS</span><h2>Reduce friction.</h2><p>Web and business-system work is approached around the task people need to complete, not technology for its own sake.</p></article>
    </section>

    <section className="founder-end"><small>SELECTED ARCHIVE</small><h2>SEE THE GRAPHIC DESIGN WORK BEHIND THE PRACTICE.</h2><Link href="/work/graphic-design-portfolio">EXPLORE GRAPHIC DESIGN →</Link></section>

    <style>{`
      .founder-page{background:#f4f4f1}.founder-hero{min-height:760px;padding:10vh 5vw 8vh;display:grid;grid-template-columns:1.2fr .8fr;gap:6vw;align-items:center;border-bottom:1px solid #d6d6d1}.founder-hero-copy>span,.founder-story span,.founder-disciplines>span,.founder-section-head>span,.founder-principles span,.founder-end small{font-size:9px;letter-spacing:.18em;font-weight:800;color:#d91f26}.founder-hero h1{font-size:clamp(70px,9vw,145px);line-height:.8;letter-spacing:-.07em;margin:28px 0 38px}.founder-hero h1 em{font-style:normal;color:#d91f26}.founder-hero p{font-size:18px;line-height:1.65;max-width:680px;color:#4e4e4e}.founder-hero-actions{display:flex;gap:10px;margin-top:34px;flex-wrap:wrap}.founder-hero-actions a,.founder-end a{padding:15px 18px;background:#090909;color:#fff;font-size:9px;font-weight:800;letter-spacing:.1em}.founder-hero-actions a+ a{background:transparent;color:#111;border:1px solid #aaa}.founder-portrait{position:relative;max-width:560px;margin-left:auto}.founder-portrait img{display:block;width:100%;aspect-ratio:1/1;object-fit:cover;filter:grayscale(8%)}.founder-portrait span{position:absolute;bottom:-18px;left:-18px;background:#d91f26;color:#fff;padding:14px 18px;font-size:9px;letter-spacing:.15em;font-weight:800}.founder-story{padding:11vh 5vw;display:grid;grid-template-columns:.9fr 1.1fr;gap:8vw;background:#fff}.founder-story h2,.founder-section-head h2,.founder-end h2{font-size:clamp(42px,5.8vw,88px);line-height:.92;letter-spacing:-.055em;margin:22px 0}.founder-story-copy p{font-size:16px;line-height:1.8;color:#535353;margin:0 0 24px}.founder-disciplines{padding:8vh 5vw;background:#0b0b0b;color:#fff}.founder-disciplines>div{display:grid;grid-template-columns:repeat(4,1fr);margin-top:35px;border-top:1px solid #2d2d2d}.founder-disciplines article{min-height:150px;padding:25px 20px 25px 0;border-bottom:1px solid #2d2d2d}.founder-disciplines article small{display:block;color:#d91f26;margin-bottom:38px}.founder-disciplines article b{font-size:18px;letter-spacing:-.02em}.founder-experience{padding:11vh 5vw}.founder-section-head{display:grid;grid-template-columns:180px 1fr;gap:55px;margin-bottom:60px}.founder-experience-list{border-top:1px solid #c9c9c4}.founder-experience-list article{display:grid;grid-template-columns:220px 1fr;gap:35px;padding:38px 0;border-bottom:1px solid #c9c9c4}.founder-experience-list article>small{font-size:9px;letter-spacing:.14em;color:#d91f26}.founder-experience-list span{font-size:10px;letter-spacing:.12em;font-weight:800}.founder-experience-list h3{font-size:clamp(30px,3.5vw,52px);letter-spacing:-.045em;margin:7px 0 14px}.founder-experience-list p{max-width:800px;color:#575757;line-height:1.7;font-size:14px}.founder-principles{display:grid;grid-template-columns:repeat(3,1fr);background:#e8e8e4;border-top:1px solid #c8c8c2;border-bottom:1px solid #c8c8c2}.founder-principles article{padding:55px 5vw;min-height:330px;border-right:1px solid #c8c8c2}.founder-principles h2{font-size:clamp(34px,4vw,58px);letter-spacing:-.05em;margin:25px 0 18px}.founder-principles p{color:#595959;line-height:1.7}.founder-end{padding:11vh 5vw;background:#d91f26;color:#fff}.founder-end small{color:#fff}.founder-end h2{max-width:1050px}.founder-end a{display:inline-block}
      @media(max-width:900px){.founder-hero,.founder-story{grid-template-columns:1fr}.founder-portrait{margin:0;max-width:500px}.founder-disciplines>div{grid-template-columns:1fr 1fr}.founder-section-head{grid-template-columns:1fr;gap:20px}.founder-principles{grid-template-columns:1fr}.founder-principles article{border-right:0;border-bottom:1px solid #c8c8c2}}
      @media(max-width:620px){.founder-hero{min-height:auto;padding-top:9vh}.founder-hero h1{font-size:15vw}.founder-hero p{font-size:14px}.founder-hero-actions{display:grid}.founder-hero-actions a{text-align:center}.founder-disciplines>div{grid-template-columns:1fr 1fr}.founder-experience-list article{grid-template-columns:1fr;gap:12px}.founder-story-copy p{font-size:14px}}
    `}</style>
  </main>;
}
