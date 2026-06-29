import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import ThemeToggle from "@/components/ui/ThemeToggle";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Connexode — Build. Connect. Grow.",
  description: "Global tech services + campus internships + ambassador program. Pakistan-based, world-delivered.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full antialiased" style={{ backgroundColor: "var(--theme-bg)", fontFamily: "var(--font-inter), sans-serif" }}>
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}
