// app/dashboard/layout.tsx
// Shared dashboard shell — top bar + clean container
// Works for both student and ambassador roles
// Supports mock-auth (localStorage) sessions — user info filled client-side by page.tsx

import Link from "next/link";
import { LayoutDashboard, LogOut } from "lucide-react";
import Logo from "@/components/ui/Logo";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Note: This layout is server-rendered but auth-free.
  // Mock-auth users (localStorage) have their session read client-side by page.tsx.
  // We cannot read localStorage on the server, so we allow all users through here
  // and let the client-side page redirect if needed.

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
              Dashboard
            </span>
          </div>

          {/* Right — sign out link */}
          <div className="flex items-center gap-4">
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
