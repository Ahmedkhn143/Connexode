"use client";

import { useState, useEffect } from "react";
import {
  SUBMISSIONS,
  WEEKLY_TASKS,
  MOCK_USERS,
  MOCK_MENTOR_ASSIGNMENTS,
  TRACKS,
  getActiveUser,
  addTask,
  editTask,
  deleteTask,
  type Submission,
  type SubmissionStatus,
  type User,
  type WeeklyTask,
  type Track,
} from "@/lib/mock-data";
import {
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  Globe,
  Send,
  ShieldAlert,
  Award,
  FileCode,
  Users,
  ListFilter,
  ClipboardCheck,
  BookOpen,
  Plus,
  Trash2,
  Edit2,
  ArrowLeft,
  Layers,
  Sparkles,
  MessageSquare,
  Search,
  Calendar,
} from "lucide-react";
import Link from "next/link";

type SubFilter = "ALL" | "PENDING" | "APPROVED" | "REJECTED";
type Tab = "submissions" | "students" | "curriculum" | "questions";

export default function MentorDashboard() {
  const [activeMentor, setActiveMentor] = useState<User | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedSubId, setSelectedSubId] = useState<string>("");
  const [filter, setFilter] = useState<SubFilter>("ALL");
  const [feedback, setFeedback] = useState("");
  const [gradeStatus, setGradeStatus] = useState<SubmissionStatus>("APPROVED");
  
  // Tabs
  const [activeTab, setActiveTab] = useState<Tab>("submissions");

  // Curriculum Editor States
  const [selectedTrackIdForCurriculum, setSelectedTrackIdForCurriculum] = useState<string>("track_001");
  const [editingTask, setEditingTask] = useState<WeeklyTask | null>(null);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDetails, setNewTaskDetails] = useState("");
  const [newTaskWeek, setNewTaskWeek] = useState(1);
  const [newTaskDay, setNewTaskDay] = useState(1);
  const [newTaskHours, setNewTaskHours] = useState(3);
  const [newTaskPoints, setNewTaskPoints] = useState(100);
  const [newTaskInstructions, setNewTaskInstructions] = useState("");
  const [tasksList, setTasksList] = useState<WeeklyTask[]>([]);

  // Student Q&A States
  const [questions, setQuestions] = useState<any[]>([]);
  const [activeReplyId, setActiveReplyId] = useState<string>("");
  const [replyText, setReplyText] = useState("");

  // Student directory states
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [searchStudentQuery, setSearchStudentQuery] = useState("");

  const [allUsers, setAllUsers] = useState<User[]>(MOCK_USERS);

  useEffect(() => {
    setActiveMentor(getActiveUser());
    setTasksList(WEEKLY_TASKS);
    
    // Load local storage custom submissions
    if (typeof window !== "undefined") {
      const localSubs = localStorage.getItem("connexode_custom_submissions");
      const parsed = localSubs ? JSON.parse(localSubs) : [];
      // Combine seed submissions with local storage ones, ensuring no duplicate IDs
      const combined = [...parsed, ...SUBMISSIONS].reduce((acc: Submission[], item: Submission) => {
        if (!acc.some((s) => s.id === item.id)) {
          acc.push(item);
        }
        return acc;
      }, []);
      setSubmissions(combined);

      // Load combined static and dynamic users
      const dynamicUsersRaw = localStorage.getItem("connexode_dynamic_users");
      if (dynamicUsersRaw) {
        try {
          const dynamicUsers = JSON.parse(dynamicUsersRaw);
          const combinedUsers = [...dynamicUsers, ...MOCK_USERS].reduce((acc: User[], u: User) => {
            if (!acc.some((x) => x.id === u.id)) {
              const trackSaved = localStorage.getItem(`connexode_user_track_${u.id}`);
              if (trackSaved) {
                u.enrolledTrackId = trackSaved;
              }
              acc.push(u);
            }
            return acc;
          }, []);
          setAllUsers(combinedUsers);
        } catch (e) {
          console.error(e);
        }
      } else {
        const combinedUsers = MOCK_USERS.map((u) => {
          const trackSaved = localStorage.getItem(`connexode_user_track_${u.id}`);
          if (trackSaved) {
            return { ...u, enrolledTrackId: trackSaved };
          }
          return u;
        });
        setAllUsers(combinedUsers);
      }
    } else {
      setSubmissions(SUBMISSIONS);
    }
    // Load student Q&A tickets
    const loadTickets = () => {
      const stored = localStorage.getItem("connexode_qa_tickets");
      if (stored) {
        try {
          setQuestions(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      }
    };
    loadTickets();
  }, []);

  const handleReplySubmit = (e: React.FormEvent, ticketId: string) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const updated = questions.map((q) => {
      if (q.id === ticketId) {
        return {
          ...q,
          reply: replyText,
          status: "ANSWERED",
          repliedAt: new Date().toISOString()
        };
      }
      return q;
    });

    setQuestions(updated);
    localStorage.setItem("connexode_qa_tickets", JSON.stringify(updated));
    setReplyText("");
    setActiveReplyId("");
    alert("Reply sent to student successfully!");
  };

  const getStudentAppDetails = (studentId: string | undefined) => {
    if (!studentId) return null;
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("connexode_manual_payments");
      if (stored) {
        try {
          const payments = JSON.parse(stored);
          return payments.find((p: any) => p.userId === studentId);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return null;
  };

  // Determine tracks assigned to this mentor
  const mentorAssignments = activeMentor
    ? MOCK_MENTOR_ASSIGNMENTS.filter((a) => a.mentorId === activeMentor.id)
    : [];
  const assignedTrackIds = mentorAssignments.map((a) => a.trackId);

  // Filter students enrolled in mentor's tracks
  const assignedStudents = allUsers.filter(
    (u) => u.role === "STUDENT" && assignedTrackIds.includes(u.enrolledTrackId)
  );

  // Submissions for mentor's tracks
  const mentorSubmissions = submissions.filter((sub) => {
    const task = tasksList.find((t) => t.id === sub.taskId);
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
  const selectedTask = selectedSub ? tasksList.find((t) => t.id === selectedSub.taskId) : null;
  const selectedUser = selectedSub ? allUsers.find((u) => u.id === selectedSub.userId) : null;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSub) return;

    const updated = submissions.map((sub) =>
      sub.id === selectedSub.id
        ? {
            ...sub,
            status: gradeStatus,
            feedback: feedback || "Looks good! Great code formatting.",
            reviewedAt: new Date().toISOString(),
            points: gradeStatus === "APPROVED" ? (selectedTask?.points || 100) : 0,
          }
        : sub
    );
    setSubmissions(updated);

    // Persist to local storage
    if (typeof window !== "undefined") {
      const localSubs = JSON.parse(localStorage.getItem("connexode_custom_submissions") || "[]");
      const existsIndex = localSubs.findIndex((s: any) => s.id === selectedSub.id);
      if (existsIndex !== -1) {
        localSubs[existsIndex] = {
          ...localSubs[existsIndex],
          status: gradeStatus,
          feedback: feedback || "Looks good! Great code formatting.",
          reviewedAt: new Date().toISOString(),
          points: gradeStatus === "APPROVED" ? (selectedTask?.points || 100) : 0,
        };
      } else {
        localSubs.push({
          ...selectedSub,
          status: gradeStatus,
          feedback: feedback || "Looks good! Great code formatting.",
          reviewedAt: new Date().toISOString(),
          points: gradeStatus === "APPROVED" ? (selectedTask?.points || 100) : 0,
        });
      }
      localStorage.setItem("connexode_custom_submissions", JSON.stringify(localSubs));
    }

    alert(`Submission status updated to ${gradeStatus}!`);
    setFeedback("");
  };

  // Curriculum Handlers
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeMentor) return;

    const taskInstructionsList = newTaskInstructions
      .split("\n")
      .map((i) => i.trim())
      .filter((i) => i !== "");

    const newId = `task_mentor_${Math.random().toString(36).substring(2, 9)}`;
    const newWeeklyTask: WeeklyTask = {
      id: newId,
      trackId: selectedTrackIdForCurriculum,
      weekNo: Number(newTaskWeek),
      dayNo: Number(newTaskDay),
      title: newTaskTitle,
      taskDetails: newTaskDetails,
      instructions: taskInstructionsList.length > 0 ? taskInstructionsList : ["Follow instructions from your mentor."],
      estimatedHours: Number(newTaskHours),
      status: "LOCKED",
      points: Number(newTaskPoints),
    };

    addTask(newWeeklyTask, activeMentor);
    setTasksList([...WEEKLY_TASKS]);
    setIsAddingTask(false);
    
    // Reset form
    setNewTaskTitle("");
    setNewTaskDetails("");
    setNewTaskInstructions("");
    setNewTaskWeek(1);
    setNewTaskDay(1);
    setNewTaskHours(3);
    setNewTaskPoints(100);

    alert("Task added successfully to the track!");
  };

  const handleEditTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeMentor || !editingTask) return;

    editTask(editingTask.id, editingTask, activeMentor);
    setTasksList([...WEEKLY_TASKS]);
    setEditingTask(null);
    alert("Task updated successfully!");
  };

  const handleDeleteTask = (taskId: string) => {
    if (!activeMentor) return;
    if (!confirm("Are you sure you want to delete this task?")) return;

    deleteTask(taskId, activeMentor);
    setTasksList([...WEEKLY_TASKS]);
    alert("Task deleted successfully!");
  };

  const pendingCount = mentorSubmissions.filter((s) => s.status === "PENDING").length;

  if (!activeMentor) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#020B18] text-slate-400">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
      </div>
    );
  }

  // Filter students based on search query
  const filteredStudentsList = assignedStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchStudentQuery.toLowerCase()) ||
      student.username.toLowerCase().includes(searchStudentQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#020B18] text-slate-100 px-6 py-12 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-15%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[550px] h-[550px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 mx-auto max-w-7xl mb-10 flex flex-wrap items-center justify-between gap-6 border-b border-white/5 pb-8">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 mb-2.5 animate-pulse-slow">
            <ShieldAlert size={15} />
            <span className="text-[10px] font-extrabold uppercase tracking-widest">Mentor Command Workspace</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-white">
            Connexode <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-400 bg-clip-text text-transparent">Mentorship</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="group flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/4 px-4.5 py-3 text-xs font-bold hover:bg-white/8 hover:border-white/15 transition-all duration-300"
          >
            Student Panel
          </Link>
          <Link
            href="/admin"
            className="group flex items-center gap-1.5 rounded-xl border border-purple-500/20 bg-purple-500/10 px-4.5 py-3 text-xs font-bold text-purple-400 hover:bg-purple-500/15 hover:border-purple-500/30 transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.1)]"
          >
            Admin Panel
          </Link>
        </div>
      </header>

      {/* Navigation tabs */}
      <nav className="relative z-10 mx-auto max-w-7xl mb-8 flex border-b border-white/5 gap-2 text-xs font-bold overflow-x-auto scrollbar-none pb-0">
        <button
          onClick={() => setActiveTab("submissions")}
          className={`pb-4 px-4 transition-all duration-300 relative flex items-center gap-1.5 ${
            activeTab === "submissions" 
              ? "text-cyan-400 font-extrabold border-b-2 border-cyan-400" 
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <ClipboardCheck size={13} />
          Grading Queue
          <span className="ml-2 rounded-full bg-white/5 px-2 py-0.5 text-[9px] text-slate-500 font-semibold">{pendingCount}</span>
        </button>
        <button
          onClick={() => {
            setActiveTab("students");
            setSelectedStudentId(null);
          }}
          className={`pb-4 px-4 transition-all duration-300 relative flex items-center gap-1.5 ${
            activeTab === "students" 
              ? "text-cyan-400 font-extrabold border-b-2 border-cyan-400" 
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Users size={13} />
          Intern Records
        </button>
        <button
          onClick={() => setActiveTab("curriculum")}
          className={`pb-4 px-4 transition-all duration-300 relative flex items-center gap-1.5 ${
            activeTab === "curriculum" 
              ? "text-cyan-400 font-extrabold border-b-2 border-cyan-400" 
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <BookOpen size={13} />
          Curriculum Editor
        </button>
        <button
          onClick={() => setActiveTab("questions")}
          className={`pb-4 px-4 transition-all duration-300 relative flex items-center gap-1.5 ${
            activeTab === "questions" 
              ? "text-cyan-400 font-extrabold border-b-2 border-cyan-400" 
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <MessageSquare size={13} />
          Student Questions
          {questions.filter((q) => q.status === "PENDING" && assignedTrackIds.includes(q.trackId)).length > 0 && (
            <span className="ml-1.5 rounded-full bg-yellow-500/15 border border-yellow-500/25 px-2 py-0.5 text-[9px] font-black text-yellow-500 animate-pulse">
              {questions.filter((q) => q.status === "PENDING" && assignedTrackIds.includes(q.trackId)).length}
            </span>
          )}
        </button>
      </nav>

      {/* Dynamic Tabs View */}
      <main className="relative z-10 mx-auto max-w-7xl">
        {activeTab === "submissions" && (
          <div className="grid gap-6 lg:grid-cols-[1.2fr_2.2fr]">
            {/* Left Column: Submissions Queue & Student Lists */}
            <section className="space-y-6">
              {/* Submissions Queue */}
              <div className="rounded-2xl border border-white/8 bg-white/4 p-5 backdrop-blur-xl flex flex-col max-h-[480px]">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-display text-base font-bold text-white flex items-center gap-2">
                    <ClipboardCheck size={16} className="text-cyan-400" />
                    Review Queue
                  </h2>
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
                      const task = tasksList.find((t) => t.id === sub.taskId);
                      const user = allUsers.find((u) => u.id === sub.userId);
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

              {/* Quick Link to Student Records */}
              <div className="rounded-2xl border border-white/8 bg-white/4 p-5 backdrop-blur-xl">
                <h2 className="font-display text-base font-bold text-white flex items-center gap-2 mb-4">
                  <Users size={16} className="text-cyan-400" />
                  My Enrolled Interns
                </h2>
                <div className="space-y-3">
                  {assignedStudents.map((student) => {
                    return (
                      <button
                        key={student.id}
                        onClick={() => {
                          setSelectedStudentId(student.id);
                          setActiveTab("students");
                        }}
                        className="w-full flex items-center justify-between rounded-xl bg-white/4 p-3 border border-white/8 hover:bg-white/6 transition-all text-left"
                      >
                        <div>
                          <h4 className="text-xs font-bold text-slate-200">{student.name}</h4>
                          <p className="text-[9px] text-slate-500 mt-0.5">Week {student.currentWeek} · Day {student.currentDay}</p>
                        </div>
                        <span className="rounded-full bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 text-[10px] font-bold text-cyan-400">
                          {student.points.toLocaleString()} pts
                        </span>
                      </button>
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

                  {/* LinkedIn Proof of Work Verification */}
                  {selectedSub.linkedinUrl && (
                    <a
                      href={selectedSub.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="col-span-full flex items-center justify-between rounded-xl border border-blue-500/20 bg-blue-500/5 p-4.5 hover:bg-blue-500/10 hover:border-blue-500/35 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/15 text-blue-400">
                          <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">LinkedIn Proof of Work</h4>
                          <p className="text-[10px] text-slate-400">Verify learning post and public updates</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-blue-500/15 border border-blue-500/20 px-2 py-0.5 text-[9px] font-bold text-blue-400">
                          Needs Verification
                        </span>
                        <ExternalLink size={13} className="text-slate-500 group-hover:text-blue-400 transition-colors" />
                      </div>
                    </a>
                  )}
                </div>

                {/* AI Pre-Check Audit Panel */}
                {(selectedSub as any).aiFeedback && (
                  <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6 backdrop-blur-xl space-y-3">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Sparkles size={14} className="text-indigo-400" />
                        AI Pre-Check Audit Results
                      </span>
                      {(selectedSub as any).aiScore && (
                        <span className="rounded-md bg-indigo-500/15 px-2 py-0.5 text-2xs font-extrabold text-indigo-400">
                          AI Score: {(selectedSub as any).aiScore}/100
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-300 leading-relaxed max-h-[220px] overflow-y-auto custom-scrollbar font-mono whitespace-pre-wrap">
                      {(selectedSub as any).aiFeedback}
                    </div>
                  </div>
                )}

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
          </div>
        )}

        {/* Tab 2: Student Records & Complete Previous Tasks */}
        {activeTab === "students" && (
          <div className="grid gap-6 lg:grid-cols-[1.2fr_2.2fr]">
            {/* Student Directory List */}
            <section className="space-y-4">
              <div className="rounded-2xl border border-white/8 bg-white/4 p-5">
                <h3 className="font-display text-base font-bold text-white mb-4">Search Enrolled Interns</h3>
                <div className="relative mb-4 text-xs">
                  <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={searchStudentQuery}
                    onChange={(e) => setSearchStudentQuery(e.target.value)}
                    placeholder="Search by name or username..."
                    className="w-full rounded-xl border border-white/10 bg-black/20 pl-10 pr-4 py-3 text-slate-200 outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                  {filteredStudentsList.map((student) => {
                    const track = TRACKS.find((t) => t.id === student.enrolledTrackId);
                    const isSelected = student.id === selectedStudentId;

                    return (
                      <button
                        key={student.id}
                        onClick={() => setSelectedStudentId(student.id)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all duration-150 flex items-center justify-between ${
                          isSelected
                            ? "border-cyan-500/35 bg-cyan-500/8"
                            : "border-white/8 bg-white/4 hover:bg-white/6"
                        }`}
                      >
                        <div>
                          <h4 className="text-xs font-bold text-white">{student.name}</h4>
                          <p className="text-[10px] text-slate-500">@{student.username}</p>
                          <span
                            className="mt-1.5 inline-block rounded px-2 py-0.5 text-[9px] font-semibold text-slate-300"
                            style={{ backgroundColor: `${track?.color}15`, border: `1px solid ${track?.color}25` }}
                          >
                            {track?.title}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-cyan-400 block">{student.points} pts</span>
                          <span className="text-[9px] text-slate-500 font-medium">Rank: {student.rank}</span>
                        </div>
                      </button>
                    );
                  })}
                  {filteredStudentsList.length === 0 && (
                    <p className="text-center text-xs text-slate-600 py-6">No students found matching query.</p>
                  )}
                </div>
              </div>
            </section>

            {/* Student Complete Record Profile Timeline */}
            <section>
              {selectedStudentId ? (() => {
                const student = allUsers.find((u) => u.id === selectedStudentId);
                const track = TRACKS.find((t) => t.id === student?.enrolledTrackId);
                
                // Fetch all task records for this student's track, matched with submissions
                const studentTasks = tasksList.filter((t) => t.trackId === student?.enrolledTrackId);
                const studentSubs = submissions.filter((s) => s.userId === student?.id);

                return (
                  <div className="space-y-6">
                    {/* Header info card */}
                    <div className="rounded-2xl border border-white/8 bg-white/4 p-6">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block mb-1">
                            Student Profile (Mentorship View)
                          </span>
                          <h2 className="font-display text-2xl font-extrabold text-white">{student?.name}</h2>
                          <div className="mt-4 space-y-2 text-xs">
                            <div>
                              <span className="text-slate-500 font-bold block">Father's Name:</span>
                              <span className="text-slate-200 text-sm font-semibold">
                                {getStudentAppDetails(student?.id)?.fatherName || "Richard Johnson (Mock)"}
                              </span>
                            </div>
                            <div>
                              <span className="text-slate-500 font-bold block">LinkedIn Profile:</span>
                              {getStudentAppDetails(student?.id)?.projectsUrl ? (
                                <a
                                  href={getStudentAppDetails(student?.id).projectsUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-cyan-400 font-semibold hover:underline"
                                >
                                  {getStudentAppDetails(student?.id).projectsUrl}
                                </a>
                              ) : (
                                <span className="text-slate-500 italic">No LinkedIn/Projects URL provided</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Timeline list of all tasks */}
                    <div className="rounded-2xl border border-white/8 bg-white/4 p-6">
                      <h3 className="font-display text-base font-bold text-white mb-4 flex items-center gap-2">
                        <Layers size={18} className="text-cyan-400" />
                        Comprehensive Task Outline Timeline & Submission Logs
                      </h3>

                      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                        {studentTasks.map((task) => {
                          const sub = studentSubs.find((s) => s.taskId === task.id);
                          
                          return (
                            <div key={task.id} className="p-4 rounded-xl border border-white/8 bg-[#020B18]/50 space-y-3">
                              <div className="flex justify-between items-start flex-wrap gap-2">
                                <div>
                                  <span className="text-[9px] font-bold text-slate-500 uppercase">
                                    Week {task.weekNo} · Day {task.dayNo}
                                  </span>
                                  <h4 className="text-xs font-bold text-white">{task.title}</h4>
                                </div>
                                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                                  sub?.status === "APPROVED"
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                    : sub?.status === "PENDING"
                                    ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                    : sub?.status === "REJECTED"
                                    ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                    : "bg-slate-500/10 text-slate-500 border border-slate-500/20"
                                }`}>
                                  {sub ? sub.status : "NO SUBMISSION"}
                                </span>
                              </div>

                              {sub ? (
                                <div className="space-y-2.5 pt-2.5 border-t border-white/5 text-xs">
                                  <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                                    <a
                                      href={sub.githubUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-slate-400 hover:text-cyan-400 flex items-center gap-1 text-[11px]"
                                    >
                                      <FileCode size={12} /> GitHub Link
                                    </a>
                                    {sub.liveUrl && (
                                      <a
                                        href={sub.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-400 hover:text-teal-400 flex items-center gap-1 text-[11px]"
                                      >
                                        <Globe size={12} /> Live Link
                                      </a>
                                    )}
                                    {sub.linkedinUrl && (
                                      <a
                                        href={sub.linkedinUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-400 hover:text-blue-400 flex items-center gap-1 text-[11px]"
                                      >
                                        <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                                        </svg>
                                        LinkedIn Link
                                      </a>
                                    )}
                                  </div>

                                  {sub.feedback && (
                                    <div className="bg-black/20 p-2.5 rounded-lg border border-white/5">
                                      <span className="text-[10px] text-slate-500 font-bold block mb-1">Feedback remarks:</span>
                                      <p className="italic text-slate-300">&quot;{sub.feedback}&quot;</p>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <p className="text-[11px] text-slate-600 italic">This daily task has not been submitted by the student yet.</p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })() : (
                <div className="rounded-2xl border border-white/8 bg-white/4 p-12 text-center flex items-center justify-center">
                  <p className="text-slate-500 text-xs">Select an intern to view their complete academic record & task submissions history.</p>
                </div>
              )}
            </section>
          </div>
        )}

        {/* Tab 3: Mentor/Teacher Curriculum Edit outline workspace */}
        {activeTab === "curriculum" && (
          <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-lg font-bold text-white">Teacher Curriculum Editor</h3>
                <p className="text-xs text-slate-500">Edit, add, or delete outline tasks for track curricula assigned to you.</p>
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
                  {TRACKS.filter((track) => assignedTrackIds.includes(track.id)).map((track) => (
                    <option key={track.id} value={track.id}>
                      {track.title}
                    </option>
                  ))}
                  {assignedTrackIds.length === 0 && (
                    <option value="">No assigned tracks</option>
                  )}
                </select>

                <button
                  onClick={() => {
                    setIsAddingTask(true);
                    setEditingTask(null);
                  }}
                  disabled={assignedTrackIds.length === 0}
                  className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-4 py-2.5 text-xs font-bold text-[#020B18] hover:scale-[1.01] transition-all disabled:opacity-50"
                >
                  <Plus size={14} /> Add Task
                </button>
              </div>
            </div>

            {isAddingTask ? (
              /* Add Task Form */
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
                      placeholder="e.g. Implement middleware and JWT verification"
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      className="w-full rounded-xl border border-white/8 bg-[#020B18] px-4 py-3 text-slate-200 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Details / Description</label>
                    <textarea
                      required
                      placeholder="Detailed task outline and goals..."
                      value={newTaskDetails}
                      onChange={(e) => setNewTaskDetails(e.target.value)}
                      rows={3}
                      className="w-full rounded-xl border border-white/8 bg-[#020B18] px-4 py-3 text-slate-200 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Instructions (One instruction per line)</label>
                    <textarea
                      placeholder="Step 1: Create auth middleware...&#10;Step 2: Mount on protected endpoints..."
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
                    Publish Outline Task
                  </button>
                </form>
              </div>
            ) : editingTask ? (
              /* Edit Task Form */
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
                    Save Outline Changes
                  </button>
                </form>
              </div>
            ) : (
              /* Outline day timeline list */
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
                  <p className="text-center text-xs text-slate-600 py-12">No tasks defined for this track.</p>
                )}
              </div>
            )}
          </div>
        )}
        {activeTab === "questions" && (
          <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl space-y-4">
            <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <MessageSquare size={20} className="text-cyan-400" />
              Student Q&A Helpdesk Tickets
            </h3>
            <p className="text-xs text-slate-500">
              Review and reply to questions posted by students enrolled in your track courses. All responses show up instantly on their dashboard.
            </p>

            <div className="space-y-4 overflow-y-auto max-h-[600px] pr-1">
              {questions
                .filter((q) => assignedTrackIds.includes(q.trackId))
                .map((q) => (
                  <div key={q.id} className="p-5 rounded-xl border border-white/8 bg-white/3 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-white">{q.userName}</span>
                        <span className="text-[10px] text-slate-500 ml-2">ID: {q.userId}</span>
                      </div>
                      <span className={`rounded px-2 py-0.5 text-[9px] font-extrabold uppercase ${
                        q.status === "ANSWERED" ? "bg-emerald-500/10 text-emerald-400" : "bg-yellow-500/10 text-yellow-500"
                      }`}>
                        {q.status}
                      </span>
                    </div>

                    <p className="text-sm font-medium text-slate-200 bg-black/20 p-3 rounded-lg border border-white/5">
                      &quot;{q.question}&quot;
                    </p>

                    {q.reply ? (
                      <div className="pl-3 border-l-2 border-cyan-500 text-xs leading-normal">
                        <span className="font-bold text-slate-400 block mb-0.5">Your Response:</span>
                        <p className="text-cyan-400 italic">&quot;{q.reply}&quot;</p>
                      </div>
                    ) : (
                      <div className="space-y-2 pt-1.5">
                        {activeReplyId === q.id ? (
                          <form onSubmit={(e) => handleReplySubmit(e, q.id)} className="space-y-2">
                            <textarea
                              required
                              rows={2}
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder="Type your response to the student's question..."
                              className="w-full rounded-xl border border-white/10 bg-[#020B18] px-4 py-3 text-xs text-slate-200 outline-none focus:border-cyan-400/40"
                            />
                            <div className="flex gap-2">
                              <button
                                type="submit"
                                className="rounded-lg bg-cyan-500 px-4 py-2 text-2xs font-bold text-[#020B18] hover:scale-[1.01] transition-transform"
                              >
                                Send Reply
                              </button>
                              <button
                                type="button"
                                onClick={() => { setActiveReplyId(""); setReplyText(""); }}
                                className="rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-2xs text-slate-400 hover:text-white"
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        ) : (
                          <button
                            onClick={() => setActiveReplyId(q.id)}
                            className="rounded-lg bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 text-2xs font-bold text-cyan-400 hover:bg-cyan-500/15 transition-all"
                          >
                            Reply to Question
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              {questions.filter((q) => assignedTrackIds.includes(q.trackId)).length === 0 && (
                <p className="text-center text-xs text-slate-600 py-12">No student questions found in your track queue.</p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
