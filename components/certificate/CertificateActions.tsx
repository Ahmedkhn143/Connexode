"use client";

import { Download, Share2 } from "lucide-react";

export default function CertificateActions() {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      alert("Verification link copied to clipboard!");
    }
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={handlePrint}
        className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/4 px-4.5 py-2.5 text-xs font-bold hover:bg-white/8 hover:border-cyan-400/30 transition-all cursor-pointer"
      >
        <Download size={14} className="text-cyan-400" />
        Print / PDF
      </button>
      <button
        onClick={handleShare}
        className="flex items-center gap-2 rounded-xl bg-cyan-400 px-4.5 py-2.5 text-xs font-bold text-[#020B18] hover:scale-[1.02] transition-all cursor-pointer"
      >
        <Share2 size={14} />
        Copy Share Link
      </button>
    </div>
  );
}
