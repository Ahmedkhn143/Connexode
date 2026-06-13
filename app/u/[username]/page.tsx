"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Share2, MessageCircle } from "lucide-react";
import ProfileHeader from "@/components/profile/ProfileHeader";
import BadgeGrid from "@/components/profile/BadgeGrid";
import ProjectShowcase from "@/components/profile/ProjectShowcase";
import CertificateCard from "@/components/profile/CertificateCard";
import { MOCK_USER, TRACKS, BADGES, AMBASSADOR_BADGES, SUBMISSIONS, WEEKLY_TASKS, type User } from "@/lib/mock-data";

interface PageProps {
  params: Promise<{ username: string }>;
  searchParams?: Promise<{ view?: string }>;
}

export default function PublicProfilePage({ params, searchParams }: PageProps) {
  const { username } = use(params);
  const resolvedSearchParams = searchParams ? use(searchParams) : {};
  const view = resolvedSearchParams?.view;
  const showOnlyBadges = view === "badges";

  const [user, setUser] = useState<User | null>(null);
  const [isAmbassador, setIsAmbassador] = useState(false);
  const [outreachSubmissions, setOutreachSubmissions] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Try to find user in dynamic users in localStorage
    const dynamicUsersRaw = localStorage.getItem("connexode_dynamic_users");
    let foundUser: User | null = null;
    if (dynamicUsersRaw) {
      try {
        const dynamicUsers = JSON.parse(dynamicUsersRaw);
        const found = dynamicUsers.find((u: any) => u.username === username);
        if (found) {
          foundUser = found;
        }
      } catch (e) {
        console.error(e);
      }
    }

    // 2. Try static users if not found
    if (!foundUser) {
      const isMockUser = username === MOCK_USER.username;
      if (isMockUser) {
        foundUser = MOCK_USER;
      } else {
        // Fallback shell
        foundUser = {
          ...MOCK_USER,
          id: `usr_fallback_${username}`,
          username,
          name: username
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c: string) => c.toUpperCase()),
          avatarInitials: username.substring(0, 2).toUpperCase(),
          points: 0,
          streak: 0,
          rank: "—",
          enrolledTrackId: MOCK_USER.enrolledTrackId,
        };
      }
    }

    setUser(foundUser);

    if (foundUser) {
      const storedApps = localStorage.getItem("connexode_ambassador_applications");
      if (storedApps) {
        try {
          const apps = JSON.parse(storedApps);
          const userApp = apps.find((a: any) => a.email.toLowerCase() === foundUser!.email.toLowerCase());
          if (userApp && userApp.status === "APPROVED") {
            setIsAmbassador(true);
          }
        } catch (e) {
          console.error(e);
        }
      }

      const storedSubs = localStorage.getItem("connexode_outreach_submissions");
      if (storedSubs) {
        try {
          const subs = JSON.parse(storedSubs);
          setOutreachSubmissions(subs.filter((s: any) => s.email.toLowerCase() === foundUser!.email.toLowerCase()));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [username]);

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#020B18] text-slate-400">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
      </div>
    );
  }

  const isMockUser = user.id === MOCK_USER.id;
  const track = TRACKS.find((t) => t.id === user.enrolledTrackId) ?? TRACKS[0]!;

  const approvedSubmissions = isMockUser
    ? SUBMISSIONS.filter((s) => s.userId === MOCK_USER.id && s.status === "APPROVED")
    : [];

  const approvedOutreach = outreachSubmissions.filter((s) => s.status === "APPROVED");
  const totalOutreachPoints = approvedOutreach.reduce((sum, curr) => sum + (curr.pointsEarned || 0), 0);

  const dynamicBadges = isAmbassador
    ? AMBASSADOR_BADGES.map((badge) => {
        let earned = false;
        let earnedDate = undefined;

        if (badge.id === "amb_badge_001") {
          const sub = approvedOutreach.find((s) => s.taskLabel.includes("Task A") || s.taskLabel.toLowerCase().includes("linkedin"));
          earned = !!sub;
          earnedDate = sub?.submittedAt?.split("T")[0];
        } else if (badge.id === "amb_badge_002") {
          const sub = approvedOutreach.find((s) => s.taskLabel.includes("Task B") || s.taskLabel.toLowerCase().includes("seminar"));
          earned = !!sub;
          earnedDate = sub?.submittedAt?.split("T")[0];
        } else if (badge.id === "amb_badge_003") {
          const sub = approvedOutreach.find((s) => s.taskLabel.includes("Task C") || s.taskLabel.toLowerCase().includes("dev group"));
          earned = !!sub;
          earnedDate = sub?.submittedAt?.split("T")[0];
        } else if (badge.id === "amb_badge_004") {
          const sub = approvedOutreach.find((s) => s.taskLabel.includes("Task D") || s.taskLabel.toLowerCase().includes("onboard"));
          earned = !!sub;
          earnedDate = sub?.submittedAt?.split("T")[0];
        } else if (badge.id === "amb_badge_005") {
          earned = totalOutreachPoints >= 500;
        } else if (badge.id === "amb_badge_006") {
          earned = totalOutreachPoints >= 1000;
        }

        return { ...badge, earned, earnedDate };
      })
    : BADGES.map((badge) => {
        let earned = isMockUser ? badge.earned : false;
        if (isMockUser) {
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
            earned = approvedSubmissions.some(
              (s) =>
                s.taskTitle.toLowerCase().includes("navbar") ||
                s.taskTitle.toLowerCase().includes("hero")
            );
          }
        }
        return { ...badge, earned };
      });

  const totalTasksCount = WEEKLY_TASKS.filter(
    (t) => t.trackId === user.enrolledTrackId
  ).length;
  const completedCount = approvedSubmissions.length;

  return (
    <div className="min-h-screen bg-[#020B18] px-6 py-10 text-slate-100">
      {/* Background glow */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background: isAmbassador
            ? `radial-gradient(ellipse at 20% 0%, #EAB30808 0%, transparent 50%)`
            : `radial-gradient(ellipse at 20% 0%, ${track.color}08 0%, transparent 50%)`,
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
          {/* Social share icons */}
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
            {!isMockUser && (
              isAmbassador ? (
                <div className="rounded-2xl border border-yellow-500/10 bg-yellow-500/4 p-6 text-center text-sm text-slate-400">
                  🏆 Complete campus outreach tasks to unlock Ambassador badges and level up your status!
                </div>
              ) : (
                <div className="rounded-2xl border border-cyan-500/10 bg-cyan-500/4 p-6 text-center text-sm text-slate-400">
                  🏆 Complete tasks in your internship to unlock badges and level up your profile!
                </div>
              )
            )}
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            {/* Left column */}
            <div className="space-y-6">
              {isAmbassador ? (
                <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl">
                  <h2 className="font-display mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">Outreach Campaign Portfolio</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 text-slate-500">
                          <th className="pb-3 pr-4">Task</th>
                          <th className="pb-3 pr-4">Topic / Title</th>
                          <th className="pb-3 pr-4">Peers Reached</th>
                          <th className="pb-3 pr-4">Date</th>
                          <th className="pb-3 text-right">Points</th>
                        </tr>
                      </thead>
                      <tbody>
                        {approvedOutreach.map((s) => (
                          <tr key={s.id} className="border-b border-white/5 text-slate-300">
                            <td className="py-3 pr-4 max-w-[150px] truncate">{s.taskLabel}</td>
                            <td className="py-3 pr-4 font-bold text-white">{s.title}</td>
                            <td className="py-3 pr-4 font-mono">{s.peersReached}</td>
                            <td className="py-3 pr-4 font-mono">{new Date(s.submittedAt).toLocaleDateString()}</td>
                            <td className="py-3 text-right font-bold text-yellow-400">+{s.pointsEarned || 0} PTS</td>
                          </tr>
                        ))}
                        {approvedOutreach.length === 0 && (
                          <tr>
                            <td colSpan={5} className="text-center text-slate-500 py-6 italic">No outreach campaigns approved yet.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <ProjectShowcase submissions={isMockUser ? SUBMISSIONS : []} />
              )}
            </div>

            {/* Right column */}
            <div className="space-y-6">
              {!isAmbassador && <CertificateCard user={user} track={track} />}

              {/* Quick stats card */}
              <div className="rounded-2xl border border-white/8 bg-white/4 p-5 backdrop-blur-xl">
                <h3 className="font-display mb-4 text-sm font-bold text-white">
                  Activity Summary
                </h3>
                <div className="space-y-3">
                  {isAmbassador ? (
                    [
                      {
                        label: "Outreach Submissions",
                        value: `${approvedOutreach.length} approved`,
                      },
                      { label: "Total Ambassador Points", value: totalOutreachPoints.toLocaleString() },
                      { label: "Current Streak", value: `${user.streak} days` },
                      { label: "Role Level", value: "Campus Tech Lead" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-slate-500">{item.label}</span>
                        <span className="font-semibold text-slate-200">{item.value}</span>
                      </div>
                    ))
                  ) : (
                    [
                      {
                        label: "Tasks Completed",
                        value: `${completedCount} / ${totalTasksCount}`,
                      },
                      { label: "Total Points", value: user.points.toLocaleString() },
                      { label: "Current Streak", value: `${user.streak} days` },
                      { label: "Campus Rank", value: user.rank },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-slate-500">{item.label}</span>
                        <span className="font-semibold text-slate-200">{item.value}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
