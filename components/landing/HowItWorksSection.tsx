"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  CheckCircle2,
  GitBranch,
  Award,
  Briefcase,
  Layers,
  ChevronRight,
  Code2,
  Check,
  Terminal,
  Cpu,
  FileText
} from "lucide-react";

interface StepItem {
  id: number;
  icon: any;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  accentBg: string;
}

const STEPS: StepItem[] = [
  {
    id: 1,
    icon: Briefcase,
    title: "Choose Your Track",
    subtitle: "Select your path",
    description: "Pick from 8 industry-aligned tech tracks, curated by mentors currently working at top tier companies.",
    color: "#00F5FF",
    accentBg: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
  },
  {
    id: 2,
    icon: FileText,
    title: "Complete Daily Tasks",
    subtitle: "Learn by doing",
    description: "Follow a structured day-by-day roadmap. Read task instructions, write the actual code, and learn through practice.",
    color: "#A855F7",
    accentBg: "bg-purple-500/10 border-purple-500/20 text-purple-400"
  },
  {
    id: 3,
    icon: GitBranch,
    title: "Submit on GitHub",
    subtitle: "Review by mentors",
    description: "Push your work to GitHub and paste your repository link. Mentors review your commits and code structures.",
    color: "#00BFA5",
    accentBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
  },
  {
    id: 4,
    icon: Award,
    title: "Get Certified",
    subtitle: "Unlock credentials",
    description: "Earn specialized skill badges as you complete milestones, and unlock your secure, shareable profile page.",
    color: "#F59E0B",
    accentBg: "bg-amber-500/10 border-amber-500/20 text-amber-500"
  }
];

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Step 1 Interactive State
  const [selectedTrack, setSelectedTrack] = useState<string>("ai");
  // Step 2 Interactive State
  const [tasks, setTasks] = useState([
    { id: 1, text: "Read project specifications", completed: true },
    { id: 2, text: "Design database schemas", completed: false },
    { id: 3, text: "Implement API endpoints", completed: false },
    { id: 4, text: "Write integration tests", completed: false }
  ]);
  // Step 3 Interactive State
  const [gitStatus, setGitStatus] = useState<"idle" | "pushing" | "submitted">("idle");
  // Step 4 Interactive State
  const [badgeShine, setBadgeShine] = useState(false);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleGitSubmit = () => {
    setGitStatus("pushing");
    setTimeout(() => {
      setGitStatus("submitted");
    }, 2000);
  };

  const activeProgress = (activeStep / STEPS.length) * 100;

  return (
    <section ref={ref} id="how-it-works" className="relative px-6 py-28 bg-[#020B18] border-t border-white/5 overflow-hidden">
      {/* Background Ambiances */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 right-0 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-teal-500/25 bg-teal-500/10 px-3.5 py-1.5 text-xs font-bold text-teal-400 uppercase tracking-wider">
            <Cpu size={12} className="animate-spin-slow" /> Program Flow
          </div>
          <h2 className="font-display text-3xl font-black text-white sm:text-4xl md:text-5xl">
            From Learning to <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Professional Developer</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
            Follow a modern, task-based developmental path designed to mirror industry environments. Click on steps below to test the process.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          {/* Left: Step selectors and description */}
          <div className="lg:col-span-5 space-y-6">
            {/* Timeline Progress Bar (Mobile Horizontal / Desktop Vertical) */}
            <div className="relative flex flex-col gap-4">
              {STEPS.map((step) => {
                const Icon = step.icon;
                const isActive = activeStep === step.id;
                
                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className={`w-full flex items-start gap-4 p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-[#080f1e]/80 border-cyan-400/20 shadow-[0_4px_20px_rgba(0,245,255,0.05)]"
                        : "bg-[#080f1e]/20 border-transparent hover:bg-[#080f1e]/40 hover:border-white/5"
                    }`}
                  >
                    <div className={`p-3 rounded-xl shrink-0 transition-colors ${
                      isActive ? step.accentBg : "bg-white/5 text-slate-500"
                    }`}>
                      <Icon size={18} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase">
                          Step 0{step.id}
                        </span>
                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                        )}
                      </div>
                      <h3 className={`font-display text-sm font-bold transition-colors ${
                        isActive ? "text-white" : "text-slate-400"
                      }`}>
                        {step.title}
                      </h3>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="text-2xs text-slate-400 leading-relaxed pt-1.5"
                        >
                          {step.description}
                        </motion.p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Live Interactive Sandbox/Preview */}
          <div className="lg:col-span-7 h-[420px] rounded-3xl border border-white/8 bg-[#080f1e]/40 backdrop-blur-md p-6 flex flex-col justify-between relative overflow-hidden">
            {/* Top Bar Decoration */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
              </div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                Interactive Simulator
              </span>
            </div>

            {/* Sandbox Workspace Screen */}
            <div className="flex-1 flex items-center justify-center p-4">
              <AnimatePresence mode="wait">
                {activeStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full max-w-sm space-y-4 text-center"
                  >
                    <p className="text-2xs text-slate-400 font-bold uppercase tracking-wider">Select a Track to Inspect</p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: "ai", name: "AI/ML SaaS", color: "from-cyan-500 to-blue-500" },
                        { id: "frontend", name: "Frontend Engineer", color: "from-purple-500 to-indigo-500" },
                        { id: "backend", name: "Backend Architect", color: "from-emerald-500 to-teal-500" },
                        { id: "mobile", name: "Mobile Developer", color: "from-amber-500 to-red-500" }
                      ].map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setSelectedTrack(t.id)}
                          className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                            selectedTrack === t.id
                              ? "bg-white/5 border-cyan-400/30 text-white shadow-lg"
                              : "bg-[#030914]/40 border-white/5 text-slate-400 hover:text-white"
                          }`}
                        >
                          <span className="text-xs font-bold">{t.name}</span>
                        </button>
                      ))}
                    </div>

                    <div className="p-3 rounded-xl bg-[#030914]/50 border border-white/5 text-left space-y-1">
                      <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-wider">Recommended Skills</span>
                      <p className="text-2xs text-slate-300">
                        {selectedTrack === "ai" && "Python, LangChain, OpenAI API, Vector DBs, Streamlit"}
                        {selectedTrack === "frontend" && "Next.js, TypeScript, Tailwind CSS, Framer Motion, Redux"}
                        {selectedTrack === "backend" && "Node.js, Express, NestJS, PostgreSQL, Prisma ORM, Redis"}
                        {selectedTrack === "mobile" && "React Native, Flutter, Firebase, Expo, iOS/Android SDKs"}
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeStep === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="w-full max-w-sm space-y-3.5"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-2xs text-slate-400 font-bold uppercase tracking-wider">Day 14 Checklist</span>
                      <span className="text-2xs font-mono font-bold text-purple-400">
                        {Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)}% Done
                      </span>
                    </div>

                    {/* Task checklist container */}
                    <div className="space-y-2">
                      {tasks.map((task) => (
                        <button
                          key={task.id}
                          onClick={() => toggleTask(task.id)}
                          className="w-full flex items-center justify-between p-3 rounded-xl border border-white/5 bg-[#030914]/40 text-left transition-colors hover:bg-white/5 cursor-pointer"
                        >
                          <span className={`text-2xs transition-all ${
                            task.completed ? "text-slate-500 line-through" : "text-slate-300 font-medium"
                          }`}>
                            {task.text}
                          </span>
                          <div className={`h-4.5 w-4.5 rounded-md flex items-center justify-center border transition-all ${
                            task.completed ? "bg-purple-500 border-purple-500 text-white" : "border-white/20 text-transparent"
                          }`}>
                            <Check size={12} strokeWidth={3} />
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeStep === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="w-full max-w-sm p-4 rounded-xl border border-white/5 bg-[#030914]/80 font-mono space-y-4"
                  >
                    <div className="flex items-center justify-between text-[10px] text-slate-500 border-b border-white/5 pb-2">
                      <div className="flex items-center gap-1.5">
                        <Terminal size={12} className="text-emerald-400" />
                        <span>git-submission-terminal</span>
                      </div>
                    </div>

                    {gitStatus === "idle" && (
                      <div className="space-y-4">
                        <div className="space-y-1 text-2xs text-slate-300">
                          <p className="text-slate-500">$ git add .</p>
                          <p className="text-slate-500">$ git commit -m "feat: complete day 14 project workflow"</p>
                          <p className="text-emerald-400">$ git push origin main</p>
                        </div>
                        <button
                          onClick={handleGitSubmit}
                          className="w-full py-2.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 text-2xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                        >
                          <GitBranch size={12} /> Click to Push & Submit
                        </button>
                      </div>
                    )}

                    {gitStatus === "pushing" && (
                      <div className="py-6 text-center space-y-3">
                        <div className="inline-block h-5 w-5 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
                        <p className="text-2xs text-slate-300">Pushing commits & running verification tests...</p>
                      </div>
                    )}

                    {gitStatus === "submitted" && (
                      <div className="py-2 text-left space-y-2">
                        <div className="flex items-center gap-2 text-emerald-400">
                          <CheckCircle2 size={14} />
                          <span className="text-xs font-bold">Submission Confirmed!</span>
                        </div>
                        <p className="text-2xs text-slate-400 leading-relaxed">
                          Your code has been uploaded and queued for mentor review. Feedback will be sent directly to your portfolio board within 24 hours.
                        </p>
                        <button
                          onClick={() => setGitStatus("idle")}
                          className="text-2xs text-slate-500 hover:text-slate-300 underline pt-1 cursor-pointer"
                        >
                          Reset Simulation
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeStep === 4 && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, rotateY: -10 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: 10 }}
                    className="w-full max-w-xs text-center space-y-5"
                  >
                    {/* Certificate Badge */}
                    <div className="flex justify-center">
                      <motion.div
                        onMouseEnter={() => setBadgeShine(true)}
                        onMouseLeave={() => setBadgeShine(false)}
                        animate={badgeShine ? { scale: 1.05 } : {}}
                        className="h-28 w-28 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-yellow-600 p-[3px] shadow-[0_0_35px_rgba(245,158,11,0.2)] cursor-pointer transition-shadow duration-300 hover:shadow-[0_0_45px_rgba(245,158,11,0.35)] relative overflow-hidden flex items-center justify-center"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-150%] hover:animate-shimmer" />
                        <div className="h-full w-full rounded-full bg-[#020B18] flex flex-col items-center justify-center">
                          <Award size={40} className="text-amber-400 mb-1" />
                          <span className="text-[9px] font-mono font-black text-slate-400 tracking-widest uppercase">Verified</span>
                        </div>
                      </motion.div>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white">Fullstack Track Graduate</h4>
                      <p className="text-2xs text-slate-400">
                        Unlocked digital credential. Ready to export to LinkedIn and verify on-chain.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Progress Tracker Line */}
            <div className="border-t border-white/5 pt-4 flex items-center justify-between text-3xs text-slate-500">
              <span>ACTIVE PHASE: STEP 0{activeStep}</span>
              <div className="flex items-center gap-1">
                <span>SIMULATION PROGRESS</span>
                <div className="h-1.5 w-12 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-500"
                    style={{ width: `${activeProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

