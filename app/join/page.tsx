"use client";

import Link from "next/link";
import { Users, BookOpen, Check } from "lucide-react";
import PublicNav from "@/components/layout/PublicNav";
import PublicFooter from "@/components/layout/PublicFooter";

export default function JoinPage() {
  const comparisonData = [
    {
      feature: "Time commitment",
      ambassador: "3–5 hrs/week, flexible",
      internship: "8 weeks, structured",
    },
    {
      feature: "Core activity",
      ambassador: "AI sessions, webinars, community",
      internship: "Projects, submissions, grading",
    },
    {
      feature: "Outcome",
      ambassador: "Leadership & community growth",
      internship: "Technical skills & portfolio",
    },
    {
      feature: "Certificate",
      ambassador: "Ambassador Certificate",
      internship: "Track-specific Internship Certificate",
    },
    {
      feature: "Dashboard",
      ambassador: "Reach, sessions, webinar stats",
      internship: "Tasks, grades, roadmap, badges",
    },
    {
      feature: "Best for",
      ambassador: "Organising, speaking, social media",
      internship: "Deep coding practice",
    },
  ];

  const faqs = [
    {
      q: "Can I apply to both programs?",
      a: "Yes, you can apply to both. However, since the internship is highly structured and requires project submissions, we recommend focusing on one to maximize your learning and participation."
    },
    {
      q: "Who is eligible to join?",
      a: "The Ambassador and Internship programs are open to university students across Pakistan who are passionate about tech, coding, leadership, and community growth."
    },
    {
      q: "Are these programs paid?",
      a: "These campus programs are focused on skill development, mentorship, and experience-building. While they are unpaid, they offer official certifications, hands-on portfolio projects, and direct industry network access."
    },
    {
      q: "What is the selection process?",
      a: "After you submit the application, our team will review it. You can check your application status live. If selected, your role dashboard will unlock within 3–5 days."
    }
  ];

  return (
    <div style={{ backgroundColor: "var(--theme-bg)", color: "var(--theme-text-primary)" }} className="min-h-screen flex flex-col font-sans transition-colors duration-300">
      <PublicNav />

      {/* Hero */}
      <section
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(124,58,237,0.12) 0%, transparent 70%)",
        }}
        className="pt-36 pb-16 px-6 text-center"
      >
        <span
          style={{
            backgroundColor: "rgba(6,182,212,0.1)",
            border: "1px solid rgba(6,182,212,0.2)",
            color: "#06B6D4",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.15em",
          }}
          className="mb-6 px-4 py-1.5 rounded-full uppercase inline-block"
        >
          Two ways to grow
        </span>
        <h1
          style={{
            fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: "1.1",
          }}
          className="max-w-4xl mx-auto mb-4"
        >
          Choose your path
        </h1>
        <p style={{ color: "var(--theme-text-secondary)" }} className="max-w-[500px] mx-auto text-sm leading-relaxed">
          Unlock your potential through real campus leadership or hands-on structured developer tracks.
        </p>
      </section>

      {/* Fork Cards */}
      <section className="py-8 px-6 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Card 1: Ambassador */}
          <div
            style={{
              backgroundColor: "var(--theme-surface)",
              border: "1px solid var(--theme-border)",
              borderRadius: "12px",
            }}
            className="p-8 flex flex-col justify-between min-h-[400px] transition-all hover:border-[var(--theme-border-hover)] hover:-translate-y-1"
          >
            <div>
              <div
                style={{
                  backgroundColor: "rgba(124,58,237,0.15)",
                  border: "1px solid rgba(124,58,237,0.25)",
                }}
                className="w-12 h-12 rounded-xl flex items-center justify-center text-[#7C3AED] mb-6"
              >
                <Users size={24} />
              </div>
              <h3 style={{ color: "var(--theme-text-primary)" }} className="text-xl font-bold mb-6">
                Ambassador Program
              </h3>
              <ul className="flex flex-col gap-4 mb-8">
                <li className="flex items-start gap-3 text-sm text-[var(--theme-text-secondary)]">
                  <Check size={18} className="text-[#06B6D4] shrink-0 mt-0.5" />
                  <span>Lead artificial intelligence sessions & webinars on your campus.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[var(--theme-text-secondary)]">
                  <Check size={18} className="text-[#06B6D4] shrink-0 mt-0.5" />
                  <span>Grow and manage thriving local campus communities.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[var(--theme-text-secondary)]">
                  <Check size={18} className="text-[#06B6D4] shrink-0 mt-0.5" />
                  <span>Build public speaking, leadership, and marketing skills.</span>
                </li>
              </ul>
            </div>
            <Link
              href="/join/ambassador"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
                color: "#fff",
                borderRadius: "999px",
                padding: "12px 28px",
                fontWeight: 700,
                textAlign: "center",
              }}
              className="transition-all hover:brightness-110 active:scale-95 text-sm"
            >
              Apply as ambassador
            </Link>
          </div>

          {/* Card 2: Internship */}
          <div
            style={{
              backgroundColor: "var(--theme-surface)",
              border: "1px solid var(--theme-border)",
              borderRadius: "12px",
            }}
            className="p-8 flex flex-col justify-between min-h-[400px] transition-all hover:border-[var(--theme-border-hover)] hover:-translate-y-1"
          >
            <div>
              <div
                style={{
                  backgroundColor: "rgba(124,58,237,0.15)",
                  border: "1px solid rgba(124,58,237,0.25)",
                }}
                className="w-12 h-12 rounded-xl flex items-center justify-center text-[#7C3AED] mb-6"
              >
                <BookOpen size={24} />
              </div>
              <h3 style={{ color: "var(--theme-text-primary)" }} className="text-xl font-bold mb-6">
                Internship Program
              </h3>
              <ul className="flex flex-col gap-4 mb-8">
                <li className="flex items-start gap-3 text-sm text-[var(--theme-text-secondary)]">
                  <Check size={18} className="text-[#06B6D4] shrink-0 mt-0.5" />
                  <span>Complete structured 8-week development tracks.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[var(--theme-text-secondary)]">
                  <Check size={18} className="text-[#06B6D4] shrink-0 mt-0.5" />
                  <span>Submit real assignments and receive detailed mentor reviews.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[var(--theme-text-secondary)]">
                  <Check size={18} className="text-[#06B6D4] shrink-0 mt-0.5" />
                  <span>Build complete GitHub projects to showcase in your portfolio.</span>
                </li>
              </ul>
            </div>
            <Link
              href="/join/internship"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
                color: "#fff",
                borderRadius: "999px",
                padding: "12px 28px",
                fontWeight: 700,
                textAlign: "center",
              }}
              className="transition-all hover:brightness-110 active:scale-95 text-sm"
            >
              View tracks & apply
            </Link>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <span
              style={{
                color: "#06B6D4",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.2em",
              }}
              className="uppercase block mb-2"
            >
              Compare
            </span>
            <h2 style={{ color: "var(--theme-text-primary)" }} className="text-2xl font-bold">
              Program Comparison
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--theme-border)" }}>
                  <th style={{ color: "var(--theme-text-primary)" }} className="py-4 px-6 text-sm font-bold">
                    Feature
                  </th>
                  <th style={{ color: "var(--theme-text-primary)" }} className="py-4 px-6 text-sm font-bold">
                    Ambassador
                  </th>
                  <th style={{ color: "var(--theme-text-primary)" }} className="py-4 px-6 text-sm font-bold">
                    Internship
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid var(--theme-border)" }} className="hover:bg-[var(--theme-hover)]">
                    <td style={{ color: "var(--theme-text-primary)" }} className="py-4 px-6 text-xs font-semibold uppercase tracking-wider">
                      {row.feature}
                    </td>
                    <td style={{ color: "var(--theme-text-secondary)" }} className="py-4 px-6 text-sm">
                      {row.ambassador}
                    </td>
                    <td style={{ color: "var(--theme-text-secondary)" }} className="py-4 px-6 text-sm">
                      {row.internship}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="text-center mb-12">
            <span
              style={{
                color: "#06B6D4",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.2em",
              }}
              className="uppercase block mb-2"
            >
              FAQ
            </span>
            <h2 style={{ color: "var(--theme-text-primary)" }} className="text-2xl font-bold">
              Program FAQs
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "var(--theme-surface)",
                  border: "1px solid var(--theme-border)",
                  borderRadius: "12px",
                }}
                className="p-6 animate-fadeIn"
              >
                <h4 style={{ color: "var(--theme-text-primary)" }} className="font-semibold text-sm mb-2">
                  {faq.q}
                </h4>
                <p style={{ color: "var(--theme-text-secondary)" }} className="text-xs leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
