"use client";

import { useState, useEffect } from "react";
import StatsRow from "@/components/dashboard/StatsRow";
import PhaseProgress from "@/components/dashboard/PhaseProgress";
import TaskList from "@/components/dashboard/TaskList";
import TrackRoadmap from "@/components/dashboard/TrackRoadmap";
import { getActiveUser, TRACKS, SUBMISSIONS, WEEKLY_TASKS, type User } from "@/lib/mock-data";
import { BadgeCheck, GitBranch } from "lucide-react";
import Link from "next/link";
import AdminDashboard from "../admin/page";
import MentorDashboard from "../mentor/page";

export default function DashboardPage() {
  const [activeUser, setActiveUser] = useState<User | null>(null);

  useEffect(() => {
    setActiveUser(getActiveUser());
  }, []);

  if (!activeUser) {
    return (
      <div className="flex h-64 items-center justify-center text-slate-400">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
      </div>
    );
  }

  // Role Redirection
  if (activeUser.role === "ADMIN") {
    return <AdminDashboard />;
  }

  if (activeUser.role === "MENTOR") {
    return <MentorDashboard />;
  }

  const track = TRACKS.find((t) => t.id === activeUser.enrolledTrackId)!;
  const currentWeek = activeUser.currentWeek;
  const weekTasks = WEEKLY_TASKS.filter(
    (t) => t.trackId === activeUser.enrolledTrackId && t.weekNo === currentWeek
  );
  const continueTask =
    weekTasks.find((t) => t.status === "IN_PROGRESS") ??
    weekTasks.find((t) => t.status === "SUBMITTED") ??
    weekTasks.find((t) => t.status !== "LOCKED") ??
    weekTasks[0];
  const pendingCount = SUBMISSIONS.filter(
    (s) => s.userId === activeUser.id && s.status === "PENDING"
  ).length;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Welcome banner */}
      <div
        className="relative overflow-hidden rounded-2xl border p-6"
        style={{
          borderColor: `${track.color}25`,
          background: `linear-gradient(135deg, ${track.color}10 0%, rgba(2,11,24,0) 60%)`,
        }}
      >
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl"
          style={{ backgroundColor: `${track.color}15` }}
        />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-1 text-sm text-slate-500">Welcome back 👋</p>
            <h2 className="font-display text-2xl font-extrabold text-white">
              {activeUser.name}
            </h2>
            <p className="mt-1 flex items-center gap-2 text-sm text-slate-400">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: track.color }}
              />
              {track.title}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            {pendingCount > 0 && (
              <div className="flex items-center gap-2 rounded-xl border border-blue-400/20 bg-blue-400/10 px-4 py-2.5 text-sm">
                <GitBranch size={14} className="text-blue-400" />
                <span className="text-slate-300">
                  <span className="font-semibold text-blue-400">{pendingCount} submission</span>
                  {pendingCount === 1 ? "" : "s"} pending review
                </span>
              </div>
            )}
            {continueTask ? (
              <Link
                href={`/dashboard/task/${continueTask.id}`}
                className="flex items-center gap-2 rounded-xl border border-yellow-400/20 bg-yellow-400/10 px-4 py-2.5 text-sm font-semibold text-yellow-400 transition-all hover:bg-yellow-400/15"
              >
                Continue: Day {continueTask.dayNo} — {continueTask.title} →
              </Link>
            ) : (
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-400">
                Week {currentWeek} tasks unlock soon.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <StatsRow />

      {/* Progress + Tasks — side by side on large screens */}
      <div className="grid gap-6 xl:grid-cols-[1fr_1.6fr]">
        <PhaseProgress />
        <TaskList weekNo={currentWeek} />
      </div>

      {/* 8-week roadmap */}
      <TrackRoadmap />

      {/* Recent Activity */}
      <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl">
        <h2 className="font-display mb-4 text-lg font-bold text-white">Recent Mentor Feedback</h2>
        <div className="space-y-3">
          {SUBMISSIONS.filter((s) => s.feedback).map((sub) => (
            <div
              key={sub.id}
              className="flex gap-4 rounded-xl border border-white/6 bg-white/4 p-4"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-400/15">
                <BadgeCheck size={16} className="text-emerald-400" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-200">{sub.taskTitle}</p>
                <p className="mt-1 text-xs italic text-slate-500">&quot;{sub.feedback}&quot;</p>
              </div>
              <span className="ml-auto shrink-0 text-xs text-emerald-400 font-bold">
                +{sub.points} pts
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
