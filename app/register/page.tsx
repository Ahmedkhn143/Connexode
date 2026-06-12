import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ShieldCheck, Award } from "lucide-react";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create Your Account — Connexode",
  description: "Join the Connexode Developer Network. Apply to our Campus Ambassador program, access exclusive events, and build your leadership profile.",
};

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const params = await searchParams;
  const initialSignUp = params.tab === "signup";
  return (
    <div className="min-h-screen bg-[#020B18] text-slate-100 flex flex-col lg:flex-row relative">
      
      {/* Background glow decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Left side: Premium Brand Highlights */}
      <div className="hidden lg:flex lg:w-[45%] flex-col justify-between p-12 bg-gradient-to-br from-[#041126] to-[#020B18] border-r border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
        
        {/* Brand logo */}
        <Link href="/" className="group flex items-center gap-2.5 relative z-10">
          <img
            src="/logo.png"
            alt="Connexode Logo"
            className="h-9 w-9 rounded-xl object-cover shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-shadow duration-300 group-hover:shadow-[0_0_30px_rgba(0,245,255,0.6)]"
          />
          <span className="font-display text-xl font-bold tracking-tight text-white">
            Connex<span className="text-cyan-400">ode</span>
          </span>
        </Link>

        {/* Feature Highlights */}
        <div className="space-y-8 my-auto relative z-10 max-w-sm">
          <div className="space-y-3">
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-white leading-tight">
              Join the Connexode Tech Network
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              Connect with fellow developers, build leadership skills as a Campus Ambassador, and showcase verified credentials.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            {[
              { icon: Sparkles, text: "AI-Powered Pre-Check code evaluations", color: "text-cyan-400" },
              { icon: ShieldCheck, text: "Industry-verified Smart Certificates", color: "text-teal-400" },
              { icon: Award, text: "Gamified learning path and badge records", color: "text-yellow-400" },
            ].map((f, i) => (
              <div key={i} className="flex gap-3 text-xs font-semibold text-slate-300">
                <f.icon size={16} className={f.color} />
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <p className="text-[10px] text-slate-600 relative z-10">
          © 2026 Connexode Platform. All rights reserved. Secure verification ledger enabled.
        </p>
      </div>

      {/* Right side: Registration Form View */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 lg:p-12 relative z-10 overflow-y-auto">
        
        {/* Mobile Logo */}
        <Link href="/" className="lg:hidden group flex items-center justify-center gap-2.5 mb-8">
          <img
            src="/logo.png"
            alt="Connexode Logo"
            className="h-8 w-8 rounded-xl object-cover shadow-[0_0_20px_rgba(0,245,255,0.4)]"
          />
          <span className="font-display text-lg font-bold tracking-tight text-white">
            Connex<span className="text-cyan-400">ode</span>
          </span>
        </Link>

        <div className="w-full max-w-lg mb-4 text-center lg:text-left">
          <h2 className="font-display text-2xl font-extrabold text-white mb-1.5">
            {initialSignUp ? "Create Your Account" : "Welcome Back"}
          </h2>
          <p className="text-xs text-slate-500">
            {initialSignUp ? (
              <>Already have an account?{" "}
                <Link href="/register" className="text-cyan-400 hover:underline font-bold">Sign In</Link>
              </>
            ) : (
              <>Don&apos;t have an account?{" "}
                <Link href="/register?tab=signup" className="text-cyan-400 hover:underline font-bold">Create one free</Link>
              </>
            )}
          </p>
        </div>

        <RegisterForm initialSignUp={initialSignUp} />
      </div>

    </div>
  );
}
