"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BrainCircuit,
  ShieldCheck,
  ShoppingCart,
  Activity,
  Users,
  Clock,
  ArrowRight,
  CheckCircle2,
  Code2,
  Database,
  Cloud,
  Layers,
  HelpCircle,
  ExternalLink
} from "lucide-react";

interface ProjectProfile {
  id: string;
  title: string;
  icon: any;
  description: string;
  timeline: string;
  team: string[];
  features: string[];
  techStack: {
    category: string;
    items: string[];
    icon: any;
  }[];
  workflow: {
    step: string;
    title: string;
    desc: string;
  }[];
}

const PROJECT_PROFILES: ProjectProfile[] = [
  {
    id: "ai-saas",
    title: "AI SaaS Product",
    icon: BrainCircuit,
    description: "Production-ready Large Language Model pipelines, autonomous multi-agent networks, vector ingestion, and real-time semantic search capabilities.",
    timeline: "4 - 6 Weeks",
    team: [
      "1 AI/ML Solutions Architect",
      "2 Senior Fullstack Engineers",
      "1 MLOps & Data Engineer"
    ],
    features: [
      "RAG (Retrieval-Augmented Generation)",
      "Multi-agent task orchestration",
      "Semantic caching & rate limiting",
      "Real-time streaming responses"
    ],
    techStack: [
      { category: "Frontend", items: ["Next.js 15", "TypeScript", "Framer Motion", "Tailwind CSS"], icon: Code2 },
      { category: "Backend / AI", items: ["Python (FastAPI)", "LangChain", "CrewAI", "NestJS"], icon: BrainCircuit },
      { category: "Databases / Vectors", items: ["Pinecone Vector DB", "PostgreSQL", "Redis"], icon: Database },
      { category: "Infrastructure", items: ["AWS ECS Fargate", "Docker", "GitHub Actions"], icon: Cloud }
    ],
    workflow: [
      { step: "01", title: "Model & RAG Design", desc: "Select models (GPT-4o/Llama), architect vector embeddings and index mapping." },
      { step: "02", title: "Ingestion Pipeline", desc: "Build automated pipelines to clean, chunk, and index source knowledge." },
      { step: "03", title: "Agentic Logic Setup", desc: "Configure autonomous agents, tool bindings, and system prompt validation." },
      { step: "04", title: "Frontend & Streaming", desc: "Implement UI streaming sockets and interactive chat dashboards." },
      { step: "05", title: "Deployment & Guardrails", desc: "Establish cost tracking, content safety guardrails, and cloud scaling." }
    ]
  },
  {
    id: "fintech",
    title: "FinTech Platform",
    icon: ShieldCheck,
    description: "Highly secure transaction engines, automated ledger databases, unified payment aggregators, and strict KYC/AML compliance pipelines.",
    timeline: "8 - 12 Weeks",
    team: [
      "1 Principal Architect (Fintech Compliance)",
      "2 Senior Backend Developers (Rust/Go)",
      "1 Frontend Security Lead",
      "1 QA Audit Engineer"
    ],
    features: [
      "ACID compliance & double-entry ledger",
      "PCI-DSS audit readiness",
      "Automated KYC/AML verification",
      "High-throughput transaction queues"
    ],
    techStack: [
      { category: "Frontend", items: ["React.js", "Redux Toolkit", "TypeScript", "Tailwind CSS"], icon: Code2 },
      { category: "Backend / Logic", items: ["Go (Golang)", "Node.js (NestJS)", "gRPC Protocols"], icon: BrainCircuit },
      { category: "Databases / Cache", items: ["PostgreSQL (ACID)", "Redis (Distributed Locks)"], icon: Database },
      { category: "Security & Cloud", items: ["AWS Secure Zone", "HashiCorp Vault", "Docker"], icon: Cloud }
    ],
    workflow: [
      { step: "01", title: "Security Threat Modeling", desc: "Establish encryption keys, IAM access matrices, and data isolation boundaries." },
      { step: "02", title: "Double-Entry Ledger Design", desc: "Create immutable database schema for transactions and strict state validations." },
      { step: "03", title: "API Gateway & KYC Integration", desc: "Connect automated user screening services and payment processing networks." },
      { step: "04", title: "Audit & Load Testing", desc: "Perform penetration audits, run extreme concurrency transaction testing." },
      { step: "05", title: "Redundant Multi-Zone Launch", desc: "Deploy highly-available clusters with automated disaster recovery triggers." }
    ]
  },
  {
    id: "ecommerce",
    title: "Headless E-Commerce",
    icon: ShoppingCart,
    description: "Ultra-fast headless commerce experiences with global edge caching, localized currency adjustments, and real-time inventory synchronization.",
    timeline: "6 - 8 Weeks",
    team: [
      "1 Headless Integration Lead",
      "2 Frontend Performance Engineers",
      "1 Fullstack Backend Developer"
    ],
    features: [
      "Sub-second page loading (100% Core Web Vitals)",
      "Omnichannel cart sync",
      "Multi-region tax & currency hooks",
      "Incremental Static Regeneration (ISR)"
    ],
    techStack: [
      { category: "Frontend", items: ["Next.js (App Router)", "React.js", "Tailwind CSS"], icon: Code2 },
      { category: "APIs & Orchestration", items: ["GraphQL Federation", "Node.js", "Shopify Storefront API"], icon: BrainCircuit },
      { category: "Content & Database", items: ["Sanity.io / headless CMS", "PostgreSQL"], icon: Database },
      { category: "Edge & Delivery", items: ["Vercel Edge Network", "Cloudflare Workers", "CDN"], icon: Cloud }
    ],
    workflow: [
      { step: "01", title: "Headless Catalog Schema", desc: "Define structural mapping for product variants, pricing tiers, and CMS content." },
      { step: "02", title: "Incremental Build Setup", desc: "Configure caching strategies and serverless page generation properties." },
      { step: "03", title: "Checkout & Sync Integration", desc: "Hook up checkout sessions, tax calculations, and fulfillment webhooks." },
      { step: "04", title: "Web Vitals Optimization", desc: "Minimize bundle payloads, apply image processing, optimize scripts." },
      { step: "05", title: "Global CDN Edge Release", desc: "Publish globally to Vercel/Cloudflare Edge with automated fallback routes." }
    ]
  },
  {
    id: "healthcare",
    title: "Healthcare Portal",
    icon: Activity,
    description: "HIPAA-compliant medical record integration, end-to-end encrypted messaging, interactive appointment calendars, and secure analytics dashboards.",
    timeline: "10 - 14 Weeks",
    team: [
      "1 HIPAA Compliance Officer",
      "2 Senior Fullstack Engineers",
      "1 QA & Automation Tester"
    ],
    features: [
      "HIPAA / HL7 data compliance",
      "End-to-end encrypted video & chat",
      "Patient health record (PHR) access",
      "Zero-Trust role authorization"
    ],
    techStack: [
      { category: "Frontend", items: ["Next.js", "TypeScript", "Tailwind CSS"], icon: Code2 },
      { category: "Backend / API", items: ["Python (FastAPI)", "Django REST", "WebRTC Protocols"], icon: BrainCircuit },
      { category: "Encrypted DB", items: ["PostgreSQL (AES-256)", "Redis (Secure Session)"], icon: Database },
      { category: "Compliance Cloud", items: ["AWS Landing Zone (HIPAA)", "AWS CloudWatch Audit Logs"], icon: Cloud }
    ],
    workflow: [
      { step: "01", title: "BAA & Encryption Audit", desc: "Establish business associate terms and verify field-level database encryption keys." },
      { step: "02", title: "Zero-Trust Authorization", desc: "Implement multi-factor authentication and role-based route access filters." },
      { step: "03", title: "HL7/FHIR Protocol Setup", desc: "Configure electronic health record data connectors and API schemas." },
      { step: "04", title: "Compliance Verification Tests", desc: "Run automated security scans, check for logs containing protected health details." },
      { step: "05", title: "Audited Cloud Deployment", desc: "Launch on verified isolated subnets with persistent security logging active." }
    ]
  }
];

