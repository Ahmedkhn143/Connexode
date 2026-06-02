"use client";

import { useState } from "react";
import { TRACKS, WEEKLY_TASKS, MOCK_USERS, SUBMISSIONS, type Track } from "@/lib/mock-data";
import { BookOpen, Users, GitBranch, ShieldAlert, Plus, Edit3, Trash2, LineChart, Code2, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [tracks, setTracks] = useState<Track[]>(TRACKS);
  
  // Stats
  const totalStudents = MOCK_USERS.length;
  const totalTracks = tracks.length;
  const totalTasks = WEEKLY_TASKS.length;
  const totalSubmissions = SUBMISSIONS.length;

  const handleDeleteTrack = (id: string) => {
    if (confirm("Are you sure you want to delete this track? This will remove all associated weekly tasks.")) {
      setTracks((prev) => prev.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#020B18] text-slate-100 px-6 py-8">
      {/* Top Header */}
      <header className="mx-auto max-w-7xl mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/8 pb-6">
        <div>
          <div className="flex items-center gap-2 text-purple-400 mb-1">
            <ShieldAlert size={16} />
            <span className="text-xs font-semibold uppercase tracking-wider">Root Administrator Console</span>
          </div>
          <h1 className="font-display text-3xl font-extrabold text-white">System Controls</h1>
        </div>
        <div className="flex gap-4">
          <Link
            href="/dashboard"
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold hover:bg-white/10"
          >
            Back to Student View
          </Link>
          <Link
            href="/mentor"
            className="rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-5 py-2.5 text-sm font-semibold text-[#020B18] shadow-lg hover:shadow-cyan-500/20 hover:scale-[1.02] transition-all"
          >
            Go to Mentor View
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8">
        
        {/* KPI Cards Row */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          
          <div className="rounded-2xl border border-white/8 bg-white/4 p-5 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
              <Users size={22} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Total Interns</p>
              <h3 className="text-2xl font-extrabold text-white mt-0.5">{totalStudents.toLocaleString()}</h3>
            </div>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/4 p-5 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
              <BookOpen size={22} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Active Tracks</p>
              <h3 className="text-2xl font-extrabold text-white mt-0.5">{totalTracks}</h3>
            </div>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/4 p-5 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <Code2 size={22} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Total Daily Tasks</p>
              <h3 className="text-2xl font-extrabold text-white mt-0.5">{totalTasks}</h3>
            </div>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/4 p-5 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400">
              <GitBranch size={22} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Submissions</p>
              <h3 className="text-2xl font-extrabold text-white mt-0.5">{totalSubmissions}</h3>
            </div>
          </div>

        </section>

        {/* Tracks Management List */}
        <section className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-xl font-bold text-white">Course Curriculum Tracks</h2>
              <p className="text-xs text-slate-500 mt-1">Configure duration, labels, and publish status flags</p>
            </div>
            <button
              onClick={() => alert("Creating new tracks is connected to the backend API. Setup database integration to save data.")}
              className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-purple-700 hover:scale-[1.01] transition-all"
            >
              <Plus size={15} />
              Add Custom Track
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-white/4 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-white/8">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Duration</th>
                  <th className="px-6 py-4">Tags</th>
                  <th className="px-6 py-4">Associated Tasks</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/8">
                {tracks.map((track) => {
                  const associatedTasksCount = WEEKLY_TASKS.filter((t) => t.trackId === track.id).length;
                  return (
                    <tr key={track.id} className="hover:bg-white/4 transition-colors">
                      <td className="px-6 py-4 font-semibold text-white flex items-center gap-3">
                        <span
                          className="h-3.5 w-3.5 rounded-md shadow-sm"
                          style={{ backgroundColor: track.color }}
                        />
                        {track.title}
                      </td>
                      <td className="px-6 py-4 text-slate-400">{track.durationWeeks} Weeks</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          {track.tags.map((tag) => (
                            <span key={tag} className="rounded-md bg-white/5 border border-white/8 px-1.5 py-0.5 text-[10px] text-slate-500">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono font-semibold text-cyan-400">
                        {associatedTasksCount} tasks
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => alert("Editor pane will unlock once backend route handles are operational.")}
                            className="p-2 text-slate-500 hover:text-cyan-400 rounded-lg hover:bg-white/5 transition-colors"
                            title="Edit Track"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            onClick={() => handleDeleteTrack(track.id)}
                            className="p-2 text-slate-500 hover:text-red-400 rounded-lg hover:bg-white/5 transition-colors"
                            title="Delete Track"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Database Sync Gating Warning Card */}
        <section className="rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-6 flex flex-col sm:flex-row items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-yellow-400/10 text-yellow-400">
            <AlertTriangle size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-1">Prisma Schema Data Synchronization Gated</h4>
            <p className="text-xs leading-relaxed text-slate-400">
              The local state modifications above are currently running on static in-memory data. Run the setup command 
              <code className="mx-1 px-1 bg-white/5 border border-white/8 rounded font-mono text-[11px] text-cyan-400">npx prisma db seed</code> 
              to persist these records securely inside your configured database container.
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}
