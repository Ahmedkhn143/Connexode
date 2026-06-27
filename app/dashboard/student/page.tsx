// app/dashboard/student/page.tsx
// Student / Intern dashboard
// Shows: application status → if approved: track, roadmap, grades, AI advisor, certificate

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Clock, CheckCircle, XCircle, BookOpen,
  Award, Star, TrendingUp, ArrowRight, AlertCircle,
} from "lucide-react";
import { AICareerAdvisor } from "@/components/dashboard/AICareerAdvisor";

// 8-week roadmap topics per track
const trackRoadmap: Record<string, string[]> = {
  "Frontend Development": [
    "HTML & CSS fundamentals",
    "Flexbox & Grid layouts",
    "JavaScript ES6+",
    "DOM manipulation & events",
    "React basics & JSX",
    "React hooks & state",
    "API integration (fetch/axios)",
    "Final project — deploy to Vercel",
  ],
  "Full Stack": [
    "Node.js & Express basics",
    "REST API design",
    "MongoDB & Mongoose",
    "Authentication (JWT)",
    "React frontend setup",
    "Full-stack integration",
    "Deployment (Railway + Vercel)",
    "Final project — full-stack app",
  ],
  "AI & Automation": [
    "Python basics & environment",
    "Prompt engineering fundamentals",
    "OpenAI API integration",
    "LangChain basics",
    "Building a chatbot",
    "n8n workflow automation",
    "AI agent architecture",
    "Final project — AI-powered tool",
  ],
  "UI/UX Design": [
    "Design principles & typography",
    "Figma fundamentals",
    "User research & personas",
    "Wireframing",
    "High-fidelity mockups",
    "Design systems & components",
    "Prototyping & user testing",
    "Final project — full product design",
  ],
};

const statusConfig = {
  PENDING:      { icon: <Clock size={18} />,        color: "#F59E0B", bg: "rgba(245,158,11,0.1)",  border: "rgba(245,158,11,0.3)",  label: "Application pending",      desc: "We review applications within 3–5 days. Check back soon." },
  UNDER_REVIEW: { icon: <AlertCircle size={18} />,  color: "#7EC8D8", bg: "rgba(126,200,216,0.1)", border: "rgba(126,200,216,0.25)", label: "Under review",             desc: "Your application is being reviewed by our team. You'll hear back within 1–2 days." },
  APPROVED:     { icon: <CheckCircle size={18} />,  color: "#34D399", bg: "rgba(52,211,153,0.1)",  border: "rgba(52,211,153,0.25)",  label: "Approved — welcome!",      desc: "Your internship is active. Follow your roadmap below." },
  REJECTED:     { icon: <XCircle size={18} />,      color: "#F87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.25)", label: "Not selected this round",  desc: "Thank you for applying. You're welcome to re-apply in the next cohort." },
};

