"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MapPin, Star, BadgeCheck, Users, GitBranch, TrendingUp, BookOpen, Shield,
} from "lucide-react";
import { PLATFORM_STATS } from "@/lib/mock-data";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Users, GitBranch, BookOpen, TrendingUp,
};

const AMBASSADORS = [
  { name: "Sana Malik", university: "NUST, Islamabad", initials: "SM", color: "#00F5FF" },
  { name: "Rohit Kumar", university: "IIT Delhi", initials: "RK", color: "#A855F7" },
  { name: "Amara Diallo", university: "Uni. of Lagos", initials: "AD", color: "#00BFA5" },
  { name: "Pita Havili", university: "AUT, Auckland", initials: "PH", color: "#F59E0B" },
];

const INDUSTRY_BADGES = [
  { label: "GitHub Verified", icon: GitBranch, color: "#6366F1" },
  { label: "Industry Mentors", icon: BadgeCheck, color: "#00BFA5" },
  { label: "Vercel Certified", icon: Shield, color: "#00F5FF" },
  { label: "Top Rated 2026", icon: Star, color: "#F59E0B" },
];

export default function TrustSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="trust" className="relative px-6 py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-teal-500/5 blur-3xl" />
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-24 grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {PLATFORM_STATS.map((stat, i) => {
            const Icon = ICON_MAP[stat.icon] ?? Users;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex flex-col items-center rounded-2xl border border-white/8 bg-white/4 px-6 py-7 text-center backdrop-blur-xl"
              >
                <Icon size={20} className="mb-3 text-cyan-400" />
                <p className="font-display text-3xl font-extrabold text-white lg:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Two columns */}
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Campus Ambassador */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="relative overflow-hidden rounded-3xl border border-cyan-400/15 bg-gradient-to-br from-cyan-500/8 to-teal-500/5 p-8 backdrop-blur-xl"
          >
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="relative">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-400">
                <MapPin size={11} />
                Campus Ambassador Program
              </div>
              <h3 className="font-display mb-3 text-2xl font-bold text-white lg:text-3xl">
                Represent Connexode at Your University
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-slate-400">
                Become a Campus Ambassador, host workshops, onboard peers, and earn exclusive perks — including a stipend, LinkedIn verification, and priority mentorship access.
              </p>

              {/* Ambassador Avatars */}
              <div className="mb-6 space-y-3">
                {AMBASSADORS.map((a, i) => (
                  <motion.div
                    key={a.name}
                    initial={{ opacity: 0, x: -16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-[#020B18] shrink-0"
                      style={{ backgroundColor: a.color }}
                    >
                      {a.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-200">{a.name}</p>
                      <p className="flex items-center gap-1 text-xs text-slate-500">
                        <MapPin size={9} /> {a.university}
                      </p>
                    </div>
                    <BadgeCheck size={16} className="ml-auto text-cyan-400" />
                  </motion.div>
                ))}
              </div>

              <button className="group flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-5 py-2.5 text-sm font-semibold text-cyan-400 transition-all hover:bg-cyan-400/20">
                Apply to Become an Ambassador
              </button>
            </div>
          </motion.div>

          {/* Verified by Industry */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="relative overflow-hidden rounded-3xl border border-purple-400/15 bg-gradient-to-br from-purple-500/8 to-pink-500/5 p-8 backdrop-blur-xl"
          >
            <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-purple-400/10 blur-3xl" />
            <div className="relative">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-400/10 px-3 py-1.5 text-xs font-semibold text-purple-400">
                <BadgeCheck size={11} />
                Verified by Industry
              </div>
              <h3 className="font-display mb-3 text-2xl font-bold text-white lg:text-3xl">
                Certificates That Actually Mean Something
              </h3>
              <p className="mb-8 text-sm leading-relaxed text-slate-400">
                Every task is reviewed by active industry professionals. Our certificates are linked to your public proof-of-work profile, not just a PDF — recruiters can verify your skills in real time.
              </p>

              {/* Industry Badges Grid */}
              <div className="grid grid-cols-2 gap-3">
                {INDUSTRY_BADGES.map((badge, i) => {
                  const Icon = badge.icon;
                  return (
                    <motion.div
                      key={badge.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.6 + i * 0.1, duration: 0.35 }}
                      className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/5 px-4 py-3"
                    >
                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${badge.color}18`, border: `1px solid ${badge.color}30` }}
                      >
                        <Icon size={14} style={{ color: badge.color }} />
                      </div>
                      <span className="text-xs font-semibold text-slate-300">{badge.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
