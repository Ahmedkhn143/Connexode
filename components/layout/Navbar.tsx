"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight, LayoutDashboard, Award, LogOut, ShieldAlert, BookOpen, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeUser, setActiveUser] = useState<any>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });

    // Load active user
    if (typeof window !== "undefined") {
      const activeUserId = localStorage.getItem("connexode_active_user");
      const sessionActive = sessionStorage.getItem("connexode_active_user");
      
      if (activeUserId && !sessionActive) {
        localStorage.removeItem("connexode_active_user");
        setActiveUser(null);
      } else if (activeUserId) {
        // Check dynamic users first
        const dynamicRaw = localStorage.getItem("connexode_dynamic_users");
        if (dynamicRaw) {
          try {
            const dynamicUsers = JSON.parse(dynamicRaw);
            const found = dynamicUsers.find((u: any) => u.id === activeUserId);
            if (found) { setActiveUser(found); return; }
          } catch (e) { console.error(e); }
        }
        // Fall back to static mock users
        import("@/lib/mock-data").then(({ MOCK_USERS }) => {
          const found = (MOCK_USERS as any[]).find((u) => u.id === activeUserId);
          if (found) setActiveUser(found);
        });
      }
    }
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("connexode_active_user");
      sessionStorage.removeItem("connexode_active_user");
      setActiveUser(null);
      window.location.href = "/";
    }
  };

  const role: string = activeUser?.role || "";

  // Role-specific dashboard link
  const dashboardLink = role === "ADMIN" ? "/admin" : role === "MENTOR" ? "/mentor" : "/dashboard";
  const dashboardLabel = role === "ADMIN" ? "Admin Panel" : role === "MENTOR" ? "Mentor Panel" : "Dashboard";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[#020B18]/80 backdrop-blur-xl border-b border-white/8 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="Connexode Logo"
              className="h-9 w-9 rounded-xl object-cover shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-shadow duration-300 group-hover:shadow-[0_0_30px_rgba(0,245,255,0.6)] animate-pulse-slow"
            />
            <span className="font-display text-xl font-bold tracking-tight text-white">
              Connex<span className="text-cyan-400">ode</span>
            </span>
          </Link>

          {/* Desktop Nav Links — only show for non-logged-in or students */}
          {(!activeUser || role === "STUDENT") && (
            <ul className="hidden items-center gap-6 md:flex">
               {!activeUser ? (
                <>
                  <li><Link href="/#services" className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors">Services</Link></li>
                  <li>
                    <Link href="/ambassador" className="flex items-center gap-1 text-sm font-medium text-yellow-400 hover:text-yellow-300 transition-colors">
                      <Star size={12} className="fill-yellow-400" />
                      Ambassador Program
                    </Link>
                  </li>
                  <li><Link href="/leaderboard" className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors">Leaderboard</Link></li>
                  <li><Link href="/events" className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors">Events</Link></li>
                </>
              ) : (
                // Logged-in student quick links
                <>
                  <li>
                    <Link href="/events" className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors">Events</Link>
                  </li>
                  <li>
                    <Link href="/leaderboard" className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors">Leaderboard</Link>
                  </li>
                  <li>
                    <Link
                      href="/ambassador"
                      className="flex items-center gap-1.5 text-sm font-medium text-yellow-400 hover:text-yellow-300 transition-colors"
                    >
                      <Star size={13} className="fill-yellow-400" />
                      Ambassador
                    </Link>
                  </li>
                </>
              )}
            </ul>
          )}

          {/* Desktop CTA / User Actions */}
          <div className="hidden items-center gap-3 md:flex">
            {activeUser ? (
              <>
                {/* Role badge */}
                {role === "ADMIN" && (
                  <span className="flex items-center gap-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 text-[10px] font-extrabold text-purple-400 uppercase tracking-widest">
                    <ShieldAlert size={11} />
                    Admin
                  </span>
                )}
                {role === "MENTOR" && (
                  <span className="flex items-center gap-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 text-[10px] font-extrabold text-cyan-400 uppercase tracking-widest">
                    <BookOpen size={11} />
                    Mentor
                  </span>
                )}

                {/* Dashboard link */}
                <Link
                  href={dashboardLink}
                  className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10 transition-all"
                >
                  {activeUser.avatarImage ? (
                    <img
                      src={activeUser.avatarImage}
                      alt={activeUser.name}
                      className="h-6 w-6 rounded-full object-cover border border-white/10"
                    />
                  ) : (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 text-[10px] font-extrabold text-[#020B18]">
                      {activeUser.avatarInitials || activeUser.name?.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                  {dashboardLabel}
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/15 transition-all"
                >
                  <LogOut size={12} />
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
                >
                  Sign In
                </Link>
                <Link
                  href="/ambassador"
                  className="group flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-5 py-2.5 text-sm font-semibold text-[#020B18] shadow-[0_0_20px_rgba(0,245,255,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,245,255,0.5)] hover:scale-105"
                >
                  Apply Ambassador
                  <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-400 md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={cn(
            "overflow-hidden border-t border-white/8 bg-[#020B18]/95 backdrop-blur-xl transition-all duration-300 md:hidden",
            mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="flex flex-col gap-1 px-6 py-4">
            {activeUser ? (
              <>
                {role === "STUDENT" && (
                  <>
                    <Link href="/events" className="rounded-lg px-4 py-3 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-cyan-400" onClick={() => setMobileOpen(false)}>Events</Link>
                    <Link href="/leaderboard" className="rounded-lg px-4 py-3 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-cyan-400" onClick={() => setMobileOpen(false)}>Leaderboard</Link>
                    <Link
                      href="/ambassador"
                      className="rounded-lg px-4 py-3 text-sm font-medium text-yellow-400 hover:bg-yellow-500/5 flex items-center gap-2"
                      onClick={() => setMobileOpen(false)}
                    >
                      <Star size={14} className="fill-yellow-400" />
                      Ambassador Program
                    </Link>
                  </>
                )}
                <div className="mt-3 flex flex-col gap-2">
                  <Link
                    href={dashboardLink}
                    className="rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-4 py-3 text-center text-sm font-semibold text-[#020B18]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {dashboardLabel}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-center text-sm font-semibold text-red-400 hover:bg-red-500/15"
                  >
                    Log Out
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* <a href="#tracks" className="rounded-lg px-4 py-3 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-cyan-400" onClick={() => setMobileOpen(false)}>Tracks</a> */}
                {/* <a href="#how-it-works" className="rounded-lg px-4 py-3 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-cyan-400" onClick={() => setMobileOpen(false)}>How It Works</a> */}
                <Link href="/ambassador" className="rounded-lg px-4 py-3 text-sm font-medium text-yellow-400 hover:bg-yellow-500/5 flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                  <Star size={13} className="fill-yellow-400" />
                  Ambassador Program
                </Link>
                <Link href="/leaderboard" className="rounded-lg px-4 py-3 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-cyan-400" onClick={() => setMobileOpen(false)}>Leaderboard</Link>
                <Link href="/events" className="rounded-lg px-4 py-3 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-cyan-400" onClick={() => setMobileOpen(false)}>Events</Link>
                <div className="mt-3 flex flex-col gap-2">
                  <Link href="/register" className="rounded-lg px-4 py-3 text-center text-sm font-medium text-slate-400 hover:text-white" onClick={() => setMobileOpen(false)}>Sign In</Link>
                  <Link href="/ambassador" className="rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-4 py-3 text-center text-sm font-semibold text-[#020B18]" onClick={() => setMobileOpen(false)}>Apply Ambassador</Link>
                </div>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
