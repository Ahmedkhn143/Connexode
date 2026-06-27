// app/not-found.tsx
// Custom 404 page — shown when any route is not found
// Next.js App Router automatically uses this file

import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main
      style={{ backgroundColor: "#040C18" }}
      className="flex min-h-screen flex-col items-center justify-center px-6 antialiased"
    >
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 flex items-center justify-center"
      >
        <div
          style={{ backgroundColor: "rgba(24,128,128,0.07)" }}
          className="h-[500px] w-[700px] rounded-full blur-[130px]"
        />
      </div>

      <div className="relative text-center">

        {/* 404 number */}
        <p
          style={{
            background: "linear-gradient(135deg, rgba(126,200,216,0.15) 0%, rgba(24,128,128,0.08) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontSize: "clamp(100px, 20vw, 180px)",
            lineHeight: 1,
            fontWeight: 800,
            letterSpacing: "-4px",
          }}
          className="select-none"
        >
          404
        </p>

        {/* Divider */}
        <div
          style={{
            background: "linear-gradient(90deg, transparent, #188080, transparent)",
          }}
          className="mx-auto my-6 h-px w-24"
        />

        {/* Text */}
        <h1
          style={{ color: "#E8F4F8" }}
          className="mb-3 text-2xl font-bold"
        >
          Page not found
        </h1>
        <p
          style={{ color: "rgba(126,200,216,0.5)" }}
          className="mx-auto mb-10 max-w-sm text-sm leading-relaxed"
        >
          This page doesn&apos;t exist or may have been moved.
          Head back home or explore what Connexode has to offer.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            style={{ backgroundColor: "#188080", color: "#E8F4F8" }}
            className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all hover:brightness-110 active:scale-95"
          >
            <Home size={14} />
            Back to home
          </Link>
          <Link
            href="/join"
            style={{
              border: "1px solid rgba(126,200,216,0.2)",
              color: "rgba(126,200,216,0.6)",
            }}
            className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all hover:text-[#7EC8D8]"
          >
            Join Connexode
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {[
            ["About",            "/about"                    ],
            ["Services",         "/services"                 ],
            ["Ambassador Program","/join/ambassador"         ],
            ["Internship",       "/join/internship"          ],
            ["Verify Certificate","/verify"                  ],
            ["Contact",          "/contact"                  ],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              style={{ color: "rgba(126,200,216,0.3)" }}
              className="text-xs transition-colors hover:text-[#7EC8D8]"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
