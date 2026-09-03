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
  metadataBase: new URL("https://connexode.com"),
  title: "Connexode — Build. Connect. Grow.",
  description:
    "Global tech services + campus internships + ambassador program. Pakistan-based, world-delivered.",
  icons: {
    icon: [
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Connexode — Build. Connect. Grow.",
    description:
      "Global tech services + campus internships + ambassador program. Pakistan-based, world-delivered.",
    url: "https://connexode.com",
    siteName: "Connexode",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Connexode — Build. Connect. Grow.",
      },
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Connexode Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Connexode — Build. Connect. Grow.",
    description:
      "Global tech services + campus internships + ambassador program. Pakistan-based, world-delivered.",
    images: ["/og-image.png"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Connexode",
  url: "https://connexode.com",
  logo: "https://connexode.com/icon.png",
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
        <link rel="icon" href="/icon.png" type="image/png" sizes="512x512" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icon.png" />
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

