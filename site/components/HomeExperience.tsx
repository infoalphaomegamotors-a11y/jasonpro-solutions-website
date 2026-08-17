"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  { id: "01", name: "APPLYBW", type: "Career Platform / SaaS", description: "A Botswana-focused career platform that helps job seekers match opportunities, prepare application documents and apply with more structure.", visual: "applybw", url: "https://applybw.netlify.app/", caseStudyPath: "/work/applybw", focus: "Product strategy + UX/UI + web platform", approach: "Qualification matching, application workflow, responsive experience" },
  { id: "02", name: "KWA MASDU FURNITURE", type: "Furniture Commerce", description: "A commerce-led furniture experience designed to make product discovery, custom-order exploration and mobile browsing feel clear and premium.", visual: "masdu", url: "https://kwa-masdu-furniture.vercel.app/", caseStudyPath: "/work/kwa-masdu-furniture", focus: "Commerce UX + responsive web design", approach: "Editorial merchandising, catalogue hierarchy, mobile-first product discovery" },
  { id: "03", name: "ALPHA OMEGA MOTORS", type: "Automotive Sales Platform", description: "A bold vehicle-sales website built to help buyers browse imported stock, understand the process and make direct enquiries with confidence.", visual: "motors", url: "https://alphaomegamotors.netlify.app/", caseStudyPath: "/work/alpha-omega-motors", focus: "Landing-page UX + trust-driven sales design", approach: "Vehicle search, conversion hierarchy, strong regional positioning" },
  { id: "04", name: "BRAND IDENTITY", type: "Creative Design", description: "Brand systems that are memorable, disciplined and commercially useful.", visual: "brand", url: "#", caseStudyPath: "", focus: "Identity + visual systems", approach: "Distinctive, consistent, commercially usable" },
  { id: "05", name: "DIGITAL PRODUCTS", type: "Commerce", description: "Scalable digital products, memberships and commerce experiences.", visual: "commerce", url: "#", caseStudyPath: "", focus: "Digital products + commerce", approach: "Productisation, conversion, scalable delivery" },
];

const services = [
  { id: "01", title: "Web Design & Development", short: "WEB", copy: "High-performance websites and web applications built for trust and conversion." },
  { id: "02", title: "Business Systems & SaaS", short: "SYSTEMS", copy: "Custom systems that reduce friction, automate operations and create leverage." },
  { id: "03", title: "Graphic Design & Brand Identity", short: "BRAND", copy: "Distinct visual identities and commercial creative systems." },
  { id: "04", title: "AI Automation & Intelligence", short: "AI", copy: "Useful automation and AI workflows built around measurable business value." },
  { id: "05", title: "Business Intelligence & Data", short: "DATA", copy: "Dashboards and decision systems that turn information into action." },
  { id: "06", title: "E-Commerce & Digital Products", short: "COMMERCE", copy: "Stores, memberships and digital products engineered to sell and scale." },
];

const navItems = [
  ["Home", "#top"], ["About", "#about"], ["Services", "#services"], ["Work", "#work"],
  ["Shop", "/shop"], ["Solutions", "#services"], ["Resources", "#resources"], ["Contact", "#contact"],
] as const;

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true" className={diagonal ? "arrow arrow-diagonal" : "arrow"}>→</span>;
}

function DeviceMockup() {
  return (
    <div className="device-stage" aria-label="Responsive product interface showcase" data-cursor="VIEW">
      <div className="orbit orbit-one" /><div className="orbit orbit-two" />
      <div className="device laptop">
        <div className="device-topbar"><span>ApplyBW</span><i /><i /><i /></div>
        <div className="mock-hero"><span className="mock-kicker">Find Jobs.</span><strong>Build Careers.</strong><button tabIndex={-1}>Explore opportunities</button></div>
        <div className="mock-metrics"><div><b>Jobs</b><small>Discover</small></div><div><b>Profile</b><small>Build</small></div><div><b>Apply</b><small>Track</small></div></div>
      </div>
      <div className="device tablet">
        <div className="mini-topbar"><b>Dashboard</b><span>•••</span></div>
        <div className="dashboard-cards"><span>Applications<small>Recent activity</small></span><span>Saved<small>Opportunities</small></span><span>Profile<small>Progress</small></span></div>
        <div className="chart-ring" /><div className="chart-lines"><i /><i /><i /><i /></div>
      </div>
      <div className="device phone"><small>ApplyBW</small><b>Find the right opportunities for you.</b><button tabIndex={-1}>Find jobs</button><div className="phone-list"><i /><i /><i /></div></div>
      <div className="proof-stamp"><span>✓</span><small>DIGITAL SOLUTIONS<br/>THAT WORK.</small></div>
    </div>
  );
}