export default function TechStackSection() {
  const [selectedProfile, setSelectedProfile] = useState<string>("ai-saas");
  const [activeWorkflowStep, setActiveWorkflowStep] = useState<number>(0);

  const activeProfile =
    PROJECT_PROFILES.find((p) => p.id === selectedProfile) || PROJECT_PROFILES[0];

  return (
    <section id="tech-stack" className="relative px-6 py-28 overflow-hidden bg-[#020B18] border-t border-white/5">
      {/* Background radial gradients for dynamic ambiance */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-[450px] w-[450px] rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[450px] w-[450px] rounded-full bg-purple-500/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3.5 py-1.5 text-xs font-bold text-cyan-400 uppercase tracking-wider">
            <Layers size={12} className="animate-pulse" /> Architecture Configurator
          </div>
          <h2 className="font-display text-3xl font-black text-white sm:text-4xl md:text-5xl">
            Interactive <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Tech Matcher</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
            Select an industry or project category to view our customized technical architectures, optimal developer team structures, timelines, and step-by-step lifecycles.
          </p>
        </div>

        {/* Project Profile Selectors */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-12">
          {PROJECT_PROFILES.map((profile) => {
            const Icon = profile.icon;
            const isSelected = selectedProfile === profile.id;

            return (
              <button
                key={profile.id}
                type="button"
                onClick={() => {
                  setSelectedProfile(profile.id);
                  setActiveWorkflowStep(0);
                }}
                className={`relative flex flex-col items-center justify-center p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-cyan-500/10 border-cyan-400/30 text-cyan-400 shadow-[0_0_25px_rgba(0,245,255,0.08)]"
                    : "bg-[#080f1e]/40 border-white/5 text-slate-400 hover:text-white hover:bg-[#0c162b]/40 hover:border-white/10"
                }`}
              >
                <div className={`p-2.5 rounded-xl mb-3 transition-colors ${
                  isSelected ? "bg-cyan-400/20 text-cyan-300" : "bg-white/5 text-slate-400"
                }`}>
                  <Icon size={20} />
                </div>
                <span className="text-xs font-bold tracking-wide">{profile.title}</span>
                {isSelected && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-[1px] left-8 right-8 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Detail Card */}
        <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          {/* Left Panel: Profile Description & Deliverables */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-3xl border border-white/8 bg-[#080f1e]/40 backdrop-blur-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProfile.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    {activeProfile.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {activeProfile.description}
                  </p>
                </div>

                {/* Duration & Team Meta */}
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-2xs text-slate-500 uppercase tracking-widest font-bold">
                      <Clock size={12} className="text-cyan-400" /> Timeline
                    </div>
                    <p className="text-sm font-bold text-white">{activeProfile.timeline}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-2xs text-slate-500 uppercase tracking-widest font-bold">
                      <Users size={12} className="text-purple-400" /> Team Setup
                    </div>
                    <p className="text-xs font-semibold text-slate-300">
                      {activeProfile.team.length} Specialists Recommended
                    </p>
                  </div>
                </div>

                {/* Team Details */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                    Recommended Team
                  </span>
                  <ul className="space-y-1.5">
                    {activeProfile.team.map((member, i) => (
                      <li key={i} className="text-2xs text-slate-300 flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                        {member}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Capabilities */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                    Key Deliverables
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeProfile.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 text-2xs text-slate-300">
                        <CheckCircle2 size={12} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Panel: Architecture & Lifecycle */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tech Stack Layers */}
            <div className="p-6 rounded-3xl border border-white/8 bg-[#080f1e]/40 backdrop-blur-md">
              <h4 className="text-2xs font-mono font-bold text-slate-500 uppercase tracking-widest mb-4">
                Recommended Architecture Layers
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                <AnimatePresence mode="wait">
                  {activeProfile.techStack.map((stack, i) => {
                    const LayerIcon = stack.icon;
                    return (
                      <motion.div
                        key={`${activeProfile.id}-${stack.category}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25, delay: i * 0.05 }}
                        className="p-4 rounded-xl border border-white/5 bg-[#030914]/50 flex items-start gap-3.5 hover:border-cyan-400/10 transition-colors"
                      >
                        <div className="p-2 rounded-lg bg-white/5 text-cyan-400 shrink-0">
                          <LayerIcon size={16} />
                        </div>
                        <div>
                          <span className="text-2xs text-slate-500 uppercase tracking-wider font-bold">
                            {stack.category}
                          </span>
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {stack.items.map((tech) => (
                              <span
                                key={tech}
                                className="text-[10px] font-semibold text-white bg-white/5 px-2 py-0.5 rounded border border-white/5"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* Lifecycle / Workflow Progression */}
            <div className="p-6 rounded-3xl border border-white/8 bg-[#080f1e]/40 backdrop-blur-md">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-2xs font-mono font-bold text-slate-500 uppercase tracking-widest">
                  Implementation Lifecycle
                </h4>
                <span className="text-3xs text-slate-400 flex items-center gap-1">
                  Click steps to preview <HelpCircle size={10} />
                </span>
              </div>

              {/* Progress Indicator Dots */}
              <div className="flex items-center gap-2 mb-6 overflow-x-auto py-1 scrollbar-none">
                {activeProfile.workflow.map((w, index) => {
                  const isActive = activeWorkflowStep === index;
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActiveWorkflowStep(index)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all cursor-pointer shrink-0 ${
                        isActive
                          ? "bg-cyan-500/15 border-cyan-400/30 text-cyan-400 font-bold"
                          : "bg-white/4 border-transparent text-slate-400 hover:text-white hover:bg-white/6"
                      }`}
                    >
                      <span className="text-2xs font-mono">{w.step}</span>
                      <span className="text-2xs hidden sm:inline">{w.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Workflow Details Box */}
              <div className="p-4 rounded-xl border border-white/5 bg-[#030914]/40 relative overflow-hidden">
                <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-cyan-400 to-purple-500" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeProfile.id}-${activeWorkflowStep}`}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-1 pl-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-400/10 px-1.5 py-0.5 rounded">
                        Phase {activeProfile.workflow[activeWorkflowStep].step}
                      </span>
                      <span className="text-xs font-bold text-white">
                        {activeProfile.workflow[activeWorkflowStep].title}
                      </span>
                    </div>
                    <p className="text-2xs text-slate-400 leading-relaxed pt-1">
                      {activeProfile.workflow[activeWorkflowStep].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

