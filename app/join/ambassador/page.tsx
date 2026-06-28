// app/join/ambassador/page.tsx
// Ambassador Program — info + application form
// Form submits to localStorage (plug in Prisma API later — see TODO comment)

"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Mic, Users, TrendingUp, Smartphone } from "lucide-react";

const perks = [
  { icon: <Mic size={18} strokeWidth={1.5} />, title: "Host webinars", desc: "Run AI-awareness sessions and workshops for your campus community." },
  { icon: <Users size={18} strokeWidth={1.5} />, title: "Build a community", desc: "Connect students to Connexode's network of developers and mentors." },
  { icon: <TrendingUp size={18} strokeWidth={1.5} />, title: "Track your growth", desc: "Live dashboard showing reach, sessions hosted, and webinar stats." },
  { icon: <Smartphone size={18} strokeWidth={1.5} />, title: "Social media guidance", desc: "Learn how to grow your personal brand and create content that lands." },
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

const empty: FormData = {
  fullName: "", email: "", university: "", semester: "",
  city: "", instagram: "", linkedin: "", whyJoin: "", availability: "",
};

export default function AmbassadorPage() {
  const [form, setForm] = useState<FormData>(empty);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function update(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/applications/ambassador", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit application");
      }

      setSubmitted(true);
    } catch (err: any) {
      alert(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // ── Success state ──
  if (submitted) {
    return (
      <main style={{ backgroundColor: "#040C18" }} className="flex min-h-screen items-center justify-center px-6 pt-24 antialiased">
        <div className="mx-auto max-w-lg text-center">
          <div
            style={{ backgroundColor: "rgba(24,128,128,0.15)", border: "1px solid rgba(24,128,128,0.3)" }}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
          >
            <CheckCircle size={28} style={{ color: "#7EC8D8" }} strokeWidth={1.5} />
          </div>
          <h1 style={{ color: "#E8F4F8" }} className="mb-3 text-2xl font-bold">Application received!</h1>
          <p style={{ color: "rgba(126,200,216,0.5)" }} className="mb-8 text-sm leading-relaxed">
            We&apos;ve got your ambassador application, <strong style={{ color: "#7EC8D8" }}>{form.fullName}</strong>.
            Check your email for a confirmation. Our team reviews within 3–5 days —
            sign in anytime to see your live status.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/auth/signin"
              style={{ backgroundColor: "#188080", color: "#E8F4F8" }}
              className="rounded-full px-6 py-2.5 text-sm font-semibold transition-all hover:brightness-110"
            >
              Track my application
            </Link>
            <Link
              href="/"
              style={{ border: "1px solid rgba(126,200,216,0.2)", color: "rgba(126,200,216,0.6)" }}
              className="rounded-full px-6 py-2.5 text-sm font-medium transition-all hover:text-[#7EC8D8]"
            >
              Back to home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ── Main page ──
  return (
    <main style={{ backgroundColor: "#040C18" }} className="min-h-screen pt-24 pb-20 antialiased">

      {/* Back */}
      <div className="mx-auto max-w-5xl px-6 pt-6 pb-2">
        <Link
          href="/join"
          style={{ color: "rgba(126,200,216,0.45)" }}
          className="inline-flex items-center gap-1.5 text-sm transition-colors hover:text-[#7EC8D8]"
        >
          <ArrowLeft size={14} /> Back to Join
        </Link>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 py-12 text-center">
        <span
          style={{ border: "1px solid rgba(126,200,216,0.2)", color: "#7EC8D8", backgroundColor: "rgba(8,32,56,0.6)" }}
          className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-widest"
        >
          Ambassador Program
        </span>
        <h1 style={{ color: "#E8F4F8" }} className="mb-4 text-4xl font-bold tracking-tight">
          Become a Connexode<br />Campus Ambassador
        </h1>
        <p style={{ color: "rgba(126,200,216,0.5)" }} className="text-base leading-relaxed">
          Lead AI awareness on your campus. Build community. Track your impact.
          Earn a verified certificate — and grow with a network of 
          Pakistan&apos;s next-gen developers.
        </p>
      </section>

      {/* What you'll do */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((p) => (
            <div
              key={p.title}
              style={{ backgroundColor: "#082038", border: "1px solid rgba(126,200,216,0.1)" }}
              className="rounded-xl p-5"
            >
              <span
                style={{ backgroundColor: "rgba(24,128,128,0.15)", color: "#7EC8D8" }}
                className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg"
              >
                {p.icon}
              </span>
              <p style={{ color: "#E8F4F8" }} className="mb-1.5 text-sm font-semibold">{p.title}</p>
              <p style={{ color: "rgba(126,200,216,0.45)" }} className="text-xs leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Application form */}
      <section className="mx-auto max-w-2xl px-6">
        <div
          style={{ backgroundColor: "#082038", border: "1px solid rgba(126,200,216,0.1)" }}
          className="rounded-2xl p-8"
        >
          <h2 style={{ color: "#E8F4F8" }} className="mb-2 text-xl font-bold">Apply now</h2>
          <p style={{ color: "rgba(126,200,216,0.4)" }} className="mb-8 text-sm">
            Takes 3 minutes. We&apos;ll get back to you within 3–5 days.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Row 1 */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Full name *" value={form.fullName} onChange={(v) => update("fullName", v)} placeholder="Ahmad Khan" required />
              <Field label="Email *" type="email" value={form.email} onChange={(v) => update("email", v)} placeholder="you@example.com" required />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="University *" value={form.university} onChange={(v) => update("university", v)} placeholder="KFUEIT, FAST, NUST..." required />
              <SelectField
                label="Current semester *"
                value={form.semester}
                onChange={(v) => update("semester", v)}
                options={["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"]}
                required
              />
            </div>

            {/* Row 3 */}
            <Field label="City *" value={form.city} onChange={(v) => update("city", v)} placeholder="Lahore, Karachi, Kot Addu..." required />

            {/* Social handles */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Instagram handle" value={form.instagram} onChange={(v) => update("instagram", v)} placeholder="@yourhandle" />
              <Field label="LinkedIn URL" value={form.linkedin} onChange={(v) => update("linkedin", v)} placeholder="linkedin.com/in/yourname" />
            </div>

            {/* Why join */}
            <TextareaField
              label="Why do you want to be a Connexode ambassador? *"
              value={form.whyJoin}
              onChange={(v) => update("whyJoin", v)}
              placeholder="Tell us about your campus, your goals, and what you want to build here..."
              required
            />

            {/* Availability */}
            <SelectField
              label="Weekly availability *"
              value={form.availability}
              onChange={(v) => update("availability", v)}
              options={["1–2 hrs/week", "3–5 hrs/week", "5–8 hrs/week", "8+ hrs/week"]}
              required
            />

            {/* Status note */}
            <p style={{ color: "rgba(126,200,216,0.3)" }} className="text-xs leading-relaxed pt-1">
              You&apos;ll get an instant confirmation email. Track your application
              status (pending → approved → dashboard) by signing in anytime.
            </p>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: loading ? "rgba(24,128,128,0.5)" : "#188080", color: "#E8F4F8" }}
              className="w-full rounded-full py-3.5 text-sm font-semibold transition-all hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Submit application →"}
            </button>
          </form>
        </div>
      </section>

    </main>
  );
}

// ── Shared form field components ──────────────────────────────────────────────

function Field({
  label, value, onChange, placeholder, type = "text", required = false,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label style={{ color: "rgba(126,200,216,0.6)" }} className="mb-1.5 block text-xs font-medium">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        style={{
          backgroundColor: "#040C18",
          border: "1px solid rgba(126,200,216,0.15)",
          color: "#E8F4F8",
        }}
        className="w-full rounded-xl px-4 py-3 text-sm placeholder:text-[rgba(126,200,216,0.2)] outline-none focus:border-[rgba(126,200,216,0.45)] transition-colors"
      />
    </div>
  );
}

function TextareaField({
  label, value, onChange, placeholder, required = false,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; required?: boolean;
}) {
  return (
    <div>
      <label style={{ color: "rgba(126,200,216,0.6)" }} className="mb-1.5 block text-xs font-medium">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={4}
        style={{
          backgroundColor: "#040C18",
          border: "1px solid rgba(126,200,216,0.15)",
          color: "#E8F4F8",
          resize: "vertical",
        }}
        className="w-full rounded-xl px-4 py-3 text-sm placeholder:text-[rgba(126,200,216,0.2)] outline-none focus:border-[rgba(126,200,216,0.45)] transition-colors"
      />
    </div>
  );
}

function SelectField({
  label, value, onChange, options, required = false,
}: {
  label: string; value: string; onChange: (v: string) => void;
  options: string[]; required?: boolean;
}) {
  return (
    <div>
      <label style={{ color: "rgba(126,200,216,0.6)" }} className="mb-1.5 block text-xs font-medium">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        style={{
          backgroundColor: "#040C18",
          border: "1px solid rgba(126,200,216,0.15)",
          color: value ? "#E8F4F8" : "rgba(126,200,216,0.2)",
        }}
        className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:border-[rgba(126,200,216,0.45)] transition-colors appearance-none"
      >
        <option value="" disabled>Select...</option>
        {options.map((o) => (
          <option key={o} value={o} style={{ backgroundColor: "#082038", color: "#E8F4F8" }}>{o}</option>
        ))}
      </select>
    </div>
  );
}
