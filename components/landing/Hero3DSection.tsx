"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Cpu,
  ShieldCheck,
  Terminal,
  Calendar,
  Sparkles,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   1. HIGH-PERFORMANCE 3D NEURAL CANVAS (Zero-Dependency WebGL/Canvas)
   Renders an interactive rotating 3D neural sphere with particle links
───────────────────────────────────────────────────────────── */
interface Point3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  size: number;
  color: string;
}

function Neural3DSphere({ isDark = true }: { isDark?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    const pointCount = 130;
    const radius = Math.min(width, height) * 0.38;
    const points: Point3D[] = [];

    const cyanHue = "#06B6D4";
    const violetHue = "#8B5CF6";

    for (let i = 0; i < pointCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / pointCount);
      const theta = Math.sqrt(pointCount * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      points.push({
        x,
        y,
        z,
        baseX: x,
        baseY: y,
        baseZ: z,
        size: Math.random() * 2.2 + 1.2,
        color: i % 2 === 0 ? cyanHue : violetHue,
      });
    }

    let rotX = 0;
    let rotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left - width / 2;
      const clientY = e.clientY - rect.top - height / 2;
      mouseRef.current.targetX = (clientX / width) * 2;
      mouseRef.current.targetY = -(clientY / height) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      rotY += 0.0035 + mouseRef.current.x * 0.007;
      rotX += 0.002 + mouseRef.current.y * 0.007;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const focalLength = 480;
      const centerX = width / 2;
      const centerY = height / 2;

      const projected: { x: number; y: number; z: number; size: number; color: string; alpha: number }[] = [];

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        const x1 = p.baseX * cosY - p.baseZ * sinY;
        const z1 = p.baseZ * cosY + p.baseX * sinY;

        const y2 = p.baseY * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.baseY * sinX;

        const scale = focalLength / (focalLength + z2 + 350);
        const projX = centerX + x1 * scale;
        const projY = centerY + y2 * scale;
        const alpha = Math.max(0.12, Math.min(1, (z2 + radius) / (2 * radius)));

        projected.push({
          x: projX,
          y: projY,
          z: z2,
          size: p.size * scale,
          color: p.color,
          alpha,
        });
      }

      ctx.lineWidth = 0.75;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 65) {
            const lineAlpha = (1 - dist / 65) * Math.min(p1.alpha, p2.alpha) * 0.35;
            ctx.strokeStyle = isDark
              ? `rgba(124, 58, 237, ${lineAlpha})`
              : `rgba(6, 182, 212, ${lineAlpha * 0.9})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.8, p.size), 0, Math.PI * 2);
        ctx.fillStyle =
          p.color === cyanHue
            ? `rgba(6, 182, 212, ${p.alpha * 0.95})`
            : `rgba(139, 92, 246, ${p.alpha * 0.95})`;
        ctx.fill();

        if (p.z > 50) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(6, 182, 212, ${p.alpha * 0.18})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-65 md:opacity-90"
      style={{ zIndex: 1 }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   2. 3D INTERACTIVE TILT STAGE (Mouse coordinates create 3D matrix)
───────────────────────────────────────────────────────────── */
function Tilt3DContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 12;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1200px" }}
      className={`relative w-full ${className}`}
    >
      <div
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.15s ease-out",
        }}
        className="relative w-full transition-shadow duration-300"
      >
        {children}

        {/* Dynamic Specular Lighting Glare */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 320px at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 80%)`,
            zIndex: 40,
          }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   3. TERMINAL STREAMING STEPS
