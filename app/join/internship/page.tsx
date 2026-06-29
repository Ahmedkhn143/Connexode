"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Code2, Layers, Brain, Palette } from "lucide-react";
import PublicNav from "@/components/layout/PublicNav";
import PublicFooter from "@/components/layout/PublicFooter";

const tracks = [
  {
    id: "frontend",
    icon: <Code2 size={20} />,
    name: "Frontend Development",
    stack: "HTML · CSS · JavaScript · React",
    weeks: "8 weeks",
    desc: "Build real UI components and complete projects using modern React. From basics to deploying your own portfolio.",
  },
  {
    id: "fullstack",
    icon: <Layers size={20} />,
    name: "Full Stack Development",
    stack: "React · Node.js · Express · MongoDB",
    weeks: "8 weeks",
    desc: "Cover both frontend and backend. Build and deploy a full web application with auth, database, and REST APIs.",
  },
  {
    id: "ai",
    icon: <Brain size={20} />,
    name: "AI & Automation",
    stack: "Python · LangChain · OpenAI API · n8n",
    weeks: "8 weeks",
    desc: "Build real AI-powered apps and automation workflows. Prompt engineering, agents, and LLM integrations.",
  },
  {
    id: "uiux",
    icon: <Palette size={20} />,
    name: "UI/UX Design",
    stack: "Figma · Design systems · Prototyping",
    weeks: "8 weeks",
    desc: "Learn the full design process — wireframes, design systems, and high-fidelity prototypes for real products.",
  },
];

type FormData = {
  fullName: string;
  email: string;
  university: string;
  semester: string;
  city: string;
  track: string;
  github: string;
  portfolio: string;
  whyJoin: string;
  experience: string;
};

const initialForm: FormData = {
  fullName: "",
  email: "",
  university: "",
  semester: "",
  city: "",
  track: "",
  github: "",
  portfolio: "",
  whyJoin: "",
  experience: "",
};

