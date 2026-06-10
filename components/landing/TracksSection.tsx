"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Code2, Brain, Workflow, Cloud, Shield, BarChart3, ArrowRight, Clock, Users, Layout, Server
} from "lucide-react";
import { TRACKS } from "@/lib/mock-data";

import type { LucideProps } from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  Code2, Brain, Workflow, Cloud, Shield, BarChart3, Layout, Server,
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function TracksSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(!!localStorage.getItem("connexode_active_user"));
    }
  }, []);

  return (
    <section ref={ref} id="tracks" className="relative px-6 py-28">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-cyan-500/4 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Choose Your Path
          </p>
          <h2 className="font-display mb-4 text-4xl font-extrabold text-white lg:text-5xl">
            {TRACKS.length} Industry-Ready{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Tech Tracks
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Each track is a structured 6–8 week program with daily tasks, real project submissions, and a verified certificate upon completion.
          </p>
        </motion.div>

        {/* Track Cards Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {TRACKS.map((track) => {
            const Icon = ICON_MAP[track.icon] ?? Code2;
            return (
              <motion.div key={track.id} variants={item}>
                <Link href={isLoggedIn ? `/checkout/${track.id}` : "/register?tab=signup"} className="group block h-full">
                  <div
                    className="relative h-full overflow-hidden rounded-2xl border border-white/8 bg-white/4 p-7 backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-2 group-hover:border-opacity-40"
                    style={
                      {
                        "--track-color": track.color,
                      } as React.CSSProperties
                    }
                  >
                    {/* Hover glow background */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(circle at 30% 30%, ${track.color}12 0%, transparent 70%)`,
                      }}
                    />
                    {/* Corner glow */}
                    <div
                      className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
                      style={{ backgroundColor: track.color }}
                    />

                    {/* Icon */}
                    <div
                      className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${track.color}18`, border: `1px solid ${track.color}30` }}
                    >
                      <Icon size={24} color={track.color} />
                    </div>

                    {/* Title & Description */}
                    <h3 className="relative mb-2 font-display text-lg font-bold text-white">
                      {track.title}
                    </h3>
                    <p className="relative mb-5 text-sm leading-relaxed text-slate-400">
                      {track.description}
                    </p>

                    {/* Tags */}
                    <div className="relative mb-5 flex flex-wrap gap-2">
                      {track.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg border border-white/8 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <Clock size={11} />
                          {track.durationWeeks} weeks
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users size={11} />
                          Active cohort
                        </span>
                      </div>
                      <div
                        className="flex items-center gap-1 text-xs font-semibold transition-transform duration-300 group-hover:translate-x-1"
                        style={{ color: track.color }}
                      >
                        Enroll <ArrowRight size={12} />
                      </div>
                    </div>

                    {/* Bottom border glow */}
                    <div
                      className="absolute bottom-0 left-6 right-6 h-px rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{ backgroundColor: track.color }}
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
