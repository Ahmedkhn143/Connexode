"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

export default function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("done");
  };

  return (
    <section ref={ref} className="relative px-6 py-28">
      {/* Separator */}
      <div className="absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="relative mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-cyan-400/15 bg-gradient-to-br from-[#0A1628] to-[#020B18] p-12 text-center shadow-[0_0_80px_rgba(0,245,255,0.08)]"
        >
          {/* Glow orbs */}
          <div className="pointer-events-none absolute -top-20 left-1/4 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 right-1/4 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl" />

          <div className="relative">
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-400"
            >
              Ready to Build?
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-display mb-4 text-4xl font-extrabold text-white lg:text-5xl"
            >
              Your Tech Career Starts{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Today
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="mx-auto mb-10 max-w-xl text-slate-400"
            >
              Join the next cohort starting soon. Drop your email and we'll send you everything you need to get started — completely free.
            </motion.p>

            {status === "done" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="flex items-center gap-2 rounded-2xl bg-emerald-500/15 px-8 py-4 text-emerald-400">
                  <CheckCircle2 size={20} />
                  <span className="font-semibold">You're on the list! Check your inbox.</span>
                </div>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
                onSubmit={handleSubmit}
                className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all focus:border-cyan-400/40 focus:bg-white/8 focus:ring-2 focus:ring-cyan-400/15"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-7 py-3.5 text-sm font-bold text-[#020B18] shadow-[0_0_20px_rgba(0,245,255,0.3)] transition-all hover:shadow-[0_0_30px_rgba(0,245,255,0.5)] hover:scale-105 disabled:opacity-70 disabled:scale-100"
                >
                  {status === "loading" ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <>
                      Get Early Access <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </motion.form>
            )}

            <p className="mt-4 text-xs text-slate-600">
              No spam. No credit card. Unsubscribe anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
