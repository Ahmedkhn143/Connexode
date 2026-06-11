"use client";

import { useState, useEffect } from "react";
import StatsRow from "@/components/dashboard/StatsRow";
import PhaseProgress from "@/components/dashboard/PhaseProgress";
import TaskList from "@/components/dashboard/TaskList";
import TrackRoadmap from "@/components/dashboard/TrackRoadmap";
import PaymentApprovedBanner from "@/components/dashboard/PaymentApprovedBanner";
import { getActiveUser, getPaymentStatus, getTrackMentor, TRACKS, SUBMISSIONS, WEEKLY_TASKS, type User } from "@/lib/mock-data";
import { BadgeCheck, GitBranch, ArrowRight, MessageSquare, Send, User as UserIcon, Zap, Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view");

  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [paymentStatus, setPaymentStatusState] = useState<"PENDING" | "PENDING_VERIFICATION" | "PAID">("PENDING");
  const [profileDetails, setProfileDetails] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [newQuestion, setNewQuestion] = useState("");

  const loadQuestions = () => {
    if (typeof window !== "undefined") {
      const activeUserObj = getActiveUser();
      const stored = localStorage.getItem("connexode_qa_tickets");
      if (stored) {
        try {
          const allTickets = JSON.parse(stored);
          setQuestions(allTickets.filter((t: any) => t.userId === activeUserObj.id));
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  useEffect(() => {
    const user = getActiveUser();
    setActiveUser(user);
    if (user && user.enrolledTrackId) {
      setPaymentStatusState(getPaymentStatus(user.enrolledTrackId, user.id));
    }
  }, []);

  useEffect(() => {
    if (activeUser) {
      const stored = localStorage.getItem("connexode_manual_payments");
      if (stored) {
        try {
          const payments = JSON.parse(stored);
          const userApp = payments.find((p: any) => p.userId === activeUser.id && p.trackId === activeUser.enrolledTrackId);
          if (userApp) {
            setProfileDetails(userApp);
          }
        } catch (e) {
          console.error(e);
        }
      }
      loadQuestions();
    }
  }, [activeUser]);

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    if (typeof window !== "undefined" && activeUser) {
      const allTickets = JSON.parse(localStorage.getItem("connexode_qa_tickets") || "[]");
      const newTicket = {
        id: `q_${Math.random().toString(36).substring(2, 9)}`,
        userId: activeUser.id,
        userName: activeUser.name,
        trackId: activeUser.enrolledTrackId,
        question: newQuestion,
        reply: null,
        status: "PENDING",
        askedAt: new Date().toISOString(),
        repliedAt: null
      };
      allTickets.push(newTicket);
      localStorage.setItem("connexode_qa_tickets", JSON.stringify(allTickets));
      setNewQuestion("");
      loadQuestions();
      alert("Your question has been sent! Mentor will respond within 24 hours.");
    }
  };

  if (!activeUser) {
    return (
      <div className="flex h-64 items-center justify-center text-slate-400">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
      </div>
    );
  }

  // Check if user has no enrolled track — show internship selection screen
  if (!activeUser.enrolledTrackId) {
    return (
      <div className="mx-auto max-w-5xl space-y-8 py-4">
        {/* Header */}
        <div>
          <span className="rounded bg-cyan-400/10 border border-cyan-400/25 px-2.5 py-1 text-[10px] font-extrabold text-cyan-400 uppercase tracking-wider">
            Step 1 of 2 — Choose Your Track
          </span>
          <h1 className="font-display text-3xl font-black text-white mt-3">
            Select Your Internship Track
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Choose a program below, complete the registration form and pay the one-time fee (Rs. 500). Your internship workspace unlocks after admin verifies your payment.
          </p>
        </div>

        {/* Payment flow steps */}
        <div className="flex items-center gap-3 text-xs">
          {[
            { step: "1", label: "Select Track", done: false, active: true },
            { step: "2", label: "Fill Application + Pay Fee", done: false, active: false },
            { step: "3", label: "Admin Verifies Payment", done: false, active: false },
            { step: "4", label: "Access LMS Dashboard", done: false, active: false },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-extrabold ${
                s.active ? "bg-cyan-400 text-[#020B18]" : "bg-white/8 text-slate-500"
              }`}>{s.step}</div>
              <span className={s.active ? "text-white font-semibold" : "text-slate-500"}>{s.label}</span>
              {i < 3 && <span className="text-slate-700 mx-1">→</span>}
            </div>
          ))}
        </div>

        {/* Track Cards */}
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {TRACKS.map((t) => (
            <div
              key={t.id}
              className="group rounded-2xl border border-white/8 bg-white/4 p-5 hover:border-opacity-60 transition-all flex flex-col justify-between hover:-translate-y-1"
              style={{ "--track-color": t.color } as any}
            >
              <div className="space-y-3">
                {/* Color dot + icon */}
                <div
                  className="h-11 w-11 rounded-xl flex items-center justify-center font-black text-base text-white"
                  style={{ backgroundColor: `${t.color}20`, border: `1px solid ${t.color}40` }}
                >
                  <span style={{ color: t.color }}>{t.title.substring(0, 2).toUpperCase()}</span>
                </div>
                <div>
                  <h3 className="font-display text-base font-extrabold text-white">{t.title}</h3>
                  <p className="text-[10px] font-semibold" style={{ color: t.color }}>{t.durationWeeks} Weeks · Intensive Program</p>
                </div>
                <p className="text-xs text-slate-400 leading-normal line-clamp-3">{t.description}</p>
                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {t.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded bg-white/5 border border-white/8 px-2 py-0.5 text-[9px] text-slate-400 font-semibold">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Clock size={11} /> One-time fee</span>
                  <span className="font-bold text-white">Rs. 500</span>
                </div>
                <Link
                  href={`/checkout/${t.id}`}
                  className="w-full flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold text-[#020B18] hover:scale-[1.02] transition-transform"
                  style={{ backgroundColor: t.color }}
                >
                  Apply & Enroll
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const track = TRACKS.find((t) => t.id === activeUser.enrolledTrackId)!;
  const mentor = getTrackMentor(activeUser.enrolledTrackId);
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



  if (currentView === "roadmap") {
    return (
      <div className="mx-auto max-w-5xl space-y-6 animate-fade-in">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div>
            <Link
              href="/dashboard"
              className="mb-3 inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-400 transition-colors"
            >
              ← Back to Dashboard
            </Link>
            <h1 className="font-display text-2xl font-extrabold text-white">8-Week Track Roadmap</h1>
            <p className="text-xs text-slate-400 mt-1">Detailed phase progression and weekly learning goals for {track.title}</p>
          </div>
        </div>
        <TrackRoadmap />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">

      {/* Payment Approved Banner */}
      <PaymentApprovedBanner userId={activeUser.id} />
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
      <div className="grid gap-6 xl:grid-cols-[1fr_1.6fr] relative">
        <PhaseProgress />
        <TaskList weekNo={currentWeek} />
      </div>

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

      {/* Profile & Q&A Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl space-y-4">
            <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <UserIcon className="text-cyan-400" size={20} />
              My Internship Profile Details
            </h3>
            
            {profileDetails ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  {profileDetails.avatarImage ? (
                    <img
                      src={profileDetails.avatarImage}
                      alt="Profile Avatar"
                      className="h-16 w-16 rounded-full object-cover border border-white/10 shadow-lg"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
                      {profileDetails.userName.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-white text-sm">{profileDetails.userName}</h4>
                    <p className="text-xs text-slate-400">Track: {profileDetails.trackTitle}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs leading-normal">
                  <div>
                    <span className="text-slate-500 font-semibold">Father's Name:</span>
                    <p className="text-slate-200">{profileDetails.fatherName}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold">Mobile:</span>
                    <p className="text-slate-200 font-mono">{profileDetails.mobile}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold">CNIC:</span>
                    <p className="text-slate-200 font-mono">{profileDetails.cnic}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold">Institute:</span>
                    <p className="text-slate-200 truncate">{profileDetails.institute}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-500 font-semibold">Permanent Address:</span>
                    <p className="text-slate-200">{profileDetails.address}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold">Experience:</span>
                    <p className="text-slate-200">{profileDetails.experience}</p>
                  </div>
                  {profileDetails.projectsUrl && (
                    <div>
                      <span className="text-slate-500 font-semibold">LinkedIn / Projects:</span>
                      <p className="text-slate-200 truncate">
                        <a href={profileDetails.projectsUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                          View Profile
                        </a>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic py-6 text-center">
                Profile details will load once you submit your internship application.
              </p>
            )}
          </div>

          {/* Mentor Details Card */}
          {mentor && (
            <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl space-y-4">
              <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                <BadgeCheck className="text-cyan-400" size={20} />
                Your Assigned Track Mentor
              </h3>
              <div className="flex items-center gap-4">
                {mentor.avatarImage ? (
                  <img
                    src={mentor.avatarImage}
                    alt={mentor.name}
                    className="h-16 w-16 rounded-full object-cover border border-white/10 shadow-lg"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 p-[2px] shadow-lg">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-[#030c1c] text-sm font-black text-white">
                      {mentor.avatarInitials || mentor.name.substring(0, 2).toUpperCase()}
                    </div>
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-white text-sm">{mentor.name}</h4>
                  <p className="text-xs text-cyan-400 font-semibold">{mentor.rank || "Expert Mentor"}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{mentor.email}</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-white/5">
                🎓 **Role & Support:** Your mentor will review your internship task submissions, provide technical feedback on your code, and answer any questions you submit on the helpdesk query box.
              </p>
            </div>
          )}
        </div>

        {/* Q&A Helpdesk Card */}
        <div id="helpdesk" className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl space-y-4">
          <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
            <MessageSquare className="text-cyan-400" size={20} />
            Ask Mentor Helpdesk
          </h3>
          <p className="text-[10px] text-yellow-500 font-bold leading-normal bg-yellow-500/5 border border-yellow-500/10 rounded-lg p-2.5">
            ⚠️ **SLA Notice:** Your assigned mentor will respond to your queries within **24 hours**.
          </p>

          <form onSubmit={handleAskQuestion} className="space-y-2">
            <textarea
              required
              rows={3}
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Ask your mentor a question (e.g. details regarding week tasks or code checks)..."
              className="w-full rounded-xl border border-white/10 bg-[#030c1c] px-4 py-3 text-xs text-slate-200 outline-none focus:border-cyan-400/40"
            />
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-cyan-400 py-2.5 text-xs font-bold text-[#020B18] hover:scale-[1.01] transition-transform"
            >
              <Send size={12} />
              Submit Query to Mentor
            </button>
          </form>

          {/* Ticket Feed list */}
          <div className="space-y-3 pt-2 max-h-[160px] overflow-y-auto pr-1">
            {questions.map((q) => (
              <div key={q.id} className="p-3 rounded-lg bg-black/20 border border-white/5 space-y-1.5 text-xs">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-500">{new Date(q.askedAt).toLocaleDateString()}</span>
                  <span className={`rounded px-1.5 py-0.5 text-[9px] font-extrabold ${
                    q.status === "ANSWERED" ? "bg-emerald-500/10 text-emerald-400" : "bg-yellow-500/10 text-yellow-500 animate-pulse"
                  }`}>
                    {q.status}
                  </span>
                </div>
                <p className="text-slate-300 font-semibold">&quot;{q.question}&quot;</p>
                {q.reply && (
                  <div className="pl-2 border-l border-cyan-500/40 text-[11px] text-cyan-400 leading-normal">
                    <span className="font-bold text-slate-400">Mentor reply:</span> &quot;{q.reply}&quot;
                  </div>
                )}
              </div>
            ))}
            {questions.length === 0 && (
              <p className="text-center text-xs text-slate-500 py-6 italic">No questions submitted yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
