import Badge from "@/components/ui/Badge";
import { type Badge as BadgeType } from "@/lib/mock-data";
import { Lock } from "lucide-react";

interface BadgeGridProps {
  badges: BadgeType[];
}

export default function BadgeGrid({ badges }: BadgeGridProps) {
  const earned = badges.filter((b) => b.earned);
  const locked = badges.filter((b) => !b.earned);

  return (
    <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-white">Skill Badges</h2>
        <span className="rounded-full border border-white/8 bg-white/5 px-3 py-1 text-xs text-slate-500">
          {earned.length} / {badges.length} unlocked
        </span>
      </div>

      {/* Earned */}
      <div className="mb-6">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-600">
          Earned
        </p>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-4">
          {earned.map((badge) => (
            <div
              key={badge.id}
              title={badge.description}
              className="group relative cursor-default"
            >
              <Badge
                name={badge.name}
                icon={badge.icon}
                color={badge.color}
                earned={true}
                size="md"
              />
              {/* Tooltip */}
              <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-44 -translate-x-1/2 rounded-xl border border-white/10 bg-[#0A1628]/95 px-3 py-2 text-center text-xs text-slate-300 opacity-0 shadow-xl backdrop-blur-xl transition-opacity group-hover:opacity-100">
                {badge.description}
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {badge.earnedDate && new Date(badge.earnedDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Locked */}
      {locked.length > 0 && (
        <div>
          <p className="mb-4 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-slate-600">
            <Lock size={10} />
            Locked
          </p>
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-4">
            {locked.map((badge) => (
              <div key={badge.id} title={badge.description} className="cursor-default">
                <Badge
                  name={badge.name}
                  icon={badge.icon}
                  color={badge.color}
                  earned={false}
                  size="md"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
