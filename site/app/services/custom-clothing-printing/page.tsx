import type { Metadata } from "next";
import ServiceSalesPage from "@/components/service/ServiceSalesPage";

export const metadata: Metadata = {
  title: "Custom Clothing & Printing | JasonPro Solutions",
  description: "Custom printed clothing and branded merchandise workflows for businesses, events and organisations.",
};

export default function CustomClothingPrintingPage(){
  return <ServiceSalesPage
    eyebrow="CUSTOM CLOTHING + PRINTING"
    title="TURN THE BRAND"
    accent="INTO SOMETHING PEOPLE WEAR."
    intro="JasonPro supports custom printed clothing and branded merchandise for businesses, events and organisations. The service connects artwork preparation, garment selection, sizing, proofing and production communication so the final item is treated as a real branded product rather than just a logo placed on a shirt."
    outcomes={[
      {title:"Create better branded merchandise.",copy:"Match garment, artwork, placement and production method so the finished item feels intentional rather than improvised."},
      {title:"Reduce proofing mistakes.",copy:"Use clear artwork approval, size and quantity confirmation before production so preventable errors are caught earlier."},
      {title:"Make repeat orders easier.",copy:"Keep approved artwork and product specifications organised so future runs can be prepared more consistently."},
    ]}
    capabilities={[
      {num:"01",title:"Custom T-shirt + apparel design",copy:"Prepare front, back, sleeve and placement concepts suited to the garment and the intended use of the merchandise.",meta:"T-shirts · Corporate wear · Event merchandise · Branded clothing"},
      {num:"02",title:"Artwork preparation",copy:"Prepare clean production artwork with appropriate sizing, positioning and file formats for the selected printing or branding method.",meta:"Print files · Vector artwork · Placement · Production setup"},
      {num:"03",title:"Proof + order coordination",copy:"Confirm garment option, colour, sizes, quantities and artwork proof before production proceeds.",meta:"Sizing · Quantities · Proof approval · Order records"},
      {num:"04",title:"Brand + campaign integration",copy:"Connect merchandise to the wider identity or campaign so clothing supports the brand rather than becoming a disconnected item.",meta:"Brand systems · Events · Campaign merchandise · Staff wear"},
    ]}
    process={[
      {num:"01",title:"Specify",copy:"Define garment type, colour, sizes, quantity, budget context and intended use."},
      {num:"02",title:"Design",copy:"Prepare or adapt the artwork with placement and production constraints in mind."},
      {num:"03",title:"Approve",copy:"Review the proof and confirm all product and artwork details before production."},
      {num:"04",title:"Produce",copy:"Proceed using the approved specification and retain the final setup for future reference where appropriate."},
    ]}
    fit={[
      "A business preparing staff clothing or branded corporate wear.",
      "An event or organisation producing custom T-shirts or merchandise.",
      "A brand that needs artwork designed specifically for apparel rather than reused without adaptation.",
      "A repeat customer who wants approved artwork and garment specifications kept organised.",
    ]}
    ctaTitle="MAKE THE MERCHANDISE FEEL LIKE PART OF THE BRAND."
  />;
}
