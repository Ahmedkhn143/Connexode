import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import ThemeToggle from "@/components/ui/ThemeToggle";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Connexode — Build. Connect. Grow.",
  description:
    "Global tech services + campus internships + ambassador program. Pakistan-based, world-delivered.",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Connexode",
  url: "https://connexode.com",
  logo: "https://connexode.com/logo.png",
  description:
    "Global tech services + campus internships + ambassador program. Pakistan-based, world-delivered.",
  founder: {
    "@type": "Person",
    name: "Muhammad Ahmad",
    jobTitle: "Founder & Chief Executive Officer",
    url: "https://www.linkedin.com/in/muhamad-ahmd/",
    email: "ahmadkhn8143@gmail.com",
  },
  employee: [
    {
      "@type": "Person",
      name: "Muhammad Ahmad",
      jobTitle: "Founder & CEO",
      url: "https://www.linkedin.com/in/muhamad-ahmd/",
    },
    {
      "@type": "Person",
      name: "Muhammad Nadeem",
      jobTitle: "Chief Operating Officer",
      url: "https://www.linkedin.com/in/muhammad-nadeem404",
      email: "muhammadnadeem2848@gmail.com",
    },
  ],
  sameAs: [
    "https://www.linkedin.com/in/muhamad-ahmd/",
    "https://www.linkedin.com/in/muhammad-nadeem404",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className="min-h-full antialiased"
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        <ThemeProvider>
          {children}
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}

