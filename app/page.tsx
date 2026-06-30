"use client";

import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Cpu,
  GraduationCap,
  Briefcase,
  BookOpen,
  Users,
  Shield,
  CreditCard,
  MessageSquare,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import PublicNav from "@/components/layout/PublicNav";
import PublicFooter from "@/components/layout/PublicFooter";

/* ─── Helpers ─── */
const Grad = ({
  children,
  as: Tag = "span",
}: {
  children: React.ReactNode;
  as?: React.ElementType;
}) => (
  <Tag
    style={{
      background: "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    }}
  >
    {children}
  </Tag>
);

const Eye = ({ children }: { children: React.ReactNode }) => (
  <span
    style={{
      color: "var(--violet)",
      fontSize: "11px",
      fontWeight: 700,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      display: "block",
      marginBottom: "12px",
    }}
  >
    {children}
  </span>
);

const GlassCard = ({
  children,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <div
    style={{
      background: "var(--surface)",
      backdropFilter: "blur(var(--blur))",
      WebkitBackdropFilter: "blur(var(--blur))",
      border: "1px solid var(--border)",
      boxShadow: "var(--shadow-md), var(--inset-highlight)",
      borderRadius: "16px",
      transition: "all 0.25s ease",
      ...style,
    }}
    className={`hover:border-[var(--border-strong)] hover:-translate-y-1 hover:shadow-[var(--shadow-glow)] ${className}`}
  >
    {children}
  </div>
);

/* ─── Blob decoration ─── */
const Blobs = ({ dark = false }: { dark?: boolean }) => (
  <>
    <div
      className="pointer-events-none absolute"
      style={{
        top: -80, left: -60,
        width: 380, height: 380,
        background: `radial-gradient(circle, rgba(124,58,237,${dark ? "0.22" : "0.16"}), transparent 70%)`,
        borderRadius: "50%",
        filter: "blur(44px)",
        zIndex: 0,
      }}
    />
    <div
      className="pointer-events-none absolute"
      style={{
        bottom: -80, right: -60,
        width: 420, height: 420,
        background: `radial-gradient(circle, rgba(6,182,212,${dark ? "0.20" : "0.14"}), transparent 70%)`,
        borderRadius: "50%",
        filter: "blur(44px)",
        zIndex: 0,
      }}
    />
  </>
);

export default function Home() {
  const capCards = [
    { action: "Build", icon: <Code2 size={20} />, items: ["Full-Stack Apps", "SaaS Platforms", "Custom Software"] },
    { action: "Automate", icon: <Cpu size={20} />, items: ["AI Workflows", "Chatbots", "n8n Pipelines"] },
    { action: "Grow", icon: <TrendingUp size={20} />, items: ["SEO", "Social Media", "Content Strategy"] },
    { action: "Train", icon: <GraduationCap size={20} />, items: ["Internships", "Ambassadors", "Certificates"] },
  ];

  const stats = [
    { num: "50+", label: "Students Trained" },
    { num: "4", label: "Specialised Tracks" },
    { num: "8 wks", label: "Per Track" },
    { num: "Global", label: "Remote Delivery" },
  ];

  const servicePills = [
    "Full-Stack Apps", "AI Chatbots", "Workflow Automation", "SEO",
    "Social Media Management", "UI/UX Design", "Video & 3D",
    "Internship Tracks", "Ambassador Program",
  ];

  const clientPills = ["Startups", "Agencies", "E-commerce Brands", "Local Businesses", "Solo Founders", "Small Teams"];
  const studentPills = ["University Students", "Aspiring Developers", "Campus Leaders", "Career Switchers"];

  const proofPoints = [
    { icon: <Shield size={22} />, title: "Verified certificates", desc: "Every certificate has a unique ID, publicly checkable." },
    { icon: <CreditCard size={22} />, title: "Milestone-based payment", desc: "Clients pay as work is delivered, never upfront." },
    { icon: <MessageSquare size={22} />, title: "Direct team access", desc: "No account managers, no ticket queues — ever." },
  ];

  return (
    <div style={{ color: "var(--text-primary)" }} className="min-h-screen flex flex-col font-sans">
      <PublicNav />

      {/* ═══ HERO ═══ */}
      <section className="relative pt-40 pb-24 px-6 flex flex-col items-center text-center justify-center min-h-screen overflow-hidden">
        <Blobs />

        {/* Subtle grid */}
        <div className="pointer-events-none absolute inset-0" style={{
          backgroundImage: "linear-gradient(rgba(124,58,237,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.035) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 0%, black 0%, transparent 85%)",
          zIndex: 0,
        }} />

        {/* Eyebrow pill */}
        <span
          className="relative z-10 mb-8 inline-flex items-center gap-2 px-5 py-2 rounded-full text-[11px] font-semibold uppercase tracking-wider"
          style={{
            background: "var(--surface)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid var(--border-strong)",
            color: "var(--violet)",
            boxShadow: "var(--shadow-sm), var(--inset-highlight)",
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--violet)", display: "inline-block" }} />
          Global tech services · Pakistan-built
        </span>

        {/* Headline */}
        <h1
          className="relative z-10 max-w-3xl mx-auto mb-6"
          style={{
            fontSize: "clamp(2.8rem, 6.5vw, 5rem)",
            fontWeight: 900,
            letterSpacing: "-0.05em",
            lineHeight: 1.02,
          }}
        >
          Train real talent.
          <br />
          <Grad>Deliver real systems.</Grad>
        </h1>

        {/* Subheadline */}
        <p
          className="relative z-10 max-w-[560px] mx-auto mb-10"
          style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: 1.75 }}
        >
          Connexode connects campus training, ambassador networks, and global tech
          delivery into one practical system for ambitious teams and talent.
        </p>

        {/* CTA row */}
        <div className="relative z-10 flex flex-col sm:flex-row gap-4 items-center justify-center mb-14">
          <Link
            href="/join"
            id="hero-primary-cta"
            style={{
              background: "var(--gradient)",
              color: "#fff",
              borderRadius: "999px",
              padding: "14px 34px",
              fontWeight: 700,
              fontSize: "15px",
              boxShadow: "var(--shadow-glow)",
            }}
            className="transition-all hover:brightness-110 hover:-translate-y-0.5 active:scale-95 w-full sm:w-auto text-center"
          >
            Book a Discovery Call
          </Link>
          <Link
            href="/services"
            id="hero-secondary-cta"
            style={{
              background: "var(--surface)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
              borderRadius: "999px",
              padding: "14px 34px",
              fontWeight: 600,
              fontSize: "15px",
              boxShadow: "var(--shadow-sm), var(--inset-highlight)",
            }}
            className="transition-all hover:border-[var(--border-strong)] hover:-translate-y-0.5 active:scale-95 w-full sm:w-auto text-center"
          >
            Explore Services
          </Link>
        </div>

        {/* Capability cards */}
        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl mx-auto mb-12">
          {capCards.map((c, i) => (
            <GlassCard key={i} className="p-5 cursor-default">
              <div className="flex items-center gap-2 mb-3">
                <span style={{ color: "var(--violet)" }}>{c.icon}</span>
                <Grad>
                  <span style={{ fontWeight: 900, fontSize: "1.1rem", letterSpacing: "-0.02em" }}>{c.action}</span>
                </Grad>
              </div>
              <ul>
                {c.items.map((item, j) => (
                  <li key={j} style={{ color: "var(--text-secondary)", fontSize: "12px", lineHeight: "1.8" }}>{item}</li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>

        {/* Stats pills */}
        <div className="relative z-10 flex flex-wrap justify-center gap-3">
          {stats.map((s, i) => (
            <div
              key={i}
              style={{
                background: "var(--surface)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid var(--border)",
                borderRadius: "999px",
                padding: "10px 20px",
                boxShadow: "var(--shadow-sm)",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Grad><span style={{ fontSize: "1.15rem", fontWeight: 800, letterSpacing: "-0.03em" }}>{s.num}</span></Grad>
              <span style={{ color: "var(--text-secondary)", fontSize: "12px", fontWeight: 500 }}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ BUILT TO DELIVER ═══ */}
      <section
        style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
        className="py-24 px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          <Eye>Built for practical delivery</Eye>
          <h2
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15 }}
            className="mb-5"
          >
            Built to deliver. <Grad>Designed to scale.</Grad>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.75 }} className="max-w-lg mx-auto mb-8">
            From mentorship and certification to client-ready development — Connexode turns training into real outcomes.
          </p>
          <Link
            href="/community/showcase"
            id="deliver-cta"
            style={{ color: "var(--violet)", fontWeight: 600, fontSize: "14px" }}
            className="inline-flex items-center gap-2 hover:underline"
          >
            See our work <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* ═══ WHAT WE BUILD ═══ */}
      <section className="py-24 px-6 max-w-5xl mx-auto w-full text-center">
        <Eye>What we build</Eye>
        <h2
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.03em" }}
          className="mb-4"
        >
          Real systems. Real delivery. <Grad>Real talent.</Grad>
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.75 }} className="max-w-xl mx-auto mb-10">
          We build practical software, AI systems, and growth services — and train the people who build them.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {servicePills.map((pill, i) => (
            <span
              key={i}
              style={{
                background: "var(--surface)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
                borderRadius: "999px",
                padding: "8px 18px",
                fontSize: "13px",
                fontWeight: 500,
                boxShadow: "var(--shadow-sm)",
                cursor: "default",
                transition: "all 0.2s",
              }}
              className="hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
            >
              {pill}
            </span>
          ))}
        </div>

        <Link
          href="/services"
          id="services-pill-cta"
          style={{
            background: "var(--surface)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
            borderRadius: "999px",
            padding: "12px 28px",
            fontWeight: 600,
            fontSize: "14px",
            boxShadow: "var(--shadow-sm)",
          }}
          className="inline-flex items-center gap-2 transition-all hover:border-[var(--border-strong)]"
        >
          Explore all services <ArrowRight size={14} />
        </Link>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section
        style={{ background: "var(--surface)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
        className="py-24 px-6 w-full"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <Eye>From idea to launch</Eye>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>
              A focused path — <Grad>for talent and for clients</Grad>
            </h2>
          </div>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div
              style={{ borderTop: "1px dashed var(--border-strong)", top: "28px", opacity: 0.6 }}
              className="hidden lg:block absolute left-[10%] right-[10%] z-0"
            />
            {[
              { n: "01", title: "Discover", desc: "Free call. Understand your project, goals, and timeline." },
              { n: "02", title: "Design", desc: "Clear scope, milestone pricing, timeline. No surprises." },
              { n: "03", title: "Build", desc: "Regular check-ins, shared previews, direct communication." },
              { n: "04", title: "Launch", desc: "Delivery, deployment, and 14 days of post-launch support." },
            ].map((step, i) => (
              <GlassCard key={i} className="relative z-10 p-7">
                <Grad>
                  <span style={{ fontSize: "2.8rem", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.06em", display: "block", marginBottom: 16 }}>
                    {step.n}
                  </span>
                </Grad>
                <h3 style={{ color: "var(--text-primary)", fontWeight: 700, fontSize: "1rem", marginBottom: 8 }}>{step.title}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "13px", lineHeight: "1.7" }}>{step.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INTERNSHIP SPOTLIGHT ═══ */}
      <section style={{ borderBottom: "1px solid var(--border)" }} className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left copy */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                {["CONNEXODE SYSTEMS", "TALENT PIPELINE"].map((tag, i) => (
                  <span key={i}
                    style={{
                      background: "var(--surface)",
                      backdropFilter: "blur(8px)",
                      border: `1px solid ${i === 0 ? "rgba(124,58,237,0.25)" : "rgba(6,182,212,0.25)"}`,
                      color: i === 0 ? "var(--violet-light)" : "var(--cyan)",
                      fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em",
                      borderRadius: "999px", padding: "4px 12px",
                    }}
                  >{tag}</span>
                ))}
              </div>
              <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1 }} className="mb-4">
                Internship<br /><Grad>Program</Grad>
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.75 }} className="mb-8">
                Structured tracks that turn students into shippable developers.
              </p>
              <Link href="/join/internship" id="internship-cta"
                style={{ background: "var(--gradient)", color: "#fff", borderRadius: "999px", padding: "12px 28px", fontWeight: 700, fontSize: "14px", boxShadow: "var(--shadow-glow)" }}
                className="inline-flex items-center gap-2 transition-all hover:brightness-110"
              >
                View tracks <ArrowRight size={14} />
              </Link>
            </div>

            {/* Right: 3-step flow */}
            <div className="flex flex-col gap-4">
              {[
                { n: "01", label: "Apply", sub: "Submit your application in minutes." },
                { n: "02", label: "Train", sub: "8-week structured track with mentor grading." },
                { n: "03", label: "Certify & Hire", sub: "Earn a verified certificate. Get hired." },
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div style={{ background: "var(--gradient)", width: 42, height: 42, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 800, color: "#fff", flexShrink: 0 }}>
                      {step.n}
                    </div>
                    {i < 2 && <div style={{ width: 1, height: 32, background: "linear-gradient(180deg, rgba(124,58,237,0.4), rgba(6,182,212,0.15))", marginTop: 4 }} />}
                  </div>
                  <div style={{ paddingTop: 10 }}>
                    <p style={{ color: "var(--text-primary)", fontWeight: 700, fontSize: "15px", marginBottom: 2 }}>{step.label}</p>
                    <p style={{ color: "var(--text-secondary)", fontSize: "13px" }}>{step.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHO WE WORK WITH ═══ */}
      <section className="py-24 px-6 max-w-5xl mx-auto w-full text-center">
        <Eye>Who we work with</Eye>
        <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.03em" }} className="mb-4">
          Built for founders, students,<br />and <Grad>growing teams.</Grad>
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.75 }} className="max-w-lg mx-auto mb-10">
          Connexode serves two audiences — businesses that need real delivery, and students who need real training.
        </p>

        <div className="mb-4">
          <p style={{ color: "var(--text-muted)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12, textAlign: "center" }}>For clients</p>
          <div className="flex flex-wrap justify-center gap-3">
            {clientPills.map((p, i) => (
              <span key={i} style={{ background: "rgba(124,58,237,0.07)", backdropFilter: "blur(8px)", border: "1px solid rgba(124,58,237,0.18)", color: "var(--violet)", borderRadius: "999px", padding: "7px 18px", fontSize: "13px", fontWeight: 500, cursor: "default" }}>
                {p}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <p style={{ color: "var(--text-muted)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12, textAlign: "center" }}>For students</p>
          <div className="flex flex-wrap justify-center gap-3">
            {studentPills.map((p, i) => (
              <span key={i} style={{ background: "rgba(6,182,212,0.06)", backdropFilter: "blur(8px)", border: "1px solid rgba(6,182,212,0.18)", color: "var(--cyan)", borderRadius: "999px", padding: "7px 18px", fontSize: "13px", fontWeight: 500, cursor: "default" }}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THREE PILLARS ═══ */}
      <section
        style={{ background: "var(--surface)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
        className="py-24 px-6 w-full"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <Eye>What we offer</Eye>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>
              Three pillars. <Grad>One system.</Grad>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: <Briefcase size={22} />, title: "Client Services", desc: "Full-stack development, AI automation, SEO, and social media — for global clients.", href: "/services", cta: "Explore services" },
              { icon: <BookOpen size={22} />, title: "Internship Program", desc: "8-week structured tracks, mentor grading, GitHub projects, verified certificates.", href: "/join/internship", cta: "View tracks" },
              { icon: <Users size={22} />, title: "Ambassador Program", desc: "Lead AI sessions, host webinars, grow campus communities, track real impact.", href: "/join/ambassador", cta: "Apply now" },
            ].map((card, i) => (
              <GlassCard key={i} className="p-8 flex flex-col justify-between min-h-[240px]">
                <div>
                  <div
                    style={{ background: "rgba(124,58,237,0.1)", backdropFilter: "blur(8px)", border: "1px solid rgba(124,58,237,0.18)", color: "var(--violet)", width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}
                  >{card.icon}</div>
                  <h3 style={{ color: "var(--text-primary)", fontWeight: 700, fontSize: "1.05rem", marginBottom: 10 }}>{card.title}</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "13px", lineHeight: 1.7, marginBottom: 20 }}>{card.desc}</p>
                </div>
                <Link href={card.href} style={{ color: "var(--cyan)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}
                  className="flex items-center gap-1.5 hover:underline">
                  {card.cta} <ArrowRight size={13} />
                </Link>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROOF POINTS ═══ */}
      <section className="py-24 px-6 max-w-5xl mx-auto w-full">
        <div className="text-center mb-14">
          <Eye>Trusted foundations</Eye>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>
            Built on real mentorship<br />and <Grad>real delivery.</Grad>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {proofPoints.map((pt, i) => (
            <GlassCard key={i} className="p-8 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div style={{ background: "rgba(124,58,237,0.1)", backdropFilter: "blur(8px)", border: "1px solid rgba(124,58,237,0.18)", color: "var(--violet-light)", width: 42, height: 42, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {pt.icon}
                </div>
                <CheckCircle size={16} style={{ color: "var(--cyan)" }} />
              </div>
              <h3 style={{ color: "var(--text-primary)", fontWeight: 700, fontSize: "1rem" }}>{pt.title}</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "13px", lineHeight: 1.7 }}>{pt.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-16 px-6 max-w-4xl mx-auto w-full pb-24">
        <div className="relative overflow-hidden rounded-[20px] p-px"
          style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)" }}>
          <div
            className="relative rounded-[19px] p-12 text-center"
            style={{ background: "var(--surface-solid)", backdropFilter: "blur(20px)" }}
          >
            <div className="pointer-events-none absolute inset-0 rounded-[19px]"
              style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(124,58,237,0.07), transparent 70%)" }} />

            <Eye>Let&apos;s build something useful</Eye>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.03em" }} className="mb-4">
              Ready to build, train,<br />or <Grad>grow with us?</Grad>
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.75 }} className="max-w-md mx-auto mb-10">
              Whether you need a working system or you&apos;re ready to start training — let&apos;s talk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-6">
              <Link href="/contact" id="final-cta-primary"
                style={{ background: "var(--gradient)", color: "#fff", borderRadius: "999px", padding: "14px 34px", fontWeight: 700, fontSize: "15px", boxShadow: "var(--shadow-glow)" }}
                className="transition-all hover:brightness-110 hover:-translate-y-0.5 active:scale-95 w-full sm:w-auto text-center"
              >
                Book a Discovery Call
              </Link>
              <Link href="/join" id="final-cta-secondary"
                style={{ background: "var(--surface)", backdropFilter: "blur(12px)", border: "1px solid var(--border)", color: "var(--text-primary)", borderRadius: "999px", padding: "14px 34px", fontWeight: 600, fontSize: "15px", boxShadow: "var(--shadow-sm)" }}
                className="transition-all hover:border-[var(--border-strong)] hover:-translate-y-0.5 active:scale-95 w-full sm:w-auto text-center"
              >
                Join Connexode
              </Link>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "12px" }}>Discovery call · No obligation · Direct response</p>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
