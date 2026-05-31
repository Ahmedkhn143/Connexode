import { cn } from "@/lib/utils";
import { ReactNode, CSSProperties } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
  style?: CSSProperties;
}

export default function GlassCard({
  children,
  className,
  glowColor = "rgba(0,245,255,0.15)",
  hover = true,
  padding = "md",
  style,
}: GlassCardProps) {
  const padMap = { sm: "p-4", md: "p-6", lg: "p-8" };

  return (
    <div
      className={cn(
        "relative rounded-2xl border border-white/8 bg-white/4 backdrop-blur-xl",
        padMap[padding],
        hover && "transition-all duration-300 ease-out",
        hover && "hover:-translate-y-2 hover:border-cyan-400/30",
        className
      )}
      style={style}
    >
      {hover && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ boxShadow: `0 0 40px ${glowColor}` }}
        />
      )}
      {children}
    </div>
  );
}
