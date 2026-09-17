import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { fontVariables } from "@/lib/fonts";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SiteAtlas by Kinetix Africa — Real businesses, reimagined for the web",
    template: "%s | SiteAtlas",
  },
  description:
    "A curated showcase of independent website concepts created by Kinetix Africa for real businesses across Kenya and beyond.",
  applicationName: "SiteAtlas",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    siteName: "SiteAtlas by Kinetix Africa",
    title: "SiteAtlas — Real businesses, reimagined for the web",
    description: "Independent website concepts for real businesses across Kenya and beyond, by Kinetix Africa.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f4f2ee",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
