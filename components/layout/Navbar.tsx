"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Code2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Tracks", href: "#tracks" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Community", href: "#trust" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [activeUser, setActiveUser] = useState<any>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    
    if (typeof window !== "undefined") {
      const activeUserId = localStorage.getItem("connexode_active_user");
      if (activeUserId) {
        const dynamicRaw = localStorage.getItem("connexode_dynamic_users");
        if (dynamicRaw) {
          try {
            const dynamicUsers = JSON.parse(dynamicRaw);
            const found = dynamicUsers.find((u: any) => u.id === activeUserId);
            if (found) {
              setActiveUser(found);
              return;
            }
          } catch (e) {
            console.error(e);
          }
        }
        import("@/lib/mock-data").then(({ MOCK_USERS }) => {
          const found = MOCK_USERS.find((u) => u.id === activeUserId);
          if (found) {
            setActiveUser(found);
          }
        });
      }
    }
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("connexode_active_user");
      setActiveUser(null);
      window.location.reload();
    }
  };

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

          {/* Desktop Nav */}
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-slate-400 transition-colors duration-200 hover:text-cyan-400"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden items-center gap-4 md:flex">
            {activeUser ? (
              <>
                <Link
                  href="/dashboard"
                  className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10 transition-all"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 text-[10px] font-extrabold text-[#020B18]">
                    {activeUser.avatarInitials || activeUser.name.substring(0, 2).toUpperCase()}
                  </div>
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/15 transition-all"
                >
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
                  href="/register"
                  className="group flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-5 py-2.5 text-sm font-semibold text-[#020B18] shadow-[0_0_20px_rgba(0,245,255,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,245,255,0.5)] hover:scale-105"
                >
                  Get Started
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
            mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="flex flex-col gap-1 px-6 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-lg px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-cyan-400"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-4 flex flex-col gap-2">
              {activeUser ? (
                <>
                  <Link
                    href="/dashboard"
                    className="rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-4 py-3 text-center text-sm font-semibold text-[#020B18]"
                    onClick={() => setMobileOpen(false)}
                  >
                    My Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-center text-sm font-semibold text-red-400 hover:bg-red-500/15 transition-all"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/register"
                    className="rounded-lg px-4 py-3 text-center text-sm font-medium text-slate-400 hover:text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-4 py-3 text-center text-sm font-semibold text-[#020B18]"
                    onClick={() => setMobileOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
