"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CaseStudy } from "../../lib/caseStudies";

function Arrow() { return <span aria-hidden="true">→</span>; }

export default function CaseStudyExperience({ project }: { project: CaseStudy }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro.from(".case-nav", { y: -16, opacity: 0, duration: 0.45 })
        .from(".case-hero-index", { opacity: 0, x: -24, duration: 0.5 }, 0.06)
        .from(".case-hero-title span", { yPercent: 115, opacity: 0, stagger: 0.06, duration: 0.78 }, 0.08)
        .from(".case-hero-summary > *", { y: 18, opacity: 0, stagger: 0.05, duration: 0.48 }, 0.35)
        .from(".case-hero-media", { y: 44, opacity: 0, scale: 0.975, duration: 0.9 }, 0.24);
      gsap.to(".case-hero-media", { yPercent: -6, ease: "none", scrollTrigger: { trigger: ".case-hero", start: "top top", end: "bottom top", scrub: 0.6 } });
      gsap.to(".case-progress i", { scaleX: 1, ease: "none", transformOrigin: "left center", scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom bottom", scrub: 0.15 } });
      gsap.utils.toArray<HTMLElement>(".case-reveal").forEach((section) => gsap.from(section, { y: 34, opacity: 0, duration: 0.75, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 84%", once: true } }));
      gsap.utils.toArray<HTMLElement>(".case-principle").forEach((item, index) => gsap.from(item, { x: index % 2 ? 18 : -18, opacity: 0, duration: 0.55, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 88%", once: true } }));
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const displayUrl = project.liveUrl ? project.liveUrl.replace("https://", "") : "PROJECT INTERFACE / ARCHIVE";

  return (
    <main ref={rootRef} className={`case-page case-accent-${project.accent}`}>
      <div className="case-progress" aria-hidden="true"><i /></div>
      <header className="case-nav">
        <Link href="/work" className="case-nav-brand" aria-label="Back to JasonPro selected work"><Image src="/assets/jasonpro-logo-light.png" alt="JasonPro Solutions" width={142} height={76} priority /></Link>
        <div className="case-nav-meta"><span>DIGITAL CASE STUDY</span><b>{project.id} / 03</b></div>
        <Link href="/work" className="case-nav-back">BACK TO WORK <Arrow /></Link>
      </header>

      <section className="case-hero">
        <div className="case-hero-index" aria-hidden="true">{project.id}</div>
        <div className="case-hero-copy">
          <div className="case-hero-title" aria-label={project.name}>{project.name.split(" ").map((word) => <span key={word}><b>{word}</b></span>)}</div>
          <div className="case-hero-summary">
            <span>{project.type}</span><p>{project.intro}</p>
            <div className="case-hero-meta"><div><small>FOCUS</small><b>{project.focus}</b></div><div><small>APPROACH</small><b>{project.approach}</b></div></div>
            {project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noreferrer" className="case-live-button">VIEW LIVE PROJECT <Arrow /></a> : <Link href="/contact" className="case-live-button">START A SIMILAR PROJECT <Arrow /></Link>}
          </div>
        </div>
        <div className="case-hero-media">
          <div className="case-browser"><div className="case-browser-bar"><i/><i/><i/><span>{displayUrl}</span></div><div className="case-browser-image"><Image src={project.desktopImage} alt={project.imageAlt} fill sizes="(max-width: 820px) 94vw, 80vw" priority /></div></div>
          {project.mobileImage && <div className="case-phone"><Image src={project.mobileImage} alt={project.mobileAlt || `${project.name} mobile interface`} fill sizes="220px" /></div>}
          <div className="case-media-label"><span>PROJECT INTERFACE</span><b>DESKTOP{project.mobileImage ? " + MOBILE" : ""}</b></div>
        </div>
      </section>

      <section className="case-story case-reveal"><div className="case-story-number">01</div><div className="case-story-heading"><span>THE CHALLENGE</span><h2>{project.challengeTitle}</h2></div><p>{project.challenge}</p></section>
      <section className="case-story case-story-dark case-reveal"><div className="case-story-number">02</div><div className="case-story-heading"><span>THE RESPONSE</span><h2>{project.responseTitle}</h2></div><p>{project.response}</p></section>

      <section className="case-evidence case-reveal">
        <div className="case-evidence-head"><span>03 / PROJECT DEFINITION</span><h2>WHO IT SERVES.<br/>WHAT THE WORK HAD TO DO.</h2><p>{project.audience}</p></div>
        <div className="case-evidence-grid">
          <article><small>SCOPE</small>{project.scope.map((item,index)=><div key={item}><b>{String(index+1).padStart(2,"0")}</b><p>{item}</p></div>)}</article>
          <article><small>CONSTRAINTS</small>{project.constraints.map((item,index)=><div key={item}><b>{String(index+1).padStart(2,"0")}</b><p>{item}</p></div>)}</article>
        </div>
      </section>

      <section className="case-principles">
        <div className="case-principles-head case-reveal"><span>04 / EXPERIENCE PRINCIPLES</span><h2>DESIGN DECISIONS<br/>WITH A JOB TO DO.</h2></div>
        <div className="case-principles-list">{project.principles.map((principle, index) => <div className="case-principle" key={principle}><span>{String(index + 1).padStart(2, "0")}</span><p>{principle}</p><i /></div>)}</div>
      </section>

      <section className="case-interface case-reveal">
        <div className="case-interface-copy"><span>05 / INTERFACE EVIDENCE</span><h2>THE PRODUCT<br/>IS THE PROOF.</h2><div className="case-interface-notes">{project.interfaceNotes.map((note, index) => <div key={note}><b>{String(index + 1).padStart(2, "0")}</b><p>{note}</p></div>)}</div></div>
        <div className="case-interface-media"><div className="case-interface-crop"><Image src={project.desktopImage} alt={project.imageAlt} fill sizes="(max-width: 820px) 92vw, 55vw" /></div>{project.mobileImage && <div className="case-interface-mobile"><Image src={project.mobileImage} alt={project.mobileAlt || `${project.name} mobile interface`} fill sizes="180px" /></div>}</div>
      </section>

      <section className="case-verification case-reveal">
        <div><span>06 / DELIVERY + VERIFICATION</span><h2>SHOW WHAT EXISTS.<br/>DON&apos;T INVENT THE REST.</h2></div>
        <div><div className="case-delivery-list">{project.deliveryEvidence.map((item,index)=><p key={item}><b>{String(index+1).padStart(2,"0")}</b>{item}</p>)}</div><blockquote>{project.verification}</blockquote></div>
      </section>

      <section className="case-next"><div className="case-next-watermark" aria-hidden="true">{project.id}</div><div className="case-next-copy case-reveal"><span>07 / NEXT PROJECT</span><h2>YOUR BUSINESS<br/>CAN BE THE<br/><em>NEXT CASE STUDY.</em></h2><p>JasonPro combines design, systems and commercial thinking to build useful, distinctive digital products around real business problems.</p><div className="case-next-actions"><Link href="/contact" className="case-primary-button">START A PROJECT <Arrow /></Link><Link href="/work" className="case-secondary-button">EXPLORE MORE WORK <Arrow /></Link></div></div></section>

      <style>{`.case-evidence{padding:10vh 5vw;background:#f3f3ef;color:#111}.case-evidence-head{display:grid;grid-template-columns:.65fr 1.35fr;gap:6vw;margin-bottom:55px}.case-evidence-head>span,.case-evidence article>small,.case-verification span{font-size:9px;letter-spacing:.16em;font-weight:800;color:#d91f26}.case-evidence-head h2,.case-verification h2{font-size:clamp(42px,5.8vw,82px);line-height:.92;letter-spacing:-.055em;margin:20px 0}.case-evidence-head p{grid-column:2;max-width:780px;color:#555;line-height:1.7}.case-evidence-grid{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid #ccc}.case-evidence-grid article{padding:34px 4vw 20px 0}.case-evidence-grid article+article{border-left:1px solid #ccc;padding-left:4vw}.case-evidence-grid article>div{display:grid;grid-template-columns:42px 1fr;gap:16px;padding:20px 0;border-bottom:1px solid #d8d8d3}.case-evidence-grid b{font-size:9px;color:#d91f26}.case-evidence-grid p{margin:0;color:#444;line-height:1.55}.case-verification{padding:10vh 5vw;display:grid;grid-template-columns:1fr 1fr;gap:7vw;background:#fff;color:#111}.case-delivery-list{border-top:1px solid #ccc}.case-delivery-list p{display:grid;grid-template-columns:42px 1fr;gap:14px;padding:18px 0;margin:0;border-bottom:1px solid #ddd;color:#444}.case-delivery-list b{font-size:9px;color:#d91f26}.case-verification blockquote{margin:32px 0 0;padding:24px;border-left:3px solid #d91f26;background:#f2f2ef;color:#444;line-height:1.7;font-size:14px}@media(max-width:800px){.case-evidence-head,.case-evidence-grid,.case-verification{grid-template-columns:1fr}.case-evidence-head p{grid-column:auto}.case-evidence-grid article+article{border-left:0;padding-left:0}.case-verification{gap:30px}}`}</style>
    </main>
  );
}
