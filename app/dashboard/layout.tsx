// app/dashboard/layout.tsx
// Shared dashboard shell — top bar + clean container
// Works for both student and ambassador roles
// Supports both NextAuth (real DB) and mock-auth (localStorage) sessions

import Link from "next/link";
import { LayoutDashboard, LogOut } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { auth } from "@/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // NextAuth session check (real DB users)
  const session = await auth();
  const user = session?.user as { name?: string; email?: string; role?: string } | undefined;

  // Note: Mock-auth users (localStorage) don't have a NextAuth session.
  // The dashboard page.tsx itself handles mock-auth via getActiveUser().
  // We only force-redirect if we are SURE there's no session at all —
  // for mock-auth users, we let the page-level check handle it.
  // We can't read localStorage on the server, so we allow through here
  // and let the client-side page redirect if needed.

  // Admin / Mentor use their own dashboards but can still access /dashboard shell
  if (user?.role === "MENTOR" || user?.role === "ADMIN") {
    return <>{children}</>;
  }

  // Determine display name: NextAuth session name, or empty (mock-auth fills it client-side)
  const displayName = user?.name ?? "";
  const displayEmail = user?.email ?? "";
  const displayRole = user?.role ?? "STUDENT";

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
            <Logo size="sm" />
          </Link>

          {/* Center — dashboard label */}
          <div className="flex items-center gap-2">
            <LayoutDashboard size={14} style={{ color: "rgba(126,200,216,0.4)" }} />
            <span
              style={{ color: "rgba(126,200,216,0.45)" }}
              className="text-xs font-medium uppercase tracking-widest"
            >
              {displayRole === "AMBASSADOR" ? "Ambassador" : displayRole === "MENTOR" ? "Mentor" : "Student"} Dashboard
            </span>
          </div>

          {/* Right — user + signout */}
          <div className="flex items-center gap-4">
            {displayName && (
              <div className="hidden sm:block text-right">
                <p style={{ color: "#E8F4F8" }} className="text-xs font-semibold">
                  {displayName}
                </p>
                <p style={{ color: "rgba(126,200,216,0.35)" }} className="text-[10px]">
                  {displayEmail}
                </p>
              </div>
            )}
            <Link
              href="/register"
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
