import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import RoleSwitcher from "@/components/layout/RoleSwitcher";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Connexode — Virtual Internship & Learning Platform",
  description:
    "Build real skills through structured daily tasks, GitHub project submissions, and industry-verified certificates. Choose from 6 tech tracks: Full Stack, AI, DevOps, and more.",
  keywords: [
    "virtual internship", "tech learning", "full stack development",
    "AI engineering", "student projects", "coding bootcamp", "online internship",
  ],
  openGraph: {
    title: "Connexode — Build Real Skills. Get Real Experience.",
    description:
      "A premium task-based internship platform. Study, build, submit, and get certified — no videos, just real work.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <CustomCursor />
        <RoleSwitcher />
        {children}
      </body>
    </html>
  );
}
