import type { Metadata } from "next";
import DashboardSidebar from "@/components/layout/DashboardSidebar";

export const metadata: Metadata = {
  title: "Dashboard — Connexode",
  description: "Your Connexode student dashboard. Track progress, complete daily tasks, and submit your work.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
              Full Stack Web Dev — Week 1
            </h1>
            <p className="text-xs text-slate-600">Track your daily progress below</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-teal-600 text-xs font-bold text-[#020B18]">
              AJ
            </div>
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