export default function InternshipApplicationPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const selectTrack = (trackName: string) => {
    setForm((prev) => ({ ...prev, track: trackName }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.track) {
      alert("Please select an internship track first.");
      return;
    }
    setLoading(true);

    try {
      // 1. Submit to API (keep original behaviour)
      await fetch("/api/applications/internship", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      // 2. Submit to localStorage
      const existing = JSON.parse(localStorage.getItem("connexode_internship_applications") || "[]");
      existing.push({
        ...form,
        id: `int_${Date.now()}`,
        status: "PENDING",
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem("connexode_internship_applications", JSON.stringify(existing));

      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      // Fallback: save to localStorage anyway
      const existing = JSON.parse(localStorage.getItem("connexode_internship_applications") || "[]");
      existing.push({
        ...form,
        id: `int_${Date.now()}`,
        status: "PENDING",
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem("connexode_internship_applications", JSON.stringify(existing));
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ backgroundColor: "#050508", color: "#FAFAFA" }} className="min-h-screen flex flex-col font-sans">
        <PublicNav />
        <main className="flex-grow flex items-center justify-center px-6 pt-32 pb-20">
          <div className="mx-auto max-w-lg text-center">
            <div
              style={{
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                border: "1px solid rgba(16, 185, 129, 0.25)",
              }}
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
            >
              <CheckCircle size={28} className="text-[#10B981]" />
            </div>
            <h1 style={{ color: "#FAFAFA" }} className="mb-3 text-2xl font-bold tracking-tight">
              Application Received!
            </h1>
            <p style={{ color: "#A1A1AA" }} className="mb-8 text-sm leading-relaxed">
              Thank you for applying, <strong className="text-[#FAFAFA]">{form.fullName}</strong>. We have received your application for the <strong className="text-[#06B6D4]">{form.track}</strong> track. Our team will review it within 3-5 days. You can track your status by signing in.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/register"
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
                  color: "#fff",
                  borderRadius: "999px",
                  padding: "12px 28px",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                }}
                className="transition-all hover:brightness-110 active:scale-95 text-center"
              >
                Track application status
              </Link>
              <Link
                href="/"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(6,182,212,0.35)",
                  color: "#06B6D4",
                  borderRadius: "999px",
                  padding: "12px 28px",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                }}
                className="transition-all hover:border-[#06B6D4]/70 active:scale-95 text-center"
              >
                Back to home
              </Link>
            </div>
          </div>
        </main>
        <PublicFooter />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#050508", color: "#FAFAFA" }} className="min-h-screen flex flex-col font-sans">
      <PublicNav />

      <main className="flex-grow pt-32 pb-20 px-6 max-w-5xl mx-auto w-full">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/join"
            style={{ color: "#06B6D4" }}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider hover:underline"
          >
            <ArrowLeft size={14} /> Back to join options
          </Link>
        </div>

        {/* Hero */}
        <section className="text-center mb-16">
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
            Internship Program
          </span>
          <h1
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: "1.1",
            }}
            className="max-w-3xl mx-auto mb-4"
          >
            Choose your learning track
          </h1>
          <p style={{ color: "#A1A1AA" }} className="max-w-xl mx-auto text-sm leading-relaxed">
            Select one of the 8-week structured tracks below to get started. Click a card to auto-fill the application form.
          </p>
        </section>

        {/* Tracks Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16 animate-fadeIn">
          {tracks.map((track, index) => {
            const isSelected = form.track === track.name;
            return (
              <div
                key={index}
                onClick={() => selectTrack(track.name)}
                style={{
                  backgroundColor: isSelected ? "rgba(124, 58, 237, 0.08)" : "#0D0D14",
                  border: isSelected ? "1px solid rgba(124, 58, 237, 0.6)" : "1px solid #1A1A2E",
                  borderRadius: "12px",
                  cursor: "pointer",
                }}
                className="p-6 transition-all hover:border-[rgba(124,58,237,0.45)] hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div
                    style={{
                      backgroundColor: "rgba(124,58,237,0.15)",
                      border: "1px solid rgba(124,58,237,0.25)",
                    }}
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-[#7C3AED]"
                  >
                    {track.icon}
                  </div>
                  <span
                    style={{
                      backgroundColor: "rgba(6,182,212,0.1)",
                      border: "1px solid rgba(6,182,212,0.2)",
                      color: "#06B6D4",
                      fontSize: "10px",
                      fontWeight: 600,
                    }}
                    className="px-2.5 py-1 rounded-full text-xs uppercase"
                  >
                    {track.weeks}
                  </span>
                </div>
                <h3 style={{ color: "#FAFAFA" }} className="text-base font-bold mb-2">
                  {track.name}
                </h3>
                <p style={{ color: "#06B6D4" }} className="text-xs font-semibold mb-3">
                  {track.stack}
                </p>
                <p style={{ color: "#A1A1AA" }} className="text-xs leading-relaxed">
                  {track.desc}
                </p>
              </div>
            );
          })}
        </section>

        {/* Application Form Card */}
        <section
          style={{
            backgroundColor: "#0D0D14",
            border: "1px solid #1A1A2E",
            borderRadius: "12px",
          }}
          className="max-w-2xl mx-auto p-8"
        >
          <div className="mb-8">
            <h2 style={{ color: "#FAFAFA" }} className="text-xl font-bold tracking-tight mb-2">
              Apply Now
            </h2>
            <p style={{ color: "#A1A1AA" }} className="text-xs">
              Fill in your details below. Choose a track from the options above.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label style={{ color: "#A1A1AA" }} className="text-xs font-semibold block mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ahmad Khan"
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  style={{
                    backgroundColor: "#050508",
                    border: "1px solid #1A1A2E",
                    color: "#FAFAFA",
                  }}
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none focus:border-[rgba(124,58,237,0.45)] transition-colors"
                />
              </div>

              <div>
                <label style={{ color: "#A1A1AA" }} className="text-xs font-semibold block mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. you@example.com"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  style={{
                    backgroundColor: "#050508",
                    border: "1px solid #1A1A2E",
                    color: "#FAFAFA",
                  }}
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none focus:border-[rgba(124,58,237,0.45)] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label style={{ color: "#A1A1AA" }} className="text-xs font-semibold block mb-2">
                  University *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FAST, NUST, KFUEIT"
                  value={form.university}
                  onChange={(e) => update("university", e.target.value)}
                  style={{
                    backgroundColor: "#050508",
                    border: "1px solid #1A1A2E",
                    color: "#FAFAFA",
                  }}
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none focus:border-[rgba(124,58,237,0.45)] transition-colors"
                />
              </div>

              <div>
                <label style={{ color: "#A1A1AA" }} className="text-xs font-semibold block mb-2">
                  Current Semester *
                </label>
                <select
                  required
                  value={form.semester}
                  onChange={(e) => update("semester", e.target.value)}
                  style={{
                    backgroundColor: "#050508",
                    border: "1px solid #1A1A2E",
                    color: "#FAFAFA",
                  }}
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none focus:border-[rgba(124,58,237,0.45)] transition-colors"
                >
                  <option value="" disabled style={{ backgroundColor: "#0D0D14" }}>Select Semester</option>
                  {["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"].map((sem) => (
                    <option key={sem} value={sem} style={{ backgroundColor: "#0D0D14" }}>
                      {sem} Semester
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label style={{ color: "#A1A1AA" }} className="text-xs font-semibold block mb-2">
                  City *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lahore, Karachi, Kot Addu"
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  style={{
                    backgroundColor: "#050508",
                    border: "1px solid #1A1A2E",
                    color: "#FAFAFA",
                  }}
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none focus:border-[rgba(124,58,237,0.45)] transition-colors"
                />
              </div>

              <div>
                <label style={{ color: "#A1A1AA" }} className="text-xs font-semibold block mb-2">
                  Selected Track *
                </label>
                <input
                  type="text"
                  required
                  readOnly
                  placeholder="Click a track card above to select"
                  value={form.track}
                  style={{
                    backgroundColor: "#050508",
                    border: "1px solid #1A1A2E",
                    color: "#06B6D4",
                    fontWeight: 600,
                  }}
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none cursor-default"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label style={{ color: "#A1A1AA" }} className="text-xs font-semibold block mb-2">
                  GitHub Profile URL
                </label>
                <input
                  type="url"
                  placeholder="e.g. https://github.com/username"
                  value={form.github}
                  onChange={(e) => update("github", e.target.value)}
                  style={{
                    backgroundColor: "#050508",
                    border: "1px solid #1A1A2E",
                    color: "#FAFAFA",
                  }}
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none focus:border-[rgba(124,58,237,0.45)] transition-colors"
                />
              </div>

              <div>
                <label style={{ color: "#A1A1AA" }} className="text-xs font-semibold block mb-2">
                  Portfolio Website
                </label>
                <input
                  type="url"
                  placeholder="e.g. https://yourportfolio.com"
                  value={form.portfolio}
                  onChange={(e) => update("portfolio", e.target.value)}
                  style={{
                    backgroundColor: "#050508",
                    border: "1px solid #1A1A2E",
                    color: "#FAFAFA",
                  }}
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none focus:border-[rgba(124,58,237,0.45)] transition-colors"
                />
              </div>
            </div>

            <div>
              <label style={{ color: "#A1A1AA" }} className="text-xs font-semibold block mb-2">
                Prior Experience / Projects
              </label>
              <textarea
                rows={3}
                placeholder="List any coding projects, frameworks, or design tools you have experience with..."
                value={form.experience}
                onChange={(e) => update("experience", e.target.value)}
                style={{
                  backgroundColor: "#050508",
                  border: "1px solid #1A1A2E",
                  color: "#FAFAFA",
                }}
                className="w-full px-4 py-3 rounded-lg text-sm outline-none focus:border-[rgba(124,58,237,0.45)] transition-colors resize-none"
              />
            </div>

            <div>
              <label style={{ color: "#A1A1AA" }} className="text-xs font-semibold block mb-2">
                Why do you want to join Connexode's internship program? *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Tell us why you are interested in this track and what you hope to achieve..."
                value={form.whyJoin}
                onChange={(e) => update("whyJoin", e.target.value)}
                style={{
                  backgroundColor: "#050508",
                  border: "1px solid #1A1A2E",
                  color: "#FAFAFA",
                }}
                className="w-full px-4 py-3 rounded-lg text-sm outline-none focus:border-[rgba(124,58,237,0.45)] transition-colors resize-none"
              />
            </div>

            <p style={{ color: "#52525B" }} className="text-xs leading-relaxed">
              Once submitted, you'll get an instant confirmation email. Track your application status (pending → approved → dashboard) by signing in.
            </p>

            <button
              type="submit"
              disabled={loading}
              style={{
                background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
                color: "#fff",
                borderRadius: "999px",
                padding: "12px 28px",
                fontWeight: 700,
              }}
              className="w-full transition-all hover:brightness-110 active:scale-95 disabled:opacity-50 text-sm"
            >
              {loading ? "Submitting..." : "Submit application"}
            </button>
          </form>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
