// app/dashboard/ambassador/page.tsx
// Ambassador dashboard
// Shows: application status → if approved: growth stats, badge, resources, AI advisor

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Clock, CheckCircle, XCircle, Users,
  Mic, TrendingUp, Award, AlertCircle,
  ArrowRight, BookOpen, Star,
} from "lucide-react";
import { AICareerAdvisor } from "@/components/dashboard/AICareerAdvisor";

const statusConfig = {
  PENDING:      { icon: <Clock size={18} />,       color: "#F59E0B", bg: "rgba(245,158,11,0.1)",  border: "rgba(245,158,11,0.3)",  label: "Application pending",     desc: "We review applications within 3–5 days." },
  UNDER_REVIEW: { icon: <AlertCircle size={18} />, color: "#7EC8D8", bg: "rgba(126,200,216,0.1)", border: "rgba(126,200,216,0.25)", label: "Under review",            desc: "Your application is being reviewed. You'll hear back within 1–2 days." },
  APPROVED:     { icon: <CheckCircle size={18} />, color: "#34D399", bg: "rgba(52,211,153,0.1)",  border: "rgba(52,211,153,0.25)",  label: "Active ambassador",       desc: "You're an active Connexode campus ambassador." },
  REJECTED:     { icon: <XCircle size={18} />,     color: "#F87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.25)", label: "Not selected this round", desc: "Thank you for applying. You're welcome to re-apply in the next cohort." },
};

function getBadge(reach: number, sessions: number) {
  if (reach >= 2000 || sessions >= 20) return { label: "Platinum", color: "#E2E8F0", next: null,          needed: 0    };
  if (reach >= 1000 || sessions >= 12) return { label: "Gold",     color: "#F59E0B", next: "Platinum",    needed: 2000 - reach };
  if (reach >= 500  || sessions >= 6)  return { label: "Silver",   color: "#94A3B8", next: "Gold",        needed: 1000 - reach };
  if (reach >= 100  || sessions >= 2)  return { label: "Bronze",   color: "#C084FC", next: "Silver",      needed: 500  - reach };
  return                                       { label: "Rising",   color: "#7EC8D8", next: "Bronze",      needed: 100  - reach };
}

const resources = [
  { title: "AI Tools Quick Guide",          desc: "20 AI tools every student should know",      tag: "PDF" },
  { title: "Social Media Growth Playbook",  desc: "How to grow from 0 to 1,000 followers",      tag: "Guide" },
  { title: "How to Run a Campus Webinar",   desc: "Step-by-step checklist for your first event", tag: "Checklist" },
  { title: "Content Calendar Template",     desc: "30-day posting schedule for ambassadors",     tag: "Template" },
];

