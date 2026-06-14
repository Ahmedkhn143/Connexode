"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, Loader2, Sparkles } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState("AI Automation & Agents");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !message) return;

    setStatus("submitting");

    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Construct the business inquiry message
    const inquiryText = `[BUSINESS INQUIRY - ${service}]\nCompany: ${company || "Not Provided"}\nEmail: ${email}\n\nMessage:\n${message}`;

    const newInquiry = {
      id: `msg_client_${Date.now()}`,
      studentId: `client_${email.replace(/[^a-zA-Z0-9]/g, "_")}`,
      studentName: `${fullName} (Client - ${company || "SaaS Builder"})`,
      sender: "STUDENT",
      text: inquiryText,
      timestamp: new Date().toISOString()
    };

    // Save to global chats in localStorage
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("connexode_global_chats");
      const current = stored ? JSON.parse(stored) : [];
      const updated = [...current, newInquiry];
      localStorage.setItem("connexode_global_chats", JSON.stringify(updated));
    }

    setStatus("success");
  };

  const handleReset = () => {
    setFullName("");
    setEmail("");
    setCompany("");
    setService("AI Automation & Agents");
    setMessage("");
    setStatus("idle");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#030914] shadow-2xl p-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Sparkles className="text-cyan-400 animate-pulse" size={18} />
                <div>
                  <h3 className="font-display text-lg font-bold text-white">Let's Talk Business</h3>
                  <p className="text-[10px] text-slate-500">Get a free technology & automation consultation</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-xl bg-white/5 p-2 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="mx-auto h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 size={24} />
                </div>
                <h4 className="font-display text-md font-bold text-white">Inquiry Submitted Successfully!</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Thank you! Your business proposal has been routed directly to our management team's inbox. We will analyze your scope and reply shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-6 py-2.5 text-xs font-bold text-[#020B18]"
                  >
                    Done & Close
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Alex Johnson"
                      className="w-full rounded-xl border border-white/8 bg-[#020B18] px-4 py-3 text-slate-200 outline-none focus:border-cyan-400/40"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Business Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. alex@company.com"
                      className="w-full rounded-xl border border-white/8 bg-[#020B18] px-4 py-3 text-slate-200 outline-none focus:border-cyan-400/40"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Company Name</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Acme Labs"
                      className="w-full rounded-xl border border-white/8 bg-[#020B18] px-4 py-3 text-slate-200 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Required Service *</label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full rounded-xl border border-white/8 bg-[#020B18] px-4 py-3 text-slate-200 outline-none focus:border-cyan-400/40 appearance-none"
                    >
                      <option>AI Automation & Agents</option>
                      <option>Custom Full-Stack Dev</option>
                      <option>Enterprise Solutions</option>
                      <option>Dev Sourcing & Talent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Project Details / Scope *</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your project, software requirements, or automation scope..."
                    className="w-full rounded-xl border border-white/8 bg-[#020B18] px-4 py-3 text-slate-200 outline-none focus:border-cyan-400/40 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 py-3.5 text-xs font-bold text-[#020B18] hover:scale-[1.01] transition-transform cursor-pointer disabled:opacity-75 disabled:scale-100"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 size={14} className="animate-spin" /> Submitting Request...
                    </>
                  ) : (
                    <>
                      <Send size={14} /> Send Proposal to Management
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
