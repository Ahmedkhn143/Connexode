import { Star, Flame, Award, TrendingUp } from "lucide-react";
import { MOCK_USER } from "@/lib/mock-data";

const STATS = [
  {
    label: "Points Earned",
    value: MOCK_USER.points.toLocaleString(),
    icon: Star,
    color: "#F59E0B",
    bg: "bg-yellow-400/10",
    border: "border-yellow-400/15",
    glow: "shadow-[0_0_20px_rgba(245,158,11,0.1)]",
  },
  {
    label: "Day Streak",
    value: `${MOCK_USER.streak} days`,
    icon: Flame,
    color: "#EF4444",
    bg: "bg-red-400/10",
    border: "border-red-400/15",
    glow: "shadow-[0_0_20px_rgba(239,68,68,0.1)]",
  },
  {
    label: "Badges Earned",
    value: "4 / 8",
    icon: Award,
    color: "#A855F7",
    bg: "bg-purple-400/10",
    border: "border-purple-400/15",
    glow: "shadow-[0_0_20px_rgba(168,85,247,0.1)]",
  },
  {
    label: "Campus Rank",
    value: MOCK_USER.rank,
    icon: TrendingUp,
    color: "#00BFA5",
    bg: "bg-teal-400/10",
    border: "border-teal-400/15",
    glow: "shadow-[0_0_20px_rgba(0,191,165,0.1)]",
  },
];

export default function StatsRow() {
  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {STATS.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className={`flex flex-col items-start gap-3 rounded-2xl border ${stat.border} ${stat.bg} ${stat.glow} p-5 backdrop-blur-xl`}
          >
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${stat.color}20`, border: `1px solid ${stat.color}30` }}
            >
              <Icon size={16} style={{ color: stat.color }} />
            </div>
            <div>
              <p className="text-xl font-extrabold text-white">{stat.value}</p>
              <p className="text-xs text-slate-500">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
