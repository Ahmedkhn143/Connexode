// components/admin/ProjectToggleButtons.tsx
// Publish / feature / score controls for admin projects page

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Star, Hash, Loader2 } from "lucide-react";

type Props = {
  projectId: string;
  currentPublished: boolean;
  currentFeatured: boolean;
  currentScore: number;
};

export function ProjectToggleButtons({
  projectId, currentPublished, currentFeatured, currentScore,
}: Props) {
  const router  = useRouter();
  const [published, setPublished] = useState(currentPublished);
  const [featured, setFeatured]   = useState(currentFeatured);
  const [score, setScore]         = useState(currentScore);
  const [loading, setLoading]     = useState<string | null>(null);

  async function update(field: string, value: boolean | number) {
    setLoading(field);
    try {
      await fetch(`/api/admin/projects/${projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });
      router.refresh();
    } catch { /* silent */ }
    finally { setLoading(null); }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">

      {/* Publish toggle */}
      <button
        onClick={() => { const v = !published; setPublished(v); update("published", v); }}
        disabled={loading === "published"}
        style={{
          backgroundColor: published ? "rgba(52,211,153,0.12)" : "rgba(8,32,56,0.6)",
          border: `1px solid ${published ? "rgba(52,211,153,0.3)" : "rgba(126,200,216,0.15)"}`,
          color: published ? "#34D399" : "rgba(126,200,216,0.5)",
        }}
        className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all hover:opacity-80 disabled:cursor-not-allowed"
      >
        {loading === "published" ? <Loader2 size={11} className="animate-spin" /> : <Eye size={11} />}
        {published ? "Published" : "Publish"}
      </button>

      {/* Feature toggle */}
      <button
        onClick={() => { const v = !featured; setFeatured(v); update("featured", v); }}
        disabled={!published || loading === "featured"}
        style={{
          backgroundColor: featured ? "rgba(245,158,11,0.12)" : "rgba(8,32,56,0.6)",
          border: `1px solid ${featured ? "rgba(245,158,11,0.3)" : "rgba(126,200,216,0.15)"}`,
          color: featured ? "#F59E0B" : "rgba(126,200,216,0.4)",
        }}
        className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {loading === "featured" ? <Loader2 size={11} className="animate-spin" /> : <Star size={11} />}
        {featured ? "Featured" : "Feature"}
      </button>

      {/* Score input */}
      <div className="flex items-center gap-1.5">
        <Hash size={11} style={{ color: "rgba(126,200,216,0.35)" }} />
        <input
          type="number"
          min={0} max={100}
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
          onBlur={() => update("score", score)}
          style={{
            backgroundColor: "#040C18",
            border: "1px solid rgba(126,200,216,0.15)",
            color: "#E8F4F8",
            width: 60,
          }}
          className="rounded-lg px-2 py-1 text-xs outline-none focus:border-[rgba(126,200,216,0.4)]"
        />
        <span style={{ color: "rgba(126,200,216,0.3)" }} className="text-xs">/100</span>
      </div>
    </div>
  );
}
