"use client";

import { useState, useEffect } from "react";
import { SUBMISSIONS, WEEKLY_TASKS, MOCK_USERS, MOCK_MENTOR_ASSIGNMENTS, getActiveUser, type Submission, type SubmissionStatus, type User } from "@/lib/mock-data";
import { CheckCircle2, XCircle, Clock, ExternalLink, Globe, Send, ShieldAlert, Award, FileCode, Users, ListFilter, ClipboardCheck } from "lucide-react";
import Link from "next/link";

type SubFilter = "ALL" | "PENDING" | "APPROVED" | "REJECTED";

export default function MentorDashboard() {
  const [activeMentor, setActiveMentor] = useState<User | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedSubId, setSelectedSubId] = useState<string>("");
  const [filter, setFilter] = useState<SubFilter>("ALL");
  const [feedback, setFeedback] = useState("");
  const [gradeStatus, setGradeStatus] = useState<SubmissionStatus>("APPROVED");

  useEffect(() => {
    setActiveMentor(getActiveUser());
    setSubmissions(SUBMISSIONS);
  }, []);

  // Determine tracks assigned to this mentor
  const mentorAssignments = activeMentor
    ? MOCK_MENTOR_ASSIGNMENTS.filter((a) => a.mentorId === activeMentor.id)
    : [];
  const assignedTrackIds = mentorAssignments.map((a) => a.trackId);

  // Filter students enrolled in mentor's tracks
  const assignedStudents = MOCK_USERS.filter(
    (u) => u.role === "STUDENT" && assignedTrackIds.includes(u.enrolledTrackId)
  );

  // Submissions for mentor's tracks
  const mentorSubmissions = submissions.filter((sub) => {
    const task = WEEKLY_TASKS.find((t) => t.id === sub.taskId);
    return task && assignedTrackIds.includes(task.trackId);
  });

  // Filtered queue
  const filteredSubmissions = mentorSubmissions.filter((sub) => {
    if (filter === "ALL") return true;
    return sub.status === filter;
  });

  // Auto-select first in queue on load/filter change
  useEffect(() => {
    if (filteredSubmissions.length > 0 && !filteredSubmissions.some((s) => s.id === selectedSubId)) {
      setSelectedSubId(filteredSubmissions[0].id);
    }
  }, [filteredSubmissions, selectedSubId]);

  const selectedSub = submissions.find((s) => s.id === selectedSubId);
  const selectedTask = selectedSub ? WEEKLY_TASKS.find((t) => t.id === selectedSub.taskId) : null;
  const selectedUser = selectedSub ? MOCK_USERS.find((u) => u.id === selectedSub.userId) : null;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSub) return;

    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === selectedSub.id
          ? {
              ...sub,
              status: gradeStatus,
              feedback: feedback || "Looks good! Great code formatting.",
              reviewedAt: new Date().toISOString(),
              points: gradeStatus === "APPROVED" ? (selectedTask?.points || 100) : 0,
            }
          : sub
      )
    );
    alert(`Submission status updated to ${gradeStatus}!`);
    setFeedback("");
  };

  const pendingCount = mentorSubmissions.filter((s) => s.status === "PENDING").length;

  if (!activeMentor) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#020B18] text-slate-400">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020B18] text-slate-100 px-6 py-8">
      {/* Top Header */}
      <header className="mx-auto max-w-7xl mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/8 pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 mb-1">
            <ShieldAlert size={16} />
            <span className="text-xs font-semibold uppercase tracking-wider">Mentor Command Workspace</span>
          </div>
          <h1 className="font-display text-3xl font-extrabold text-white">Review Submissions</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="rounded-xl border border-white/10 bg-white/5 px-4.5 py-2.5 text-xs font-bold hover:bg-white/8 transition-all"
          >
            Student Panel
          </Link>
          <Link
            href="/admin"
            className="rounded-xl border border-purple-500/20 bg-purple-500/10 px-4.5 py-2.5 text-xs font-bold text-purple-400 hover:bg-purple-500/15 transition-all"
          >
            Admin Panel
          </Link>
        </div>
      </header>

      {/* Main Layout Grid */}
      <main className="mx-auto max-w-7xl grid gap-6 lg:grid-cols-[1.2fr_2.2fr]">
        
        {/* Left Column: Submissions Queue & Student Lists */}
        <section className="space-y-6">
          
          {/* Submissions Queue */}
          <div className="rounded-2xl border border-white/8 bg-white/4 p-5 backdrop-blur-xl flex flex-col max-h-[480px]">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-base font-bold text-white flex items-center gap-2">
                <ClipboardCheck size={16} className="text-cyan-400" />
                Review Queue
              </h2>
              <span className="rounded-full bg-blue-500/15 border border-blue-500/20 px-2 py-0.5 text-[10px] font-bold text-blue-400">
                {pendingCount} pending
              </span>
            </div>

            {/* Queue Filter Tabs */}
            <div className="mb-3 flex border-b border-white/8 text-[11px] font-bold">
              {(["ALL", "PENDING", "APPROVED", "REJECTED"] as SubFilter[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`pb-2 pr-3 transition-colors ${
                    filter === tab ? "text-cyan-400" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="space-y-2 overflow-y-auto flex-1 pr-1">
              {filteredSubmissions.length === 0 ? (
                <p className="py-6 text-center text-xs text-slate-600">No submissions matching filter.</p>
              ) : (
                filteredSubmissions.map((sub) => {
                  const task = WEEKLY_TASKS.find((t) => t.id === sub.taskId);
                  const user = MOCK_USERS.find((u) => u.id === sub.userId);
                  const isSelected = sub.id === selectedSubId;

                  return (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedSubId(sub.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all duration-150 ${
                        isSelected
                          ? "border-cyan-500/35 bg-cyan-500/8"
                          : "border-white/8 bg-white/4 hover:bg-white/6"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-slate-500">@{user?.username}</span>
                        <span
                          className={`text-[9px] font-extrabold uppercase tracking-wide ${
                            sub.status === "PENDING"
                              ? "text-blue-400"
                              : sub.status === "APPROVED"
                              ? "text-emerald-400"
                              : "text-red-400"
                          }`}
                        >
                          {sub.status}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-200 truncate">{task?.title}</h4>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Assigned Students */}
          <div className="rounded-2xl border border-white/8 bg-white/4 p-5 backdrop-blur-xl">
            <h2 className="font-display text-base font-bold text-white flex items-center gap-2 mb-4">
              <Users size={16} className="text-cyan-400" />
              My Enrolled Interns
            </h2>
            <div className="space-y-3">
              {assignedStudents.map((student) => {
                return (
                  <div key={student.id} className="flex items-center justify-between rounded-xl bg-white/4 p-3 border border-white/8">
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">{student.name}</h4>
                      <p className="text-[9px] text-slate-500 mt-0.5">Week {student.currentWeek} · Day {student.currentDay}</p>
                    </div>
                    <span className="rounded-full bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 text-[10px] font-bold text-cyan-400">
                      {student.points.toLocaleString()} pts
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </section>

        {/* Right Column: Code Review and Assessment */}
        {selectedSub ? (
          <section className="space-y-6">
            
            {/* Header task details */}
            <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                Grading Workspace (Week {selectedTask?.weekNo} · Day {selectedTask?.dayNo})
              </p>
              <h2 className="font-display text-2xl font-extrabold text-white mb-2">{selectedTask?.title}</h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">{selectedTask?.taskDetails}</p>
              
              <div className="flex flex-wrap items-center gap-6 border-t border-white/8 pt-4 text-xs text-slate-500">
                <span>Student: <span className="font-semibold text-slate-300">{selectedUser?.name}</span></span>
                <span>Points available: <span className="font-semibold text-cyan-400">{selectedTask?.points || 100} pts</span></span>
              </div>
            </div>

            {/* Links */}
            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href={selectedSub.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-white/8 bg-white/4 p-4.5 hover:bg-white/6 hover:border-cyan-500/20 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-slate-400 group-hover:text-cyan-400">
                    <FileCode size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Source Code Repo</h4>
                    <p className="text-[10px] text-slate-500">Check code commits</p>
                  </div>
                </div>
                <ExternalLink size={13} className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
              </a>

              {selectedSub.liveUrl && (
                <a
                  href={selectedSub.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/8 bg-white/4 p-4.5 hover:bg-white/6 hover:border-teal-500/20 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-slate-400 group-hover:text-teal-400">
                      <Globe size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Live URL</h4>
                      <p className="text-[10px] text-slate-500">Preview build interface</p>
                    </div>
                  </div>
                  <ExternalLink size={13} className="text-slate-600 group-hover:text-teal-400 transition-colors" />
                </a>
              )}
            </div>

            {/* Assessment form */}
            <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl">
              <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Award size={18} className="text-cyan-400" />
                Grading Actions
              </h3>

              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">Grading Status</label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setGradeStatus("APPROVED")}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border font-semibold text-xs transition-all ${
                        gradeStatus === "APPROVED"
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                          : "border-white/8 bg-white/4 text-slate-400 hover:bg-white/6"
                      }`}
                    >
                      <CheckCircle2 size={14} />
                      Approve & Grade
                    </button>
                    <button
                      type="button"
                      onClick={() => setGradeStatus("REJECTED")}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border font-semibold text-xs transition-all ${
                        gradeStatus === "REJECTED"
                          ? "border-red-500/30 bg-red-500/10 text-red-400"
                          : "border-white/8 bg-white/4 text-slate-400 hover:bg-white/6"
                      }`}
                    >
                      <XCircle size={14} />
                      Needs Revision
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="mentor-note" className="block text-xs font-semibold text-slate-400 mb-2">
                    Review Remarks / Feedback
                  </label>
                  <textarea
                    id="mentor-note"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Provide detailed feedback. Tell the intern what they did well and where they can improve..."
                    rows={4}
                    required
                    className="w-full rounded-xl border border-white/8 bg-white/4 px-4 py-3 text-sm text-slate-200 outline-none focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/15"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 py-3.5 text-sm font-bold text-[#020B18] shadow-[0_0_20px_rgba(0,245,255,0.2)] hover:scale-[1.01] hover:shadow-[0_0_35px_rgba(0,245,255,0.35)] transition-all"
                >
                  <Send size={14} />
                  Submit Grade & Assessment
                </button>
              </form>
            </div>

            {/* Render active feedback log */}
            {selectedSub.feedback && (
              <div className="rounded-2xl border border-white/8 bg-white/4 p-5">
                <h4 className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Submitted Review Details</h4>
                <p className="text-xs italic text-slate-400 leading-relaxed">&quot;{selectedSub.feedback}&quot;</p>
                {selectedSub.reviewedAt && (
                  <p className="text-[9px] text-slate-600 mt-2">Completed on {new Date(selectedSub.reviewedAt).toLocaleString()}</p>
                )}
              </div>
            )}

          </section>
        ) : (
          <div className="rounded-2xl border border-white/8 bg-white/4 p-12 text-center flex items-center justify-center">
            <p className="text-slate-500 text-xs">No active submissions in this queue.</p>
          </div>
        )}

      </main>
    </div>
  );
}