function ProjectVisual({ variant }: { variant: string }) {
  if (variant === "applybw") return (
    <div className="project-art real-project-art applybw-real">
      <div className="real-browser-frame">
        <div className="browser-chrome"><i/><i/><i/><span>applybw.netlify.app</span></div>
        <Image src="/projects/applybw/desktop.png" alt="ApplyBW desktop website interface" fill sizes="(max-width: 820px) 92vw, 52vw" priority />
      </div>
      <div className="real-mobile-frame applybw-mobile">
        <Image src="/projects/applybw/mobile.jpeg" alt="ApplyBW mobile loading experience" fill sizes="180px" />
      </div>
      <div className="project-proof-note"><span>LIVE PRODUCT</span><b>DESKTOP + MOBILE</b></div>
    </div>
  );
  if (variant === "masdu") return (
    <div className="project-art real-project-art masdu-real">
      <div className="real-browser-frame masdu-browser">
        <div className="browser-chrome"><i/><i/><i/><span>kwa-masdu-furniture.vercel.app</span></div>
        <Image src="/projects/kwa-masdu/desktop.png" alt="Kwa Masdu Furniture desktop product catalogue" fill sizes="(max-width: 820px) 92vw, 52vw" />
      </div>
      <div className="real-mobile-frame masdu-mobile">
        <Image src="/projects/kwa-masdu/mobile.jpeg" alt="Kwa Masdu Furniture mobile storefront" fill sizes="180px" />
      </div>
      <div className="project-proof-note masdu-note"><span>COMMERCE EXPERIENCE</span><b>EDITORIAL + RESPONSIVE</b></div>
    </div>
  );
  if (variant === "systems") return <div className="project-art systems-art"><div className="system-panel"><span>Business overview</span><b>LIVE OPERATIONS</b><div className="system-graph" /></div><div className="system-panel lower"><span>Workflow</span><div className="bars"><i/><i/><i/><i/><i/></div></div></div>;
  if (variant === "motors") return (
    <div className="project-art real-project-art motors-real">
      <div className="real-browser-frame motors-browser">
        <div className="browser-chrome"><i/><i/><i/><span>alphaomegamotors.netlify.app</span></div>
        <Image src="/projects/alpha-omega/desktop.png" alt="Alpha Omega Motors desktop landing page" fill sizes="(max-width: 820px) 92vw, 52vw" />
      </div>
      <div className="motors-detail-card">
        <small>SEARCH EXPERIENCE</small>
        <b>Imported vehicles. Gaborone, Botswana.</b>
        <span>Stock discovery + clear enquiry path</span>
      </div>
      <div className="project-proof-note motors-note"><span>AUTOMOTIVE SALES</span><b>LIVE LANDING PAGE</b></div>
    </div>
  );
  if (variant === "brand") return <div className="project-art brand-art"><div className="brand-sheet">JASON<span>PRO</span></div><div className="brand-sheet inverse">JP</div><div className="brand-sheet red">DESIGN</div></div>;
  return <div className="project-art commerce-art"><div className="tee"><span>JP</span></div><div className="commerce-screen"><small>JASONPRO SHOP</small><b>Built to sell.</b><button tabIndex={-1}>Shop now</button></div></div>;
}

