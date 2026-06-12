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
  getActiveUser,
  type Track,
  type WeeklyTask,
  type User,
  type Submission,
} from "@/lib/mock-data";
import { BookOpen, Users, GitBranch, ShieldAlert, Plus, LineChart, Code2, Award, Flame, Mail, GraduationCap, History, CheckCircle2, XCircle, Clock, Trash2, Edit2, ArrowLeft, FileText, Star, MessageSquare } from "lucide-react";
import Link from "next/link";

type Tab = "students" | "mentors" | "tracks" | "audits" | "curriculum" | "payments" | "mentor_applications" | "ambassador_applications" | "announcements";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("students");
  const [tracks, setTracks] = useState<Track[]>(TRACKS);
  const [tasksList, setTasksList] = useState<WeeklyTask[]>([]);
  const [logsList, setLogsList] = useState(MOCK_TASK_EDIT_LOGS);
  const [payments, setPayments] = useState<any[]>([]);
  const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<any | null>(null);
  const [mentorApplications, setMentorApplications] = useState<any[]>([]);
  const [ambassadorApplications, setAmbassadorApplications] = useState<any[]>([]);

  // Detailed Modal/View States
  const [selectedStudentDetailId, setSelectedStudentDetailId] = useState<string | null>(null);
  const [selectedMentorDetailId, setSelectedMentorDetailId] = useState<string | null>(null);
  const [adminReviewText, setAdminReviewText] = useState("");
  const [adminReviewBonusPoints, setAdminReviewBonusPoints] = useState(50);
  const [adminReviewsList, setAdminReviewsList] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isTrackDropdownOpen, setIsTrackDropdownOpen] = useState(false);
  const [mentorGuidelines, setMentorGuidelines] = useState("");
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [newAnnTitle, setNewAnnTitle] = useState("");
  const [newAnnContent, setNewAnnContent] = useState("");
  const [targetAudience, setTargetAudience] = useState<"ALL" | "MENTOR" | "INTERN" | "AMBASSADOR">("ALL");
  const [isBonusPointsDropdownOpen, setIsBonusPointsDropdownOpen] = useState(false);
  const [isTargetAudienceDropdownOpen, setIsTargetAudienceDropdownOpen] = useState(false);

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitle.trim() || !newAnnContent.trim()) return;

    const newAnn = {
      id: `ann_${Math.random().toString(36).substring(2, 9)}`,
      title: newAnnTitle,
      content: newAnnContent,
      createdAt: new Date().toISOString(),
      authorRole: "ADMIN",
      authorName: activeAdmin?.name || "System Admin",
      targetTrackId: "ALL",
      targetAudience: targetAudience,
    };

    const updated = [newAnn, ...announcements];
    setAnnouncements(updated);
    localStorage.setItem("connexode_announcements", JSON.stringify(updated));
    setNewAnnTitle("");
    setNewAnnContent("");
    alert("📢 Global announcement posted successfully to all students!");
  };

  const handleDeleteAnnouncement = (id: string) => {
    if (!confirm("Are you sure you want to delete this announcement?")) return;
    const updated = announcements.filter((a) => a.id !== id);
    setAnnouncements(updated);
    localStorage.setItem("connexode_announcements", JSON.stringify(updated));
    alert("Announcement deleted successfully!");
  };

  const handleAddAdminReview = (studentId: string) => {
    if (!adminReviewText.trim()) return;
    const storedReviews = JSON.parse(localStorage.getItem("connexode_admin_reviews") || "[]");
    const newReview = {
      id: `review_${Math.random().toString(36).substring(2, 9)}`,
      studentId,
      adminName: activeAdmin?.name || "Admin",
      remarks: adminReviewText,
      bonusPoints: Number(adminReviewBonusPoints),
      createdAt: new Date().toISOString(),
    };
    storedReviews.push(newReview);
    localStorage.setItem("connexode_admin_reviews", JSON.stringify(storedReviews));
    setAdminReviewsList(storedReviews);

    const updatedUsers = allUsers.map((u) => {
      if (u.id === studentId) {
        return {
          ...u,
          points: u.points + Number(adminReviewBonusPoints),
        };
      }
      return u;
    });
    setAllUsers(updatedUsers);

    if (typeof window !== "undefined") {
      const dynamicUsers = JSON.parse(localStorage.getItem("connexode_dynamic_users") || "[]");
      const uIndex = dynamicUsers.findIndex((u: any) => u.id === studentId);
      if (uIndex !== -1) {
        dynamicUsers[uIndex].points = (dynamicUsers[uIndex].points || 0) + Number(adminReviewBonusPoints);
        localStorage.setItem("connexode_dynamic_users", JSON.stringify(dynamicUsers));
      }
    }

    setAdminReviewText("");
    alert(`Success! Admin review submitted. Student rewarded with +${adminReviewBonusPoints} bonus points!`);
  };
  
  // Admin Curriculum Edit states
  const [selectedTrackIdForCurriculum, setSelectedTrackIdForCurriculum] = useState<string>("track_001");
  const [editingTask, setEditingTask] = useState<WeeklyTask | null>(null);
  const [activeWeekForCurriculum, setActiveWeekForCurriculum] = useState<number>(1);
  
  // Add task form states
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDetails, setNewTaskDetails] = useState("");
  const [newTaskWeek, setNewTaskWeek] = useState(1);
  const [newTaskDay, setNewTaskDay] = useState(1);
  const [newTaskHours, setNewTaskHours] = useState(3);
  const [newTaskPoints, setNewTaskPoints] = useState(100);
  const [newTaskInstructions, setNewTaskInstructions] = useState("");

  const [allUsers, setAllUsers] = useState<User[]>(MOCK_USERS);
  const [activeAdmin, setActiveAdmin] = useState<User | null>(null);

  useEffect(() => {
    const user = getActiveUser();
    if (!user || user.role !== "ADMIN") {
      window.location.href = "/register";
      return;
    }
    setActiveAdmin(user);
    setTasksList(WEEKLY_TASKS);
    setLogsList(MOCK_TASK_EDIT_LOGS);

    if (typeof window !== "undefined") {
      const localSubs = localStorage.getItem("connexode_custom_submissions");
      const parsedSubs = localSubs ? JSON.parse(localSubs) : [];
      const combinedSubs = [...parsedSubs, ...SUBMISSIONS].reduce((acc: Submission[], item: Submission) => {
        if (!acc.some((s) => s.id === item.id)) {
          acc.push(item);
        }
        return acc;
      }, []);
      setSubmissions(combinedSubs);

      const stored = localStorage.getItem("connexode_manual_payments");
      if (stored) {
        try {
          setPayments(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      }

      // Load mentor applications
      const storedApps = localStorage.getItem("connexode_mentor_applications");
      if (storedApps) {
        try {
          setMentorApplications(JSON.parse(storedApps));
        } catch (e) {
          console.error(e);
        }
      }

      // Load ambassador applications
      const storedAmb = localStorage.getItem("connexode_ambassador_applications");
      if (storedAmb) {
        try {
          setAmbassadorApplications(JSON.parse(storedAmb));
        } catch (e) {
          console.error(e);
        }
      }

      // Load admin reviews
      const storedReviews = localStorage.getItem("connexode_admin_reviews");
      if (storedReviews) {
        try {
          setAdminReviewsList(JSON.parse(storedReviews));
        } catch (e) {
          console.error(e);
        }
      }

      // Load mentor guidelines
      const storedGuidelines = localStorage.getItem("connexode_mentor_guidelines");
      if (storedGuidelines) {
        setMentorGuidelines(storedGuidelines);
      }

      // Load announcements
      const storedAnn = localStorage.getItem("connexode_announcements");
      if (storedAnn) {
        try {
          setAnnouncements(JSON.parse(storedAnn));
        } catch (e) {
          console.error(e);
        }
      }

      // Load combined static and dynamic users
      const dynamicUsersRaw = localStorage.getItem("connexode_dynamic_users");
      if (dynamicUsersRaw) {
        try {
          const dynamicUsers = JSON.parse(dynamicUsersRaw);
          const combined = [...dynamicUsers, ...MOCK_USERS].reduce((acc: User[], u: User) => {
            if (!acc.some((x) => x.id === u.id)) {
              const trackSaved = localStorage.getItem(`connexode_user_track_${u.id}`);
              if (trackSaved) {
                u.enrolledTrackId = trackSaved;
              }
              acc.push(u);
            }
            return acc;
          }, []);
          setAllUsers(combined);
        } catch (e) {
          console.error(e);
        }
      } else {
        const combined = MOCK_USERS.map((u) => {
          const trackSaved = localStorage.getItem(`connexode_user_track_${u.id}`);
          if (trackSaved) {
            return { ...u, enrolledTrackId: trackSaved };
          }
          return u;
        });
        setAllUsers(combined);
      }
    }
  }, []);

  const handleApprovePayment = (txId: string, trackId: string) => {
    const payment = payments.find((p) => p.id === txId);
    const userId = payment ? payment.userId : undefined;
    setPaymentStatus(trackId, "PAID", userId);
    
    // Also update dynamic users array to enroll the user in that track officially
    if (userId && typeof window !== "undefined") {
      const dynamicUsersRaw = localStorage.getItem("connexode_dynamic_users");
      if (dynamicUsersRaw) {
        try {
          const dynamicUsers = JSON.parse(dynamicUsersRaw);
          const userIdx = dynamicUsers.findIndex((u: any) => u.id === userId);
          if (userIdx !== -1) {
            dynamicUsers[userIdx].enrolledTrackId = trackId;
            localStorage.setItem("connexode_dynamic_users", JSON.stringify(dynamicUsers));
          }
        } catch (e) {
          console.error(e);
        }
      }
      localStorage.setItem(`connexode_user_track_${userId}`, trackId);

      // ── Set payment approved notification for the student dashboard banner ──
      const notifKey = `connexode_payment_approved_notif_${userId}`;
      localStorage.setItem(notifKey, JSON.stringify({
        trackTitle: payment?.trackTitle || "your internship track",
        approvedAt: new Date().toISOString(),
        dismissed: false,
      }));
    }

    const updatedPayments = payments.map((p) => {
      if (p.id === txId) {
        return { ...p, status: "APPROVED" };
      }
      return p;
    });
    setPayments(updatedPayments);
    localStorage.setItem("connexode_manual_payments", JSON.stringify(updatedPayments));

    // Simulated email notification
    alert(
      `✅ Payment APPROVED!\n\n` +
      `📧 Email sent to: ${payment?.userName || "student"}\n` +
      `Subject: "Your Connexode Payment is Verified — Start Your Internship!"\n\n` +
      `Message: "Hi ${payment?.userName || "student"}, your payment of Rs. 500 for ${payment?.trackTitle || "your internship"} has been verified. Your LMS workspace is now fully active. Visit your dashboard to begin."\n\n` +
      `The student's dashboard will show a confirmation banner on their next login.`
    );
  };

  const handleApproveMentor = (appId: string) => {
    const apps = [...mentorApplications];
    const appIndex = apps.findIndex((a) => a.id === appId);
    if (appIndex === -1) return;

    const app = apps[appIndex];
    app.status = "APPROVED";
    setMentorApplications(apps);
    localStorage.setItem("connexode_mentor_applications", JSON.stringify(apps));

    // Create a new MENTOR user and save to connexode_dynamic_users
    if (typeof window !== "undefined") {
      const dynamicUsers = JSON.parse(localStorage.getItem("connexode_dynamic_users") || "[]");
      
      const newMentorUser: User = {
        id: `usr_${Math.random().toString(36).substring(2, 9)}`,
        name: app.name,
        username: app.email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "-"),
        email: app.email,
        role: "MENTOR",
        points: 0,
        avatarInitials: app.name.substring(0, 2).toUpperCase(),
        enrolledTrackId: "",
        joinDate: new Date().toISOString().split("T")[0],
        streak: 0,
        rank: app.specialization || "Expert Mentor",
        currentWeek: 0,
        currentDay: 0,
        password: app.password,
        avatarImage: app.avatarImage,
      };

      dynamicUsers.push(newMentorUser);
      localStorage.setItem("connexode_dynamic_users", JSON.stringify(dynamicUsers));

      // Update local state users list to immediately reflect
      setAllUsers((prevUsers) => [...prevUsers, newMentorUser]);
    }

    alert(`✅ Mentor Application for ${app.name} APPROVED! They can now log in.`);
  };

  const handleRejectMentor = (appId: string) => {
    const apps = [...mentorApplications];
    const appIndex = apps.findIndex((a) => a.id === appId);
    if (appIndex === -1) return;

    const app = apps[appIndex];
    app.status = "REJECTED";
    setMentorApplications(apps);
    localStorage.setItem("connexode_mentor_applications", JSON.stringify(apps));

    alert(`❌ Mentor Application for ${app.name} REJECTED.`);
  };

  const handleApproveAmbassador = (appId: string) => {
    const apps = [...ambassadorApplications];
    const appIndex = apps.findIndex((a) => a.id === appId);
    if (appIndex === -1) return;

    const app = apps[appIndex];
    app.status = "APPROVED";
    setAmbassadorApplications(apps);
    localStorage.setItem("connexode_ambassador_applications", JSON.stringify(apps));

    alert(`✅ Campus Ambassador Application for ${app.fullName} APPROVED!`);
  };

  const handleRejectAmbassador = (appId: string) => {
    const apps = [...ambassadorApplications];
    const appIndex = apps.findIndex((a) => a.id === appId);
    if (appIndex === -1) return;

    const app = apps[appIndex];
    app.status = "REJECTED";
    setAmbassadorApplications(apps);
    localStorage.setItem("connexode_ambassador_applications", JSON.stringify(apps));

    alert(`❌ Campus Ambassador Application for ${app.fullName} REJECTED.`);
  };

  const handleRejectPayment = (txId: string, trackId: string) => {
    const payment = payments.find((p) => p.id === txId);
    const userId = payment ? payment.userId : undefined;
    setPaymentStatus(trackId, "PENDING", userId);
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

  // Filter students out of allUsers
  const students = allUsers.filter((u) => u.role === "STUDENT");
  const mentors = allUsers.filter((u) => u.role === "MENTOR");

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
    <div className="min-h-screen bg-[#020B18] text-slate-100 relative overflow-hidden flex">
      {/* Ambient background glows */}
      <div className="pointer-events-none fixed top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px]" />
      <div className="pointer-events-none fixed top-[20%] right-[-15%] w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-[130px]" />

      {/* ── LEFT SIDEBAR ── */}
      <aside className="fixed top-0 left-0 h-screen w-[240px] bg-[#080f1e] border-r border-white/5 flex flex-col z-40 shrink-0">
        {/* Brand */}
        <div className="px-5 py-5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="h-8 w-8 rounded-lg object-cover shadow-[0_0_12px_rgba(0,245,255,0.3)]" />
            <div>
              <p className="font-display text-sm font-bold text-white">Connex<span className="text-cyan-400">ode</span></p>
              <p className="text-[9px] font-extrabold uppercase tracking-widest text-purple-400">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* KPI mini stats */}
        <div className="grid grid-cols-2 gap-2 px-4 py-4 border-b border-white/5">
          {[
            { label: "Interns", value: totalStudents, color: "text-purple-400" },
            { label: "Tracks", value: totalTracks, color: "text-cyan-400" },
            { label: "Tasks", value: totalTasks, color: "text-emerald-400" },
            { label: "Submissions", value: totalSubmissions, color: "text-yellow-400" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl bg-white/4 border border-white/5 p-2.5 text-center">
              <p className={`text-base font-black ${s.color}`}>{s.value}</p>
              <p className="text-[9px] text-slate-500 font-semibold leading-none mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
          {([
            { id: "students", label: "Enrolled Interns", icon: Users, badge: totalStudents },
            { id: "mentors", label: "Mentor Performance", icon: GraduationCap, badge: mentors.length },
            { id: "tracks", label: "Curriculum Tracks", icon: GitBranch, badge: totalTracks },
            { id: "curriculum", label: "Outline Editor", icon: BookOpen, badge: null },
            { id: "audits", label: "Audit Feed", icon: History, badge: null },
            { id: "payments", label: "Approvals Queue", icon: Clock, badge: payments.filter((p) => p.status === "PENDING").length || null, badgeAlert: true },
            { id: "mentor_applications", label: "Mentor Applications", icon: GraduationCap, badge: mentorApplications.filter((a) => a.status === "PENDING").length || null, badgeAlert: true },
            { id: "ambassador_applications", label: "Ambassador Apps", icon: Star, badge: ambassadorApplications.filter((a) => a.status === "PENDING").length || null, badgeAlert: true },
            { id: "announcements", label: "Announcements Board", icon: ShieldAlert, badge: null },
          ] as any[]).map(({ id, label, icon: Icon, badge, badgeAlert }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as Tab)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group ${
                activeTab === id
                  ? "bg-purple-500/15 border border-purple-500/25 text-white shadow-[0_0_12px_rgba(168,85,247,0.15)]"
                  : "text-slate-400 hover:bg-white/5 hover:text-white border border-transparent"
              }`}
            >
              <Icon size={15} className={activeTab === id ? "text-purple-400" : "text-slate-500 group-hover:text-slate-300"} />
              <span className="flex-1 text-left">{label}</span>
              {badge ? (
                <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-black ${
                  badgeAlert ? "bg-yellow-500/15 text-yellow-500 animate-pulse" : "bg-white/5 text-slate-500"
                }`}>
                  {badge}
                </span>
              ) : null}
            </button>
          ))}
        </nav>

        {/* Bottom Admin Info + Logout */}
        <div className="px-4 py-4 border-t border-white/5 space-y-2">
          <div className="flex items-center gap-2.5 rounded-xl bg-white/4 border border-white/8 px-3 py-2.5">
            <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center text-[11px] font-extrabold text-purple-400">
              {activeAdmin?.avatarInitials || "AK"}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">{activeAdmin?.name || "Admin"}</p>
              <p className="text-[10px] text-slate-500 font-semibold">Super Admin</p>
            </div>
          </div>
          <Link
            href="/"
            onClick={() => { localStorage.removeItem("connexode_active_user"); }}
            className="flex items-center justify-center gap-1.5 w-full rounded-xl border border-red-500/20 bg-red-500/8 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/15 transition-all"
          >
            <Mail size={12} /> Log Out
          </Link>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 ml-[240px] min-h-screen">
        {/* Top Header bar */}
        <header className="sticky top-0 z-30 bg-[#080f1e]/80 backdrop-blur-xl border-b border-white/5 px-8 py-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-purple-400 mb-0.5">
              <ShieldAlert size={12} />
              <span className="text-[9px] font-extrabold uppercase tracking-widest">Administrator Operations</span>
            </div>
            <h1 className="font-display text-xl font-black tracking-tight text-white">
              Connexode <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Management</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
          </div>
        </header>

        <main className="px-8 py-8 space-y-8 max-w-6xl">
        {/* Dynamic Directory Grids */}
        <section className="rounded-2xl border border-white/5 bg-[#08101E]/40 p-6 sm:p-8 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.3)]">
          {activeTab === "students" && (
            selectedStudentDetailId ? (() => {
              const student = allUsers.find((u) => u.id === selectedStudentDetailId);
              if (!student) return null;
              const track = TRACKS.find((t) => t.id === student.enrolledTrackId);
              const studentTasks = tasksList.filter((t) => t.trackId === student.enrolledTrackId);
              const studentSubs = submissions.filter((s) => s.userId === student.id);
              const completedCount = studentSubs.filter((s) => s.status === "APPROVED").length;
              const progressPercent = studentTasks.length > 0 ? Math.round((completedCount / studentTasks.length) * 100) : 0;
              const studentReviews = adminReviewsList.filter((r) => r.studentId === student.id);

              return (
                <div className="space-y-6 animate-fade-in text-xs">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setSelectedStudentDetailId(null)}
                      className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                    >
                      <ArrowLeft size={14} /> Back to Directory
                    </button>
                    <span className="rounded bg-purple-500/10 border border-purple-500/25 px-2.5 py-1 text-[10px] font-extrabold text-purple-400 uppercase">
                      Admin Intern Inspector
                    </span>
                  </div>

                  {/* Profile detail card */}
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="md:col-span-2 rounded-xl border border-white/8 bg-[#080f1e]/60 p-6 space-y-4">
                      <div>
                        <p className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Intern Details</p>
                        <h3 className="font-display text-2xl font-black text-white mt-1">{student.name}</h3>
                        <p className="text-xs text-slate-400">@{student.username} · {student.email}</p>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-3 text-xs border-t border-white/5 pt-4">
                        <div>
                          <span className="text-slate-500 font-bold block">Enrolled Track:</span>
                          <span className="text-slate-200 font-semibold">{track?.title || "Not Enrolled"}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 font-bold block">Current Week / Day:</span>
                          <span className="text-slate-200 font-semibold">Week {student.currentWeek} · Day {student.currentDay}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 font-bold block">Join Date:</span>
                          <span className="text-slate-200 font-semibold">{student.joinDate}</span>
                        </div>
                      </div>

                      <div className="border-t border-white/5 pt-4">
                        <span className="text-slate-500 font-bold block text-xs mb-2">Track Completion Progress</span>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-300"
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-white shrink-0">{progressPercent}% ({completedCount}/{studentTasks.length} tasks)</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/8 bg-[#080f1e]/60 p-6 flex flex-col justify-between">
                      <div className="space-y-3">
                        <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Academic Performance</p>
                        <div className="flex justify-between items-baseline">
                          <span className="text-xs text-slate-400">Streak:</span>
                          <span className="text-base font-extrabold text-orange-400 flex items-center gap-1">
                            <Flame size={15} /> {student.streak} days
                          </span>
                        </div>
                        <div className="flex justify-between items-baseline">
                          <span className="text-xs text-slate-400">Total Points:</span>
                          <span className="text-lg font-black text-cyan-400">{student.points.toLocaleString()} pts</span>
                        </div>
                        <div className="flex justify-between items-baseline">
                          <span className="text-xs text-slate-400">Class Rank:</span>
                          <span className="text-xs font-bold text-slate-300">{student.rank}</span>
                        </div>
                      </div>

                      <div className="rounded-lg bg-white/4 border border-white/5 p-3 text-[11px] text-slate-400 mt-4 leading-normal">
                        ⚠️ Points can be adjusted by submitting administrative reviews below.
                      </div>
                    </div>
                  </div>

                  {/* Submissions & Timeline Logs */}
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-xl border border-white/8 bg-[#080f1e]/60 p-6 space-y-4">
                      <h4 className="font-display text-sm font-bold text-white flex items-center gap-2">
                        <GraduationCap size={16} className="text-purple-400" />
                        Intern Task Outline Timeline
                      </h4>
                      <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                        {studentTasks.map((task) => {
                          const sub = studentSubs.find((s) => s.taskId === task.id);
                          return (
                            <div key={task.id} className="p-3 rounded-lg border border-white/5 bg-[#020B18]/40 flex justify-between items-start text-xs">
                              <div>
                                <span className="text-[9px] font-bold text-slate-500 uppercase">Week {task.weekNo} · Day {task.dayNo}</span>
                                <h5 className="font-bold text-slate-200">{task.title}</h5>
                              </div>
                              <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${
                                sub?.status === "APPROVED" 
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                  : sub?.status === "PENDING"
                                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                  : sub?.status === "REJECTED"
                                  ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                  : "bg-slate-500/10 text-slate-500"
                              }`}>
                                {sub ? sub.status : "NO SUBMISSION"}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Admin Reviews & Actions */}
                    <div className="rounded-xl border border-white/8 bg-[#080f1e]/60 p-6 space-y-6">
                      <div>
                        <h4 className="font-display text-sm font-bold text-white flex items-center gap-2 mb-2">
                          <Star size={16} className="text-yellow-400" />
                          Admin Performance Review & Remarks
                        </h4>
                        <p className="text-[10px] text-slate-500">Provide official feedback and award extra bonus points to this student.</p>
                      </div>

                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleAddAdminReview(student.id);
                        }}
                        className="space-y-3 text-xs"
                      >
                        <div>
                          <label className="block text-slate-400 font-semibold mb-1">Remarks / Audit Feedback</label>
                          <textarea
                            required
                            value={adminReviewText}
                            onChange={(e) => setAdminReviewText(e.target.value)}
                            placeholder="Type official remarks for this intern..."
                            rows={3}
                            className="w-full rounded-xl border border-white/8 bg-[#020B18] px-4 py-2.5 text-slate-200 outline-none focus:border-purple-400"
                          />
                        </div>

                        <div className="relative">
                          <label className="block text-slate-400 font-semibold mb-1">Award Extra Points Bonus</label>
                          <button
                            type="button"
                            onClick={() => setIsBonusPointsDropdownOpen(!isBonusPointsDropdownOpen)}
                            className="w-full flex items-center justify-between gap-2 rounded-xl border border-white/8 bg-[#020B18] px-4 py-2.5 text-xs text-slate-200 outline-none hover:border-purple-400 text-left font-semibold"
                          >
                            <span>
                              {adminReviewBonusPoints === 10 && "+10 Points (Minor contribution)"}
                              {adminReviewBonusPoints === 50 && "+50 Points (Normal active participation)"}
                              {adminReviewBonusPoints === 100 && "+100 Points (Excellent task execution)"}
                              {adminReviewBonusPoints === 200 && "+200 Points (Exceptional capstone bonus)"}
                            </span>
                            <svg className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isBonusPointsDropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          {isBonusPointsDropdownOpen && (
                            <div className="absolute left-0 right-0 mt-2 rounded-xl border border-white/10 bg-[#080f1e]/95 backdrop-blur-xl shadow-2xl z-50 py-1">
                              {[
                                { val: 10, label: "+10 Points (Minor contribution)" },
                                { val: 50, label: "+50 Points (Normal active participation)" },
                                { val: 100, label: "+100 Points (Excellent task execution)" },
                                { val: 200, label: "+200 Points (Exceptional capstone bonus)" }
                              ].map((opt) => (
                                <button
                                  key={opt.val}
                                  type="button"
                                  onClick={() => {
                                    setAdminReviewBonusPoints(opt.val);
                                    setIsBonusPointsDropdownOpen(false);
                                  }}
                                  className={`w-full text-left px-4 py-2.5 text-xs transition-colors ${
                                    adminReviewBonusPoints === opt.val ? "bg-purple-500/10 text-purple-400 font-bold" : "text-slate-400 hover:bg-white/5 hover:text-white"
                                  }`}
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        <button
                          type="submit"
                          className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 py-3 font-bold text-white hover:scale-[1.01] transition-transform"
                        >
                          Submit Official Review & Reward Points
                        </button>
                      </form>

                      {/* Review History log */}
                      <div className="space-y-3 pt-4 border-t border-white/5">
                        <span className="text-slate-500 font-bold block text-xs">Review Remarks History</span>
                        <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
                          {studentReviews.map((rev: any) => (
                            <div key={rev.id} className="p-3 rounded-lg border border-white/5 bg-white/2 text-[11px] space-y-1">
                              <div className="flex justify-between items-center">
                                <span className="font-bold text-slate-300">{rev.adminName}</span>
                                <span className="text-[9px] text-slate-500">{new Date(rev.createdAt).toLocaleDateString()}</span>
                              </div>
                              <p className="text-slate-400 italic">&quot;{rev.remarks}&quot;</p>
                              <span className="text-[10px] text-emerald-400 font-semibold block">Bonus awarded: +{rev.bonusPoints} pts</span>
                            </div>
                          ))}
                          {studentReviews.length === 0 && (
                            <p className="text-slate-600 text-2xs italic">No admin reviews left for this student yet.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })() : (
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
                          <tr key={student.id} onClick={() => setSelectedStudentDetailId(student.id)} className="hover:bg-white/4 transition-colors cursor-pointer">
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
            )
          )}

          {activeTab === "mentors" && (
            selectedMentorDetailId ? (() => {
              const mentor = allUsers.find((u) => u.id === selectedMentorDetailId);
              if (!mentor) return null;
              
              const assignments = MOCK_MENTOR_ASSIGNMENTS.filter((a) => a.mentorId === mentor.id);
              const assignedTrackIds = assignments.map((a) => a.trackId);
              const stats = getMentorStats(mentor.id);

              const enrolledStudents = allUsers.filter((u) => u.role === "STUDENT" && assignedTrackIds.includes(u.enrolledTrackId));
              
              const trackSubmissions = submissions.filter((sub) => {
                const task = tasksList.find((t) => t.id === sub.taskId);
                return task && assignedTrackIds.includes(task.trackId);
              });
              const totalPendingSubs = trackSubmissions.filter((s) => s.status === "PENDING").length;
              const totalCheckedSubs = trackSubmissions.filter((s) => s.status === "APPROVED" || s.status === "REJECTED").length;
              const reviewRate = trackSubmissions.length > 0 ? Math.round((totalCheckedSubs / trackSubmissions.length) * 100) : 100;

              const storedTickets = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("connexode_qa_tickets") || "[]") : [];
              const mentorQuestions = storedTickets.filter((q: any) => assignedTrackIds.includes(q.trackId));
              const unansweredQuestions = mentorQuestions.filter((q: any) => !q.reply || q.status === "PENDING").length;
              const answeredQuestions = mentorQuestions.filter((q: any) => q.reply).length;
              const qaResolutionRate = mentorQuestions.length > 0 ? Math.round((answeredQuestions / mentorQuestions.length) * 100) : 100;

              return (
                <div className="space-y-6 animate-fade-in text-xs">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setSelectedMentorDetailId(null)}
                      className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                    >
                      <ArrowLeft size={14} /> Back to Directory
                    </button>
                    <span className="rounded bg-purple-500/10 border border-purple-500/25 px-2.5 py-1 text-[10px] font-extrabold text-purple-400 uppercase">
                      Admin Mentor Inspector
                    </span>
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="md:col-span-2 rounded-xl border border-white/8 bg-[#080f1e]/60 p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        {mentor.avatarImage ? (
                          <img src={mentor.avatarImage} alt={mentor.name} className="h-14 w-14 rounded-full object-cover border-2 border-cyan-400/25" />
                        ) : (
                          <div className="h-14 w-14 rounded-full bg-purple-500/20 flex items-center justify-center text-base font-extrabold text-purple-400">
                            {mentor.avatarInitials || "MC"}
                          </div>
                        )}
                        <div>
                          <p className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Advisor Details</p>
                          <h3 className="font-display text-xl font-black text-white">{mentor.name}</h3>
                          <p className="text-xs text-slate-400">{mentor.email} · {mentor.rank || "Instructor"}</p>
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-3 text-xs border-t border-white/5 pt-4">
                        <div>
                          <span className="text-slate-500 font-bold block">Assigned Tracks:</span>
                          <div className="text-slate-200 font-semibold space-y-0.5">
                            {assignments.map((a, i) => (
                              <div key={i}>• {a.trackTitle}</div>
                            ))}
                            {assignments.length === 0 && <div>None</div>}
                          </div>
                        </div>
                        <div>
                          <span className="text-slate-500 font-bold block">Daily Review Action Status:</span>
                          <span className={`inline-flex items-center gap-1.5 rounded px-2 py-0.5 mt-1 text-[10px] font-bold uppercase ${
                            totalPendingSubs === 0 
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                              : "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                          }`}>
                            {totalPendingSubs === 0 ? "Up to Date" : `${totalPendingSubs} Pending Tasks`}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-500 font-bold block">Daily Helpdesk Resolution:</span>
                          <span className={`inline-flex items-center gap-1.5 rounded px-2 py-0.5 mt-1 text-[10px] font-bold uppercase ${
                            unansweredQuestions === 0 
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                              : "bg-red-500/10 text-red-400 border border-red-500/20"
                          }`}>
                            {unansweredQuestions === 0 ? "All Cleared" : `${unansweredQuestions} Unanswered`}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/8 bg-[#080f1e]/60 p-6 space-y-3">
                      <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Performance Metrics</p>
                      <div className="flex justify-between items-baseline text-xs">
                        <span className="text-slate-400">Total Enrolled Interns:</span>
                        <span className="font-extrabold text-white text-sm">{enrolledStudents.length} Students</span>
                      </div>
                      <div className="flex justify-between items-baseline text-xs">
                        <span className="text-slate-400">Task Review Activity Rate:</span>
                        <span className="font-extrabold text-emerald-400 text-sm">{reviewRate}% ({totalCheckedSubs} checked)</span>
                      </div>
                      <div className="flex justify-between items-baseline text-xs">
                        <span className="text-slate-400">Q&A Ticket Response Rate:</span>
                        <span className="font-extrabold text-cyan-400 text-sm">{qaResolutionRate}% ({answeredQuestions} resolved)</span>
                      </div>
                    </div>
                  </div>

                  {/* Mentor Specific Guidelines Editor */}
                  <div className="rounded-xl border border-white/8 bg-[#080f1e]/60 p-6 space-y-3">
                    <h4 className="font-display text-sm font-bold text-white flex items-center gap-2">
                      <BookOpen size={16} className="text-cyan-400" />
                      Teacher Review Guidelines (Specific to {mentor.name})
                    </h4>
                    <p className="text-[10px] text-slate-500">Provide customized review and grading instructions for this mentor.</p>
                    <textarea
                      value={typeof window !== "undefined" ? (localStorage.getItem(`connexode_mentor_guidelines_${mentor.id}`) || "") : ""}
                      onChange={(e) => {
                        localStorage.setItem(`connexode_mentor_guidelines_${mentor.id}`, e.target.value);
                        setMentorGuidelines(e.target.value);
                      }}
                      placeholder={`Enter custom review guidelines for ${mentor.name}...`}
                      rows={3}
                      className="w-full rounded-xl border border-white/8 bg-[#020B18] px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-cyan-400"
                    />
                    <div className="text-[10px] text-emerald-400 font-semibold">
                      ✓ Guidelines saved specifically for {mentor.name}.
                    </div>
                  </div>

                  {/* Sub-directories of Mentor view */}
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-xl border border-white/8 bg-[#080f1e]/60 p-6 space-y-4">
                      <h4 className="font-display text-sm font-bold text-white flex items-center gap-2">
                        <Users size={16} className="text-purple-400" />
                        Enrolled Interns Under Mentor
                      </h4>
                      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                        {enrolledStudents.map((s) => (
                          <div key={s.id} className="p-3 rounded-lg border border-white/5 bg-[#020B18]/40 flex justify-between items-center text-xs">
                            <div>
                              <h5 className="font-bold text-white">{s.name}</h5>
                              <p className="text-[10px] text-slate-500">Week {s.currentWeek} · Day {s.currentDay}</p>
                            </div>
                            <span className="text-cyan-400 font-bold">{s.points} pts</span>
                          </div>
                        ))}
                        {enrolledStudents.length === 0 && (
                          <p className="text-slate-600 text-2xs italic text-center py-6">No students currently enrolled under this mentor's tracks.</p>
                        )}
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/8 bg-[#080f1e]/60 p-6 space-y-4">
                      <h4 className="font-display text-sm font-bold text-white flex items-center gap-2">
                        <MessageSquare size={16} className="text-cyan-400" />
                        Q&A Ticket Resolution Log
                      </h4>
                      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                        {mentorQuestions.map((q: any) => (
                          <div key={q.id} className="p-3 rounded-lg border border-white/5 bg-white/2 text-[11px] space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-slate-300">{q.userName}</span>
                              <span className={`rounded px-1.5 py-0.2 text-[8px] font-bold ${
                                q.reply ? "bg-emerald-500/10 text-emerald-400" : "bg-yellow-500/10 text-yellow-500"
                              }`}>{q.reply ? "RESOLVED" : "OPEN"}</span>
                            </div>
                            <p className="text-slate-400 italic font-mono bg-black/10 p-2 rounded">&quot;{q.question}&quot;</p>
                            {q.reply && (
                              <div className="pl-2 border-l-2 border-cyan-400">
                                <span className="text-[9px] text-slate-500 block">Mentor Response:</span>
                                <p className="text-cyan-400">&quot;{q.reply}&quot;</p>
                              </div>
                            )}
                          </div>
                        ))}
                        {mentorQuestions.length === 0 && (
                          <p className="text-slate-600 text-2xs italic text-center py-6">No helpdesk tickets raised under this mentor's tracks.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })() : (
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
                          <tr key={mentor.id} onClick={() => setSelectedMentorDetailId(mentor.id)} className="hover:bg-white/4 transition-colors cursor-pointer">
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
            )
          )}

          {activeTab === "announcements" && (
            <div className="space-y-6 animate-fade-in text-xs">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                    <ShieldAlert size={20} className="text-purple-400" />
                    Global Announcements Board
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Post notifications and announcements visible to all enrolled interns.</p>
                </div>
              </div>

              {/* Form to Post Announcement */}
              <div className="rounded-2xl border border-white/8 bg-[#080f1e]/60 p-6 backdrop-blur-xl space-y-4">
                <h4 className="font-display text-sm font-bold text-white">Post New Announcement</h4>
                <form onSubmit={handleAddAnnouncement} className="space-y-4">
                  <div className="relative z-20">
                    <label className="block text-2xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Target Audience</label>
                    <button
                      type="button"
                      onClick={() => setIsTargetAudienceDropdownOpen(!isTargetAudienceDropdownOpen)}
                      className="w-full flex items-center justify-between gap-2 rounded-xl border border-white/8 bg-[#020B18] px-4 py-2.5 text-xs text-slate-200 outline-none hover:border-purple-500 text-left font-semibold mb-4"
                    >
                      <span>
                        {targetAudience === "ALL" && "All"}
                        {targetAudience === "MENTOR" && "Mentor"}
                        {targetAudience === "INTERN" && "Interns"}
                        {targetAudience === "AMBASSADOR" && "Campus Ambassador"}
                      </span>
                      <svg className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isTargetAudienceDropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isTargetAudienceDropdownOpen && (
                      <div className="absolute left-0 right-0 mt-[-8px] rounded-xl border border-white/10 bg-[#080f1e]/95 backdrop-blur-xl shadow-2xl z-50 py-1">
                        {[
                          { val: "ALL", label: "All" },
                          { val: "MENTOR", label: "Mentor" },
                          { val: "INTERN", label: "Interns" },
                          { val: "AMBASSADOR", label: "Campus Ambassador" }
                        ].map((opt) => (
                          <button
                            key={opt.val}
                            type="button"
                            onClick={() => {
                              setTargetAudience(opt.val as any);
                              setIsTargetAudienceDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 text-xs transition-colors ${
                              targetAudience === opt.val ? "bg-purple-500/10 text-purple-400 font-bold" : "text-slate-400 hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-2xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Announcement Title</label>
                    <input
                      type="text"
                      value={newAnnTitle}
                      onChange={(e) => setNewAnnTitle(e.target.value)}
                      placeholder="e.g. System Maintenance or Final Project Submission Guidelines"
                      className="w-full rounded-xl border border-white/8 bg-[#020B18] px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-2xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Announcement Content</label>
                    <textarea
                      value={newAnnContent}
                      onChange={(e) => setNewAnnContent(e.target.value)}
                      placeholder="Enter detailed message details here..."
                      rows={4}
                      className="w-full rounded-xl border border-white/8 bg-[#020B18] px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-purple-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-xl bg-purple-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-purple-700 transition-all flex items-center gap-2"
                  >
                    <Plus size={14} /> Publish Announcement
                  </button>
                </form>
              </div>

              {/* Active Announcements List */}
              <div className="space-y-4">
                <h4 className="font-display text-sm font-bold text-white">Active Announcements ({announcements.filter(a => a.authorRole === "ADMIN").length})</h4>
                <div className="grid gap-4">
                  {announcements.filter(a => a.authorRole === "ADMIN").map((ann) => (
                    <div key={ann.id} className="rounded-xl border border-white/8 bg-[#080f1e]/60 p-5 flex justify-between items-start">
                      <div className="space-y-1.5 max-w-2xl">
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 text-[9px] font-bold text-purple-400 uppercase">
                            TO: {ann.targetAudience || "ALL"}
                          </span>
                          <h5 className="font-bold text-white text-sm">{ann.title}</h5>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">{ann.content}</p>
                        <p className="text-[10px] text-slate-500 font-mono">Posted on {new Date(ann.createdAt).toLocaleString()} by {ann.authorName}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteAnnouncement(ann.id)}
                        className="rounded-lg bg-red-500/10 border border-red-500/20 p-2 text-red-400 hover:bg-red-500/20 transition-all"
                        title="Delete Announcement"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  {announcements.filter(a => a.authorRole === "ADMIN").length === 0 && (
                    <div className="rounded-xl border border-dashed border-white/8 p-8 text-center text-slate-500 text-xs italic">
                      No active global announcements. Use the form above to post one.
                    </div>
                  )}
                </div>
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
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsTrackDropdownOpen(!isTrackDropdownOpen)}
                      className="flex items-center justify-between gap-2 rounded-xl border border-white/8 bg-[#020B18] px-4 py-2.5 text-xs text-slate-200 outline-none hover:border-cyan-400 min-w-[200px] text-left font-semibold"
                    >
                      <span>{tracks.find((t) => t.id === selectedTrackIdForCurriculum)?.title || "Select Track"}</span>
                      <svg className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isTrackDropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isTrackDropdownOpen && (
                      <div className="absolute right-0 mt-2 rounded-xl border border-white/10 bg-[#080f1e]/95 backdrop-blur-xl shadow-2xl z-50 py-1 max-h-60 overflow-y-auto min-w-[220px]">
                        {tracks.map((track) => (
                          <button
                            key={track.id}
                            type="button"
                            onClick={() => {
                              setSelectedTrackIdForCurriculum(track.id);
                              setEditingTask(null);
                              setIsAddingTask(false);
                              setIsTrackDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 text-xs transition-colors ${
                              selectedTrackIdForCurriculum === track.id ? "bg-purple-500/10 text-purple-400 font-bold" : "text-slate-400 hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            {track.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

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
                <div className="space-y-4">
                  {/* Week Tabs */}
                  <div className="flex flex-wrap gap-2 mb-4 bg-[#020B18]/60 p-2 rounded-2xl border border-white/5">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((w) => {
                      const weekTasks = tasksList.filter(
                        (t) => t.trackId === selectedTrackIdForCurriculum && t.weekNo === w
                      );
                      const isActive = activeWeekForCurriculum === w;
                      return (
                        <button
                          key={w}
                          type="button"
                          onClick={() => setActiveWeekForCurriculum(w)}
                          className={`flex-1 min-w-[80px] text-center py-2 rounded-xl text-xs font-bold transition-all border ${
                            isActive
                              ? "bg-purple-500/15 border-purple-500/35 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.15)]"
                              : "bg-white/4 border-transparent text-slate-400 hover:text-white"
                          }`}
                        >
                          Week {w}
                          <span className="block text-[9px] text-slate-500 font-semibold">{weekTasks.length} Days</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                    {tasksList
                      .filter((t) => t.trackId === selectedTrackIdForCurriculum && t.weekNo === activeWeekForCurriculum)
                      .sort((a, b) => a.dayNo - b.dayNo)
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

                    {tasksList.filter((t) => t.trackId === selectedTrackIdForCurriculum && t.weekNo === activeWeekForCurriculum).length === 0 && (
                      <p className="text-center text-xs text-slate-600 py-12">No tasks defined for this week.</p>
                    )}
                  </div>
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

          {activeTab === "mentor_applications" && (
            <div className="space-y-4">
              <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                <GraduationCap className="text-cyan-400" size={20} />
                Mentor Registration Applications
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-white/4 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-white/8">
                    <tr>
                      <th className="px-6 py-4">Name / Father's Name</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Specialization & Exp</th>
                      <th className="px-6 py-4">Profiles</th>
                      <th className="px-6 py-4">Bio / Description</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/8">
                    {mentorApplications.map((app) => (
                      <tr key={app.id} className="hover:bg-white/4 transition-colors">
                        <td className="px-6 py-4 font-semibold text-white">
                          <div className="flex items-center gap-2.5">
                            {app.avatarImage ? (
                              <img src={app.avatarImage} alt="Avatar" className="h-8 w-8 rounded-full object-cover border border-cyan-400/20" />
                            ) : (
                              <div className="h-8 w-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-[10px] font-bold text-cyan-400">
                                {app.name.substring(0, 2).toUpperCase()}
                              </div>
                            )}
                            <div>
                              <p>{app.name}</p>
                              <p className="text-[10px] text-slate-500 font-medium">S/O {app.fatherName}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs font-mono">{app.email}</td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-white font-medium">{app.specialization}</p>
                            <p className="text-[10px] text-slate-400">{app.experience}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 space-y-1">
                          <div>
                            <a href={app.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-400 hover:underline hover:text-cyan-300">LinkedIn</a>
                          </div>
                          <div>
                            <a href={app.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-teal-400 hover:underline hover:text-teal-300">GitHub</a>
                          </div>
                        </td>
                        <td className="px-6 py-4 max-w-[200px] text-xs text-slate-400 truncate" title={app.bio}>
                          {app.bio}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            app.status === "APPROVED"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : app.status === "REJECTED"
                              ? "bg-red-500/10 text-red-400 border border-red-500/20"
                              : "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                          }`}>
                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end items-center gap-2">
                            {app.status === "PENDING" && (
                              <>
                                <button
                                  onClick={() => handleApproveMentor(app.id)}
                                  className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-xs font-bold text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 transition-all"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleRejectMentor(app.id)}
                                  className="rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-1.5 text-xs font-bold text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {mentorApplications.length === 0 && (
                      <tr>
                        <td colSpan={7} className="text-center text-xs text-slate-500 py-12">
                          No mentor applications found in queue.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "ambassador_applications" && (
            <div className="space-y-4">
              <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                <Star className="text-yellow-400 fill-yellow-400" size={20} />
                Campus Ambassador Applications
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-white/4 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-white/8">
                    <tr>
                      <th className="px-6 py-4">Name / Contact</th>
                      <th className="px-6 py-4">University & Semester</th>
                      <th className="px-6 py-4">LinkedIn / Socials</th>
                      <th className="px-6 py-4">Motivation / Why</th>
                      <th className="px-6 py-4">Reach & Availability</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/8">
                    {ambassadorApplications.map((app) => (
                      <tr key={app.id} className="hover:bg-white/4 transition-colors">
                        <td className="px-6 py-4 font-semibold text-white">
                          <div>
                            <p>{app.fullName}</p>
                            <p className="text-[10px] text-slate-500 font-mono mt-0.5">{app.email}</p>
                            <p className="text-[10px] text-slate-500 font-mono">{app.phone}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-white font-medium">{app.university} ({app.city})</p>
                            <p className="text-[10px] text-slate-400">{app.degree} · Sem {app.semester}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 space-y-1">
                          {app.linkedin && (
                            <div>
                              <a href={app.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-400 hover:underline hover:text-cyan-300">LinkedIn</a>
                            </div>
                          )}
                          {app.instagram && (
                            <div>
                              <a href={app.instagram} target="_blank" rel="noopener noreferrer" className="text-xs text-purple-400 hover:underline hover:text-purple-300">Instagram</a>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 max-w-[200px] text-xs text-slate-400 truncate" title={app.whyAmbassador}>
                          {app.whyAmbassador}
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-white font-medium">Reach: {app.reachEstimate}</p>
                            <p className="text-[10px] text-slate-400">Hours: {app.availability}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            app.status === "APPROVED"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : app.status === "REJECTED"
                              ? "bg-red-500/10 text-red-400 border border-red-500/20"
                              : "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                          }`}>
                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end items-center gap-2">
                            {app.status === "PENDING" && (
                              <>
                                <button
                                  onClick={() => handleApproveAmbassador(app.id)}
                                  className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-xs font-bold text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 transition-all"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleRejectAmbassador(app.id)}
                                  className="rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-1.5 text-xs font-bold text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {ambassadorApplications.length === 0 && (
                      <tr>
                        <td colSpan={7} className="text-center text-xs text-slate-500 py-12">
                          No ambassador applications found in queue.
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
    </div>
  );
}


