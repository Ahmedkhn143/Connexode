"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Globe, 
  Flame, 
  Trophy, 
  Sparkles, 
  FileText, 
  Download, 
  ExternalLink,
  Cpu,
  Layers,
  Database,
  Terminal,
  Loader2,
  CheckCircle2,
  X
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";

// Custom inline GitHub icon component to avoid version mismatch in lucide-react
const GithubIcon = ({ size = 14, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// Mock Data for Ali Raza
const STUDENT_DATA = {
  name: "Ali Raza",
  avatarInitials: "AR",
  rank: "Top 1% Developer",
  streak: 18,
  points: 4250,
  bio: "Full Stack Web Engineering Intern at Connexode. Passionate about building modular React components, scaling REST APIs, and automating pipelines with robust tooling.",
  githubUrl: "https://github.com/aliraza-dev",
  linkedinUrl: "https://linkedin.com/in/aliraza",
  badges: [
    { name: "Next.js Master", desc: "Built 5+ complex app router pages", icon: Cpu, color: "text-cyan-400 bg-cyan-400/10 border-cyan-400/25" },
    { name: "API Ninja", desc: "Designed secure REST endpoints with Zod", icon: Terminal, color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/25" },
    { name: "UI Craftsman", desc: "Designed premium responsive layouts", icon: Layers, color: "text-purple-400 bg-purple-400/10 border-purple-400/25" },
    { name: "Database Guru", desc: "Constructed relational models in Prisma", icon: Database, color: "text-amber-400 bg-amber-400/10 border-amber-400/25" },
  ],
  projects: [
    {
      title: "Connexode AI Task Code Auditor",
      desc: "Built a Next.js App Router API endpoint that fetches GitHub PR code contents and audits it against instructions using Gemini-2.5-flash models.",
      github: "https://github.com/aliraza-dev/connexode-ai-auditor",
      live: "https://connexode-ai-auditor.vercel.app",
    },
    {
      title: "Glassmorphism Student Workspace",
      desc: "Constructed an interactive dashboard using Framer Motion animations, custom CSS grid components, and a local storage sync engine.",
      github: "https://github.com/aliraza-dev/glassmorphic-workspace",
      live: "https://glassmorphic-workspace.vercel.app",
    },
    {
      title: "Secure Payment Verification Flow",
      desc: "Developed a transaction audit form with strict CNIC and local mobile number format check validations linked to SadaPay/EasyPaisa receipts.",
      github: "https://github.com/aliraza-dev/secure-verification-flow",
      live: "https://secure-verification-flow.vercel.app",
    }
  ]
};

export default function AliRazaProfilePage() {
  const [modalState, setModalState] = useState<"idle" | "generating" | "completed">("idle");
  const [progressMsg, setProgressMsg] = useState("");

  const handleExportResume = () => {
    setModalState("generating");
    
    const steps = [
      "Extracting profile metadata...",
      "Analyzing skill badges progress...",
      "Parsing completed internship projects...",
      "Building ATS-friendly PDF layout...",
      "Optimizing typography headers...",
      "Finalizing PDF compilation..."
    ];

    let stepIndex = 0;
    setProgressMsg(steps[0]);

    const interval = setInterval(() => {
      stepIndex++;
      if (stepIndex < steps.length) {
        setProgressMsg(steps[stepIndex]);
      } else {
        clearInterval(interval);
        setModalState("completed");
      }
    }, 700);
  };

  return (
    <main className="relative min-h-screen bg-[#020B18] text-slate-100 pb-20 pt-28 overflow-hidden select-none">
      {/* Decorative Radial glow background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <Navbar />

      <div className="relative mx-auto max-w-5xl px-6">
        
        {/* Back Link */}
        <Link
          href="/dashboard"
          className="mb-8 inline-flex items-center gap-2 text-xs text-slate-500 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft size={13} />
          Back to Dashboard
        </Link>

        {/* Profile Grid Container */}
        <div className="grid gap-6 lg:grid-cols-3 items-start">
          
          {/* Left Column (Sticky Card / Bio / Exporter) */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Student Hero Info */}
            <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl flex flex-col items-center text-center shadow-xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl" />
              
              {/* Avatar Initial circle */}
              <div className="relative mb-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 p-[2px] shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-[#030c1c] text-xl font-black text-white">
                    {STUDENT_DATA.avatarInitials}
                  </div>
                </div>
                {/* Active Indicator Badge */}
                <span className="absolute bottom-0 right-0 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-emerald-500 border-2 border-[#020B18]">
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                </span>
              </div>

              {/* Name & Title */}
              <h2 className="text-xl font-bold text-white">{STUDENT_DATA.name}</h2>
              <p className="text-[10px] uppercase tracking-wider text-cyan-400 font-black mt-1">
                {STUDENT_DATA.rank}
              </p>

              {/* Stats badges */}
              <div className="flex items-center gap-4 mt-5 border-t border-b border-white/5 py-4 w-full justify-around text-xs select-none">
                <div className="text-center space-y-1">
                  <span className="text-slate-500 block text-[9px] uppercase font-bold">Points</span>
                  <span className="text-white font-black">{STUDENT_DATA.points.toLocaleString()}</span>
                </div>
                <div className="border-l border-white/5 h-8" />
                <div className="text-center space-y-1">
                  <span className="text-slate-500 block text-[9px] uppercase font-bold">Active Streak</span>
                  <span className="text-yellow-400 font-black flex items-center gap-1 justify-center">
                    <Flame size={12} className="fill-yellow-400 text-yellow-400 animate-bounce" />
                    {STUDENT_DATA.streak} days
                  </span>
                </div>
              </div>

              {/* Short Bio */}
              <p className="text-2xs text-slate-400 mt-4 leading-relaxed">
                {STUDENT_DATA.bio}
              </p>

              {/* Resume Exporter Action */}
              <button
                onClick={handleExportResume}
                className="w-full mt-6 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-purple-500 py-3.5 text-xs font-bold text-[#020B18] shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all cursor-pointer"
              >
                <Download size={14} />
                AI Resume Exporter (PDF)
              </button>
            </div>
          </div>

          {/* Right Column (Badges & Projects Portfolio) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Skill Badges section */}
            <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl shadow-xl space-y-5">
              <div className="flex items-center gap-2">
                <Trophy className="text-yellow-500" size={16} />
                <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
                  Earned Skill Badges
                </h3>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {STUDENT_DATA.badges.map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <div
                      key={badge.name}
                      className={`rounded-xl border p-4 flex items-start gap-3.5 transition-all hover:-translate-y-0.5 ${badge.color}`}
                    >
                      <div className="mt-0.5 rounded-lg bg-white/5 p-2">
                        <Icon size={16} />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-white">{badge.name}</h4>
                        <p className="text-[10px] text-slate-400 leading-normal">{badge.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Projects Portfolio showcase */}
            <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl shadow-xl space-y-5">
              <div className="flex items-center gap-2">
                <FileText className="text-cyan-400" size={16} />
                <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
                  Internship Tasks Portfolio
                </h3>
              </div>

              <div className="space-y-4">
                {STUDENT_DATA.projects.map((proj) => (
                  <div
                    key={proj.title}
                    className="rounded-xl border border-white/5 bg-white/1 p-4.5 space-y-3.5 hover:border-white/10 transition-colors"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white">{proj.title}</h4>
                      <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                        {proj.desc}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-2xs font-semibold pt-1">
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-slate-500 hover:text-cyan-400 transition-colors"
                      >
                        <GithubIcon size={12} />
                        GitHub Repository
                        <ExternalLink size={8} />
                      </a>
                      <a
                        href={proj.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-slate-500 hover:text-purple-400 transition-colors"
                      >
                        <Globe size={12} />
                        Live Deployment
                        <ExternalLink size={8} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Simulated Resume Modal overlay */}
      {modalState !== "idle" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md px-4">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#030c1c]/95 p-8 shadow-2xl text-center space-y-6 animate-fade-in relative">
            
            {/* Close button inside modal (only visible when done) */}
            {modalState === "completed" && (
              <button
                onClick={() => setModalState("idle")}
                className="absolute top-4 right-4 text-slate-500 hover:text-white"
              >
                <X size={16} />
              </button>
            )}

            {modalState === "generating" ? (
              <>
                <div className="flex justify-center">
                  <div className="relative flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full border-4 border-cyan-400/10 border-t-cyan-400 animate-spin" />
                    <Loader2 size={24} className="text-cyan-400 absolute animate-spin animate-duration-1500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-white text-md">AI Resume Exporter</h3>
                  <p className="text-xs text-slate-400 font-mono animate-pulse">
                    {progressMsg}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/25">
                    <CheckCircle2 size={32} className="text-emerald-500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-white text-md">ATS Resume Compiled!</h3>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                    Ali Raza's verified portfolio, skill badges, and grade stats have been compiled into an ATS-optimized PDF resume.
                  </p>
                </div>
                <button
                  onClick={() => setModalState("idle")}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3.5 text-xs font-bold text-[#020B18] shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:scale-[1.01] transition-all cursor-pointer"
                >
                  Download PDF Copy
                </button>
              </>
            )}

          </div>
        </div>
      )}

    </main>
  );
}
