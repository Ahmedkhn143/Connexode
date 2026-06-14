"use client";

import { Activity, ShieldCheck, ShoppingCart, Truck, GraduationCap, Globe } from "lucide-react";

export default function IndustriesSection() {
  const industries = [
    {
      icon: Activity,
      title: "Healthcare",
      compliance: "HIPAA Compliant",
      desc: "Developing secure medical portals, telehealth frameworks, and HL7-compliant data exchange layers with absolute patient data confidentiality."
    },
    {
      icon: ShieldCheck,
      title: "Finance & Banking",
      compliance: "PCI-DSS / SOC2",
      desc: "Architecting custom payment aggregators, transactional ledgers, fraud detection AI engines, and automated KYC pipelines."
    },
    {
      icon: ShoppingCart,
      title: "E-Commerce",
      compliance: "Headless Commerce",
      desc: "Engineering high-traffic catalogs, headless commerce cart synchronization, custom CMS structures, and localized currency checkouts."
    },
    {
      icon: Truck,
      title: "Logistics & Fleet",
      compliance: "IoT Telemetry Ready",
      desc: "Creating dispatch boards, route optimization pathfinders, IoT tracker feeds, and supply chain telemetry dashboards."
    },
    {
      icon: GraduationCap,
      title: "EdTech & LMS",
      compliance: "SCORM / LTI Compliant",
      desc: "Building interactive learning platforms, student portfolio dashboards, quiz generators, and automated code grading engines."
    },
    {
      icon: Globe,
      title: "Custom SaaS",
      compliance: "Multi-Tenant Scalability",
      desc: "Deploying secure multi-tenant B2B architectures, subscription billing portals, and customized analytics logs."
    }
  ];

  return (
    <section id="industries" className="relative px-6 py-28 overflow-hidden bg-[#020B18] border-t border-white/5">
      {/* Glow backgrounds */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-0 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <ShieldCheck size={12} /> Domain Expertise
          </div>
          <h2 className="font-display text-3xl font-black text-white sm:text-4xl md:text-5xl">
            Sectors & Industries <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">We Architect For</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
            We deliver domain-specific compliance, modern security protocols, and robust scaling capability across multiple sectors.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.title}
                className="group relative rounded-2xl border border-white/8 bg-[#080f1e]/40 p-6 backdrop-blur-md hover:border-cyan-400/20 hover:bg-[#0c162b]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="h-9 w-9 rounded-lg bg-white/4 border border-white/8 flex items-center justify-center text-cyan-400 group-hover:text-white group-hover:bg-cyan-500/10 group-hover:border-cyan-500/20 transition-all">
                      <Icon size={16} />
                    </div>
                    <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest bg-white/5 border border-white/5 px-2 py-0.5 rounded">
                      {ind.compliance}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="font-display text-sm font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {ind.title}
                  </h3>
                  <p className="text-2xs text-slate-400 leading-relaxed">
                    {ind.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
