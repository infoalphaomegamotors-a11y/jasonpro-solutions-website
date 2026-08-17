import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JasonPro Solutions — Design. Systems. Intelligence.",
  description:
    "JasonPro Solutions builds premium websites, business systems, brands, automation and digital products for modern business.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
