"use client";

import { useState, useEffect } from "react";
import {
  TRACKS,
  WEEKLY_TASKS,
  MOCK_USERS,
  SUBMISSIONS,
  MOCK_MENTOR_ASSIGNMENTS,
  MOCK_TASK_EDIT_LOGS,
  addTask,
  editTask,
  deleteTask,
  setPaymentStatus,
  type Track,
  type WeeklyTask,
  type User,
  type Submission,
} from "@/lib/mock-data";
import { BookOpen, Users, GitBranch, ShieldAlert, Plus, LineChart, Code2, Award, Flame, Mail, GraduationCap, History, CheckCircle2, XCircle, Clock, Trash2, Edit2, ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";

type Tab = "students" | "mentors" | "tracks" | "audits" | "curriculum" | "payments";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("students");
  const [tracks, setTracks] = useState<Track[]>(TRACKS);
  const [tasksList, setTasksList] = useState<WeeklyTask[]>([]);
  const [logsList, setLogsList] = useState(MOCK_TASK_EDIT_LOGS);
  const [payments, setPayments] = useState<any[]>([]);
  const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<any | null>(null);
  
  // Admin Curriculum Edit states
  const [selectedTrackIdForCurriculum, setSelectedTrackIdForCurriculum] = useState<string>("track_001");
  const [editingTask, setEditingTask] = useState<WeeklyTask | null>(null);
  
  // Add task form states
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDetails, setNewTaskDetails] = useState("");
  const [newTaskWeek, setNewTaskWeek] = useState(1);
  const [newTaskDay, setNewTaskDay] = useState(1);
  const [newTaskHours, setNewTaskHours] = useState(3);
  const [newTaskPoints, setNewTaskPoints] = useState(100);
  const [newTaskInstructions, setNewTaskInstructions] = useState("");

  const [activeAdmin, setActiveAdmin] = useState<User | null>(null);

  useEffect(() => {
    setActiveAdmin(MOCK_USERS.find((u) => u.role === "ADMIN") || null);
    setTasksList(WEEKLY_TASKS);
    setLogsList(MOCK_TASK_EDIT_LOGS);

    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("connexode_manual_payments");
      if (stored) {
        try {
          setPayments(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const handleApprovePayment = (txId: string, trackId: string) => {
    setPaymentStatus(trackId, "PAID");
    const updatedPayments = payments.map((p) => {
      if (p.id === txId) {
        return { ...p, status: "APPROVED" };
      }
      return p;
    });
    setPayments(updatedPayments);
    localStorage.setItem("connexode_manual_payments", JSON.stringify(updatedPayments));
    alert("Payment approved successfully! The student's workspace has been unlocked.");
  };

  const handleRejectPayment = (txId: string, trackId: string) => {
    setPaymentStatus(trackId, "PENDING");
    const updatedPayments = payments.map((p) => {
      if (p.id === txId) {
        return { ...p, status: "REJECTED" };
      }
      return p;
    });
    setPayments(updatedPayments);
    localStorage.setItem("connexode_manual_payments", JSON.stringify(updatedPayments));
    alert("Payment rejected! The student will need to re-submit their payment receipt.");
  };

  const handleDeletePayment = (txId: string) => {
    if (!confirm("Are you sure you want to delete this payment record?")) return;
    const updatedPayments = payments.filter((p) => p.id !== txId);
    setPayments(updatedPayments);
    localStorage.setItem("connexode_manual_payments", JSON.stringify(updatedPayments));
  };

  // Filter students out of MOCK_USERS
  const students = MOCK_USERS.filter((u) => u.role === "STUDENT");
  const mentors = MOCK_USERS.filter((u) => u.role === "MENTOR");

  const totalStudents = students.length;
  const totalTracks = tracks.length;
  const totalTasks = tasksList.length;
  const totalSubmissions = SUBMISSIONS.length;

  // Add Task handler for Admin
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAdmin) return;

    const taskInstructionsList = newTaskInstructions
      .split("\n")
      .map((i) => i.trim())
      .filter((i) => i !== "");

    const newId = `task_admin_${Math.random().toString(36).substring(2, 9)}`;
    const newWeeklyTask: WeeklyTask = {
      id: newId,
      trackId: selectedTrackIdForCurriculum,
      weekNo: Number(newTaskWeek),
      dayNo: Number(newTaskDay),
      title: newTaskTitle,
      taskDetails: newTaskDetails,
      instructions: taskInstructionsList.length > 0 ? taskInstructionsList : ["Follow instructions from the administrator."],
      estimatedHours: Number(newTaskHours),
      status: "LOCKED",
      points: Number(newTaskPoints),
    };

    addTask(newWeeklyTask, activeAdmin);
    setTasksList([...WEEKLY_TASKS]); // Sync
    setLogsList([...MOCK_TASK_EDIT_LOGS]); // Sync
    setIsAddingTask(false);
    
    // Reset form
    setNewTaskTitle("");
    setNewTaskDetails("");
    setNewTaskInstructions("");
    setNewTaskWeek(1);
    setNewTaskDay(1);
    setNewTaskHours(3);
    setNewTaskPoints(100);

    alert("Curriculum outline task added successfully by Admin!");
  };

  // Edit Task handler for Admin
  const handleEditTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAdmin || !editingTask) return;

    editTask(editingTask.id, editingTask, activeAdmin);
    setTasksList([...WEEKLY_TASKS]); // Sync
    setLogsList([...MOCK_TASK_EDIT_LOGS]); // Sync
    setEditingTask(null);
    alert("Curriculum outline task updated successfully by Admin!");
  };

  // Delete Task handler for Admin
  const handleDeleteTask = (taskId: string) => {
    if (!activeAdmin) return;
    if (!confirm("Are you sure you want to delete this task?")) return;

    deleteTask(taskId, activeAdmin);
    setTasksList([...WEEKLY_TASKS]); // Sync
    setLogsList([...MOCK_TASK_EDIT_LOGS]); // Sync
    alert("Curriculum outline task deleted successfully by Admin!");
  };

  // Calculate Mentor stats dynamically
  const getMentorStats = (mentorId: string) => {
    const assignments = MOCK_MENTOR_ASSIGNMENTS.filter((a) => a.mentorId === mentorId);
    const assignedTrackIds = assignments.map((a) => a.trackId);

    // Submissions for mentor's tracks
    const assignedSubmissions = SUBMISSIONS.filter((sub) => {
      const task = WEEKLY_TASKS.find((t) => t.id === sub.taskId);
      return task && assignedTrackIds.includes(task.trackId);
    });

    const checked = assignedSubmissions.filter((s) => s.status === "APPROVED" || s.status === "REJECTED").length;
    const remaining = assignedSubmissions.filter((s) => s.status === "PENDING").length;

    // Last feedback given
    const feedbackList = assignedSubmissions
      .filter((s) => s.feedback && s.reviewedAt)
      .sort((a, b) => new Date(b.reviewedAt!).getTime() - new Date(a.reviewedAt!).getTime());

    const lastFeedback = feedbackList.length > 0 ? feedbackList[0].feedback : "(No feedback submitted yet)";

    return { checked, remaining, lastFeedback };
  };

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
        <section className="flex border-b border-white/8 gap-6 text-sm font-semibold overflow-x-auto scrollbar-none pb-0.5">
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
            Mentor Performance ({mentors.length})
          </button>
          <button
            onClick={() => setActiveTab("tracks")}
            className={`pb-4 transition-all ${
              activeTab === "tracks" ? "text-cyan-400 border-b-2 border-cyan-400" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Course Curriculum Tracks ({totalTracks})
          </button>
          <button
            onClick={() => setActiveTab("curriculum")}
            className={`pb-4 transition-all flex items-center gap-1.5 ${
              activeTab === "curriculum" ? "text-cyan-400 border-b-2 border-cyan-400" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <BookOpen size={15} /> Outline Editor
          </button>
          <button
            onClick={() => setActiveTab("audits")}
            className={`pb-4 transition-all flex items-center gap-1.5 ${
              activeTab === "audits" ? "text-cyan-400 border-b-2 border-cyan-400" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <History size={15} /> Audit logs Feed
          </button>
          <button
            onClick={() => setActiveTab("payments")}
            className={`pb-4 transition-all flex items-center gap-1.5 ${
              activeTab === "payments" ? "text-cyan-400 border-b-2 border-cyan-400" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Clock size={15} /> Payment Approvals ({payments.filter((p) => p.status === "PENDING").length})
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
              <h3 className="font-display text-lg font-bold text-white">Mentor Performance Directory</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-white/4 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-white/8">
                    <tr>
                      <th className="px-6 py-4">Mentor Name</th>
                      <th className="px-6 py-4">Assigned Track</th>
                      <th className="px-6 py-4 text-center">Tasks Checked</th>
                      <th className="px-6 py-4 text-center">Tasks Remaining</th>
                      <th className="px-6 py-4">Latest Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/8">
                    {mentors.map((mentor) => {
                      const assignments = MOCK_MENTOR_ASSIGNMENTS.filter((a) => a.mentorId === mentor.id);
                      const stats = getMentorStats(mentor.id);

                      return (
                        <tr key={mentor.id} className="hover:bg-white/4 transition-colors">
                          <td className="px-6 py-4 font-semibold text-white">
                            <div>
                              <p>{mentor.name}</p>
                              <p className="text-[10px] text-slate-500 font-medium">{mentor.email}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-slate-400">
                            <div className="flex flex-col gap-1">
                              {assignments.map((asg, i) => (
                                <span key={i} className="text-xs text-slate-300 font-medium">
                                  • {asg.trackTitle}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center font-bold text-emerald-400">{stats.checked}</td>
                          <td className="px-6 py-4 text-center font-bold text-yellow-500">
                            <span className="inline-flex items-center gap-1">
                              {stats.remaining > 0 ? <Clock size={12} className="animate-spin-slow" /> : null}
                              {stats.remaining}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs italic text-slate-400 max-w-xs truncate" title={stats.lastFeedback}>
                            &quot;{stats.lastFeedback}&quot;
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
                      const taskCount = tasksList.filter((t) => t.trackId === track.id).length;
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

          {activeTab === "audits" && (
            <div className="space-y-4">
              <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                <History className="text-purple-400" />
                Change Audit Logs Timeline Feed
              </h3>
              <p className="text-xs text-slate-500">Track all curriculum modifications made by administrators and mentors.</p>
              
              <div className="space-y-3 mt-4 max-h-[600px] overflow-y-auto pr-1">
                {logsList.map((log) => (
                  <div key={log.id} className="p-4 rounded-xl border border-white/8 bg-white/4 flex items-start gap-4 transition-all">
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      log.fieldName === "creation" 
                        ? "bg-emerald-500/10 text-emerald-400"
                        : log.fieldName === "deletion"
                        ? "bg-red-500/10 text-red-400"
                        : "bg-cyan-500/10 text-cyan-400"
                    }`}>
                      <History size={16} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-200">
                          {log.editorName} <span className="text-[10px] text-slate-500 font-semibold">({log.editorRole})</span>
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium">
                          {new Date(log.changedAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">
                        Modified task outlines for track <span className="text-purple-400 font-semibold">{log.trackTitle}</span>:
                      </p>
                      <div className="bg-black/20 p-2.5 rounded-lg border border-white/5 text-[11px] font-mono mt-1 text-slate-400 flex flex-wrap gap-x-4">
                        <div>
                          <span className="text-slate-500 font-semibold">Field:</span> <span className="text-slate-200">{log.fieldName}</span>
                        </div>
                        <div>
                          <span className="text-red-400/80 font-semibold">Before:</span> <span className="line-through">{log.oldValue}</span>
                        </div>
                        <div>
                          <span className="text-emerald-400/80 font-semibold">After:</span> <span className="text-slate-200">{log.newValue}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {logsList.length === 0 && (
                  <p className="text-center text-xs text-slate-600 py-12">No curriculum modification log matches.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === "curriculum" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg font-bold text-white">Curriculum Course Editor</h3>
                  <p className="text-xs text-slate-500">Edit, add, or delete outline tasks for any internship track.</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <select
                    value={selectedTrackIdForCurriculum}
                    onChange={(e) => {
                      setSelectedTrackIdForCurriculum(e.target.value);
                      setEditingTask(null);
                      setIsAddingTask(false);
                    }}
                    className="rounded-xl border border-white/8 bg-[#020B18] px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-cyan-400"
                  >
                    {tracks.map((track) => (
                      <option key={track.id} value={track.id}>
                        {track.title}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => {
                      setIsAddingTask(true);
                      setEditingTask(null);
                    }}
                    className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-4 py-2.5 text-xs font-bold text-[#020B18] hover:scale-[1.01] transition-all"
                  >
                    <Plus size={14} /> Add Task
                  </button>
                </div>
              </div>

              {isAddingTask ? (
                /* Add Task */
                <div className="rounded-xl border border-white/8 bg-white/4 p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setIsAddingTask(false)} className="text-slate-400 hover:text-slate-200">
                      <ArrowLeft size={16} />
                    </button>
                    <h4 className="font-bold text-white text-sm">Add New Curriculum Outline Task</h4>
                  </div>
                  <form onSubmit={handleAddTask} className="space-y-4 text-xs">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-slate-400 font-semibold mb-1">Week Number (1-8)</label>
                        <input
                          type="number"
                          min="1"
                          max="8"
                          required
                          value={newTaskWeek}
                          onChange={(e) => setNewTaskWeek(Number(e.target.value))}
                          className="w-full rounded-xl border border-white/8 bg-[#020B18] px-4 py-3 text-slate-200 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 font-semibold mb-1">Day Number (1-5)</label>
                        <input
                          type="number"
                          min="1"
                          max="5"
                          required
                          value={newTaskDay}
                          onChange={(e) => setNewTaskDay(Number(e.target.value))}
                          className="w-full rounded-xl border border-white/8 bg-[#020B18] px-4 py-3 text-slate-200 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">Task Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Build a dark mode toggle"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        className="w-full rounded-xl border border-white/8 bg-[#020B18] px-4 py-3 text-slate-200 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">Details / Description</label>
                      <textarea
                        required
                        placeholder="Detailed task description..."
                        value={newTaskDetails}
                        onChange={(e) => setNewTaskDetails(e.target.value)}
                        rows={3}
                        className="w-full rounded-xl border border-white/8 bg-[#020B18] px-4 py-3 text-slate-200 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">Instructions (One instruction per line)</label>
                      <textarea
                        placeholder="Step 1: Setup configurations...&#10;Step 2: Connect DB..."
                        value={newTaskInstructions}
                        onChange={(e) => setNewTaskInstructions(e.target.value)}
                        rows={3}
                        className="w-full rounded-xl border border-white/8 bg-[#020B18] px-4 py-3 text-slate-200 outline-none"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-slate-400 font-semibold mb-1">Estimated Hours</label>
                        <input
                          type="number"
                          required
                          value={newTaskHours}
                          onChange={(e) => setNewTaskHours(Number(e.target.value))}
                          className="w-full rounded-xl border border-white/8 bg-[#020B18] px-4 py-3 text-slate-200 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 font-semibold mb-1">Points</label>
                        <input
                          type="number"
                          required
                          value={newTaskPoints}
                          onChange={(e) => setNewTaskPoints(Number(e.target.value))}
                          className="w-full rounded-xl border border-white/8 bg-[#020B18] px-4 py-3 text-slate-200 outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 py-3.5 text-xs font-bold text-white hover:scale-[1.01]"
                    >
                      Publish Outline Task (Admin Override)
                    </button>
                  </form>
                </div>
              ) : editingTask ? (
                /* Edit Task */
                <div className="rounded-xl border border-white/8 bg-white/4 p-6 space-y-4">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <button onClick={() => setEditingTask(null)} className="text-slate-400 hover:text-slate-200">
                      <ArrowLeft size={16} />
                    </button>
                    <h4 className="font-bold text-white text-sm">Edit Task: {editingTask.title}</h4>
                  </div>
                  <form onSubmit={handleEditTaskSubmit} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">Task Title</label>
                      <input
                        type="text"
                        required
                        value={editingTask.title}
                        onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                        className="w-full rounded-xl border border-white/8 bg-[#020B18] px-4 py-3 text-slate-200 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">Task Details</label>
                      <textarea
                        required
                        value={editingTask.taskDetails}
                        onChange={(e) => setEditingTask({ ...editingTask, taskDetails: e.target.value })}
                        rows={4}
                        className="w-full rounded-xl border border-white/8 bg-[#020B18] px-4 py-3 text-slate-200 outline-none"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-slate-400 font-semibold mb-1">Estimated Hours</label>
                        <input
                          type="number"
                          required
                          value={editingTask.estimatedHours}
                          onChange={(e) => setEditingTask({ ...editingTask, estimatedHours: Number(e.target.value) })}
                          className="w-full rounded-xl border border-white/8 bg-[#020B18] px-4 py-3 text-slate-200 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 font-semibold mb-1">Points</label>
                        <input
                          type="number"
                          required
                          value={editingTask.points}
                          onChange={(e) => setEditingTask({ ...editingTask, points: Number(e.target.value) })}
                          className="w-full rounded-xl border border-white/8 bg-[#020B18] px-4 py-3 text-slate-200 outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 py-3.5 text-xs font-bold text-[#020B18] hover:scale-[1.01]"
                    >
                      Save Task Changes
                    </button>
                  </form>
                </div>
              ) : (
                /* Outline Day-by-Day Timeline List */
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                  {tasksList
                    .filter((t) => t.trackId === selectedTrackIdForCurriculum)
                    .sort((a, b) => a.weekNo - b.weekNo || a.dayNo - b.dayNo)
                    .map((task) => (
                      <div
                        key={task.id}
                        className="p-4 rounded-xl border border-white/8 bg-white/4 flex justify-between items-start hover:bg-white/6 transition-all"
                      >
                        <div className="space-y-2">
                          <span className="rounded-full bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 text-[9px] font-bold text-purple-400">
                            Week {task.weekNo} · Day {task.dayNo}
                          </span>
                          <h4 className="text-sm font-bold text-white mt-1.5">{task.title}</h4>
                          <p className="text-xs text-slate-400 leading-relaxed max-w-xl">{task.taskDetails}</p>
                          <div className="flex gap-4 text-[10px] text-slate-500">
                            <span>Points: <span className="text-cyan-400 font-semibold">{task.points} pts</span></span>
                            <span>Estimate: <span className="text-slate-300 font-semibold">{task.estimatedHours} hrs</span></span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 ml-4">
                          <button
                            onClick={() => setEditingTask(task)}
                            className="p-2 rounded-lg bg-white/5 border border-white/8 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"
                            title="Edit Task"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="p-2 rounded-lg bg-white/5 border border-white/8 text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                            title="Delete Task"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}

                  {tasksList.filter((t) => t.trackId === selectedTrackIdForCurriculum).length === 0 && (
                    <p className="text-center text-xs text-slate-600 py-12">No tasks defined for this curriculum track.</p>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === "payments" && (
            <div className="space-y-4">
              <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                <Clock className="text-cyan-400" />
                Manual Payment Approvals Queue
              </h3>
              <p className="text-xs text-slate-500">
                Review uploaded EasyPaisa / JazzCash payment screenshots. Approving a receipt unlocks the student's dashboard access for that course track.
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-white/4 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-white/8">
                    <tr>
                      <th className="px-6 py-4">Submission Date</th>
                      <th className="px-6 py-4">Student</th>
                      <th className="px-6 py-4">Track</th>
                      <th className="px-6 py-4">Transaction Details</th>
                      <th className="px-6 py-4">Receipt Screenshot</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/8">
                    {payments.map((p) => (
                      <tr key={p.id} className="hover:bg-white/4 transition-colors">
                        <td className="px-6 py-4 text-xs text-slate-400">
                          {new Date(p.submittedAt).toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-white">{p.userName}</p>
                          <p className="text-[10px] text-slate-500">ID: {p.userId}</p>
                          <button
                            onClick={() => setSelectedApplication(p)}
                            className="mt-1.5 flex items-center gap-1 text-[10px] text-cyan-400 hover:text-cyan-300 font-bold transition-colors"
                          >
                            <BookOpen size={11} /> View Application Form
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-medium text-slate-200">
                            {p.trackTitle}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs space-y-1">
                          <div>
                            <span className="text-slate-500 font-semibold">Sender:</span>{" "}
                            <span className="text-slate-300 font-medium">{p.senderName}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 font-semibold">TID:</span>{" "}
                            <span className="font-mono text-cyan-400 font-bold">{p.transactionId}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 font-semibold">Amount:</span>{" "}
                            <span className="text-emerald-400 font-bold">Rs. {p.price}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {p.receiptImage ? (
                            <button
                              onClick={() => setSelectedReceipt(p.receiptImage)}
                              className="group relative h-12 w-20 overflow-hidden rounded-lg border border-white/10 hover:border-cyan-500/50 transition-all flex items-center justify-center bg-black/40"
                            >
                              <img
                                src={p.receiptImage}
                                alt="Receipt Thumbnail"
                                className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] font-bold text-white">
                                View Full
                              </div>
                            </button>
                          ) : (
                            <span className="text-xs text-slate-500 italic">No Screenshot</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            p.status === "APPROVED"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : p.status === "REJECTED"
                              ? "bg-red-500/10 text-red-400 border border-red-500/20"
                              : "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                          }`}>
                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                            {p.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end items-center gap-2">
                            {p.status === "PENDING" && (
                              <>
                                <button
                                  onClick={() => handleApprovePayment(p.id, p.trackId)}
                                  className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-xs font-bold text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 transition-all"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleRejectPayment(p.id, p.trackId)}
                                  className="rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-1.5 text-xs font-bold text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => handleDeletePayment(p.id)}
                              className="p-2 rounded-lg bg-white/5 border border-white/8 text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                              title="Delete Record"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {payments.length === 0 && (
                      <tr>
                        <td colSpan={7} className="text-center text-xs text-slate-500 py-12">
                          No manual payment transactions found in queue.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        {/* Lightbox / Modal for Receipt Preview */}
        {selectedReceipt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm">
            <div className="relative max-w-3xl w-full bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-slate-950">
                <h3 className="text-sm font-bold text-white">Payment Receipt Proof</h3>
                <button
                  onClick={() => setSelectedReceipt(null)}
                  className="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  Close
                </button>
              </div>
              <div className="p-6 flex items-center justify-center bg-black/40 overflow-y-auto max-h-[75vh]">
                <img
                  src={selectedReceipt}
                  alt="Receipt Full Preview"
                  className="max-w-full max-h-[60vh] object-contain rounded-lg border border-white/5 shadow-lg"
                />
              </div>
            </div>
          </div>
        )}

        {/* Lightbox / Modal for Candidate Application Form Profile */}
        {selectedApplication && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm overflow-y-auto">
            <div className="relative max-w-2xl w-full bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col my-8">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-slate-950">
                <div>
                  <h3 className="text-sm font-bold text-white">Internship Application Form Details</h3>
                  <p className="text-[10px] text-slate-500">Track: {selectedApplication.trackTitle}</p>
                </div>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  Close
                </button>
              </div>
              
              <div className="p-6 space-y-5 text-xs text-slate-300 overflow-y-auto max-h-[70vh]">
                {/* Personal Info */}
                <div className="space-y-2">
                  <h4 className="font-bold text-cyan-400 uppercase tracking-wider text-[10px] border-b border-white/5 pb-1">
                    Personal Details
                  </h4>
                  <div className="flex gap-4 items-start">
                    {selectedApplication.avatarImage && (
                      <img
                        src={selectedApplication.avatarImage}
                        alt="Applicant Avatar"
                        className="h-16 w-16 rounded-full object-cover border border-white/10 shadow"
                      />
                    )}
                    <div className="flex-1 grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-slate-500">Full Name:</span>
                        <p className="text-white font-semibold">{selectedApplication.userName}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Father's Name:</span>
                        <p className="text-white font-semibold">{selectedApplication.fatherName || "(Not Provided)"}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Mobile Number:</span>
                        <p className="text-white font-mono">{selectedApplication.mobile || "(Not Provided)"}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">CNIC Number:</span>
                        <p className="text-white font-mono">{selectedApplication.cnic || "(Not Provided)"}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500">Permanent Address:</span>
                    <p className="text-white mt-0.5">{selectedApplication.address || "(Not Provided)"}</p>
                  </div>
                </div>

                {/* Professional Info */}
                <div className="space-y-2">
                  <h4 className="font-bold text-cyan-400 uppercase tracking-wider text-[10px] border-b border-white/5 pb-1">
                    Academic & Professional details
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-slate-500">Institute:</span>
                      <p className="text-white font-semibold">{selectedApplication.institute || "(Not Provided)"}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Working Experience:</span>
                      <p className="text-white">{selectedApplication.experience || "Fresh student"}</p>
                    </div>
                  </div>
                  {selectedApplication.projectsUrl && (
                    <div>
                      <span className="text-slate-500">Past Projects URL:</span>
                      <p className="mt-0.5">
                        <a
                          href={selectedApplication.projectsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:underline break-all"
                        >
                          {selectedApplication.projectsUrl}
                        </a>
                      </p>
                    </div>
                  )}
                </div>

                {/* Survey Info */}
                <div className="space-y-2">
                  <h4 className="font-bold text-cyan-400 uppercase tracking-wider text-[10px] border-b border-white/5 pb-1">
                    Additional Information
                  </h4>
                  <div>
                    <span className="text-slate-500">Where did you hear about Internee.pk?</span>
                    <p className="text-white mt-0.5">{selectedApplication.heardFrom || "Not provided"}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">What do you expect from us?</span>
                    <p className="text-white mt-0.5">{selectedApplication.expectations || "Not provided"}</p>
                  </div>
                </div>

                {/* Resume Download Box */}
                {selectedApplication.resumeFile && (
                  <div className="rounded-xl border border-white/10 bg-white/3 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center">
                        <FileText size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-white text-xs">{selectedApplication.resumeFileName || "resume.pdf"}</p>
                        <p className="text-[10px] text-slate-500">Applicant Attached CV</p>
                      </div>
                    </div>
                    <a
                      href={selectedApplication.resumeFile}
                      download={selectedApplication.resumeFileName || "resume.pdf"}
                      className="rounded-lg bg-cyan-500 px-4 py-2 text-2xs font-bold text-[#020B18] hover:scale-[1.01] transition-all"
                    >
                      Download Resume
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

