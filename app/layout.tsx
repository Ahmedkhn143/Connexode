import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import SessionGuard from "@/components/auth/SessionGuard";
import ThemeToggle from "@/components/ui/ThemeToggle";

export const metadata: Metadata = {
  title: "Connexode — Tech Campus Ambassador & Developer Network",
  description:
    "Empowering student tech leaders to run developer communities, organize workshops, and build real-world peer networks on campuses.",
  keywords: [
    "campus ambassador", "tech leadership", "developer community",
    "student network", "peer learning", "coding community", "developer advocate",
  ],
  openGraph: {
    title: "Connexode — Empowering Campuses, Fostering Innovation",
    description:
      "A premium tech network for campus ambassadors and developer communities. Lead workshops, build connections, and get certified.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className="h-full light"
      data-scroll-behavior="smooth"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full antialiased" suppressHydrationWarning>
        <CustomCursor />
        <SessionGuard />
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}
