"use client";

import { useState } from "react";

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  caption: string | null;
  alt_text: string;
  image_url: string;
  position: number;
};

export default function PortfolioGallery({ items }: { items: PortfolioItem[] }) {
  const categories = ["ALL", ...Array.from(new Set(items.map(item => item.category.toUpperCase())))];
  const [active, setActive] = useState("ALL");
  const [selected, setSelected] = useState<PortfolioItem | null>(null);
  const visible = active === "ALL" ? items : items.filter(item => item.category.toUpperCase() === active);

  return <>
    <div className="gd-filter" aria-label="Portfolio category filter">
      {categories.map(category => <button key={category} type="button" className={active === category ? "active" : ""} onClick={() => setActive(category)}>{category}</button>)}
    </div>
    <div className="gd-item-grid">
      {visible.map((item,index) => <button type="button" className="gd-item" key={item.id} onClick={() => setSelected(item)} aria-label={`Open ${item.title}`}>
        <div className="gd-item-media"><img src={item.image_url} alt={item.alt_text} loading={index < 4 ? "eager" : "lazy"}/></div>
        <div className="gd-item-copy"><small>{item.category}</small><h3>{item.title}</h3>{item.caption && <p>{item.caption}</p>}<span>VIEW WORK ↗</span></div>
      </button>)}
    </div>
    {visible.length === 0 && <div className="gd-empty">No published work in this category yet.</div>}
    {selected && <div className="gd-lightbox" role="dialog" aria-modal="true" aria-label={selected.title} onClick={() => setSelected(null)}>
      <button type="button" className="gd-close" onClick={() => setSelected(null)} aria-label="Close portfolio item">CLOSE ×</button>
      <div className="gd-lightbox-inner" onClick={event => event.stopPropagation()}>
        <img src={selected.image_url} alt={selected.alt_text}/>
        <div><small>{selected.category}</small><h2>{selected.title}</h2>{selected.caption && <p>{selected.caption}</p>}</div>
      </div>
    </div>}
    <style jsx>{`
      .gd-filter{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 34px}.gd-filter button{border:1px solid #c7c7c2;background:transparent;padding:11px 14px;font-size:9px;font-weight:800;letter-spacing:.12em;cursor:pointer}.gd-filter button.active,.gd-filter button:hover{background:#0b0b0b;color:#fff;border-color:#0b0b0b}.gd-item-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px}.gd-item{appearance:none;text-align:left;border:0;background:#fff;padding:0;cursor:pointer;overflow:hidden;color:#111}.gd-item-media{aspect-ratio:4/3;background:#e7e7e3;overflow:hidden;display:flex;align-items:center;justify-content:center}.gd-item-media img{width:100%;height:100%;display:block;object-fit:contain;transition:transform .35s ease}.gd-item:hover .gd-item-media img{transform:scale(1.02)}.gd-item-copy{padding:22px 22px 25px;border:1px solid #ddd;border-top:0}.gd-item-copy small,.gd-lightbox small{font-size:9px;letter-spacing:.15em;text-transform:uppercase;color:#e12129;font-weight:800}.gd-item-copy h3{font-size:clamp(25px,3vw,42px);letter-spacing:-.045em;margin:12px 0 10px}.gd-item-copy p{color:#626262;line-height:1.65;font-size:13px;max-width:620px}.gd-item-copy span{display:block;margin-top:19px;font-size:9px;font-weight:800;letter-spacing:.1em}.gd-empty{padding:55px;border:1px solid #d2d2cc;background:#fff;color:#666}.gd-lightbox{position:fixed;z-index:9999;inset:0;background:rgba(0,0,0,.92);display:flex;align-items:center;justify-content:center;padding:60px 5vw;overflow:auto}.gd-close{position:fixed;right:24px;top:22px;border:1px solid #555;background:#111;color:#fff;padding:11px 14px;font-size:9px;letter-spacing:.12em;cursor:pointer}.gd-lightbox-inner{width:min(1200px,100%);display:grid;grid-template-columns:minmax(0,1.4fr) minmax(260px,.6fr);background:#111;color:#fff;border:1px solid #333}.gd-lightbox-inner>img{width:100%;height:min(75vh,850px);object-fit:contain;background:#050505;display:block}.gd-lightbox-inner>div{padding:36px}.gd-lightbox h2{font-size:clamp(34px,5vw,68px);line-height:.95;letter-spacing:-.05em;margin:18px 0}.gd-lightbox p{color:#aaa;line-height:1.7}@media(max-width:760px){.gd-item-grid{grid-template-columns:1fr}.gd-lightbox{padding:65px 14px 20px}.gd-lightbox-inner{grid-template-columns:1fr}.gd-lightbox-inner>img{height:auto;max-height:65vh}.gd-lightbox-inner>div{padding:24px}}
    `}</style>
  </>;
}
