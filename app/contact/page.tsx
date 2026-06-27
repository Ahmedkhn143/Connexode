// app/contact/page.tsx
// Contact — form + direct links + social
// Colors: Navy #082038 · Teal #188080 · Cyan #7EC8D8

"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Instagram, Linkedin, Facebook, CheckCircle, ArrowRight } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const empty: FormData = { name: "", email: "", subject: "", message: "" };

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

const socials = [
  {
    icon: <Instagram size={18} strokeWidth={1.5} />,
    label: "Instagram",
    handle: "@connexode",          // ← update with real handle
    href: "https://instagram.com/connexode",
  },
  {
    icon: <Linkedin size={18} strokeWidth={1.5} />,
    label: "LinkedIn",
    handle: "Connexode",
    href: "https://linkedin.com/company/connexode",
  },
  {
    icon: <Facebook size={18} strokeWidth={1.5} />,
    label: "Facebook",
    handle: "Connexode",
    href: "https://facebook.com/connexode",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState<FormData>(empty);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function update(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // TODO: Replace with real email API (Resend / Nodemailer) later:
    // await fetch("/api/contact", { method: "POST", body: JSON.stringify(form) });

    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main style={{ backgroundColor: "#040C18" }} className="flex min-h-screen items-center justify-center px-6 pt-24 antialiased">
        <div className="mx-auto max-w-md text-center">
          <div
            style={{ backgroundColor: "rgba(24,128,128,0.15)", border: "1px solid rgba(24,128,128,0.3)" }}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
          >
            <CheckCircle size={28} style={{ color: "#7EC8D8" }} strokeWidth={1.5} />
          </div>
          <h1 style={{ color: "#E8F4F8" }} className="mb-3 text-2xl font-bold">Message received!</h1>
          <p style={{ color: "rgba(126,200,216,0.5)" }} className="mb-8 text-sm leading-relaxed">
            Thanks <strong style={{ color: "#7EC8D8" }}>{form.name}</strong> — we will get back to you
            at <strong style={{ color: "#7EC8D8" }}>{form.email}</strong> within 1–2 business days.
          </p>
          <Link
            href="/"
            style={{ backgroundColor: "#188080", color: "#E8F4F8" }}
            className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all hover:brightness-110"
          >
            Back to home <ArrowRight size={14} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: "#040C18" }} className="min-h-screen pt-24 pb-20 antialiased">

      {/* ── Hero ── */}
      <section className="mx-auto max-w-3xl px-6 py-14 text-center">
        <span
          style={{ border: "1px solid rgba(126,200,216,0.2)", color: "#7EC8D8", backgroundColor: "rgba(8,32,56,0.6)" }}
          className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-widest"
        >
          Get in touch
        </span>
        <h1 style={{ color: "#E8F4F8" }} className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Let&apos;s talk
        </h1>
        <p style={{ color: "rgba(126,200,216,0.5)" }} className="text-base leading-relaxed">
          Whether it&apos;s a project, a partnership, or a question —
          we respond within 1–2 business days.
        </p>
      </section>

      {/* ── Two column layout ── */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">

          {/* Left — form (wider) */}
          <div className="lg:col-span-3">
            <div
              style={{ backgroundColor: "#082038", border: "1px solid rgba(126,200,216,0.1)" }}
              className="rounded-2xl p-8"
            >
              <h2 style={{ color: "#E8F4F8" }} className="mb-6 text-lg font-bold">Send a message</h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Your name *" value={form.name} onChange={(v) => update("name", v)} placeholder="Ahmad Khan" required />
                  <Field label="Email *" type="email" value={form.email} onChange={(v) => update("email", v)} placeholder="you@example.com" required />
                </div>

                <SelectField
                  label="What is this about? *"
                  value={form.subject}
                  onChange={(v) => update("subject", v)}
                  options={subjects}
                  required
                />

                <TextareaField
                  label="Message *"
                  value={form.message}
                  onChange={(v) => update("message", v)}
                  placeholder="Tell us what you need, what you are building, or what you want to know..."
                  required
                />

                <button
                  type="submit"
                  disabled={loading}
                  style={{ backgroundColor: loading ? "rgba(24,128,128,0.5)" : "#188080", color: "#E8F4F8" }}
                  className="w-full rounded-full py-3.5 text-sm font-semibold transition-all hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send message →"}
                </button>
              </form>
            </div>
          </div>

          {/* Right — direct contact + socials */}
          <div className="flex flex-col gap-5 lg:col-span-2">

            {/* Direct email */}
            <div
              style={{ backgroundColor: "#082038", border: "1px solid rgba(126,200,216,0.1)" }}
              className="rounded-xl p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <span
                  style={{ backgroundColor: "rgba(24,128,128,0.15)", color: "#7EC8D8" }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg"
                >
                  <Mail size={16} strokeWidth={1.5} />
                </span>
                <p style={{ color: "#E8F4F8" }} className="text-sm font-semibold">Direct email</p>
              </div>
              <a
                href="mailto:ahmadkha8143@gmail.com"
                style={{ color: "#7EC8D8" }}
                className="text-sm transition-colors hover:text-[#188080]"
              >
                ahmadkha8143@gmail.com
              </a>
              <p style={{ color: "rgba(126,200,216,0.35)" }} className="mt-1 text-xs">
                Response within 1–2 business days
              </p>
            </div>

            {/* Social links */}
            <div
              style={{ backgroundColor: "#082038", border: "1px solid rgba(126,200,216,0.1)" }}
              className="rounded-xl p-6"
            >
              <p style={{ color: "#E8F4F8" }} className="mb-5 text-sm font-semibold">Follow Connexode</p>
              <div className="space-y-4">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <span
                      style={{ backgroundColor: "rgba(24,128,128,0.12)", border: "1px solid rgba(24,128,128,0.2)", color: "#7EC8D8" }}
                      className="flex h-9 w-9 items-center justify-center rounded-lg transition-all group-hover:bg-[rgba(24,128,128,0.25)]"
                    >
                      {s.icon}
                    </span>
                    <div>
                      <p style={{ color: "#E8F4F8" }} className="text-sm font-medium leading-none">{s.label}</p>
                      <p style={{ color: "rgba(126,200,216,0.4)" }} className="mt-0.5 text-xs">{s.handle}</p>
                    </div>
                    <ArrowRight
                      size={13}
                      style={{ color: "rgba(126,200,216,0.25)", marginLeft: "auto" }}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:text-[#7EC8D8]"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div
              style={{ backgroundColor: "#082038", border: "1px solid rgba(126,200,216,0.1)" }}
              className="rounded-xl p-6"
            >
              <p style={{ color: "#E8F4F8" }} className="mb-4 text-sm font-semibold">Quick links</p>
              <div className="space-y-2">
                {[
                  ["Apply as ambassador", "/join/ambassador"],
                  ["Apply for internship", "/join/internship"],
                  ["View services", "/services"],
                ].map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    style={{ color: "rgba(126,200,216,0.5)" }}
                    className="flex items-center gap-1.5 text-sm transition-colors hover:text-[#7EC8D8]"
                  >
                    <ArrowRight size={12} />
                    {label}
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}

// ── Field components ──────────────────────────────────────────────────────────

function Field({ label, value, onChange, placeholder, type = "text", required = false }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label style={{ color: "rgba(126,200,216,0.6)" }} className="mb-1.5 block text-xs font-medium">{label}</label>
      <input
        type={type} value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder} required={required}
        style={{ backgroundColor: "#040C18", border: "1px solid rgba(126,200,216,0.15)", color: "#E8F4F8" }}
        className="w-full rounded-xl px-4 py-3 text-sm placeholder:text-[rgba(126,200,216,0.2)] outline-none focus:border-[rgba(126,200,216,0.45)] transition-colors"
      />
    </div>
  );
}

function TextareaField({ label, value, onChange, placeholder, required = false }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; required?: boolean;
}) {
  return (
    <div>
      <label style={{ color: "rgba(126,200,216,0.6)" }} className="mb-1.5 block text-xs font-medium">{label}</label>
      <textarea
        value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder} required={required} rows={5}
        style={{ backgroundColor: "#040C18", border: "1px solid rgba(126,200,216,0.15)", color: "#E8F4F8", resize: "vertical" }}
        className="w-full rounded-xl px-4 py-3 text-sm placeholder:text-[rgba(126,200,216,0.2)] outline-none focus:border-[rgba(126,200,216,0.45)] transition-colors"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options, required = false }: {
  label: string; value: string; onChange: (v: string) => void;
  options: string[]; required?: boolean;
}) {
  return (
    <div>
      <label style={{ color: "rgba(126,200,216,0.6)" }} className="mb-1.5 block text-xs font-medium">{label}</label>
      <select
        value={value} onChange={(e) => onChange(e.target.value)} required={required}
        style={{ backgroundColor: "#040C18", border: "1px solid rgba(126,200,216,0.15)", color: value ? "#E8F4F8" : "rgba(126,200,216,0.2)" }}
        className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:border-[rgba(126,200,216,0.45)] transition-colors appearance-none"
      >
        <option value="" disabled>Select a topic...</option>
        {options.map((o) => (
          <option key={o} value={o} style={{ backgroundColor: "#082038", color: "#E8F4F8" }}>{o}</option>
        ))}
      </select>
    </div>
  );
}
