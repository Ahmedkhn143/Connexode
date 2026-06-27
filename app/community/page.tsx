// app/community/page.tsx
// Community hub — entry point for Leaderboard, Showcase, Success Stories

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Trophy, FolderOpen, Heart, ArrowRight, Users } from "lucide-react";

async function getStats() {
  const [totalAmbassadors, totalInterns, totalProjects] = await Promise.all([
    prisma.application.count({ where: { type: "AMBASSADOR", status: "APPROVED" } }),
    prisma.application.count({ where: { type: "INTERNSHIP", status: "APPROVED" } }),
    prisma.project.count({ where: { published: true } }).catch(() => 0),
  ]);
  return { totalAmbassadors, totalInterns, totalProjects };
}

const sections = [
  {
    icon: <Trophy size={22} strokeWidth={1.5} />,
    tag: "Rankings",
    title: "Leaderboard",
    desc: "Top ambassadors by community reach. Top interns by project score. Updated as activity comes in.",
    cta: "View leaderboard",
    href: "/community/leaderboard",
    color: "#F59E0B",
  },
  {
    icon: <FolderOpen size={22} strokeWidth={1.5} />,
    tag: "Work",
    title: "Project Showcase",
    desc: "Real projects built by Connexode interns — graded, deployed, and open for the world to see.",
    cta: "Browse projects",
    href: "/community/showcase",
    color: "#7EC8D8",
  },
  {
    icon: <Heart size={22} strokeWidth={1.5} />,
    tag: "Stories",
    title: "Success Stories",
    desc: "Real students. Real outcomes. Read how ambassadors and interns grew through Connexode.",
    cta: "Read stories",
    href: "/community/success-stories",
    color: "#F472B6",
  },
];

export default async function CommunityPage() {
  const stats = await getStats();

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
          <Users size={11} /> Community
        </span>
        <h1
          style={{ color: "#E8F4F8" }}
          className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl"
        >
          The Connexode community
        </h1>
        <p
          style={{ color: "rgba(126,200,216,0.5)" }}
          className="mx-auto max-w-xl text-base leading-relaxed"
        >
          Rankings, real projects, and real outcomes — from the students
          and ambassadors who are building the future of Pakistani tech.
        </p>

        {/* Live stats */}
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          {[
            { value: stats.totalAmbassadors, label: "Active ambassadors" },
            { value: stats.totalInterns,     label: "Interns trained"   },
            { value: stats.totalProjects,    label: "Projects published" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p
                style={{
                  background: "linear-gradient(135deg, #7EC8D8, #188080)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                className="text-3xl font-bold"
              >
                {s.value}
              </p>
              <p style={{ color: "rgba(126,200,216,0.4)" }} className="text-xs">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section cards ── */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              style={{
                backgroundColor: "#082038",
                border: "1px solid rgba(126,200,216,0.1)",
              }}
              className="group flex flex-col rounded-2xl p-7 transition-all duration-300 hover:border-[rgba(126,200,216,0.3)] hover:-translate-y-1"
            >
              <div className="mb-5 flex items-center gap-3">
                <span
                  style={{
                    backgroundColor: `${s.color}18`,
                    border: `1px solid ${s.color}33`,
                    color: s.color,
                  }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                >
                  {s.icon}
                </span>
                <span
                  style={{
                    border: "1px solid rgba(126,200,216,0.15)",
                    color: "rgba(126,200,216,0.4)",
                    backgroundColor: "rgba(8,32,56,0.5)",
                  }}
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest"
                >
                  {s.tag}
                </span>
              </div>
              <h2
                style={{ color: "#E8F4F8" }}
                className="mb-3 text-lg font-bold"
              >
                {s.title}
              </h2>
              <p
                style={{ color: "rgba(126,200,216,0.45)" }}
                className="mb-6 flex-1 text-sm leading-relaxed"
              >
                {s.desc}
              </p>
              <span
                style={{ color: s.color }}
                className="flex items-center gap-1.5 text-sm font-medium transition-all group-hover:gap-2.5"
              >
                {s.cta}
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto max-w-3xl px-6 text-center">
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
            Want to be part of this community?
          </h2>
          <p
            style={{ color: "rgba(126,200,216,0.45)" }}
            className="mb-7 text-sm leading-relaxed"
          >
            Apply as an ambassador or join an internship track — and get
            your name on the leaderboard.
          </p>
          <Link
            href="/join"
            style={{ backgroundColor: "#188080", color: "#E8F4F8" }}
            className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-all hover:brightness-110 active:scale-95"
          >
            Join Connexode <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </main>
  );
}
