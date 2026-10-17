import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { profile, siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: profile.name,
  description: profile.headline,
  authors: [{ name: profile.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "fr_FR",
    siteName: profile.name,
    title: profile.name,
    description: profile.shortHeadline,
    url: "/",
    firstName: "Alaaeddine",
    lastName: "Ahriz",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: profile.name,
    description: profile.shortHeadline,
    images: ["/og.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#fbfaf8",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={GeistSans.variable}>
      <body>{children}</body>
    </html>
  );
}
