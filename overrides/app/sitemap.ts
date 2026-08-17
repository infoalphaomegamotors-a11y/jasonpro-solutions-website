import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://jasonpro-solutions-2026.netlify.app";
  const paths = [
    "/",
    "/services",
    "/services/web-design-development",
    "/services/business-systems-saas",
    "/services/graphic-design-brand-identity",
    "/services/ai-automation-intelligence",
    "/services/business-intelligence-data",
    "/services/commerce-digital-products",
    "/services/photography-content",
    "/services/business-administration-company-secretarial",
    "/services/vehicle-sourcing-sales",
    "/services/custom-clothing-printing",
    "/work",
    "/work/graphic-design-portfolio",
    "/about",
    "/contact",
    "/quote",
    "/consultation",
    "/faq",
    "/shop",
    "/digital-products",
    "/premium",
  ];
  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/services") || path.startsWith("/work") ? 0.9 : path === "/contact" || path === "/quote" || path === "/consultation" ? 0.8 : 0.7,
  }));
}
