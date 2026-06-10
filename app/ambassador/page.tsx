"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Users, 
  Calendar, 
  Gift, 
  Copy, 
  Check, 
  PlusCircle, 
  Flame, 
  Trophy, 
  TrendingUp, 
  Coins, 
  Award,
  ExternalLink 
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";

interface EventLog {
  id: string;
  name: string;
  date: string;
  expectedAttendees: number;
  university: string;
  status: "PENDING" | "APPROVED";
}

export default function AmbassadorDashboard() {
  const [copied, setCopied] = useState(false);
  const [events, setEvents] = useState<EventLog[]>([
    { id: "evt_1", name: "Web Dev BootCamp 2026", date: "2026-05-15", expectedAttendees: 120, university: "FAST NUCES", status: "APPROVED" },
    { id: "evt_2", name: "AI Hackathon Info Session", date: "2026-05-28", expectedAttendees: 80, university: "NUST", status: "APPROVED" },
  ]);

  // Form states
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [attendees, setAttendees] = useState("");
  const [university, setUniversity] = useState("FAST NUCES");
  
  const [successMsg, setSuccessMsg] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText("connexode.pk/join/ali");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventName.trim() || !eventDate || !attendees || !university) return;

    const newEvent: EventLog = {
      id: `evt_${Math.random().toString(36).substring(2, 9)}`,
      name: eventName,
      date: eventDate,
      expectedAttendees: Number(attendees),
      university,
      status: "PENDING"
    };

    setEvents([newEvent, ...events]);
    setEventName("");
    setEventDate("");
    setAttendees("");
    setSuccessMsg("Event logged successfully! Pending admin verification.");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const totalReferrals = 45;
  const targetReferrals = 50;
  const referralPercent = (totalReferrals / targetReferrals) * 100;

  return (
    <main className="relative min-h-screen bg-[#020B18] text-slate-100 pb-20 pt-28 overflow-hidden select-none">
      {/* Glow backgrounds */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Navbar */}
      <Navbar />

      <div className="relative mx-auto max-w-5xl px-6">
        
        {/* Back Link */}
        <Link
          href="/dashboard"
          className="mb-8 inline-flex items-center gap-2 text-xs text-slate-500 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft size={13} />
          Back to Dashboard
        </Link>

        {/* Header Title */}
        <div className="mb-8 border-b border-white/5 pb-5">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-400 border border-cyan-500/20 mb-3">
            <Award size={12} className="animate-pulse" />
            Campus Ambassador Portal
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight font-display">
            Ambassador Tracking Dashboard
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Track your student reach, log events, and claim stipends and course rewards.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          <div className="rounded-2xl border border-white/8 bg-white/4 p-5 backdrop-blur-xl flex items-center gap-4 shadow-lg">
            <div className="rounded-lg bg-cyan-500/10 p-3 text-cyan-400">
              <Users size={22} />
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-slate-500">Students Reached</span>
              <span className="block text-xl font-black text-white">15K+</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/4 p-5 backdrop-blur-xl flex items-center gap-4 shadow-lg">
            <div className="rounded-lg bg-teal-500/10 p-3 text-teal-400">
              <Calendar size={22} />
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-slate-500">Events Hosted</span>
              <span className="block text-xl font-black text-white">{events.length} Completed</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/4 p-5 backdrop-blur-xl flex items-center gap-4 shadow-lg">
            <div className="rounded-lg bg-purple-500/10 p-3 text-purple-400">
              <TrendingUp size={22} />
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-slate-500">Active Referrals</span>
              <span className="block text-xl font-black text-white">{totalReferrals} Students</span>
            </div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid gap-6 lg:grid-cols-3 items-start">
          
          {/* Left Columns (Form & Link Generator) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Referral Generator */}
            <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl shadow-lg space-y-4">
              <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 flex items-center gap-2">
                <Coins size={14} className="text-yellow-500" />
                Your Referral Link
              </h3>
              <p className="text-2xs text-slate-400 leading-relaxed">
                Share this unique tracking URL on social media groups or university boards. You earn points and stipend multipliers for every student who signs up and enrolls.
              </p>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value="connexode.pk/join/ali"
                  className="flex-1 rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-cyan-400 font-mono font-bold outline-none"
                />
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 rounded-xl bg-cyan-400 px-5 text-xs font-bold text-[#020B18] shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:scale-[1.01] transition-all cursor-pointer"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            {/* Event Logger Form */}
            <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl shadow-lg space-y-6">
              <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 flex items-center gap-2">
                <PlusCircle size={14} className="text-cyan-400" />
                Log Campus Outreach Event
              </h3>

              <form onSubmit={handleLogEvent} className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-2xs uppercase tracking-wider text-slate-500 font-semibold mb-1.5">
                    Event Name / Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="e.g. Next.js Architecture Seminar"
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-cyan-400/40"
                  />
                </div>

                <div>
                  <label className="block text-2xs uppercase tracking-wider text-slate-500 font-semibold mb-1.5">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-xs text-slate-200 outline-none focus:border-cyan-400/40"
                  />
                </div>

                <div>
                  <label className="block text-2xs uppercase tracking-wider text-slate-500 font-semibold mb-1.5">
                    Expected Attendees *
                  </label>
                  <input
                    type="number"
                    required
                    value={attendees}
                    onChange={(e) => setAttendees(e.target.value)}
                    placeholder="e.g. 100"
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-cyan-400/40"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-2xs uppercase tracking-wider text-slate-500 font-semibold mb-1.5">
                    University / College Name *
                  </label>
                  <select
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-xs text-slate-300 outline-none"
                  >
                    <option value="FAST NUCES">FAST NUCES</option>
                    <option value="NUST">NUST</option>
                    <option value="COMSATS">COMSATS</option>
                    <option value="UET">UET</option>
                    <option value="LUMS">LUMS</option>
                  </select>
                </div>

                {successMsg && (
                  <div className="sm:col-span-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-xs text-emerald-400 flex items-center gap-2">
                    <Check size={14} />
                    {successMsg}
                  </div>
                )}

                <button
                  type="submit"
                  className="sm:col-span-2 w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 py-3.5 text-xs font-bold text-[#020B18] shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:scale-[1.01] transition-all cursor-pointer"
                >
                  <PlusCircle size={14} />
                  Log Outreach Event
                </button>
              </form>
            </div>

          </div>

          {/* Right Column (Rewards & Recent Events logs) */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Rewards / Stipend Progress */}
            <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl shadow-lg space-y-5">
              <div className="flex items-center gap-2">
                <Gift className="text-purple-400" size={16} />
                <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
                  Stipend & Rewards Tier
                </h3>
              </div>

              {/* Progress tier details */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-bold">Current Level: Bronze</span>
                  <span className="text-cyan-400 font-black">{totalReferrals} / {targetReferrals} Refers</span>
                </div>

                {/* Progress bar container */}
                <div className="h-2.5 w-full rounded-full bg-white/5 overflow-hidden border border-white/5">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-teal-500 shadow-[0_0_10px_rgba(34,211,238,0.3)] transition-all duration-1000"
                    style={{ width: `${referralPercent}%` }}
                  />
                </div>

                <p className="text-2xs text-slate-500 leading-normal bg-white/2 rounded-xl border border-white/5 p-3 flex items-start gap-2">
                  <Flame size={12} className="text-yellow-500 shrink-0 mt-0.5" />
                  <span>Only <strong>{targetReferrals - totalReferrals} more referrals</strong> left to unlock <strong>Premium Course Access Voucher + Stipend Bonus</strong>!</span>
                </p>
              </div>
            </div>

            {/* Events Logs List */}
            <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl shadow-lg space-y-5">
              <div className="flex items-center gap-2">
                <Calendar className="text-cyan-400" size={16} />
                <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
                  Logged Event History
                </h3>
              </div>

              <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar">
                {events.map((evt) => (
                  <div
                    key={evt.id}
                    className="rounded-xl border border-white/5 bg-white/1 p-3 text-xs space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-slate-200">{evt.name}</h4>
                      <span className={`rounded-full px-2 py-0.5 text-[8px] font-black tracking-wide ${
                        evt.status === "APPROVED" 
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25"
                          : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/25"
                      }`}>
                        {evt.status}
                      </span>
                    </div>

                    <div className="text-[10px] text-slate-500 space-y-0.5">
                      <div><span className="font-semibold text-slate-400">Univ:</span> {evt.university}</div>
                      <div className="flex justify-between pt-1 font-mono text-[9px]">
                        <span>{evt.date}</span>
                        <span className="text-slate-400 font-bold">{evt.expectedAttendees} Attendees</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}
