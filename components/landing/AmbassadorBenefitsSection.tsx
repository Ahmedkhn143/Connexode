"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Gift, Users, Award, ShieldAlert, Award as BadgeIcon } from "lucide-react";
import Link from "next/link";

export default function AmbassadorBenefitsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const benefits = [
    {
      icon: Gift,
      title: "Stipend & Rewards",
      desc: "Earn performance-based stipends, cash bonuses, and exclusive swag kits (hoodies, bottles, stickers).",
    },
    {
      icon: BadgeIcon,
      title: "LinkedIn Verification",
      desc: "Get an official verified Ambassador certificate and reference letters from our board.",
    },
    {
      icon: Users,
      title: "Elite Network",
      desc: "Join a private community of tech leaders, priority access to industry mentors and founders.",
    },
    {
      icon: Award,
      title: "Free Premium Access",
      desc: "Get 100% scholarship access to all future premium virtual internship tracks and courses.",
    }
  ];

  return (
    <section ref={ref} className="relative px-6 py-28 bg-[#020B18] overflow-hidden border-t border-white/5">
      {/* Glow backgrounds */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 right-0 h-[400px] w-[400px] bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-0 h-[400px] w-[400px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left - Benefits Grid */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1.5 text-xs font-bold text-cyan-400 uppercase tracking-wider">
              <Star size={12} className="fill-cyan-400" /> Perks & Privileges
            </div>
            <h2 className="font-display text-3xl font-black text-white sm:text-4xl">
              Why Join the <br />
              <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">Campus Ambassador Program?</span>
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
              We empower campus leaders to guide their student communities. As an ambassador, you gain direct access to resources that accelerate your tech and management career.
            </p>

            <div className="grid gap-6 sm:grid-cols-2 mt-8">
              {benefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <motion.div
                    key={b.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="p-5 rounded-2xl border border-white/8 bg-white/4 backdrop-blur-xl space-y-2.5"
                  >
                    <div className="h-9 w-9 rounded-lg bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400">
                      <Icon size={16} />
                    </div>
                    <h3 className="font-bold text-white text-sm">{b.title}</h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{b.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right - Program Responsibilities & Action Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-purple-500/15 bg-gradient-to-br from-[#080f1e]/80 to-[#020B18] p-8 lg:p-10 relative overflow-hidden"
          >
            <div className="absolute top-[-50px] right-[-50px] h-40 w-40 rounded-full bg-purple-500/10 blur-[50px]" />
            <div className="space-y-6">
              <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
                <Users size={20} className="text-purple-400" />
                Responsibilities
              </h3>
              <p className="text-xs text-slate-400">As a representative of Connexode, your role will involve:</p>
              
              <ul className="space-y-3.5 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-[10px] font-black text-purple-400">1</span>
                  <span><strong>Onboard Peers:</strong> Educate classmates and encourage participation in tech challenges and platform projects.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-[10px] font-black text-purple-400">2</span>
                  <span><strong>Workshops & Seminars:</strong> Help organize online and physical webinars, coding bootcamps, and networking events.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-[10px] font-black text-purple-400">3</span>
                  <span><strong>Social Media Buzz:</strong> Share community updates, student accomplishments, and events across platforms.</span>
                </li>
              </ul>

              <div className="pt-6 border-t border-white/5 space-y-4">
                <div className="flex justify-between items-baseline text-2xs uppercase tracking-widest text-slate-500 font-bold">
                  <span>Eligibility:</span>
                  <span className="text-white font-extrabold">Active Student Enrollment</span>
                </div>
                
                <Link
                  href="/ambassador"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 py-3.5 text-sm font-bold text-[#020B18] shadow-[0_0_20px_rgba(0,245,255,0.2)] hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] transition-all hover:scale-[1.01]"
                >
                  Apply to Represent Your Campus
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
