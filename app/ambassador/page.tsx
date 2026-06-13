"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import {
  Star, CheckCircle2, Loader2, ArrowLeft, Users, Gift, Trophy,
  Briefcase, Phone, Mail,
  Link2, AtSign, Video, Sparkles, Clock, Shield, BookOpen,
} from "lucide-react";

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

const PERKS = [
  { icon: Gift, label: "Free Course Access", desc: "Get full access to all future premium Connexode tracks and courses for free." },
  { icon: Trophy, label: "Stipend & Bonuses", desc: "Earn monthly stipend based on your referral & event performance." },
  { icon: Star, label: "Certificate of Excellence", desc: "Official Ambassador certificate for your LinkedIn & resume." },
  { icon: Users, label: "Exclusive Community", desc: "Join a private ambassador Slack with mentors and industry leads." },
];

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    // Rotate values (-8 to 8 deg)
    const rx = (x - 0.5) * 8;
    const ry = (y - 0.5) * -8;
    
    setTilt({ x: rx, y: ry });
    setGlare({ x: x * 100, y: y * 100, opacity: 0.15 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlare({ x: 0, y: 0, opacity: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl border border-white/5 bg-[#050f1e]/40 p-6 shadow-[0_15px_35px_rgba(0,0,0,0.5),_inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-300 hover:border-yellow-500/15 ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(0) scale3d(1.005, 1.005, 1.005)`,
        transition: tilt.x === 0 ? "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s, box-shadow 0.3s" : "transform 0.05s ease-out, border-color 0.3s, box-shadow 0.3s",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Glare effect */}
      <div 
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 120px at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.12) 0%, transparent 100%)`,
          opacity: glare.opacity,
        }}
      />
      
      {/* Content wrapper with depth */}
      <div style={{ transform: "translateZ(20px)" }} className="relative">
        {children}
      </div>
    </div>
  );
}

export default function AmbassadorApplyPage() {
  const [redirecting, setRedirecting] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    customCity: "",
    university: "",
    customUniversity: "",
    degree: "",
    semester: "",
    linkedin: "",
    instagram: "",
    youtube: "",
    whyAmbassador: "",
    pastExperience: "",
    reachEstimate: "",
    availability: "",
    avatarImage: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const activeUserId = localStorage.getItem("connexode_active_user");
      if (!activeUserId) {
        window.location.href = "/register";
        return;
      }

      // Check user's details
      let userEmail = "";
      let userName = "";
      const dynamicRaw = localStorage.getItem("connexode_dynamic_users");
      if (dynamicRaw) {
        try {
          const dynamicUsers = JSON.parse(dynamicRaw);
          const found = dynamicUsers.find((u: any) => u.id === activeUserId);
          if (found) {
            userEmail = found.email;
            userName = found.name;
          }
        } catch (e) {}
      }

      // Check ambassador status
      const storedApps = localStorage.getItem("connexode_ambassador_applications");
      let appStatus = "NONE";
      if (storedApps && userEmail) {
        try {
          const apps = JSON.parse(storedApps);
          const matched = apps.find((a: any) => a.email.toLowerCase() === userEmail.toLowerCase());
          if (matched) {
            appStatus = matched.status;
          }
        } catch (e) {}
      }

      if (appStatus === "APPROVED") {
        window.location.href = "/dashboard";
      } else if (appStatus === "PENDING") {
        setSubmitted(true);
        setRedirecting(false);
      } else {
        setForm((f) => ({
          ...f,
          fullName: userName || f.fullName,
          email: userEmail || f.email,
        }));
        setRedirecting(false);
      }
    }
  }, []);

  if (redirecting) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#020B18] text-slate-400">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
      </div>
    );
  }

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required.";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Valid email is required.";
    if (!form.phone.trim() || !/^0[0-9]{10}$/.test(form.phone.replace(/-/g, ""))) errs.phone = "Valid Pakistani mobile (03xxxxxxxxx).";
    if (!form.city) {
      errs.city = "Please select your city.";
    } else if (form.city === "Other" && !form.customCity.trim()) {
      errs.customCity = "Please enter your city name.";
    }
    if (!form.university) {
      errs.university = "Please select your university.";
    } else if (form.university === "Other" && !form.customUniversity.trim()) {
      errs.customUniversity = "Please enter your university name.";
    }
    if (!form.degree.trim()) errs.degree = "Degree / Program is required.";
    if (!form.whyAmbassador.trim() || form.whyAmbassador.length < 80)
      errs.whyAmbassador = "Please write at least 80 characters explaining your motivation.";
    if (!form.reachEstimate.trim()) errs.reachEstimate = "Please estimate your student reach.";
    if (!form.availability) errs.availability = "Please select your availability.";
    if (!form.avatarImage) errs.avatarImage = "Profile photo is required.";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    // Save to localStorage as pending application
    try {
      const existing = JSON.parse(localStorage.getItem("connexode_ambassador_applications") || "[]");
      const savedForm = {
        ...form,
        city: form.city === "Other" ? form.customCity.trim() : form.city,
        university: form.university === "Other" ? form.customUniversity.trim() : form.university,
      };
      existing.push({ ...savedForm, id: `amb_${Date.now()}`, status: "PENDING", submittedAt: new Date().toISOString() });
      localStorage.setItem("connexode_ambassador_applications", JSON.stringify(existing));
    } catch (e) {}

    await new Promise((r) => setTimeout(r, 1800)); // simulate processing
    setLoading(false);
    setSubmitted(true);
  };

  const inputCls = (key: string, value: string) => {
    const hasError = !!errors[key];
    const isFilled = !!value?.trim();
    if (hasError) {
      return `w-full rounded-xl border border-red-500/50 bg-red-500/5 shadow-[inset_0_2px_4px_rgba(239,68,68,0.1)] focus:border-red-400 focus:shadow-[inset_0_2px_4px_rgba(239,68,68,0.15),_0_0_15px_rgba(239,68,68,0.2)] px-4 py-3.5 text-xs text-slate-200 placeholder-slate-600 outline-none transition-all duration-300`;
    }
    if (isFilled) {
      return `w-full rounded-xl border border-emerald-500/35 bg-[#030914] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] focus:border-emerald-400 focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),_0_0_15px_rgba(16,185,129,0.2)] px-4 py-3.5 text-xs text-slate-200 placeholder-slate-600 outline-none transition-all duration-300`;
    }
    return `w-full rounded-xl border border-white/8 bg-[#030914] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] focus:border-cyan-400/80 focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),_0_0_15px_rgba(34,211,238,0.25)] px-4 py-3.5 text-xs text-slate-200 placeholder-slate-600 outline-none transition-all duration-300`;
  };

  const isS1Done = !!(form.fullName.trim() && form.email.trim() && form.phone.trim() && form.city && form.avatarImage);
  const isS2Done = !!(form.university && form.degree.trim());
  const isS3Done = !!(form.linkedin.trim() && form.reachEstimate);
  const isS4Done = !!(form.whyAmbassador.trim().length >= 80 && form.availability);

  if (submitted) {
    return (
      <main className="relative min-h-screen bg-[#020B18] text-slate-100 overflow-hidden">
        <Navbar />
        {/* Background glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/3 left-1/4 h-96 w-96 rounded-full bg-emerald-500/8 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-cyan-500/6 blur-3xl" />
        </div>

        <div className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
          {/* Success card */}
          <div className="w-full max-w-md rounded-3xl border border-emerald-500/25 bg-[#041220] p-10 shadow-[0_0_80px_rgba(16,185,129,0.15)] backdrop-blur-xl">
            {/* Animated checkmark */}
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/25 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <CheckCircle2 size={40} className="text-emerald-400" />
            </div>

            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest">
              <Sparkles size={10} />
              Application Received
            </div>

            <h1 className="mt-4 font-display text-2xl font-black text-white tracking-tight">
              Your Request Has Been Accepted! 🎉
            </h1>

            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
              Thank you, <strong className="text-white">{form.fullName.split(" ")[0]}</strong>! We&apos;ve received your Ambassador application. Our team will review your profile and reach out to you within <strong className="text-cyan-400">24 hours</strong>.
            </p>

            {/* Info box */}
            <div className="mt-6 rounded-2xl border border-white/8 bg-white/4 p-4 text-left space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Clock size={12} className="text-cyan-400 shrink-0" />
                <span>Verification usually takes <strong className="text-white">4–24 hours</strong></span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Mail size={12} className="text-cyan-400 shrink-0" />
                <span>Decision email sent to <strong className="text-white">{form.email}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Shield size={12} className="text-cyan-400 shrink-0" />
                <span>Your data is secure and used only for verification</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <Link
                href="/"
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 py-3 text-xs font-bold text-[#020B18] hover:scale-[1.02] transition-all"
              >
                Back to Homepage
              </Link>
              <Link
                href="/"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-xs font-semibold text-slate-300 hover:bg-white/8 transition-all"
              >
                Back to Network Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#020B18] text-slate-100 pb-24 overflow-hidden">
      <Navbar />

      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-20 left-10 h-96 w-96 rounded-full bg-yellow-500/5 blur-3xl" />
        <div className="absolute top-1/2 right-10 h-80 w-80 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute bottom-20 left-1/3 h-64 w-64 rounded-full bg-teal-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 pt-32">

        {/* Back */}
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-xs text-slate-500 hover:text-cyan-400 transition-colors">
          <ArrowLeft size={13} />
          Back to Homepage
        </Link>

        {/* Hero header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/25 bg-yellow-500/10 px-4 py-1.5 text-xs font-extrabold text-yellow-400 uppercase tracking-widest mb-5">
            <Star size={12} className="fill-yellow-400" />
            Campus Ambassador Program — 2026
          </div>
          <h1 className="font-display text-4xl font-black text-white tracking-tight mb-4 lg:text-5xl">
            Become a{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Connexode Ambassador
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-base text-slate-400 leading-relaxed">
            Represent Connexode at your university, grow your network, host events, earn stipends, and unlock exclusive perks — all while building leadership experience.
          </p>
        </div>

        {/* Perks grid */}
        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PERKS.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="rounded-2xl border border-white/8 bg-white/4 p-5 backdrop-blur-xl text-center hover:border-yellow-500/20 hover:-translate-y-1 transition-all duration-300">
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                <Icon size={18} className="text-yellow-400" />
              </div>
              <h3 className="text-xs font-extrabold text-white mb-1">{label}</h3>
              <p className="text-[10px] text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Application Form */}
        <div className="rounded-3xl border border-white/10 bg-[#030914]/80 backdrop-blur-xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),_0_0_100px_rgba(234,179,8,0.05),_inset_0_1.5px_1.5px_rgba(255,255,255,0.08)] overflow-hidden">
          {/* Form header bar */}
          <div className="border-b border-white/5 bg-gradient-to-r from-slate-900 to-slate-950 px-8 py-6 flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 border border-yellow-300/35 shadow-[0_0_20px_rgba(234,179,8,0.25)]">
              <Briefcase size={20} className="text-[#020B18]" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white tracking-wide">Ambassador Onboarding Portal</h2>
              <p className="text-[10px] text-slate-400 font-medium">Verify your details below. Completed in less than 3 minutes.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8 bg-gradient-to-b from-transparent to-[#02070f]">
            
            {/* Real-time Progress Stepper */}
            <div className="rounded-2xl border border-white/5 bg-[#030914]/60 p-4.5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] flex items-center justify-between gap-2 overflow-x-auto">
              {[
                { label: "1. Profile", desc: "Personal Details", done: isS1Done },
                { label: "2. Academic", desc: "University Info", done: isS2Done },
                { label: "3. Socials", desc: "Network & Reach", done: isS3Done },
                { label: "4. Statement", desc: "Motivation", done: isS4Done }
              ].map((step, idx) => (
                <div key={idx} className="flex items-center gap-3 shrink-0">
                  <div className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all duration-300 ${
                    step.done 
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                      : "border-white/5 bg-white/2 text-slate-500"
                  }`}>
                    <div className={`h-4.5 w-4.5 rounded-full flex items-center justify-center text-[9px] font-black ${
                      step.done ? "bg-emerald-400 text-[#020B18]" : "bg-slate-800 text-slate-500"
                    }`}>
                      {step.done ? "✓" : idx + 1}
                    </div>
                    <div className="text-left leading-tight">
                      <p className="text-[10px] font-black uppercase tracking-wider">{step.label}</p>
                      <p className="text-[8px] text-slate-500 font-semibold">{step.desc}</p>
                    </div>
                  </div>
                  {idx < 3 && <div className={`h-[1px] w-8 sm:w-12 border-t border-dashed ${step.done ? 'border-emerald-500/30' : 'border-white/10'}`} />}
                </div>
              ))}
            </div>

            {/* Section 1 — Personal Info Sub-card */}
            <TiltCard>
              <h3 className="mb-6 flex items-center gap-3 text-xs font-black uppercase tracking-widest text-yellow-400">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-[10px] font-black shadow-[0_0_10px_rgba(234,179,8,0.15)]">1</span>
                Personal Information
              </h3>
              
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Profile Photo *</label>
                  
                  <div className="grid gap-4 sm:grid-cols-[1fr_2.5fr] items-center">
                    {/* Visual 3D slot for photo */}
                    <div className="h-28 w-28 mx-auto sm:mx-0 rounded-2xl border border-white/8 bg-[#02070f] shadow-[inset_0_4px_8px_rgba(0,0,0,0.8)] flex items-center justify-center overflow-hidden relative group">
                      {form.avatarImage ? (
                        <>
                          <img src={form.avatarImage} alt="Preview" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                          <button 
                            type="button" 
                            onClick={() => setForm((f) => ({ ...f, avatarImage: "" }))} 
                            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-red-400 font-extrabold text-[10px] uppercase tracking-wider transition-all duration-200 cursor-pointer"
                          >
                            Remove
                          </button>
                        </>
                      ) : (
                        <div className="text-center p-3">
                          <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center mx-auto mb-1.5 text-slate-500">
                            <Users size={16} />
                          </div>
                          <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider block">No Photo</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      {/* Upload button area */}
                      <label className="flex flex-col items-center justify-center w-full h-18 rounded-xl border border-dashed border-white/10 bg-[#030914] shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] hover:bg-white/[0.02] hover:border-cyan-500/35 transition-all cursor-pointer group">
                        <div className="flex items-center gap-3 py-2">
                          <div className="h-7 w-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform duration-200">
                            <Users size={12} />
                          </div>
                          <div className="text-left">
                            <p className="text-[10px] font-extrabold text-slate-300 group-hover:text-cyan-400 transition-colors">Upload image file</p>
                            <p className="text-[8px] text-slate-500 font-semibold uppercase tracking-wider">PNG, JPG up to 1MB</p>
                          </div>
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
                                setForm((f) => ({ ...f, avatarImage: reader.result as string }));
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="hidden"
                        />
                      </label>

                      {/* Image URL Textbox Option */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                          <Link2 size={12} />
                        </div>
                        <input
                          type="text"
                          value={form.avatarImage || ""}
                          onChange={(e) => setForm((f) => ({ ...f, avatarImage: e.target.value }))}
                          placeholder="Or paste profile image URL..."
                          className="w-full rounded-xl border border-white/8 bg-[#030914] pl-9 pr-4 py-2.5 text-[10px] text-slate-300 placeholder-slate-600 outline-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] focus:border-cyan-400/80 focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),_0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>
                  {errors.avatarImage && <p className="mt-2 text-[10px] text-red-400 font-bold flex items-center gap-1.5"><Shield size={10} /> {errors.avatarImage}</p>}
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Full Name *</label>
                  <input type="text" value={form.fullName} onChange={set("fullName")} placeholder="Muhammad Ali Khan" className={inputCls("fullName", form.fullName)} />
                  {errors.fullName && <p className="mt-1.5 text-[10px] text-red-400 font-bold">{errors.fullName}</p>}
                </div>
                
                <div>
                  <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Email Address *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <Mail size={12} />
                    </div>
                    <input type="email" value={form.email} onChange={set("email")} placeholder="ali@example.com" className={`${inputCls("email", form.email)} pl-9`} />
                  </div>
                  {errors.email && <p className="mt-1.5 text-[10px] text-red-400 font-bold">{errors.email}</p>}
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Mobile Number *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <Phone size={12} />
                    </div>
                    <input type="tel" value={form.phone} onChange={set("phone")} placeholder="03001234567" className={`${inputCls("phone", form.phone)} pl-9`} />
                  </div>
                  {errors.phone && <p className="mt-1.5 text-[10px] text-red-400 font-bold">{errors.phone}</p>}
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">City *</label>
                  <select value={form.city} onChange={set("city")} className={inputCls("city", form.city)}>
                    <option value="" className="bg-[#030914] text-slate-400 font-bold">Select your city</option>
                    {CITIES.map((c) => <option key={c} value={c} className="bg-[#030914] text-slate-200">{c}</option>)}
                  </select>
                  {errors.city && <p className="mt-1.5 text-[10px] text-red-400 font-bold">{errors.city}</p>}
                </div>

                {form.city === "Other" && (
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Custom City Name *</label>
                    <input
                      type="text"
                      value={form.customCity}
                      onChange={set("customCity")}
                      placeholder="Enter your city name here"
                      className={inputCls("customCity", form.customCity)}
                    />
                    {errors.customCity && <p className="mt-1.5 text-[10px] text-red-400 font-bold">{errors.customCity}</p>}
                  </div>
                )}
              </div>
            </TiltCard>

            {/* Section 2 — Academic Info Sub-card */}
            <TiltCard>
              <h3 className="mb-6 flex items-center gap-3 text-xs font-black uppercase tracking-widest text-yellow-400">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-[10px] font-black shadow-[0_0_10px_rgba(234,179,8,0.15)]">2</span>
                Academic Information
              </h3>
              
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">University / College *</label>
                  <select value={form.university} onChange={set("university")} className={inputCls("university", form.university)}>
                    <option value="" className="bg-[#030914] text-slate-400 font-bold">Select your institution</option>
                    {UNIVERSITIES.map((u) => <option key={u} value={u} className="bg-[#030914] text-slate-200">{u}</option>)}
                  </select>
                  {errors.university && <p className="mt-1.5 text-[10px] text-red-400 font-bold">{errors.university}</p>}
                </div>

                {form.university === "Other" && (
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Custom University Name *</label>
                    <input
                      type="text"
                      value={form.customUniversity}
                      onChange={set("customUniversity")}
                      placeholder="Write your university name here"
                      className={inputCls("customUniversity", form.customUniversity)}
                    />
                    {errors.customUniversity && <p className="mt-1.5 text-[10px] text-red-400 font-bold">{errors.customUniversity}</p>}
                  </div>
                )}
                
                <div>
                  <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Degree / Program *</label>
                  <input type="text" value={form.degree} onChange={set("degree")} placeholder="e.g. BS Computer Science" className={inputCls("degree", form.degree)} />
                  {errors.degree && <p className="mt-1.5 text-[10px] text-red-400 font-bold">{errors.degree}</p>}
                </div>
                
                <div>
                  <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Current Semester / Year</label>
                  <input type="text" value={form.semester} onChange={set("semester")} placeholder="e.g. 5th Semester / 3rd Year" className={inputCls("semester", form.semester)} />
                </div>
              </div>
            </TiltCard>

            {/* Section 3 — Social Presence Sub-card */}
            <TiltCard>
              <h3 className="mb-6 flex items-center gap-3 text-xs font-black uppercase tracking-widest text-yellow-400">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-[10px] font-black shadow-[0_0_10px_rgba(234,179,8,0.15)]">3</span>
                Social Media Presence
              </h3>
              
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    <div className="h-4.5 w-4.5 rounded bg-blue-500/15 border border-blue-500/20 flex items-center justify-center text-blue-400"><Link2 size={10} /></div>
                    LinkedIn Profile *
                  </label>
                  <input type="url" value={form.linkedin} onChange={set("linkedin")} placeholder="https://linkedin.com/in/your-profile" className={inputCls("linkedin", form.linkedin)} />
                  {errors.linkedin && <p className="mt-1.5 text-[10px] text-red-400 font-bold">{errors.linkedin}</p>}
                </div>
                
                <div>
                  <label className="mb-1.5 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    <div className="h-4.5 w-4.5 rounded bg-pink-500/15 border border-pink-500/20 flex items-center justify-center text-pink-400"><AtSign size={10} /></div>
                    Instagram Handle <span className="text-slate-600 normal-case font-bold">(optional)</span>
                  </label>
                  <input type="text" value={form.instagram} onChange={set("instagram")} placeholder="@your_handle" className={inputCls("instagram", form.instagram)} />
                </div>
                
                <div>
                  <label className="mb-1.5 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    <div className="h-4.5 w-4.5 rounded bg-red-500/15 border border-red-500/20 flex items-center justify-center text-red-400"><Video size={10} /></div>
                    YouTube / TikTok <span className="text-slate-600 normal-case font-bold">(optional)</span>
                  </label>
                  <input type="text" value={form.youtube} onChange={set("youtube")} placeholder="Channel or profile link" className={inputCls("youtube", form.youtube)} />
                </div>
                
                <div>
                  <label className="mb-1.5 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    <div className="h-4.5 w-4.5 rounded bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center text-emerald-400"><Users size={10} /></div>
                    Estimated Student Reach *
                  </label>
                  <select value={form.reachEstimate} onChange={set("reachEstimate")} className={inputCls("reachEstimate", form.reachEstimate)}>
                    <option value="" className="bg-[#030914] text-slate-400 font-bold">Select student reach</option>
                    <option value="0-100" className="bg-[#030914] text-slate-200">0 – 100 students</option>
                    <option value="100-500" className="bg-[#030914] text-slate-200">100 – 500 students</option>
                    <option value="500-1000" className="bg-[#030914] text-slate-200">500 – 1,000 students</option>
                    <option value="1000-5000" className="bg-[#030914] text-slate-200">1,000 – 5,000 students</option>
                    <option value="5000+" className="bg-[#030914] text-slate-200">5,000+ students</option>
                  </select>
                  {errors.reachEstimate && <p className="mt-1.5 text-[10px] text-red-400 font-bold">{errors.reachEstimate}</p>}
                </div>
              </div>
            </TiltCard>

            {/* Section 4 — Motivation & Commitment Sub-card */}
            <TiltCard>
              <h3 className="mb-6 flex items-center gap-3 text-xs font-black uppercase tracking-widest text-yellow-400">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-[10px] font-black shadow-[0_0_10px_rgba(234,179,8,0.15)]">4</span>
                Motivation & Availability
              </h3>
              
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      Why do you want to be a Connexode Ambassador? *
                    </label>
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${form.whyAmbassador.length >= 80 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'}`}>
                      {form.whyAmbassador.length} characters
                    </span>
                  </div>
                  <textarea
                    value={form.whyAmbassador}
                    onChange={set("whyAmbassador")}
                    rows={4}
                    placeholder="Tell us about your passion for tech education, your campus network, and how you plan to promote Connexode..."
                    className={`${inputCls("whyAmbassador", form.whyAmbassador)} resize-none leading-relaxed`}
                  />
                  {errors.whyAmbassador && <p className="mt-1.5 text-[10px] text-red-400 font-bold">{errors.whyAmbassador}</p>}
                </div>
                
                <div>
                  <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Past leadership / event experience <span className="text-slate-600 normal-case font-bold">(optional)</span>
                  </label>
                  <textarea
                    value={form.pastExperience}
                    onChange={set("pastExperience")}
                    rows={3}
                    placeholder="e.g. President of CS Society, organized 3 tech events with 200+ attendees..."
                    className={`${inputCls("pastExperience", form.pastExperience)} resize-none leading-relaxed`}
                  />
                </div>
                
                <div>
                  <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Weekly Availability *</label>
                  <select value={form.availability} onChange={set("availability")} className={inputCls("availability", form.availability)}>
                    <option value="" className="bg-[#030914] text-slate-400 font-bold">Select hours per week</option>
                    <option value="2-4" className="bg-[#030914] text-slate-200">2–4 hours / week</option>
                    <option value="4-8" className="bg-[#030914] text-slate-200">4–8 hours / week</option>
                    <option value="8-12" className="bg-[#030914] text-slate-200">8–12 hours / week</option>
                    <option value="12+" className="bg-[#030914] text-slate-200">12+ hours / week (full-time dedication)</option>
                  </select>
                  {errors.availability && <p className="mt-1.5 text-[10px] text-red-400 font-bold">{errors.availability}</p>}
                </div>
              </div>
            </TiltCard>

            {/* Terms notice */}
            <div className="rounded-2xl border border-cyan-500/10 bg-cyan-500/4 p-5 text-xs text-slate-400 leading-relaxed shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]">
              <p className="flex items-start gap-3">
                <Shield size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                <span>By submitting this onboarding form, you confirm that all information provided is accurate. Your application will be processed within <strong className="text-white">24 hours</strong>, and a confirmation email will be dispatched.</span>
              </p>
            </div>

            {/* Submit button (Mechanical tactile look & feel) */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 py-4.5 text-sm font-extrabold text-[#020B18] shadow-[0_10px_35px_-8px_rgba(234,179,8,0.5),_inset_0_1.5px_0_rgba(255,255,255,0.25)] hover:shadow-[0_15px_45px_-5px_rgba(234,179,8,0.6),_inset_0_1.5px_0_rgba(255,255,255,0.35)] hover:-translate-y-[2px] active:translate-y-[1px] active:shadow-[0_5px_15px_-4px_rgba(234,179,8,0.4)] transition-all duration-300 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Submitting Application...
                </>
              ) : (
                <>
                  <Star size={16} className="fill-[#020B18]" />
                  Submit Ambassador Application
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}
