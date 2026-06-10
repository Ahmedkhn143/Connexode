"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, X, PartyPopper } from "lucide-react";

interface Props {
  userId: string;
}

export default function PaymentApprovedBanner({ userId }: Props) {
  const [show, setShow] = useState(false);
  const [trackTitle, setTrackTitle] = useState("");

  useEffect(() => {
    if (typeof window === "undefined" || !userId) return;

    const key = `connexode_payment_approved_notif_${userId}`;
    const notif = localStorage.getItem(key);

    if (notif) {
      try {
        const data = JSON.parse(notif);
        if (!data.dismissed) {
          setTrackTitle(data.trackTitle || "your selected internship");
          setShow(true);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [userId]);

  const handleDismiss = () => {
    setShow(false);
    const key = `connexode_payment_approved_notif_${userId}`;
    const notif = localStorage.getItem(key);
    if (notif) {
      try {
        const data = JSON.parse(notif);
        localStorage.setItem(key, JSON.stringify({ ...data, dismissed: true }));
      } catch (e) {
        console.error(e);
      }
    }
  };

  if (!show) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-emerald-500/8 p-5 flex items-start gap-4 animate-fade-in shadow-[0_0_30px_rgba(16,185,129,0.1)]">
      {/* Glow background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent" />

      {/* Icon */}
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/25">
        <CheckCircle2 size={20} className="text-emerald-400" />
      </div>

      {/* Content */}
      <div className="relative flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-extrabold text-emerald-400">
            🎉 Payment Verified — Welcome to Connexode!
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Your payment for <strong className="text-white">{trackTitle}</strong> has been verified by the admin team. 
          Your internship workspace is now fully unlocked — start your first task below!
        </p>
      </div>

      {/* Dismiss */}
      <button
        onClick={handleDismiss}
        className="relative text-slate-500 hover:text-slate-300 transition-colors"
        aria-label="Dismiss notification"
      >
        <X size={16} />
      </button>
    </div>
  );
}
