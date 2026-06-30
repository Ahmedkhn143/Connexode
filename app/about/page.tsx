"use client";

import Link from "next/link";
import { Heart, Users, Zap, Shield, Briefcase, BookOpen } from "lucide-react";
import PublicNav from "@/components/layout/PublicNav";
import PublicFooter from "@/components/layout/PublicFooter";

export default function AboutPage() {
  const values = [
    {
      icon: <Heart size={18} />,
      title: "Mentorship",
      desc: "We believe real growth happens in conversation, not one-way lectures. Every student gets direct access to active mentors.",
    },
    {
      icon: <Users size={18} />,
      title: "Community",
      desc: "Connexode is a network of builders. The relationships you form here are designed to help you throughout your career.",
    },
    {
      icon: <Zap size={18} />,
      title: "Real Skills",
      desc: "No mock assignments or dry tutorials. Everything built in our program is a live asset to showcase in your portfolio.",
    },
    {
      icon: <Shield size={18} />,
      title: "Honesty",
      desc: "We prioritize clean, honest execution. We're open about our progress, challenges, and client expectations.",
    },
  ];

  return (
    <div style={{ backgroundColor: "var(--theme-bg)", color: "var(--theme-text-primary)" }} className="min-h-screen flex flex-col font-sans transition-colors duration-300">
      <PublicNav />

      {/* Hero */}
      <section
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(124,58,237,0.12) 0%, transparent 70%)",
        }}
        className="pt-36 pb-16 px-6 text-center animate-fadeIn"
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
          Our story
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
          Why we started<br />
          <span
            style={{
              background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Connexode
          </span>
        </h1>
        <p style={{ color: "var(--theme-text-secondary)" }} className="max-w-[500px] mx-auto text-sm leading-relaxed">
          Bridging the gap between university campuses and the global tech market.
        </p>
      </section>

      {/* Founder blockquote card */}
      <section className="py-8 px-6 max-w-3xl mx-auto w-full">
        <div
          style={{
            backgroundColor: "var(--theme-surface)",
            border: "1px solid var(--theme-border)",
            borderLeft: "4px solid #7C3AED",
            borderRadius: "12px",
          }}
          className="p-8 sm:p-10 transition-all hover:border-[var(--theme-border-hover)]"
        >
          <blockquote style={{ color: "var(--theme-text-secondary)" }} className="text-sm italic leading-relaxed mb-6">
            "Most students in Pakistan do not lack ability — they lack structured access. Access to mentors who have actually built things. Access to real projects they can show employers. Access to a community that pushes them forward instead of leaving them to figure it out alone.
            <br /><br />
            Connexode started as a simple idea to fix that — one campus ambassador, one intern, one real project at a time. The agency arm came next, because the talent we were training deserved real client work to put that training to use."
          </blockquote>
          <div className="flex items-center gap-4 mt-6">
            <img
              src="/founder.jpg"
              alt="Ahmad Khan"
              className="w-12 h-12 rounded-full object-cover border border-cyan-500/30"
            />
            <div className="flex flex-col gap-1">
              <span style={{ color: "var(--theme-text-primary)" }} className="text-sm font-bold">
                Ahmad Khan
              </span>
              <span style={{ color: "#06B6D4" }} className="text-xs">
                Founder & CEO, Connexode
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Pillars Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto w-full">
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
            Pillars
          </span>
          <h2 style={{ color: "var(--theme-text-primary)" }} className="text-2xl font-bold">
            Our Core Pillars
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div
            style={{
              backgroundColor: "var(--theme-surface)",
              border: "1px solid var(--theme-border)",
              borderRadius: "12px",
            }}
            className="p-6 transition-all hover:border-[var(--theme-border-hover)] hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div
                style={{
                  backgroundColor: "rgba(124,58,237,0.15)",
                  border: "1px solid rgba(124,58,237,0.25)",
                }}
                className="w-10 h-10 rounded-lg flex items-center justify-center text-[#7C3AED] mb-4"
              >
                <Briefcase size={20} />
              </div>
              <h3 style={{ color: "var(--theme-text-primary)" }} className="text-base font-bold mb-2">
                Client Services
              </h3>
              <p style={{ color: "var(--theme-text-secondary)" }} className="text-xs leading-relaxed">
                Full-stack development, AI automation, SEO, and social media — built for global clients.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div
            style={{
              backgroundColor: "var(--theme-surface)",
              border: "1px solid var(--theme-border)",
              borderRadius: "12px",
            }}
            className="p-6 transition-all hover:border-[var(--theme-border-hover)] hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div
                style={{
                  backgroundColor: "rgba(124,58,237,0.15)",
                  border: "1px solid rgba(124,58,237,0.25)",
                }}
                className="w-10 h-10 rounded-lg flex items-center justify-center text-[#7C3AED] mb-4"
              >
                <BookOpen size={20} />
              </div>
              <h3 style={{ color: "var(--theme-text-primary)" }} className="text-base font-bold mb-2">
                Internship Program
              </h3>
              <p style={{ color: "var(--theme-text-secondary)" }} className="text-xs leading-relaxed">
                8-week structured tracks, mentor feedback, GitHub projects, verified certificates.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div
            style={{
              backgroundColor: "var(--theme-surface)",
              border: "1px solid var(--theme-border)",
              borderRadius: "12px",
            }}
            className="p-6 transition-all hover:border-[var(--theme-border-hover)] hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div
                style={{
                  backgroundColor: "rgba(124,58,237,0.15)",
                  border: "1px solid rgba(124,58,237,0.25)",
                }}
                className="w-10 h-10 rounded-lg flex items-center justify-center text-[#7C3AED] mb-4"
              >
                <Users size={20} />
              </div>
              <h3 style={{ color: "var(--theme-text-primary)" }} className="text-base font-bold mb-2">
                Ambassador Program
              </h3>
              <p style={{ color: "var(--theme-text-secondary)" }} className="text-xs leading-relaxed">
                Lead AI sessions, host webinars, grow campus communities, track real impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto w-full">
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
            Values
          </span>
          <h2 style={{ color: "var(--theme-text-primary)" }} className="text-2xl font-bold">
            What We Believe In
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((v, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "var(--theme-surface)",
                border: "1px solid var(--theme-border)",
                borderRadius: "12px",
              }}
              className="p-6 flex gap-4 transition-all hover:border-[var(--theme-border-hover)]"
            >
              <div
                style={{
                  backgroundColor: "rgba(6, 182, 212, 0.1)",
                  border: "1px solid rgba(6, 182, 212, 0.2)",
                }}
                className="w-10 h-10 rounded-lg flex items-center justify-center text-[#06B6D4] shrink-0"
              >
                {v.icon}
              </div>
              <div>
                <h3 style={{ color: "var(--theme-text-primary)" }} className="text-sm font-bold mb-2">
                  {v.title}
                </h3>
                <p style={{ color: "var(--theme-text-secondary)" }} className="text-xs leading-relaxed">
                  {v.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto w-full mb-12">
        <div
          style={{
            border: "1px solid transparent",
            background: "linear-gradient(var(--theme-surface), var(--theme-surface)) padding-box, linear-gradient(135deg, #7C3AED, #06B6D4) border-box",
            borderRadius: "16px",
          }}
          className="p-12 text-center"
        >
          <h2 style={{ color: "var(--theme-text-primary)" }} className="text-2xl font-extrabold mb-4 tracking-tight">
            Want to help us bridge the gap?
          </h2>
          <p style={{ color: "var(--theme-text-secondary)" }} className="max-w-lg mx-auto mb-8 text-xs leading-relaxed">
            Get in touch with us to collaborate, volunteer, or hire our talented alumni.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              href="/contact"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
                color: "#fff",
                borderRadius: "999px",
                padding: "12px 28px",
                fontWeight: 700,
              }}
              className="transition-all hover:brightness-110 active:scale-95 text-center w-full sm:w-auto"
            >
              Contact Us
            </Link>
            <Link
              href="/join"
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
              Join program
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