function ServiceVisual({ index }: { index: number }) {
  const service = services[index];
  if (index === 0) return (
    <div className="service-art service-art-web" aria-hidden="true">
      <div className="web-browser"><div className="web-browser-top"><i/><i/><i/><span>jasonpro.solutions</span></div><div className="web-browser-body"><b>DESIGN.<br/>SYSTEMS.<br/>INTELLIGENCE.</b><span>Built for real business growth.</span><div className="web-cta"/></div></div>
      <div className="web-phone"><div/><b>JP</b><span>Responsive by design.</span></div>
    </div>
  );
  if (index === 1) return (
    <div className="service-art service-art-systems" aria-hidden="true">
      <div className="sys-node n1">LEADS</div><div className="sys-node n2">OPS</div><div className="sys-node n3">CRM</div><div className="sys-node n4">DATA</div>
      <svg viewBox="0 0 600 360" preserveAspectRatio="none"><path d="M92 82 C220 70 220 170 300 170 S420 270 514 250"/><path d="M88 284 C220 276 205 180 300 170 S430 88 520 98"/></svg>
      <div className="sys-core"><small>BUSINESS SYSTEM</small><b>ONE OPERATING<br/>SOURCE OF TRUTH.</b><i/></div>
    </div>
  );
  if (index === 2) return (
    <div className="service-art service-art-brand" aria-hidden="true">
      <div className="brand-board bb-one"><span>JASON</span><em>PRO</em></div><div className="brand-board bb-two">Aa<br/><small>IDENTITY SYSTEM</small></div><div className="brand-board bb-three"><i/><i/><i/></div>
    </div>
  );
  if (index === 3) return (
    <div className="service-art service-art-ai" aria-hidden="true">
      <div className="ai-flow"><span>INPUT</span><i/><b>AUTOMATE</b><i/><span>ACTION</span></div><div className="ai-console"><small>WORKFLOW / LIVE</small><p>Lead received</p><p>Qualified</p><p>Proposal prepared</p><strong>HUMAN REVIEW</strong></div>
    </div>
  );
  if (index === 4) return (
    <div className="service-art service-art-data" aria-hidden="true">
      <div className="data-big"><small>DECISION SIGNAL</small><b>LIVE</b><span>Patterns translated into action</span></div><div className="data-bars">{[42,72,56,88,64,94,78].map((h,i)=><i key={i} style={{height:`${h}%`}}/> )}</div><div className="data-axis">01 02 03 04 05 06 07</div>
    </div>
  );
  return (
    <div className="service-art service-art-commerce" aria-hidden="true">
      <div className="commerce-product"><span>JP</span><small>CREATIVE GOODS</small></div><div className="commerce-ui"><small>CHECKOUT</small><b>P 000.00</b><i/><i/><i/><button tabIndex={-1}>COMPLETE ORDER</button></div>
    </div>
  );
}

