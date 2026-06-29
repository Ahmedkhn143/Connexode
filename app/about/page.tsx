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

      {/* Team Section (Centering Founder & CEO card only) */}
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
            Team
          </span>
          <h2 style={{ color: "var(--theme-text-primary)" }} className="text-2xl font-bold">
            Meet the Builders
          </h2>
        </div>

        <div className="flex justify-center">
          {/* Founder Card */}
          <div
            style={{
              backgroundColor: "var(--theme-surface)",
              border: "1px solid var(--theme-border)",
              borderRadius: "16px",
            }}
            className="p-8 text-center max-w-[320px] w-full transition-all hover:border-[var(--theme-border-hover)] hover:-translate-y-1 duration-300"
          >
            <div className="relative w-28 h-28 mx-auto mb-5">
              <img
                src="/founder.jpg"
                alt="Ahmad Khan"
                className="w-full h-full rounded-full object-cover border-2 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
              />
            </div>
            <h3 style={{ color: "var(--theme-text-primary)" }} className="text-base font-bold mb-1">
              Ahmad Khan
            </h3>
            <p style={{ color: "#06B6D4" }} className="text-xs font-semibold mb-3">
              Founder & CEO
            </p>
            <p style={{ color: "var(--theme-text-secondary)" }} className="text-xs leading-relaxed mb-4">
              Full-Stack Developer & AI Automation Consultant.
            </p>
            {/* Socials / Links */}
            <div className="flex justify-center gap-3">
              <a
                href="https://github.com/Ahmedkhn143"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                title="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.82 1.102.82 2.222v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/ahmad-khan-connexode"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-[#0A66C2] transition-colors"
                title="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
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
