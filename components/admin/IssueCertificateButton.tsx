// components/admin/IssueCertificateButton.tsx
// Client component — calls /api/admin/certificates/issue

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Award, Loader2 } from "lucide-react";

type Props = {
  userId: string;
  applicationType: "AMBASSADOR" | "INTERNSHIP";
  track?: string;
};

export function IssueCertificateButton({ userId, applicationType, track }: Props) {
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);
  const router = useRouter();

  async function issue() {
    if (!confirm("Issue certificate to this user? This cannot be undone.")) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/certificates/issue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, type: applicationType, track }),
      });
      if (res.ok) { setDone(true); router.refresh(); }
      else { alert("Failed to issue certificate. Check console."); }
    } catch { alert("Network error."); }
    finally { setLoading(false); }
  }

  if (done) return (
    <span style={{ color: "#34D399" }} className="text-xs font-semibold">✓ Issued</span>
  );

  return (
    <button
      onClick={issue}
      disabled={loading}
      style={{
        backgroundColor: loading ? "rgba(24,128,128,0.4)" : "rgba(24,128,128,0.15)",
        border: "1px solid rgba(24,128,128,0.35)",
        color: "#7EC8D8",
      }}
      className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all hover:bg-[rgba(24,128,128,0.25)] disabled:cursor-not-allowed"
    >
      {loading ? <Loader2 size={12} className="animate-spin" /> : <Award size={12} />}
      Issue certificate
    </button>
  );
}
