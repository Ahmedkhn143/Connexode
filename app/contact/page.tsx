"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, CheckCircle, ArrowRight } from "lucide-react";
import PublicNav from "@/components/layout/PublicNav";
import PublicFooter from "@/components/layout/PublicFooter";

const InstagramIcon = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const FacebookIcon = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialForm: FormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const subjects = [
  "General enquiry",
  "Ambassador Program",
  "Internship Program",
  "Client Services — Development",
  "Client Services — Design",
  "Client Services — Video / 3D",
  "Client Services — Social Media",
  "Partnership / University",
];

export default function ContactPage() {
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
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const existing = JSON.parse(localStorage.getItem("connexode_contact_submissions") || "[]");
      existing.push({
        ...form,
        id: `msg_${Date.now()}`,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem("connexode_contact_submissions", JSON.stringify(existing));

      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      const existing = JSON.parse(localStorage.getItem("connexode_contact_submissions") || "[]");
      existing.push({
        ...form,
        id: `msg_${Date.now()}`,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem("connexode_contact_submissions", JSON.stringify(existing));
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "var(--theme-bg)", color: "var(--theme-text-primary)" }} className="min-h-screen flex flex-col font-sans transition-colors duration-300">
      <PublicNav />

      <main className="flex-grow pt-32 pb-20 px-6 max-w-7xl mx-auto w-full animate-fadeIn">
        {/* Hero */}
        <section className="text-center mb-16 animate-fadeIn">
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
            Contact us
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
            Let's build something together
          </h1>
          <p style={{ color: "var(--theme-text-secondary)" }} className="max-w-xl mx-auto text-sm leading-relaxed">
            Drop us a message for general enquiries, program info, or client services.
          </p>
        </section>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (Wider) */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div
                style={{
                  backgroundColor: "var(--theme-surface)",
                  border: "1px solid var(--theme-border)",
                  borderRadius: "12px",
                }}
                className="p-12 text-center h-full flex flex-col items-center justify-center min-h-[400px]"
              >
                <div
                  style={{
                    backgroundColor: "rgba(16, 185, 129, 0.1)",
                    border: "1px solid rgba(16, 185, 129, 0.25)",
                  }}
                  className="mb-6 flex h-16 w-16 items-center justify-center rounded-full"
                >
                  <CheckCircle size={28} className="text-[#10B981]" />
                </div>
                <h2 style={{ color: "var(--theme-text-primary)" }} className="text-xl font-bold mb-3 tracking-tight">
                  Message Sent Successfully!
                </h2>
                <p style={{ color: "var(--theme-text-secondary)" }} className="max-w-sm mx-auto mb-8 text-xs leading-relaxed">
                  Thank you for reaching out, <strong className="text-[var(--theme-text-primary)]">{form.name}</strong>. We have received your inquiry. Our team will get back to you within 24–48 hours.
                </p>
                <button
                  onClick={() => {
                    setForm(initialForm);
                    setSubmitted(false);
                  }}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(6,182,212,0.35)",
                    color: "#06B6D4",
                    borderRadius: "999px",
                    padding: "10px 24px",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                  }}
                  className="transition-all hover:border-[#06B6D4]/70 active:scale-95"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <div
                style={{
                  backgroundColor: "var(--theme-surface)",
                  border: "1px solid var(--theme-border)",
                  borderRadius: "12px",
                }}
                className="p-8 animate-fadeIn"
              >
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
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
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
                        Email Address *
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

                  <div>
                    <label style={{ color: "var(--theme-text-secondary)" }} className="text-xs font-semibold block mb-2">
                      Subject / Inquiry Type *
                    </label>
                    <select
                      required
                      value={form.subject}
                      onChange={(e) => update("subject", e.target.value)}
                      style={{
                        backgroundColor: "var(--theme-bg)",
                        border: "1px solid var(--theme-border)",
                        color: "var(--theme-text-primary)",
                      }}
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none focus:border-[var(--theme-border-hover)] transition-colors"
                    >
                      <option value="" disabled style={{ backgroundColor: "var(--theme-surface)" }}>Select a subject</option>
                      {subjects.map((sub) => (
                        <option key={sub} value={sub} style={{ backgroundColor: "var(--theme-surface)" }}>
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ color: "var(--theme-text-secondary)" }} className="text-xs font-semibold block mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={6}
                      placeholder="Write your message details here..."
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      style={{
                        backgroundColor: "var(--theme-bg)",
                        border: "1px solid var(--theme-border)",
                        color: "var(--theme-text-primary)",
                      }}
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none focus:border-[var(--theme-border-hover)] transition-colors resize-none"
                    />
                  </div>

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
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Right Column (Info Cards) */}
          <div className="flex flex-col gap-6 animate-fadeIn">
            {/* Direct Email Card */}
            <div
              style={{
                backgroundColor: "var(--theme-surface)",
                border: "1px solid var(--theme-border)",
                borderRadius: "12px",
              }}
              className="p-6"
            >
              <div
                style={{
                  backgroundColor: "rgba(124,58,237,0.15)",
                  border: "1px solid rgba(124,58,237,0.25)",
                }}
                className="w-10 h-10 rounded-lg flex items-center justify-center text-[#7C3AED] mb-4"
              >
                <Mail size={18} />
              </div>
              <h3 style={{ color: "var(--theme-text-primary)" }} className="text-sm font-bold mb-1">
                Direct Email
              </h3>
              <p style={{ color: "var(--theme-text-secondary)" }} className="text-xs mb-3">
                Reach us directly for official partnerships or client inquiries.
              </p>
              <a href="mailto:info@connexode.com" className="text-[#06B6D4] text-xs font-semibold hover:underline block">
                info@connexode.com
              </a>
            </div>

            {/* Social Links Card */}
            <div
              style={{
                backgroundColor: "var(--theme-surface)",
                border: "1px solid var(--theme-border)",
                borderRadius: "12px",
              }}
              className="p-6"
            >
              <h3 style={{ color: "var(--theme-text-primary)" }} className="text-sm font-bold mb-4">
                Follow Us
              </h3>
              <div className="flex flex-col gap-4">
                <a
                  href="https://instagram.com/connexode"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-xs text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] transition-colors"
                >
                  <InstagramIcon size={18} className="text-[#06B6D4]" />
                  <span>@connexode</span>
                </a>
                <a
                  href="https://linkedin.com/company/connexode"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-xs text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] transition-colors"
                >
                  <LinkedinIcon size={18} className="text-[#06B6D4]" />
                  <span>Connexode</span>
                </a>
                <a
                  href="https://facebook.com/connexode"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-xs text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] transition-colors"
                >
                  <FacebookIcon size={18} className="text-[#06B6D4]" />
                  <span>Connexode</span>
                </a>
              </div>
            </div>

            {/* Quick Links Card */}
            <div
              style={{
                backgroundColor: "var(--theme-surface)",
                border: "1px solid var(--theme-border)",
                borderRadius: "12px",
              }}
              className="p-6"
            >
              <h3 style={{ color: "var(--theme-text-primary)" }} className="text-sm font-bold mb-4">
                Quick Action Links
              </h3>
              <div className="flex flex-col gap-3">
                <Link
                  href="/join/ambassador"
                  className="text-xs text-[var(--theme-text-secondary)] hover:text-[#06B6D4] transition-colors flex items-center justify-between"
                >
                  <span>Apply as Ambassador</span>
                  <ArrowRight size={12} />
                </Link>
                <Link
                  href="/join/internship"
                  className="text-xs text-[var(--theme-text-secondary)] hover:text-[#06B6D4] transition-colors flex items-center justify-between"
                >
                  <span>Apply for Internship</span>
                  <ArrowRight size={12} />
                </Link>
                <Link
                  href="/services"
                  className="text-xs text-[var(--theme-text-secondary)] hover:text-[#06B6D4] transition-colors flex items-center justify-between"
                >
                  <span>Explore Client Services</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
