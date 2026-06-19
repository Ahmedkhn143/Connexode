"use client";

import Navbar from "@/components/layout/Navbar";
import { Briefcase, MapPin, Clock, ArrowRight, Award, Zap } from "lucide-react";
import Link from "next/link";

export default function CareersPage() {
  const jobs = [
    {
      title: "Campus Ambassador",
      dept: "Growth & Community",
      type: "Part-time (Student Role)",
      location: "On-Campus / Remote",
      desc: "Represent Connexode at your university, organize local workshops, refer developer talent, and earn stipends and premium course access.",
      link: "/ambassador"
    },
    {
      title: "Full-Stack Software Engineer (Intern)",
      dept: "Engineering",
      type: "Full-time / Part-time",
      location: "Remote",
      desc: "Work on real-world projects using React, Next.js, Node.js, and Prisma under direct mentorship from senior developers.",
      link: "/register"
    },
    {
      title: "AI & Automation Engineer (Intern)",
      dept: "Engineering / AI Research",
      type: "Full-time",
      location: "Remote",
      desc: "Integrate Large Language Models, build vector index pipelines, and design autonomous agents for custom business apps.",
      link: "/register"
    }
  ];

  return (
    <main className="relative min-h-screen bg-[#020B18] text-slate-200 overflow-hidden pb-20">
      <Navbar />

      {/* Background Glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 left-10 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-teal-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 pt-32">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/25 bg-yellow-500/10 px-4 py-1.5 text-xs font-extrabold text-yellow-400 uppercase tracking-widest mb-6">
            <Zap size={12} className="fill-yellow-400" />
            Build the Future of Tech Education
          </div>
          <h1 className="font-display text-4xl font-extrabold text-white tracking-tight sm:text-5xl lg:text-6xl mb-6">
            Join the{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Connexode Team
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed">
            We are looking for motivated campus leaders, passionate student developers, and builders who want to gain real industry experience.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          <div className="rounded-2xl border border-white/5 bg-[#050f1e]/40 p-6 space-y-3">
            <div className="h-10 w-10 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">
              <Award size={20} />
            </div>
            <h3 className="text-md font-bold text-white">Direct Mentorship</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Work alongside senior developers and architects who guide you step-by-step through industry best practices.
            </p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#050f1e]/40 p-6 space-y-3">
            <div className="h-10 w-10 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">
              <Zap size={20} />
            </div>
            <h3 className="text-md font-bold text-white">Stipends & Incentives</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Earn performance bonuses, ambassador stipends, and certificate awards that validate your achievements.
            </p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#050f1e]/40 p-6 space-y-3 sm:col-span-2 lg:col-span-1">
            <div className="h-10 w-10 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">
              <Briefcase size={20} />
            </div>
            <h3 className="text-md font-bold text-white">Real-world Projects</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Skip dummy tasks. Build actual products, contribute to production codebases, and compile a strong public Git portfolio.
            </p>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6">Open Positions</h2>
          
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.title}
                className="group relative rounded-2xl border border-white/5 bg-[#050f1e]/30 p-6 hover:border-yellow-500/20 transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-extrabold text-yellow-400 uppercase tracking-wider bg-yellow-400/5 border border-yellow-400/20 px-2.5 py-0.5 rounded-full">
                      {job.dept}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                      <Clock size={10} /> {job.type}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                      <MapPin size={10} /> {job.location}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
                    {job.desc}
                  </p>
                </div>

                <Link
                  href={job.link}
                  className="flex items-center gap-1 text-xs font-bold text-[#020B18] bg-gradient-to-r from-yellow-400 to-orange-400 px-5 py-3 rounded-xl hover:scale-105 transition-all shadow-md shrink-0 cursor-pointer"
                >
                  Apply Now <ArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
