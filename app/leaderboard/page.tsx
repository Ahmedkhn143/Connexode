"use client";

import Link from "next/link";
import { 
  ArrowLeft, 
  Flame, 
  Trophy, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  User as UserIcon,
  Crown
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";

// Mock Leaderboard Data
const TOP_3_LEADERBOARD = [
  { rank: 2, name: "Maya Patel", initials: "MP", points: 3450, streak: 14, color: "border-slate-300 text-slate-300 bg-slate-300/10 shadow-[0_0_20px_rgba(203,213,225,0.15)]", label: "Silver" },
  { rank: 1, name: "Zayn Malik", initials: "ZM", points: 4120, streak: 24, color: "border-yellow-400 text-yellow-400 bg-yellow-400/10 shadow-[0_0_35px_rgba(250,204,21,0.25)] scale-105 z-10", label: "Gold" },
  { rank: 3, name: "Omar Khan", initials: "OK", points: 3180, streak: 9, color: "border-amber-600 text-amber-600 bg-amber-600/10 shadow-[0_0_20px_rgba(180,83,9,0.15)]", label: "Bronze" }
];

const RANKINGS_LIST = [
  { rank: 4, name: "Ayesha Malik", initials: "AM", points: 2990, streak: 11 },
  { rank: 5, name: "Fatima Shah", initials: "FS", points: 2950, streak: 8 },
  { rank: 6, name: "Bilal Ahmed", initials: "BA", points: 2910, streak: 15 },
  { rank: 7, name: "Sara Khan", initials: "SK", points: 2880, streak: 7 },
  { rank: 8, name: "Alex Johnson", initials: "AJ", points: 2840, streak: 12, isSelf: true },
  { rank: 9, name: "Hamza Ali", initials: "HA", points: 2790, streak: 5 },
  { rank: 10, name: "Daniyal Sheikh", initials: "DS", points: 2710, streak: 3 }
];

export default function LeaderboardPage() {
  return (
    <main className="relative min-h-screen bg-[#020B18] text-slate-100 pb-32 pt-28 overflow-hidden select-none">
      {/* Radial glow decorations */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <Navbar />

      <div className="relative mx-auto max-w-4xl px-6">
        
        {/* Back Link */}
        <Link
          href="/dashboard"
          className="mb-8 inline-flex items-center gap-2 text-xs text-slate-500 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft size={13} />
          Back to Dashboard
        </Link>

        {/* Page Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-400 border border-cyan-500/20 mb-3 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <Sparkles size={12} className="animate-pulse" />
            Connexode Honor Roll
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight font-display">
            Wall of Fame & Leaderboard
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto leading-relaxed">
            See where you stand. Accumulate points by submitting task commits and maintaining your daily learning streak.
          </p>
        </div>

        {/* Top 3 Podium Area */}
        <div className="grid gap-6 md:grid-cols-3 items-end justify-center max-w-3xl mx-auto mb-12">
          
          {/* Rank 2 (Silver) */}
          <div className="order-2 md:order-1 flex flex-col items-center">
            <div className={`rounded-2xl border p-5 bg-white/3 backdrop-blur-xl flex flex-col items-center w-full max-w-[210px] text-center ${TOP_3_LEADERBOARD[0].color}`}>
              <span className="text-[9px] uppercase font-bold text-slate-400 mb-2">{TOP_3_LEADERBOARD[0].label} Medal</span>
              <div className="h-14 w-14 rounded-full bg-slate-400/20 flex items-center justify-center border-2 border-slate-300 font-bold text-white text-lg mb-3">
                {TOP_3_LEADERBOARD[0].initials}
              </div>
              <h3 className="font-bold text-white text-sm">{TOP_3_LEADERBOARD[0].name}</h3>
              <span className="text-2xs text-slate-400 mt-0.5">{TOP_3_LEADERBOARD[0].points} Points</span>
              <span className="text-[10px] text-yellow-500 flex items-center gap-1 mt-2.5 font-bold">
                <Flame size={12} className="fill-yellow-500" />
                {TOP_3_LEADERBOARD[0].streak} Day Streak
              </span>
            </div>
            {/* Podium Block */}
            <div className="w-full max-w-[210px] h-12 bg-gradient-to-t from-slate-500/10 to-slate-500/20 border border-white/5 border-t-slate-400/20 rounded-b-xl flex items-center justify-center text-slate-400 font-bold text-md shadow-lg">
              2nd
            </div>
          </div>

          {/* Rank 1 (Gold) */}
          <div className="order-1 md:order-2 flex flex-col items-center scale-105">
            <div className={`rounded-2xl border p-6 bg-white/3 backdrop-blur-xl flex flex-col items-center w-full max-w-[220px] text-center ${TOP_3_LEADERBOARD[1].color} relative`}>
              <Crown className="absolute -top-5 text-yellow-400 animate-bounce" size={24} />
              <span className="text-[9px] uppercase font-bold text-yellow-400 mb-2">{TOP_3_LEADERBOARD[1].label} Crown</span>
              <div className="h-16 w-16 rounded-full bg-yellow-400/20 flex items-center justify-center border-2 border-yellow-400 font-bold text-white text-xl mb-3">
                {TOP_3_LEADERBOARD[1].initials}
              </div>
              <h3 className="font-black text-white text-md">{TOP_3_LEADERBOARD[1].name}</h3>
              <span className="text-xs text-yellow-300 font-bold mt-0.5">{TOP_3_LEADERBOARD[1].points} Points</span>
              <span className="text-[11px] text-yellow-400 flex items-center gap-1 mt-3.5 font-bold">
                <Flame size={13} className="fill-yellow-400" />
                {TOP_3_LEADERBOARD[1].streak} Day Streak
              </span>
            </div>
            {/* Podium Block */}
            <div className="w-full max-w-[220px] h-20 bg-gradient-to-t from-yellow-400/5 to-yellow-400/15 border border-white/5 border-t-yellow-400/20 rounded-b-xl flex items-center justify-center text-yellow-400 font-black text-lg shadow-2xl">
              1st
            </div>
          </div>

          {/* Rank 3 (Bronze) */}
          <div className="order-3 flex flex-col items-center">
            <div className={`rounded-2xl border p-5 bg-white/3 backdrop-blur-xl flex flex-col items-center w-full max-w-[210px] text-center ${TOP_3_LEADERBOARD[2].color}`}>
              <span className="text-[9px] uppercase font-bold text-amber-700 mb-2">{TOP_3_LEADERBOARD[2].label} Medal</span>
              <div className="h-14 w-14 rounded-full bg-amber-600/20 flex items-center justify-center border-2 border-amber-600 font-bold text-white text-lg mb-3">
                {TOP_3_LEADERBOARD[2].initials}
              </div>
              <h3 className="font-bold text-white text-sm">{TOP_3_LEADERBOARD[2].name}</h3>
              <span className="text-2xs text-slate-400 mt-0.5">{TOP_3_LEADERBOARD[2].points} Points</span>
              <span className="text-[10px] text-yellow-500 flex items-center gap-1 mt-2.5 font-bold">
                <Flame size={12} className="fill-yellow-500" />
                {TOP_3_LEADERBOARD[2].streak} Day Streak
              </span>
            </div>
            {/* Podium Block */}
            <div className="w-full max-w-[210px] h-8 bg-gradient-to-t from-amber-600/10 to-amber-600/20 border border-white/5 border-t-amber-600/20 rounded-b-xl flex items-center justify-center text-amber-600 font-bold text-sm shadow-lg">
              3rd
            </div>
          </div>

        </div>

        {/* Scrollable Rankings List */}
        <div className="rounded-2xl border border-white/8 bg-white/4 shadow-xl overflow-hidden backdrop-blur-xl">
          <div className="border-b border-white/5 bg-white/1 px-6 py-4 flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <TrendingUp size={14} className="text-cyan-400" />
              Cohort Leaderboard
            </span>
            <span className="text-2xs text-slate-500">Updated hourly</span>
          </div>

          <div className="divide-y divide-white/5 max-h-[360px] overflow-y-auto custom-scrollbar">
            {RANKINGS_LIST.map((student) => (
              <div
                key={student.rank}
                className={`flex items-center justify-between px-6 py-4 transition-colors ${
                  student.isSelf ? "bg-cyan-500/5" : "hover:bg-white/2"
                }`}
              >
                {/* Rank & Student Info */}
                <div className="flex items-center gap-4.5">
                  <span className={`w-6 text-center text-xs font-bold ${
                    student.isSelf ? "text-cyan-400" : "text-slate-500"
                  }`}>
                    #{student.rank}
                  </span>
                  
                  {/* Avatar Initials */}
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-2xs font-extrabold border ${
                    student.isSelf ? "border-cyan-400/40 text-cyan-400 bg-cyan-400/5" : "border-white/5 text-slate-300 bg-slate-800"
                  }`}>
                    {student.initials}
                  </div>

                  <div className="space-y-0.5">
                    <span className={`block text-xs font-bold ${student.isSelf ? "text-cyan-400" : "text-white"}`}>
                      {student.name}
                      {student.isSelf && (
                        <span className="ml-2 rounded-full bg-cyan-400/10 border border-cyan-400/25 px-1.5 py-0.5 text-[8px] uppercase font-black text-cyan-400">
                          You
                        </span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Score & Streak stats */}
                <div className="flex items-center gap-8 text-xs font-semibold">
                  <div className="text-right">
                    <span className="text-white block font-bold">{student.points.toLocaleString()}</span>
                    <span className="text-[9px] text-slate-500 block uppercase font-bold">Points</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Flame size={12} className="fill-yellow-500 text-yellow-500 shrink-0" />
                    <span>{student.streak}d</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Sticky Bottom Rank Indicator */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#020b18]/90 backdrop-blur-xl border-t border-cyan-500/20 py-4 shadow-[0_-10px_30px_rgba(0,245,255,0.05)] select-none">
        <div className="mx-auto max-w-4xl px-6 flex items-center justify-between">
          <div className="flex items-center gap-3.5 text-xs">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 font-black">
              #8
            </div>
            <div>
              <span className="block text-[9px] uppercase font-bold text-slate-500">Your Campus Rank</span>
              <span className="block font-bold text-white">Alex Johnson</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <div className="text-right">
              <span className="block font-black text-cyan-400">2,840 Points</span>
              <span className="block text-[9px] uppercase font-bold text-slate-500">12 Days Streak</span>
            </div>

            <Link
              href="/dashboard"
              className="flex items-center gap-1 rounded-xl bg-cyan-400 px-4 py-2 text-2xs font-bold text-[#020B18] shadow-[0_0_15px_rgba(34,211,238,0.15)] hover:scale-[1.01] transition-all"
            >
              My Workspace
              <ArrowRight size={10} />
            </Link>
          </div>
        </div>
      </div>

    </main>
  );
}
