import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Share2, MessageCircle } from "lucide-react";
import ProfileHeader from "@/components/profile/ProfileHeader";
import BadgeGrid from "@/components/profile/BadgeGrid";
import ProjectShowcase from "@/components/profile/ProjectShowcase";
import CertificateCard from "@/components/profile/CertificateCard";
import { MOCK_USER, TRACKS, BADGES, SUBMISSIONS, WEEKLY_TASKS } from "@/lib/mock-data";

interface PageProps {
  params: Promise<{ username: string }>;
  searchParams?: Promise<{ view?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  const user = username === MOCK_USER.username ? MOCK_USER : null;
  return {
    title: user ? `${user.name} — Connexode Profile` : "Profile — Connexode",
    description: user
      ? `View ${user.name}'s verified internship profile, skill badges, and project submissions on Connexode.`
      : "Student profile on Connexode.",
  };
}

export default async function PublicProfilePage({ params, searchParams }: PageProps) {
  const { username } = await params;
  const { view } = (await searchParams) || {};
  const showOnlyBadges = view === "badges";

  // For the demo, only our mock user exists
  if (username !== MOCK_USER.username) notFound();

  const user = MOCK_USER;
  const track = TRACKS.find((t) => t.id === user.enrolledTrackId)!;

  const approvedSubmissions = SUBMISSIONS.filter(
    (s) => s.userId === user.id && s.status === "APPROVED"
  );

  const dynamicBadges = BADGES.map((badge) => {
    let earned = badge.earned;
    if (badge.id === "badge_001") {
      earned = approvedSubmissions.length > 0;
    } else if (badge.id === "badge_002") {
      const week1TasksCount = WEEKLY_TASKS.filter(
        (t) => t.trackId === user.enrolledTrackId && t.weekNo === 1
      ).length;
      const week1ApprovedCount = approvedSubmissions.filter((s) => {
        const task = WEEKLY_TASKS.find((t) => t.id === s.taskId);
        return task?.weekNo === 1;
      }).length;
      earned = week1ApprovedCount >= week1TasksCount && week1TasksCount > 0;
    } else if (badge.id === "badge_004") {
      earned = approvedSubmissions.some((s) =>
        s.taskTitle.toLowerCase().includes("navbar") || s.taskTitle.toLowerCase().includes("hero")
      );
    }
    return { ...badge, earned };
  });

  const totalTasksCount = WEEKLY_TASKS.filter((t) => t.trackId === user.enrolledTrackId).length;
  const completedCount = approvedSubmissions.length;

  return (
    <div className="min-h-screen bg-[#020B18] px-6 py-10">
      {/* Background glow */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background: `radial-gradient(ellipse at 20% 0%, ${track.color}08 0%, transparent 50%)`,
        }}
      />

      <div className="relative mx-auto max-w-5xl">
        {/* Back link */}
        <Link
          href="/dashboard"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-cyan-400"
        >
          <ArrowLeft size={14} />
          Back to Dashboard
        </Link>

        {/* Page header label */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-600">
            Public Profile · /u/{user.username}
          </p>
          {/* Social share */}
          <div className="flex items-center gap-2">
            {[ExternalLink, Share2, MessageCircle].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-slate-600 transition-all hover:border-cyan-400/30 hover:text-cyan-400"
              >
                <Icon size={13} />
              </a>
            ))}
          </div>
        </div>

        {/* Profile Header */}
        {!showOnlyBadges && (
          <div className="mb-6">
            <ProfileHeader user={user} track={track} />
          </div>
        )}

        {/* Main Grid */}
        {showOnlyBadges ? (
          <div className="space-y-6">
            <BadgeGrid badges={dynamicBadges} />
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            {/* Left column */}
            <div className="space-y-6">
              <BadgeGrid badges={dynamicBadges} />
              <ProjectShowcase submissions={SUBMISSIONS} />
            </div>

            {/* Right column */}
            <div className="space-y-6">
              <CertificateCard user={user} track={track} />

              {/* Quick stats card */}
              <div className="rounded-2xl border border-white/8 bg-white/4 p-5 backdrop-blur-xl">
                <h3 className="font-display mb-4 text-sm font-bold text-white">Activity Summary</h3>
                <div className="space-y-3">
                  {[
                    { label: "Tasks Completed", value: `${completedCount} / ${totalTasksCount}` },
                    { label: "Total Points", value: user.points.toLocaleString() },
                    { label: "Current Streak", value: `${user.streak} days` },
                    { label: "Campus Rank", value: user.rank },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">{item.label}</span>
                      <span className="font-semibold text-slate-200">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
