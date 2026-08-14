import type { Metadata } from "next";
import ServiceSalesPage from "@/components/service/ServiceSalesPage";

export const metadata: Metadata = {
  title: "Graphic Design & Brand Identity | JasonPro Solutions",
  description: "Brand identity systems, campaigns and production-ready graphic design built for consistency, recognition and commercial credibility.",
};

export default function GraphicDesignBrandIdentityPage(){
  return <ServiceSalesPage
    eyebrow="GRAPHIC DESIGN + BRAND IDENTITY"
    title="MAKE THE BUSINESS"
    accent="RECOGNISABLE."
    intro="JasonPro develops visual systems that help businesses look deliberate, consistent and credible across every customer touchpoint. The work goes beyond a logo: it connects identity, typography, colour, layout, campaign design and production rules so the brand can operate with confidence in print and digital environments."
    outcomes={[
      {title:"Create recognition.",copy:"Build a visual language people can identify quickly instead of relying on unrelated designs from one campaign to the next."},
      {title:"Increase consistency.",copy:"Give the business usable rules and assets so social posts, proposals, uniforms, signage, websites and campaigns feel like one brand."},
      {title:"Raise perceived quality.",copy:"Make the presentation of the business match the quality it wants clients to expect from the service or product itself."},
    ]}
    capabilities={[
      {num:"01",title:"Brand strategy + visual direction",copy:"Clarify how the business should present itself, the visual territory it should own and how identity decisions support positioning rather than decoration.",meta:"Positioning · Art direction · Visual territory · Brand logic"},
      {num:"02",title:"Logo + identity systems",copy:"Develop marks, typography, colour systems, lockups, spacing rules and supporting graphic language designed to work across real applications.",meta:"Logo systems · Typography · Colour · Usage rules"},
      {num:"03",title:"Campaign + marketing design",copy:"Translate the identity into promotional materials that carry hierarchy, clarity and consistency across digital and physical campaigns.",meta:"Flyers · Social media · Posters · Campaign systems"},
      {num:"04",title:"Corporate + operational collateral",copy:"Create the business materials people actually use—proposals, stationery, profiles, presentations, signage and branded templates.",meta:"Profiles · Presentations · Stationery · Templates"},
      {num:"05",title:"Production-ready artwork",copy:"Prepare artwork with the practical constraints of print, embroidery, signage, merchandise and digital delivery in mind so execution does not collapse after approval.",meta:"Print production · Merchandise · Signage · Digital assets"},
    ]}
    process={[
      {num:"01",title:"Understand",copy:"Define the audience, business context, existing reputation, competitive visual space and practical applications."},
      {num:"02",title:"Direct",copy:"Establish the visual concept, design principles, tone and hierarchy before expanding into a full system."},
      {num:"03",title:"Systemise",copy:"Build the identity across repeated applications and document how the elements should work together."},
      {num:"04",title:"Prepare",copy:"Deliver clean, organised production-ready assets for the formats and suppliers the business actually needs."},
    ]}
    proof={[
      {label:"MULTI-DISCIPLINARY BRAND",title:"JasonPro Solutions",copy:"JasonPro’s own visual language connects the website, interface system, commercial materials and broader service identity around one controlled brand system."},
      {label:"PORTFOLIO",title:"Selected Work",copy:"The Work section is the primary place to evaluate the visual and systems thinking applied across verified JasonPro projects.",href:"/work"},
    ]}
    fit={[
      "A new business that needs a complete identity rather than a standalone logo file.",
      "An established company whose visual materials no longer feel consistent or professional.",
      "A campaign that needs strong hierarchy and recognisable branded execution.",
      "An organisation preparing print, signage, merchandise or corporate materials at scale.",
      "A founder who wants the brand and website to feel like one connected commercial system.",
    ]}
    ctaTitle="BUILD A BRAND SYSTEM PEOPLE CAN RECOGNISE."
  />;
}
