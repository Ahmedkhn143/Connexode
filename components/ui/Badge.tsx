import { cn } from "@/lib/utils";
import {
  GitCommit, Zap, Layers, Network, Database, Rocket, Flame, Lock, Award,
  Swords, LucideIcon,
} from "lucide-react";

// Safe icon map — only icons that exist in lucide-react
const ICON_MAP: Record<string, LucideIcon> = {
  GitCommit,
  Sword: Swords,   // alias — Lucide uses "Swords"
  Swords,
  Zap,
  Layers,
  Network,
  Database,
  Rocket,
  Flame,
  Award,
  Lock,
};

interface BadgeProps {
  name: string;
  icon?: string;
  color?: string;
  earned?: boolean;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export default function Badge({
  name,
  icon = "Award",
  color = "#00F5FF",
  earned = true,
  size = "md",
  showLabel = true,
}: BadgeProps) {
  const IconComponent = ICON_MAP[icon] ?? Award;

  const sizeMap = {
    sm: { wrapper: "w-10 h-10", iconSize: 16, text: "text-xs" },
    md: { wrapper: "w-14 h-14", iconSize: 20, text: "text-sm" },
    lg: { wrapper: "w-20 h-20", iconSize: 28, text: "text-base" },
  };
  const s = sizeMap[size];

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          "relative flex items-center justify-center rounded-full border-2 transition-all duration-300",
          s.wrapper,
          earned ? "shadow-[0_0_20px_rgba(0,0,0,0.5)]" : "opacity-40 grayscale"
        )}
        style={
          earned
            ? {
                borderColor: color,
                backgroundColor: `${color}18`,
                boxShadow: `0 0 20px ${color}30, inset 0 0 20px ${color}10`,
              }
            : { borderColor: "#334155", backgroundColor: "#0f172a" }
        }
      >
        <IconComponent
          size={s.iconSize}
          style={{ color: earned ? color : "#475569" }}
        />
        {!earned && (
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-[#020B18]/40">
            <Lock size={11} className="text-slate-600" />
          </div>
        )}
      </div>
      {showLabel && (
        <span
          className={cn(
            "text-center font-medium leading-tight",
            s.text,
            earned ? "text-slate-200" : "text-slate-600"
          )}
        >
          {name}
        </span>
      )}
    </div>
  );
}
