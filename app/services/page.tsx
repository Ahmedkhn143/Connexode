"use client";

import Navbar from "@/components/layout/Navbar";
import { BrainCircuit, Code2, Layers, Users2, Sparkles } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      icon: BrainCircuit,
      title: "AI Automation & Agents",
      desc: "Implement autonomous AI agents, LLM integrations (GPT, Gemini), customized semantic search engines, and intelligent customer support bots that streamline workflows and cut operational costs.",
      tech: ["OpenAI & Anthropic APIs", "LangChain / LlamaIndex", "VectorDBs (Pinecone, pgvector)", "Automated AI Workflows"],
      color: "from-cyan-500 to-blue-500",
      glow: "bg-cyan-500/10"
    },
    {
      icon: Code2,
      title: "Custom Full-Stack Dev",
      desc: "End-to-end custom software engineering. We build high-performance web systems, custom SaaS applications, headless commerce portals, and interactive dashboards customized to your user experience needs.",
      tech: ["Next.js / React / TypeScript", "Node.js / Express / Python", "PostgreSQL / Prisma / Redis", "RESTful & GraphQL APIs"],
      color: "from-purple-500 to-pink-500",
      glow: "bg-purple-500/10"
    },
    {
      icon: Layers,
      title: "Enterprise Solutions",
      desc: "Scalable cloud infrastructures, database design, legacy software modernization, and custom ERP integration. Architected for robust security, zero downtime, and high throughput.",
      tech: ["AWS / GCP / Vercel Cloud", "Docker & Kubernetes", "CI/CD Deployment Pipelines", "Microservices Architecture"],
      color: "from-emerald-500 to-teal-400",
      glow: "bg-emerald-500/10"
    },
    {
      icon: Users2,
      title: "Dev & Talent Ecosystem",
      desc: "We don't just write code; we cultivate talent. Through our Campus Ambassador Program, we host community events and reference top-tier junior developers vetted via real-world task submissions.",
      tech: ["Campus Student Hackathons", "Virtual Internship Tasks", "Verified Project Audits", "Elite Tech Placement Pool"],
      color: "from-yellow-500 to-amber-500",
      glow: "bg-yellow-500/10"
    }
  ];

  return (
    <main className="relative min-h-screen bg-[#020B18] text-slate-200 overflow-hidden pb-20">
      <Navbar />

      {/* Decorative Background Glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 right-0 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 pt-32">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3.5 py-1.5 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-6">
            <Sparkles size={12} className="animate-spin-slow" /> What We Provide
          </div>
          <h1 className="font-display text-4xl font-extrabold text-white tracking-tight sm:text-5xl lg:text-6xl mb-6">
            Our Agency{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Tech Solutions
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed">
            We build next-generation software products, deploy custom AI automations, and source top-tier developer talent to propel your business forward.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-2 mb-16">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.title}
                className="group relative rounded-2xl border border-white/8 bg-[#080f1e]/45 p-6 sm:p-8 backdrop-blur-xl hover:border-cyan-400/20 hover:bg-[#0c162b]/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-tr ${svc.color} p-[1px] shadow-lg`}>
                      <div className="h-full w-full rounded-[11px] bg-[#020B18] flex items-center justify-center text-white">
                        <Icon size={20} className="group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-600 font-bold uppercase tracking-widest group-hover:text-cyan-400 transition-colors">
                      Service // 0{i + 1}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-white mb-3 group-hover:text-cyan-400/90 transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {svc.desc}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4">
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 block mb-2">Technologies & Scope</span>
                  <div className="flex flex-wrap gap-1.5">
                    {svc.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg bg-white/4 border border-white/8 px-2.5 py-1 text-[10px] text-slate-300 font-medium font-sans hover:bg-white/8 transition-all"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="rounded-2xl border border-white/8 bg-gradient-to-r from-[#030c1c] to-[#0A1628] p-8 text-center space-y-4 max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
          <h4 className="font-display text-lg font-bold text-white">Ready to scale your product or engineering team?</h4>
          <p className="text-sm text-slate-400 leading-relaxed max-w-xl mx-auto">
            Get in touch with our solutions architects to discuss custom builds, AI integrations, or talent sourcing.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-6 py-2.5 text-xs font-bold text-[#020B18] shadow-md hover:scale-[1.03] transition-all"
            >
              Get Free Consultation
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
