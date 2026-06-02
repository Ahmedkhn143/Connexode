"use client";

import { useState, useEffect } from "react";
import { MOCK_USERS, getActiveUser, setActiveUser, type User } from "@/lib/mock-data";
import { Shield, Users, Award, ChevronUp, UserCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function RoleSwitcher() {
  const [activeUser, setActiveUserLocal] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setActiveUserLocal(getActiveUser());
  }, []);

  if (!activeUser) return null;

  const roleColors: Record<string, string> = {
    STUDENT: "text-cyan-400 border-cyan-400/20 bg-cyan-400/10",
    MENTOR: "text-emerald-400 border-emerald-400/20 bg-emerald-400/10",
    ADMIN: "text-purple-400 border-purple-400/20 bg-purple-400/10",
  };

  const roleIcons: Record<string, React.ReactNode> = {
    STUDENT: <Award size={14} />,
    MENTOR: <Users size={14} />,
    ADMIN: <Shield size={14} />,
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-72 overflow-hidden rounded-2xl border border-white/8 bg-[#0A1628]/95 p-3 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl"
          >
            <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Select Simulation Profile
            </p>
            <div className="mt-2 space-y-1">
              {MOCK_USERS.map((user) => {
                const isActive = user.id === activeUser.id;
                return (
                  <button
                    key={user.id}
                    onClick={() => {
                      setActiveUser(user.id);
                      setIsOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-white/8 text-white border border-white/10"
                        : "text-slate-400 hover:bg-white/4 hover:text-slate-200 border border-transparent"
                    }`}
                  >
                    <div>
                      <p className="font-bold">{user.name}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{user.email}</p>
                    </div>
                    <div
                      className={`flex items-center gap-1.5 rounded-lg border px-2 py-1 text-[9px] font-extrabold tracking-wide uppercase ${
                        roleColors[user.role]
                      }`}
                    >
                      {roleIcons[user.role]}
                      {user.role}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2.5 rounded-full border border-white/10 bg-[#0A1628]/90 px-5 py-3 text-xs font-bold text-white shadow-[0_4px_25px_rgba(0,0,0,0.3)] backdrop-blur-xl hover:border-cyan-500/30 hover:shadow-[0_4px_30px_rgba(0,245,255,0.15)] transition-all active:scale-95"
      >
        <span className={`flex h-2.5 w-2.5 rounded-full animate-pulse-slow ${
          activeUser.role === "STUDENT"
            ? "bg-cyan-400"
            : activeUser.role === "MENTOR"
            ? "bg-emerald-400"
            : "bg-purple-400"
        }`} />
        <span className="max-w-[120px] truncate">{activeUser.name}</span>
        <span className="text-slate-500">({activeUser.role})</span>
        <ChevronUp size={14} className={`text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
    </div>
  );
}
