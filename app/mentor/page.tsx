"use client";

import { useState } from "react";
import { SUBMISSIONS, WEEKLY_TASKS, MOCK_USERS, type Submission, type SubmissionStatus } from "@/lib/mock-data";
import { CheckCircle2, XCircle, Clock, ExternalLink, Globe, Send, ShieldAlert, Award, FileCode } from "lucide-react";
import Link from "next/link";

export default function MentorDashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>(SUBMISSIONS);
  const [selectedSubId, setSelectedSubId] = useState<string>(SUBMISSIONS[2]?.id || SUBMISSIONS[0]?.id || "");
  const [feedback, setFeedback] = useState("");
  const [gradeStatus, setGradeStatus] = useState<SubmissionStatus>("APPROVED");

  const selectedSub = submissions.find((s) => s.id === selectedSubId);
  const selectedTask = selectedSub ? WEEKLY_TASKS.find((t) => t.id === selectedSub.taskId) : null;
  const selectedUser = selectedSub ? MOCK_USERS.find((u) => u.id === selectedSub.userId) : null;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSub) return;

    // Update locally
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === selectedSub.id
          ? {
              ...sub,
              status: gradeStatus,
              feedback: feedback || "Looks good! Nice implementation.",
              reviewedAt: new Date().toISOString(),
            }
          : sub
      )
    );
    alert(`Submission has been marked as ${gradeStatus}!`);
    setFeedback("");
  };

  const pendingCount = submissions.filter((s) => s.status === "PENDING").length;

  return (
    <div className="min-h-screen bg-[#020B18] text-slate-100 px-6 py-8">
      {/* Top Banner */}
      <header className="mx-auto max-w-7xl mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/8 pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 mb-1">
            <ShieldAlert size={16} />
            <span className="text-xs font-semibold uppercase tracking-wider">Mentor Command Center</span>
          </div>
          <h1 className="font-display text-3xl font-extrabold text-white">Review Submissions</h1>
        </div>
        <div className="flex gap-4">
          <Link
            href="/dashboard"
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold hover:bg-white/10"
          >
            Back to Student View
          </Link>
          <Link
            href="/admin"
            className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:shadow-purple-500/20 hover:scale-[1.02] transition-all"
          >
            Go to Admin View
          </Link>
        </div>
      </header>

      {/* Main Layout Grid */}
      <main className="mx-auto max-w-7xl grid gap-6 lg:grid-cols-[1fr_2.2fr]">
        
        {/* Left Column: Submissions Queue */}
        <section className="rounded-2xl border border-white/8 bg-white/4 p-5 backdrop-blur-xl flex flex-col max-h-[750px]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-white">Queue</h2>
            <span className="rounded-full bg-blue-500/15 border border-blue-500/20 px-2.5 py-1 text-xs font-semibold text-blue-400">
              {pendingCount} Pending
            </span>
          </div>

          <div className="space-y-2 overflow-y-auto flex-1 pr-1">
            {submissions.map((sub) => {
              const task = WEEKLY_TASKS.find((t) => t.id === sub.taskId);
              const user = MOCK_USERS.find((u) => u.id === sub.userId);
              const isSelected = sub.id === selectedSubId;

              return (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubId(sub.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                    isSelected
                      ? "border-cyan-500/35 bg-cyan-500/8"
                      : "border-white/8 bg-white/4 hover:bg-white/6"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-slate-500">@{user?.username}</span>
                    <div className="flex items-center gap-1">
                      {sub.status === "PENDING" && <Clock size={11} className="text-blue-400" />}
                      {sub.status === "APPROVED" && <CheckCircle2 size={11} className="text-emerald-400" />}
                      {sub.status === "REJECTED" && <XCircle size={11} className="text-red-400" />}
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider ${
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
                  </div>
                  <h4 className="text-sm font-bold text-slate-200 truncate">{task?.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">Submitted {new Date(sub.submittedAt).toLocaleDateString()}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Right Column: Code Review and Grading Workspace */}
        {selectedSub ? (
          <section className="space-y-6">
            
            {/* Header info */}
            <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                Task Details (Week {selectedTask?.weekNo} · Day {selectedTask?.dayNo})
              </p>
              <h2 className="font-display text-2xl font-extrabold text-white mb-2">{selectedTask?.title}</h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">{selectedTask?.taskDetails}</p>
              
              <div className="flex flex-wrap items-center gap-6 border-t border-white/8 pt-4 text-xs text-slate-500">
                <span>Student: <span className="font-semibold text-slate-300">{selectedUser?.name}</span></span>
                <span>Streak: <span className="font-semibold text-slate-300">{selectedUser?.streak} days</span></span>
                <span>Points: <span className="font-semibold text-cyan-400">+{selectedSub.points || 100} pts</span></span>
              </div>
            </div>

            {/* Link references */}
            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href={selectedSub.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-white/8 bg-white/4 p-5 hover:bg-white/6 hover:border-cyan-500/20 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-slate-400 group-hover:text-cyan-400">
                    <FileCode size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Source Code</h4>
                    <p className="text-xs text-slate-500">Inspect repository file changes</p>
                  </div>
                </div>
                <ExternalLink size={14} className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
              </a>

              {selectedSub.liveUrl && (
                <a
                  href={selectedSub.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/8 bg-white/4 p-5 hover:bg-white/6 hover:border-teal-500/20 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-slate-400 group-hover:text-teal-400">
                      <Globe size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Live Demo URL</h4>
                      <p className="text-xs text-slate-500">Preview built interface</p>
                    </div>
                  </div>
                  <ExternalLink size={14} className="text-slate-600 group-hover:text-teal-400 transition-colors" />
                </a>
              )}
            </div>

            {/* Assessment form */}
            <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl">
              <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Award size={18} className="text-cyan-400" />
                Submit Assessment
              </h3>

              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-400 mb-2">Grading Status</label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setGradeStatus("APPROVED")}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border font-semibold text-sm transition-all ${
                        gradeStatus === "APPROVED"
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                          : "border-white/8 bg-white/4 text-slate-400 hover:bg-white/6"
                      }`}
                    >
                      <CheckCircle2 size={16} />
                      Approve & Grant Points
                    </button>
                    <button
                      type="button"
                      onClick={() => setGradeStatus("REJECTED")}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border font-semibold text-sm transition-all ${
                        gradeStatus === "REJECTED"
                          ? "border-red-500/30 bg-red-500/10 text-red-400"
                          : "border-white/8 bg-white/4 text-slate-400 hover:bg-white/6"
                      }`}
                    >
                      <XCircle size={16} />
                      Request Revision
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="review-feedback" className="block text-sm font-semibold text-slate-400 mb-2">
                    Feedback Note
                  </label>
                  <textarea
                    id="review-feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Provide constructive review remarks. E.g., 'Excellent glassmorphism implementation! Code is clean...'"
                    rows={4}
                    required
                    className="w-full rounded-xl border border-white/8 bg-white/4 px-4 py-3 text-sm text-slate-200 outline-none focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/15"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 py-3.5 text-sm font-bold text-[#020B18] shadow-[0_0_20px_rgba(0,245,255,0.2)] hover:scale-[1.01] hover:shadow-[0_0_35px_rgba(0,245,255,0.35)] transition-all"
                >
                  <Send size={15} />
                  Submit Feedback & Status Update
                </button>
              </form>
            </div>

            {/* Display existing feedback if reviewed */}
            {selectedSub.feedback && (
              <div className="rounded-2xl border border-white/8 bg-white/4 p-5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Active Feedback note</h4>
                <p className="text-sm italic text-slate-400">&quot;{selectedSub.feedback}&quot;</p>
                {selectedSub.reviewedAt && (
                  <p className="text-[10px] text-slate-600 mt-2">Reviewed on {new Date(selectedSub.reviewedAt).toLocaleString()}</p>
                )}
              </div>
            )}

          </section>
        ) : (
          <div className="rounded-2xl border border-white/8 bg-white/4 p-12 text-center flex items-center justify-center">
            <p className="text-slate-500 text-sm">Select a submission from the queue to start grading.</p>
          </div>
        )}

      </main>
    </div>
  );
}
