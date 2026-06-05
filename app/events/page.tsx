"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Video, 
  MapPin, 
  Sparkles, 
  Terminal, 
  Check, 
  CheckCircle2, 
  ExternalLink 
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { cn } from "@/lib/utils";

interface EventItem {
  id: string;
  title: string;
  type: "Online Workshop" | "Local Meetup" | "Hackathon";
  date: string;
  time: string;
  host: string;
  location: string;
  desc: string;
}

const MOCK_EVENTS: EventItem[] = [
  {
    id: "evt_101",
    title: "Next.js App Router & Server Actions Masterclass",
    type: "Online Workshop",
    date: "June 12, 2026",
    time: "6:00 PM - 8:00 PM (PKT)",
    host: "Zayn Malik (Senior Dev)",
    location: "Google Meet",
    desc: "Dive deep into server actions, optimization pipelines, dynamic layout caching, and building secure REST boundaries."
  },
  {
    id: "evt_102",
    title: "Connexode Karachi Devs Meetup",
    type: "Local Meetup",
    date: "June 18, 2026",
    time: "4:00 PM - 7:00 PM (PKT)",
    host: "Ahmad Khan (Admin)",
    location: "FAST NUCES, Karachi",
    desc: "Meet fellow student interns, review capstone architectures, share job hunt strategies, and grab free stickers!"
  },
  {
    id: "evt_103",
    title: "AI Chatbot Challenge: Building with Gemini",
    type: "Hackathon",
    date: "June 25, 2026",
    time: "48 Hours Sprint",
    host: "Connexode Labs",
    location: "Virtual (Discord)",
    desc: "Build autonomous agent pipelines using Google Gemini models. 100,000 PKR prize pool for top 3 student projects!"
  },
  {
    id: "evt_104",
    title: "Prisma & PostgreSQL Optimization Strategies",
    type: "Online Workshop",
    date: "July 02, 2026",
    time: "7:00 PM - 8:30 PM (PKT)",
    host: "Marcus Aurelius (Mentor)",
    location: "Zoom Session",
    desc: "Analyze connection pool parameters, index configurations, query plans, and standard database optimization techniques."
  }
];

