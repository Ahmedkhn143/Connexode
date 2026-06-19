"use client";

import Navbar from "@/components/layout/Navbar";
import { Users, Award, Shield, Target, Flame } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-[#020B18] text-slate-200 overflow-hidden pb-20">
      <Navbar />

      {/* Decorative Background Glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-teal-500/5 blur-3xl animate-pulse-slow" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 pt-32">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/8 px-4 py-2 text-sm font-medium text-cyan-400 mb-6">
            <Flame size={14} className="animate-pulse" />
            Our Mission & Vision
          </div>
          <h1 className="font-display text-4xl font-extrabold text-white tracking-tight sm:text-5xl lg:text-6xl mb-6">
            Connecting Talent with{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Real Experience
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed">
            Connexode is a premium platform designed to bridge the gap between academic learning and industry demands through virtual internships, mentor guidance, and real-world project builds.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-3 mb-16">
          <div className="rounded-2xl border border-white/5 bg-white/3 p-6 text-center">
            <h3 className="text-4xl font-extrabold text-white mb-2">2,000+</h3>
            <p className="text-sm text-slate-400 font-medium">Developer Network</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/3 p-6 text-center">
            <h3 className="text-4xl font-extrabold text-white mb-2">15+</h3>
            <p className="text-sm text-slate-400 font-medium">Partner Universities</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/3 p-6 text-center">
            <h3 className="text-4xl font-extrabold text-white mb-2">98%</h3>
            <p className="text-sm text-slate-400 font-medium">Completion Rate</p>
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Our Core Values</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              We hold ourselves to high standards of execution, mentorship, and building authentic connections.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/5 bg-[#050f1e]/40 p-6 space-y-4 hover:border-cyan-400/20 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Target size={24} />
              </div>
              <h3 className="text-lg font-bold text-white">Impact Driven</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                We believe in delivering measurable skill growth for student developers and concrete value for our partners.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-[#050f1e]/40 p-6 space-y-4 hover:border-cyan-400/20 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Users size={24} />
              </div>
              <h3 className="text-lg font-bold text-white">Mentor Guided</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Direct engagement with industry mentors accelerates career-readiness and provides guidance through difficult challenges.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-[#050f1e]/40 p-6 space-y-4 hover:border-cyan-400/20 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Shield size={24} />
              </div>
              <h3 className="text-lg font-bold text-white">Verified Excellence</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Every track completion and certificate is verified on-chain and through public repository review.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
