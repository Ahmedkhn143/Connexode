"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Award, Briefcase, Code, Eye, Layers, Sparkles, X } from "lucide-react";

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  metric: string;
  desc: string;
  tech: string[];
  details: string;
  color: string;
  glow: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "cs_1",
    title: "AI-Powered Customer Pipeline",
    category: "AI Automation",
    metric: "92% Tickets Autonomous",
    desc: "Built custom autonomous agents integrated with CRM, Slack, and Vector DBs to resolve customer queries instantly with full context.",
    tech: ["OpenAI API", "LangChain", "Node.js", "Pinecone DB"],
    details: "This implementation saved the client over 120 hours of manual support weekly. It uses intelligent routing based on semantic analysis to escalate complex cases to human supervisors while resolving standard tickets autonomously.",
    color: "from-cyan-500 to-blue-500",
    glow: "bg-cyan-500/10"
  },
  {
    id: "cs_2",
    title: "Headless B2B Commerce Platform",
    category: "Full-Stack Dev",
    metric: "180% Load Speed Increase",
    desc: "Architected a lightning-fast headless e-commerce store with secure cart matching, custom product configurations, and rapid checkouts.",
    tech: ["Next.js", "Tailwind CSS", "Prisma", "Stripe API"],
    details: "By decoupling the frontend from the monolithic legacy database, we achieved sub-second page transition speeds and an immediate 22% increase in sales conversion rates. It is fully responsive and localized.",
    color: "from-purple-500 to-pink-500",
    glow: "bg-purple-500/10"
  },
  {
    id: "cs_3",
    title: "Compliance-First Fintech Hub",
    category: "Enterprise Solutions",
    metric: "SOC2 Compliance Ready",
    desc: "Engineered a secure payment ledger and transactional dashboard featuring real-time fraud monitoring and bank-grade data encryption.",
    tech: ["TypeScript", "NestJS", "PostgreSQL", "AWS KMS"],
    details: "Designed with microservices architecture, this hub supports up to 5,000 transactions per second. It includes automated audit logs and secure tokenization to maintain highest standard compliance for global merchants.",
    color: "from-emerald-500 to-teal-400",
    glow: "bg-emerald-500/10"
  },
  {
    id: "cs_4",
    title: "Real-Time Fleet Management",
    category: "Custom Systems",
    metric: "14% Fuel Efficiency Gained",
    desc: "Developed a custom web portal connected to IoT trackers for automated route optimization, driver behavior scoring, and telemetry logs.",
    tech: ["React Native", "Go / Golang", "Redis", "Google Maps API"],
    details: "This tracking dashboard coordinates over 400 active commercial trucks. Using geofencing and real-time pathfinding algorithms, it automatically calculates the fastest routes, lowering delivery times by 18%.",
    color: "from-yellow-500 to-amber-500",
    glow: "bg-yellow-500/10"
  }
];

export default function PortfolioSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<CaseStudy | null>(null);

  // Fallback for hook inView if not imported
  function useInView(ref: any, options: any) {
    const [view, setView] = useState(true);
    return view;
  }

  return (
    <section ref={ref} id="portfolio" className="relative px-6 py-28 overflow-hidden bg-[#020B18]">
      {/* Decorative glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/25 bg-purple-500/10 px-3.5 py-1.5 text-xs font-bold text-purple-400 uppercase tracking-wider">
            <Briefcase size={12} /> Case Studies
          </div>
          <h2 className="font-display text-3xl font-black text-white sm:text-4xl md:text-5xl">
            Products We've <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Designed & Developed</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
            Take a look at how we deploy robust tech structures to solve concrete business challenges.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {CASE_STUDIES.map((project, i) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative rounded-2xl border border-white/8 bg-[#080f1e]/45 p-6 sm:p-8 backdrop-blur-xl hover:border-cyan-400/25 hover:bg-[#0c162b]/50 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              {/* Glow filter */}
              <div className={`absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none ${project.glow}`} />

              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase font-bold text-slate-500 bg-white/5 border border-white/8 px-2.5 py-1 rounded-full">
                    {project.category}
                  </span>
                  <span className="text-[11px] font-black text-cyan-400 flex items-center gap-1 bg-cyan-400/10 px-2.5 py-1 rounded-full">
                    <Award size={12} /> {project.metric}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  {project.title}
                  <ArrowUpRight size={16} className="text-slate-500 group-hover:text-cyan-400 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {project.desc}
                </p>
              </div>

              {/* Tech stack tags */}
              <div className="flex flex-wrap gap-1 border-t border-white/5 pt-4 relative">
                {project.tech.map((t) => (
                  <span key={t} className="rounded bg-white/4 px-2 py-0.5 text-[10px] text-slate-300 font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#030914] shadow-2xl p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
                  <div className="flex items-center gap-2">
                    <Code className="text-cyan-400" size={16} />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Case Study Breakdown</span>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="rounded-xl bg-white/5 p-2 text-slate-400 hover:text-white transition-all"
                  >
                    <X size={16} />
                  </button>
                </div>

                <span className="text-[10px] uppercase font-bold text-slate-500 bg-white/5 border border-white/8 px-2.5 py-1 rounded-full mb-3 inline-block">
                  {selectedProject.category}
                </span>

                <h3 className="font-display text-xl font-bold text-white mb-4">
                  {selectedProject.title}
                </h3>

                <div className="rounded-2xl bg-cyan-400/5 border border-cyan-400/10 p-4 mb-6">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-cyan-400 block mb-1">Key Value Delivered</span>
                  <p className="text-base font-extrabold text-white">{selectedProject.metric}</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 block mb-1">Overview</span>
                    <p className="text-xs text-slate-400 leading-relaxed">{selectedProject.desc}</p>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 block mb-1">Implementation Details</span>
                    <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">{selectedProject.details}</p>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 block mb-2">Technologies Used</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.tech.map((t) => (
                    <span key={t} className="rounded bg-white/5 border border-white/8 px-2.5 py-1 text-[10px] text-slate-300 font-sans">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
