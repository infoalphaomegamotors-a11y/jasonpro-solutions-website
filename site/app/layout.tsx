import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jasonpro-solutions-2026.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "JasonPro Solutions — Design, Systems & Intelligence",
    template: "%s | JasonPro Solutions",
  },
  description: "JasonPro Solutions designs websites, business systems, brands, automation and data-driven digital experiences for modern business in Botswana and beyond.",
  openGraph: {
    type: "website",
    siteName: "JasonPro Solutions",
    title: "JasonPro Solutions — Design, Systems & Intelligence",
    description: "Web design, business systems, branding, automation and digital intelligence built around real business outcomes.",
    url: siteUrl,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
