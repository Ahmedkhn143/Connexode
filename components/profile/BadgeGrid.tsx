import UIBadge from "@/components/ui/Badge";
import type { Badge as BadgeType } from "@/lib/mock-data";
import { Lock, Award, Calendar, CheckCircle2 } from "lucide-react";

interface BadgeGridProps {
  badges: BadgeType[];
}

export default function BadgeGrid({ badges }: BadgeGridProps) {
  const earned = badges.filter((b) => b.earned);
  const locked = badges.filter((b) => !b.earned);
  const totalCount = badges.length;
  const earnedCount = earned.length;
  const completionPercentage = totalCount > 0 ? Math.round((earnedCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Premium Circular Progress Header */}
      <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-br from-[#091526] to-[#020b18] p-6 shadow-2xl backdrop-blur-xl">
        <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full blur-3xl bg-yellow-500/10 animate-pulse" />
        <div className="relative flex flex-col sm:flex-row items-center gap-6 justify-between">
          <div className="space-y-2 text-center sm:text-left">
            <span className="rounded-full bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 text-[9px] font-extrabold uppercase tracking-widest text-yellow-500">
              Gamified Accomplishments
            </span>
            <h2 className="font-display text-xl font-black text-white">Ambassador Milestones & Badges</h2>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Unlock prestigious badges by successfully executing outreach campaigns, hosting campus bootcamps, and onboarding developers.
            </p>
          </div>

          {/* SVG Progress Ring */}
          <div className="relative flex items-center justify-center shrink-0">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="38"
                stroke="#1e293b"
                strokeWidth="6"
                fill="transparent"
              />
              <circle
                cx="48"
                cy="48"
                r="38"
                stroke="#EAB308"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 38}
                strokeDashoffset={2 * Math.PI * 38 * (1 - completionPercentage / 100)}
                className="transition-all duration-1000 ease-out"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-base font-black text-white font-mono">{earnedCount} / {totalCount}</span>
              <span className="text-[9px] font-bold text-yellow-500 uppercase tracking-widest leading-none mt-0.5">Badges</span>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Grid View */}
      <div className="rounded-3xl border border-white/8 bg-[#040f21]/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-8">
        
        {/* Earned Section */}
        {earned.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-yellow-500 flex items-center gap-1.5 border-b border-white/5 pb-2">
              <Award size={14} className="text-yellow-500" />
              Earned Badges ({earnedCount})
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {earned.map((badge) => (
                <div
                  key={badge.id}
                  className="group relative rounded-2xl border border-white/8 bg-white/4 p-4 hover:border-yellow-500/35 hover:bg-yellow-500/5 transition-all duration-300 shadow-lg flex items-center gap-3 overflow-hidden select-none hover:scale-[1.01]"
                  style={{
                    boxShadow: `0 10px 30px rgba(0, 0, 0, 0.2), inset 0 0 20px ${badge.color}05`
                  }}
                >
                  {/* Subtle Background Glow Match */}
                  <div
                    className="absolute -right-5 -bottom-5 h-20 w-20 rounded-full blur-2xl opacity-20 group-hover:opacity-45 transition-opacity duration-300"
                    style={{ backgroundColor: badge.color }}
                  />

                  {/* Badge Icon Element */}
                  <div className="shrink-0">
                    <UIBadge
                      name=""
                      icon={badge.icon}
                      color={badge.color}
                      earned={true}
                      size="sm"
                      showLabel={false}
                    />
                  </div>

                  {/* Title & Desc */}
                  <div className="min-w-0 flex-1 space-y-1">
                    <h4 className="text-xs font-bold text-white group-hover:text-yellow-400 transition-colors truncate">{badge.name}</h4>
                    <p className="text-[10px] text-slate-400 leading-snug line-clamp-2">{badge.description}</p>
                    {badge.earnedDate && (
                      <span className="inline-flex items-center gap-1 text-[9px] text-slate-500 font-mono">
                        <Calendar size={10} />
                        {new Date(badge.earnedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Locked Section */}
        {locked.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 flex items-center gap-1.5 border-b border-white/5 pb-2">
              <Lock size={12} className="text-slate-500" />
              Locked Achievements ({locked.length})
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {locked.map((badge) => (
                <div
                  key={badge.id}
                  className="rounded-2xl border border-white/5 bg-[#030914]/50 p-4 opacity-50 grayscale flex items-center gap-3 relative overflow-hidden cursor-not-allowed select-none"
                >
                  {/* Badge Icon Element */}
                  <div className="shrink-0">
                    <UIBadge
                      name=""
                      icon={badge.icon}
                      color={badge.color}
                      earned={false}
                      size="sm"
                      showLabel={false}
                    />
                  </div>

                  {/* Title & Desc */}
                  <div className="min-w-0 flex-1 space-y-1">
                    <h4 className="text-xs font-bold text-slate-400 truncate">{badge.name}</h4>
                    <p className="text-[10px] text-slate-500 leading-snug line-clamp-2">{badge.description}</p>
                  </div>
                  <Lock size={12} className="absolute right-4 top-4 text-slate-600" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
