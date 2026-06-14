"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Database, BrainCircuit, Cloud, Layers, Sparkles } from "lucide-react";

interface TechItem {
  name: string;
  type: string;
  iconUrl?: string; // If we want to display logo images later
}

const TECH_CATEGORIES = [
  { id: "frontend", label: "Frontend Dev", icon: Code2 },
  { id: "backend", label: "Backend & DBs", icon: Database },
  { id: "ai", label: "AI & Data Science", icon: BrainCircuit },
  { id: "cloud", label: "Cloud & DevOps", icon: Cloud },
];

const TECH_ITEMS: Record<string, TechItem[]> = {
  frontend: [
    { name: "Next.js", type: "Framework" },
    { name: "React.js", type: "Library" },
    { name: "TypeScript", type: "Language" },
    { name: "Tailwind CSS", type: "Styling" },
    { name: "Framer Motion", type: "Animations" },
    { name: "Redux Toolkit", type: "State Management" },
    { name: "HTML5 / CSS3", type: "Core Web" },
    { name: "Vite.js", type: "Build Tool" },
  ],
  backend: [
    { name: "Node.js", type: "Runtime" },
    { name: "Python", type: "Language" },
    { name: "PostgreSQL", type: "Relational DB" },
    { name: "Prisma ORM", type: "Database Layer" },
    { name: "Redis", type: "Caching & Queues" },
    { name: "NestJS", type: "Framework" },
    { name: "Express.js", type: "Routing" },
    { name: "GraphQL", type: "API Protocol" },
  ],
  ai: [
    { name: "LangChain", type: "LLM Framework" },
    { name: "OpenAI GPT-4o", type: "Foundation Model" },
    { name: "LlamaIndex", type: "Data Indexing" },
    { name: "Pinecone", type: "Vector Database" },
    { name: "Hugging Face", type: "Model Hub" },
    { name: "Python / PyTorch", type: "ML Ecosystem" },
    { name: "Flowise AI", type: "No-Code Agent Flow" },
    { name: "CrewAI", type: "Multi-Agent Systems" },
  ],
  cloud: [
    { name: "AWS (S3/EC2/RDS)", type: "Cloud Provider" },
    { name: "Docker", type: "Containerization" },
    { name: "Vercel", type: "Hosting & Serverless" },
    { name: "GitHub Actions", type: "CI/CD Pipelines" },
    { name: "Kubernetes", type: "Orchestration" },
    { name: "Google Cloud", type: "Cloud Provider" },
    { name: "Terraform", type: "Infrastructure as Code" },
    { name: "Cloudflare", type: "CDN & Edge Security" },
  ],
};

export default function TechStackSection() {
  const [activeTab, setActiveTab] = useState<string>("frontend");

  return (
    <section id="tech-stack" className="relative px-6 py-28 overflow-hidden bg-[#020B18] border-t border-white/5">
      {/* Glow backgrounds */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 left-1/4 h-80 w-80 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 h-80 w-80 rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3.5 py-1.5 text-xs font-bold text-cyan-400 uppercase tracking-wider">
            <Layers size={12} /> Tech Ecosystem
          </div>
          <h2 className="font-display text-3xl font-black text-white sm:text-4xl md:text-5xl">
            Our Technology <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Outlining Capabilities</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
            We use a modern, scalable tech stack to deliver secure, high-performance web products and robust AI pipelines.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto mb-12 p-2 rounded-2xl border border-white/5 bg-[#020B18]/60 backdrop-blur-xl">
          {TECH_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                className={`flex-1 min-w-[140px] flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-xs font-bold transition-all border ${
                  isActive
                    ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(0,245,255,0.1)]"
                    : "bg-white/4 border-transparent text-slate-400 hover:text-white hover:bg-white/6"
                }`}
              >
                <Icon size={14} />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Technology Cards Grid */}
        <motion.div
          layout
          className="grid gap-4 grid-cols-2 md:grid-cols-4 max-w-5xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {TECH_ITEMS[activeTab].map((item, i) => (
              <motion.div
                key={item.name}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="group relative rounded-xl border border-white/8 bg-[#080f1e]/40 p-5 backdrop-blur-md hover:border-cyan-400/20 transition-all duration-300"
              >
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {item.name}
                </h4>
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-1">
                  {item.type}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
