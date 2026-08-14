import type { Metadata } from "next";
import ServiceSalesPage from "@/components/service/ServiceSalesPage";

export const metadata: Metadata = {
  title: "Commerce & Digital Products | JasonPro Solutions",
  description: "Online stores, digital-product catalogues, memberships and subscription experiences designed around clear purchase journeys and operational control.",
};

export default function CommerceDigitalProductsPage(){
  return <ServiceSalesPage
    eyebrow="COMMERCE + DIGITAL PRODUCTS"
    title="BUILD A BUYING JOURNEY"
    accent="PEOPLE CAN TRUST."
    intro="JasonPro designs commerce experiences for physical products, digital products, memberships and service packages. The work connects catalogue structure, product information, account flows, checkout logic and post-purchase operations so selling online is treated as a system rather than just a payment button."
    outcomes={[
      {title:"Make products easier to evaluate.",copy:"Structure product information, options, delivery expectations and calls to action so customers can make a clearer buying decision."},
      {title:"Reduce checkout uncertainty.",copy:"Design the purchase path around transparent pricing, account state, payment status and confirmation instead of leaving customers unsure what happened."},
      {title:"Connect sales to operations.",copy:"Link orders, entitlements, downloads, fulfilment or support to the customer record so post-purchase work is easier to manage."},
    ]}
    capabilities={[
      {num:"01",title:"Store + catalogue architecture",copy:"Organise physical products, digital goods, packages and memberships into a commercial structure customers can understand and browse.",meta:"Catalogue · Categories · Product details · Offers"},
      {num:"02",title:"Cart + checkout UX",copy:"Design cart, checkout, payment-state and confirmation experiences around clarity, error recovery and trust.",meta:"Cart · Checkout · Payment state · Confirmation"},
      {num:"03",title:"Digital products + entitlements",copy:"Create account-based access to purchased downloads, premium resources or member-only tools with server-side access control where required.",meta:"Downloads · Entitlements · Premium access · Accounts"},
      {num:"04",title:"Membership + subscription foundations",copy:"Structure plans, benefits, access rules, renewal states and account management before connecting a live recurring-payment provider.",meta:"Plans · Subscriptions · Access rules · Billing states"},
      {num:"05",title:"Commerce operations",copy:"Connect orders, fulfilment status, support and administrative visibility so the store can be operated after launch rather than only displayed.",meta:"Orders · Admin · Fulfilment · Support"},
    ]}
    process={[
      {num:"01",title:"Model the offer",copy:"Define what is being sold, what the buyer receives, fulfilment rules, pricing source and operational responsibilities."},
      {num:"02",title:"Design the journey",copy:"Map discovery, product evaluation, cart, checkout, confirmation and account states before implementation."},
      {num:"03",title:"Connect the system",copy:"Build catalogue, account, order and entitlement logic with secure provider integration when payment credentials are ready."},
      {num:"04",title:"Verify end-to-end",copy:"Test successful, failed, cancelled and incomplete purchase states before treating the commerce path as production-ready."},
    ]}
    fit={[
      "A business selling physical and digital products from one platform.",
      "A creator or company preparing paid resources, templates or downloads.",
      "A service business packaging repeatable offers for online purchase or quotation.",
      "A membership product that needs controlled content or tool access.",
      "A store that needs customer accounts and operations connected to the buying journey.",
    ]}
    ctaTitle="DESIGN THE SALE AND THE OPERATION BEHIND IT."
  />;
}
