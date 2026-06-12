"use client";

import { useState, useEffect } from "react";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import { getActiveUser, type User } from "@/lib/mock-data";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeUser, setActiveUser] = useState<User | null>(null);

  useEffect(() => {
    const user = getActiveUser();
    if (!user) {
      window.location.href = "/register";
    } else {
      setActiveUser(user);
    }
  }, []);

  if (!activeUser) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#020B18] text-slate-400">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
      </div>
    );
  }

  // Admin and Mentor views don't need the student sidebar layout
  if (activeUser.role !== "STUDENT") {
    return <div className="min-h-screen bg-[#020B18]">{children}</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#020B18]">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-white/8 bg-[#020B18]/80 px-8 py-4 backdrop-blur-xl sticky top-0 z-10">
          <div>
            <h1 className="font-display text-sm font-semibold text-slate-300">
              Campus Ambassador Workspace
            </h1>
            <p className="text-xs text-slate-600">Manage your university campaigns</p>
          </div>
          <div className="flex items-center gap-3">
            {activeUser.avatarImage ? (
              <img
                src={activeUser.avatarImage}
                alt={activeUser.name}
                className="h-9 w-9 rounded-full object-cover border border-white/10"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-teal-600 text-xs font-bold text-[#020B18]">
                {activeUser.avatarInitials}
              </div>
            )}
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
