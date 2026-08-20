import InteriorHeader from "@/components/InteriorHeader";

export type PolicySection = { title: string; paragraphs?: string[]; bullets?: string[] };

export default function PolicyPage({title,summary,updated,sections}:{title:string;summary:string;updated:string;sections:PolicySection[]}){
  return <main className="interior-page policy-page">
    <InteriorHeader/>
    <section className="policy-hero"><span>JASONPRO SOLUTIONS / POLICY</span><h1>{title}</h1><p>{summary}</p><small>LAST UPDATED: {updated}</small></section>
    <section className="policy-body">{sections.map((section,index)=><article key={section.title}><span>{String(index+1).padStart(2,"0")}</span><div><h2>{section.title}</h2>{section.paragraphs?.map(p=><p key={p}>{p}</p>)}{section.bullets&&<ul>{section.bullets.map(item=><li key={item}>{item}</li>)}</ul>}</div></article>)}</section>
    <style>{`.policy-page{background:#f4f4f1}.policy-hero{padding:11vh 5vw 8vh;border-bottom:1px solid #cfcfca}.policy-hero>span,.policy-hero>small,.policy-body article>span{font-size:9px;letter-spacing:.16em;color:#d91f26;font-weight:800}.policy-hero h1{font-size:clamp(54px,8vw,120px);line-height:.86;letter-spacing:-.065em;margin:24px 0 28px;text-transform:uppercase}.policy-hero p{font-size:17px;line-height:1.7;max-width:780px;color:#555;margin-bottom:28px}.policy-body{padding:0 5vw 9vh;background:#fff}.policy-body article{display:grid;grid-template-columns:110px minmax(0,850px);gap:35px;padding:58px 0;border-bottom:1px solid #ddd}.policy-body h2{font-size:clamp(28px,3.6vw,48px);letter-spacing:-.04em;margin:0 0 20px}.policy-body p,.policy-body li{font-size:15px;line-height:1.8;color:#505050}.policy-body p{margin:0 0 18px}.policy-body ul{padding-left:20px;margin:12px 0 0}.policy-body li{margin:7px 0}@media(max-width:650px){.policy-body article{grid-template-columns:1fr;gap:12px}.policy-hero p{font-size:14px}}`}</style>
  </main>;
}
