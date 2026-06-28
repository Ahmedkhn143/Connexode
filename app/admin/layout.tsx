// app/admin/layout.tsx
// Admin sidebar layout — wraps all /admin pages
// Auth check is handled client-side by each admin page via localStorage (mock-auth)

import Link from "next/link";
import Logo from "@/components/ui/Logo";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Award,
  FolderOpen,
  BarChart2,
  LogOut,
} from "lucide-react";

const sidebarLinks = [
  { icon: <LayoutDashboard size={16} />, label: "Overview",       href: "/admin" },
  { icon: <Users size={16} />,          label: "Ambassador Apps", href: "/admin/applications?type=AMBASSADOR" },
  { icon: <BookOpen size={16} />,       label: "Internship Apps", href: "/admin/applications?type=INTERNSHIP" },
  { icon: <Award size={16} />,          label: "Certificates",    href: "/admin/certificates" },
  { icon: <FolderOpen size={16} />,     label: "Projects",        href: "/admin/projects" },
  { icon: <BarChart2 size={16} />,      label: "Stats",           href: "/admin/stats" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Auth check is handled client-side by each admin page via localStorage.
  // We render the sidebar shell for all users here.

  return (
    <div
      style={{ backgroundColor: "#040C18" }}
      className="flex min-h-screen"
    >
      {/* ── Sidebar ── */}
      <aside
        style={{
          backgroundColor: "#061020",
          borderRight: "1px solid rgba(126,200,216,0.08)",
          width: "240px",
          flexShrink: 0,
        }}
        className="fixed left-0 top-0 bottom-0 flex flex-col z-40"
      >
        {/* Logo */}
        <div
          style={{ borderBottom: "1px solid rgba(126,200,216,0.08)" }}
          className="px-5 py-5"
        >
          <Link href="/admin" className="flex items-center gap-2">
            <Logo size="sm" />
          </Link>
          <span
            style={{
              backgroundColor: "rgba(24,128,128,0.15)",
              border: "1px solid rgba(24,128,128,0.3)",
              color: "#7EC8D8",
            }}
            className="mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
          >
            Admin Panel
          </span>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ color: "rgba(126,200,216,0.55)" }}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all hover:bg-[rgba(24,128,128,0.1)] hover:text-[#7EC8D8]"
            >
              <span style={{ color: "rgba(126,200,216,0.4)" }}>{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Bottom — sign out */}
        <div
          style={{ borderTop: "1px solid rgba(126,200,216,0.08)" }}
          className="px-4 py-4 space-y-3"
        >
          <div className="flex items-center gap-2.5">
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "rgba(24,128,128,0.2)",
                border: "1px solid rgba(24,128,128,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "#7EC8D8", fontSize: 14 }}>A</span>
            </div>
            <div className="min-w-0">
              <p style={{ color: "#E8F4F8" }} className="truncate text-xs font-semibold">
                Admin
              </p>
              <p style={{ color: "rgba(126,200,216,0.3)" }} className="text-[10px]">
                Administrator
              </p>
            </div>
          </div>
          <Link
            href="/register"
            style={{ color: "rgba(126,200,216,0.4)" }}
            className="flex items-center gap-2 text-xs transition-colors hover:text-[#7EC8D8]"
          >
            <LogOut size={13} /> Sign out
          </Link>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main
        style={{ marginLeft: "240px" }}
        className="flex-1 min-h-screen"
      >
        {children}
      </main>
    </div>
  );
}
