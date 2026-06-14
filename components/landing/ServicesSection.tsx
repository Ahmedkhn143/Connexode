"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BrainCircuit, Code2, Cpu, Database, Layers, Sparkles, Terminal, Users2 } from "lucide-react";

export default function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

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
    <section ref={ref} id="services" className="relative px-6 py-28 overflow-hidden bg-[#020B18] border-t border-white/5">
      {/* Decorative Glow Elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 right-0 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 left-0 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl animate-pulse-slow [animation-delay:3s]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3.5 py-1.5 text-xs font-bold text-cyan-400 uppercase tracking-wider"
          >
            <Sparkles size={12} className="animate-spin-slow" /> What We Provide
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl font-black text-white sm:text-4xl md:text-5xl"
          >
            Our Agency <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Tech Solutions & Services</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed"
          >
            We build next-generation software products, deploy custom AI automations, and source top-tier developer talent to propel your business forward.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative rounded-2xl border border-white/8 bg-[#080f1e]/45 p-6 sm:p-8 backdrop-blur-xl hover:border-cyan-400/20 hover:bg-[#0c162b]/50 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Background Card Hover Glow */}
                <div className={`absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none ${svc.glow}`} />

                <div>
                  {/* Top Icon Block */}
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

                  {/* Title & Desc */}
                  <h3 className="font-display text-lg font-bold text-white mb-3 group-hover:text-cyan-400/90 transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {svc.desc}
                  </p>
                </div>

                {/* Tech Badges List */}
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
              </motion.div>
            );
          })}
        </div>

        {/* Agency CTA Pitch */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-16 rounded-2xl border border-white/8 bg-gradient-to-r from-[#030c1c] to-[#0A1628] p-8 text-center space-y-4 max-w-3xl mx-auto shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 h-40 w-40 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
          <h4 className="font-display text-md font-bold text-white">Have a project idea or automation requirement?</h4>
          <p className="text-xs text-slate-400 leading-relaxed max-w-xl mx-auto">
            Our teams of developers and AI automation specialists are ready to architect and build. Reach out to our management team in the chat inbox or send us your scope.
          </p>
          <div className="pt-2">
            <button
              onClick={() => window.dispatchEvent(new Event("open-contact-modal"))}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-6 py-2.5 text-xs font-bold text-[#020B18] shadow-md hover:scale-[1.03] transition-all cursor-pointer"
            >
              Get Free Consultation
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
