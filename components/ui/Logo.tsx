import React from "react";

interface LogoProps {
  size?: "sm" | "default" | "lg";
  showTagline?: boolean;
}

export function Logo({ size = "default", showTagline = false }: LogoProps) {
  // Dimensions and text sizes
  const sizes = {
    sm: { icon: 24, font: "text-base", desc: "text-[9px]" },
    default: { icon: 30, font: "text-lg md:text-xl", desc: "text-[10px]" },
    lg: { icon: 44, font: "text-2xl md:text-3xl", desc: "text-xs" },
  };

  const current = sizes[size] || sizes.default;

  return (
    <div className="inline-flex flex-col select-none">
      <div className="flex items-center gap-2">
        <svg
          width={current.icon}
          height={current.icon}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0"
        >
          {/* Main Stylized 'C' shape in Teal */}
          <path
            d="M75 25C67 15 54 10 40 10C18 10 5 28 5 50C5 72 18 90 40 90C54 90 67 85 75 75"
            stroke="#188080"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Stylized 'x' intersection in light blue */}
          <path
            d="M60 40L90 70"
            stroke="#7EC8D8"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M90 40L60 70"
            stroke="#7EC8D8"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Center connector node */}
          <circle cx="40" cy="50" r="8" fill="#7EC8D8" />
        </svg>
        <span className={`${current.font} font-bold tracking-wider text-[#E8F4F8] transition-colors duration-200`}>
          Conn<span className="text-[#7EC8D8]">e</span>xode
        </span>
      </div>
      {showTagline && (
        <span 
          className={`${current.desc} text-[#188080] tracking-widest font-medium uppercase mt-0.5`}
          style={{ paddingLeft: current.icon + 8 }}
        >
          Learn · Build · Earn
        </span>
      )}
    </div>
  );
}

export default Logo;
