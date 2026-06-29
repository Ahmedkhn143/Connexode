"use client";

import React, { useState, useEffect } from "react";

interface LogoProps {
  size?: "sm" | "default" | "lg";
  showTagline?: boolean;
}

export function Logo({ size = "default", showTagline = false }: LogoProps) {
  const [clicked, setClicked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("connexode_logo_text_visible");
    if (saved === "true") {
      setClicked(true);
    }
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    const newState = !clicked;
    setClicked(newState);
    localStorage.setItem("connexode_logo_text_visible", String(newState));
  };

  const sizes = {
    sm: { icon: 24, font: "text-sm" },
    default: { icon: 32, font: "text-lg" },
    lg: { icon: 48, font: "text-2xl" },
  };

  const current = sizes[size] || sizes.default;

  return (
    <div
      onClick={handleClick}
      className="inline-flex items-center gap-2 select-none cursor-pointer"
    >
      <svg
        width={current.icon}
        height={current.icon}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 animate-fadeIn"
      >
        {/* Outer C-shaped Hexagon */}
        <path
          d="M 80,32 L 65,18 L 35,18 L 20,50 L 35,82 L 65,82 L 80,68"
          fill="none"
          stroke="var(--theme-logo-text)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Inner Left Bracket (Violet Gradient) */}
        <path
          d="M 48,38 L 38,50 L 48,62"
          fill="none"
          stroke="url(#violetGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Inner Right Bracket (Cyan Gradient) */}
        <path
          d="M 68,38 L 78,50 L 68,62"
          fill="none"
          stroke="url(#cyanGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Center Dot */}
        <circle
          cx="58"
          cy="50"
          r="6"
          fill="url(#dotGradient)"
        />
        <defs>
          <linearGradient id="violetGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
          <linearGradient id="cyanGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#0891B2" />
          </linearGradient>
          <linearGradient id="dotGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
      </svg>

      {/* Show name if clicked */}
      {mounted && clicked && (
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 800,
            letterSpacing: "-0.5px",
          }}
          className={`${current.font} transition-all duration-300 animate-fadeIn`}
        >
          <span style={{ color: "var(--theme-logo-text)" }}>Conne</span>
          <span
            style={{
              background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            X
          </span>
          <span style={{ color: "var(--theme-logo-text)" }}>ode</span>
        </span>
      )}
    </div>
  );
}

export default Logo;
