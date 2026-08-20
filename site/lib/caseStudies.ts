export type CaseStudy = {
  id: string;
  slug: string;
  name: string;
  type: string;
  liveUrl?: string;
  desktopImage: string;
  mobileImage?: string;
  imageAlt: string;
  mobileAlt?: string;
  accent: "blue" | "green" | "red";
  intro: string;
  challengeTitle: string;
  challenge: string;
  responseTitle: string;
  response: string;
  principles: string[];
  interfaceNotes: string[];
  focus: string;
  approach: string;
  audience: string;
  scope: string[];
  constraints: string[];
  deliveryEvidence: string[];
  verification: string;
};

export const caseStudies: Record<string, CaseStudy> = {
  applybw: {
    id: "01",
    slug: "applybw",
    name: "APPLYBW",
    type: "Career Platform / SaaS",
    liveUrl: "https://applybw.netlify.app/",
    desktopImage: "/projects/applybw/desktop.png",
    mobileImage: "/projects/applybw/mobile.jpeg",
    imageAlt: "ApplyBW desktop homepage showing job profile matching and application preparation interface",
    mobileAlt: "ApplyBW mobile workspace loading screen",
    accent: "blue",
    intro: "A Botswana-focused career platform experience built around structured job discovery, qualification matching and professional application preparation.",
    challengeTitle: "MAKE A COMPLEX JOB SEARCH FEEL MANAGEABLE.",
    challenge: "The product has to explain a multi-step career workflow without making the visitor feel as though they are entering a complicated administrative system. The interface therefore needs to establish trust quickly, clarify what the platform does and make the next action obvious.",
    responseTitle: "TURN THE WORKFLOW INTO A CLEAR PRODUCT STORY.",
    response: "The experience foregrounds the user benefit first, then introduces the product through a large interface demonstration. Matching, application readiness and document preparation are presented as understandable steps rather than hidden system behaviour.",
    principles: [
      "Lead with the job-seeker problem before product mechanics.",
      "Use the interface itself as proof of capability.",
      "Keep the primary action visible and decisive.",
      "Maintain a clean responsive experience across desktop and mobile.",
    ],
    interfaceNotes: [
      "Large editorial hero copy creates a strong first-read hierarchy.",
      "The product interface visualises qualification matching and application readiness.",
      "Blue, white and dark navy create a professional employment-tech identity.",
      "Mobile treatment keeps the ApplyBW brand visible while the workspace prepares.",
    ],
    focus: "Product strategy + UX/UI + web platform",
    approach: "Qualification matching, application workflow, responsive experience",
    audience: "Botswana job seekers who need clearer opportunity discovery and a more structured way to prepare and track applications.",
    scope: ["Product positioning and customer journey", "Responsive UX/UI direction", "Qualification-matching and application-readiness presentation", "Career workflow and dashboard experience"],
    constraints: ["Explain several product capabilities without making the first visit feel administrative", "Maintain clarity across desktop and mobile", "Build trust without relying on fabricated placement or employment statistics"],
    deliveryEvidence: ["Live product interface", "Desktop application experience", "Mobile workspace treatment", "Documented matching and application workflow"],
    verification: "This case study shows the live product and documented design decisions. It does not claim job-placement, conversion or revenue metrics that have not been independently measured and supplied.",
  },
  "kwa-masdu-furniture": {
    id: "02",
    slug: "kwa-masdu-furniture",
    name: "KWA MASDU FURNITURE",
    type: "Furniture Commerce",
    liveUrl: "https://kwa-masdu-furniture.vercel.app/",
    desktopImage: "/projects/kwa-masdu/desktop.png",
    mobileImage: "/projects/kwa-masdu/mobile.jpeg",
    imageAlt: "Kwa Masdu Furniture desktop catalogue with furniture categories and product cards",
    mobileAlt: "Kwa Masdu Furniture mobile selected furniture page",
    accent: "green",
    intro: "A furniture-commerce experience that combines catalogue clarity with a more editorial, premium presentation of the products themselves.",
    challengeTitle: "MAKE PRODUCT BROWSING FEEL LIKE A SHOWROOM, NOT A DATABASE.",
    challenge: "Furniture buyers need to compare categories and products while still feeling the character, scale and desirability of the pieces. The challenge is balancing practical catalogue navigation with a more considered retail presentation.",
    responseTitle: "BUILD THE CATALOGUE AROUND VISUAL MERCHANDISING.",
    response: "The desktop experience keeps category navigation and product discovery structured, while the mobile layout shifts toward large editorial product moments. The result gives product photography significantly more visual authority without losing commerce utility.",
    principles: [
      "Give product photography enough scale to sell the piece.",
      "Keep categories visible without overwhelming the catalogue.",
      "Use typography to create a more premium furniture identity.",
      "Recompose the experience for mobile instead of shrinking desktop.",
    ],
    interfaceNotes: [
      "Desktop catalogue combines a persistent category rail with large product cards.",
      "Mobile view uses oversized editorial typography and a single dominant product image.",
      "Green, warm neutral and coral accents support the furniture brand character.",
      "Commerce actions remain readable while imagery stays central.",
    ],
    focus: "Commerce UX + responsive web design",
    approach: "Editorial merchandising, catalogue hierarchy, mobile-first product discovery",
    audience: "Furniture shoppers comparing available pieces and exploring custom-order possibilities across desktop and mobile.",
    scope: ["Commerce information hierarchy", "Category and product-discovery experience", "Responsive storefront design", "Editorial merchandising treatment"],
    constraints: ["Keep practical catalogue navigation visible while increasing visual impact", "Give product imagery enough space without hiding commerce actions", "Recompose the mobile experience instead of simply compressing desktop"],
    deliveryEvidence: ["Live storefront", "Desktop catalogue interface", "Mobile product presentation", "Category and product-card hierarchy"],
    verification: "The case study documents observable interface and merchandising decisions. No sales uplift, conversion-rate improvement or order-volume claim is published without verified source data.",
  },
  "alpha-omega-motors": {
    id: "03",
    slug: "alpha-omega-motors",
    name: "ALPHA OMEGA MOTORS",
    type: "Automotive Sales Platform",
    desktopImage: "/projects/alpha-omega/desktop.png",
    imageAlt: "Alpha Omega Motors desktop homepage promoting imported vehicles and vehicle search",
    accent: "red",
    intro: "A direct automotive sales experience for imported vehicles, positioned around Gaborone, Botswana and a clear path from vehicle discovery to enquiry.",
    challengeTitle: "BUILD TRUST BEFORE ASKING FOR THE ENQUIRY.",
    challenge: "Vehicle purchasing is high-consideration. The landing experience therefore needs to communicate the offer immediately, explain the sourcing proposition and make stock discovery feel straightforward before asking the visitor to contact the business.",
    responseTitle: "LEAD WITH THE OFFER, THEN REMOVE SEARCH FRICTION.",
    response: "The page combines an assertive headline with a dedicated vehicle-search module in the first viewport. The dark automotive presentation keeps the experience focused while red actions create a strong conversion path toward stock search and direct contact.",
    principles: [
      "State the vehicle proposition immediately.",
      "Keep search and enquiry actions in the first viewport.",
      "Use strong contrast to reinforce the automotive sales identity.",
      "Make location and import context visible without clutter.",
    ],
    interfaceNotes: [
      "Large headline establishes the imported-vehicle proposition at first glance.",
      "Search module separates query and make selection into a simple sequence.",
      "Black, white and red create a direct, performance-oriented sales language.",
      "Direct contact remains prominent as a low-friction enquiry route.",
    ],
    focus: "Landing-page UX + trust-driven sales design",
    approach: "Vehicle search, conversion hierarchy, strong regional positioning",
    audience: "Prospective vehicle buyers who need to understand the imported-stock proposition, browse efficiently and reach the seller with confidence.",
    scope: ["Automotive landing-page strategy", "Vehicle discovery and search presentation", "Trust-led conversion hierarchy", "Direct-enquiry experience"],
    constraints: ["Communicate a high-consideration purchase proposition quickly", "Keep stock discovery prominent", "Avoid publishing unverified inventory, pricing or project-performance claims"],
    deliveryEvidence: ["Production interface screenshot", "Vehicle-search presentation", "Conversion-focused first viewport", "Regional positioning and enquiry hierarchy"],
    verification: "The interface evidence is shown directly. The external project URL is intentionally not published here until it is confirmed, and no vehicle-sales performance metrics are claimed without verified data.",
  },
};
