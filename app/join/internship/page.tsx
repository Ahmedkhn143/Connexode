// app/join/internship/page.tsx
// Internship Program — tracks + application form
// Colors: Navy #082038 · Teal #188080 · Cyan #7EC8D8

"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Code2, Layers, Brain, Palette } from "lucide-react";

const tracks = [
  {
    icon: <Code2 size={20} strokeWidth={1.5} />,
    name: "Frontend Development",
    stack: "HTML · CSS · JavaScript · React",
    weeks: "8 weeks",
    desc: "Build real UI components and complete projects using modern React. From basics to deploying your own portfolio.",
  },
  {
    icon: <Layers size={20} strokeWidth={1.5} />,
    name: "Full Stack Development",
    stack: "React · Node.js · Express · MongoDB",
    weeks: "8 weeks",
    desc: "Cover both frontend and backend. Build and deploy a full web application with auth, database, and REST APIs.",
  },
  {
    icon: <Brain size={20} strokeWidth={1.5} />,
    name: "AI & Automation",
    stack: "Python · LangChain · OpenAI API · n8n",
    weeks: "8 weeks",
    desc: "Build real AI-powered apps and automation workflows. Prompt engineering, agents, and LLM integrations.",
  },
  {
    icon: <Palette size={20} strokeWidth={1.5} />,
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

const empty: FormData = {
  fullName: "", email: "", university: "", semester: "",
  city: "", track: "", github: "", portfolio: "", whyJoin: "", experience: "",
};

export default function InternshipPage() {
  const [form, setForm] = useState<FormData>(empty);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function update(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function selectTrack(name: string) {
    setForm((prev) => ({ ...prev, track: name }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // TODO: Replace localStorage block with Prisma API call:
    // const res = await fetch("/api/applications/internship", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ ...form, status: "pending", type: "internship", createdAt: new Date().toISOString() }),
    // });

    const existing = JSON.parse(localStorage.getItem("connexode_internship_applications") || "[]");
    const newApp = {
      ...form,
      status: "pending",
      type: "internship",
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem("connexode_internship_applications", JSON.stringify([...existing, newApp]));

    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
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
          <h1 style={{ color: "#E8F4F8" }} className="mb-3 text-2xl font-bold">
            Application received!
          </h1>
          <p style={{ color: "rgba(126,200,216,0.5)" }} className="mb-2 text-sm leading-relaxed">
            We&apos;ve got your internship application,{" "}
            <strong style={{ color: "#7EC8D8" }}>{form.fullName}</strong>.
          </p>
          <p style={{ color: "rgba(126,200,216,0.4)" }} className="mb-8 text-sm leading-relaxed">
            Track selected:{" "}
            <strong style={{ color: "#7EC8D8" }}>{form.track}</strong>.
            Check your email for confirmation. Status updates within 3–5 days
            — sign in anytime to track.
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
              href="/join"
              style={{ border: "1px solid rgba(126,200,216,0.2)", color: "rgba(126,200,216,0.6)" }}
              className="rounded-full px-6 py-2.5 text-sm font-medium transition-all hover:text-[#7EC8D8]"
            >
              Back to Join
            </Link>
          </div>
        </div>
      </main>
    );
  }

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
          Internship Program
        </span>
        <h1 style={{ color: "#E8F4F8" }} className="mb-4 text-4xl font-bold tracking-tight">
          Structured internships.
          <br />Real projects. Verified certificates.
        </h1>
        <p style={{ color: "rgba(126,200,216,0.5)" }} className="text-base leading-relaxed">
          Pick a track, follow an 8-week roadmap, submit real GitHub projects,
          get mentor feedback every week, and walk away with a portfolio and
          a certificate you can actually show.
        </p>
      </section>

      {/* Track selector */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <p style={{ color: "rgba(126,200,216,0.4)" }} className="mb-5 text-xs font-medium uppercase tracking-widest text-center">
          Pick your track — then apply below
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {tracks.map((t) => {
            const selected = form.track === t.name;
            return (
              <button
                key={t.name}
                type="button"
                onClick={() => selectTrack(t.name)}
                style={{
                  backgroundColor: selected ? "rgba(24,128,128,0.15)" : "#082038",
                  border: `1px solid ${selected ? "#188080" : "rgba(126,200,216,0.1)"}`,
                  textAlign: "left",
                }}
                className="group rounded-xl p-5 transition-all duration-200 hover:border-[rgba(126,200,216,0.35)]"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span
                    style={{
                      backgroundColor: selected ? "rgba(24,128,128,0.3)" : "rgba(24,128,128,0.12)",
                      color: "#7EC8D8",
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-lg"
                  >
                    {t.icon}
                  </span>
                  <span
                    style={{
                      border: `1px solid ${selected ? "#188080" : "rgba(126,200,216,0.15)"}`,
                      color: selected ? "#7EC8D8" : "rgba(126,200,216,0.35)",
                      backgroundColor: selected ? "rgba(24,128,128,0.1)" : "transparent",
                    }}
                    className="rounded-full px-2.5 py-0.5 text-[10px] font-medium"
                  >
                    {t.weeks}
                  </span>
                </div>
                <p style={{ color: "#E8F4F8" }} className="mb-1 text-sm font-semibold">{t.name}</p>
                <p style={{ color: "rgba(126,200,216,0.4)" }} className="mb-2 text-xs">{t.stack}</p>
                <p style={{ color: "rgba(126,200,216,0.45)" }} className="text-xs leading-relaxed">{t.desc}</p>
                {selected && (
                  <p style={{ color: "#188080" }} className="mt-3 text-xs font-semibold">✓ Selected</p>
                )}
              </button>
            );
          })}
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
            Takes 3 minutes. Select a track above first, then fill this in.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Selected track display */}
            <div
              style={{
                backgroundColor: form.track ? "rgba(24,128,128,0.1)" : "#040C18",
                border: `1px solid ${form.track ? "#188080" : "rgba(126,200,216,0.15)"}`,
              }}
              className="rounded-xl px-4 py-3"
            >
              <p style={{ color: "rgba(126,200,216,0.4)" }} className="mb-0.5 text-xs">Selected track</p>
              <p style={{ color: form.track ? "#7EC8D8" : "rgba(126,200,216,0.25)" }} className="text-sm font-medium">
                {form.track || "No track selected — pick one above"}
              </p>
            </div>

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

            <Field label="City *" value={form.city} onChange={(v) => update("city", v)} placeholder="Lahore, Karachi, Kot Addu..." required />

            {/* Links */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="GitHub profile" value={form.github} onChange={(v) => update("github", v)} placeholder="github.com/yourusername" />
              <Field label="Portfolio / LinkedIn" value={form.portfolio} onChange={(v) => update("portfolio", v)} placeholder="yoursite.com or linkedin URL" />
            </div>

            {/* Experience */}
            <SelectField
              label="Your experience level *"
              value={form.experience}
              onChange={(v) => update("experience", v)}
              options={["Complete beginner", "Some basics (tutorials done)", "Built 1–2 small projects", "Comfortable, want to go deeper"]}
              required
            />

            {/* Why join */}
            <TextareaField
              label="Why do you want to join this internship? *"
              value={form.whyJoin}
              onChange={(v) => update("whyJoin", v)}
              placeholder="Tell us your goals, what you want to build, and where you want to be 3 months from now..."
              required
            />

            {/* Status note */}
            <p style={{ color: "rgba(126,200,216,0.3)" }} className="text-xs leading-relaxed pt-1">
              Instant confirmation email on submit. Track your status
              (pending → approved → dashboard unlocked) by signing in anytime.
            </p>

            {/* Validate track selected */}
            {!form.track && (
              <p style={{ color: "rgba(255,100,100,0.7)" }} className="text-xs">
                ⚠ Please select a track above before submitting.
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !form.track}
              style={{
                backgroundColor: loading || !form.track ? "rgba(24,128,128,0.4)" : "#188080",
                color: "#E8F4F8",
              }}
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

// ── Shared field components ───────────────────────────────────────────────────

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
