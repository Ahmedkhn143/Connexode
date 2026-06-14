"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Star,
  Gift,
  Users,
  Award,
  ShieldCheck,
  Compass,
  CheckCircle2,
  Calendar,
  BookOpen,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

interface BenefitItem {
  title: string;
  desc: string;
  icon: any;
}

const BENEFIT_LIST: BenefitItem[] = [
  {
    title: "Financial Stipend",
    desc: "Earn a monthly base stipend alongside milestone bonuses for every active peer onboarding.",
    icon: Gift
  },
  {
    title: "Verified Credentials",
    desc: "Get an official verified Ambassador certificate and reference letters from our advisory board.",
    icon: Award
  },
  {
    title: "100% Free Course Access",
    desc: "Get total scholarship access to all future premium software engineering and AI tracks.",
    icon: BookOpen
  },
  {
    title: "Founder & Mentor Network",
    desc: "Gain priority access to private founder roundtables, resume reviews, and career counseling.",
    icon: Users
  }
];

export default function AmbassadorBenefitsSection() {
  const [activeTab, setActiveTab] = useState<"vision" | "onboarding" | "roles" | "benefits">("vision");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="ambassador-perks" className="relative px-6 py-28 bg-[#020B18] overflow-hidden border-t border-white/5">
      {/* Background radial ambiance */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-[400px] w-[400px] bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Heading */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-yellow-500/25 bg-yellow-500/10 px-3.5 py-1.5 text-xs font-bold text-yellow-400 uppercase tracking-wider">
            <Star size={12} className="fill-yellow-400 animate-pulse" /> Ambassador Framework
          </div>
          <h2 className="font-display text-3xl font-black text-white sm:text-4xl md:text-5xl">
            Campus <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">Ambassador Program</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our student leadership framework: the mission, the onboarding process, duties, and benefits.
          </p>
        </div>

        {/* Interactive Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto mb-12 p-1.5 rounded-2xl border border-white/5 bg-[#020B18]/60 backdrop-blur-xl">
          {[
            { id: "vision", label: "1. Goal & Mission", icon: Compass },
            { id: "onboarding", label: "2. How to Join", icon: Calendar },
            { id: "roles", label: "3. How You Help", icon: Users },
            { id: "benefits", label: "4. Benefits & Perks", icon: Award }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 min-w-[150px] flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  isActive
                    ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.06)]"
                    : "bg-white/4 border-transparent text-slate-400 hover:text-white hover:bg-white/6"
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Content Display Panel */}
        <div className="max-w-4xl mx-auto rounded-3xl border border-white/8 bg-[#080f1e]/40 backdrop-blur-md p-8 lg:p-10 min-h-[340px] flex flex-col justify-between relative overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === "vision" && (
              <motion.div
                key="vision"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-yellow-400 uppercase">Core Goal</span>
                  <h3 className="font-display text-xl font-bold text-white">Bridging Academia & Professional Industry</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Connexode Campus Ambassador program ka asal maqsad CS/IT ke students ke liye **theoretical syllabus** aur **industry demands** ke darmiyan gap ko khatam karna hai. 
                  Hum aese passionate student leaders ko empower karte hain jo apne campuses par **developer ecosystem** ko boost kar sakein.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                  <div className="space-y-1">
                    <span className="text-2xs font-bold text-white flex items-center gap-1.5">
                      <CheckCircle2 size={12} className="text-yellow-400" /> Community Leadership
                    </span>
                    <p className="text-[11px] text-slate-500">Student developer networks ko direct manage aur support karne ki training.</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-2xs font-bold text-white flex items-center gap-1.5">
                      <CheckCircle2 size={12} className="text-yellow-400" /> Career Readiness
                    </span>
                    <p className="text-[11px] text-slate-500">Real projects deploy kar ke communication aur event management skills gain karna.</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "onboarding" && (
              <motion.div
                key="onboarding"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-yellow-400 uppercase">Onboarding Roadmap</span>
                  <h3 className="font-display text-xl font-bold text-white">How to Join (Step-by-Step)</h3>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-4">
                  {[
                    { step: "01", title: "Submit Form", desc: "Apne university details aur linkdin profile apply karein." },
                    { step: "02", title: "Interview", desc: "Choti online assessment aur discussion verification." },
                    { step: "03", title: "Training", desc: "Platform features, event structure aur metrics ka introduction." },
                    { step: "04", title: "Launch", desc: "Officially onboard ho kar events start karein." }
                  ].map((s) => (
                    <div key={s.step} className="p-4 rounded-xl border border-white/5 bg-[#030914]/40 space-y-2">
                      <span className="text-xs font-mono font-bold text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded">{s.step}</span>
                      <h4 className="text-2xs font-bold text-white pt-1">{s.title}</h4>
                      <p className="text-[10px] text-slate-500 leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "roles" && (
              <motion.div
                key="roles"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-yellow-400 uppercase">Responsibilities</span>
                  <h3 className="font-display text-xl font-bold text-white">How You Can Help Your Campus</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Ambassadors apne campus me as a point-of-contact act karte hain aur students ko developer program ke bare me guide karte hain.
                </p>

                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { title: "Onboard Classmates", desc: "Students ko free tech tracks aur regular coding challenges join karwane me help karna." },
                    { title: "Host Workshops", desc: "Online webinars ya physical workshops manage karna with official mentorship support." },
                    { title: "Share Community Buzz", desc: "LinkedIn, WhatsApp aur circles me updates ko distribute kar ke network grow karna." }
                  ].map((role) => (
                    <div key={role.title} className="p-4 rounded-xl border border-white/5 bg-[#030914]/50">
                      <h4 className="text-2xs font-bold text-white mb-1.5 flex items-center gap-1.5">
                        <CheckCircle2 size={12} className="text-emerald-400" /> {role.title}
                      </h4>
                      <p className="text-[10px] text-slate-500 leading-relaxed">{role.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "benefits" && (
              <motion.div
                key="benefits"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-yellow-400 uppercase">Incentives</span>
                  <h3 className="font-display text-xl font-bold text-white">Exclusive Benefits & Rewards</h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {BENEFIT_LIST.map((b) => {
                    const BIcon = b.icon;
                    return (
                      <div key={b.title} className="flex gap-3 items-start p-4 rounded-xl border border-white/5 bg-[#030914]/40">
                        <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-400 shrink-0">
                          <BIcon size={14} />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">{b.title}</h4>
                          <p className="text-[10px] text-slate-500 leading-relaxed mt-0.5">{b.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Links */}
          <div className="pt-6 border-t border-white/5 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-2xs text-slate-500 font-bold uppercase tracking-wider">
              Eligibility: <span className="text-white">Active College/Uni Student</span>
            </div>
            <Link
              href="/ambassador"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-3 text-xs font-bold text-[#020B18] shadow-[0_0_20px_rgba(234,179,8,0.25)] hover:shadow-[0_0_35px_rgba(234,179,8,0.4)] transition-all hover:scale-[1.02] cursor-pointer"
            >
              Apply to Represent Your Campus <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

