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

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://connexode.com/#organization",
      name: "Connexode",
      url: "https://connexode.com",
      logo: {
        "@type": "ImageObject",
        "@id": "https://connexode.com/#logo",
        url: "https://connexode.com/icon.png",
        contentUrl: "https://connexode.com/icon.png",
        caption: "Connexode Logo",
      },
      image: "https://connexode.com/og-image.png",
      description:
        "Global tech services + campus internships + ambassador program. Pakistan-based, world-delivered.",
      founder: {
        "@id": "https://connexode.com/#founder",
      },
      employee: [
        {
          "@id": "https://connexode.com/#founder",
        },
        {
          "@id": "https://connexode.com/#coo",
        },
      ],
      sameAs: [
        "https://www.linkedin.com/company/connexode",
        "https://www.linkedin.com/in/muhamad-ahmd/",
        "https://www.linkedin.com/in/muhammad-nadeem404",
      ],
    },
    {
      "@type": "Person",
      "@id": "https://connexode.com/#founder",
      name: "Muhammad Ahmad",
      givenName: "Muhammad",
      familyName: "Ahmad",
      jobTitle: "Founder & Chief Executive Officer",
      alternateName: ["Muhammad Ahmad Connexode", "Founder of Connexode"],
      image: "https://connexode.com/Founder.png",
      url: "https://connexode.com/about",
      email: "ahmadkhn8143@gmail.com",
      worksFor: {
        "@id": "https://connexode.com/#organization",
      },
      sameAs: [
        "https://www.linkedin.com/in/muhamad-ahmd/",
      ],
    },
    {
      "@type": "Person",
      "@id": "https://connexode.com/#coo",
      name: "Muhammad Nadeem",
      givenName: "Muhammad",
      familyName: "Nadeem",
      jobTitle: "Chief Operating Officer",
      alternateName: ["Muhammad Nadeem Connexode", "COO of Connexode"],
      image: "https://connexode.com/COO.jpeg",
      url: "https://connexode.com/about",
      email: "muhammadnadeem2848@gmail.com",
      worksFor: {
        "@id": "https://connexode.com/#organization",
      },
      sameAs: [
        "https://www.linkedin.com/in/muhammad-nadeem404",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://connexode.com/#website",
      url: "https://connexode.com",
      name: "Connexode",
      description:
        "Global tech services + campus internships + ambassador program. Pakistan-based, world-delivered.",
      publisher: {
        "@id": "https://connexode.com/#organization",
      },
    },
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
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

