// app/layout.tsx
// Root layout — Nav + Footer shared across ALL pages
// Includes: mobile hamburger drawer, SEO metadata, OpenGraph
// Colors: Navy #082038 · Teal #188080 · Cyan #7EC8D8

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RootNav } from "@/components/layout/RootNav";
import { RootFooter } from "@/components/layout/RootFooter";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// ─── SEO METADATA ────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL("https://connexode.vercel.app"),
  title: {
    default: "Connexode — Campus Talent Network",
    template: "%s | Connexode",
  },
  description:
    "Connexode trains campus ambassadors and interns through mentorship, AI-skill workshops, and structured tracks — and delivers development, design, and growth services through a dedicated team.",
  keywords: [
    "Connexode", "campus ambassador", "internship Pakistan",
    "tech internship", "AI education", "web development internship",
    "student community Pakistan", "KFUEIT", "tech education",
  ],
  authors: [{ name: "Ahmad Khan", url: "https://connexode.vercel.app" }],
  creator: "Connexode",
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://connexode.vercel.app",
    siteName: "Connexode",
    title: "Connexode — Campus Talent Network",
    description:
      "Train, connect, and grow with Pakistan's campus tech community.",
    images: [
      {
        url: "/og-image.png",   // add a 1200×630 branded image to /public/
        width: 1200,
        height: 630,
        alt: "Connexode — Campus Talent Network",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Connexode — Campus Talent Network",
    description: "Train, connect, and grow with Pakistan's campus tech community.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

// ─── LAYOUT ──────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        style={{ backgroundColor: "#040C18" }}
        className="font-sans antialiased"
      >
        <RootNav />
        {children}
        <RootFooter />
      </body>
    </html>
  );
}
