// app/join/page.tsx
// Join Connexode — landing fork + comparison table + FAQ
// Colors: Navy #082038 · Teal #188080 · Cyan #7EC8D8

import Link from "next/link";
import { ArrowRight, Users, BookOpen, Check } from "lucide-react";

const comparison = [
  {
    feature: "Time commitment",
    ambassador: "3–5 hrs/week, flexible",
    internship: "8 weeks, structured tasks",
  },
  {
    feature: "Core activity",
    ambassador: "AI sessions, webinars, social growth",
    internship: "Hands-on projects, graded submissions",
  },
  {
    feature: "Outcome",
    ambassador: "Leadership & community building",
    internship: "Technical portfolio & skill depth",
  },
  {
    feature: "Certificate",
    ambassador: "Ambassador Certificate",
    internship: "Track-specific Internship Certificate",
  },
  {
    feature: "Dashboard",
    ambassador: "Reach, sessions & webinar tracker",
    internship: "Task grades, badges & roadmap",
  },
  {
    feature: "Best for",
    ambassador: "Students who like organising & speaking",
    internship: "Students who want deep coding practice",
  },
];

const faqs = [
  {
    q: "Who can apply?",
    a: "Any student currently enrolled at a Pakistani university. No prior experience required — we train you.",
  },
  {
    q: "Is it paid?",
    a: "Both programs are currently unpaid. You earn a verified certificate, mentorship, dashboard access, and real experience you can show on your CV.",
  },
  {
    q: "Can I do both at the same time?",
    a: "Yes, but we recommend starting with one. Both have different workloads — internship is more intensive.",
  },
  {
    q: "What happens after I apply?",
    a: "You get an instant confirmation email. Our team reviews within 3–5 days. Your dashboard shows live status — no need to message us asking.",
  },
];

