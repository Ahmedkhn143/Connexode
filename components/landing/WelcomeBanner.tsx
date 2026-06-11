"use client";

import { useState, useEffect } from "react";
import { X, PartyPopper, ArrowDown } from "lucide-react";

export default function WelcomeBanner() {
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if newly registered (flag set by RegisterForm)
    const flag = sessionStorage.getItem("connexode_just_registered");
    if (!flag) return;

    // Get the user name
    const activeUserId = localStorage.getItem("connexode_active_user");
    if (activeUserId) {
      try {
        const dynamicUsers = JSON.parse(localStorage.getItem("connexode_dynamic_users") || "[]");
        const user = dynamicUsers.find((u: any) => u.id === activeUserId);
        if (user) setUserName(user.name || "");
      } catch (e) {}
    }

    // Show banner after a short delay
    const t = setTimeout(() => setShow(true), 400);
    return () => clearTimeout(t);
  }, []);

  const handleDismiss = () => {
    setShow(false);
    sessionStorage.removeItem("connexode_just_registered");
  };

  const handleScrollToTracks = () => {
    const el = document.getElementById("tracks");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    handleDismiss();
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4 animate-slide-up">
      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-[#030f1f] shadow-[0_0_60px_rgba(16,185,129,0.2)] backdrop-blur-xl p-5 flex items-start gap-4">
        {/* Glow */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald-500/8 via-transparent to-cyan-500/8 rounded-2xl" />

        {/* Icon */}
        <div className="relative shrink-0 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/25">
          <PartyPopper size={20} className="text-emerald-400" />
        </div>

        {/* Content */}
        <div className="relative flex-1 min-w-0">
          <p className="text-sm font-extrabold text-white mb-0.5">
            🎉 Welcome to Connexode{userName ? `, ${userName.split(" ")[0]}` : ""}!
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            Your account is ready. Scroll down to browse internship tracks and apply to one that matches your goals.
          </p>
          <button
            onClick={handleScrollToTracks}
            className="mt-3 flex items-center gap-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/25 px-4 py-2 text-xs font-bold text-emerald-400 hover:bg-emerald-500/25 transition-all"
          >
            <ArrowDown size={12} />
            Browse Internship Tracks
          </button>
        </div>

        {/* Dismiss */}
        <button
          onClick={handleDismiss}
          className="relative shrink-0 text-slate-500 hover:text-slate-300 transition-colors mt-0.5"
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