export default async function StudentDashboard() {
  const session = await auth();
  if (!session?.user) redirect("/auth/signin");

  const userEmail = session.user.email!;

  // Fetch application + stats + certificate
  const application = await prisma.application.findFirst({
    where: { email: userEmail, type: "INTERNSHIP" },
    orderBy: { createdAt: "desc" },
  });

  const internStats = application
    ? await prisma.internStats.findUnique({
        where: { applicationId: application.id },
      }).catch(() => null)
    : null;

  const certificate = await prisma.certificate.findFirst({
    where: { user: { email: userEmail } },
  }).catch(() => null);

  const user = session.user as { name?: string };
  const status = application?.status ?? null;
  const sc = status ? statusConfig[status as keyof typeof statusConfig] : null;
  const track = application?.track ?? "Frontend Development";
  const roadmap = trackRoadmap[track] ?? trackRoadmap["Frontend Development"];
  const tasksCompleted = internStats?.tasksCompleted ?? 0;
  const avgScore = internStats?.averageScore ?? 0;
  const isApproved = status === "APPROVED";

  return (
    <div className="space-y-8 py-8">

      {/* ── Welcome header ── */}
      <div className="flex items-start justify-between">
        <div>
          <p style={{ color: "#7EC8D8" }} className="mb-1 text-xs font-medium uppercase tracking-widest">
            Welcome back
          </p>
          <h1 style={{ color: "#E8F4F8" }} className="text-2xl font-bold">
            {user.name ?? "Student"} 👋
          </h1>
          {application && (
            <p style={{ color: "rgba(126,200,216,0.4)" }} className="mt-1 text-sm">
              {track} · Connexode Internship Program
            </p>
          )}
        </div>
        {certificate && (
          <Link
            href={`/verify?q=${certificate.certId}`}
            style={{
              backgroundColor: "rgba(24,128,128,0.12)",
              border: "1px solid rgba(24,128,128,0.3)",
              color: "#7EC8D8",
            }}
            className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all hover:bg-[rgba(24,128,128,0.2)]"
          >
            <Award size={13} /> View certificate
          </Link>
        )}
      </div>

      {/* ── No application state ── */}
      {!application && (
        <div
          style={{ backgroundColor: "#082038", border: "1px solid rgba(126,200,216,0.12)" }}
          className="rounded-2xl p-8 text-center"
        >
          <BookOpen size={32} style={{ color: "rgba(126,200,216,0.2)" }} className="mx-auto mb-4" />
          <h2 style={{ color: "#E8F4F8" }} className="mb-2 text-lg font-bold">
            No internship application found
          </h2>
          <p style={{ color: "rgba(126,200,216,0.45)" }} className="mb-6 text-sm leading-relaxed">
            Apply using the same email address you used to create this account.
          </p>
          <Link
            href="/join/internship"
            style={{ backgroundColor: "#188080", color: "#E8F4F8" }}
            className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all hover:brightness-110"
          >
            Apply for internship <ArrowRight size={14} />
          </Link>
        </div>
      )}

      {/* ── Application status banner ── */}
      {application && sc && (
        <div
          style={{ backgroundColor: sc.bg, border: `1px solid ${sc.border}` }}
          className="flex items-start gap-3 rounded-xl px-5 py-4"
        >
          <span style={{ color: sc.color, marginTop: 1 }}>{sc.icon}</span>
          <div>
            <p style={{ color: sc.color }} className="text-sm font-semibold">{sc.label}</p>
            <p style={{ color: "rgba(126,200,216,0.55)" }} className="mt-0.5 text-xs leading-relaxed">
              {sc.desc}
            </p>
          </div>
        </div>
      )}

      {/* ── Approved content ── */}
      {isApproved && (
        <>
          {/* Stats row */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { icon: <BookOpen size={16} />,    label: "Tasks completed",  value: `${tasksCompleted}/8`,                 color: "#7EC8D8" },
              { icon: <Star size={16} />,        label: "Average score",    value: avgScore ? `${Math.round(avgScore)}/100` : "—", color: "#F59E0B" },
              { icon: <TrendingUp size={16} />,  label: "Progress",         value: `${Math.round((tasksCompleted / 8) * 100)}%`, color: "#34D399" },
              { icon: <Award size={16} />,       label: "Certificate",      value: certificate ? "Issued ✓" : "Pending",  color: certificate ? "#34D399" : "rgba(126,200,216,0.4)" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{ backgroundColor: "#082038", border: "1px solid rgba(126,200,216,0.1)" }}
                className="rounded-xl p-4"
              >
                <span
                  style={{ backgroundColor: `${stat.color}18`, color: stat.color }}
                  className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg"
                >
                  {stat.icon}
                </span>
                <p style={{ color: "#E8F4F8" }} className="text-lg font-bold">{stat.value}</p>
                <p style={{ color: "rgba(126,200,216,0.4)" }} className="text-xs">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* 8-week roadmap */}
          <div
            style={{ backgroundColor: "#082038", border: "1px solid rgba(126,200,216,0.1)" }}
            className="rounded-2xl p-6"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 style={{ color: "#E8F4F8" }} className="text-base font-bold">
                8-week roadmap — {track}
              </h2>
              <span
                style={{ color: "rgba(126,200,216,0.4)", border: "1px solid rgba(126,200,216,0.15)" }}
                className="rounded-full px-3 py-1 text-xs"
              >
                Week {tasksCompleted + 1} of 8
              </span>
            </div>

            <div className="space-y-3">
              {roadmap.map((topic, i) => {
                const done    = i < tasksCompleted;
                const current = i === tasksCompleted;
                return (
                  <div
                    key={i}
                    style={{
                      backgroundColor: current
                        ? "rgba(24,128,128,0.12)"
                        : done
                        ? "rgba(4,12,24,0.3)"
                        : "rgba(4,12,24,0.2)",
                      border: `1px solid ${current
                        ? "rgba(24,128,128,0.35)"
                        : done
                        ? "rgba(52,211,153,0.15)"
                        : "rgba(126,200,216,0.07)"}`,
                    }}
                    className="flex items-center gap-3 rounded-xl px-4 py-3"
                  >
                    {/* Week indicator */}
                    <span
                      style={{
                        backgroundColor: done
                          ? "rgba(52,211,153,0.15)"
                          : current
                          ? "rgba(24,128,128,0.2)"
                          : "rgba(8,32,56,0.8)",
                        color: done ? "#34D399" : current ? "#7EC8D8" : "rgba(126,200,216,0.25)",
                        border: `1px solid ${done ? "rgba(52,211,153,0.25)" : current ? "rgba(24,128,128,0.35)" : "rgba(126,200,216,0.1)"}`,
                        width: 32,
                        height: 32,
                        flexShrink: 0,
                      }}
                      className="flex items-center justify-center rounded-full text-xs font-bold"
                    >
                      {done ? "✓" : `W${i + 1}`}
                    </span>

                    {/* Topic */}
                    <p
                      style={{
                        color: done
                          ? "rgba(126,200,216,0.45)"
                          : current
                          ? "#E8F4F8"
                          : "rgba(126,200,216,0.35)",
                        fontWeight: current ? 600 : 400,
                      }}
                      className="flex-1 text-sm"
                    >
                      {topic}
                    </p>

                    {/* Current badge */}
                    {current && (
                      <span
                        style={{
                          backgroundColor: "rgba(24,128,128,0.2)",
                          border: "1px solid rgba(24,128,128,0.35)",
                          color: "#7EC8D8",
                        }}
                        className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                      >
                        Current
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Career Advisor */}
          <AICareerAdvisor
            user={{
              role: "intern",
              name: user.name ?? "Student",
              track,
              tasksCompleted,
              totalTasks: 8,
              averageScore: Math.round(avgScore),
              weakAreas: [],
              completedTopics: roadmap.slice(0, tasksCompleted),
            }}
          />
        </>
      )}
    </div>
  );
}
