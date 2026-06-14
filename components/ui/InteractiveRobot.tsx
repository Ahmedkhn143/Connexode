"use client";

import { useEffect, useState } from "react";

export default function InteractiveRobot() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize position from -1 to 1 based on window size
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-80 h-80 flex items-center justify-center" style={{ perspective: "1000px" }}>
      {/* Outer Rotating HUD Ring */}
      <div 
        className="absolute w-72 h-72 rounded-full border border-dashed border-cyan-500/20 animate-spin-slow pointer-events-none"
        style={{
          transform: `rotate(${mousePos.x * 20}deg) scale(1.05)`,
          transition: "transform 0.2s ease-out"
        }}
      />

      {/* Secondary Tech Orbit Ring */}
      <div 
        className="absolute w-[290px] h-[290px] rounded-full border border-purple-500/10 pointer-events-none"
        style={{
          transform: `rotate(${-mousePos.x * 10}deg) rotateX(70deg)`,
          transition: "transform 0.3s ease-out"
        }}
      />

      {/* Main 3D Head Container */}
      <div
        style={{
          transform: `rotateX(${-mousePos.y * 15}deg) rotateY(${mousePos.x * 20}deg) translateZ(10px)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.15s cubic-bezier(0.25, 0.8, 0.25, 1)"
        }}
        className="relative w-56 h-56 flex flex-col items-center justify-center"
      >
        {/* Antenna */}
        <div 
          className="absolute top-[-30px] flex flex-col items-center"
          style={{ transform: "translateZ(10px)", transformStyle: "preserve-3d" }}
        >
          <div className="w-1.5 h-10 bg-gradient-to-t from-slate-700 to-slate-500 rounded-full" />
          <div 
            className="w-4 h-4 rounded-full bg-cyan-400 animate-pulse"
            style={{
              boxShadow: "0 0 15px #00F5FF, 0 0 30px rgba(0, 245, 255, 0.6)",
              transform: `scale(${1 + Math.abs(mousePos.x) * 0.2})`
            }}
          />
        </div>

        {/* Ears / Side Bolts */}
        <div className="absolute left-[-12px] w-4 h-12 bg-slate-700 rounded-l-lg border-l border-white/10" style={{ transform: "translateZ(-10px)" }} />
        <div className="absolute right-[-12px] w-4 h-12 bg-slate-700 rounded-r-lg border-r border-white/10" style={{ transform: "translateZ(-10px)" }} />

        {/* Head Chassis */}
        <div 
          className="w-full h-44 rounded-[40px] bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-white/10 p-6 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.05)] relative overflow-hidden"
          style={{
            boxShadow: `0 0 40px rgba(0, 245, 255, ${0.1 + Math.abs(mousePos.x) * 0.1})`
          }}
        >
          {/* Subtle Inner Glow Shadow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

          {/* Visor Screen */}
          <div 
            className="w-full h-24 rounded-2xl bg-black/60 border border-white/5 p-4 flex items-center justify-around relative"
            style={{ transform: "translateZ(20px)" }}
          >
            {/* Eye Sockets and Pupils */}
            <div className="flex justify-between w-full px-4">
              {/* Left Eye */}
              <div className="w-10 h-10 rounded-full bg-slate-950 border border-white/5 flex items-center justify-center overflow-hidden">
                <div 
                  className="w-5 h-5 rounded-full bg-cyan-400"
                  style={{
                    transform: `translate(${mousePos.x * 6}px, ${mousePos.y * 6}px)`,
                    boxShadow: "0 0 10px #00F5FF, 0 0 20px rgba(0,245,255,0.8)",
                    transition: "transform 0.1s ease-out"
                  }}
                />
              </div>

              {/* Right Eye */}
              <div className="w-10 h-10 rounded-full bg-slate-950 border border-white/5 flex items-center justify-center overflow-hidden">
                <div 
                  className="w-5 h-5 rounded-full bg-cyan-400"
                  style={{
                    transform: `translate(${mousePos.x * 6}px, ${mousePos.y * 6}px)`,
                    boxShadow: "0 0 10px #00F5FF, 0 0 20px rgba(0,245,255,0.8)",
                    transition: "transform 0.1s ease-out"
                  }}
                />
              </div>
            </div>

            {/* Glowing HUD Scanline overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent animate-pulse pointer-events-none" />
          </div>

          {/* Mouth / LED Indicator Panel */}
          <div 
            className="w-24 h-3 bg-slate-950/80 rounded-full border border-white/5 mx-auto flex items-center justify-center overflow-hidden"
            style={{ transform: "translateZ(15px)" }}
          >
            {/* Glowing Soundwave-like bars */}
            <div className="flex gap-0.5 items-center">
              {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((h, i) => (
                <div 
                  key={i} 
                  className="w-1 bg-cyan-400 rounded-full transition-all duration-150"
                  style={{
                    height: `${h * (1 + Math.abs(mousePos.y) * 1.5)}px`,
                    boxShadow: "0 0 6px #00F5FF"
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Neck Support */}
        <div 
          className="w-12 h-8 bg-slate-700 border-x border-b border-white/10 rounded-b-xl"
          style={{ transform: "translateZ(-20px) translateY(-2px)" }}
        />
        {/* Collar Collar Base */}
        <div 
          className="w-24 h-4 bg-slate-800 border border-white/5 rounded-full"
          style={{ transform: "translateZ(-25px) translateY(-5px)", boxShadow: "0 10px 20px rgba(0,0,0,0.4)" }}
        />
      </div>
    </div>
  );
}
