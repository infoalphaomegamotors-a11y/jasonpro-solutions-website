import type { Metadata } from "next";
import Link from "next/link";
import InteriorHeader from "@/components/InteriorHeader";
import { insights } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights",
  description: "Practical JasonPro notes on web design, business systems, automation, branding and project planning.",
};

export default function InsightsPage(){
  return <main className="interior-page">
    <InteriorHeader/>
    <section className="interior-hero compact"><span>INSIGHTS / PRACTICAL NOTES</span><h1>THINK CLEARLY.<br/><em>BUILD DELIBERATELY.</em></h1><p>Useful guidance for businesses deciding what to design, automate, improve or build next.</p></section>
    <section className="insight-index">
      {insights.map((item,index)=><Link href={`/insights/${item.slug}`} key={item.slug} className="insight-row"><span>{String(index+1).padStart(2,"0")}</span><div><small>{item.category} · {item.readTime}</small><h2>{item.title}</h2><p>{item.summary}</p></div><b>READ →</b></Link>)}
    </section>
    <section className="interior-end"><small>NEED A RECOMMENDATION FOR YOUR BUSINESS?</small><h2>START WITH THE PROBLEM.</h2><Link href="/consultation">REQUEST A CONSULTATION →</Link></section>
    <style>{`.insight-index{padding:0 5vw 8vh}.insight-row{display:grid;grid-template-columns:90px 1fr auto;gap:30px;padding:34px 0;border-top:1px solid #cfcfca;align-items:start;color:inherit}.insight-row>span{font-size:11px;color:#d91f26;font-weight:800}.insight-row small{font-size:9px;letter-spacing:.14em;color:#777}.insight-row h2{font-size:clamp(28px,4vw,54px);letter-spacing:-.045em;margin:10px 0 10px}.insight-row p{max-width:750px;color:#555;line-height:1.65;margin:0}.insight-row>b{font-size:10px;letter-spacing:.1em;margin-top:8px}@media(max-width:700px){.insight-row{grid-template-columns:42px 1fr}.insight-row>b{grid-column:2}}`}</style>
  </main>;
}
