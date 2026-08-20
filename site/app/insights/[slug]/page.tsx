import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import InteriorHeader from "@/components/InteriorHeader";
import { getInsight, insights } from "@/lib/insights";

export function generateStaticParams(){ return insights.map(item=>({slug:item.slug})); }

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params; const insight=getInsight(slug); if(!insight) return {};
  return { title: insight.title, description: insight.summary };
}

export default async function InsightPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const insight=getInsight(slug); if(!insight) notFound();
  return <main className="interior-page insight-article">
    <InteriorHeader/>
    <article>
      <header><span>{insight.category} · {insight.readTime}</span><h1>{insight.title}</h1><p>{insight.summary}</p></header>
      <div className="article-body">{insight.sections.map((section,index)=><section key={section.heading}><small>{String(index+1).padStart(2,"0")}</small><div><h2>{section.heading}</h2>{section.body.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</div></section>)}</div>
      <footer><small>NEXT STEP</small><h2>USE THE IDEA ON A REAL BUSINESS PROBLEM.</h2><div><Link href="/consultation">REQUEST A CONSULTATION →</Link><Link href="/insights">ALL INSIGHTS</Link></div></footer>
    </article>
    <style>{`.insight-article>article>header{padding:11vh 5vw 8vh;background:#f4f4f1;border-bottom:1px solid #ccc}.insight-article>article>header>span,.article-body small,.insight-article footer small{font-size:9px;letter-spacing:.16em;color:#d91f26;font-weight:800}.insight-article h1{font-size:clamp(52px,8vw,118px);line-height:.86;letter-spacing:-.065em;max-width:1200px;margin:24px 0 30px}.insight-article>article>header>p{font-size:18px;line-height:1.65;max-width:760px;color:#555}.article-body{padding:0 5vw;background:#fff}.article-body section{display:grid;grid-template-columns:120px minmax(0,850px);gap:36px;padding:70px 0;border-bottom:1px solid #ddd}.article-body h2{font-size:clamp(34px,4vw,58px);letter-spacing:-.045em;margin:0 0 24px}.article-body p{font-size:16px;line-height:1.8;color:#4d4d4d;margin:0 0 20px}.insight-article footer{padding:10vh 5vw;background:#0a0a0a;color:#fff}.insight-article footer h2{font-size:clamp(44px,6vw,88px);line-height:.9;letter-spacing:-.055em;max-width:1000px;margin:20px 0 32px}.insight-article footer>div{display:flex;gap:10px;flex-wrap:wrap}.insight-article footer a{padding:15px 18px;border:1px solid #444;font-size:9px;letter-spacing:.11em;font-weight:800}.insight-article footer a:first-child{background:#d91f26;border-color:#d91f26}@media(max-width:700px){.article-body section{grid-template-columns:1fr;gap:12px}.insight-article>article>header>p{font-size:15px}}`}</style>
  </main>;
}
