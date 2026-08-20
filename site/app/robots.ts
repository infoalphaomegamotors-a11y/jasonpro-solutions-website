import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://jasonpro-solutions-2026.netlify.app";
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/portal", "/checkout", "/cart", "/premium", "/digital-products", "/auth"] },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
