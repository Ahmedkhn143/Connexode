"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, GitBranch, Award, Briefcase } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: Briefcase,
    title: "Choose Your Track",
    description:
      "Pick from 6 industry-aligned tech tracks. Each is curated with mentors who currently work at top companies.",
    color: "#00F5FF",
  },
  {
    number: "02",
    icon: CheckCircle2,
    title: "Complete Daily Tasks",
    description:
      "Follow a structured day-by-day plan. Read task instructions, build the project, and learn by doing — no videos.",
    color: "#A855F7",
  },
  {
    number: "03",
    icon: GitBranch,
    title: "Submit on GitHub",
    description:
      "Push your work to GitHub and paste the repo + live demo links into the submission portal for mentor review.",
    color: "#00BFA5",
  },
  {
    number: "04",
    icon: Award,
    title: "Get Certified",
    description:
      "Earn skill badges as you go, unlock your Verified Certificate on completion, and share it directly on LinkedIn.",
    color: "#F59E0B",
  },
];

export default function HowItWorksSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="how-it-works" className="relative px-6 py-28">
      {/* Faint separator line */}
      <div className="absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-teal-400">
            How It Works
          </p>
          <h2 className="font-display text-4xl font-extrabold text-white lg:text-5xl">
            From Zero to{" "}
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Hired in 4 Steps
            </span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line — desktop only */}
          <div className="absolute top-16 left-[calc(12.5%-1px)] right-[calc(12.5%-1px)] hidden h-px lg:block">
            <div className="h-full w-full bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-yellow-500/30" />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
              className="absolute inset-0 origin-left bg-gradient-to-r from-cyan-400/60 via-purple-400/60 to-yellow-400/60"
            />
          </div>

          <div className="grid gap-8 lg:grid-cols-4">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.2 + i * 0.12 }}
                  className="flex flex-col items-center text-center lg:items-center"
                >
                  {/* Icon Circle */}
                  <div className="relative mb-6 z-10">
                    <div
                      className="flex h-16 w-16 items-center justify-center rounded-full border-2 bg-[#020B18]"
                      style={{
                        borderColor: step.color,
                        boxShadow: `0 0 24px ${step.color}40`,
                      }}
                    >
                      <Icon size={24} style={{ color: step.color }} />
                    </div>
                    {/* Number badge */}
                    <span
                      className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-[#020B18]"
                      style={{ backgroundColor: step.color }}
                    >
                      {i + 1}
                    </span>
                  </div>

                  <h3 className="font-display mb-3 text-lg font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-400">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
