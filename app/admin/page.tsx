"use client";

import { useState } from "react";
import { TRACKS, WEEKLY_TASKS, MOCK_USERS, SUBMISSIONS, MOCK_MENTOR_ASSIGNMENTS, type Track } from "@/lib/mock-data";
import { BookOpen, Users, GitBranch, ShieldAlert, Plus, LineChart, Code2, Award, Flame, Mail, GraduationCap } from "lucide-react";
import Link from "next/link";

type Tab = "students" | "mentors" | "tracks";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("students");
  const [tracks, setTracks] = useState<Track[]>(TRACKS);

  // Filter students out of MOCK_USERS
  const students = MOCK_USERS.filter((u) => u.role === "STUDENT");
  const mentors = MOCK_USERS.filter((u) => u.role === "MENTOR");

  const totalStudents = students.length;
  const totalTracks = tracks.length;
  const totalTasks = WEEKLY_TASKS.length;
  const totalSubmissions = SUBMISSIONS.length;

  return (
    <div className="min-h-screen bg-[#020B18] text-slate-100 px-6 py-8">
      {/* Header banner */}
      <header className="mx-auto max-w-7xl mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/8 pb-6">
        <div>
          <div className="flex items-center gap-2 text-purple-400 mb-1">
            <ShieldAlert size={16} />
            <span className="text-xs font-semibold uppercase tracking-wider">Administrator Workspace</span>
          </div>
          <h1 className="font-display text-3xl font-extrabold text-white">Connexode Management</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="rounded-xl border border-white/10 bg-white/5 px-4.5 py-2.5 text-xs font-bold hover:bg-white/8 transition-all"
          >
            Student Panel
          </Link>
          <Link
            href="/mentor"
            className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-4.5 py-2.5 text-xs font-bold text-cyan-400 hover:bg-cyan-500/15 transition-all"
          >
            Mentor Panel
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6">
        {/* Analytics KPIs */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/8 bg-white/4 p-5 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              <Users size={20} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total Interns</p>
              <h3 className="text-2xl font-extrabold text-white mt-0.5">{totalStudents}</h3>
            </div>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/4 p-5 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <GraduationCap size={20} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Active Tracks</p>
              <h3 className="text-2xl font-extrabold text-white mt-0.5">{totalTracks}</h3>
            </div>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/4 p-5 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <Code2 size={20} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total Tasks</p>
              <h3 className="text-2xl font-extrabold text-white mt-0.5">{totalTasks}</h3>
            </div>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/4 p-5 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.15)]">
              <GitBranch size={20} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Submissions</p>
              <h3 className="text-2xl font-extrabold text-white mt-0.5">{totalSubmissions}</h3>
            </div>
          </div>
        </section>

        {/* Tab Selection */}
        <section className="flex border-b border-white/8 gap-6 text-sm font-semibold">
          <button
            onClick={() => setActiveTab("students")}
            className={`pb-4 transition-all ${
              activeTab === "students" ? "text-cyan-400 border-b-2 border-cyan-400" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Enrolled Interns ({totalStudents})
          </button>
          <button
            onClick={() => setActiveTab("mentors")}
            className={`pb-4 transition-all ${
              activeTab === "mentors" ? "text-cyan-400 border-b-2 border-cyan-400" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Mentor Assignments ({mentors.length})
          </button>
          <button
            onClick={() => setActiveTab("tracks")}
            className={`pb-4 transition-all ${
              activeTab === "tracks" ? "text-cyan-400 border-b-2 border-cyan-400" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Course Curriculum Tracks ({totalTracks})
          </button>
        </section>

        {/* Dynamic Directory Grids */}
        <section className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl">
          {activeTab === "students" && (
            <div className="space-y-4">
              <h3 className="font-display text-lg font-bold text-white">Intern Directory</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-white/4 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-white/8">
                    <tr>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Track (Internship)</th>
                      <th className="px-6 py-4">Progress</th>
                      <th className="px-6 py-4">Streak</th>
                      <th className="px-6 py-4 text-right">Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/8">
                    {students.map((student) => {
                      const track = TRACKS.find((t) => t.id === student.enrolledTrackId);
                      return (
                        <tr key={student.id} className="hover:bg-white/4 transition-colors">
                          <td className="px-6 py-4 font-semibold text-white">
                            <div>
                              <p>{student.name}</p>
                              <p className="text-[10px] text-slate-500 font-medium">@{student.username}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold text-white"
                              style={{ backgroundColor: `${track?.color}15`, borderColor: `${track?.color}25` }}
                            >
                              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: track?.color }} />
                              {track?.title}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-400">
                            Week {student.currentWeek} · Day {student.currentDay}
                          </td>
                          <td className="px-6 py-4 font-semibold text-orange-400">
                            <span className="flex items-center gap-1">
                              <Flame size={14} />
                              {student.streak} days
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right font-bold text-cyan-400">
                            {student.points.toLocaleString()} pts
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "mentors" && (
            <div className="space-y-4">
              <h3 className="font-display text-lg font-bold text-white">Mentor Assignments</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-white/4 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-white/8">
                    <tr>
                      <th className="px-6 py-4">Mentor Name</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Assigned Track</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/8">
                    {mentors.map((mentor) => {
                      const assignments = MOCK_MENTOR_ASSIGNMENTS.filter((a) => a.mentorId === mentor.id);
                      return (
                        <tr key={mentor.id} className="hover:bg-white/4 transition-colors">
                          <td className="px-6 py-4 font-semibold text-white">
                            <div>
                              <p>{mentor.name}</p>
                              <p className="text-[10px] text-slate-500 font-medium">{mentor.rank}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-slate-400">
                            <span className="flex items-center gap-1.5">
                              <Mail size={13} />
                              {mentor.email}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-1">
                              {assignments.map((asg, i) => (
                                <span key={i} className="text-xs text-slate-300 font-medium">
                                  • {asg.trackTitle}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => alert("Reassigning mentors requires active database connectivity.")}
                              className="text-xs font-bold text-cyan-400 hover:underline"
                            >
                              Manage Assignments
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "tracks" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-display text-lg font-bold text-white">Curriculum Tracks</h3>
                <button
                  onClick={() => alert("Connecting database schema is required to persist new curricula tracks.")}
                  className="flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold text-white hover:bg-purple-700 transition-all"
                >
                  <Plus size={13} /> Add Track
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-white/4 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-white/8">
                    <tr>
                      <th className="px-6 py-4">Track Title</th>
                      <th className="px-6 py-4">Duration</th>
                      <th className="px-6 py-4">Associated Tasks</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/8">
                    {tracks.map((track) => {
                      const taskCount = WEEKLY_TASKS.filter((t) => t.trackId === track.id).length;
                      return (
                        <tr key={track.id} className="hover:bg-white/4 transition-colors">
                          <td className="px-6 py-4 font-semibold text-white flex items-center gap-3">
                            <span className="h-3.5 w-3.5 rounded-md shadow" style={{ backgroundColor: track.color }} />
                            {track.title}
                          </td>
                          <td className="px-6 py-4 text-slate-400">{track.durationWeeks} Weeks</td>
                          <td className="px-6 py-4 font-mono font-bold text-cyan-400">{taskCount} daily tasks</td>
                          <td className="px-6 py-4">
                            <span className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-xs font-semibold text-emerald-400">
                              Active
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
