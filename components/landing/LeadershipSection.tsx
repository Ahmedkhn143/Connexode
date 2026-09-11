"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  ArrowRight,
  Quote,
  Users2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function LeadershipSection() {
  const leaders = [
    {
      name: "Muhammad Ahmad",
      role: "Founder & Chief Executive Officer",
      shortRole: "Founder & CEO",
      badge: "Executive Leadership",
      accent: "#7C3AED",
      accentBorder: "rgba(124, 58, 237, 0.32)",
      accentBg: "rgba(124, 58, 237, 0.08)",
      glowGradient: "radial-gradient(circle, rgba(124, 58, 237, 0.3), transparent 70%)",
      tagColor: "var(--violet)",
      image: "/Founder.png",
      imgPosition: "object-[center_12%]",
      quote:
        "We are building more than a software studio — Connexode is an ecosystem engineered to turn raw ambition into production-grade engineering.",
      bio: "Software architect and entrepreneur steering Connexode's product direction, global client delivery, and technical curriculum. Ahmad is dedicated to bridging the divide between academic foundations and modern, high-velocity tech industry standards.",
      highlights: [
        "Full-Stack Architecture & Cloud Systems",
        "AI Automation & Enterprise Integration",
        "Ecosystem Vision & Global Expansion",
      ],
      socials: {
        linkedin: "https://www.linkedin.com/in/muhamad-ahmd/",
        email: "mailto:ahmadkhn8143@gmail.com",
      },
    },
    {
      name: "Muhammad Nadeem",
      role: "Chief Operating Officer",
      shortRole: "COO",
      badge: "Operations & Growth",
      accent: "#06B6D4",
      accentBorder: "rgba(6, 182, 212, 0.32)",
      accentBg: "rgba(6, 182, 212, 0.08)",
      glowGradient: "radial-gradient(circle, rgba(6, 182, 212, 0.3), transparent 70%)",
      tagColor: "var(--cyan)",
      image: "/COO.jpeg",
      imgPosition: "object-[center_12%]",
      quote:
        "Excellence is not an accident. It is the result of disciplined execution, transparent operations, and nurturing talent at every campus step.",
      bio: "Operational strategist managing Connexode's nationwide campus networks, cohort scaling, and client delivery execution. Nadeem ensures that every project meets strict quality benchmarks while fostering leadership across our student ambassadors.",
      highlights: [
        "Operational Strategy & Scalable Workflows",
        "Campus Ambassador & Cohort Management",
        "Client Milestone Tracking & Quality Control",
      ],
      socials: {
        linkedin: "https://www.linkedin.com/in/muhammad-nadeem404",
        email: "mailto:muhammadnadeem2848@gmail.com",
      },
    },
  ];

  return (
    <section
      id="leadership"
      className="relative py-28 px-6 overflow-hidden"
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* Background Ambient Glows */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: "10%",
          left: "5%",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(124,58,237,0.14), transparent 70%)",
          borderRadius: "50%",
          filter: "blur(70px)",
          zIndex: 0,
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          bottom: "10%",
          right: "5%",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(6,182,212,0.14), transparent 70%)",
          borderRadius: "50%",
          filter: "blur(70px)",
          zIndex: 0,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-strong)",
              boxShadow: "var(--shadow-sm), var(--inset-highlight)",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
                display: "inline-block",
              }}
            />
            <span
              style={{
                color: "var(--violet)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Executive Leadership
            </span>
          </div>

          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1.15,
            }}
            className="mb-5"
          >
            Steered by Builders.{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Driven by Excellence.
            </span>
          </h2>

          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.05rem",
              lineHeight: 1.75,
            }}
          >
            Meet the leadership guiding Connexode’s dual mission: delivering robust,
            modern software solutions for global clients while cultivating world-class
            developer talent across universities.
          </p>
        </div>

        {/* Leaders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {leaders.map((leader, i) => (
            <div
              key={i}
              className="group relative rounded-3xl transition-all duration-300 hover:-translate-y-1.5"
              style={{
                background: "var(--surface)",
                backdropFilter: "blur(var(--blur))",
                WebkitBackdropFilter: "blur(var(--blur))",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-md), var(--inset-highlight)",
                overflow: "hidden",
              }}
            >
              {/* Top Accent Line */}
              <div
                style={{
                  height: "3px",
                  width: "100%",
                  background:
                    i === 0
                      ? "linear-gradient(90deg, #7C3AED, #A855F7, transparent)"
                      : "linear-gradient(90deg, #06B6D4, #3B82F6, transparent)",
                }}
              />

              <div className="p-7 sm:p-9 flex flex-col md:flex-row gap-7 items-start">
                {/* Photo & Quick Badges Column */}
                <div className="flex flex-col items-center md:items-start shrink-0 mx-auto md:mx-0">
                  {/* Glowing wrapper */}
                  <div className="relative group/photo">
                    <div
                      className="absolute -inset-1 rounded-3xl opacity-25 blur-lg transition-opacity duration-500 group-hover/photo:opacity-70 pointer-events-none"
                      style={{ background: leader.glowGradient }}
                    />

                    <div
                      className="relative w-48 h-60 sm:w-52 sm:h-64 rounded-2xl overflow-hidden shadow-xl transition-transform duration-500 group-hover/photo:scale-[1.02]"
                      style={{
                        border: `1px solid ${leader.accentBorder}`,
                        background:
                          i === 0
                            ? "linear-gradient(180deg, rgba(124,58,237,0.12), rgba(15,23,42,0.6))"
                            : "linear-gradient(180deg, rgba(6,182,212,0.12), rgba(15,23,42,0.6))",
                      }}
                    >
                      <Image
                        src={leader.image}
                        alt={`${leader.name} - ${leader.role} of Connexode`}
                        fill
                        sizes="(max-width: 768px) 192px, 208px"
                        className={`object-cover ${leader.imgPosition} transition-transform duration-700 group-hover/photo:scale-105`}
                        priority={true}
                      />

                      {/* Gentle bottom shade to ensure contrast */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(180deg, transparent 45%, rgba(10,15,30,0.4) 75%, rgba(10,15,30,0.85) 100%)",
                        }}
                      />

                      {/* Role Pill Floating on Image with High Contrast */}
                      <div
                        className="absolute bottom-2.5 left-2.5 right-2.5 px-3 py-1.5 rounded-xl text-center backdrop-blur-md flex items-center justify-center gap-1.5"
                        style={{
                          background: "rgba(10, 15, 30, 0.88)",
                          border: "1px solid rgba(255, 255, 255, 0.22)",
                          boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
                        }}
                      >
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: leader.accent,
                            boxShadow: `0 0 8px ${leader.accent}`,
                            display: "inline-block",
                          }}
                        />
                        <span
                          style={{
                            color: "#FFFFFF",
                            fontSize: "11px",
                            fontWeight: 800,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                          }}
                        >
                          {leader.shortRole}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Connect Action Links */}
                  <div className="flex items-center gap-2 mt-4 w-full justify-center md:justify-start">
                    <a
                      href={leader.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${leader.name} LinkedIn`}
                      className="btn-linkedin w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 hover:!bg-[#0A66C2] hover:!border-[#0A66C2] hover:!text-white hover:!shadow-[0_4px_16px_rgba(10,102,194,0.45)]"
                      style={{
                        background: leader.accentBg,
                        border: `1px solid ${leader.accentBorder}`,
                        color: leader.tagColor,
                      }}
                    >
                      <LinkedinIcon size={16} />
                    </a>
                    <a
                      href={leader.socials.email}
                      aria-label={`Email ${leader.name}`}
                      className="btn-gmail w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 hover:!bg-[#EA4335] hover:!border-[#EA4335] hover:!text-white hover:!shadow-[0_4px_16px_rgba(234,67,53,0.45)]"
                      style={{
                        background: leader.accentBg,
                        border: `1px solid ${leader.accentBorder}`,
                        color: leader.tagColor,
                      }}
                    >
                      <Mail size={16} />
                    </a>
                    <a
                      href={leader.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-connect px-3.5 py-1.5 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-all hover:opacity-90"
                      style={{
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      <span>Connect</span>
                      <ArrowRight size={12} />
                    </a>
                  </div>
                </div>

                {/* Content Column */}
                <div className="flex flex-col justify-between flex-1 w-full">
                  <div>
                    {/* Eyebrow badge */}
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1"
                        style={{
                          background: leader.accentBg,
                          border: `1px solid ${leader.accentBorder}`,
                          color: leader.tagColor,
                        }}
                      >
                        <Sparkles size={11} />
                        {leader.badge}
                      </span>
                    </div>

                    {/* Name & Title */}
                    <h3
                      style={{
                        color: "var(--text-primary)",
                        fontSize: "1.55rem",
                        fontWeight: 800,
                        letterSpacing: "-0.03em",
                      }}
                      className="mb-1"
                    >
                      {leader.name}
                    </h3>
                    <p
                      style={{
                        color: leader.tagColor,
                        fontSize: "0.92rem",
                        fontWeight: 600,
                      }}
                      className="mb-4"
                    >
                      {leader.role}
                    </p>

                    {/* Bio */}
                    <p
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "13px",
                        lineHeight: "1.75",
                      }}
                      className="mb-4"
                    >
                      {leader.bio}
                    </p>

                    {/* Styled Quote */}
                    <div
                      className="relative p-4 rounded-2xl mb-4 overflow-hidden"
                      style={{
                        background: leader.accentBg,
                        borderLeft: `3px solid ${leader.accent}`,
                        borderTop: "1px solid rgba(255,255,255,0.05)",
                        borderRight: "1px solid rgba(255,255,255,0.05)",
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <Quote
                        size={32}
                        className="absolute right-2 bottom-1 opacity-10 pointer-events-none"
                        style={{ color: leader.accent }}
                      />
                      <p
                        style={{
                          fontSize: "12.5px",
                          lineHeight: "1.65",
                          fontStyle: "italic",
                          color: "var(--text-primary)",
                        }}
                      >
                        &ldquo;{leader.quote}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Highlights checklist */}
                  <div>
                    <span
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      Key Focus Areas
                    </span>
                    <ul className="space-y-1.5">
                      {leader.highlights.map((hl, j) => (
                        <li
                          key={j}
                          className="flex items-center gap-2 text-xs"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          <CheckCircle2
                            size={14}
                            style={{ color: leader.tagColor, flexShrink: 0 }}
                          />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Banner */}
        <div
          className="rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border-strong)",
            boxShadow: "var(--shadow-sm), var(--inset-highlight)",
          }}
        >
          <div className="flex items-center gap-4 text-left">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(6,182,212,0.15))",
                border: "1px solid var(--border-strong)",
                color: "var(--violet)",
              }}
            >
              <Users2 size={24} />
            </div>
            <div>
              <h4
                style={{
                  color: "var(--text-primary)",
                  fontSize: "1rem",
                  fontWeight: 700,
                }}
              >
                Direct Founder-Led Commitment
              </h4>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "13px",
                  lineHeight: "1.6",
                }}
              >
                No gatekeepers or layers of bureaucracy. Our executive leadership directly
                oversees client engagements, technical audits, and internship curricula.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-full text-xs font-bold inline-flex items-center gap-2 transition-all hover:brightness-110 active:scale-95"
              style={{
                background: "var(--gradient)",
                color: "#fff",
                boxShadow: "var(--shadow-glow)",
              }}
            >
              <span>Speak with Leadership</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* Dynamic Hover Styles for Social Icons */}
      <style>{`
        .btn-linkedin:hover {
          background: #0A66C2 !important;
          border-color: #0A66C2 !important;
          color: #FFFFFF !important;
          box-shadow: 0 4px 16px rgba(10, 102, 194, 0.45) !important;
        }
        .btn-gmail:hover {
          background: #EA4335 !important;
          border-color: #EA4335 !important;
          color: #FFFFFF !important;
          box-shadow: 0 4px 16px rgba(234, 67, 53, 0.45) !important;
        }
        .btn-connect:hover {
          border-color: #0A66C2 !important;
          color: #0A66C2 !important;
          box-shadow: 0 4px 14px rgba(10, 102, 194, 0.25) !important;
        }
      `}</style>
    </section>
  );
}

