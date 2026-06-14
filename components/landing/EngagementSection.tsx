"use client";

import { Handshake, Shield, Target, Users, Zap } from "lucide-react";

export default function EngagementSection() {
  const models = [
    {
      icon: Users,
      title: "Dedicated Teams",
      desc: "Hire a dedicated group of custom-sourced developers, AI engineers, and QA specialists managed directly by our senior delivery leads. Perfect for ongoing product scaling.",
      features: ["Full-time commitment", "Custom-vetted resources", "Agile sprint management", "Weekly progress telemetry"],
      badge: "Best Value"
    },
    {
      icon: Target,
      title: "Project-Based Delivery",
      desc: "Perfect for products with fixed specifications. We define the milestones, pricing, and scope upfront, taking complete accountability for end-to-end design & code delivery.",
      features: ["Fixed cost pricing", "Strict milestone control", "Complete QA & testing", "Post-release support logs"]
    },
    {
      icon: Zap,
      title: "Staff Augmentation",
      desc: "Quickly inject expert individual developers or specialist AI architects directly into your existing in-house team to accelerate velocity and resolve bottlenecks.",
      features: ["Rapid onboarding", "No long-term overheads", "Direct client reporting", "Immediate sprint output"]
    }
  ];

  return (
    <section id="engagement" className="relative px-6 py-28 overflow-hidden bg-[#020B18]">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 right-1/4 h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-yellow-500/25 bg-yellow-500/10 px-3.5 py-1.5 text-xs font-bold text-yellow-500 uppercase tracking-wider">
            <Handshake size={12} /> Flexible Partnership
          </div>
          <h2 className="font-display text-3xl font-black text-white sm:text-4xl md:text-5xl">
            Flexible Business <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 bg-clip-text text-transparent">Engagement Models</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
            Choose how you want to partner with us. We offer fully transparent structures designed for agile, high-growth companies.
          </p>
        </div>

        {/* Models Grid */}
        <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          {models.map((model) => {
            const Icon = model.icon;
            return (
              <div
                key={model.title}
                className="group relative rounded-2xl border border-white/8 bg-[#080f1e]/45 p-8 backdrop-blur-xl hover:border-cyan-400/20 hover:bg-[#0c162b]/50 transition-all duration-300 flex flex-col justify-between"
              >
                {model.badge && (
                  <span className="absolute top-4 right-4 bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                    {model.badge}
                  </span>
                )}

                <div>
                  {/* Icon */}
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-400 p-[1px] mb-6 shadow-md">
                    <div className="h-full w-full rounded-[10px] bg-[#020B18] flex items-center justify-center text-white">
                      <Icon size={16} />
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="font-display text-base font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {model.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {model.desc}
                  </p>
                </div>

                {/* Features List */}
                <ul className="border-t border-white/5 pt-4 space-y-2">
                  {model.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-2xs text-slate-300">
                      <Shield size={10} className="text-cyan-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
