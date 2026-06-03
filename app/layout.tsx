import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import RoleSwitcher from "@/components/layout/RoleSwitcher";

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
      className="h-full"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full antialiased">
        <CustomCursor />
        <RoleSwitcher />
        {children}
      </body>
    </html>
  );
}

