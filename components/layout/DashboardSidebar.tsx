"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Code2, ChevronDown, ChevronRight, LayoutDashboard,
  User as UserIcon, LogOut, Award, BookOpen, Flame, MessageSquare, Map
} from "lucide-react";
import { cn } from "@/lib/utils";
import { WEEKLY_TASKS, TRACKS, getActiveUser } from "@/lib/mock-data";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isBadgesView = searchParams.get("view") === "badges";
  
  const [activeUser, setActiveUser] = useState<any>(null);
  const [unresolvedCount, setUnresolvedCount] = useState<number>(0);

  useEffect(() => {
    setActiveUser(getActiveUser());
  }, []);

  useEffect(() => {
    if (activeUser) {
      const loadUnresolved = () => {
        const stored = localStorage.getItem("connexode_qa_tickets");
        if (stored) {
          try {
            const tickets = JSON.parse(stored);
            const myTickets = tickets.filter((t: any) => t.userId === activeUser.id);
            const count = myTickets.filter((t: any) => t.status === "PENDING").length;
            setUnresolvedCount(count);
          } catch (e) {}
        }
      };
      loadUnresolved();
      window.addEventListener("storage", loadUnresolved);
      const interval = setInterval(loadUnresolved, 2000);
      return () => {
        window.removeEventListener("storage", loadUnresolved);
        clearInterval(interval);
      };
    }
  }, [activeUser]);

  const enrolledTrackId = activeUser?.enrolledTrackId || "track_001";
  const track = TRACKS.find((t) => t.id === enrolledTrackId);
  const totalWeeks = track?.durationWeeks ?? 8;
  const weeks = Array.from({ length: totalWeeks }, (_, i) => i + 1);
  const [openWeeks, setOpenWeeks] = useState<number[]>([1]);

  useEffect(() => {
    if (activeUser?.currentWeek) {
      setOpenWeeks([activeUser.currentWeek]);
    }
  }, [activeUser]);

  const toggleWeek = (week: number) => {
    setOpenWeeks((prev) =>
      prev.includes(week) ? prev.filter((w) => w !== week) : [...prev, week]
    );
  };

  const tasksByWeek = (week: number) =>
    WEEKLY_TASKS.filter((t) => t.weekNo === week && t.trackId === enrolledTrackId);

  const statusColor: Record<string, string> = {
    LOCKED: "text-slate-600",
    IN_PROGRESS: "text-yellow-400",
    SUBMITTED: "text-blue-400",
    APPROVED: "text-emerald-400",
  };

  if (!activeUser) {
    return (
      <aside className="flex h-full w-72 flex-col border-r border-white/8 bg-[#020B18]/60 backdrop-blur-xl animate-pulse" />
    );
  }

  return (
    <aside className="flex h-full w-72 flex-col border-r border-white/8 bg-[#020B18]/60 backdrop-blur-xl">
      {/* Logo */}
      <Link href="/" className="group flex items-center gap-3 border-b border-white/8 px-6 py-5">
        <img
          src="/logo.png?v=20"
          alt="Connexode Logo"
          className="h-9 w-9 rounded-xl object-cover shadow-[0_0_16px_rgba(0,245,255,0.4)] transition-shadow duration-300 group-hover:shadow-[0_0_24px_rgba(0,245,255,0.6)]"
        />
        <span className="font-display text-xl font-bold tracking-tight text-white">
          Connex<span className="text-cyan-400">ode</span>
        </span>
      </Link>

      {/* User Quick Info */}
      <div className="border-b border-white/8 px-5 py-4">
        <div className="flex items-center gap-3 rounded-xl bg-white/4 px-4 py-3">
          {activeUser.avatarImage ? (
            <img
              src={activeUser.avatarImage}
              alt={activeUser.name}
              className="h-10 w-10 rounded-full object-cover border border-white/10"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-teal-600 text-sm font-bold text-[#020B18]">
              {activeUser.avatarInitials || activeUser.name.substring(0, 2).toUpperCase()}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-100">{activeUser.name}</p>
            <div className="flex items-center gap-1.5">
              <Flame size={11} className="text-orange-400" />
              <span className="text-xs text-slate-500">{activeUser.streak} day streak</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-cyan-400">{activeUser.points.toLocaleString()}</p>
            <p className="text-xs text-slate-600">pts</p>
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="mb-4 space-y-1">
          <Link
            href="/dashboard"
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
              pathname === "/dashboard"
                ? "bg-cyan-500/15 text-cyan-400 shadow-[inset_0_0_20px_rgba(0,245,255,0.05)]"
                : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
            )}
          >
            <LayoutDashboard size={16} />
            Dashboard
          </Link>
          <Link
            href={`/u/${activeUser.username}`}
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
              pathname.startsWith("/u/") && !isBadgesView
                ? "bg-cyan-500/15 text-cyan-400"
                : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
            )}
          >
            <UserIcon size={16} />
            My Profile
          </Link>
          <Link
            href={`/u/${activeUser.username}?view=badges`}
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
              pathname.startsWith("/u/") && isBadgesView
                ? "bg-cyan-500/15 text-cyan-400"
                : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
            )}
          >
            <Award size={16} />
            My Badges
          </Link>
          {/* Commented out internship links
          <Link
            href="/dashboard?view=roadmap"
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
              pathname === "/dashboard" && searchParams.get("view") === "roadmap"
                ? "bg-cyan-500/15 text-cyan-400"
                : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
            )}
          >
            <Map size={16} />
            Track Roadmap
          </Link>

          <Link
            href="/dashboard?view=mentor"
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
              pathname === "/dashboard" && searchParams.get("view") === "mentor"
                ? "bg-cyan-500/15 text-cyan-400"
                : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
            )}
          >
            <BookOpen size={16} className="text-cyan-400" />
            My Mentor
          </Link>
          
          <Link
            href="/dashboard#helpdesk"
            className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-all duration-200"
          >
            <MessageSquare size={16} className="text-cyan-400" />
            Ask Mentor (Help)
          </Link>
          */}
        </div>

        {/* Commented out Course Plan Accordion
        <div className="mb-2 px-4 pt-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-600">
            <BookOpen size={10} className="mr-1.5 inline" />
            Course Plan
          </p>
        </div>

        <div className="space-y-1">
          {weeks.map((week) => {
            const tasks = tasksByWeek(week);
            const isOpen = openWeeks.includes(week);
            const completedCount = tasks.filter((t) => t.status === "APPROVED").length;
            return (
              <div key={week}>
                <button
                  onClick={() => toggleWeek(week)}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium text-slate-300 transition-all hover:bg-white/5"
                >
                  <div className="flex items-center gap-2.5">
                    {isOpen ? <ChevronDown size={14} className="text-cyan-400" /> : <ChevronRight size={14} />}
                    <span>Week {week}</span>
                    <span className="rounded-full bg-white/8 px-2 py-0.5 text-xs text-slate-500">
                      {completedCount}/{tasks.length}
                    </span>
                  </div>
                </button>
                {isOpen && (
                  <div className="ml-4 mt-1 space-y-0.5 border-l border-white/8 pl-3">
                    {tasks.length === 0 ? (
                      <div className="rounded-lg border border-white/8 bg-white/4 px-3 py-2 text-xs text-slate-500">
                        Tasks unlock soon for this week.
                      </div>
                    ) : (
                      tasks.map((task) => (
                        <Link
                          key={task.id}
                          href={`/dashboard/task/${task.id}`}
                          className={cn(
                            "flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs transition-all duration-150",
                            pathname === `/dashboard/task/${task.id}`
                              ? "bg-cyan-500/10 text-cyan-400"
                              : "text-slate-500 hover:bg-white/5 hover:text-slate-300"
                          )}
                        >
                          <span className={cn("shrink-0 text-[10px] font-bold", statusColor[task.status])}>
                            D{task.dayNo}
                          </span>
                          <span className="truncate">{task.title}</span>
                        </Link>
                      ))
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        */}
      </nav>


      {/* Exit Dashboard */}
      <div className="border-t border-white/8 p-4">
        <Link
          href="/"
          onClick={() => {
            localStorage.removeItem("connexode_active_user");
            sessionStorage.removeItem("connexode_active_user");
          }}
          className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-500 transition-all hover:bg-white/5 hover:text-slate-300"
        >
          <LogOut size={15} />
          Exit Dashboard
        </Link>
      </div>
    </aside>
  );
}