export default async function AmbassadorDashboard() {
  const session = await auth();
  if (!session?.user) redirect("/auth/signin");

  const userEmail = session.user.email!;

  const application = await prisma.application.findFirst({
    where: { email: userEmail, type: "AMBASSADOR" },
    orderBy: { createdAt: "desc" },
  });

  const ambStats = application
    ? await prisma.ambassadorStats.findUnique({
        where: { applicationId: application.id },
      }).catch(() => null)
    : null;

  const user = session.user as { name?: string };
  const status    = application?.status ?? null;
  const sc        = status ? statusConfig[status as keyof typeof statusConfig] : null;
  const isApproved = status === "APPROVED";

  const sessionsHosted  = ambStats?.sessionsHosted  ?? 0;
  const webinarsHosted  = ambStats?.webinarsHosted  ?? 0;
  const communityReach  = ambStats?.communityReach  ?? 0;
  const badge           = getBadge(communityReach, sessionsHosted);

  return (
    <div className="space-y-8 py-8">

      {/* ── Welcome header ── */}
      <div className="flex items-start justify-between">
        <div>
          <p style={{ color: "#7EC8D8" }} className="mb-1 text-xs font-medium uppercase tracking-widest">
            Welcome back
          </p>
          <h1 style={{ color: "#E8F4F8" }} className="text-2xl font-bold">
            {user.name ?? "Ambassador"} 👋
          </h1>
          {isApproved && (
            <p style={{ color: "rgba(126,200,216,0.4)" }} className="mt-1 text-sm">
              Campus Ambassador · Connexode
            </p>
          )}
        </div>
        {isApproved && (
          <div
            style={{
              backgroundColor: `${badge.color}18`,
              border: `1px solid ${badge.color}44`,
            }}
            className="flex items-center gap-2 rounded-full px-4 py-2"
          >
            <Star size={13} style={{ color: badge.color }} />
            <span style={{ color: badge.color }} className="text-xs font-bold">
              {badge.label} Ambassador
            </span>
          </div>
        )}
      </div>

      {/* ── No application ── */}
      {!application && (
        <div
          style={{ backgroundColor: "#082038", border: "1px solid rgba(126,200,216,0.12)" }}
          className="rounded-2xl p-8 text-center"
        >
          <Users size={32} style={{ color: "rgba(126,200,216,0.2)" }} className="mx-auto mb-4" />
          <h2 style={{ color: "#E8F4F8" }} className="mb-2 text-lg font-bold">
            No ambassador application found
          </h2>
          <p style={{ color: "rgba(126,200,216,0.45)" }} className="mb-6 text-sm">
            Apply using the same email you used to create this account.
          </p>
          <Link
            href="/join/ambassador"
            style={{ backgroundColor: "#188080", color: "#E8F4F8" }}
            className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all hover:brightness-110"
          >
            Apply as ambassador <ArrowRight size={14} />
          </Link>
        </div>
      )}

      {/* ── Status banner ── */}
      {application && sc && (
        <div
          style={{ backgroundColor: sc.bg, border: `1px solid ${sc.border}` }}
          className="flex items-start gap-3 rounded-xl px-5 py-4"
        >
          <span style={{ color: sc.color, marginTop: 1 }}>{sc.icon}</span>
          <div>
            <p style={{ color: sc.color }} className="text-sm font-semibold">{sc.label}</p>
            <p style={{ color: "rgba(126,200,216,0.55)" }} className="mt-0.5 text-xs">{sc.desc}</p>
          </div>
        </div>
      )}

      {/* ── Approved content ── */}
      {isApproved && (
        <>
          {/* Growth stats */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { icon: <Mic size={16} />,        label: "Sessions hosted",  value: sessionsHosted,              color: "#7EC8D8" },
              { icon: <BookOpen size={16} />,   label: "Webinars hosted",  value: webinarsHosted,              color: "#A78BFA" },
              { icon: <Users size={16} />,      label: "Community reach",  value: communityReach.toLocaleString(), color: "#34D399" },
              { icon: <TrendingUp size={16} />, label: "Next badge in",    value: badge.next ? `${badge.needed} reach` : "Max tier ✓", color: "#F59E0B" },
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

          {/* Badge progress */}
          {badge.next && (
            <div
              style={{ backgroundColor: "#082038", border: "1px solid rgba(126,200,216,0.1)" }}
              className="rounded-xl px-6 py-5"
            >
              <div className="mb-3 flex items-center justify-between">
                <p style={{ color: "#E8F4F8" }} className="text-sm font-semibold">
                  Progress to {badge.next}
                </p>
                <p style={{ color: "rgba(126,200,216,0.4)" }} className="text-xs">
                  {communityReach} / {communityReach + badge.needed} reach
                </p>
              </div>
              <div
                style={{ backgroundColor: "rgba(8,32,56,0.8)", borderRadius: 100 }}
                className="h-2 w-full overflow-hidden"
              >
                <div
                  style={{
                    width: `${Math.min(100, (communityReach / (communityReach + badge.needed)) * 100)}%`,
                    background: "linear-gradient(90deg, #188080, #7EC8D8)",
                    borderRadius: 100,
                    transition: "width 0.6s ease",
                  }}
                  className="h-full"
                />
              </div>
              <p style={{ color: "rgba(126,200,216,0.35)" }} className="mt-2 text-xs">
                {badge.needed} more people reached to unlock {badge.next} badge
              </p>
            </div>
          )}

          {/* Resource library */}
          <div>
            <h2 style={{ color: "#E8F4F8" }} className="mb-4 text-base font-bold">
              Resource library
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {resources.map((r) => (
                <div
                  key={r.title}
                  style={{ backgroundColor: "#082038", border: "1px solid rgba(126,200,216,0.1)" }}
                  className="flex items-start gap-4 rounded-xl p-4 transition-all hover:border-[rgba(126,200,216,0.25)]"
                >
                  <span
                    style={{ backgroundColor: "rgba(24,128,128,0.15)", border: "1px solid rgba(24,128,128,0.25)", color: "#7EC8D8" }}
                    className="flex h-9 w-9 items-center justify-center rounded-lg flex-shrink-0"
                  >
                    <Award size={15} strokeWidth={1.5} />
                  </span>
                  <div className="min-w-0">
                    <div className="mb-0.5 flex items-center gap-2">
                      <p style={{ color: "#E8F4F8" }} className="truncate text-sm font-semibold">{r.title}</p>
                      <span
                        style={{ backgroundColor: "rgba(126,200,216,0.08)", border: "1px solid rgba(126,200,216,0.15)", color: "rgba(126,200,216,0.5)" }}
                        className="flex-shrink-0 rounded-full px-2 py-0.5 text-[9px] font-medium uppercase"
                      >
                        {r.tag}
                      </span>
                    </div>
                    <p style={{ color: "rgba(126,200,216,0.4)" }} className="text-xs leading-snug">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard link */}
          <Link
            href="/community/leaderboard"
            style={{ backgroundColor: "#082038", border: "1px solid rgba(126,200,216,0.1)" }}
            className="flex items-center justify-between rounded-xl px-5 py-4 transition-all hover:border-[rgba(126,200,216,0.3)]"
          >
            <div className="flex items-center gap-3">
              <TrendingUp size={16} style={{ color: "#7EC8D8" }} />
              <div>
                <p style={{ color: "#E8F4F8" }} className="text-sm font-semibold">View leaderboard</p>
                <p style={{ color: "rgba(126,200,216,0.4)" }} className="text-xs">See where you rank among all ambassadors</p>
              </div>
            </div>
            <ArrowRight size={14} style={{ color: "rgba(126,200,216,0.4)" }} />
          </Link>

          {/* AI Career Advisor */}
          <AICareerAdvisor
            user={{
              role: "ambassador",
              name: user.name ?? "Ambassador",
              sessionsHosted,
              webinarsHosted,
              communityReach,
              currentBadge: badge.label,
              nextBadgeTarget: communityReach + badge.needed,
            }}
          />
        </>
      )}
    </div>
  );
}