export default function HomeExperience() {
  const pageRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
  const [workProgress, setWorkProgress] = useState(0);
  const [activeNav, setActiveNav] = useState("top");
  const [menuHover, setMenuHover] = useState("Home");
  const [routeTransitioning, setRouteTransitioning] = useState(false);
  const activeServiceData = useMemo(() => services[activeService], [activeService]);

  const openFullCaseStudy = (path: string) => {
    if (!path || routeTransitioning) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { window.location.href = path; return; }
    setRouteTransitioning(true);
    const overlay = document.querySelector(".route-transition-panel");
    if (!overlay) { window.location.href = path; return; }
    const tl = gsap.timeline({ onComplete: () => { window.location.href = path; } });
    tl.set(overlay, { display: "block" })
      .fromTo(overlay, { scaleY: 0, transformOrigin: "bottom center" }, { scaleY: 1, duration: 0.38, ease: "power4.inOut" })
      .fromTo(".route-transition-mark", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.24, ease: "power3.out" }, 0.18)
      .to(".route-transition-rule i", { scaleX: 1, duration: 0.22, ease: "power2.inOut" }, 0.25);
  };

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.body.classList.add("intro-is-running");
    const timer = window.setTimeout(() => {
      setIntroDone(true);
      document.body.classList.remove("intro-is-running");
    }, reduced ? 120 : 1180);
    return () => { window.clearTimeout(timer); document.body.classList.remove("intro-is-running"); };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    const ctx = gsap.context(() => {
      if (!reduced) {
        const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });
        heroTl
          .from(".nav-inner", { y: -18, opacity: 0, duration: 0.5 })
          .from(".hero-word", { yPercent: 110, opacity: 0, stagger: 0.085, duration: 0.78 }, 0.08)
          .from(".hero-copy > *:not(.hero-title)", { y: 18, opacity: 0, stagger: 0.06, duration: 0.5 }, 0.38)
          .from(".device-stage", { x: 48, opacity: 0, scale: 0.985, duration: 0.9 }, 0.25);

        gsap.to(".device-stage", { y: -18, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.65 } });
        gsap.to(".orbit-one", { rotate: 35, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 } });
        gsap.to(".hero-copy", { scale: 0.965, opacity: 0.28, transformOrigin: "left center", ease: "none", scrollTrigger: { trigger: ".hero", start: "70% top", end: "bottom top", scrub: 0.6 } });
        gsap.fromTo(".work-section", { clipPath: "inset(9% 4% 0% 4%)", borderRadius: "24px" }, { clipPath: "inset(0% 0% 0% 0%)", borderRadius: "0px", ease: "none", scrollTrigger: { trigger: ".work-section", start: "top bottom", end: "top 55%", scrub: 0.7 } });

        const track = trackRef.current;
        const work = workRef.current;
        if (track && work && window.innerWidth > 820) {
          const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);
          const tween = gsap.to(track, {
            x: () => -getDistance(), ease: "none",
            scrollTrigger: {
              trigger: work, start: "top top", end: () => `+=${getDistance() + window.innerHeight * 0.4}`,
              pin: true, scrub: 0.5, invalidateOnRefresh: true, anticipatePin: 1,
              snap: { snapTo: 1 / 6, duration: { min: 0.18, max: 0.42 }, delay: 0.08, ease: "power2.inOut" },
              onUpdate: (self) => { gsap.set(".work-progress i", { scaleX: self.progress }); setWorkProgress(self.progress); },
            },
          });

          gsap.utils.toArray<HTMLElement>(".project-slide").forEach((slide) => {
            const art = slide.querySelector(".project-art");
            const copy = slide.querySelector(".project-copy");
            if (art) gsap.fromTo(art, { xPercent: 8, scale: 0.96 }, { xPercent: -4, scale: 1, ease: "none", scrollTrigger: { trigger: slide, containerAnimation: tween, start: "left right", end: "right left", scrub: true } });
            if (copy) gsap.fromTo(copy, { xPercent: 10 }, { xPercent: -5, ease: "none", scrollTrigger: { trigger: slide, containerAnimation: tween, start: "left right", end: "right left", scrub: true } });

            const variant = slide.dataset.project;
            const browser = slide.querySelector<HTMLElement>(".real-browser-frame");
            const mobile = slide.querySelector<HTMLElement>(".real-mobile-frame");
            const note = slide.querySelector<HTMLElement>(".project-proof-note");
            if (variant === "applybw") {
              if (browser) gsap.fromTo(browser, { yPercent: 8, rotateY: 7 }, { yPercent: -3, rotateY: 1.5, ease: "none", scrollTrigger: { trigger: slide, containerAnimation: tween, start: "left 85%", end: "right 15%", scrub: true } });
              if (mobile) gsap.fromTo(mobile, { yPercent: 20, rotateZ: 3 }, { yPercent: -10, rotateZ: -0.6, ease: "none", scrollTrigger: { trigger: slide, containerAnimation: tween, start: "left 82%", end: "right 18%", scrub: true } });
            }
            if (variant === "masdu") {
              if (browser) gsap.fromTo(browser, { scale: .93, rotateZ: -1.2 }, { scale: 1.02, rotateZ: .2, ease: "none", scrollTrigger: { trigger: slide, containerAnimation: tween, start: "left 88%", end: "right 20%", scrub: true } });
              if (mobile) gsap.fromTo(mobile, { yPercent: 9, xPercent: 10 }, { yPercent: -5, xPercent: -4, ease: "none", scrollTrigger: { trigger: slide, containerAnimation: tween, start: "left 86%", end: "right 16%", scrub: true } });
            }
            if (variant === "motors") {
              if (browser) gsap.fromTo(browser, { xPercent: 12, scale: .95 }, { xPercent: -4, scale: 1.01, ease: "none", scrollTrigger: { trigger: slide, containerAnimation: tween, start: "left 88%", end: "right 12%", scrub: true } });
              const detail = slide.querySelector<HTMLElement>(".motors-detail-card");
              if (detail) gsap.fromTo(detail, { xPercent: 26, opacity: .3 }, { xPercent: -5, opacity: 1, ease: "none", scrollTrigger: { trigger: slide, containerAnimation: tween, start: "left 78%", end: "right 22%", scrub: true } });
            }
            if (note) gsap.fromTo(note, { yPercent: 18, opacity: .2 }, { yPercent: -4, opacity: 1, ease: "none", scrollTrigger: { trigger: slide, containerAnimation: tween, start: "left 78%", end: "center center", scrub: true } });
          });
        }

        gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => gsap.from(el, { y: 28, opacity: 0, duration: 0.72, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 87%", once: true } }));
      }
    }, pageRef);

    const onMove = (e: PointerEvent) => {
      if (coarse || !cursorRef.current) return;
      gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.18, ease: "power3.out" });
      const target = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      cursorRef.current.dataset.label = target?.dataset.cursor || "";
      cursorRef.current.classList.toggle("cursor-active", Boolean(target));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => { window.removeEventListener("pointermove", onMove); ctx.revert(); };
  }, []);

  useEffect(() => {
    const ids = ["top", "work", "services", "about", "shop", "resources", "contact"];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target?.id) setActiveNav(visible.target.id);
    }, { rootMargin: "-28% 0px -58% 0px", threshold: [0, 0.1, 0.35, 0.6] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const items = gsap.utils.toArray<HTMLElement>(".menu-overlay nav a");
    const tl = gsap.timeline();
    tl.fromTo(".menu-overlay .menu-visual", { opacity: 0, scale: 1.03 }, { opacity: 1, scale: 1, duration: 0.48, ease: "power3.out" })
      .fromTo(items, { y: 28, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.045, duration: 0.44, ease: "power3.out" }, 0.08)
      .fromTo(".menu-meta", { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.32, ease: "power2.out" }, 0.22);
    return () => { tl.kill(); gsap.set(items, { clearProps: "transform,opacity" }); };
  }, [menuOpen]);

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen);
    return () => document.body.classList.remove("menu-is-open");
  }, [menuOpen]);

  useEffect(() => {
    document.body.classList.toggle("case-is-open", Boolean(selectedProject));
    if (!selectedProject) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setSelectedProject(null); };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("case-is-open");
    };
  }, [selectedProject]);

  useEffect(() => {
    if (!selectedProject) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const overlay = document.querySelector<HTMLElement>(".case-study-overlay.is-open");
    if (!overlay) return;
    const copy = overlay.querySelector<HTMLElement>(".case-study-copy");
    const visual = overlay.querySelector<HTMLElement>(".case-study-visual");
    const index = overlay.querySelector<HTMLElement>(".case-study-index");
    const rail = overlay.querySelector<HTMLElement>(".case-study-rail");
    const browser = overlay.querySelector<HTMLElement>(".real-browser-frame");
    const mobile = overlay.querySelector<HTMLElement>(".real-mobile-frame");
    const detail = overlay.querySelector<HTMLElement>(".motors-detail-card");

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.fromTo(index, { x: -18, opacity: 0 }, { x: 0, opacity: 1, duration: .46 }, .08)
      .fromTo(copy, { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: .62 }, .12)
      .fromTo(visual, { scale: .94, opacity: 0 }, { scale: 1, opacity: 1, duration: .76 }, .14)
      .fromTo(rail, { scaleX: .2, opacity: 0, transformOrigin: "left center" }, { scaleX: 1, opacity: 1, duration: .48 }, .34);

    if (selectedProject.visual === "applybw") {
      if (browser) tl.fromTo(browser, { y: 26, rotateY: 7 }, { y: 0, rotateY: 2.2, duration: .7 }, .18);
      if (mobile) tl.fromTo(mobile, { y: 46, rotateZ: 4 }, { y: 0, rotateZ: 1, duration: .72 }, .24);
    }
    if (selectedProject.visual === "masdu") {
      if (browser) tl.fromTo(browser, { scale: .9, rotateZ: -1.4 }, { scale: 1, rotateZ: -.35, duration: .78 }, .18);
      if (mobile) tl.fromTo(mobile, { x: 34, opacity: 0 }, { x: 0, opacity: 1, duration: .68 }, .3);
    }
    if (selectedProject.visual === "motors") {
      if (browser) tl.fromTo(browser, { x: 54, scale: .92 }, { x: 0, scale: 1, duration: .74 }, .18);
      if (detail) tl.fromTo(detail, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: .52 }, .36);
    }
    return () => { tl.kill(); };
  }, [selectedProject]);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;
    const magnetic = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
    const cleanups = magnetic.map((element) => {
      const onMove = (event: PointerEvent) => {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - (rect.left + rect.width / 2);
        const y = event.clientY - (rect.top + rect.height / 2);
        gsap.to(element, { x: x * 0.16, y: y * 0.16, duration: 0.28, ease: "power3.out" });
      };
      const onLeave = () => gsap.to(element, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1, 0.35)" });
      element.addEventListener("pointermove", onMove);
      element.addEventListener("pointerleave", onLeave);
      return () => { element.removeEventListener("pointermove", onMove); element.removeEventListener("pointerleave", onLeave); };
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return (
    <div ref={pageRef} className="site-shell">
      <div className={`brand-intro ${introDone ? "is-complete" : ""}`} aria-hidden="true">
        <div className="intro-mark"><Image src="/assets/jasonpro-logo-light.png" alt="" width={356} height={192} priority /></div>
        <div className="intro-rule"><i /></div>
        <div className="intro-meta"><span>DESIGN</span><span>SYSTEMS</span><span>INTELLIGENCE</span></div>
      </div>
      <div ref={cursorRef} className="precision-cursor" aria-hidden="true"><span /></div>
      <div className={`route-transition ${routeTransitioning ? "is-active" : ""}`} aria-hidden="true">
        <div className="route-transition-panel">
          <Image className="route-transition-mark" src="/assets/jasonpro-logo-light.png" alt="" width={230} height={124} />
          <div className="route-transition-rule"><i /></div>
          <span>SELECTED WORK / CASE STUDY</span>
        </div>
      </div>

      <header className="nav-shell">
        <div className="nav-inner">
          <a href="#top" className="brand" aria-label="JasonPro Solutions home"><Image src="/assets/jasonpro-logo-light.png" alt="JasonPro Solutions" width={178} height={96} priority /></a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map(([label, href]) => <a key={label} href={href} className={href.startsWith("#") && activeNav === href.slice(1) ? "active" : ""}>{label}{label === "Solutions" && <sup>NEW</sup>}</a>)}
          </nav>
          <a className="quote-button" href="#contact" data-cursor="START" data-magnetic>GET A QUOTE <Arrow diagonal /></a>
          <button className={`menu-button ${menuOpen ? "is-open" : ""}`} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}><span/><span/></button>
        </div>
      </header>

      <div className={`menu-overlay ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="menu-visual"><Image src="/assets/jasonpro-watermark.png" alt="" width={760} height={480} /><div className="menu-preview-word" aria-hidden="true">{menuHover}</div><div className="menu-preview-rule"><i /></div></div>
        <nav aria-label="Menu">
          {navItems.map(([label, href], index) => <a key={label} href={href} onMouseEnter={() => setMenuHover(label)} onFocus={() => setMenuHover(label)} onClick={() => setMenuOpen(false)}><span>{String(index + 1).padStart(2, "0")}</span>{label}<Arrow /></a>)}
        </nav>
        <div className="menu-meta"><span>Gaborone, Botswana</span><a href="mailto:Marupingjason@gmail.com">Marupingjason@gmail.com</a></div>
      </div>

      <div className={`case-study-overlay ${selectedProject ? "is-open" : ""}`} data-case={selectedProject?.visual || ""} aria-hidden={!selectedProject} role="dialog" aria-modal="true" aria-label={selectedProject ? `${selectedProject.name} case study preview` : "Case study preview"}>
        <button className="case-close" onClick={() => setSelectedProject(null)} aria-label="Close case study">CLOSE <span>×</span></button>
        {selectedProject && (
          <div className="case-study-shell">
            <div className="case-study-index"><span>{selectedProject.id}</span><small>/ 05</small></div>
            <div className="case-study-copy">
              <span className="section-kicker">SELECTED CASE STUDY</span>
              <h2>{selectedProject.name}<span className="red-dot">.</span></h2>
              <b>{selectedProject.type}</b>
              <p>{selectedProject.description}</p>
              <div className="case-study-meta">
                <span><small>FOCUS</small>{selectedProject.focus}</span>
                <span><small>APPROACH</small>{selectedProject.approach}</span>
              </div>
              <div className="case-study-actions">
                {selectedProject.caseStudyPath && <button className="button button-red case-full-link" onClick={() => openFullCaseStudy(selectedProject.caseStudyPath)}>READ FULL CASE STUDY <Arrow /></button>}
                {selectedProject.url !== "#" && <a className="button button-ghost case-live-link" href={selectedProject.url} target="_blank" rel="noreferrer">VIEW LIVE PROJECT <Arrow diagonal /></a>}
                <a className="case-similar-link" href="#contact" onClick={() => setSelectedProject(null)}>BUILD SOMETHING SIMILAR <Arrow /></a>
              </div>
            </div>
            <div className="case-study-visual"><ProjectVisual variant={selectedProject.visual} /></div>
            <div className="case-study-rail" aria-hidden="true"><i/><span>SCROLL STORY / PREVIEW</span></div>
          </div>
        )}
      </div>

      <main>
        <section id="top" className="hero">
          <div className="scroll-rail" aria-hidden="true"><span>SCROLL</span><i /></div>
          <div className="hero-copy">
            <h1 className="hero-title" aria-label="Design. Systems. Intelligence.">
              <span className="hero-line"><span className="hero-word">DESIGN<span className="red-dot">.</span></span></span>
              <span className="hero-line"><span className="hero-word">SYSTEMS<span className="red-dot">.</span></span></span>
              <span className="hero-line"><span className="hero-word">INTELLIGENCE<span className="red-dot">.</span></span></span>
            </h1>
            <h2>WE BUILD DIGITAL SOLUTIONS THAT<br/>DRIVE <em>REAL BUSINESS</em> GROWTH.</h2>
            <p>From powerful websites and intelligent systems to automation, branding and digital products.</p>
            <div className="hero-actions"><a className="button button-dark" href="#work" data-cursor="VIEW" data-magnetic>EXPLORE OUR WORK <Arrow /></a><a className="button button-ghost" href="#services">VIEW SERVICES <Arrow /></a></div>
          </div>
          <DeviceMockup />
        </section>

        <section ref={workRef} id="work" className="work-section">
          <div className="work-label">SELECTED WORK</div><div className="work-progress" aria-hidden="true"><i /></div><div className="work-status" aria-hidden="true"><b>{String(Math.min(5, Math.max(1, Math.ceil(workProgress * 5)))).padStart(2,"0")}</b><span>/05</span></div><div className="work-lock" aria-hidden="true"><span>VERTICAL INPUT</span><i>→</i><span>HORIZONTAL STORY</span></div>
          <div ref={trackRef} className="work-track">
            <div className="work-intro project-slide"><span className="section-kicker">SELECTED WORK</span><h2>REAL PROJECTS.<br/>REAL THINKING<span className="red-dot">.</span></h2><p>Scroll vertically. The story moves horizontally.</p><span className="horizontal-hint">SCROLL TO NAVIGATE →</span></div>
            {projects.map((project) => <article className="project-slide" key={project.id} data-project={project.visual} data-cursor="VIEW"><div className="project-copy"><span className="project-index">{project.id}<small>/05</small></span><h3>{project.name}</h3><span className="project-type">{project.type}</span><p>{project.description}</p><button className="case-link" onClick={() => setSelectedProject(project)}>VIEW CASE STUDY <Arrow /></button></div><ProjectVisual variant={project.visual} /><div className={`project-signature signature-${project.visual}`} aria-hidden="true"><i/><i/><i/></div></article>)}
            <div className="work-end project-slide"><small>ENOUGH TALK.</small><h2>LET&apos;S BUILD<br/>THE NEXT ONE<span className="red-dot">.</span></h2><a href="#contact" className="button button-red">START A PROJECT <Arrow /></a></div>
          </div>
        </section>

        <section id="services" className="services-experience">
          <div className="services-heading reveal"><span className="section-kicker">WHAT WE DO</span><h2>CHOOSE A CAPABILITY.<br/><span>WATCH THE SYSTEM CHANGE.</span></h2></div>
          <div className="service-selector reveal">
            <div className="service-index" role="tablist" aria-label="Services">
              {services.map((service, index) => <button key={service.id} className={activeService === index ? "active" : ""} onMouseEnter={() => setActiveService(index)} onFocus={() => setActiveService(index)} onClick={() => setActiveService(index)} role="tab" aria-selected={activeService === index}><span>{service.id}</span><b>{service.title}</b><Arrow /></button>)}
            </div>
            <div className={`service-stage service-stage-${activeService + 1}`}>
              <span className="stage-label">{activeServiceData.short}</span>
              <div className="stage-orbit"><i/><i/><i/></div>
              <div className="service-visual-shell" key={activeServiceData.id}><ServiceVisual index={activeService} /></div>
              <div className="service-stage-copy"><small>0{activeService + 1} / 06</small><strong>{activeServiceData.title}</strong><p>{activeServiceData.copy}</p></div>
              <a href="#contact" className="stage-link" data-magnetic>DISCUSS THIS CAPABILITY <Arrow /></a>
            </div>
          </div>
        </section>

        <section id="about" className="proof-section">
          <div className="proof-grid reveal"><div><b>Design</b><span>Built to be understood, remembered and trusted.</span></div><div><b>Systems</b><span>Engineered around the way real businesses operate.</span></div><div><b>Intelligence</b><span>Data, automation and technology used with commercial purpose.</span></div><div className="proof-cta"><span className="play">▶</span><b>SHOWREEL</b><small>Motion-led portfolio presentation</small></div></div>
        </section>

        <section id="shop" className="commerce-strip reveal">
          <div><span className="section-kicker">COMMERCE + DIGITAL PRODUCTS</span><h2>CREATIVE WORK THAT CAN<br/>BE BOUGHT, USED AND SCALED.</h2></div>
          <div className="commerce-categories"><span>Custom apparel</span><span>Design products</span><span>Business templates</span><span>Premium services</span></div>
          <a href="#contact" className="button button-dark">EXPLORE THE STORE <Arrow /></a>
        </section>

        <section id="resources" className="process-section">
          <div className="process-head reveal"><span className="section-kicker">HOW WE WORK</span><h2>PRECISION FROM<br/>DISCOVERY TO LAUNCH.</h2></div>
          <div className="process-track reveal">{["DISCOVER", "STRATEGY", "DESIGN", "DEVELOP", "VERIFY", "LAUNCH"].map((step, index) => <div key={step}><span>{String(index + 1).padStart(2,"0")}</span><b>{step}</b><i /></div>)}</div>
        </section>

        <section id="contact" className="closing-section">
          <div className="closing-copy reveal"><small>HAVE A SERIOUS PROJECT?</small><h2>BUILD SOMETHING<br/><em>REMARKABLE.</em></h2><p>Websites, systems, brands, commerce and intelligent digital products — designed as one commercial ecosystem.</p><a href="mailto:Marupingjason@gmail.com" className="button button-red" data-cursor="START" data-magnetic>START A PROJECT <Arrow /></a></div>
          <Image className="watermark" src="/assets/jasonpro-watermark.png" alt="" width={760} height={480} />
        </section>
      </main>
    </div>
  );
}
