"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Code, Eye, RefreshCw, Sparkles, Play } from "lucide-react";

interface CodeTemplate {
  name: string;
  desc: string;
  html: string;
}

const TEMPLATES: Record<string, CodeTemplate> = {
  hero: {
    name: "SaaS Glassmorphic Hero",
    desc: "A premium hero block featuring smooth gradient text and dynamic action buttons.",
    html: `<div class="p-8 text-center bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-cyan-500/20 rounded-2xl shadow-xl max-w-md mx-auto space-y-4">
  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">
    AI Release 2026
  </span>
  <h3 class="text-xl font-bold text-white tracking-tight">
    Scale Your App <span class="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">Autonomously</span>
  </h3>
  <p class="text-xs text-slate-400 leading-relaxed">
    Supercharge your backend flows with multi-agent orchestration and contextual vector query matching.
  </p>
  <button class="px-6 py-2 text-xs font-bold text-[#020B18] bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-md">
    Initialize Sandbox
  </button>
</div>`
  },
  chat: {
    name: "AI Support Assistant",
    desc: "A floating chatbot interface rendering conversational messages.",
    html: `<div class="w-full max-w-sm mx-auto bg-slate-900/80 border border-purple-500/20 rounded-2xl shadow-xl overflow-hidden flex flex-col">
  <div class="px-4 py-3 bg-purple-500/10 border-b border-purple-500/20 flex items-center justify-between">
    <span class="text-xs font-bold text-white">AI Agent Sandbox</span>
    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
  </div>
  <div class="p-4 space-y-3 min-h-[120px] flex flex-col justify-end text-[11px]">
    <div class="p-2.5 rounded-xl bg-white/5 text-slate-200 self-start mr-6 border border-white/5">
      Hi! I've loaded your vector schema. How can I assist with your deployment today?
    </div>
    <div class="p-2.5 rounded-xl bg-purple-500/20 text-purple-200 self-end ml-6 border border-purple-500/30">
      Initialize standard database connection pool.
    </div>
  </div>
  <div class="p-2 bg-black/40 border-t border-white/5 flex gap-1">
    <input type="text" placeholder="Type a message..." disabled class="flex-1 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-2xs text-slate-400 outline-none" />
    <button class="px-3 py-1 bg-purple-500 text-white font-bold rounded-lg text-2xs">Send</button>
  </div>
</div>`
  },
  pricing: {
    name: "Glassmorphic Pricing Card",
    desc: "A high-conversion price card showing core engineering values.",
    html: `<div class="p-6 bg-slate-950/80 border border-yellow-500/20 rounded-2xl shadow-xl max-w-xs mx-auto text-center relative overflow-hidden">
  <span class="absolute top-0 right-0 bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-[8px] font-black uppercase px-2 py-0.5 rounded-bl-lg">
    POPULAR
  </span>
  <h4 class="text-sm font-bold text-slate-400 uppercase tracking-widest">Growth Plan</h4>
  <p class="text-2xl font-black text-white mt-2">$299<span class="text-xs font-medium text-slate-500">/mo</span></p>
  <ul class="text-[10px] text-slate-400 text-left my-4 space-y-2 border-t border-white/5 pt-4">
    <li class="flex items-center gap-1.5">✓ 5 Dedicated Developers</li>
    <li class="flex items-center gap-1.5">✓ 24/7 Priority AI Audit Logs</li>
    <li class="flex items-center gap-1.5">✓ HIPAA & SOC2 Security</li>
  </ul>
  <button class="w-full py-2 bg-gradient-to-r from-yellow-500 to-amber-500 hover:scale-[1.01] text-xs font-bold text-[#020B18] rounded-xl transition-all">
    Start Scale Model
  </button>
</div>`
  }
};

