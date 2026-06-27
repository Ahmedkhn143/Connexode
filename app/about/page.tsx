// app/about/page.tsx
// About — founder note + 3 pillars + values + team/mentor section
// Colors: Navy #082038 · Teal #188080 · Cyan #7EC8D8

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, Users, Zap, Shield } from "lucide-react";

const pillars = [
  {
    number: "01",
    title: "Campus Ambassador Program",
    desc: "We train students to lead AI-awareness sessions, host webinars, and grow communities on their campuses. Every approved ambassador gets a live growth dashboard and direct mentor access.",
  },
  {
    number: "02",
    title: "Internship Program",
    desc: "Structured 8-week tracks in Frontend, Full Stack, AI/Automation, and UI/UX. Real projects, mentor-graded submissions, and a verified certificate — not just a participation trophy.",
  },
  {
    number: "03",
    title: "Client Services",
    desc: "Our team delivers development, design, video, and social media work for real clients. Many of our team members came through our own internship program — so the pipeline is the product.",
  },
];

const values = [
  {
    icon: <Heart size={18} strokeWidth={1.5} />,
    title: "Mentorship over lectures",
    desc: "We believe real growth happens in conversation, not one-way content. Every intern and ambassador gets direct access to a mentor.",
  },
  {
    icon: <Users size={18} strokeWidth={1.5} />,
    title: "Community first",
    desc: "Connexode is not a course platform. It is a network. The people you meet here matter more than any certificate.",
  },
  {
    icon: <Zap size={18} strokeWidth={1.5} />,
    title: "Real skills, real work",
    desc: "No fake projects. No simulated tasks. Everything built in our internship is something you can show in a job interview or portfolio.",
  },
  {
    icon: <Shield size={18} strokeWidth={1.5} />,
    title: "Honesty over hype",
    desc: "We are a growing team, not a 500-person agency. We say that clearly. Our credibility is built on what we actually deliver.",
  },
];

