"use client";

import { useState } from "react";
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
  { icon: Gift, label: "Free Course Access", desc: "Get full access to any Connexode internship track for free." },
  { icon: Trophy, label: "Stipend & Bonuses", desc: "Earn monthly stipend based on your referral & event performance." },
  { icon: Star, label: "Certificate of Excellence", desc: "Official Ambassador certificate for your LinkedIn & resume." },
  { icon: Users, label: "Exclusive Community", desc: "Join a private ambassador Slack with mentors and industry leads." },
];

export default function AmbassadorApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    university: "",
    degree: "",
    semester: "",
    linkedin: "",
    instagram: "",
    youtube: "",
    whyAmbassador: "",
    pastExperience: "",
    reachEstimate: "",
    availability: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required.";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Valid email is required.";
    if (!form.phone.trim() || !/^0[0-9]{10}$/.test(form.phone.replace(/-/g, ""))) errs.phone = "Valid Pakistani mobile (03xxxxxxxxx).";
    if (!form.city) errs.city = "Please select your city.";
    if (!form.university) errs.university = "Please select your university.";
    if (!form.degree.trim()) errs.degree = "Degree / Program is required.";
    if (!form.linkedin.trim()) errs.linkedin = "LinkedIn profile URL is required.";
    if (!form.whyAmbassador.trim() || form.whyAmbassador.length < 80)
      errs.whyAmbassador = "Please write at least 80 characters explaining your motivation.";
    if (!form.reachEstimate.trim()) errs.reachEstimate = "Please estimate your student reach.";
    if (!form.availability) errs.availability = "Please select your availability.";
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
      existing.push({ ...form, id: `amb_${Date.now()}`, status: "PENDING", submittedAt: new Date().toISOString() });
      localStorage.setItem("connexode_ambassador_applications", JSON.stringify(existing));
    } catch (e) {}

    await new Promise((r) => setTimeout(r, 1800)); // simulate processing
    setLoading(false);
    setSubmitted(true);
  };

  const inputCls = (key: string) =>
    `w-full rounded-xl border ${errors[key] ? "border-red-500/50 bg-red-500/5" : "border-white/10 bg-white/4"} px-4 py-3 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-cyan-400/50 transition-colors`;

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
                href="/#tracks"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-xs font-semibold text-slate-300 hover:bg-white/8 transition-all"
              >
                Browse Internship Tracks
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
        <div className="rounded-3xl border border-white/8 bg-white/3 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.4)] overflow-hidden">
          {/* Form header bar */}
          <div className="border-b border-white/6 bg-white/3 px-8 py-5 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-500/15 border border-yellow-500/25">
              <Briefcase size={16} className="text-yellow-400" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-white">Ambassador Application Form</h2>
              <p className="text-[10px] text-slate-500">All fields marked * are required. Takes ~3 minutes.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">

            {/* Section 1 — Personal Info */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-cyan-400">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400/15 text-[9px] font-black">1</span>
                Personal Information
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-500">Full Name *</label>
                  <input type="text" value={form.fullName} onChange={set("fullName")} placeholder="Muhammad Ali Khan" className={inputCls("fullName")} />
                  {errors.fullName && <p className="mt-1 text-[10px] text-red-400">{errors.fullName}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-500">Email Address *</label>
                  <div className="relative">
                    <Mail size={12} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600" />
                    <input type="email" value={form.email} onChange={set("email")} placeholder="ali@example.com" className={`${inputCls("email")} pl-9`} />
                  </div>
                  {errors.email && <p className="mt-1 text-[10px] text-red-400">{errors.email}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-500">Mobile Number * <span className="text-slate-600 normal-case">(03xxxxxxxxx)</span></label>
                  <div className="relative">
                    <Phone size={12} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600" />
                    <input type="tel" value={form.phone} onChange={set("phone")} placeholder="03001234567" className={`${inputCls("phone")} pl-9`} />
                  </div>
                  {errors.phone && <p className="mt-1 text-[10px] text-red-400">{errors.phone}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-500">City *</label>
                  <select value={form.city} onChange={set("city")} className={inputCls("city")}>
                    <option value="">Select your city</option>
                    {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.city && <p className="mt-1 text-[10px] text-red-400">{errors.city}</p>}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/5" />

            {/* Section 2 — Academic Info */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-cyan-400">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400/15 text-[9px] font-black">2</span>
                Academic Information
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-500">University / College *</label>
                  <select value={form.university} onChange={set("university")} className={inputCls("university")}>
                    <option value="">Select your institution</option>
                    {UNIVERSITIES.map((u) => <option key={u} value={u}>{u}</option>)}
                  </select>
                  {errors.university && <p className="mt-1 text-[10px] text-red-400">{errors.university}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-500">Degree / Program *</label>
                  <input type="text" value={form.degree} onChange={set("degree")} placeholder="e.g. BS Computer Science" className={inputCls("degree")} />
                  {errors.degree && <p className="mt-1 text-[10px] text-red-400">{errors.degree}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-500">Current Semester / Year</label>
                  <input type="text" value={form.semester} onChange={set("semester")} placeholder="e.g. 5th Semester / 3rd Year" className={inputCls("semester")} />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/5" />

            {/* Section 3 — Social Presence */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-cyan-400">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400/15 text-[9px] font-black">3</span>
                Social Media Profiles
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    <Link2 size={10} className="text-blue-400" /> LinkedIn Profile URL *
                  </label>
                  <input type="url" value={form.linkedin} onChange={set("linkedin")} placeholder="https://linkedin.com/in/your-profile" className={inputCls("linkedin")} />
                  {errors.linkedin && <p className="mt-1 text-[10px] text-red-400">{errors.linkedin}</p>}
                </div>
                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    <AtSign size={10} className="text-pink-400" /> Instagram Handle <span className="text-slate-600 normal-case">(optional)</span>
                  </label>
                  <input type="text" value={form.instagram} onChange={set("instagram")} placeholder="@your_handle" className={inputCls("instagram")} />
                </div>
                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    <Video size={10} className="text-red-400" /> YouTube / TikTok <span className="text-slate-600 normal-case">(optional)</span>
                  </label>
                  <input type="text" value={form.youtube} onChange={set("youtube")} placeholder="Channel or profile link" className={inputCls("youtube")} />
                </div>
                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    <Users size={10} className="text-emerald-400" /> Estimated Student Reach *
                  </label>
                  <select value={form.reachEstimate} onChange={set("reachEstimate")} className={inputCls("reachEstimate")}>
                    <option value="">Select your reach</option>
                    <option value="0-100">0 – 100 students</option>
                    <option value="100-500">100 – 500 students</option>
                    <option value="500-1000">500 – 1,000 students</option>
                    <option value="1000-5000">1,000 – 5,000 students</option>
                    <option value="5000+">5,000+ students</option>
                  </select>
                  {errors.reachEstimate && <p className="mt-1 text-[10px] text-red-400">{errors.reachEstimate}</p>}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/5" />

            {/* Section 4 — Motivation */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-cyan-400">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400/15 text-[9px] font-black">4</span>
                Your Motivation
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Why do you want to be a Connexode Ambassador? * <span className="text-slate-600 normal-case">(min. 80 characters)</span>
                  </label>
                  <textarea
                    value={form.whyAmbassador}
                    onChange={set("whyAmbassador")}
                    rows={4}
                    placeholder="Tell us about your passion for tech education, your campus network, and how you plan to promote Connexode..."
                    className={`${inputCls("whyAmbassador")} resize-none leading-relaxed`}
                  />
                  <p className="mt-1 text-right text-[10px] text-slate-600">{form.whyAmbassador.length} chars</p>
                  {errors.whyAmbassador && <p className="text-[10px] text-red-400">{errors.whyAmbassador}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Past leadership / event experience <span className="text-slate-600 normal-case">(optional)</span>
                  </label>
                  <textarea
                    value={form.pastExperience}
                    onChange={set("pastExperience")}
                    rows={3}
                    placeholder="e.g. President of CS Society, organized 3 tech events with 200+ attendees..."
                    className={`${inputCls("pastExperience")} resize-none leading-relaxed`}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-500">Weekly Availability *</label>
                  <select value={form.availability} onChange={set("availability")} className={inputCls("availability")}>
                    <option value="">Select hours per week</option>
                    <option value="2-4">2–4 hours / week</option>
                    <option value="4-8">4–8 hours / week</option>
                    <option value="8-12">8–12 hours / week</option>
                    <option value="12+">12+ hours / week (full-time dedication)</option>
                  </select>
                  {errors.availability && <p className="mt-1 text-[10px] text-red-400">{errors.availability}</p>}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/5" />

            {/* Terms notice */}
            <div className="rounded-2xl border border-cyan-500/10 bg-cyan-500/4 p-4 text-xs text-slate-400 leading-relaxed">
              <p className="flex items-start gap-2">
                <Shield size={13} className="text-cyan-400 shrink-0 mt-0.5" />
                By submitting this form, you confirm that all information provided is accurate. Your application will be reviewed within <strong className="text-white">24 hours</strong>, and you will receive a decision via email.
              </p>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 py-4 text-sm font-bold text-[#020B18] shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:scale-[1.01] hover:shadow-[0_0_50px_rgba(234,179,8,0.4)] transition-all disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
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
