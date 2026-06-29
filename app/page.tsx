"use client";

import Link from "next/link";
import { Briefcase, BookOpen, Users, ArrowRight } from "lucide-react";
import PublicNav from "@/components/layout/PublicNav";
import PublicFooter from "@/components/layout/PublicFooter";

export default function Home() {
  return (
    <div style={{ backgroundColor: "#050508", color: "#FAFAFA" }} className="min-h-screen flex flex-col font-sans">
      <PublicNav />

      {/* Hero Section */}
      <section
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(124,58,237,0.12) 0%, transparent 70%)",
        }}
        className="relative pt-36 pb-20 px-6 flex flex-col items-center text-center justify-center min-h-[90vh]"
      >
        {/* Eyebrow Pill */}
        <span
          style={{
            backgroundColor: "rgba(6,182,212,0.1)",
            border: "1px solid rgba(6,182,212,0.2)",
            color: "#06B6D4",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.15em",
          }}
          className="mb-8 px-4 py-1.5 rounded-full uppercase"
        >
          Campus talent network · Pakistan
        </span>

        {/* Headline */}
        <h1
          style={{
            fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: "1.1",
          }}
          className="max-w-4xl mx-auto mb-6 flex flex-col gap-2"
        >
          <span style={{ color: "#FAFAFA" }}>Build real skills.</span>
          <span
            style={{
              background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Connect with opportunity.
          </span>
          <span style={{ color: "#FAFAFA" }}>Grow your tech career.</span>
        </h1>

        {/* Subheadline */}
        <p
          style={{
            color: "#A1A1AA",
            fontSize: "1.1rem",
            lineHeight: "1.7",
          }}
          className="max-w-[640px] mx-auto mb-10"
        >
          Connexode trains campus ambassadors and interns through mentorship and structured tracks — and delivers full-stack development, AI automation, SEO, and social media services to global clients.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-16">
          <Link
            href="/join"
            style={{
              background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
              color: "#fff",
              borderRadius: "999px",
              padding: "12px 28px",
              fontWeight: 700,
            }}
            className="transition-all hover:brightness-110 active:scale-95 text-center w-full sm:w-auto"
          >
            Join Connexode
          </Link>
          <a
            href="#process"
            style={{
              background: "transparent",
              border: "1px solid rgba(6,182,212,0.35)",
              color: "#06B6D4",
              borderRadius: "999px",
              padding: "12px 28px",
              fontWeight: 600,
            }}
            className="transition-all hover:border-[#06B6D4]/70 active:scale-95 text-center w-full sm:w-auto"
          >
            See how it works
          </a>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {["50+ Students", "4 Tracks", "8 Weeks", "Global Services"].map((stat, i) => (
            <span
              key={i}
              style={{
                background: "rgba(13,13,20,0.8)",
                border: "1px solid #1A1A2E",
                color: "#A1A1AA",
              }}
              className="px-4 py-2 rounded-full text-xs font-semibold"
            >
              {stat}
            </span>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, #1A1A2E, transparent)",
        }}
      />

      {/* Three Pillars Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <span
            style={{
              color: "#06B6D4",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.2em",
            }}
            className="uppercase block mb-2"
          >
            What we offer
          </span>
          <h2 style={{ color: "#FAFAFA" }} className="text-3xl font-bold tracking-tight">
            Our Primary Offerings
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div
            style={{
              backgroundColor: "#0D0D14",
              border: "1px solid #1A1A2E",
              borderRadius: "12px",
            }}
            className="group p-8 transition-all hover:border-[rgba(124,58,237,0.45)] hover:-translate-y-1 flex flex-col justify-between min-h-[300px]"
          >
            <div>
              <div
                style={{
                  backgroundColor: "rgba(124,58,237,0.15)",
                  border: "1px solid rgba(124,58,237,0.25)",
                }}
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-[#7C3AED]"
              >
                <Briefcase size={22} />
              </div>
              <h3 style={{ color: "#FAFAFA" }} className="text-lg font-bold mb-3">
                Client Services
              </h3>
              <p style={{ color: "#A1A1AA" }} className="text-sm leading-relaxed mb-6">
                Full-stack development, AI automation, SEO, and social media — for global clients.
              </p>
            </div>
            <Link
              href="/services"
              style={{ color: "#06B6D4" }}
              className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1 hover:underline"
            >
              Explore services <ArrowRight size={14} />
            </Link>
          </div>

          {/* Card 2 */}
          <div
            style={{
              backgroundColor: "#0D0D14",
              border: "1px solid #1A1A2E",
              borderRadius: "12px",
            }}
            className="group p-8 transition-all hover:border-[rgba(124,58,237,0.45)] hover:-translate-y-1 flex flex-col justify-between min-h-[300px]"
          >
            <div>
              <div
                style={{
                  backgroundColor: "rgba(124,58,237,0.15)",
                  border: "1px solid rgba(124,58,237,0.25)",
                }}
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-[#7C3AED]"
              >
                <BookOpen size={22} />
              </div>
              <h3 style={{ color: "#FAFAFA" }} className="text-lg font-bold mb-3">
                Internship Program
              </h3>
              <p style={{ color: "#A1A1AA" }} className="text-sm leading-relaxed mb-6">
                8-week structured tracks, mentor grading, GitHub projects, verified certificates.
              </p>
            </div>
            <Link
              href="/join/internship"
              style={{ color: "#06B6D4" }}
              className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1 hover:underline"
            >
              View tracks <ArrowRight size={14} />
            </Link>
          </div>

          {/* Card 3 */}
          <div
            style={{
              backgroundColor: "#0D0D14",
              border: "1px solid #1A1A2E",
              borderRadius: "12px",
            }}
            className="group p-8 transition-all hover:border-[rgba(124,58,237,0.45)] hover:-translate-y-1 flex flex-col justify-between min-h-[300px]"
          >
            <div>
              <div
                style={{
                  backgroundColor: "rgba(124,58,237,0.15)",
                  border: "1px solid rgba(124,58,237,0.25)",
                }}
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-[#7C3AED]"
              >
                <Users size={22} />
              </div>
              <h3 style={{ color: "#FAFAFA" }} className="text-lg font-bold mb-3">
                Ambassador Program
              </h3>
              <p style={{ color: "#A1A1AA" }} className="text-sm leading-relaxed mb-6">
                Lead AI sessions, host webinars, grow campus communities, track real impact.
              </p>
            </div>
            <Link
              href="/join/ambassador"
              style={{ color: "#06B6D4" }}
              className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1 hover:underline"
            >
              Apply now <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="process"
        style={{
          backgroundColor: "#0D0D14",
          borderTop: "1px solid #1A1A2E",
          borderBottom: "1px solid #1A1A2E",
        }}
        className="py-24 px-6 w-full"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span
              style={{
                color: "#06B6D4",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.2em",
              }}
              className="uppercase block mb-2"
            >
              The process
            </span>
            <h2 style={{ color: "#FAFAFA" }} className="text-3xl font-bold tracking-tight">
              Three steps to get started
            </h2>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Desktop Connecting Line */}
            <div
              style={{
                height: "1px",
                borderTop: "1px dashed rgba(124,58,237,0.2)",
              }}
              className="hidden md:block absolute top-[52px] left-[15%] right-[15%] z-0"
            />

            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center text-center px-4">
              <span
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: "2.5rem",
                  fontWeight: 800,
                }}
                className="mb-4 block"
              >
                01
              </span>
              <h3 style={{ color: "#FAFAFA" }} className="text-lg font-bold mb-2">
                Apply
              </h3>
              <p style={{ color: "#A1A1AA" }} className="text-sm leading-relaxed max-w-[280px]">
                Choose your program, fill form, instant email confirmation.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center text-center px-4">
              <span
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: "2.5rem",
                  fontWeight: 800,
                }}
                className="mb-4 block"
              >
                02
              </span>
              <h3 style={{ color: "#FAFAFA" }} className="text-lg font-bold mb-2">
                Get reviewed
              </h3>
              <p style={{ color: "#A1A1AA" }} className="text-sm leading-relaxed max-w-[280px]">
                Team reviews in 3–5 days, track status live on your panel.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center text-center px-4">
              <span
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: "2.5rem",
                  fontWeight: 800,
                }}
                className="mb-4 block"
              >
                03
              </span>
              <h3 style={{ color: "#FAFAFA" }} className="text-lg font-bold mb-2">
                Grow
              </h3>
              <p style={{ color: "#A1A1AA" }} className="text-sm leading-relaxed max-w-[280px]">
                Dashboard unlocks with tasks, grades, webinars, progress tracker.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 max-w-5xl mx-auto w-full">
        <div
          style={{
            border: "1px solid transparent",
            background: "linear-gradient(#0D0D14, #0D0D14) padding-box, linear-gradient(135deg, #7C3AED, #06B6D4) border-box",
            borderRadius: "16px",
          }}
          className="p-12 text-center"
        >
          <h2 style={{ color: "#FAFAFA" }} className="text-3xl font-extrabold mb-4 tracking-tight">
            Ready to be part of Connexode?
          </h2>
          <p style={{ color: "#A1A1AA" }} className="max-w-lg mx-auto mb-8 text-sm leading-relaxed">
            Join our growing network of developers, designers, and campus leaders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              href="/join"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
                color: "#fff",
                borderRadius: "999px",
                padding: "12px 28px",
                fontWeight: 700,
              }}
              className="transition-all hover:brightness-110 active:scale-95 text-center w-full sm:w-auto"
            >
              Join Connexode
            </Link>
            <Link
              href="/contact"
              style={{
                background: "transparent",
                border: "1px solid rgba(6,182,212,0.35)",
                color: "#06B6D4",
                borderRadius: "999px",
                padding: "12px 28px",
                fontWeight: 600,
              }}
              className="transition-all hover:border-[#06B6D4]/70 active:scale-95 text-center w-full sm:w-auto"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
