import type { MetadataRoute } from "next";
import { insights } from "@/lib/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://jasonpro-solutions-2026.netlify.app";
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
    "/work/applybw",
    "/work/kwa-masdu-furniture",
    "/work/alpha-omega-motors",
    "/work/graphic-design-portfolio",
    "/about",
    "/insights",
    ...insights.map(item=>`/insights/${item.slug}`),
    "/contact",
    "/quote",
    "/consultation",
    "/faq",
    "/shop",
    "/privacy",
    "/terms",
    "/refund-cancellation",
    "/accessibility",
  ];
  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : path.startsWith("/insights/") ? "yearly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/services") || path.startsWith("/work") ? 0.9 : path === "/contact" || path === "/quote" || path === "/consultation" ? 0.8 : path.startsWith("/privacy") || path.startsWith("/terms") || path.startsWith("/refund") || path.startsWith("/accessibility") ? 0.4 : 0.7,
  }));
}
