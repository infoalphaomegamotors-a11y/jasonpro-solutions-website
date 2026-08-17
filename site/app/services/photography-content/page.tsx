import type { Metadata } from "next";
import ServiceSalesPage from "@/components/service/ServiceSalesPage";

export const metadata: Metadata = {
  title: "Photography & Content | JasonPro Solutions",
  description: "Commercial photography and visual content designed to give brands stronger, more credible imagery across web, campaign and business materials.",
};

export default function PhotographyContentPage(){
  return <ServiceSalesPage
    eyebrow="PHOTOGRAPHY + VISUAL CONTENT"
    title="SHOW THE BUSINESS"
    accent="AT ITS BEST."
    intro="JasonPro creates commercial photography and visual content for businesses that need authentic imagery rather than generic stock. The focus is useful content—images that strengthen websites, campaigns, profiles, products and social communication while remaining consistent with the wider brand system."
    outcomes={[
      {title:"Replace generic imagery.",copy:"Build a real visual library around the people, products, spaces and work that actually represent the business."},
      {title:"Create content with purpose.",copy:"Plan photography around where the images will be used so composition, orientation and subject matter support the website or campaign instead of becoming unused files."},
      {title:"Strengthen brand credibility.",copy:"Give customers a clearer view of the people and work behind the business through controlled, consistent commercial imagery."},
    ]}
    capabilities={[
      {num:"01",title:"Brand + business photography",copy:"Create images for websites, profiles, campaigns and company communication with a visual direction connected to the brand.",meta:"Business portraits · Teams · Spaces · Brand imagery"},
      {num:"02",title:"Product + merchandise photography",copy:"Photograph physical products and branded merchandise for catalogue, ecommerce and marketing use with consistent framing and presentation.",meta:"Products · Clothing · Catalogue · E-commerce"},
      {num:"03",title:"Campaign content planning",copy:"Define the shot list, required formats and content use before shooting so the final library supports real campaign needs.",meta:"Art direction · Shot lists · Social formats · Campaign assets"},
      {num:"04",title:"Website content production",copy:"Capture horizontal, vertical and detail imagery designed to fit responsive web layouts and editorial sections rather than forcing generic crops later.",meta:"Hero imagery · Case studies · About pages · Responsive crops"},
    ]}
    process={[
      {num:"01",title:"Brief",copy:"Clarify the audience, brand, channels, required subjects and exact content outputs."},
      {num:"02",title:"Plan",copy:"Prepare the visual direction, shot list, locations, people, products and usage requirements."},
      {num:"03",title:"Capture",copy:"Produce the agreed photography with attention to consistency and intended placement."},
      {num:"04",title:"Prepare",copy:"Select and prepare the final content for the formats and platforms where it will actually be used."},
    ]}
    fit={[
      "A business replacing stock photography with authentic brand imagery.",
      "A company preparing a new website, profile or campaign.",
      "A product or clothing seller needing consistent catalogue images.",
      "A founder or professional requiring controlled business portraits.",
      "A brand that wants photography planned together with design rather than as a separate afterthought.",
    ]}
    ctaTitle="BUILD A VISUAL LIBRARY THE BUSINESS CAN ACTUALLY USE."
  />;
}
