// app/services/page.tsx
// Services — 4 clusters + process + FAQ + CTA
// Colors: Navy #082038 · Teal #188080 · Cyan #7EC8D8

import Link from "next/link";
import {
  Code2,
  Layers,
  Video,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  MessageSquare,
  FileText,
  Hammer,
  PackageCheck,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const clusters = [
  {
    id: "development",
    icon: <Code2 size={22} strokeWidth={1.5} />,
    tag: "Development",
    title: "Frontend & Full Stack",
    desc: "From pixel-perfect React UIs to complete full-stack applications with auth, database, and APIs — built clean and deployed fast.",
    services: [
      "Responsive React / Next.js websites",
      "Full-stack apps (Node.js + MongoDB/PostgreSQL)",
      "REST & tRPC API development",
      "Authentication (NextAuth, JWT)",
      "Performance optimisation & SEO",
      "Vercel / Railway deployment",
    ],
    stack: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
  },
  {
    id: "design",
    icon: <FileText size={22} strokeWidth={1.5} />,
    tag: "Design",
    title: "Figma & UI/UX",
    desc: "Clean, conversion-focused design — from wireframes to polished Figma prototypes that developers can build from directly.",
    services: [
      "UI/UX design from scratch",
      "Wireframes & user flows",
      "Design system creation",
      "High-fidelity Figma prototypes",
      "Landing page design",
      "Component library design",
    ],
    stack: ["Figma", "FigJam", "Auto Layout", "Design Tokens", "Framer"],
  },
  {
    id: "media",
    icon: <Video size={22} strokeWidth={1.5} />,
    tag: "Media",
    title: "Video Editing & 3D",
    desc: "Professional video production and 3D visuals — from short-form social content to product renders and explainer animations.",
    services: [
      "Short-form video editing (Reels, Shorts, TikTok)",
      "Long-form video production",
      "Motion graphics & transitions",
      "3D product renders (Blender)",
      "Brand intro animations",
      "Thumbnail & poster design",
    ],
    stack: ["Premiere Pro", "DaVinci Resolve", "After Effects", "Blender", "Photoshop"],
  },
  {
    id: "growth",
    icon: <TrendingUp size={22} strokeWidth={1.5} />,
    tag: "Growth",
    title: "Social Media Marketing & Management",
    desc: "Strategy, content, and execution — growing your brand on Instagram, LinkedIn, and Facebook with content that actually converts.",
    services: [
      "Social media strategy & content plan",
      "Monthly content calendar",
      "Caption writing & hashtag research",
      "Graphic design for posts & stories",
      "Page management (posting, engagement)",
      "Analytics reporting",
    ],
    stack: ["Meta Business Suite", "Canva Pro", "Buffer", "Notion", "Google Analytics"],
  },
];

const process = [
  {
    icon: <MessageSquare size={18} strokeWidth={1.5} />,
    step: "01",
    title: "Discovery call",
    desc: "We learn about your project, goals, and timeline. Free, no commitment.",
  },
  {
    icon: <FileText size={18} strokeWidth={1.5} />,
    step: "02",
    title: "Proposal & scope",
    desc: "You get a clear written scope, timeline, and milestone-based pricing. No surprises.",
  },
  {
    icon: <Hammer size={18} strokeWidth={1.5} />,
    step: "03",
    title: "Build & check-ins",
    desc: "We build in stages with regular updates. You review before every major milestone.",
  },
  {
    icon: <PackageCheck size={18} strokeWidth={1.5} />,
    step: "04",
    title: "Delivery & support",
    desc: "Final delivery with documentation. Post-launch support included for 14 days.",
  },
];

const faqs = [
  {
    q: "How much does it cost?",
    a: "Pricing depends on project size and complexity. We provide a detailed quote after the discovery call. Payment is milestone-based — you pay in stages as work is delivered, never everything upfront.",
  },
  {
    q: "How long does a project take?",
    a: "A standard landing page takes 5–7 days. A full web app takes 3–6 weeks. Social media management starts immediately after onboarding. Every project gets a written timeline before we start.",
  },
  {
    q: "Do you work with students and startups?",
    a: "Yes — most of our early clients are student projects, startups, and small businesses. We offer competitive rates and are flexible with scope.",
  },
  {
    q: "How many revisions do I get?",
    a: "Every project includes 2 rounds of revisions per milestone. Additional revisions are billed separately and agreed on before starting.",
  },
  {
    q: "Can I hire for one service only?",
    a: "Absolutely. You can hire us for just video editing, just Figma design, or just social media management — no need to bundle.",
  },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <main style={{ backgroundColor: "#040C18" }} className="min-h-screen pt-24 pb-20 antialiased">

      {/* ── Hero ── */}
      <section className="mx-auto max-w-4xl px-6 py-14 text-center">
        <span
          style={{ border: "1px solid rgba(126,200,216,0.2)", color: "#7EC8D8", backgroundColor: "rgba(8,32,56,0.6)" }}
          className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-widest"
        >
          What we deliver
        </span>
        <h1 style={{ color: "#E8F4F8" }} className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl">
          Development, design, media
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #7EC8D8 0%, #188080 60%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            & growth — by a dedicated team.
          </span>
        </h1>
        <p style={{ color: "rgba(126,200,216,0.5)" }} className="mx-auto max-w-2xl text-base leading-relaxed">
          Our team — trained through Connexode&apos;s own internship program —
          delivers real client work across four service areas. Small team,
          focused work, zero fluff.
        </p>
      </section>

      {/* ── Service clusters ── */}
      <section className="mx-auto max-w-6xl px-6 pb-24 space-y-6">
        {clusters.map((c) => (
          <div
            key={c.id}
            id={c.id}
            style={{ backgroundColor: "#082038", border: "1px solid rgba(126,200,216,0.1)" }}
            className="rounded-2xl p-8 transition-all hover:border-[rgba(126,200,216,0.25)]"
          >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

              {/* Left — info */}
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <span
                    style={{ backgroundColor: "rgba(24,128,128,0.15)", border: "1px solid rgba(24,128,128,0.3)", color: "#7EC8D8" }}
                    className="flex h-11 w-11 items-center justify-center rounded-xl"
                  >
                    {c.icon}
                  </span>
                  <span
                    style={{ border: "1px solid rgba(126,200,216,0.15)", color: "rgba(126,200,216,0.45)", backgroundColor: "rgba(8,32,56,0.5)" }}
                    className="rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest"
                  >
                    {c.tag}
                  </span>
                </div>
                <h2 style={{ color: "#E8F4F8" }} className="mb-3 text-xl font-bold">{c.title}</h2>
                <p style={{ color: "rgba(126,200,216,0.5)" }} className="mb-6 text-sm leading-relaxed">{c.desc}</p>

                {/* Stack badges */}
                <div className="flex flex-wrap gap-2">
                  {c.stack.map((s) => (
                    <span
                      key={s}
                      style={{ border: "1px solid rgba(126,200,216,0.12)", color: "rgba(126,200,216,0.4)", backgroundColor: "rgba(4,12,24,0.6)" }}
                      className="rounded-full px-3 py-1 text-[11px] font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right — service list + CTA */}
              <div className="flex flex-col justify-between">
                <ul className="mb-6 space-y-2.5">
                  {c.services.map((s) => (
                    <li key={s} className="flex items-start gap-2.5">
                      <CheckCircle size={14} style={{ color: "#188080", marginTop: 2, flexShrink: 0 }} strokeWidth={2} />
                      <span style={{ color: "rgba(126,200,216,0.65)" }} className="text-sm leading-snug">{s}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  style={{ backgroundColor: "rgba(24,128,128,0.15)", border: "1px solid rgba(24,128,128,0.3)", color: "#7EC8D8" }}
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all hover:bg-[rgba(24,128,128,0.25)] self-start"
                >
                  Get a quote
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── Process ── */}
      <section
        style={{ borderTop: "1px solid rgba(126,200,216,0.06)", borderBottom: "1px solid rgba(126,200,216,0.06)", backgroundColor: "#061020" }}
        className="py-20"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 text-center">
            <p style={{ color: "#7EC8D8" }} className="mb-3 text-xs font-medium uppercase tracking-widest">How we work</p>
            <h2 style={{ color: "#E8F4F8" }} className="text-2xl font-bold sm:text-3xl">
              From first message to final delivery
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p) => (
              <div
                key={p.step}
                style={{ backgroundColor: "#082038", border: "1px solid rgba(126,200,216,0.1)" }}
                className="rounded-xl p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span
                    style={{ backgroundColor: "rgba(24,128,128,0.15)", color: "#7EC8D8" }}
                    className="flex h-9 w-9 items-center justify-center rounded-lg"
                  >
                    {p.icon}
                  </span>
                  <span style={{ color: "rgba(126,200,216,0.25)" }} className="text-2xl font-bold">{p.step}</span>
                </div>
                <p style={{ color: "#E8F4F8" }} className="mb-2 text-sm font-semibold">{p.title}</p>
                <p style={{ color: "rgba(126,200,216,0.45)" }} className="text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <div className="mb-12 text-center">
          <p style={{ color: "#7EC8D8" }} className="mb-3 text-xs font-medium uppercase tracking-widest">Before you reach out</p>
          <h2 style={{ color: "#E8F4F8" }} className="text-2xl font-bold">Common questions</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((f) => (
            <div
              key={f.q}
              style={{ backgroundColor: "#082038", border: "1px solid rgba(126,200,216,0.1)" }}
              className="rounded-xl px-6 py-5"
            >
              <p style={{ color: "#E8F4F8" }} className="mb-2 text-sm font-semibold">{f.q}</p>
              <p style={{ color: "rgba(126,200,216,0.5)" }} className="text-sm leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto max-w-3xl px-6 pb-10 text-center">
        <div
          style={{ backgroundColor: "#082038", border: "1px solid rgba(126,200,216,0.12)" }}
          className="rounded-2xl px-8 py-12"
        >
          <div
            style={{ background: "linear-gradient(90deg, transparent, #188080, transparent)" }}
            className="mx-auto mb-8 h-px w-20"
          />
          <h2 style={{ color: "#E8F4F8" }} className="mb-3 text-2xl font-bold">
            Ready to start a project?
          </h2>
          <p style={{ color: "rgba(126,200,216,0.45)" }} className="mb-8 text-sm leading-relaxed">
            Tell us what you&apos;re building. Discovery call is free —
            no commitment, no pressure.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              style={{ backgroundColor: "#188080", color: "#E8F4F8" }}
              className="flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-all hover:brightness-110 active:scale-95"
            >
              Get in touch
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/join"
              style={{ border: "1px solid rgba(126,200,216,0.2)", color: "rgba(126,200,216,0.6)" }}
              className="rounded-full px-7 py-3 text-sm font-medium transition-all hover:text-[#7EC8D8]"
            >
              Join our team instead
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