export default function WebDemoSection() {
  const [activeKey, setActiveKey] = useState<string>("hero");
  const [editedCode, setEditedCode] = useState<string>(TEMPLATES.hero.html);

  const handleSelectTemplate = (key: string) => {
    setActiveKey(key);
    setEditedCode(TEMPLATES[key].html);
  };

  return (
    <section id="live-demo" className="relative px-6 py-28 overflow-hidden bg-[#020B18] border-t border-white/5">
      {/* Glow effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-[350px] w-[350px] rounded-full bg-cyan-500/5 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 h-[350px] w-[350px] rounded-full bg-purple-500/5 blur-3xl animate-pulse-slow [animation-delay:2s]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3.5 py-1.5 text-xs font-bold text-cyan-400 uppercase tracking-wider">
            <Terminal size={12} className="animate-pulse" /> Sandbox Mode
          </div>
          <h2 className="font-display text-3xl font-black text-white sm:text-4xl md:text-5xl">
            Interactive Web Demo: <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Live React Rendering</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
            Test our engineering skills in real time. Select a code template below, modify the copy/elements directly in the viewport code editor, and see the compiler render it.
          </p>
        </div>

        {/* Workspace Layout */}
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] max-w-6xl mx-auto">
          {/* Left Panel: Code Editor */}
          <div className="rounded-2xl border border-white/8 bg-[#040f21]/40 p-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Template selector chips */}
              <div className="flex gap-2 pb-2 border-b border-white/5 overflow-x-auto">
                {Object.keys(TEMPLATES).map((key) => (
                  <button
                    key={key}
                    onClick={() => handleSelectTemplate(key)}
                    className={`px-3 py-1.5 rounded-lg text-2xs font-bold transition-all shrink-0 cursor-pointer ${
                      activeKey === key
                        ? "bg-cyan-500/10 border border-cyan-500/25 text-cyan-400"
                        : "bg-white/4 border border-transparent text-slate-500 hover:text-white"
                    }`}
                  >
                    {TEMPLATES[key].name}
                  </button>
                ))}
              </div>

              {/* Text Description */}
              <p className="text-2xs text-slate-500 italic">
                {TEMPLATES[activeKey].desc}
              </p>

              {/* Code Box container */}
              <div className="rounded-xl border border-white/8 bg-[#020B18] overflow-hidden">
                <div className="px-4 py-2 border-b border-white/5 bg-slate-950/80 flex items-center justify-between text-slate-500 text-[10px] font-mono">
                  <span className="flex items-center gap-1.5">
                    <Code size={11} /> editor.html
                  </span>
                  <span>HTML / Inline CSS</span>
                </div>
                <textarea
                  value={editedCode}
                  onChange={(e) => setEditedCode(e.target.value)}
                  className="w-full min-h-[200px] p-4 font-mono text-2xs text-emerald-400 bg-transparent outline-none resize-none leading-relaxed"
                  spellCheck="false"
                />
              </div>
            </div>

            {/* Instruction tooltip */}
            <div className="rounded-xl bg-white/4 border border-white/5 p-3.5 text-2xs text-slate-500 leading-normal flex items-start gap-2">
              <span className="text-cyan-400 font-bold uppercase shrink-0">Live Tip:</span>
              <span>Aap upar text box code block mein header ya button text modify kar sakte hain, right side wala render module dynamically update ho jayega.</span>
            </div>
          </div>

          {/* Right Panel: Live Viewport */}
          <div className="rounded-2xl border border-white/8 bg-[#040f21]/30 p-5 flex flex-col justify-between min-h-[350px]">
            <div>
              {/* Viewport Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6 text-slate-500 text-[10px] font-mono">
                <span className="flex items-center gap-1.5">
                  <Eye size={11} className="text-cyan-400 animate-pulse" /> Sandbox Live Render Viewport
                </span>
                <span className="flex items-center gap-1.5">
                  <Play size={10} className="text-emerald-400" /> Compiled Successfully
                </span>
              </div>

              {/* Live Render Area */}
              <div className="rounded-xl border border-dashed border-white/8 bg-black/30 p-8 flex items-center justify-center min-h-[240px]">
                <div
                  className="w-full live-preview"
                  dangerouslySetInnerHTML={{ __html: editedCode }}
                />
              </div>
            </div>

            <div className="text-center pt-4">
              <button
                onClick={() => setEditedCode(TEMPLATES[activeKey].html)}
                className="inline-flex items-center gap-1 text-[10px] text-slate-500 hover:text-cyan-400 font-mono transition-colors cursor-pointer"
              >
                <RefreshCw size={10} /> Reset template code to defaults
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