───────────────────────────────────────────────────────────── */
const TERMINAL_LOGS = [
  { prompt: "$ connexode deploy --ai-agent-mesh", res: "✓ Multi-Agent Vector DB Ingested (Pinecone + Gemini API)" },
  { prompt: "$ connexode build --fullstack-saas", res: "✓ Microservices & Edge CI/CD Pipelines Online" },
  { prompt: "$ connexode train --cohort-track", res: "✓ 50+ Vetted Engineers & Code Reviews Active" },
  { prompt: "$ connexode verify-cert CERT-FS-8A9F32", res: "✓ Cryptographic Proof Publicly Verifiable" },
];

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT: HERO 3D SECTION
───────────────────────────────────────────────────────────── */
export default function Hero3DSection() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % TERMINAL_LOGS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const openContactModal = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-contact-modal"));
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-36 pb-20 px-6">
      {/* 3D Neural Particle Background */}
      <Neural3DSphere isDark={true} />

      {/* Cybernetic Radial Gradients */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[550px]"
        style={{
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.18) 0%, rgba(6, 182, 212, 0.12) 45%, transparent 70%)",
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />

      {/* Subtle Matrix Floor Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(124,58,237,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.7) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 20%, black 15%, transparent 80%)",
          zIndex: 0,
        }}
      />

      {/* ─── TWO-COLUMN 3D HERO CONTENT ─── */}
      <div className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* LEFT COLUMN: Strategic Copy & Targeted CTAs */}
        <div className="lg:col-span-6 text-center lg:text-left">
          {/* Eyebrow pill */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-semibold tracking-wider uppercase border mb-6"
            style={{
              background: "var(--surface)",
              backdropFilter: "blur(12px)",
              borderColor: "var(--border-strong)",
              color: "var(--violet)",
              boxShadow: "var(--shadow-sm), var(--inset-highlight)",
            }}
          >
            <span className="h-2 w-2 rounded-full bg-[var(--violet)] animate-pulse" />
            Global Tech Services · Pakistan-Built · Production Ready
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] mb-6">
            Train Real Talent.
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Deliver Real Systems.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
            Connexode bridges ambitious talent and global clients into one high-velocity ecosystem. From bespoke AI agents and full-stack software to verified 8-week internship tracks.
          </p>

          {/* Targeted Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
            <button
              onClick={openContactModal}
              id="hero-discovery-btn"
              className="w-full sm:w-auto h-[52px] inline-flex items-center justify-center gap-2.5 px-8 rounded-full text-white font-bold text-sm tracking-wide whitespace-nowrap transition-all duration-300 hover:scale-105 hover:brightness-110 active:scale-95 shadow-xl shadow-purple-600/25 cursor-pointer"
              style={{ background: "var(--gradient)" }}
            >
              <Calendar size={16} />
              <span>Book a Discovery Call</span>
              <ArrowRight size={15} />
            </button>
            <Link
              href="/services"
              id="hero-services-btn"
              className="w-full sm:w-auto h-[52px] inline-flex items-center justify-center gap-2 px-8 rounded-full font-semibold text-sm tracking-wide whitespace-nowrap border transition-all duration-300 hover:scale-105 hover:border-[var(--border-strong)] hover:bg-[var(--theme-hover)] active:scale-95"
              style={{
                background: "var(--surface)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderColor: "var(--border-strong)",
                color: "var(--text-primary)",
                boxShadow: "var(--shadow-sm), var(--inset-highlight)",
              }}
            >
              <span>Explore Services</span>
              <ArrowRight size={15} className="text-[var(--violet)]" />
            </Link>
          </div>

          {/* Executive Direct Leadership Trust Badge */}
          <div
            className="inline-flex items-center gap-3 p-1.5 pr-4 rounded-full border shadow-sm transition-all hover:scale-[1.02]"
            style={{
              background: "var(--surface)",
              borderColor: "var(--border)",
              boxShadow: "var(--shadow-sm), var(--inset-highlight)",
            }}
          >
            <div className="flex -space-x-2">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-[var(--surface-solid)] shadow-sm">
                <Image
                  src="/Founder.png"
                  alt="Muhammad Ahmad - CEO"
                  fill
                  sizes="32px"
                  className="object-cover object-[center_12%]"
                />
              </div>
              <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-[var(--surface-solid)] shadow-sm">
                <Image
                  src="/COO.jpeg"
                  alt="Muhammad Nadeem - COO"
                  fill
                  sizes="32px"
                  className="object-cover object-[center_12%]"
                />
              </div>
            </div>
            <span className="text-xs font-medium text-[var(--text-secondary)]">
              Steered directly by <strong className="text-[var(--text-primary)] font-semibold">Executive Leadership</strong>
            </span>
            <a href="#leadership" className="text-xs font-bold text-[var(--violet)] hover:underline flex items-center gap-0.5">
              Profiles <ArrowRight size={10} />
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: 3D PARALLAX INTERACTIVE TERMINAL & DEDICATED TELEMETRY PODS */}
        <div className="lg:col-span-6 relative w-full max-w-lg mx-auto">
          
          {/* ─── DEDICATED SATELLITE PODS ROW (100% Visible, Zero Overlap) ─── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 w-full">
            {/* Satellite 1: Live System */}
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background: "var(--surface)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1.5px solid rgba(124, 58, 237, 0.35)",
                boxShadow: "var(--shadow-sm), 0 0 20px rgba(124, 58, 237, 0.1)",
              }}
              className="flex items-center gap-3 p-3 rounded-2xl"
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-sm flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)" }}
              >
                <Cpu size={16} />
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-wider font-bold text-[var(--violet)] leading-none mb-1">Live System</p>
                <p className="text-xs font-black text-[var(--text-primary)]">AI Multi-Agent Active</p>
              </div>
            </motion.div>

            {/* Satellite 2: Milestone Escrow */}
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              style={{
                background: "var(--surface)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1.5px solid rgba(6, 182, 212, 0.35)",
                boxShadow: "var(--shadow-sm), 0 0 20px rgba(6, 182, 212, 0.1)",
              }}
              className="flex items-center gap-3 p-3 rounded-2xl"
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-sm flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #06B6D4, #7C3AED)" }}
              >
                <ShieldCheck size={16} />
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-wider font-bold text-[var(--cyan)] leading-none mb-1">Verified Delivery</p>
                <p className="text-xs font-black text-[var(--text-primary)]">Milestone-Based Escrow</p>
              </div>
            </motion.div>
          </div>

          {/* Central 3D Interactive Console (Completely Unobstructed) */}
          <Tilt3DContainer className="w-full">
            <div
              style={{
                background: "var(--surface-solid)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderColor: "var(--border-strong)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.18), 0 0 35px rgba(124, 58, 237, 0.12)",
              }}
              className="relative rounded-3xl border p-1 overflow-hidden w-full"
            >
              {/* Window Title Bar */}
              <div
                className="flex items-center justify-between px-5 py-3.5 border-b"
                style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-[var(--text-secondary)]">
                  <Terminal size={13} className="text-[var(--violet)]" />
                  <span>connexode-engine@v2.4.0</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-emerald-500 font-bold">ONLINE</span>
                </div>
              </div>

              {/* Console Body */}
              <div className="p-6 font-mono text-xs space-y-4 min-h-[280px]">
                {TERMINAL_LOGS.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="space-y-1.5"
                  >
                    <div className="text-[var(--text-secondary)] flex items-center gap-2">
                      <span className="text-[var(--cyan)] font-bold">{step.prompt.slice(0, 1)}</span>
                      <span>{step.prompt.slice(2)}</span>
                    </div>
                    <div className="text-emerald-500/90 pl-3 font-medium bg-emerald-500/5 py-1 rounded-lg border border-emerald-500/10">
                      {step.res}
                    </div>
                  </motion.div>
                ))}

                {/* Status Grid */}
                <div className="pt-3 border-t border-[var(--border)] grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                    <p className="text-[9px] uppercase tracking-wider text-[var(--text-muted)]">SYSTEM LOAD</p>
                    <p className="text-xs font-bold text-emerald-400">0.08ms</p>
                  </div>
                  <div className="p-2 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                    <p className="text-[9px] uppercase tracking-wider text-[var(--text-muted)]">STUDENTS</p>
                    <p className="text-xs font-bold text-[var(--cyan)]">50+ Active</p>
                  </div>
                  <div className="p-2 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                    <p className="text-[9px] uppercase tracking-wider text-[var(--text-muted)]">ACCURACY</p>
                    <p className="text-xs font-bold text-[var(--violet)]">99.8%</p>
                  </div>
                </div>

                {/* Blinking Prompt */}
                <div className="flex items-center gap-2 text-[var(--violet)] font-bold pt-1">
                  <span>connexode&gt;</span>
                  <span className="animate-pulse">_</span>
                </div>
              </div>
            </div>
          </Tilt3DContainer>
        </div>

      </div>
    </section>
  );
}