export default function JoinPage() {
  return (
    <main style={{ backgroundColor: "#040C18" }} className="min-h-screen pt-24 pb-20 antialiased">

      {/* ── Hero ── */}
      <section className="mx-auto max-w-4xl px-6 pt-12 pb-16 text-center">
        <span
          style={{ border: "1px solid rgba(126,200,216,0.2)", color: "#7EC8D8", backgroundColor: "rgba(8,32,56,0.6)" }}
          className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-widest"
        >
          Two ways to grow
        </span>
        <h1 style={{ color: "#E8F4F8" }} className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          How do you want to grow<br />with Connexode?
        </h1>
        <p style={{ color: "rgba(126,200,216,0.5)" }} className="text-base leading-relaxed sm:text-lg">
          Choose the path that fits your goals. Both come with mentorship,
          a verified certificate, and a real dashboard to track your progress.
        </p>
      </section>

      {/* ── Fork cards ── */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* Ambassador */}
          <div
            style={{ backgroundColor: "#082038", border: "1px solid rgba(126,200,216,0.12)" }}
            className="group flex flex-col rounded-2xl p-8 transition-all duration-300 hover:border-[rgba(126,200,216,0.35)] hover:-translate-y-1"
          >
            <span
              style={{ backgroundColor: "rgba(24,128,128,0.15)", border: "1px solid rgba(24,128,128,0.3)", color: "#7EC8D8" }}
              className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl"
            >
              <Users size={20} strokeWidth={1.5} />
            </span>
            <h2 style={{ color: "#E8F4F8" }} className="mb-3 text-xl font-bold">Ambassador Program</h2>
            <p style={{ color: "rgba(126,200,216,0.5)" }} className="mb-6 text-sm leading-relaxed flex-1">
              Lead AI-awareness sessions on your campus, host webinars, grow a
              student community, and guide peers on social media growth — all
              tracked on your live dashboard.
            </p>
            <ul className="mb-8 space-y-2">
              {["Flexible weekly schedule", "Webinar hosting access", "Growth dashboard", "Ambassador certificate"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "rgba(126,200,216,0.6)" }}>
                  <Check size={13} style={{ color: "#188080" }} strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/join/ambassador"
              style={{ backgroundColor: "#188080", color: "#E8F4F8" }}
              className="flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-all hover:brightness-110 active:scale-95"
            >
              Apply as ambassador
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Internship */}
          <div
            style={{ backgroundColor: "#082038", border: "1px solid rgba(126,200,216,0.12)" }}
            className="group flex flex-col rounded-2xl p-8 transition-all duration-300 hover:border-[rgba(126,200,216,0.35)] hover:-translate-y-1"
          >
            <span
              style={{ backgroundColor: "rgba(24,128,128,0.15)", border: "1px solid rgba(24,128,128,0.3)", color: "#7EC8D8" }}
              className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl"
            >
              <BookOpen size={20} strokeWidth={1.5} />
            </span>
            <h2 style={{ color: "#E8F4F8" }} className="mb-3 text-xl font-bold">Internship Program</h2>
            <p style={{ color: "rgba(126,200,216,0.5)" }} className="mb-6 text-sm leading-relaxed flex-1">
              Pick a tech track, follow a structured 8-week roadmap, submit real
              GitHub projects, receive mentor feedback, and earn an
              industry-verified certificate.
            </p>
            <ul className="mb-8 space-y-2">
              {["8-week structured roadmap", "Mentor-graded submissions", "Portfolio projects", "Track certificate"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "rgba(126,200,216,0.6)" }}>
                  <Check size={13} style={{ color: "#188080" }} strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/join/internship"
              style={{ backgroundColor: "#188080", color: "#E8F4F8" }}
              className="flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-all hover:brightness-110 active:scale-95"
            >
              View tracks &amp; apply
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Comparison table ── */}
      <section
        style={{ borderTop: "1px solid rgba(126,200,216,0.06)", borderBottom: "1px solid rgba(126,200,216,0.06)", backgroundColor: "#061020" }}
        className="py-20"
      >
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12 text-center">
            <p style={{ color: "#7EC8D8" }} className="mb-3 text-xs font-medium uppercase tracking-widest">Side by side</p>
            <h2 style={{ color: "#E8F4F8" }} className="text-2xl font-bold sm:text-3xl">Not sure which to pick?</h2>
          </div>

          {/* Table */}
          <div style={{ border: "1px solid rgba(126,200,216,0.1)" }} className="overflow-hidden rounded-2xl">
            {/* Header */}
            <div
              style={{ backgroundColor: "#082038", borderBottom: "1px solid rgba(126,200,216,0.1)" }}
              className="grid grid-cols-3 px-6 py-4"
            >
              <div />
              <div className="text-center">
                <span style={{ color: "#7EC8D8" }} className="text-xs font-semibold uppercase tracking-widest">Ambassador</span>
              </div>
              <div className="text-center">
                <span style={{ color: "#7EC8D8" }} className="text-xs font-semibold uppercase tracking-widest">Internship</span>
              </div>
            </div>

            {/* Rows */}
            {comparison.map((row, i) => (
              <div
                key={row.feature}
                style={{
                  backgroundColor: i % 2 === 0 ? "rgba(8,32,56,0.4)" : "rgba(4,12,24,0.4)",
                  borderBottom: i < comparison.length - 1 ? "1px solid rgba(126,200,216,0.06)" : "none",
                }}
                className="grid grid-cols-3 items-start gap-4 px-6 py-4"
              >
                <span style={{ color: "rgba(126,200,216,0.45)" }} className="text-xs font-medium uppercase tracking-wide pt-0.5">
                  {row.feature}
                </span>
                <span style={{ color: "#E8F4F8" }} className="text-sm text-center leading-snug">{row.ambassador}</span>
                <span style={{ color: "#E8F4F8" }} className="text-sm text-center leading-snug">{row.internship}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <div className="mb-12 text-center">
          <p style={{ color: "#7EC8D8" }} className="mb-3 text-xs font-medium uppercase tracking-widest">Common questions</p>
          <h2 style={{ color: "#E8F4F8" }} className="text-2xl font-bold">Before you apply</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              style={{ backgroundColor: "#082038", border: "1px solid rgba(126,200,216,0.1)" }}
              className="rounded-xl px-6 py-5"
            >
              <p style={{ color: "#E8F4F8" }} className="mb-2 text-sm font-semibold">{faq.q}</p>
              <p style={{ color: "rgba(126,200,216,0.5)" }} className="text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
