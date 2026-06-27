// app/community/leaderboard/page.tsx
// Leaderboard — Top Ambassadors (by sessions) + Top Interns (by score)
// Public page — no auth required
// Colors: Navy #082038 · Teal #188080 · Cyan #7EC8D8

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Trophy, Medal, Star, Users, BookOpen, TrendingUp } from "lucide-react";

type AmbassadorEntry = {
  rank: number;
  name: string;
  university: string;
  city: string;
  sessionsHosted: number;
  webinars: number;
  communityReach: number;
  badge: "gold" | "silver" | "bronze" | "rising";
};

type InternEntry = {
  rank: number;
  name: string;
  university: string;
  track: string;
  projectScore: number;
  tasksCompleted: number;
  badge: "gold" | "silver" | "bronze" | "rising";
};

// Badge config
const badges = {
  gold:    { label: "Gold",    color: "#F59E0B", bg: "rgba(245,158,11,0.12)",  border: "rgba(245,158,11,0.3)"  },
  silver:  { label: "Silver",  color: "#94A3B8", bg: "rgba(148,163,184,0.12)", border: "rgba(148,163,184,0.3)" },
  bronze:  { label: "Bronze",  color: "#C084FC", bg: "rgba(192,132,252,0.12)", border: "rgba(192,132,252,0.3)" },
  rising:  { label: "Rising",  color: "#7EC8D8", bg: "rgba(126,200,216,0.12)", border: "rgba(126,200,216,0.25)"},
};

const rankColors: Record<number, string> = {
  1: "#F59E0B",
  2: "#94A3B8",
  3: "#C084FC",
};

function RankIcon({ rank }: { rank: number }) {
  if (rank === 1) return <Trophy size={16} style={{ color: "#F59E0B" }} />;
  if (rank === 2) return <Medal size={16} style={{ color: "#94A3B8" }} />;
  if (rank === 3) return <Medal size={16} style={{ color: "#C084FC" }} />;
  return <span style={{ color: "rgba(126,200,216,0.3)", fontWeight: 700 }} className="text-sm">#{rank}</span>;
}

