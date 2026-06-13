"use client";

import { useState, useEffect } from "react";
import StatsRow from "@/components/dashboard/StatsRow";
import PhaseProgress from "@/components/dashboard/PhaseProgress";
import TaskList from "@/components/dashboard/TaskList";
import TrackRoadmap from "@/components/dashboard/TrackRoadmap";
import PaymentApprovedBanner from "@/components/dashboard/PaymentApprovedBanner";
import { getActiveUser, getPaymentStatus, getTrackMentor, TRACKS, SUBMISSIONS, WEEKLY_TASKS, type User } from "@/lib/mock-data";
import { BadgeCheck, GitBranch, ArrowRight, MessageSquare, Send, User as UserIcon, Zap, Clock, CheckCircle2, ExternalLink } from "lucide-react";
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

  const loadAmbassadorData = (userEmail: string) => {
    if (typeof window === "undefined") return "NONE";
    let status = "NONE";

    // Load applications
    const storedApps = localStorage.getItem("connexode_ambassador_applications");
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

  useEffect(() => {
    if (activeUser) {
      if (activeUser.role === "STUDENT") {
        const status = loadAmbassadorData(activeUser.email);
        if (status !== "APPROVED") {
          window.location.href = "/";
          return;
        }
      } else {
        loadAmbassadorData(activeUser.email);
      }

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

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    if (typeof window !== "undefined" && activeUser) {
      const allTickets = JSON.parse(localStorage.getItem("connexode_qa_tickets") || "[]");
      const newTicket = {
        id: `q_${Math.random().toString(36).substring(2, 9)}`,
        userId: activeUser.id,
        userName: activeUser.name,
        trackId: "AMBASSADOR",
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
      alert("Your message has been sent to the Coordinator! Response will be sent in 24 hours.");
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

  if (ambassadorStatus === "NONE") {
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
  if (ambassadorStatus === "PENDING") {
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

      {/* Ambassador Welcome header */}
      <div className="relative overflow-hidden rounded-2xl border border-cyan-400/25 bg-gradient-to-br from-[#06172f] to-[#020B18] p-6 shadow-xl">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl bg-cyan-500/15" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-1 text-sm text-slate-500">Connexode Campus Ambassador dashboard</p>
            <h2 className="font-display text-2xl font-extrabold text-white">
              {activeUser.name}
            </h2>
            <p className="mt-1 flex items-center gap-2 text-sm text-cyan-400 font-bold">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" />
              Active Ambassador Lead · {ambassadorDetails?.university || "FAST NUCES"}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 text-right">
            <span className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-xs font-bold text-yellow-400">
              🏆 Level: Campus Tech Lead
            </span>
          </div>
        </div>
      </div>

      {/* Ambassador Stats Rows */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Ambassador Points", value: `${totalPoints} PTS`, desc: "Verify outreach activities" },
          { label: "Approved Events hosted", value: approvedEvents, desc: "Bootcamps or info sessions" },
          { label: "Onboarded Peer Referrals", value: ambassadorDetails?.reachEstimate || "100-500", desc: "Estimated student reach" },
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

      {/* Support / Coordinator chat */}
      <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl">
        <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
          <MessageSquare className="text-cyan-400" size={20} />
          Coordinator Support Channels
        </h3>
        <p className="text-xs text-slate-500">Have a query or need support coordinating campus activities? Send a direct query to the Ambassador Management team below.</p>

        <form onSubmit={handleAskQuestion} className="space-y-3 mt-4">
          <textarea
            required
            rows={3}
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Describe your question or request..."
            className="w-full rounded-xl border border-white/10 bg-[#030c1c] px-4 py-3 text-xs text-slate-200 outline-none focus:border-cyan-400/40"
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-1.5 rounded-xl bg-cyan-400 px-6 py-2.5 text-xs font-bold text-[#020B18] hover:scale-[1.01] transition-transform cursor-pointer"
          >
            <Send size={12} />
            Send Query to Coordinator
          </button>
        </form>
      </div>
    </div>
  );
}
