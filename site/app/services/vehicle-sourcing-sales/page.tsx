import type { Metadata } from "next";
import ServiceSalesPage from "@/components/service/ServiceSalesPage";

export const metadata: Metadata = {
  title: "Vehicle Sourcing & Sales | JasonPro Solutions",
  description: "Vehicle sourcing and sales support with transparent specifications, status information and enquiry workflows.",
};

export default function VehicleSourcingSalesPage(){
  return <ServiceSalesPage
    eyebrow="VEHICLE SOURCING + SALES"
    title="MAKE VEHICLE BUYING"
    accent="CLEARER."
    intro="JasonPro supports vehicle sourcing and sales with a focus on clear specifications, transparent status information and practical buyer communication. Live stock, pricing, location and arrival details should always be shown from verified current records rather than assumed or invented listings."
    outcomes={[
      {title:"Improve buyer clarity.",copy:"Present make, model, transmission, fuel type, condition, location and cost information in a way buyers can understand before making an enquiry."},
      {title:"Reduce repeated questions.",copy:"Use structured listings and enquiry workflows so common vehicle details do not have to be re-explained manually to every buyer."},
      {title:"Create a better sales record.",copy:"Track stock status, photos, buyer enquiries and movement information more consistently as vehicles progress through the sales process."},
    ]}
    capabilities={[
      {num:"01",title:"Vehicle sourcing support",copy:"Help structure the sourcing request around the buyer’s preferred make, model, transmission, fuel type, budget and practical constraints.",meta:"Requirements · Sourcing brief · Availability checks"},
      {num:"02",title:"Verified vehicle listings",copy:"Present only current stock and verified vehicle information, with multiple images and status details where available.",meta:"Specifications · Images · Location · Status"},
      {num:"03",title:"Cost + arrival visibility",copy:"Organise verified total-cost, current-location and estimated-arrival information so buyers understand the commercial position of the vehicle.",meta:"Cost breakdown · Logistics status · Arrival information"},
      {num:"04",title:"Enquiry + buyer workflow",copy:"Create a structured enquiry path for questions, viewing interest and follow-up rather than relying only on unstructured messages.",meta:"Buyer enquiries · Follow-up · Stock workflow"},
    ]}
    process={[
      {num:"01",title:"Define",copy:"Capture the buyer requirement or current stock record accurately before presenting options."},
      {num:"02",title:"Verify",copy:"Confirm specifications, photos, location, commercial details and any available status information."},
      {num:"03",title:"Present",copy:"Show the vehicle clearly with the information a buyer needs to compare and enquire responsibly."},
      {num:"04",title:"Follow through",copy:"Track enquiry and status changes so communication remains consistent through the sales process."},
    ]}
    fit={[
      "A buyer looking for a specific vehicle and wanting a structured sourcing process.",
      "A dealer or supplier needing clearer digital presentation of verified current stock.",
      "A buyer who wants vehicle specifications and logistics status presented transparently.",
      "A sales operation that wants enquiries connected to organised stock records.",
    ]}
    ctaTitle="START WITH THE VEHICLE YOU ACTUALLY NEED."
  />;
}
