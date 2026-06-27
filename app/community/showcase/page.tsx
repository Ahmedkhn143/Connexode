// app/community/showcase/page.tsx
// Project Showcase — intern projects gallery with track filter
// Colors: Navy #082038 · Teal #188080 · Cyan #7EC8D8

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Github,
  ExternalLink,
  ArrowRight,
  Code2,
  Layers,
  Brain,
  Palette,
  Star,
  Filter,
} from "lucide-react";

// ─── TYPES ────────────────────────────────────────────────────────────────────

type Project = {
  id: string;
  title: string;
  description: string;
  internName: string;
  university: string;
  track: string;
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
  score: number;
  completedAt: string;
  featured: boolean;
};

// ─── TRACK CONFIG ─────────────────────────────────────────────────────────────

const tracks = [
  { key: "all",        label: "All tracks",           icon: <Filter size={13} /> },
  { key: "Frontend",   label: "Frontend Development",  icon: <Code2 size={13} /> },
  { key: "Full Stack", label: "Full Stack",            icon: <Layers size={13} /> },
  { key: "AI",         label: "AI & Automation",       icon: <Brain size={13} /> },
  { key: "UI/UX",      label: "UI/UX Design",          icon: <Palette size={13} /> },
];

function trackColor(track: string) {
  const map: Record<string, { color: string; bg: string; border: string }> = {
    Frontend:    { color: "#7EC8D8", bg: "rgba(126,200,216,0.1)", border: "rgba(126,200,216,0.2)" },
    "Full Stack":{ color: "#A78BFA", bg: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.2)" },
    AI:          { color: "#34D399", bg: "rgba(52,211,153,0.1)",  border: "rgba(52,211,153,0.2)"  },
    "UI/UX":     { color: "#F472B6", bg: "rgba(244,114,182,0.1)", border: "rgba(244,114,182,0.2)" },
  };
  return map[track] ?? { color: "#7EC8D8", bg: "rgba(126,200,216,0.1)", border: "rgba(126,200,216,0.2)" };
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function ShowcasePage() {
  const [activeTrack, setActiveTrack] = useState("all");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/showcase");
        const data = await res.json();
        setProjects(data.projects ?? []);
      } catch {
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered =
    activeTrack === "all"
      ? projects
      : projects.filter((p) => p.track.includes(activeTrack));

  const featured = filtered.filter((p) => p.featured);
  const rest     = filtered.filter((p) => !p.featured);

  return (
    <main
      style={{ backgroundColor: "#040C18" }}
      className="min-h-screen pt-24 pb-20 antialiased"
    >
      {/* ── Hero ── */}
      <section className="mx-auto max-w-4xl px-6 py-14 text-center">
        <span
          style={{
            border: "1px solid rgba(126,200,216,0.2)",
            color: "#7EC8D8",
            backgroundColor: "rgba(8,32,56,0.6)",
          }}
          className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-widest"
        >
          Community
        </span>
        <h1
          style={{ color: "#E8F4F8" }}
          className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl"
        >
          Project Showcase
        </h1>
        <p
          style={{ color: "rgba(126,200,216,0.5)" }}
          className="mx-auto max-w-xl text-base leading-relaxed"
        >
          Real projects built by Connexode interns. Every project here was
          submitted, mentor-graded, and deployed by a student who started
          exactly where you are now.
        </p>
      </section>

      {/* ── Track filter ── */}
      <section className="mx-auto max-w-5xl px-6 pb-10">
        <div className="flex flex-wrap items-center gap-2">
          {tracks.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTrack(t.key)}
              style={{
                backgroundColor:
                  activeTrack === t.key ? "#188080" : "#082038",
                border: `1px solid ${
                  activeTrack === t.key
                    ? "#188080"
                    : "rgba(126,200,216,0.12)"
                }`,
                color:
                  activeTrack === t.key
                    ? "#E8F4F8"
                    : "rgba(126,200,216,0.5)",
              }}
              className="flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium transition-all hover:border-[rgba(126,200,216,0.35)]"
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── Loading ── */}
      {loading && (
        <section className="mx-auto max-w-5xl px-6 py-20 text-center">
          <div
            style={{
              border: "2px solid rgba(126,200,216,0.2)",
              borderTopColor: "#188080",
            }}
            className="mx-auto h-8 w-8 animate-spin rounded-full"
          />
          <p
            style={{ color: "rgba(126,200,216,0.3)" }}
            className="mt-4 text-sm"
          >
            Loading projects...
          </p>
        </section>
      )}

      {/* ── Empty state ── */}
      {!loading && filtered.length === 0 && (
        <section className="mx-auto max-w-5xl px-6 py-20 text-center">
          <div
            style={{
              border: "1px dashed rgba(126,200,216,0.15)",
              backgroundColor: "rgba(8,32,56,0.3)",
            }}
            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full"
          >
            <Code2 size={24} style={{ color: "rgba(126,200,216,0.2)" }} />
          </div>
          <p
            style={{ color: "rgba(126,200,216,0.4)" }}
            className="mb-1 text-sm font-medium"
          >
            No projects yet
          </p>
          <p
            style={{ color: "rgba(126,200,216,0.25)" }}
            className="text-xs"
          >
            {activeTrack === "all"
              ? "First intern projects will appear here once submitted and graded."
              : `No ${activeTrack} projects yet — check back soon.`}
          </p>
        </section>
      )}

      {/* ── Featured projects ── */}
      {!loading && featured.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 pb-8">
          <p
            style={{ color: "rgba(126,200,216,0.4)" }}
            className="mb-5 text-xs font-medium uppercase tracking-widest"
          >
            ⭐ Featured
          </p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {featured.map((p) => (
              <ProjectCard key={p.id} project={p} featured />
            ))}
          </div>
        </section>
      )}

      {/* ── All projects grid ── */}
      {!loading && rest.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 pb-16">
          {featured.length > 0 && (
            <p
              style={{ color: "rgba(126,200,216,0.4)" }}
              className="mb-5 text-xs font-medium uppercase tracking-widest"
            >
              All projects
            </p>
          )}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="mx-auto max-w-4xl px-6 pt-4 text-center">
        <div
          style={{
            backgroundColor: "#082038",
            border: "1px solid rgba(126,200,216,0.1)",
          }}
          className="rounded-2xl px-8 py-10"
        >
          <h2
            style={{ color: "#E8F4F8" }}
            className="mb-3 text-xl font-bold"
          >
            Want your project on this board?
          </h2>
          <p
            style={{ color: "rgba(126,200,216,0.45)" }}
            className="mb-7 text-sm leading-relaxed"
          >
            Apply for the internship program, complete your 8-week track,
            and your best project gets featured here with your name on it.
          </p>
          <Link
            href="/join/internship"
            style={{ backgroundColor: "#188080", color: "#E8F4F8" }}
            className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-all hover:brightness-110 active:scale-95"
          >
            Apply for internship <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </main>
  );
}

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────

