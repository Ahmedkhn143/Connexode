"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface LogoProps {
  size?: "sm" | "default" | "lg";
  showTagline?: boolean;
}

export function Logo({ size = "default", showTagline = false }: LogoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [processedSrc, setProcessedSrc] = useState<string>("/logo.png");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Process image dynamically using HTML5 Canvas to:
  // 1. Remove white background (make transparent)
  // 2. Crop into a perfect square
  // 3. Keep purple/cyan brackets unchanged, but convert dark outline to white in dark mode
  useEffect(() => {
    if (!mounted) return;

    const isDark = resolvedTheme === "dark";
    const img = new Image();
    img.src = "/logo.png";
    img.onload = () => {
      try {
        const canvas = canvasRef.current || document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Crop to a square centered on the logo icon
        const cropSize = Math.min(img.width, img.height);
        const startX = (img.width - cropSize) / 2;
        const startY = (img.height - cropSize) / 2;

        canvas.width = cropSize;
        canvas.height = cropSize;

        // Draw cropped region
        ctx.drawImage(img, startX, startY, cropSize, cropSize, 0, 0, cropSize, cropSize);

        const imgData = ctx.getImageData(0, 0, cropSize, cropSize);
        const data = imgData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // 1. Remove white/near-white background
          if (r > 235 && g > 235 && b > 235) {
            data[i + 3] = 0; // Alpha = 0 (transparent)
          } 
          // 2. In dark mode, turn the dark/black outer C-outline to light/white
          else if (isDark && r < 75 && g < 75 && b < 75) {
            data[i] = 245;     // Red
            data[i + 1] = 245; // Green
            data[i + 2] = 245; // Blue
          }
          // Note: Purple and Cyan brackets fall in between and will remain 100% untouched!
        }

        ctx.putImageData(imgData, 0, 0);
        setProcessedSrc(canvas.toDataURL());
      } catch (err) {
        console.error("Error processing logo image:", err);
      }
    };
  }, [resolvedTheme, mounted]);

  const sizes = {
    sm:      { imgHeight: "h-12", font: "text-base", textWidth: "w-24" },
    default: { imgHeight: "h-16", font: "text-xl", textWidth: "w-32" },
    lg:      { imgHeight: "h-22", font: "text-3xl", textWidth: "w-44" },
  };

  const current = sizes[size] || sizes.default;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="inline-flex items-center gap-1.5 select-none cursor-pointer group"
    >
      <canvas ref={canvasRef} className="hidden" />

      {/* Logo Image Wrapper - Increased height and width significantly */}
      <div className={`flex items-center justify-center ${current.imgHeight} aspect-square transition-transform duration-300 group-hover:scale-105`}>
        <img
          src={processedSrc}
          alt="Connexode Logo"
          className="h-full w-auto object-contain"
        />
      </div>

      {/* Text Container with smooth expand transition on hover */}
      <div
        className={`flex items-center overflow-hidden transition-all duration-500 ease-in-out ${
          isHovered ? `${current.textWidth} opacity-100` : "w-0 opacity-0"
        }`}
      >
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            color: "var(--text-primary)",
          }}
          className={`${current.font} whitespace-nowrap`}
        >
          <span>Conne</span>
          <span
            style={{
              background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            X
          </span>
          <span>ode</span>
        </span>
      </div>

      {showTagline && !isHovered && (
        <span
          style={{
            color: "var(--text-muted)",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginLeft: 2,
          }}
          className="transition-opacity duration-300"
        >
          Build. Connect. Grow.
        </span>
      )}
    </div>
  );
}

export default Logo;