export default function AboutPage() {
  return (
    <main style={{ backgroundColor: "#040C18" }} className="min-h-screen pt-24 pb-20 antialiased">

      {/* ── Hero ── */}
      <section className="mx-auto max-w-4xl px-6 py-14 text-center">
        <span
          style={{ border: "1px solid rgba(126,200,216,0.2)", color: "#7EC8D8", backgroundColor: "rgba(8,32,56,0.6)" }}
          className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-widest"
        >
          Our story
        </span>
        <h1 style={{ color: "#E8F4F8" }} className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl">
          Why we started
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #7EC8D8 0%, #188080 60%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Connexode
          </span>
        </h1>
      </section>

      {/* ── Founder note ── */}
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <div
          style={{ backgroundColor: "#082038", border: "1px solid rgba(126,200,216,0.1)" }}
          className="rounded-2xl p-8 sm:p-10"
        >
          {/* Accent line */}
          <div
            style={{ background: "linear-gradient(90deg, #188080, rgba(24,128,128,0))" }}
            className="mb-7 h-px w-16"
          />

          <blockquote style={{ color: "rgba(126,200,216,0.7)" }} className="text-base leading-relaxed sm:text-lg">
            "Most students in Pakistan do not lack ability — they lack structured
            access. Access to mentors who have actually built things. Access to
            real projects they can show employers. Access to a community that
            pushes them forward instead of leaving them to figure it out alone.
            <br /><br />
            Connexode started as a simple idea to fix that — one campus
            ambassador, one intern, one real project at a time. The agency arm
            came next, because the talent we were training deserved real client
            work to put that training to use.
            <br /><br />
            We are still building. But we are building honestly."
          </blockquote>

          <div className="mt-8 flex items-center gap-4">
            {/* Avatar placeholder — replace with real photo when ready */}
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid rgba(24,128,128,0.4)",
                flexShrink: 0,
              }}
            >
              <Image
                src="/founder.jpg"
                alt="Ahmad Khan — Founder, Connexode"
                width={48}
                height={48}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </div>
            <div>
              <p style={{ color: "#E8F4F8" }} className="text-sm font-semibold">Ahmad Khan</p>
              <p style={{ color: "rgba(126,200,216,0.4)" }} className="text-xs">Founder, Connexode · KFUEIT</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Three pillars ── */}
      <section
        style={{ borderTop: "1px solid rgba(126,200,216,0.06)", borderBottom: "1px solid rgba(126,200,216,0.06)", backgroundColor: "#061020" }}
        className="py-20"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 text-center">
            <p style={{ color: "#7EC8D8" }} className="mb-3 text-xs font-medium uppercase tracking-widest">What we do</p>
            <h2 style={{ color: "#E8F4F8" }} className="text-2xl font-bold sm:text-3xl">Three pillars, one mission</h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {pillars.map((p) => (
              <div
                key={p.number}
                style={{ backgroundColor: "#082038", border: "1px solid rgba(126,200,216,0.1)" }}
                className="rounded-2xl p-7 transition-all hover:border-[rgba(126,200,216,0.3)]"
              >
                <span style={{ color: "rgba(126,200,216,0.2)" }} className="mb-4 block text-3xl font-bold">{p.number}</span>
                <h3 style={{ color: "#E8F4F8" }} className="mb-3 text-[16px] font-semibold leading-snug">{p.title}</h3>
                <p style={{ color: "rgba(126,200,216,0.45)" }} className="text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-14 text-center">
          <p style={{ color: "#7EC8D8" }} className="mb-3 text-xs font-medium uppercase tracking-widest">What we believe</p>
          <h2 style={{ color: "#E8F4F8" }} className="text-2xl font-bold sm:text-3xl">Our values</h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {values.map((v) => (
            <div
              key={v.title}
              style={{ backgroundColor: "#082038", border: "1px solid rgba(126,200,216,0.1)" }}
              className="flex gap-5 rounded-xl p-6 transition-all hover:border-[rgba(126,200,216,0.25)]"
            >
              <span
                style={{ backgroundColor: "rgba(24,128,128,0.15)", color: "#7EC8D8", flexShrink: 0 }}
                className="flex h-10 w-10 items-center justify-center rounded-lg"
              >
                {v.icon}
              </span>
              <div>
                <p style={{ color: "#E8F4F8" }} className="mb-1.5 text-sm font-semibold">{v.title}</p>
                <p style={{ color: "rgba(126,200,216,0.45)" }} className="text-sm leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Team / Mentor placeholder ── */}
      <section
        style={{ borderTop: "1px solid rgba(126,200,216,0.06)", backgroundColor: "#061020" }}
        className="py-20"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 text-center">
            <p style={{ color: "#7EC8D8" }} className="mb-3 text-xs font-medium uppercase tracking-widest">The people</p>
            <h2 style={{ color: "#E8F4F8" }} className="text-2xl font-bold sm:text-3xl">Team & mentors</h2>
            <p style={{ color: "rgba(126,200,216,0.4)" }} className="mx-auto mt-4 max-w-lg text-sm leading-relaxed">
              Our team is growing. As mentors and core members join,
              their profiles will appear here with bios and LinkedIn links.
            </p>
          </div>

          {/* Placeholder grid — replace cards with real team data */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {/* Founder card — always visible */}
            <div
              style={{ backgroundColor: "#082038", border: "1px solid rgba(126,200,216,0.12)" }}
              className="rounded-xl p-5 text-center"
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "2px solid rgba(24,128,128,0.35)",
                  margin: "0 auto",
                  marginBottom: "1rem",
                }}
              >
                <Image
                  src="/founder.jpg"
                  alt="Ahmad Khan"
                  width={56}
                  height={56}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
              <p style={{ color: "#E8F4F8" }} className="text-sm font-semibold">Ahmad Khan</p>
              <p style={{ color: "rgba(126,200,216,0.4)" }} className="mb-3 text-xs">Founder · Frontend Dev</p>
              <a
                href="https://linkedin.com/in/muhamad-ahmd"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#188080", border: "1px solid rgba(24,128,128,0.3)" }}
                className="inline-block rounded-full px-3 py-1 text-[10px] font-medium transition-all hover:bg-[rgba(24,128,128,0.1)]"
              >
                LinkedIn
              </a>
            </div>

            {/* Coming soon slots */}
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                style={{ border: "1px dashed rgba(126,200,216,0.1)", backgroundColor: "rgba(8,32,56,0.3)" }}
                className="flex flex-col items-center justify-center rounded-xl p-5 text-center"
              >
                <div
                  style={{ border: "1px dashed rgba(126,200,216,0.15)" }}
                  className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full"
                >
                  <span style={{ color: "rgba(126,200,216,0.2)" }} className="text-xl">+</span>
                </div>
                <p style={{ color: "rgba(126,200,216,0.2)" }} className="text-xs">Mentor / Team</p>
                <p style={{ color: "rgba(126,200,216,0.15)" }} className="text-[10px]">Coming soon</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h2 style={{ color: "#E8F4F8" }} className="mb-4 text-2xl font-bold">Want to be part of this?</h2>
        <p style={{ color: "rgba(126,200,216,0.45)" }} className="mb-8 text-sm leading-relaxed">
          Apply as an ambassador, join an internship track, or reach out about working with our team.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/join"
            style={{ backgroundColor: "#188080", color: "#E8F4F8" }}
            className="flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-all hover:brightness-110 active:scale-95"
          >
            Join Connexode <ArrowRight size={14} />
          </Link>
          <Link
            href="/contact"
            style={{ border: "1px solid rgba(126,200,216,0.2)", color: "rgba(126,200,216,0.6)" }}
            className="rounded-full px-7 py-3 text-sm font-medium transition-all hover:text-[#7EC8D8]"
          >
            Contact us
          </Link>
        </div>
      </section>

    </main>
  );
}
