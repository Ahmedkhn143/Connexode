"use client";

import { useState } from "react";
import Link from "next/link";
import { Code2, Cpu, Search, Share2, Video, Check, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import PublicNav from "@/components/layout/PublicNav";
import PublicFooter from "@/components/layout/PublicFooter";

/* ─── Helpers ─── */
const Grad = ({ children }: { children: React.ReactNode }) => (
  <span style={{ background: "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
    {children}
  </span>
);

const Eye = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: "var(--violet)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "12px" } as React.CSSProperties}>
    {children}
  </span>
);

const GlassCard = ({ children, className = "", style = {}, id }: { children: React.ReactNode; className?: string; style?: React.CSSProperties; id?: string }) => (
  <div
    id={id}
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
    className={`hover:border-[var(--border-strong)] hover:-translate-y-0.5 ${className}`}
  >
    {children}
  </div>
);

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const toggleFaq = (i: number) => setOpenFaq(openFaq === i ? null : i);

  const stats = [
    { num: "50+", label: "Students Trained" },
    { num: "4", label: "Specialised Tracks" },
    { num: "8 wks", label: "Per Track" },
    { num: "Global", label: "Remote Delivery" },
  ];

  const servicesList = [
    {
      icon: <Code2 size={24} />, tag: "Development", id: "fullstack",
      title: "Full-Stack Development",
      desc: "From pixel-perfect interfaces to backend APIs — we build web applications that perform at scale.",
      stack: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma"],
      checklist: ["Frontend (React/Next.js)", "Backend APIs (Node.js)", "Database design", "Auth & security", "Vercel/Railway deployment", "End-to-end web apps"],
    },
    {
      icon: <Cpu size={24} />, tag: "AI Automation", id: "ai",
      title: "AI & Custom Chatbots",
      desc: "Custom AI assistants and automated pipelines that save your team hundreds of hours.",
      stack: ["OpenAI API", "Claude API", "LangChain", "n8n", "Python", "Pinecone"],
      checklist: ["Custom chatbots trained on your data", "AI workflow automation", "OpenAI/Claude API integration", "LangChain agents", "Business process automation", "n8n/Make pipelines"],
    },
    {
      icon: <Search size={24} />, tag: "Growth", id: "seo",
      title: "Search Engine Optimisation",
      desc: "Technical audits and custom search strategies that grow organic reach for the right customers.",
      stack: ["Google Search Console", "Ahrefs", "Screaming Frog", "SEMrush", "Analytics"],
      checklist: ["Technical SEO audit", "On-page optimisation", "Keyword research & strategy", "Link building", "GSC setup & monitoring", "Monthly reporting"],
    },
    {
      icon: <Share2 size={24} />, tag: "Social", id: "social",
      title: "Social Media Management",
      desc: "Content calendars, visual design, and page management — handled end to end.",
      stack: ["Meta Business Suite", "Canva Pro", "Buffer", "Notion", "Analytics"],
      checklist: ["Strategy (Instagram, LinkedIn, Facebook, TikTok)", "Monthly content calendar", "Caption writing & hashtags", "Graphic design for posts/reels", "Full page management", "Analytics reporting"],
    },
    {
      icon: <Video size={24} />, tag: "Media", id: "design",
      title: "Design, Video & 3D",
      desc: "Premium UI/UX, video assets, and 3D designs that build brand authority.",
      stack: ["Figma", "Premiere Pro", "DaVinci Resolve", "After Effects", "Blender"],
      checklist: ["Figma UI/UX design", "Design systems", "Short-form video editing", "Long-form production", "Blender 3D renders", "Thumbnail & poster design"],
    },
  ];

  const processSteps = [
    { step: "01", title: "Discover", desc: "Free call. We understand your project, goals, and timeline." },
    { step: "02", title: "Design", desc: "Clear scope, milestone pricing, timeline. No surprises." },
    { step: "03", title: "Build", desc: "Regular updates, shared preview links, direct communication." },
    { step: "04", title: "Launch", desc: "Final testing, deployment, handover, and 14-day support." },
  ];

  const industryPills = [
    "Startups", "Agencies", "E-commerce Brands", "Local Businesses", "Solo Founders",
    "SaaS Startups", "Recruitment Firms", "Coaches & Consultants", "Healthcare Practices", "Real Estate",
  ];

  const faqs = [
    { q: "Do you work with international clients?", a: "Yes, fully remote. We work with clients from North America, Europe, the Middle East, and beyond." },
    { q: "How much does it cost?", a: "Every project is priced based on scope. We offer milestone-based payments and quote after our discovery call." },
    { q: "How long does it take?", a: "Simple landing pages usually take 5–7 days. Complex web apps, automations, or design projects range from 3–6 weeks." },
    { q: "Can I hire for one service only?", a: "Absolutely. You can hire us for a single landing page, a specific automation pipeline, or ongoing SEO without bundling." },
    { q: "How do we communicate?", a: "Via WhatsApp, Slack, or Google Meet — based on your preference. You always have direct contact with the project builder." },
    { q: "Do you offer retainers?", a: "Yes, for SEO and Social Media Management where consistent monthly execution is required to see results." },
  ];

  return (
    <div style={{ color: "var(--text-primary)" }} className="min-h-screen flex flex-col font-sans">
      <PublicNav />

      {/* ═══ HERO ═══ */}
      <section className="relative pt-40 pb-16 px-6 flex flex-col items-center text-center overflow-hidden">
        {/* Blobs */}
        <div className="pointer-events-none absolute" style={{ top: -80, left: -60, width: 320, height: 320, background: "radial-gradient(circle, rgba(124,58,237,0.14), transparent 70%)", borderRadius: "50%", filter: "blur(40px)", zIndex: 0 }} />
        <div className="pointer-events-none absolute" style={{ bottom: -40, right: -40, width: 300, height: 300, background: "radial-gradient(circle, rgba(6,182,212,0.12), transparent 70%)", borderRadius: "50%", filter: "blur(40px)", zIndex: 0 }} />

        <span className="relative z-10 mb-6 inline-flex items-center gap-2 px-5 py-2 rounded-full text-[11px] font-semibold uppercase tracking-wider"
          style={{ background: "var(--surface)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid var(--border-strong)", color: "var(--cyan)", boxShadow: "var(--shadow-sm)" }}>
          Global services · Pakistan-built
        </span>

        <h1
          style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.08 }}
          className="relative z-10 max-w-3xl mx-auto mb-6"
        >
          Build smarter systems.<br /><Grad>Delivered worldwide.</Grad>
        </h1>

        <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.75 }} className="relative z-10 max-w-[520px] mx-auto mb-10">
          Full-stack apps, AI chatbots, SEO, and social media — real work delivered directly by our team, for clients anywhere.
        </p>

        <div className="relative z-10 flex flex-col sm:flex-row gap-4 items-center">
          <Link href="/contact" id="services-hero-cta"
            style={{ background: "var(--gradient)", color: "#fff", borderRadius: "999px", padding: "13px 30px", fontWeight: 700, fontSize: "14px", boxShadow: "var(--shadow-glow)" }}
            className="transition-all hover:brightness-110 hover:-translate-y-0.5 active:scale-95 w-full sm:w-auto text-center">
            Book a Discovery Call
          </Link>
          <a href="#services-list"
            style={{ background: "var(--surface)", backdropFilter: "blur(12px)", border: "1px solid var(--border)", color: "var(--text-primary)", borderRadius: "999px", padding: "13px 30px", fontWeight: 600, fontSize: "14px", boxShadow: "var(--shadow-sm)" }}
            className="transition-all hover:border-[var(--border-strong)] active:scale-95 w-full sm:w-auto text-center inline-flex items-center justify-center gap-2">
            Explore services <ArrowRight size={14} />
          </a>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section style={{ background: "var(--surface)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }} className="py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Grad><span style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>{s.num}</span></Grad>
              <span style={{ color: "var(--text-secondary)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" } as React.CSSProperties}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SERVICES LIST ═══ */}
      <section id="services-list" className="py-20 px-6 max-w-5xl mx-auto w-full flex flex-col gap-5">
        <div className="text-center mb-8">
          <Eye>What we build</Eye>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>
            Five service clusters. <Grad>One team.</Grad>
          </h2>
        </div>

        {servicesList.map((service, index) => (
          <GlassCard key={index} id={service.id}
            className="p-8 md:p-12 flex flex-col md:flex-row justify-between gap-8 md:gap-12">
            {/* Left */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div style={{ background: "rgba(124,58,237,0.1)", backdropFilter: "blur(8px)", border: "1px solid rgba(124,58,237,0.18)", color: "var(--violet)", width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {service.icon}
                  </div>
                  <span style={{ background: "rgba(6,182,212,0.08)", backdropFilter: "blur(8px)", border: "1px solid rgba(6,182,212,0.2)", color: "var(--cyan)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", borderRadius: "999px", padding: "4px 12px", textTransform: "uppercase" } as React.CSSProperties}>
                    {service.tag}
                  </span>
                </div>
                <h3 style={{ color: "var(--text-primary)", fontSize: "1.2rem", fontWeight: 800, letterSpacing: "-0.02em" }} className="mb-3">{service.title}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.75 }} className="mb-6">{service.desc}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto">
                {service.stack.map((tech, idx) => (
                  <span key={idx} style={{ background: "rgba(124,58,237,0.06)", border: "1px solid var(--border)", color: "var(--text-secondary)", borderRadius: "999px", padding: "4px 12px", fontSize: "12px" }}>{tech}</span>
                ))}
              </div>
            </div>

            {/* Right */}
            <div style={{ borderLeft: "1px solid var(--border)" }} className="md:pl-12 flex-1 flex flex-col justify-between">
              <ul className="flex flex-col gap-3 mb-8">
                {service.checklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm">
                    <Check size={15} style={{ color: "var(--cyan)", flexShrink: 0, marginTop: 2 }} />
                    <span style={{ color: "var(--text-secondary)" }}>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact"
                style={{ background: "var(--surface)", backdropFilter: "blur(8px)", border: "1px solid var(--border)", color: "var(--text-primary)", borderRadius: "999px", padding: "12px 28px", fontWeight: 600, fontSize: "14px" }}
                className="transition-all hover:border-[var(--border-strong)] active:scale-95 text-center w-full block">
                Get a quote
              </Link>
            </div>
          </GlassCard>
        ))}
      </section>

      {/* ═══ 4-STEP PROCESS ═══ */}
      <section style={{ background: "var(--surface)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }} className="py-24 px-6 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <Eye>From idea to launch</Eye>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>
              A focused path — <Grad>no unnecessary complexity.</Grad>
            </h2>
          </div>
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div style={{ borderTop: "1px dashed var(--border-strong)", top: "28px", opacity: 0.5 }} className="hidden lg:block absolute left-[10%] right-[10%] z-0" />
            {processSteps.map((step, idx) => (
              <GlassCard key={idx} className="relative z-10 p-7">
                <Grad><span style={{ fontSize: "2.5rem", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.06em", display: "block", marginBottom: 14 }}>{step.step}</span></Grad>
                <h3 style={{ color: "var(--text-primary)", fontWeight: 700, fontSize: "1rem", marginBottom: 8 }}>{step.title}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "13px", lineHeight: 1.7 }}>{step.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHO WE WORK WITH ═══ */}
      <section className="py-24 px-6 max-w-5xl mx-auto w-full text-center">
        <Eye>Who we work with</Eye>
        <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.03em" }} className="mb-4">
          Built for teams that <Grad>want real results.</Grad>
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.75 }} className="max-w-lg mx-auto mb-10">
          We work with founders, agencies, and growing businesses that need practical tech delivery — no fluff, no bloat.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {industryPills.map((pill, i) => (
            <span key={i}
              style={{ background: "var(--surface)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", border: "1px solid var(--border)", color: "var(--text-secondary)", borderRadius: "999px", padding: "9px 20px", fontSize: "13px", fontWeight: 500, cursor: "default", transition: "all 0.2s" }}
              className="hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]">
              {pill}
            </span>
          ))}
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section style={{ borderTop: "1px solid var(--border)" }} className="py-24 px-6 max-w-3xl mx-auto w-full">
        <div className="text-center mb-14">
          <Eye>Questions</Eye>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>Frequently asked</h2>
        </div>
        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={index}
                style={{ background: "var(--surface)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: isOpen ? "1px solid var(--border-strong)" : "1px solid var(--border)", borderRadius: "14px", boxShadow: "var(--shadow-sm), var(--inset-highlight)", overflow: "hidden", transition: "border-color 0.2s" }}>
                <button onClick={() => toggleFaq(index)} className="w-full p-6 text-left flex items-center justify-between gap-4 text-sm font-semibold">
                  <span style={{ color: "var(--text-primary)" }}>{faq.q}</span>
                  {isOpen
                    ? <ChevronUp size={18} style={{ color: "var(--violet)", flexShrink: 0 }} />
                    : <ChevronDown size={18} style={{ color: "var(--text-secondary)", flexShrink: 0 }} />}
                </button>
                {isOpen && (
                  <div style={{ borderTop: "1px solid var(--border)", color: "var(--text-secondary)" }} className="px-6 py-5 text-sm leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="py-12 px-6 max-w-5xl mx-auto w-full mb-12">
        <div className="relative overflow-hidden rounded-[20px] p-px" style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)" }}>
          <div className="relative rounded-[19px] p-12 text-center" style={{ background: "var(--surface-solid)" }}>
            <Eye>Start your project</Eye>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.03em" }} className="mb-4">
              Have a project in mind?
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.75 }} className="max-w-md mx-auto mb-10">
              Book a free discovery call. We&apos;ll understand your needs and send a clear scope and quote — no obligation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link href="/contact" id="services-bottom-cta"
                style={{ background: "var(--gradient)", color: "#fff", borderRadius: "999px", padding: "13px 30px", fontWeight: 700, fontSize: "14px", boxShadow: "var(--shadow-glow)" }}
                className="transition-all hover:brightness-110 hover:-translate-y-0.5 active:scale-95 w-full sm:w-auto text-center inline-flex items-center justify-center gap-2">
                Book a Discovery Call <ArrowRight size={15} />
              </Link>
              <Link href="/contact"
                style={{ background: "var(--surface)", backdropFilter: "blur(12px)", border: "1px solid var(--border)", color: "var(--text-primary)", borderRadius: "999px", padding: "13px 30px", fontWeight: 600, fontSize: "14px" }}
                className="transition-all hover:border-[var(--border-strong)] active:scale-95 w-full sm:w-auto text-center">
                Send a message
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
