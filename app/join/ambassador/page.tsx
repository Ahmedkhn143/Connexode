"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Mic, Users, TrendingUp, Smartphone } from "lucide-react";
import PublicNav from "@/components/layout/PublicNav";
import PublicFooter from "@/components/layout/PublicFooter";

const perks = [
  { icon: <Mic size={18} />, title: "Host webinars", desc: "Run AI-awareness sessions and workshops for your campus community." },
  { icon: <Users size={18} />, title: "Build a community", desc: "Connect students to Connexode's network of developers and mentors." },
  { icon: <TrendingUp size={18} />, title: "Track your growth", desc: "Live dashboard showing reach, sessions hosted, and webinar stats." },
  { icon: <Smartphone size={18} />, title: "Social media guidance", desc: "Learn how to grow your personal brand and create content that lands." },
];

type FormData = {
  fullName: string;
  email: string;
  university: string;
  semester: string;
  city: string;
  instagram: string;
  linkedin: string;
  whyJoin: string;
  availability: string;
};

const initialForm: FormData = {
  fullName: "",
  email: "",
  university: "",
  semester: "",
  city: "",
  instagram: "",
  linkedin: "",
  whyJoin: "",
  availability: "",
};

export default function AmbassadorApplicationPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/applications/ambassador", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const existing = JSON.parse(localStorage.getItem("connexode_ambassador_applications") || "[]");
      existing.push({
        ...form,
        id: `amb_${Date.now()}`,
        status: "PENDING",
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem("connexode_ambassador_applications", JSON.stringify(existing));

      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      const existing = JSON.parse(localStorage.getItem("connexode_ambassador_applications") || "[]");
      existing.push({
        ...form,
        id: `amb_${Date.now()}`,
        status: "PENDING",
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem("connexode_ambassador_applications", JSON.stringify(existing));
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ backgroundColor: "var(--theme-bg)", color: "var(--theme-text-primary)" }} className="min-h-screen flex flex-col font-sans transition-colors duration-300">
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
            <h1 style={{ color: "var(--theme-text-primary)" }} className="mb-3 text-2xl font-bold tracking-tight">
              Application Received!
            </h1>
            <p style={{ color: "var(--theme-text-secondary)" }} className="mb-8 text-sm leading-relaxed">
              Thank you for applying, <strong className="text-[var(--theme-text-primary)]">{form.fullName}</strong>. We have received your Ambassador application. Our team will review it within 3-5 days. You can track your status by signing in.
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
    <div style={{ backgroundColor: "var(--theme-bg)", color: "var(--theme-text-primary)" }} className="min-h-screen flex flex-col font-sans transition-colors duration-300">
      <PublicNav />

      <main className="flex-grow pt-32 pb-20 px-6 max-w-5xl mx-auto w-full animate-fadeIn">
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
            Ambassador program
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
            Become a Connexode Campus Ambassador
          </h1>
          <p style={{ color: "var(--theme-text-secondary)" }} className="max-w-xl mx-auto text-sm leading-relaxed">
            Lead AI sessions, host webinars, grow campus communities, and track your real impact.
          </p>
        </section>

        {/* Perks Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {perks.map((p, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "var(--theme-surface)",
                border: "1px solid var(--theme-border)",
                borderRadius: "12px",
              }}
              className="p-6 transition-all hover:border-[var(--theme-border-hover)] hover:-translate-y-0.5"
            >
              <div
                style={{
                  backgroundColor: "rgba(124,58,237,0.15)",
                  border: "1px solid rgba(124,58,237,0.25)",
                }}
                className="w-10 h-10 rounded-lg flex items-center justify-center text-[#7C3AED] mb-4"
              >
                {p.icon}
              </div>
              <h3 style={{ color: "var(--theme-text-primary)" }} className="text-sm font-bold mb-2">
                {p.title}
              </h3>
              <p style={{ color: "var(--theme-text-secondary)" }} className="text-xs leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </section>

        {/* Application Form Card */}
        <section
          style={{
            backgroundColor: "var(--theme-surface)",
            border: "1px solid var(--theme-border)",
            borderRadius: "12px",
          }}
          className="max-w-2xl mx-auto p-8"
        >
          <div className="mb-8">
            <h2 style={{ color: "var(--theme-text-primary)" }} className="text-xl font-bold tracking-tight mb-2">
              Apply Now
            </h2>
            <p style={{ color: "var(--theme-text-secondary)" }} className="text-xs">
              Takes 3 minutes. We'll get back to you within 3–5 days.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label style={{ color: "var(--theme-text-secondary)" }} className="text-xs font-semibold block mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ahmad Khan"
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  style={{
                    backgroundColor: "var(--theme-bg)",
                    border: "1px solid var(--theme-border)",
                    color: "var(--theme-text-primary)",
                  }}
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none focus:border-[var(--theme-border-hover)] transition-colors"
                />
              </div>

              <div>
                <label style={{ color: "var(--theme-text-secondary)" }} className="text-xs font-semibold block mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. you@example.com"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  style={{
                    backgroundColor: "var(--theme-bg)",
                    border: "1px solid var(--theme-border)",
                    color: "var(--theme-text-primary)",
                  }}
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none focus:border-[var(--theme-border-hover)] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label style={{ color: "var(--theme-text-secondary)" }} className="text-xs font-semibold block mb-2">
                  University *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FAST, NUST, KFUEIT"
                  value={form.university}
                  onChange={(e) => update("university", e.target.value)}
                  style={{
                    backgroundColor: "var(--theme-bg)",
                    border: "1px solid var(--theme-border)",
                    color: "var(--theme-text-primary)",
                  }}
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none focus:border-[var(--theme-border-hover)] transition-colors"
                />
              </div>

              <div>
                <label style={{ color: "var(--theme-text-secondary)" }} className="text-xs font-semibold block mb-2">
                  Current Semester *
                </label>
                <select
                  required
                  value={form.semester}
                  onChange={(e) => update("semester", e.target.value)}
                  style={{
                    backgroundColor: "var(--theme-bg)",
                    border: "1px solid var(--theme-border)",
                    color: "var(--theme-text-primary)",
                  }}
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none focus:border-[var(--theme-border-hover)] transition-colors"
                >
                  <option value="" disabled style={{ backgroundColor: "var(--theme-surface)" }}>Select Semester</option>
                  {["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"].map((sem) => (
                    <option key={sem} value={sem} style={{ backgroundColor: "var(--theme-surface)" }}>
                      {sem} Semester
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label style={{ color: "var(--theme-text-secondary)" }} className="text-xs font-semibold block mb-2">
                City *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Lahore, Karachi, Kot Addu"
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                style={{
                  backgroundColor: "var(--theme-bg)",
                  border: "1px solid var(--theme-border)",
                  color: "var(--theme-text-primary)",
                }}
                className="w-full px-4 py-3 rounded-lg text-sm outline-none focus:border-[var(--theme-border-hover)] transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label style={{ color: "var(--theme-text-secondary)" }} className="text-xs font-semibold block mb-2">
                  Instagram Handle
                </label>
                <input
                  type="text"
                  placeholder="e.g. @yourname"
                  value={form.instagram}
                  onChange={(e) => update("instagram", e.target.value)}
                  style={{
                    backgroundColor: "var(--theme-bg)",
                    border: "1px solid var(--theme-border)",
                    color: "var(--theme-text-primary)",
                  }}
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none focus:border-[var(--theme-border-hover)] transition-colors"
                />
              </div>

              <div>
                <label style={{ color: "var(--theme-text-secondary)" }} className="text-xs font-semibold block mb-2">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  placeholder="e.g. https://linkedin.com/in/yourname"
                  value={form.linkedin}
                  onChange={(e) => update("linkedin", e.target.value)}
                  style={{
                    backgroundColor: "var(--theme-bg)",
                    border: "1px solid var(--theme-border)",
                    color: "var(--theme-text-primary)",
                  }}
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none focus:border-[var(--theme-border-hover)] transition-colors"
                />
              </div>
            </div>

            <div>
              <label style={{ color: "var(--theme-text-secondary)" }} className="text-xs font-semibold block mb-2">
                Why do you want to be a Connexode ambassador? *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Tell us about your campus, your goals, and what you want to build here..."
                value={form.whyJoin}
                onChange={(e) => update("whyJoin", e.target.value)}
                style={{
                  backgroundColor: "var(--theme-bg)",
                  border: "1px solid var(--theme-border)",
                  color: "var(--theme-text-primary)",
                }}
                className="w-full px-4 py-3 rounded-lg text-sm outline-none focus:border-[var(--theme-border-hover)] transition-colors resize-none"
              />
            </div>

            <div>
              <label style={{ color: "var(--theme-text-secondary)" }} className="text-xs font-semibold block mb-2">
                Weekly Availability *
              </label>
              <select
                required
                value={form.availability}
                onChange={(e) => update("availability", e.target.value)}
                style={{
                  backgroundColor: "var(--theme-bg)",
                  border: "1px solid var(--theme-border)",
                  color: "var(--theme-text-primary)",
                }}
                className="w-full px-4 py-3 rounded-lg text-sm outline-none focus:border-[var(--theme-border-hover)] transition-colors"
              >
                <option value="" disabled style={{ backgroundColor: "var(--theme-surface)" }}>Select hours</option>
                {["1–2 hrs/week", "3–5 hrs/week", "5–8 hrs/week", "8+ hrs/week"].map((hrs) => (
                  <option key={hrs} value={hrs} style={{ backgroundColor: "var(--theme-surface)" }}>
                    {hrs}
                  </option>
                ))}
              </select>
            </div>

            <p style={{ color: "var(--theme-text-muted)" }} className="text-xs leading-relaxed">
              You'll get an instant confirmation email. Track your application status (pending → approved → dashboard) by signing in anytime.
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
