"use client";

import { useState, useEffect } from "react";
import StatsRow from "@/components/dashboard/StatsRow";
import PhaseProgress from "@/components/dashboard/PhaseProgress";
import TaskList from "@/components/dashboard/TaskList";
import TrackRoadmap from "@/components/dashboard/TrackRoadmap";
import PaymentApprovedBanner from "@/components/dashboard/PaymentApprovedBanner";
import { getActiveUser, getPaymentStatus, getTrackMentor, TRACKS, SUBMISSIONS, WEEKLY_TASKS, type User } from "@/lib/mock-data";
import { BadgeCheck, GitBranch, ArrowRight, MessageSquare, Send, User as UserIcon, Zap, Clock, CheckCircle2, ExternalLink, Copy, FileText, Download, Trophy, Award, MapPin } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const UNIVERSITIES = [
  "FAST NUCES", "NUST", "COMSATS University", "UET Lahore", "UET Peshawar",
  "LUMS", "IBA Karachi", "NED University", "GIKI", "Air University",
  "Bahria University", "SZABIST", "Iqra University", "Virtual University",
  "University of Punjab", "University of Karachi", "Mehran UET",
  "Institute of Business Administration (IBA)", "PIEAS", "Other",
];

const CITIES = [
  "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Peshawar",
  "Quetta", "Multan", "Faisalabad", "Hyderabad", "Sialkot", "Other",
];

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view");

  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [paymentStatus, setPaymentStatusState] = useState<"PENDING" | "PENDING_VERIFICATION" | "PAID">("PENDING");
  const [profileDetails, setProfileDetails] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [supportMessages, setSupportMessages] = useState<any[]>([]);
  const [newSupportMsg, setNewSupportMsg] = useState("");
  const [dashboardMode, setDashboardMode] = useState<"INTERNSHIP" | "AMBASSADOR">("INTERNSHIP");

  // ── Ambassador Application States ──
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [customCity, setCustomCity] = useState("");
  const [university, setUniversity] = useState("");
  const [degree, setDegree] = useState("");
  const [semester, setSemester] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");
  const [whyAmbassador, setWhyAmbassador] = useState("");
  const [pastExperience, setPastExperience] = useState("");
  const [reachEstimate, setReachEstimate] = useState("");
  const [availability, setAvailability] = useState("");
  const [customUniversity, setCustomUniversity] = useState("");
  const [avatarImage, setAvatarImage] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // ── Assigned Task States ──
  const [studentAssignedTasks, setStudentAssignedTasks] = useState<any[]>([]);
  const [selectedStudentTask, setSelectedStudentTask] = useState<any | null>(null);
  const [studentProofUrl, setStudentProofUrl] = useState("");
  const [studentSubDesc, setStudentSubDesc] = useState("");
  const [studentMsgText, setStudentMsgText] = useState("");

  const loadQuestions = () => {
    if (typeof window !== "undefined") {
      const activeUserObj = getActiveUser();
      if (!activeUserObj) return;
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

  const loadSupportMessages = () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("connexode_global_chats");
      if (stored) {
        try {
          setSupportMessages(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      } else {
        const defaultMessages = [
          { id: "sm_1", studentId: "usr_001", studentName: "Alex Johnson", sender: "STUDENT", text: "Hello Admin, I organized a webinar at FAST Karachi today. Should I upload the recording Link?", timestamp: new Date(Date.now() - 3600000 * 2).toISOString() },
          { id: "sm_2", studentId: "usr_001", studentName: "Alex Johnson", sender: "ADMIN", text: "Yes Alex! Please upload the Drive or YouTube link to the outreach logs queue along with expected peers reached.", timestamp: new Date(Date.now() - 3600000 * 1.8).toISOString() }
        ];
        localStorage.setItem("connexode_global_chats", JSON.stringify(defaultMessages));
        setSupportMessages(defaultMessages);
      }
    }
  };

  const handleSendSupportMsg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSupportMsg.trim() || !activeUser) return;

    const newMessage = {
      id: `msg_${Date.now()}`,
      studentId: activeUser.id,
      studentName: activeUser.name,
      sender: "STUDENT",
      text: newSupportMsg.trim(),
      timestamp: new Date().toISOString()
    };

    const stored = localStorage.getItem("connexode_global_chats");
    const current = stored ? JSON.parse(stored) : [];
    const updated = [...current, newMessage];
    setSupportMessages(updated);
    localStorage.setItem("connexode_global_chats", JSON.stringify(updated));
    setNewSupportMsg("");
  };

  useEffect(() => {
    const user = getActiveUser();
    if (!user) {
      window.location.href = "/register";
      return;
    }
    setActiveUser(user);
    if (user.enrolledTrackId) {
      setPaymentStatusState(getPaymentStatus(user.enrolledTrackId, user.id));
    }
  }, []);

  useEffect(() => {
    if (activeUser) {
      setFullName(activeUser.name || "");
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
      loadSupportMessages();

      // Load announcements
      if (typeof window !== "undefined") {
        const storedAnn = localStorage.getItem("connexode_announcements");
        if (storedAnn) {
          try {
            setAnnouncements(JSON.parse(storedAnn));
          } catch (e) {
            console.error(e);
          }
        }
      }
    }
  }, [activeUser]);

  /*
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
  */



  // ── Campus Ambassador States ──
  const [ambassadorStatus, setAmbassadorStatus] = useState<"NONE" | "PENDING" | "APPROVED">("NONE");
  const [ambassadorDetails, setAmbassadorDetails] = useState<any>(null);
  const [outreachSubmissions, setOutreachSubmissions] = useState<any[]>([]);

  // Form states for activity logs
  const [selectedTask, setSelectedTask] = useState("Task A: Share Connexode Mission on LinkedIn");
  const [activityTitle, setActivityTitle] = useState("");
  const [proofUrl, setProofUrl] = useState("");
  const [description, setDescription] = useState("");
  const [peersReached, setPeersReached] = useState(10);

  // Referral generator states
  const [referralCode, setReferralCode] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [mediaAssets, setMediaAssets] = useState<any[]>([]);

  const loadAmbassadorData = (userEmail: string) => {
    if (typeof window === "undefined") return "NONE";
    let status = "NONE";

    // Load applications
    let storedApps = localStorage.getItem("connexode_ambassador_applications");
    if (!storedApps && userEmail.toLowerCase() === "alex@example.com") {
      const defaultApps = [
        {
          id: "amb_default",
          fullName: "Alex Johnson",
          email: "alex@example.com",
          phone: "03001234567",
          city: "Karachi",
          university: "FAST NUCES",
          degree: "BS Computer Science",
          semester: "6th Semester",
          linkedin: "https://linkedin.com/in/alex-johnson",
          reachEstimate: "100-500",
          availability: "4-8",
          avatarImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80",
          status: "APPROVED",
          submittedAt: new Date().toISOString()
        }
      ];
      localStorage.setItem("connexode_ambassador_applications", JSON.stringify(defaultApps));
      storedApps = JSON.stringify(defaultApps);
    }

    if (storedApps) {
      try {
        const apps = JSON.parse(storedApps);
        const userApp = apps.find((a: any) => a.email.toLowerCase() === userEmail.toLowerCase());
        if (userApp) {
          setAmbassadorStatus(userApp.status);
          setAmbassadorDetails(userApp);
          status = userApp.status;
        }
      } catch (e) {
        console.error(e);
      }
    }

    // Load submissions
    const storedSubs = localStorage.getItem("connexode_outreach_submissions");
    if (storedSubs) {
      try {
        const subs = JSON.parse(storedSubs);
        setOutreachSubmissions(subs.filter((s: any) => s.email.toLowerCase() === userEmail.toLowerCase()));
      } catch (e) {
        console.error(e);
      }
    }
    return status;
  };

  const loadStudentAssignedTasks = (userId: string, email: string) => {
    if (typeof window !== "undefined") {
      const storedAssigned = localStorage.getItem("connexode_assigned_tasks");
      if (storedAssigned) {
        try {
          const allTasks = JSON.parse(storedAssigned);
          const myTasks = allTasks.filter(
            (t: any) => t.studentId === userId || t.studentEmail?.toLowerCase() === email?.toLowerCase()
          );
          setStudentAssignedTasks(myTasks);
          return myTasks;
        } catch (e) {
          console.error(e);
        }
      }
    }
    return [];
  };

  const refreshStudentAssignedTasks = () => {
    if (activeUser) {
      const myTasks = loadStudentAssignedTasks(activeUser.id, activeUser.email);
      if (selectedStudentTask) {
        const updated = myTasks.find((t: any) => t.id === selectedStudentTask.id);
        if (updated) {
          setSelectedStudentTask(updated);
        }
      }
    }
  };

  useEffect(() => {
    if (activeUser) {
      const status = loadAmbassadorData(activeUser.email);
      loadStudentAssignedTasks(activeUser.id, activeUser.email);

      if (activeUser.role === "STUDENT") {
        if (status !== "APPROVED" && !activeUser.enrolledTrackId) {
          window.location.href = "/";
          return;
        }
      }

      if (activeUser.enrolledTrackId) {
        setDashboardMode("INTERNSHIP");
      } else {
        setDashboardMode("AMBASSADOR");
      }

      // Set default referral code based on username or email username
      const code = activeUser.username || activeUser.email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "-");
      setReferralCode(code);

      // Load announcements & media assets
      if (typeof window !== "undefined") {
        const storedAnn = localStorage.getItem("connexode_announcements");
        if (storedAnn) {
          try {
            setAnnouncements(JSON.parse(storedAnn));
          } catch (e) {
            console.error(e);
          }
        }

        let storedAssets = localStorage.getItem("connexode_media_assets");
        if (!storedAssets) {
          const defaultAssets = [
            { id: "asset_001", name: "Connexode Logo & Brand Book", desc: "Official logos, brand colors, and guidelines", format: "ZIP", size: "4.8 MB", url: "https://connexode.pk/assets/brand-book.zip", type: "FILE" },
            { id: "asset_002", name: "Campus Seminar Slide Deck", desc: "Ready-to-use presentation deck for workshops", format: "PPTX", size: "12.4 MB", url: "https://connexode.pk/assets/seminar-slides.pptx", type: "FILE" },
            { id: "asset_003", name: "Promo Banners & Story Templates", desc: "Flyers and layouts for WhatsApp & Instagram", format: "ZIP", size: "8.2 MB", url: "https://connexode.pk/assets/promo-banners.zip", type: "FILE" },
          ];
          localStorage.setItem("connexode_media_assets", JSON.stringify(defaultAssets));
          storedAssets = JSON.stringify(defaultAssets);
        }
        try {
          setMediaAssets(JSON.parse(storedAssets));
        } catch (e) {
          console.error(e);
        }
      }
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
        trackId: dashboardMode === "INTERNSHIP" ? activeUser.enrolledTrackId : "AMBASSADOR",
        question: newQuestion,
        reply: null,
        status: "PENDING",
        askedAt: new Date().toISOString(),
        repliedAt: null
      };
      allTickets.push(newTicket);
      localStorage.setItem("connexode_qa_tickets", JSON.stringify(allTickets));
      setNewQuestion("");
      // Refresh questions list
      const stored = localStorage.getItem("connexode_qa_tickets");
      if (stored) {
        setQuestions(JSON.parse(stored).filter((t: any) => t.userId === activeUser.id));
      }
      alert("Your message has been sent! Response will be sent in 24 hours.");
    }
  };

  const handleSubmitOutreach = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activityTitle.trim() || !proofUrl.trim() || !description.trim()) {
      alert("Please fill in all details.");
      return;
    }

    if (typeof window !== "undefined" && activeUser) {
      const stored = localStorage.getItem("connexode_outreach_submissions");
      const subs = stored ? JSON.parse(stored) : [];

      const newSub = {
        id: `out_${Math.random().toString(36).substring(2, 9)}`,
        fullName: activeUser.name,
        email: activeUser.email,
        taskLabel: selectedTask,
        title: activityTitle.trim(),
        proofUrl: proofUrl.trim(),
        description: description.trim(),
        peersReached: Number(peersReached),
        status: "PENDING",
        submittedAt: new Date().toISOString(),
        pointsEarned: 0,
      };

      subs.push(newSub);
      localStorage.setItem("connexode_outreach_submissions", JSON.stringify(subs));
      alert("🚀 Outreach activity log submitted to Admin for points verification!");
      
      setActivityTitle("");
      setProofUrl("");
      setDescription("");
      setPeersReached(10);
      loadAmbassadorData(activeUser.email);
    }
  };

  const handleSubmitStudentProof = (e: React.FormEvent, taskId: string) => {
    e.preventDefault();
    if (!studentProofUrl.trim() || !studentSubDesc.trim()) {
      alert("Please provide both a proof URL and a description.");
      return;
    }
    if (typeof window !== "undefined") {
      const storedAssigned = localStorage.getItem("connexode_assigned_tasks");
      const allTasks = storedAssigned ? JSON.parse(storedAssigned) : [];
      const tIndex = allTasks.findIndex((t: any) => t.id === taskId);
      if (tIndex !== -1) {
        allTasks[tIndex].status = "SUBMITTED";
        allTasks[tIndex].proofUrl = studentProofUrl.trim();
        allTasks[tIndex].submissionDesc = studentSubDesc.trim();
        allTasks[tIndex].submittedAt = new Date().toISOString();
        localStorage.setItem("connexode_assigned_tasks", JSON.stringify(allTasks));
        setStudentProofUrl("");
        setStudentSubDesc("");
        alert("🚀 Proof submitted successfully for verification!");
        refreshStudentAssignedTasks();
      }
    }
  };

  const handleSendStudentMsg = (e: React.FormEvent, taskId: string) => {
    e.preventDefault();
    if (!studentMsgText.trim()) return;
    if (typeof window !== "undefined") {
      const storedAssigned = localStorage.getItem("connexode_assigned_tasks");
      const allTasks = storedAssigned ? JSON.parse(storedAssigned) : [];
      const tIndex = allTasks.findIndex((t: any) => t.id === taskId);
      if (tIndex !== -1) {
        if (!allTasks[tIndex].questions) allTasks[tIndex].questions = [];
        allTasks[tIndex].questions.push({
          sender: "STUDENT",
          text: studentMsgText.trim(),
          timestamp: new Date().toISOString()
        });
        localStorage.setItem("connexode_assigned_tasks", JSON.stringify(allTasks));
        setStudentMsgText("");
        refreshStudentAssignedTasks();
      }
    }
  };

  if (!activeUser) {
    return (
      <div className="flex h-64 items-center justify-center text-slate-400">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
      </div>
    );
  }

  // ── STATE 1: User has not applied to Ambassador Program ──
  const validateApplication = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = "Full name is required.";
    if (!phone.trim() || !/^0[0-9]{10}$/.test(phone.replace(/-/g, ""))) errs.phone = "Valid Pakistani mobile (03xxxxxxxxx).";
    if (!city) {
      errs.city = "Please select your city.";
    } else if (city === "Other" && !customCity.trim()) {
      errs.customCity = "Please enter your city name.";
    }
    if (!university) {
      errs.university = "Please select your university.";
    } else if (university === "Other" && !customUniversity.trim()) {
      errs.customUniversity = "Please enter your university name.";
    }
    if (!degree.trim()) errs.degree = "Degree / Program is required.";
    if (!whyAmbassador.trim() || whyAmbassador.length < 80)
      errs.whyAmbassador = "Please write at least 80 characters explaining your motivation.";
    if (!reachEstimate.trim()) errs.reachEstimate = "Please estimate your student reach.";
    if (!availability) errs.availability = "Please select your availability.";
    if (!avatarImage) errs.avatarImage = "Profile photo is required.";
    return errs;
  };

  const handleApplyAmbassadorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateApplication();
    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }
    setFormErrors({});

    if (typeof window !== "undefined" && activeUser) {
      const stored = localStorage.getItem("connexode_ambassador_applications");
      const existing = stored ? JSON.parse(stored) : [];

      const newApp = {
        id: `amb_${Date.now()}`,
        fullName: fullName.trim(),
        email: activeUser.email,
        phone: phone.trim(),
        city: city === "Other" ? customCity.trim() : city,
        university: university === "Other" ? customUniversity.trim() : university,
        degree: degree.trim(),
        semester: semester.trim(),
        linkedin: linkedin.trim(),
        instagram: instagram.trim(),
        youtube: youtube.trim(),
        whyAmbassador: whyAmbassador.trim(),
        pastExperience: pastExperience.trim(),
        reachEstimate,
        availability,
        avatarImage,
        status: "PENDING",
        submittedAt: new Date().toISOString()
      };

      existing.push(newApp);
      localStorage.setItem("connexode_ambassador_applications", JSON.stringify(existing));
      alert("🎉 Your Ambassador application has been submitted successfully!");
      loadAmbassadorData(activeUser.email);
    }
  };

  const inputClsForm = (key: string) =>
    `w-full rounded-xl border ${formErrors[key] ? "border-red-500/50 bg-red-500/5" : "border-white/10 bg-[#0A1628]"} px-4 py-3 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-cyan-400/50 transition-colors`;

  if (dashboardMode === "AMBASSADOR" && ambassadorStatus === "NONE") {
    return (
      <div className="mx-auto max-w-3xl py-6 px-4 space-y-8 animate-fade-in">
        
        {/* Intro Banner */}
        <div className="rounded-3xl border border-white/8 bg-gradient-to-br from-[#0A1628] to-[#020B18] p-8 text-center space-y-4 shadow-2xl relative overflow-hidden">
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl bg-cyan-500/10" />
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400/10 border border-cyan-400/25 text-cyan-400 shadow-md">
            <Zap size={24} />
          </div>
          <div className="space-y-1.5 max-w-xl mx-auto">
            <span className="rounded-full bg-cyan-400/10 border border-cyan-400/20 px-3 py-1 text-[9px] font-extrabold text-cyan-400 uppercase tracking-widest">
              Ambassador Registration
            </span>
            <h1 className="font-display text-2xl font-black text-white">
              Join the Tech Leaders Network
            </h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              Complete the quick application form below. Represent Connexode on your campus, run workshops, earn stipends, and build your peer network.
            </p>
          </div>
        </div>

        {/* Application Form */}
        <div className="rounded-3xl border border-white/8 bg-[#040f21]/80 backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="border-b border-white/6 bg-white/3 px-8 py-5 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/15 border border-cyan-500/25">
              <Zap size={16} className="text-cyan-400" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-white">Ambassador Onboarding Form</h2>
              <p className="text-[10px] text-slate-500">Please provide valid academic credentials to unlock your dashboard.</p>
            </div>
          </div>

          <form onSubmit={handleApplyAmbassadorSubmit} className="p-8 space-y-6">
            
            {/* Section 1: Contact Details */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-cyan-400">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400/15 text-[9px] font-black">1</span>
                Contact Information
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">Profile Photo *</label>
                  <label className="flex flex-col items-center justify-center w-full h-24 rounded-xl border-2 border-dashed border-white/10 bg-[#0A1628] hover:bg-white/5 hover:border-cyan-500/35 transition-all cursor-pointer group">
                    <div className="flex flex-col items-center justify-center pt-2 pb-2">
                      <p className="text-[10px] text-slate-400 group-hover:text-slate-300"><span className="font-semibold">Click to upload profile photo</span></p>
                      <p className="text-[8px] text-slate-600">PNG, JPG up to 1MB</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 1024 * 1024) {
                            alert("File size exceeds 1MB limit!");
                            e.target.value = "";
                            return;
                          }
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setAvatarImage(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                  <input
                    type="text"
                    value={avatarImage || ""}
                    onChange={(e) => setAvatarImage(e.target.value)}
                    placeholder="Or paste a profile photo URL..."
                    className="mt-2 w-full rounded-xl border border-white/10 bg-[#0A1628] px-4 py-2.5 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-cyan-400/50 text-center"
                  />
                  {avatarImage && (
                    <div className="mt-2 flex items-center gap-2 rounded-xl bg-white/4 border border-white/5 p-2">
                      <img src={avatarImage} alt="Preview" className="h-8 w-8 rounded-full object-cover border border-cyan-400/30" />
                      <span className="text-[10px] text-slate-300 truncate flex-1">Image Loaded</span>
                      <button type="button" onClick={() => setAvatarImage("")} className="text-red-400 hover:text-red-300 text-[10px] font-bold">Remove</button>
                    </div>
                  )}
                  {formErrors.avatarImage && <p className="mt-1 text-[10px] text-red-400">{formErrors.avatarImage}</p>}
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">Full Name *</label>
                  <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Muhammad Ali" className={inputClsForm("fullName")} />
                  {formErrors.fullName && <p className="mt-1 text-[10px] text-red-400">{formErrors.fullName}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">Mobile Number *</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. 03001234567" className={inputClsForm("phone")} />
                  {formErrors.phone && <p className="mt-1 text-[10px] text-red-400">{formErrors.phone}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">City *</label>
                  <select value={city} onChange={(e) => setCity(e.target.value)} className={inputClsForm("city")}>
                    <option value="" className="bg-[#0A1628] text-slate-200">Select your city</option>
                    {CITIES.map((c) => (
                      <option key={c} value={c} className="bg-[#0A1628] text-slate-200">{c}</option>
                    ))}
                  </select>
                  {formErrors.city && <p className="mt-1 text-[10px] text-red-400">{formErrors.city}</p>}
                </div>

                {city === "Other" && (
                  <div>
                    <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">Custom City Name *</label>
                    <input
                      type="text"
                      value={customCity}
                      onChange={(e) => setCustomCity(e.target.value)}
                      placeholder="Write your city name here"
                      className={inputClsForm("customCity")}
                    />
                    {formErrors.customCity && <p className="mt-1 text-[10px] text-red-400">{formErrors.customCity}</p>}
                  </div>
                )}
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">University *</label>
                  <select value={university} onChange={(e) => setUniversity(e.target.value)} className={inputClsForm("university")}>
                    <option value="" className="bg-[#0A1628] text-slate-200">Select your university</option>
                    {UNIVERSITIES.map((u) => (
                      <option key={u} value={u} className="bg-[#0A1628] text-slate-200">{u}</option>
                    ))}
                  </select>
                  {formErrors.university && <p className="mt-1 text-[10px] text-red-400">{formErrors.university}</p>}
                </div>

                {university === "Other" && (
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">Custom University Name *</label>
                    <input
                      type="text"
                      value={customUniversity}
                      onChange={(e) => setCustomUniversity(e.target.value)}
                      placeholder="Write your university name here"
                      className={inputClsForm("customUniversity")}
                    />
                    {formErrors.customUniversity && <p className="mt-1 text-[10px] text-red-400">{formErrors.customUniversity}</p>}
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-white/5" />

            {/* Section 2: Academic Program */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-cyan-400">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400/15 text-[9px] font-black">2</span>
                Academic Program
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">Degree Title *</label>
                  <input type="text" value={degree} onChange={(e) => setDegree(e.target.value)} placeholder="e.g. BS Computer Science" className={inputClsForm("degree")} />
                  {formErrors.degree && <p className="mt-1 text-[10px] text-red-400">{formErrors.degree}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">Current Semester / Year</label>
                  <input type="text" value={semester} onChange={(e) => setSemester(e.target.value)} placeholder="e.g. 5th Semester" className={inputClsForm("semester")} />
                </div>
              </div>
            </div>

            <div className="border-t border-white/5" />

            {/* Section 3: Social handles & reach */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-cyan-400">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400/15 text-[9px] font-black">3</span>
                Socials & Reach
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">LinkedIn Profile URL *</label>
                  <input type="url" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="https://linkedin.com/in/username" className={inputClsForm("linkedin")} />
                  {formErrors.linkedin && <p className="mt-1 text-[10px] text-red-400">{formErrors.linkedin}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">Instagram Handle (optional)</label>
                  <input type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="@handle" className={inputClsForm("instagram")} />
                </div>
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">Estimated Campus Student Reach *</label>
                  <select value={reachEstimate} onChange={(e) => setReachEstimate(e.target.value)} className={inputClsForm("reachEstimate")}>
                    <option value="" className="bg-[#0A1628] text-slate-200">Select campus reach</option>
                    <option value="0-100" className="bg-[#0A1628] text-slate-200">0 – 100 students</option>
                    <option value="100-500" className="bg-[#0A1628] text-slate-200">100 – 500 students</option>
                    <option value="500-1000" className="bg-[#0A1628] text-slate-200">500 – 1,000 students</option>
                    <option value="1000-5000" className="bg-[#0A1628] text-slate-200">1,000 – 5,000 students</option>
                    <option value="5000+" className="bg-[#0A1628] text-slate-200">5,000+ students</option>
                  </select>
                  {formErrors.reachEstimate && <p className="mt-1 text-[10px] text-red-400">{formErrors.reachEstimate}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">Weekly Availability *</label>
                  <select value={availability} onChange={(e) => setAvailability(e.target.value)} className={inputClsForm("availability")}>
                    <option value="" className="bg-[#0A1628] text-slate-200">Select hours per week</option>
                    <option value="2-4" className="bg-[#0A1628] text-slate-200">2–4 hours / week</option>
                    <option value="4-8" className="bg-[#0A1628] text-slate-200">4–8 hours / week</option>
                    <option value="8-12" className="bg-[#0A1628] text-slate-200">8–12 hours / week</option>
                    <option value="12+" className="bg-[#0A1628] text-slate-200">12+ hours / week</option>
                  </select>
                  {formErrors.availability && <p className="mt-1 text-[10px] text-red-400">{formErrors.availability}</p>}
                </div>
              </div>
            </div>

            <div className="border-t border-white/5" />

            {/* Section 4: Motivation */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-cyan-400">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400/15 text-[9px] font-black">4</span>
                Motivation & Plan
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">Why do you want to be a Campus Ambassador? * (min. 80 chars)</label>
                  <textarea value={whyAmbassador} onChange={(e) => setWhyAmbassador(e.target.value)} rows={3} placeholder="Explain how you will represent Connexode and support developer initiatives at your campus..." className={inputClsForm("whyAmbassador")} />
                  <p className="mt-1 text-right text-[9px] text-slate-600 font-mono">{whyAmbassador.length} chars</p>
                  {formErrors.whyAmbassador && <p className="text-[10px] text-red-400">{formErrors.whyAmbassador}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">Past event coordination / society leadership experience</label>
                  <textarea value={pastExperience} onChange={(e) => setPastExperience(e.target.value)} rows={2} placeholder="e.g. Organized coding bootcamps, president of ACM, etc." className={inputClsForm("pastExperience")} />
                </div>
              </div>
            </div>

            <button type="submit" className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 py-4 text-xs font-extrabold text-[#020B18] shadow-[0_0_20px_rgba(0,245,255,0.25)] hover:scale-[1.01] transition-transform cursor-pointer">
              Submit Ambassador Application
            </button>
          </form>
        </div>

      </div>
    );
  }

  // ── STATE 2: Ambassador Application is Pending Review ──
  if (dashboardMode === "AMBASSADOR" && ambassadorStatus === "PENDING") {
    return (
      <div className="mx-auto max-w-4xl py-12 px-4 space-y-8 animate-fade-in">
        <div className="rounded-3xl border border-white/8 bg-gradient-to-br from-[#0A1628] to-[#020B18] p-10 text-center space-y-6 shadow-2xl">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-yellow-500/10 border border-yellow-500/25 shadow-lg text-yellow-400 animate-pulse">
            <Clock size={36} />
          </div>
          <div className="space-y-2 max-w-xl mx-auto">
            <span className="rounded-full bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 text-2xs font-extrabold text-yellow-400 uppercase tracking-widest">
              Application Under Review
            </span>
            <h1 className="font-display text-3xl font-black text-white">
              Verifying Ambassador Profile
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              We have received your application, <strong>{activeUser.name}</strong>! Our coordination team is verifying your university enrollment and social handles. You will be notified in 4 to 24 hours.
            </p>
          </div>
          <div className="pt-4 max-w-sm mx-auto">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-xs font-bold text-slate-300 hover:bg-white/10 transition-all"
            >
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── STATE 4: Internship Dashboard ──
  const isAmbassadorApproved = ambassadorStatus === "APPROVED";

  if (dashboardMode === "INTERNSHIP") {
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
    const currentWeek = activeUser.currentWeek || 1;
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

    if (currentView === "mentor") {
      return (
        <div className="mx-auto max-w-xl space-y-6 animate-fade-in py-8">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div>
              <Link
                href="/dashboard"
                className="mb-3 inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-400 transition-colors"
              >
                ← Back to Dashboard
              </Link>
              <h1 className="font-display text-2xl font-extrabold text-white">My Mentor</h1>
              <p className="text-xs text-slate-400 mt-1">Details about your assigned track advisor</p>
            </div>
          </div>

          {mentor ? (
            <div className="rounded-3xl border border-white/8 bg-white/4 p-8 backdrop-blur-xl space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-2 pb-4 border-b border-white/5">
                <BadgeCheck className="text-cyan-400" size={22} />
                <h2 className="font-display text-lg font-extrabold text-white">Assigned Track Mentor</h2>
              </div>
              
              <div className="flex flex-col items-center text-center space-y-4 py-4">
                {mentor.avatarImage ? (
                  <img
                    src={mentor.avatarImage}
                    alt={mentor.name}
                    className="h-24 w-24 rounded-full object-cover border-2 border-cyan-400/20 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 p-[2px] shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-[#030c1c] text-2xl font-black text-white">
                      {mentor.avatarInitials || mentor.name.substring(0, 2).toUpperCase()}
                    </div>
                  </div>
                )}
                
                <div>
                  <h3 className="text-xl font-bold text-white">{mentor.name}</h3>
                  <p className="text-xs uppercase tracking-wider text-cyan-400 font-black mt-1">
                    {mentor.rank || "Expert Mentor"}
                  </p>
                  <p className="text-xs text-slate-500 font-mono mt-1">{mentor.email}</p>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5 text-xs leading-relaxed text-slate-400">
                <div className="rounded-xl bg-white/2 border border-white/5 p-4 space-y-2">
                  <span className="text-white font-bold block text-2xs uppercase tracking-wider text-cyan-400">How your mentor helps:</span>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Reviews and grades your weekly task submissions.</li>
                    <li>Provides feedback and score boosts on approved tasks.</li>
                    <li>Answers Q&A technical questions within 24 hours.</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/8 bg-white/4 p-8 text-center text-slate-400">
              No mentor is currently assigned to this track.
            </div>
          )}
        </div>
      );
    }

    const relevantInternAnnouncements = announcements.filter((ann) => {
      if (ann.authorRole === "MENTOR") {
        return ann.targetTrackId === activeUser.enrolledTrackId;
      }
      const audience = ann.targetAudience || "ALL";
      return audience === "ALL" || audience === "INTERN";
    });

    return (
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Mode Switcher */}
        {isAmbassadorApproved && (
          <div className="flex justify-between items-center bg-white/4 border border-white/8 rounded-2xl p-4 mb-6 backdrop-blur-xl">
            <div>
              <h3 className="text-sm font-bold text-white">Switch Dashboard Mode</h3>
              <p className="text-[10px] text-slate-500">You are enrolled in both the Internship & Ambassador programs.</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setDashboardMode("INTERNSHIP")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  (dashboardMode as string) === "INTERNSHIP"
                    ? "bg-cyan-500 text-[#020B18]"
                    : "bg-white/5 text-slate-400 hover:text-white"
                }`}
              >
                Internship Workspace
              </button>
              <button
                onClick={() => setDashboardMode("AMBASSADOR")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  (dashboardMode as string) === "AMBASSADOR"
                    ? "bg-yellow-500 text-[#020B18]"
                    : "bg-white/5 text-slate-400 hover:text-white"
                }`}
              >
                Ambassador Portal
              </button>
            </div>
          </div>
        )}

        {/* Announcements notice board */}
        {relevantInternAnnouncements.length > 0 && (
          <div className="rounded-2xl border border-white/8 bg-gradient-to-r from-purple-900/10 via-[#080f1e]/85 to-cyan-900/10 p-5 backdrop-blur-xl space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
              <h3 className="font-display text-xs font-bold text-white flex items-center gap-2">
                <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                📢 Board Announcements & Updates
              </h3>
              <span className="text-[9px] text-slate-500 font-extrabold uppercase tracking-widest bg-white/4 px-2 py-0.5 rounded">
                {relevantInternAnnouncements.length} Alert{relevantInternAnnouncements.length > 1 ? "s" : ""}
              </span>
            </div>
            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
              {relevantInternAnnouncements.map((ann) => (
                <div
                  key={ann.id}
                  className={`p-3.5 rounded-xl border text-[11px] space-y-1.5 transition-all ${
                    ann.authorRole === "ADMIN"
                      ? "border-purple-500/15 bg-purple-500/5 hover:bg-purple-500/8"
                      : "border-cyan-500/15 bg-cyan-500/5 hover:bg-cyan-500/8"
                  }`}
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`rounded px-1.5 py-0.2 text-[8px] font-bold uppercase tracking-wider ${
                        ann.authorRole === "ADMIN" ? "bg-purple-500/20 text-purple-400" : "bg-cyan-500/20 text-cyan-400"
                      }`}>
                        {ann.authorRole === "ADMIN" ? "Global Alert" : "Mentor Update"}
                      </span>
                      <h4 className="font-bold text-white">{ann.title}</h4>
                    </div>
                    <span className="text-[9px] text-slate-500 font-mono">{new Date(ann.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{ann.content}</p>
                  <div className="text-[10px] text-slate-500">
                    Posted by <span className="font-semibold text-slate-300">{ann.authorName}</span>{ann.authorRole === "ADMIN" && <span className="text-purple-400 font-bold ml-1.5">(Admin)</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
                className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-cyan-400 py-2.5 text-xs font-bold text-[#020B18] hover:scale-[1.01] transition-transform cursor-pointer"
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

  // ── STATE 3: Approved Campus Ambassador Dashboard ──
  const totalPoints = outreachSubmissions
    .filter((s) => s.status === "APPROVED")
    .reduce((sum, curr) => sum + (curr.pointsEarned || 0), 0);

  const approvedEvents = outreachSubmissions.filter(
    (s) => s.status === "APPROVED" && s.taskLabel.includes("Host")
  ).length;

  const relevantAnnouncements = announcements.filter((ann) => {
    return ann.targetAudience === "ALL" || ann.targetAudience === "AMBASSADOR";
  });

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Mode Switcher */}
      {isAmbassadorApproved && activeUser.enrolledTrackId && (
        <div className="flex justify-between items-center bg-white/4 border border-white/8 rounded-2xl p-4 mb-6 backdrop-blur-xl">
          <div>
            <h3 className="text-sm font-bold text-white">Switch Dashboard Mode</h3>
            <p className="text-[10px] text-slate-500">You are enrolled in both the Internship & Ambassador programs.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setDashboardMode("INTERNSHIP")}
              className="px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer bg-white/5 text-slate-400 hover:text-white"
            >
              Internship Workspace
            </button>
            <button
              onClick={() => setDashboardMode("AMBASSADOR")}
              className="px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer bg-yellow-500 text-[#020B18]"
            >
              Ambassador Portal
            </button>
          </div>
        </div>
      )}
      
      {/* Announcements Notice Board */}
      {relevantAnnouncements.length > 0 && (
        <div className="rounded-2xl border border-white/8 bg-gradient-to-r from-purple-900/10 via-[#080f1e]/85 to-cyan-900/10 p-5 backdrop-blur-xl space-y-4 animate-fade-in">
          <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
            <h3 className="font-display text-xs font-bold text-white flex items-center gap-2">
              <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
              📢 Ambassador Announcements & Campaign Briefings
            </h3>
            <span className="text-[9px] text-slate-500 font-extrabold uppercase tracking-widest bg-white/4 px-2 py-0.5 rounded">
              {relevantAnnouncements.length} Update{relevantAnnouncements.length > 1 ? "s" : ""}
            </span>
          </div>
          <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
            {relevantAnnouncements.map((ann) => (
              <div
                key={ann.id}
                className="p-3.5 rounded-xl border border-purple-500/15 bg-purple-500/5 hover:bg-purple-500/8 text-[11px] space-y-1.5 transition-all"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-purple-500/20 text-purple-400 px-1.5 py-0.2 text-[8px] font-bold uppercase tracking-wider">
                      Global Announcement
                    </span>
                    <h4 className="font-bold text-white">{ann.title}</h4>
                  </div>
                  <span className="text-[9px] text-slate-500 font-mono">{new Date(ann.createdAt).toLocaleString()}</span>
                </div>
                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{ann.content}</p>
                <div className="text-[10px] text-slate-500">
                  Posted by <span className="font-semibold text-slate-300">{ann.authorName}</span> <span className="text-purple-400 font-bold ml-1.5">(Admin)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ambassador Welcome Header & Referral Link Generator */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card & Custom Ref Link */}
        <div className="relative overflow-hidden rounded-2xl border border-yellow-500/25 bg-gradient-to-br from-[#0D1B2A] to-[#020B18] p-6 shadow-xl md:col-span-2 space-y-4">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl bg-yellow-500/15" />
          <div className="relative flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="mb-1 text-[10px] uppercase font-bold tracking-widest text-yellow-500/70">Campus Ambassador Lead</p>
              <h2 className="font-display text-2xl font-black text-white">
                {activeUser.name}
              </h2>
              <p className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                Active Ambassador · {ambassadorDetails?.university || "FAST NUCES"}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1.5 text-right">
              <span className="rounded-full bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 text-[9px] font-black uppercase tracking-wider text-yellow-400 flex items-center gap-1 shadow-sm">
                <Trophy size={11} className="text-yellow-400 animate-bounce" />
                Campus Tech Lead
              </span>
            </div>
          </div>

          <div className="border-t border-white/5 pt-4 space-y-3">
            <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Copy size={11} className="text-yellow-500" />
              Your Custom Referral Code & Link
            </h4>
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="text"
                value={`https://connexode.pk/ref?code=${referralCode}`}
                readOnly
                className="flex-1 min-w-[200px] rounded-xl border border-white/10 bg-[#030a16] px-3 py-2.5 text-xs text-slate-300 font-mono select-all outline-none"
              />
              <button
                onClick={() => {
                  if (typeof navigator !== "undefined") {
                    navigator.clipboard.writeText(`https://connexode.pk/ref?code=${referralCode}`);
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 2000);
                  }
                }}
                className="rounded-xl bg-yellow-500 hover:bg-yellow-400 px-4 py-2.5 text-xs font-black text-[#020B18] transition-all flex items-center gap-1 cursor-pointer"
              >
                {isCopied ? "Copied! ✓" : "Copy Link"}
              </button>
            </div>
            <p className="text-[9px] text-slate-500">Every student signing up using this link adds referrals to your stats and unlocks point bonuses!</p>
          </div>
        </div>

        {/* Realtime Referral Analytics */}
        <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 flex items-center gap-1.5 mb-3">
              <MapPin size={12} className="text-yellow-500" />
              Referral Analytics
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-xs text-slate-500">Link Clicks</span>
                <span className="text-sm font-bold text-white font-mono">148</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-xs text-slate-500">Signups / Registrations</span>
                <span className="text-sm font-bold text-white font-mono">32</span>
              </div>
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs text-slate-500">Paid Enrolls</span>
                <span className="text-sm font-bold text-emerald-400 font-mono">8</span>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-3">
            <span className="text-[9px] text-yellow-500 font-semibold flex items-center gap-1 leading-relaxed">
              🔥 1 Active signup = +50 points!
            </span>
          </div>
        </div>
      </div>

      {/* Gamified Milestone Perks Gauge */}
      <div className="rounded-2xl border border-white/8 bg-gradient-to-r from-yellow-500/5 via-[#040e1c] to-yellow-500/5 p-6 backdrop-blur-xl space-y-4">
        {(() => {
          // Calculate Tier
          let currentTier = "Bronze";
          let nextTier = "Silver";
          let pointsNeeded = 500;
          let currentMilestone = 150;
          let nextMilestone = 500;
          let tierPerks = "Official Digital Badge & Verified Campus Ambassador Certificate.";

          if (totalPoints >= 1000) {
            currentTier = "Gold";
            nextTier = "Platinum";
            pointsNeeded = 2000;
            currentMilestone = 1000;
            nextMilestone = 2000;
            tierPerks = "Rs. 5,000 monthly cash stipend + Premium LinkedIn Recommendation Letter.";
          } else if (totalPoints >= 500) {
            currentTier = "Silver";
            nextTier = "Gold";
            pointsNeeded = 1000;
            currentMilestone = 500;
            nextMilestone = 1000;
            tierPerks = "Official Connexode Ambassador Hoodie, swag stickers, & notebook pack.";
          } else if (totalPoints >= 150) {
            currentTier = "Bronze";
            nextTier = "Silver";
            pointsNeeded = 500;
            currentMilestone = 150;
            nextMilestone = 500;
            tierPerks = "Official Digital Badge & Verified Campus Ambassador Certificate.";
          } else {
            currentTier = "Onboarding";
            nextTier = "Bronze";
            pointsNeeded = 150;
            currentMilestone = 0;
            nextMilestone = 150;
            tierPerks = "Complete 1 initial outreach task to unlock Bronze level!";
          }

          const progressPercent = Math.min(
            100,
            Math.max(5, ((totalPoints - currentMilestone) / (nextMilestone - currentMilestone)) * 100)
          );

          return (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-display text-sm font-extrabold text-white flex items-center gap-2">
                    <Award size={16} className="text-yellow-500 animate-spin" style={{ animationDuration: "12s" }} />
                    Milestone Perks & Rewards Progress
                  </h3>
                  <p className="text-[10px] text-slate-500 mt-0.5">Earn points to unlock cash incentives, custom swags, and recommendation letters.</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">Current Reward Tier</span>
                  <span className="text-sm font-black text-yellow-400 font-display uppercase tracking-widest">{currentTier} Lead</span>
                </div>
              </div>

              {/* Progress Gauge */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>{currentMilestone} PTS ({currentTier})</span>
                  <span className="font-semibold text-slate-300">{totalPoints} / {nextMilestone} PTS</span>
                  <span>{nextMilestone} PTS ({nextTier})</span>
                </div>
                <div className="relative h-3 w-full rounded-full bg-white/5 overflow-hidden border border-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.3)] transition-all duration-1000"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex items-start gap-2 rounded-xl bg-yellow-500/5 border border-yellow-500/10 p-3 mt-3 text-xs leading-relaxed text-slate-400">
                  <span className="text-yellow-400 font-extrabold text-[10px] uppercase tracking-wider block shrink-0 mt-0.5">Unlocked Perks:</span>
                  <p className="flex-1 text-[11px]">{tierPerks}</p>
                </div>
              </div>
            </>
          );
        })()}
      </div>

      {/* Ambassador Stats Rows */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Ambassador Points", value: `${totalPoints} PTS`, desc: "Verify outreach activities" },
          { label: "Approved Events hosted", value: approvedEvents, desc: "Bootcamps or info sessions" },
          { label: "Onboarded Peer Referrals", value: "32 Signups", desc: "Estimated student reach" },
          { label: "Pending verifications", value: outreachSubmissions.filter((s) => s.status === "PENDING").length, desc: "Awaiting Admin audit" },
        ].map((stat, i) => (
          <div key={i} className="rounded-2xl border border-white/8 bg-white/4 p-5 backdrop-blur-xl">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">{stat.label}</p>
            <p className="font-display text-2xl font-black text-white mt-1">{stat.value}</p>
            <p className="text-[10px] text-slate-600 mt-1">{stat.desc}</p>
          </div>
        ))}
      </div>

      {/* Tasks + Activity Submission Logs */}
      <div className="grid gap-6 xl:grid-cols-[1fr_1.5fr]">
        
        {/* Left Side: Tasks Console */}
        <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl space-y-4">
          <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
            <Zap size={18} className="text-cyan-400" />
            Active Ambassador Tasks
          </h2>
          <p className="text-xs text-slate-500">Complete these outreach tasks to earn leadership points and unlock rewards.</p>
          
          <div className="space-y-3 pt-2">
            {[
              { id: "A", task: "Share Connexode Mission on LinkedIn", pts: 100, active: true },
              { id: "B", task: "Host an Info Seminar on Campus (15+ Students)", pts: 300, active: true },
              { id: "C", task: "Form a Local Dev Group (WhatsApp/Discord - 20+ Members)", pts: 200, active: true },
              { id: "D", task: "Onboard 5 classmates to sign up on the platform", pts: 150, active: true },
            ].map((t) => (
              <div key={t.id} className="rounded-xl border border-white/6 bg-black/20 p-3.5 space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-extrabold text-white">Task {t.id}</span>
                  <span className="font-bold text-yellow-400">+{t.pts} PTS</span>
                </div>
                <p className="text-xs text-slate-400 leading-normal">{t.task}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Log outreach form */}
        <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl space-y-4">
          <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
            <BadgeCheck size={18} className="text-cyan-400" />
            Submit Outreach Activity Log
          </h2>
          
          <form onSubmit={handleSubmitOutreach} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-500">Select Campaign Task *</label>
              <select
                value={selectedTask}
                onChange={(e) => setSelectedTask(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#030c1c] px-4 py-3 text-xs text-slate-200 outline-none focus:border-cyan-400/40"
              >
                <option value="Task A: Share Connexode Mission on LinkedIn" className="bg-[#0A1628] text-slate-200">Task A: Share Connexode Mission on LinkedIn (+100 PTS)</option>
                <option value="Task B: Host an Info Seminar on Campus (15+ Students)" className="bg-[#0A1628] text-slate-200">Task B: Host an Info Seminar on Campus (+300 PTS)</option>
                <option value="Task C: Form a Local Dev Group (WhatsApp/Discord - 20+ Members)" className="bg-[#0A1628] text-slate-200">Task C: Form a Local Dev Group (+200 PTS)</option>
                <option value="Task D: Onboard 5 classmates to sign up on the platform" className="bg-[#0A1628] text-slate-200">Task D: Onboard 5 classmates to sign up on the platform (+150 PTS)</option>
              </select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-500">Activity Title / Topic *</label>
                <input
                  type="text"
                  required
                  value={activityTitle}
                  onChange={(e) => setActivityTitle(e.target.value)}
                  placeholder="e.g. Organized FAST Git Seminar"
                  className="w-full rounded-xl border border-white/10 bg-[#030c1c] px-4 py-3 text-xs text-slate-200 outline-none focus:border-cyan-400/40"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-500">Public Proof URL *</label>
                <input
                  type="url"
                  required
                  value={proofUrl}
                  onChange={(e) => setProofUrl(e.target.value)}
                  placeholder="e.g. LinkedIn post / Google Drive folder link"
                  className="w-full rounded-xl border border-white/10 bg-[#030c1c] px-4 py-3 text-xs text-slate-200 outline-none focus:border-cyan-400/40"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-500">Description of Activity *</label>
                <textarea
                  required
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your session, post context, or onboarded student names..."
                  className="w-full rounded-xl border border-white/10 bg-[#030c1c] px-4 py-3 text-xs text-slate-200 outline-none focus:border-cyan-400/40"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-500">Peers Reached / Onboarded *</label>
                <input
                  type="number"
                  required
                  value={peersReached}
                  onChange={(e) => setPeersReached(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-[#030c1c] px-4 py-3 text-xs text-slate-200 outline-none focus:border-cyan-400/40"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-cyan-400 py-3 text-xs font-bold text-[#020B18] hover:scale-[1.01] transition-transform cursor-pointer"
            >
              Submit Activity Log to Admin
            </button>
          </form>
        </div>

      </div>

      {/* Outreach submission log history */}
      <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl">
        <h2 className="font-display mb-4 text-lg font-bold text-white">Outreach Submission History</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-slate-500">
                <th className="pb-3 pr-4">Task</th>
                <th className="pb-3 pr-4">Title</th>
                <th className="pb-3 pr-4">Peers Reached</th>
                <th className="pb-3 pr-4">Date</th>
                <th className="pb-3 pr-4">Proof Link</th>
                <th className="pb-3 pr-4">Points</th>
                <th className="pb-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {outreachSubmissions.map((s) => (
                <tr key={s.id} className="border-b border-white/5 text-slate-300">
                  <td className="py-3 pr-4 max-w-[150px] truncate">{s.taskLabel}</td>
                  <td className="py-3 pr-4 font-bold text-white">{s.title}</td>
                  <td className="py-3 pr-4 font-mono">{s.peersReached}</td>
                  <td className="py-3 pr-4 font-mono">{new Date(s.submittedAt).toLocaleDateString()}</td>
                  <td className="py-3 pr-4">
                    <a href={s.proofUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline inline-flex items-center gap-1">
                      View Proof <ExternalLink size={10} />
                    </a>
                  </td>
                  <td className="py-3 pr-4 font-bold text-yellow-400">+{s.pointsEarned || 0} PTS</td>
                  <td className="py-3 text-right">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase ${
                      s.status === "APPROVED"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : s.status === "REJECTED"
                        ? "bg-red-500/10 text-red-400"
                        : "bg-yellow-500/10 text-yellow-500 animate-pulse"
                    }`}>
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
              {outreachSubmissions.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-slate-500 py-6 italic">No outreach log history found. Submit your first log above.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leaderboard & Media Kit */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Media Kit Download Center */}
        <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl space-y-4">
          <h3 className="font-display text-sm font-extrabold text-white flex items-center gap-2">
            <Download size={16} className="text-yellow-500" />
            Branding Assets & Media Kit Center
          </h3>
          <p className="text-[11px] text-slate-500">Download official promotion kits, slide decks for workshops, and WhatsApp banners.</p>
          <div className="space-y-3">
            {mediaAssets.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-black/20 text-xs gap-4">
                <div className="min-w-0">
                  <h4 className="font-bold text-white truncate">{item.name}</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5 truncate">{item.desc} · <span className="font-mono text-yellow-500 font-bold">{item.format}</span></p>
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-[10px] font-bold text-slate-300 hover:bg-yellow-500 hover:text-[#020B18] transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Download size={10} />
                  {item.size}
                </a>
              </div>
            ))}
            {mediaAssets.length === 0 && (
              <p className="text-center text-slate-500 italic text-[11px] py-4">No active assets in the media kit currently.</p>
            )}
          </div>
        </div>

        {/* Live Scoreboard / Regional Leaderboard */}
        <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl space-y-4">
          <h3 className="font-display text-sm font-extrabold text-white flex items-center gap-2">
            <Trophy size={16} className="text-yellow-500" />
            National Leaderboard (June 2026)
          </h3>
          <p className="text-[11px] text-slate-500">Compare your standing with top-performing ambassadors across other regions.</p>
          <div className="space-y-2.5">
            {[
              { rank: 1, name: "Muhammad Ali", uni: "FAST NUST", pts: 1250, level: "Gold" },
              { rank: 2, name: activeUser.name, uni: ambassadorDetails?.university || "FAST NUCES", pts: totalPoints, level: totalPoints >= 1000 ? "Gold" : totalPoints >= 500 ? "Silver" : "Bronze", isCurrent: true },
              { rank: 3, name: "Ayesha Fatima", uni: "LUMS", pts: 850, level: "Silver" },
              { rank: 4, name: "Zainab Khan", uni: "IBA Karachi", pts: 620, level: "Silver" },
              { rank: 5, name: "Bilal Ahmed", uni: "NED University", pts: 450, level: "Bronze" },
            ].map((amb, i) => (
              <div
                key={i}
                className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                  amb.isCurrent
                    ? "border-yellow-500/30 bg-yellow-500/10 shadow-[0_0_15px_rgba(234,179,8,0.15)]"
                    : "border-white/5 bg-black/20"
                } text-xs`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-5 text-center font-mono font-black ${
                    amb.rank === 1 ? "text-yellow-400" : amb.rank === 2 ? "text-slate-300" : "text-slate-500"
                  }`}>{amb.rank}</span>
                  <div>
                    <h4 className={`font-bold ${amb.isCurrent ? "text-yellow-400" : "text-white"}`}>{amb.name}</h4>
                    <p className="text-[9px] text-slate-500 mt-0.5">{amb.uni} · <span className="text-yellow-500/70 font-semibold">{amb.level}</span></p>
                  </div>
                </div>
                <span className="font-mono font-black text-white">{amb.pts} PTS</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Support / Coordinator chat */}
      <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl space-y-4">
        <div>
          <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
            <MessageSquare className="text-cyan-400" size={20} />
            Direct Admin Support Chat
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Have a query or need support coordinating campus activities? Chat directly with the Ambassador Management team below.</p>
        </div>

        {/* Support Chat thread */}
        <div className="max-h-60 overflow-y-auto bg-black/40 p-4 rounded-xl border border-white/5 space-y-3 flex flex-col">
          {supportMessages.filter((m) => m.studentId === activeUser.id).map((m, i) => (
            <div
              key={m.id || i}
              className={`max-w-[85%] rounded-xl p-3 flex flex-col ${
                m.sender === "STUDENT"
                  ? "bg-cyan-500/10 border border-cyan-500/20 text-cyan-200 self-end ml-auto"
                  : "bg-white/5 border border-white/8 text-slate-200 self-start mr-auto"
              }`}
            >
              <span className="text-[8px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                {m.sender === "STUDENT" ? "You" : "Coordinator / Admin"}
              </span>
              <p className="text-xs leading-relaxed whitespace-pre-wrap">{m.text}</p>
              <span className="text-[7px] text-slate-600 font-mono text-right mt-1">
                {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
          {supportMessages.filter((m) => m.studentId === activeUser.id).length === 0 && (
            <p className="text-center text-slate-600 italic py-6">No support messages sent yet. Start the conversation below!</p>
          )}
        </div>

        <form onSubmit={handleSendSupportMsg} className="flex gap-2">
          <input
            type="text"
            required
            value={newSupportMsg}
            onChange={(e) => setNewSupportMsg(e.target.value)}
            placeholder="Type a support query or request help..."
            className="flex-1 rounded-xl border border-white/10 bg-[#030c1c] px-4 py-3 text-xs text-slate-200 outline-none focus:border-cyan-400/40"
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-1.5 rounded-xl bg-cyan-400 px-6 py-3 text-xs font-bold text-[#020B18] hover:scale-[1.01] transition-transform cursor-pointer"
          >
            <Send size={12} />
            Send Message
          </button>
        </form>
      </div>

      {/* Assigned Custom Tasks Section */}
      <div className="rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-[#0D1B2A]/50 to-[#020B18]/50 p-6 backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div>
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <Award size={18} className="text-yellow-400" />
              Directly Assigned Outreach Tasks
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Tasks custom assigned to you by the Admin. Submit proof and chat directly with coordinator.</p>
          </div>
          <span className="rounded-full bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-yellow-400">
            {studentAssignedTasks.length} Assigned Task{studentAssignedTasks.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-slate-500">
                <th className="pb-3 pr-4">Task Title</th>
                <th className="pb-3 pr-4">Assigned Date</th>
                <th className="pb-3 pr-4">Points</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {studentAssignedTasks.map((t) => (
                <tr key={t.id} className="border-b border-white/5 text-slate-300 hover:bg-white/2 transition-colors">
                  <td className="py-3 pr-4 font-bold text-white max-w-[200px] truncate">{t.taskTitle}</td>
                  <td className="py-3 pr-4 font-mono">{new Date(t.assignedAt).toLocaleDateString()}</td>
                  <td className="py-3 pr-4 font-bold text-yellow-400">+{t.points} PTS</td>
                  <td className="py-3 pr-4">
                    <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-extrabold uppercase ${
                      t.status === "APPROVED"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : t.status === "REJECTED"
                        ? "bg-red-500/10 text-red-400"
                        : t.status === "SUBMITTED"
                        ? "bg-blue-500/10 text-blue-400 animate-pulse"
                        : "bg-yellow-500/10 text-yellow-500"
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => setSelectedStudentTask(t)}
                      className="rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-[10px] font-bold text-slate-300 hover:bg-yellow-500 hover:text-[#020B18] transition-all cursor-pointer"
                    >
                      {t.status === "ASSIGNED" || t.status === "REJECTED" ? "Submit Proof & Chat" : "View Details & Chat"}
                    </button>
                  </td>
                </tr>
              ))}
              {studentAssignedTasks.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-slate-500 py-6 italic">No custom tasks assigned to you by the Coordinator yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Assigned Task Modal */}
      {selectedStudentTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="relative max-w-2xl w-full bg-[#030914] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col my-8">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-slate-950">
              <div className="flex items-center gap-2">
                <Award className="text-yellow-400" size={16} />
                <div>
                  <h3 className="text-sm font-bold text-white">{selectedStudentTask.taskTitle}</h3>
                  <p className="text-[9px] text-slate-500 font-mono">Assigned on: {new Date(selectedStudentTask.assignedAt).toLocaleString()}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudentTask(null)}
                className="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                Close
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-6 text-xs text-slate-300 overflow-y-auto max-h-[70vh]">
              {/* Task Description */}
              <div>
                <h4 className="font-bold text-yellow-500 uppercase tracking-wider text-[10px] mb-2">Task Details & Instructions</h4>
                <div className="rounded-xl border border-white/8 bg-white/3 p-4">
                  <p className="leading-relaxed whitespace-pre-wrap">{selectedStudentTask.taskDesc}</p>
                  <p className="mt-3 text-[10px] font-bold text-yellow-400 uppercase tracking-widest font-mono">Points: +{selectedStudentTask.points} PTS</p>
                </div>
              </div>

              {/* Submission Form / Submission Details */}
              <div>
                <h4 className="font-bold text-yellow-500 uppercase tracking-wider text-[10px] mb-2">
                  {selectedStudentTask.status === "ASSIGNED" || selectedStudentTask.status === "REJECTED" ? "Submit Submission Proof" : "Your Submission Details"}
                </h4>
                {selectedStudentTask.status === "ASSIGNED" || selectedStudentTask.status === "REJECTED" ? (
                  <form onSubmit={(e) => handleSubmitStudentProof(e, selectedStudentTask.id)} className="space-y-4 rounded-xl border border-white/8 bg-white/3 p-4">
                    {selectedStudentTask.status === "REJECTED" && (
                      <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 font-semibold mb-2">
                        ⚠️ Your previous submission was rejected. Please review feedback in Q&A chat and re-submit proof below.
                      </div>
                    )}
                    <div>
                      <label className="mb-1 block text-[9px] font-semibold uppercase tracking-wider text-slate-400">Public Proof URL *</label>
                      <input
                        type="url"
                        required
                        value={studentProofUrl}
                        onChange={(e) => setStudentProofUrl(e.target.value)}
                        placeholder="https://linkedin.com/posts/username-post-link..."
                        className="w-full rounded-xl border border-white/10 bg-[#030c1c] px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-yellow-400/40"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[9px] font-semibold uppercase tracking-wider text-slate-400">Submission Description / Notes *</label>
                      <textarea
                        required
                        rows={3}
                        value={studentSubDesc}
                        onChange={(e) => setStudentSubDesc(e.target.value)}
                        placeholder="Describe how you completed the task, how many peers you reached, etc..."
                        className="w-full rounded-xl border border-white/10 bg-[#030c1c] px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-yellow-400/40"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-yellow-500 py-3 text-xs font-bold text-[#020B18] hover:scale-[1.01] transition-transform cursor-pointer"
                    >
                      Submit Task Proof
                    </button>
                  </form>
                ) : (
                  <div className="rounded-xl border border-white/8 bg-blue-500/5 p-4 space-y-3">
                    <div>
                      <span className="text-slate-500 font-bold block">Submission Proof URL:</span>
                      <a href={selectedStudentTask.proofUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline break-all block mt-0.5">
                        {selectedStudentTask.proofUrl}
                      </a>
                    </div>
                    <div>
                      <span className="text-slate-500 font-bold block">Submission Description:</span>
                      <p className="text-slate-200 mt-1 whitespace-pre-wrap">{selectedStudentTask.submissionDesc}</p>
                    </div>
                    <p className="text-[10px] text-slate-500 font-mono">Submitted at: {new Date(selectedStudentTask.submittedAt).toLocaleString()}</p>
                  </div>
                )}
              </div>

              {/* Chat Thread */}
              <div>
                <h4 className="font-bold text-yellow-500 uppercase tracking-wider text-[10px] mb-2">Q&A Chat Thread with Coordinator</h4>
                <div className="rounded-xl border border-white/8 bg-black/40 p-4 space-y-3 max-h-48 overflow-y-auto flex flex-col">
                  {selectedStudentTask.questions && selectedStudentTask.questions.length > 0 ? (
                    selectedStudentTask.questions.map((q: any, i: number) => (
                      <div
                        key={i}
                        className={`flex flex-col max-w-[85%] rounded-xl p-3 ${
                          q.sender === "STUDENT"
                            ? "bg-yellow-500/10 border border-yellow-500/20 text-yellow-200 self-end ml-auto"
                            : "bg-white/5 border border-white/8 text-slate-200 self-start mr-auto"
                        }`}
                      >
                        <span className="text-[8px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                          {q.sender === "STUDENT" ? "You" : "Coordinator (Admin)"}
                        </span>
                        <p className="leading-relaxed">{q.text}</p>
                        <span className="text-[7px] text-slate-600 font-mono text-right mt-1">
                          {new Date(q.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-slate-600 italic py-4">No chat history. Send a query below if you have any questions about this task.</p>
                  )}
                </div>

                {/* Send message form */}
                <form onSubmit={(e) => handleSendStudentMsg(e, selectedStudentTask.id)} className="mt-3 flex gap-2">
                  <input
                    type="text"
                    value={studentMsgText}
                    onChange={(e) => setStudentMsgText(e.target.value)}
                    placeholder="Ask coordinator a question about this task..."
                    className="flex-1 rounded-xl border border-white/8 bg-[#020B18] px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-yellow-400/30"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-yellow-500 px-4 py-2.5 text-xs font-bold text-[#020B18] hover:scale-[1.02] transition-transform cursor-pointer"
                  >
                    Send
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