export default function EventsHubPage() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [rsvpedIds, setRsvpedIds] = useState<string[]>([]);
  
  // Countdown states
  const [days, setDays] = useState(2);
  const [hours, setHours] = useState(14);
  const [minutes, setMinutes] = useState(45);
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev > 0) return prev - 1;
        setMinutes((m) => {
          if (m > 0) return m - 1;
          setHours((h) => {
            if (h > 0) return h - 1;
            setDays((d) => (d > 0 ? d - 1 : 0));
            return 23;
          });
          return 59;
        });
        return 59;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRsvpToggle = (id: string) => {
    if (rsvpedIds.includes(id)) {
      setRsvpedIds(rsvpedIds.filter((item) => item !== id));
    } else {
      setRsvpedIds([...rsvpedIds, id]);
    }
  };

  const filteredEvents = MOCK_EVENTS.filter((evt) => {
    if (selectedFilter === "All") return true;
    if (selectedFilter === "Workshops") return evt.type === "Online Workshop";
    if (selectedFilter === "Meetups") return evt.type === "Local Meetup";
    if (selectedFilter === "Hackathons") return evt.type === "Hackathon";
    return true;
  });

  return (
    <main className="relative min-h-screen bg-[#020B18] text-slate-100 pb-20 pt-28 overflow-hidden select-none">
      {/* Background radial overlays */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation */}
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

        {/* Featured Event Hero */}
        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-950/15 backdrop-blur-xl p-8 shadow-[0_0_40px_rgba(6,182,212,0.08)] relative overflow-hidden mb-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
          {/* Hero background lights */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-4 max-w-xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-[10px] font-extrabold text-cyan-400 border border-cyan-500/20 uppercase tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.1)]">
              <Sparkles size={11} className="animate-pulse" />
              Featured Hackathon
            </span>
            <h2 className="text-2xl font-black text-white leading-tight font-display">
              Connexode Build-A-Thon 2026
            </h2>
            <p className="text-2xs text-slate-400 leading-relaxed">
              Our flagship 48-hour student hackathon. Gather a team of 3, scope an innovative React/Node product, and pitch it to live industry recruiters. Verified certificates and cash rewards for finalists.
            </p>
            
            <div className="flex gap-4 items-center text-xs pt-2">
              <span className="flex items-center gap-1.5 text-slate-500">
                <Calendar size={13} className="text-cyan-400" />
                June 25-27, 2026
              </span>
              <span className="flex items-center gap-1.5 text-slate-500">
                <Video size={13} className="text-cyan-400" />
                Virtual/Discord
              </span>
            </div>
          </div>

          {/* Countdown Clock Panel */}
          <div className="flex flex-col items-center md:items-end justify-center shrink-0">
            <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider mb-2">Registration Starts in</span>
            
            {/* Numbers block */}
            <div className="flex gap-2.5 font-mono text-center mb-5">
              <div className="rounded-xl border border-white/8 bg-black/40 px-3 py-2">
                <span className="block text-lg font-black text-white">{String(days).padStart(2, "0")}</span>
                <span className="block text-[8px] uppercase text-slate-600 font-bold">Days</span>
              </div>
              <div className="rounded-xl border border-white/8 bg-black/40 px-3 py-2">
                <span className="block text-lg font-black text-white">{String(hours).padStart(2, "0")}</span>
                <span className="block text-[8px] uppercase text-slate-600 font-bold">Hrs</span>
              </div>
              <div className="rounded-xl border border-white/8 bg-black/40 px-3 py-2">
                <span className="block text-lg font-black text-white">{String(minutes).padStart(2, "0")}</span>
                <span className="block text-[8px] uppercase text-slate-600 font-bold">Mins</span>
              </div>
              <div className="rounded-xl border border-white/8 bg-black/40 px-3 py-2">
                <span className="block text-lg font-black text-white">{String(seconds).padStart(2, "0")}</span>
                <span className="block text-[8px] uppercase text-slate-600 font-bold">Secs</span>
              </div>
            </div>

            <button
              onClick={() => handleRsvpToggle("feat_hack")}
              className={cn(
                "w-full md:w-auto flex items-center justify-center gap-1.5 rounded-xl px-6 py-3 text-xs font-bold transition-all cursor-pointer",
                rsvpedIds.includes("feat_hack")
                  ? "bg-emerald-500/10 border border-emerald-500/25 text-emerald-400"
                  : "bg-cyan-400 text-[#020B18] shadow-[0_0_20px_rgba(0,245,255,0.25)] hover:scale-[1.01]"
              )}
            >
              {rsvpedIds.includes("feat_hack") ? <CheckCircle2 size={13} /> : <Terminal size={13} />}
              {rsvpedIds.includes("feat_hack") ? "RSVP Registered!" : "Join Waitlist / RSVP"}
            </button>
          </div>
        </div>

        {/* Filter controls */}
        <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-8">
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Outreach Calendar
          </span>

          {/* Toggle Switches */}
          <div className="flex gap-1.5 bg-black/40 rounded-xl p-1 border border-white/5">
            {["All", "Workshops", "Meetups", "Hackathons"].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={cn(
                  "rounded-lg px-3.5 py-2 text-[10px] font-bold transition-all outline-none cursor-pointer",
                  selectedFilter === filter
                    ? "bg-cyan-400/10 text-cyan-400 border border-cyan-500/20"
                    : "bg-transparent text-slate-500 hover:text-slate-300"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {filteredEvents.map((evt) => {
            const hasRsvped = rsvpedIds.includes(evt.id);
            return (
              <div
                key={evt.id}
                className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl flex flex-col justify-between shadow-lg space-y-4 hover:border-white/12 transition-all hover:-translate-y-0.5"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-white/5 border border-white/5 px-2 py-0.5 text-[8px] font-black uppercase text-slate-400">
                      {evt.type}
                    </span>
                    <span className="text-[9px] text-slate-500 font-mono">{evt.date}</span>
                  </div>

                  <h3 className="text-xs font-bold text-white leading-snug">
                    {evt.title}
                  </h3>

                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    {evt.desc}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4 space-y-3">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <User size={11} className="text-cyan-400" />
                      {evt.host}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={11} className="text-cyan-400" />
                      {evt.location}
                    </span>
                  </div>

                  <button
                    onClick={() => handleRsvpToggle(evt.id)}
                    className={cn(
                      "w-full flex items-center justify-center gap-1.5 rounded-xl py-3 text-xs font-bold transition-all cursor-pointer border",
                      hasRsvped
                        ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-400"
                        : "bg-transparent border-white/10 text-slate-300 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {hasRsvped ? <Check size={12} /> : null}
                    {hasRsvped ? "RSVP Registered" : "Join Event / RSVP"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}