export default function LeaderboardPage() {
  const [tab, setTab] = useState<"ambassadors" | "interns">("ambassadors");
  const [ambassadors, setAmbassadors] = useState<AmbassadorEntry[]>([]);
  const [interns, setInterns] = useState<InternEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/leaderboard");
        const data = await res.json();
        setAmbassadors(data.ambassadors ?? []);
        setInterns(data.interns ?? []);
      } catch {
        // fallback empty
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <main style={{ backgroundColor: "#040C18" }} className="min-h-screen pt-24 pb-20 antialiased">

      {/* ── Hero ── */}
      <section className="mx-auto max-w-4xl px-6 py-14 text-center">
        <span
          style={{ border: "1px solid rgba(126,200,216,0.2)", color: "#7EC8D8", backgroundColor: "rgba(8,32,56,0.6)" }}
          className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-widest"
        >
          Community
        </span>
        <h1 style={{ color: "#E8F4F8" }} className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Leaderboard
        </h1>
        <p style={{ color: "rgba(126,200,216,0.5)" }} className="mx-auto max-w-xl text-base leading-relaxed">
          Top ambassadors by community reach. Top interns by project score.
          Updated as activity comes in.
        </p>
      </section>

      {/* ── Tabs ── */}
      <section className="mx-auto max-w-4xl px-6 pb-10">
        <div
          style={{ backgroundColor: "#082038", border: "1px solid rgba(126,200,216,0.1)" }}
          className="inline-flex rounded-full p-1"
        >
          {[
            { key: "ambassadors", icon: <Users size={14} />, label: "Top Ambassadors" },
            { key: "interns",     icon: <BookOpen size={14} />, label: "Top Interns" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as typeof tab)}
              style={{
                backgroundColor: tab === t.key ? "#188080" : "transparent",
                color: tab === t.key ? "#E8F4F8" : "rgba(126,200,216,0.45)",
              }}
              className="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all"
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── Top 3 podium ── */}
      {!loading && (
        <section className="mx-auto max-w-4xl px-6 pb-10">
          <div className="grid grid-cols-3 items-end gap-3">
            {(tab === "ambassadors" ? ambassadors : interns).slice(0, 3).map((entry, i) => {
              const rank = i + 1;
              const podiumOrder = [1, 0, 2]; // 2nd, 1st, 3rd visual order
              const visual = podiumOrder[i];
              const heights = ["h-24", "h-32", "h-20"];
              const name = entry.name;
              const score = tab === "ambassadors"
                ? `${(entry as AmbassadorEntry).communityReach} reach`
                : `${(entry as InternEntry).projectScore}/100`;

              return (
                <div key={rank} className="flex flex-col items-center gap-2">
                  {/* Avatar */}
                  <div
                    style={{
                      backgroundColor: `rgba(${rank === 1 ? "245,158,11" : rank === 2 ? "148,163,184" : "192,132,252"},0.15)`,
                      border: `2px solid ${rankColors[rank] ?? "rgba(126,200,216,0.2)"}`,
                    }}
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                  >
                    <span style={{ color: rankColors[rank] ?? "#7EC8D8" }} className="text-lg font-bold">
                      {name.charAt(0)}
                    </span>
                  </div>
                  <p style={{ color: "#E8F4F8" }} className="text-xs font-semibold text-center">{name}</p>
                  <p style={{ color: "rgba(126,200,216,0.4)" }} className="text-[10px] text-center">{score}</p>
                  {/* Podium bar */}
                  <div
                    style={{ backgroundColor: rank === 1 ? "rgba(245,158,11,0.15)" : "rgba(8,32,56,0.8)", border: `1px solid ${rankColors[rank] ?? "rgba(126,200,216,0.1)"}` }}
                    className={`w-full rounded-t-xl flex items-center justify-center ${heights[i]}`}
                  >
                    <RankIcon rank={rank} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Full list ── */}
      <section className="mx-auto max-w-4xl px-6">
        <div
          style={{ border: "1px solid rgba(126,200,216,0.1)" }}
          className="overflow-hidden rounded-2xl"
        >
          {/* Table header */}
          <div
            style={{ backgroundColor: "#082038", borderBottom: "1px solid rgba(126,200,216,0.08)" }}
            className="px-6 py-3"
          >
            {tab === "ambassadors" ? (
              <div className="grid w-full gap-4" style={{ gridTemplateColumns: "48px 1fr 130px 110px 80px" }}>
                <span style={{ color: "rgba(126,200,216,0.3)" }} className="text-xs font-medium uppercase tracking-wide">#</span>
                <span style={{ color: "rgba(126,200,216,0.3)" }} className="text-xs font-medium uppercase tracking-wide">Name</span>
                <span style={{ color: "rgba(126,200,216,0.3)" }} className="text-xs font-medium uppercase tracking-wide text-center">Sessions</span>
                <span style={{ color: "rgba(126,200,216,0.3)" }} className="text-xs font-medium uppercase tracking-wide text-center">Reach</span>
                <span style={{ color: "rgba(126,200,216,0.3)" }} className="text-xs font-medium uppercase tracking-wide text-center">Badge</span>
              </div>
            ) : (
              <div className="grid w-full gap-4" style={{ gridTemplateColumns: "48px 1fr 130px 110px 80px" }}>
                <span style={{ color: "rgba(126,200,216,0.3)" }} className="text-xs font-medium uppercase tracking-wide">#</span>
                <span style={{ color: "rgba(126,200,216,0.3)" }} className="text-xs font-medium uppercase tracking-wide">Name</span>
                <span style={{ color: "rgba(126,200,216,0.3)" }} className="text-xs font-medium uppercase tracking-wide text-center">Track</span>
                <span style={{ color: "rgba(126,200,216,0.3)" }} className="text-xs font-medium uppercase tracking-wide text-center">Score</span>
                <span style={{ color: "rgba(126,200,216,0.3)" }} className="text-xs font-medium uppercase tracking-wide text-center">Badge</span>
              </div>
            )}
          </div>

          {/* Rows */}
          {loading ? (
            <div className="py-16 text-center">
              <div
                style={{ border: "2px solid rgba(126,200,216,0.2)", borderTopColor: "#188080" }}
                className="mx-auto h-8 w-8 animate-spin rounded-full"
              />
              <p style={{ color: "rgba(126,200,216,0.3)" }} className="mt-4 text-sm">Loading leaderboard...</p>
            </div>
          ) : (tab === "ambassadors" ? ambassadors : interns).length === 0 ? (
            <EmptyState tab={tab} />
          ) : (
            (tab === "ambassadors" ? ambassadors : interns).map((entry, i) => (
              <LeaderboardRow
                key={entry.rank}
                entry={entry}
                tab={tab}
                isLast={i === (tab === "ambassadors" ? ambassadors : interns).length - 1}
              />
            ))
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto max-w-4xl px-6 pt-12 text-center">
        <p style={{ color: "rgba(126,200,216,0.4)" }} className="mb-4 text-sm">
          Want your name on this board?
        </p>
        <Link
          href="/join"
          style={{ backgroundColor: "#188080", color: "#E8F4F8" }}
          className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-all hover:brightness-110 active:scale-95"
        >
          Join Connexode <ArrowRight size={14} />
        </Link>
      </section>

    </main>
  );
}

// ── Row component ─────────────────────────────────────────────────────────────
function LeaderboardRow({
  entry, tab, isLast,
}: {
  entry: AmbassadorEntry | InternEntry;
  tab: "ambassadors" | "interns";
  isLast: boolean;
}) {
  const b = badges[entry.badge];
  const isAmb = tab === "ambassadors";
  const amb = entry as AmbassadorEntry;
  const intern = entry as InternEntry;

  return (
    <div
      style={{
        backgroundColor: entry.rank <= 3 ? `rgba(${entry.rank === 1 ? "245,158,11" : entry.rank === 2 ? "148,163,184" : "192,132,252"},0.04)` : "transparent",
        borderBottom: isLast ? "none" : "1px solid rgba(126,200,216,0.06)",
        gridTemplateColumns: "48px 1fr 130px 110px 80px",
      }}
      className="grid w-full items-center gap-4 px-6 py-4 transition-colors hover:bg-[rgba(8,32,56,0.5)]"
    >
      {/* Rank */}
      <div className="flex items-center justify-start">
        <RankIcon rank={entry.rank} />
      </div>

      {/* Name + university */}
      <div className="flex items-center gap-3 min-w-0">
        <div
          style={{
            backgroundColor: entry.rank <= 3 ? `rgba(${entry.rank === 1 ? "245,158,11" : entry.rank === 2 ? "148,163,184" : "192,132,252"},0.15)` : "rgba(8,32,56,0.8)",
            border: `1px solid ${rankColors[entry.rank] ?? "rgba(126,200,216,0.12)"}`,
            flexShrink: 0,
          }}
          className="flex h-9 w-9 items-center justify-center rounded-full"
        >
          <span style={{ color: rankColors[entry.rank] ?? "#7EC8D8" }} className="text-sm font-bold">
            {entry.name.charAt(0)}
          </span>
        </div>
        <div className="min-w-0">
          <p style={{ color: "#E8F4F8" }} className="truncate text-sm font-semibold">{entry.name}</p>
          <p style={{ color: "rgba(126,200,216,0.35)" }} className="truncate text-xs">{entry.university}</p>
        </div>
      </div>

      {/* Column 3 — sessions or track */}
      <div className="text-center">
        {isAmb ? (
          <div className="flex items-center justify-center gap-1">
            <Star size={12} style={{ color: "#188080" }} />
            <span style={{ color: "rgba(126,200,216,0.7)" }} className="text-sm">{amb.sessionsHosted} sessions</span>
          </div>
        ) : (
          <span
            style={{ border: "1px solid rgba(126,200,216,0.15)", color: "rgba(126,200,216,0.55)", backgroundColor: "rgba(4,12,24,0.5)" }}
            className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-medium"
          >
            {intern.track.split(" ")[0]}
          </span>
        )}
      </div>

      {/* Column 4 — reach or score */}
      <div className="text-center">
        {isAmb ? (
          <div className="flex items-center justify-center gap-1">
            <TrendingUp size={12} style={{ color: "#188080" }} />
            <span style={{ color: "rgba(126,200,216,0.7)" }} className="text-sm">{amb.communityReach.toLocaleString()}</span>
          </div>
        ) : (
          <div>
            <span style={{ color: "#7EC8D8", fontWeight: 700 }} className="text-sm">{intern.projectScore}</span>
            <span style={{ color: "rgba(126,200,216,0.3)" }} className="text-xs">/100</span>
          </div>
        )}
      </div>

      {/* Badge */}
      <div className="flex justify-center">
        <span
          style={{ backgroundColor: b.bg, border: `1px solid ${b.border}`, color: b.color }}
          className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
        >
          {b.label}
        </span>
      </div>
    </div>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyState({ tab }: { tab: string }) {
  return (
    <div className="py-16 text-center">
      <div
        style={{ border: "1px dashed rgba(126,200,216,0.15)", backgroundColor: "rgba(8,32,56,0.3)" }}
        className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full"
      >
        <Trophy size={24} style={{ color: "rgba(126,200,216,0.2)" }} />
      </div>
      <p style={{ color: "rgba(126,200,216,0.4)" }} className="mb-1 text-sm font-medium">No entries yet</p>
      <p style={{ color: "rgba(126,200,216,0.25)" }} className="text-xs">
        {tab === "ambassadors"
          ? "First ambassadors will appear here once they start logging activity."
          : "First interns will appear here once project scores are submitted."}
      </p>
    </div>
  );
}