function ProjectCard({
  project: p,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const tc = trackColor(p.track);
  const date = new Date(p.completedAt).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });

  return (
    <div
      style={{
        backgroundColor: "#082038",
        border: `1px solid ${
          featured ? "rgba(24,128,128,0.35)" : "rgba(126,200,216,0.1)"
        }`,
      }}
      className="group flex flex-col rounded-2xl p-6 transition-all duration-300 hover:border-[rgba(126,200,216,0.3)] hover:-translate-y-0.5"
    >
      {/* Top row — track badge + score */}
      <div className="mb-4 flex items-center justify-between">
        <span
          style={{
            backgroundColor: tc.bg,
            border: `1px solid ${tc.border}`,
            color: tc.color,
          }}
          className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
        >
          {p.track}
        </span>
        <div className="flex items-center gap-1">
          <Star size={11} style={{ color: "#F59E0B" }} />
          <span style={{ color: "#E8F4F8" }} className="text-xs font-bold">
            {p.score}
          </span>
          <span style={{ color: "rgba(126,200,216,0.3)" }} className="text-xs">
            /100
          </span>
        </div>
      </div>

      {/* Title */}
      <h3
        style={{ color: "#E8F4F8" }}
        className="mb-2 text-[15px] font-bold leading-snug"
      >
        {p.title}
      </h3>

      {/* Description */}
      <p
        style={{ color: "rgba(126,200,216,0.5)" }}
        className="mb-4 flex-1 text-xs leading-relaxed line-clamp-3"
      >
        {p.description}
      </p>

      {/* Stack tags */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {p.stack.map((s) => (
          <span
            key={s}
            style={{
              backgroundColor: "rgba(4,12,24,0.6)",
              border: "1px solid rgba(126,200,216,0.1)",
              color: "rgba(126,200,216,0.45)",
            }}
            className="rounded-full px-2.5 py-0.5 text-[10px] font-medium"
          >
            {s}
          </span>
        ))}
      </div>

      {/* Intern info */}
      <div
        style={{ borderTop: "1px solid rgba(126,200,216,0.07)" }}
        className="mb-4 flex items-center gap-2.5 pt-4"
      >
        <div
          style={{
            backgroundColor: "rgba(24,128,128,0.15)",
            border: "1px solid rgba(24,128,128,0.25)",
          }}
          className="flex h-8 w-8 items-center justify-center rounded-full"
        >
          <span style={{ color: "#7EC8D8" }} className="text-xs font-bold">
            {p.internName.charAt(0)}
          </span>
        </div>
        <div>
          <p style={{ color: "#E8F4F8" }} className="text-xs font-semibold">
            {p.internName}
          </p>
          <p style={{ color: "rgba(126,200,216,0.35)" }} className="text-[10px]">
            {p.university} · {date}
          </p>
        </div>
      </div>

      {/* Links */}
      <div className="flex items-center gap-3">
        {p.githubUrl && (
          <a
            href={p.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              border: "1px solid rgba(126,200,216,0.15)",
              color: "rgba(126,200,216,0.6)",
              backgroundColor: "rgba(4,12,24,0.5)",
            }}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-xs font-medium transition-all hover:border-[rgba(126,200,216,0.4)] hover:text-[#7EC8D8]"
          >
            <Github size={12} /> GitHub
          </a>
        )}
        {p.liveUrl && (
          <a
            href={p.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: "#188080", color: "#E8F4F8" }}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-xs font-semibold transition-all hover:brightness-110"
          >
            <ExternalLink size={12} /> Live demo
          </a>
        )}
        {!p.githubUrl && !p.liveUrl && (
          <span
            style={{ color: "rgba(126,200,216,0.25)" }}
            className="text-xs"
          >
            Links coming soon
          </span>
        )}
      </div>
    </div>
  );
}
