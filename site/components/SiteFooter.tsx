"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const groups = [
  {
    title: "CAPABILITIES",
    links: [
      ["Web Design & Development", "/services/web-design-development"],
      ["Business Systems & SaaS", "/services/business-systems-saas"],
      ["Graphic Design & Brand Identity", "/services/graphic-design-brand-identity"],
      ["AI & Automation", "/services/ai-automation-intelligence"],
      ["Business Intelligence & Data", "/services/business-intelligence-data"],
    ],
  },
  {
    title: "EXPLORE",
    links: [
      ["Selected Work", "/work"],
      ["Graphic Design Portfolio", "/work/graphic-design-portfolio"],
      ["About JasonPro", "/about"],
      ["Insights", "/insights"],
      ["Shop", "/shop"],
    ],
  },
  {
    title: "WORK WITH US",
    links: [
      ["Start a Project", "/contact"],
      ["Request a Quote", "/quote"],
      ["Request a Consultation", "/consultation"],
      ["FAQ", "/faq"],
      ["Client Login", "/auth/sign-in"],
    ],
  },
] as const;

const policyLinks = [
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
  ["Refund & Cancellation", "/refund-cancellation"],
  ["Accessibility", "/accessibility"],
] as const;

export default function SiteFooter() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin") || pathname.startsWith("/portal") || pathname.startsWith("/auth")) return null;

  return (
    <footer className="jp-footer">
      <div className="jp-footer-top">
        <div className="jp-footer-brand">
          <Image src="/assets/jasonpro-logo-light.png" alt="JasonPro Solutions" width={170} height={92} />
          <p>Design, systems and intelligence for modern business.</p>
          <div className="jp-footer-contact">
            <a href="mailto:Marupingjason@gmail.com">Marupingjason@gmail.com</a>
            <a href="tel:+26776534997">+267 76534997</a>
            <span>Gaborone, Botswana</span>
          </div>
        </div>
        <div className="jp-footer-groups">
          {groups.map((group) => (
            <div key={group.title}>
              <small>{group.title}</small>
              {group.links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}
            </div>
          ))}
        </div>
      </div>
      <div className="jp-footer-cta">
        <div>
          <small>HAVE A REAL BUSINESS PROBLEM TO SOLVE?</small>
          <h2>BUILD THE NEXT<br/>THING PROPERLY.</h2>
        </div>
        <Link href="/contact">START A PROJECT →</Link>
      </div>
      <div className="jp-footer-bottom">
        <span>© 2026 JASONPRO SOLUTIONS</span>
        <div>{policyLinks.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}</div>
      </div>
      <style jsx>{`
        .jp-footer{background:#080808;color:#fff;border-top:1px solid #222}.jp-footer-top{padding:72px 5vw 64px;display:grid;grid-template-columns:.8fr 1.2fr;gap:7vw}.jp-footer-brand img{width:150px;height:auto}.jp-footer-brand p{max-width:360px;color:#aaa;line-height:1.65;margin:22px 0 24px}.jp-footer-contact{display:grid;gap:8px;font-size:13px}.jp-footer-contact a{color:#fff}.jp-footer-contact span{color:#888}.jp-footer-groups{display:grid;grid-template-columns:repeat(3,1fr);gap:34px}.jp-footer-groups>div{display:grid;align-content:start;gap:12px}.jp-footer-groups small,.jp-footer-cta small{font-size:9px;letter-spacing:.18em;color:#e22;font-weight:800;margin-bottom:10px}.jp-footer-groups a{font-size:13px;color:#c9c9c9;line-height:1.45}.jp-footer-groups a:hover{color:#fff}.jp-footer-cta{border-top:1px solid #222;border-bottom:1px solid #222;padding:54px 5vw;display:flex;align-items:end;justify-content:space-between;gap:32px}.jp-footer-cta h2{font-size:clamp(38px,5.6vw,82px);line-height:.88;letter-spacing:-.055em;margin:18px 0 0}.jp-footer-cta>a{background:#e21f2b;color:#fff;padding:18px 22px;font-size:10px;letter-spacing:.12em;font-weight:800;white-space:nowrap}.jp-footer-bottom{padding:22px 5vw;display:flex;justify-content:space-between;gap:24px;align-items:center;color:#777;font-size:9px;letter-spacing:.08em}.jp-footer-bottom>div{display:flex;gap:18px;flex-wrap:wrap}.jp-footer-bottom a{color:#888}.jp-footer-bottom a:hover{color:#fff}@media(max-width:900px){.jp-footer-top{grid-template-columns:1fr}.jp-footer-groups{grid-template-columns:1fr 1fr}.jp-footer-cta{align-items:flex-start;flex-direction:column}.jp-footer-bottom{align-items:flex-start;flex-direction:column}}@media(max-width:560px){.jp-footer-top{padding-top:54px}.jp-footer-groups{grid-template-columns:1fr}.jp-footer-cta{padding-top:48px;padding-bottom:48px}.jp-footer-cta>a{width:100%;text-align:center}}
      `}</style>
    </footer>
  );
}
