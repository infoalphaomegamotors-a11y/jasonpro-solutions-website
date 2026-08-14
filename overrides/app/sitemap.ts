import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://jasonprosolutions.netlify.app";
  const paths = [
    "/",
    "/services",
    "/services/web-design-development",
    "/services/business-systems-saas",
    "/work",
    "/about",
    "/contact",
    "/shop",
    "/digital-products",
    "/premium",
  ];
  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/services") || path === "/work" ? 0.9 : 0.7,
  }));
}
