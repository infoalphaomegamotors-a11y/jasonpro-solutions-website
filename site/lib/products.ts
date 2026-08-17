export type Product = {
  slug: string;
  name: string;
  category: string;
  kind: "service" | "digital" | "physical";
  priceLabel: string;
  description: string;
  deliverables: string[];
  accent: "red" | "black" | "white";
};

export const products: Product[] = [
  {
    slug: "website-launch-package",
    name: "Website Launch Package",
    category: "Web Design",
    kind: "service",
    priceLabel: "Quote-based",
    description: "A focused website design and development engagement for businesses that need a credible, conversion-ready digital presence.",
    deliverables: ["Discovery and page strategy", "Responsive UI design", "Production frontend", "Launch preparation"],
    accent: "red",
  },
  {
    slug: "brand-identity-system",
    name: "Brand Identity System",
    category: "Branding",
    kind: "service",
    priceLabel: "Quote-based",
    description: "A structured identity system for businesses that need a clearer, more distinctive and more consistent market presence.",
    deliverables: ["Identity direction", "Logo system", "Typography and colour rules", "Core application templates"],
    accent: "black",
  },
  {
    slug: "business-document-kit",
    name: "Business Document Kit",
    category: "Digital Product",
    kind: "digital",
    priceLabel: "Price managed in admin",
    description: "A reusable professional document system for quotations, invoices, proposals and recurring client communication.",
    deliverables: ["Editable templates", "Consistent hierarchy", "Print-ready layouts", "Usage guidance"],
    accent: "white",
  },
  {
    slug: "custom-printed-apparel",
    name: "Custom Printed Apparel",
    category: "Merchandise",
    kind: "physical",
    priceLabel: "Quote-based",
    description: "Branded apparel and custom print production for businesses, events, teams and campaigns.",
    deliverables: ["Garment selection", "Artwork preparation", "Print specification", "Production quotation"],
    accent: "red",
  },
];
