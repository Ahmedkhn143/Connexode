// components/dashboard/AICareerAdvisor.tsx
// AI Career Advisor — personalized advice widget
// Uses Anthropic API (claude-sonnet-4-6) based on user's real activity
// Works for both Ambassadors and Interns
// Colors: Navy #082038 · Teal #188080 · Cyan #7EC8D8

"use client";

import { useState } from "react";
import { Sparkles, RefreshCw, ChevronRight, Brain } from "lucide-react";

// ─── TYPES ────────────────────────────────────────────────────────────────────

type UserContext =
  | {
      role: "intern";
      name: string;
      track: string;
      tasksCompleted: number;
      totalTasks: number;
      averageScore: number;
      weakAreas: string[];      // from mentor feedback tags
      completedTopics: string[];
    }
  | {
      role: "ambassador";
      name: string;
      sessionsHosted: number;
      webinarsHosted: number;
      communityReach: number;
      currentBadge: string;
      nextBadgeTarget: number;
    };

type Advice = {
  headline: string;
  body: string;
  actions: string[];
  encouragement: string;
};

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export function AICareerAdvisor({ user }: { user: UserContext }) {
  const [advice, setAdvice] = useState<Advice | null>(null);
  const [loading, setLoading] = useState(false);
  const [asked, setAsked] = useState(false);

  async function getAdvice() {
    setLoading(true);
    setAsked(true);
    setAdvice(null);

    try {
      const res = await fetch("/api/ai-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user }),
      });
      const data = await res.json();
      setAdvice(data.advice);
    } catch {
      setAdvice({
        headline: "Could not load advice",
        body: "Something went wrong. Please try again.",
        actions: [],
        encouragement: "",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        backgroundColor: "#082038",
        border: "1px solid rgba(126,200,216,0.12)",
      }}
      className="rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(24,128,128,0.2) 0%, rgba(8,32,56,0.4) 100%)",
          borderBottom: "1px solid rgba(126,200,216,0.08)",
        }}
        className="flex items-center justify-between px-6 py-4"
      >
        <div className="flex items-center gap-2.5">
          <span
            style={{
              backgroundColor: "rgba(24,128,128,0.2)",
              border: "1px solid rgba(24,128,128,0.35)",
              color: "#7EC8D8",
            }}
            className="flex h-8 w-8 items-center justify-center rounded-lg"
          >
            <Brain size={15} strokeWidth={1.5} />
          </span>
          <div>
            <p style={{ color: "#E8F4F8" }} className="text-sm font-semibold">
              AI Career Advisor
            </p>
            <p
              style={{ color: "rgba(126,200,216,0.4)" }}
              className="text-[10px]"
            >
              Powered by Claude · Based on your real activity
            </p>
          </div>
        </div>

        {asked && (
          <button
            onClick={getAdvice}
            disabled={loading}
            style={{ color: "rgba(126,200,216,0.45)" }}
            className="flex items-center gap-1 text-xs transition-colors hover:text-[#7EC8D8] disabled:opacity-40"
          >
            <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        )}
      </div>

      {/* Body */}
      <div className="p-6">

        {/* Pre-ask state */}
        {!asked && (
          <div className="text-center py-4">
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(24,128,128,0.1), rgba(126,200,216,0.05))",
                border: "1px dashed rgba(126,200,216,0.15)",
              }}
              className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full"
            >
              <Sparkles size={24} style={{ color: "#7EC8D8" }} strokeWidth={1.5} />
            </div>
            <p style={{ color: "#E8F4F8" }} className="mb-2 text-sm font-semibold">
              Get personalised advice
            </p>
            <p
              style={{ color: "rgba(126,200,216,0.45)" }}
              className="mb-6 text-xs leading-relaxed mx-auto max-w-xs"
            >
              {user.role === "intern"
                ? `Based on your ${user.tasksCompleted} tasks, ${user.averageScore}/100 average score, and ${user.track} track — Claude will tell you exactly what to focus on next.`
                : `Based on your ${user.sessionsHosted} sessions, ${user.communityReach} community reach, and ${user.currentBadge} badge — get guidance on what to do to level up.`}
            </p>
            <button
              onClick={getAdvice}
              style={{ backgroundColor: "#188080", color: "#E8F4F8" }}
              className="flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold mx-auto transition-all hover:brightness-110 active:scale-95"
            >
              <Sparkles size={13} />
              Get my advice
            </button>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="py-8 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-4">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: "#188080",
                    animationDelay: `${i * 0.15}s`,
                  }}
                  className="h-2 w-2 rounded-full animate-bounce"
                />
              ))}
            </div>
            <p style={{ color: "rgba(126,200,216,0.4)" }} className="text-xs">
              Analysing your activity...
            </p>
          </div>
        )}

        {/* Advice result */}
        {!loading && advice && (
          <div className="space-y-5">

            {/* Headline */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(24,128,128,0.12), rgba(126,200,216,0.05))",
                border: "1px solid rgba(24,128,128,0.2)",
              }}
              className="rounded-xl px-5 py-4"
            >
              <div className="flex items-start gap-3">
                <Sparkles
                  size={15}
                  style={{ color: "#7EC8D8", marginTop: 2, flexShrink: 0 }}
                />
                <p style={{ color: "#E8F4F8" }} className="text-sm font-semibold leading-snug">
                  {advice.headline}
                </p>
              </div>
            </div>

            {/* Body */}
            <p
              style={{ color: "rgba(126,200,216,0.6)" }}
              className="text-sm leading-relaxed"
            >
              {advice.body}
            </p>

            {/* Action items */}
            {advice.actions.length > 0 && (
              <div>
                <p
                  style={{ color: "rgba(126,200,216,0.35)" }}
                  className="mb-3 text-[10px] font-semibold uppercase tracking-widest"
                >
                  Your next steps
                </p>
                <ul className="space-y-2">
                  {advice.actions.map((action, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <ChevronRight
                        size={14}
                        style={{ color: "#188080", marginTop: 1, flexShrink: 0 }}
                      />
                      <span
                        style={{ color: "rgba(126,200,216,0.65)" }}
                        className="text-sm leading-snug"
                      >
                        {action}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Encouragement */}
            {advice.encouragement && (
              <div
                style={{
                  borderTop: "1px solid rgba(126,200,216,0.08)",
                }}
                className="pt-4"
              >
                <p
                  style={{ color: "rgba(126,200,216,0.4)" }}
                  className="text-xs leading-relaxed italic"
                >
                  &ldquo;{advice.encouragement}&rdquo;
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
