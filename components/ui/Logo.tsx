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
    sm: { icon: 32, font: "text-sm" },
    default: { icon: 42, font: "text-lg" },
    lg: { icon: 56, font: "text-2xl" },
  };

  const current = sizes[size] || sizes.default;

  return (
    <div
      onClick={handleClick}
      className="inline-flex items-center gap-1 select-none cursor-pointer"
    >
      <img
        src="/logo.png"
        alt="Connexode Logo"
        width={current.icon}
        height={current.icon}
        className="flex-shrink-0 object-contain animate-fadeIn"
      />

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
