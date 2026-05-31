"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  label: string;
  percentage: number;
  color?: string;
  showPercentage?: boolean;
  animate?: boolean;
  height?: "sm" | "md" | "lg";
}

export default function ProgressBar({
  label,
  percentage,
  color = "#00F5FF",
  showPercentage = true,
  animate = true,
  height = "md",
}: ProgressBarProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animate || !barRef.current) return;
    const bar = barRef.current;
    // Start at 0, animate to percentage
    bar.style.width = "0%";
    const timeout = setTimeout(() => {
      bar.style.width = `${percentage}%`;
    }, 100);
    return () => clearTimeout(timeout);
  }, [percentage, animate]);

  const heightMap = { sm: "h-1.5", md: "h-2.5", lg: "h-4" };

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-slate-200">{label}</span>
        {showPercentage && (
          <span className="font-semibold tabular-nums" style={{ color }}>
            {percentage}%
          </span>
        )}
      </div>
      <div
        className={cn(
          "w-full overflow-hidden rounded-full bg-white/8",
          heightMap[height]
        )}
      >
        <div
          ref={barRef}
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: animate ? "0%" : `${percentage}%`,
            background: `linear-gradient(90deg, ${color}99, ${color})`,
            boxShadow: `0 0 12px ${color}60`,
          }}
        />
      </div>
    </div>
  );
}
