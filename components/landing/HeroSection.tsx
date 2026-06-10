"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Terminal } from "lucide-react";

const TYPEWRITER_WORDS = [
  "Full Stack Web Dev",
  "AI Engineering",
  "n8n Automation",
  "DevOps & Cloud",
  "Data Analytics",
  "Cybersecurity",
];

const TERMINAL_LINES = [
  { prefix: "$", text: " connexode enroll --track full-stack", color: "text-slate-400" },
  { prefix: "✓", text: " Enrolled in Full Stack Web Dev", color: "text-emerald-400" },
  { prefix: "→", text: " Week 1, Day 1: Build a Next.js Navbar", color: "text-cyan-400" },
  { prefix: "$", text: " connexode submit --github <url>", color: "text-slate-400" },
  { prefix: "✓", text: " Task submitted for review", color: "text-emerald-400" },
  { prefix: "🏆", text: " Badge Unlocked: First Commit!", color: "text-yellow-400" },
];

function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), speed);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), speed / 2);
    } else {
      timeout = setTimeout(() => {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return words[wordIndex].slice(0, charIndex);
}

export default function HeroSection() {
  const displayedTrack = useTypewriter(TYPEWRITER_WORDS);
  const [terminalLines, setTerminalLines] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (terminalLines >= TERMINAL_LINES.length) return;
    const t = setTimeout(() => setTerminalLines((n) => n + 1), 800 + terminalLines * 300);
    return () => clearTimeout(t);
  }, [terminalLines]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(!!localStorage.getItem("connexode_active_user"));
    }
  }, []);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24 pb-20">
      {/* Animated mesh background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-cyan-500/8 blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/3 right-1/4 h-80 w-80 rounded-full bg-teal-500/8 blur-3xl animate-pulse-slow [animation-delay:2s]" />
        <div className="absolute bottom-1/4 left-1/2 h-64 w-64 rounded-full bg-blue-600/8 blur-3xl animate-pulse-slow [animation-delay:4s]" />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,245,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,245,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-20 lg:flex-row">
        {/* Left — Text */}
        <div className="flex-1 text-center lg:text-left">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/8 px-4 py-2 text-sm font-medium text-cyan-400"
          >
            <Sparkles size={14} />
            The #1 Virtual Internship Platform — 2026
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-6 font-display text-5xl font-extrabold leading-[1.08] tracking-tight text-white lg:text-6xl xl:text-7xl"
          >
            Build Real Skills.{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Get Real Experience.
            </span>{" "}
            Land Your Job.
          </motion.h1>

          {/* Sub-headline with typewriter */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mb-10 max-w-xl text-lg text-slate-400 lg:text-xl"
          >
            Master{" "}
            <span className="font-semibold text-cyan-400">
              {displayedTrack}
              <span className="animate-blink border-r-2 border-cyan-400">&nbsp;</span>
            </span>{" "}
            through structured daily tasks, real project submissions, and industry-verified certificates.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center gap-4 sm:flex-row lg:items-start"
          >
            <Link
              href={isLoggedIn ? "#tracks" : "/register?tab=signup"}
              className="group flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 px-8 py-4 text-base font-bold text-[#020B18] shadow-[0_0_30px_rgba(0,245,255,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(0,245,255,0.55)]"
            >
              {isLoggedIn ? "Explore Tracks" : "Start Your Internship"}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#tracks"
              className="flex items-center gap-2.5 rounded-2xl border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-slate-200 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/10"
            >
              View Tracks
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 flex items-center gap-6 text-sm text-slate-500"
          >
            <div className="flex -space-x-2">
              {["AJ", "SM", "RK", "PP", "LM"].map((initials, i) => (
                <div
                  key={i}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#020B18] bg-gradient-to-br from-cyan-500 to-teal-600 text-xs font-bold text-[#020B18]"
                >
                  {initials}
                </div>
              ))}
            </div>
            <span>
              <span className="font-semibold text-slate-300">12,400+</span> students enrolled
            </span>
          </motion.div>
        </div>

        {/* Right — Terminal */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-lg flex-shrink-0"
        >
          <div className="relative rounded-2xl border border-white/10 bg-[#0A1628]/90 p-0 shadow-[0_0_60px_rgba(0,245,255,0.1)] backdrop-blur-xl overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center gap-2 border-b border-white/8 bg-white/4 px-5 py-3.5">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <div className="ml-3 flex items-center gap-2 text-xs text-slate-500">
                <Terminal size={12} />
                connexode — bash
              </div>
            </div>
            {/* Terminal body */}
            <div className="min-h-[220px] p-5 font-mono text-sm">
              {TERMINAL_LINES.slice(0, terminalLines).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-2 ${line.color}`}
                >
                  <span className="text-cyan-600">{line.prefix}</span>
                  {line.text}
                </motion.div>
              ))}
              {terminalLines < TERMINAL_LINES.length && (
                <span className="animate-blink border-r-2 border-cyan-400 text-cyan-400">&nbsp;</span>
              )}
            </div>
          </div>
          {/* Glow under terminal */}
          <div className="mx-auto mt-4 h-1 w-3/4 rounded-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent blur-sm" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-slate-600 tracking-widest uppercase">Scroll</span>
        <div className="h-8 w-5 rounded-full border border-white/15 flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-cyan-400"
          />
        </div>
      </motion.div>
    </section>
  );
}
