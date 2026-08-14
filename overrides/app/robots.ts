import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://jasonprosolutions.netlify.app";
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/portal", "/checkout", "/auth"] },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
