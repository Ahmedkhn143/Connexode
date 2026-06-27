// app/dashboard/layout.tsx
// Shared dashboard shell — top bar + clean container
// Works for both student and ambassador roles

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, LogOut } from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) redirect("/auth/signin");

  const user = session.user as { name?: string; email?: string; role?: string };

  return (
    <div
      style={{ backgroundColor: "#040C18" }}
      className="min-h-screen"
    >
      {/* ── Top bar ── */}
      <header
        style={{
          backgroundColor: "#061020",
          borderBottom: "1px solid rgba(126,200,216,0.08)",
        }}
        className="fixed top-0 left-0 right-0 z-40"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span style={{ color: "#E8F4F8" }} className="text-sm font-bold">
              Conne<span style={{ color: "#7EC8D8" }}>x</span>ode
            </span>
          </Link>

          {/* Center — dashboard label */}
          <div className="flex items-center gap-2">
            <LayoutDashboard size={14} style={{ color: "rgba(126,200,216,0.4)" }} />
            <span
              style={{ color: "rgba(126,200,216,0.45)" }}
              className="text-xs font-medium uppercase tracking-widest"
            >
              {user.role === "AMBASSADOR" ? "Ambassador" : "Student"} Dashboard
            </span>
          </div>

          {/* Right — user + signout */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p style={{ color: "#E8F4F8" }} className="text-xs font-semibold">
                {user.name}
              </p>
              <p style={{ color: "rgba(126,200,216,0.35)" }} className="text-[10px]">
                {user.email}
              </p>
            </div>
            <Link
              href="/api/auth/signout"
              style={{
                border: "1px solid rgba(126,200,216,0.15)",
                color: "rgba(126,200,216,0.5)",
              }}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition-all hover:text-[#7EC8D8] hover:border-[rgba(126,200,216,0.35)]"
            >
              <LogOut size={12} /> Sign out
            </Link>
          </div>
        </div>
      </header>

      {/* ── Page content ── */}
      <main className="mx-auto max-w-6xl px-6 pt-24 pb-20">
        {children}
      </main>
    </div>
  );
}
