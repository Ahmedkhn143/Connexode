"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Rocket, ShieldCheck, Eye, Star, Heart } from "lucide-react";

export default function CompanyDetailsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const values = [
    {
      icon: Rocket,
      title: "Our Mission",
      desc: "To bridge the gap between academic theory and industry reality, empowering the next generation of developers with practical proof-of-work skills.",
      color: "from-cyan-500 to-teal-400"
    },
    {
      icon: Eye,
      title: "Our Vision",
      desc: "To build a global community of skilled builders who learn by doing, sharing knowledge, and leading tech innovations in their campuses.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: ShieldCheck,
      title: "Core Values",
      desc: "We believe in transparency, meritocracy through code, and fostering a supportive ecosystem where effort directly correlates with growth.",
      color: "from-blue-500 to-indigo-500"
    }
  ];

  return (
    <section ref={ref} className="relative px-6 py-28 overflow-hidden bg-[#020B18]">
      {/* Decorative Glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/4 h-80 w-80 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/25 bg-purple-500/10 px-3 py-1.5 text-xs font-bold text-purple-400 uppercase tracking-wider"
          >
            <Heart size={12} className="fill-purple-400" /> About Connexode
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl font-black text-white sm:text-4xl md:text-5xl"
          >
            Empowering Campuses. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">Fostering Innovation.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed"
          >
            Connexode is a premier virtual platform built to empower students with leadership skills, network growth, and tech education. We believe that true learning begins outside the classroom.
          </motion.p>
        </div>

        {/* Three Columns */}
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="group relative rounded-2xl border border-white/8 bg-[#080f1e]/45 p-8 backdrop-blur-xl hover:border-cyan-400/20 transition-all duration-300"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-25 transition-opacity">
                  <Icon size={64} className="text-white" />
                </div>
                <div className={`h-11 w-11 rounded-xl bg-gradient-to-tr ${v.color} p-[1px] mb-6 shadow-lg`}>
                  <div className="h-full w-full rounded-[11px] bg-[#020B18] flex items-center justify-center text-white">
                    <Icon size={18} />
                  </div>
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-3">{v.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{v.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
