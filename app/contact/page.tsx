"use client";

import Navbar from "@/components/layout/Navbar";
import { useState } from "react";
import { Send, CheckCircle2, Loader2, Sparkles, Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
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
  };

  return (
    <main className="relative min-h-screen bg-[#020B18] text-slate-200 overflow-hidden pb-20">
      <Navbar />

      {/* Decorative Background Glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-teal-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 pt-32">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/8 px-4 py-2 text-sm font-medium text-cyan-400 mb-6">
            <Sparkles size={14} className="animate-pulse" />
            Connect With Our Team
          </div>
          <h1 className="font-display text-4xl font-extrabold text-white tracking-tight sm:text-5xl lg:text-6xl mb-6">
            Let's Talk{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Business
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed">
            Get in touch to discuss custom web apps, AI integrations, internships, or campus partnerships.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-5 items-start">
          {/* Contact Details */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Info</h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Have questions or want to learn more about our network? Reach out to us through any of these channels.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Email Address</h4>
                  <p className="text-xs text-slate-400">support@connexode.com</p>
                  <p className="text-xs text-slate-500">Inquiries processed in 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Phone Support</h4>
                  <p className="text-xs text-slate-400">+1 (800) 555-0199</p>
                  <p className="text-xs text-slate-500">Mon - Fri, 9am - 6pm EST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Global Headquarters</h4>
                  <p className="text-xs text-slate-400">New York City, NY</p>
                  <p className="text-xs text-slate-500">United States</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 rounded-3xl border border-white/10 bg-[#030914] p-8 shadow-2xl">
            {status === "success" ? (
              <div className="py-12 text-center space-y-4">
                <div className="mx-auto h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 size={24} />
                </div>
                <h4 className="font-display text-lg font-bold text-white">Inquiry Submitted Successfully!</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Thank you! Your business proposal has been routed directly to our management team's inbox. We will analyze your scope and reply shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-6 py-2.5 text-xs font-bold text-[#020B18]"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
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
                      className="w-full rounded-xl border border-white/8 bg-[#020B18] px-4 py-3 text-slate-200 outline-none focus:border-cyan-400/40"
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
          </div>
        </div>
      </div>
    </main>
  );
}
