// app/admin/page.tsx
// Admin overview — stats + recent applications snapshot

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Users, BookOpen, Award, Clock, CheckCircle, XCircle, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

async function getStats() {
  const [
    totalAmbassadorApps,
    totalInternshipApps,
    pendingApps,
    approvedApps,
    rejectedApps,
    totalCerts,
    recentApps,
  ] = await Promise.all([
    prisma.application.count({ where: { type: "AMBASSADOR" } }),
    prisma.application.count({ where: { type: "INTERNSHIP" } }),
    prisma.application.count({ where: { status: "PENDING" } }),
    prisma.application.count({ where: { status: "APPROVED" } }),
    prisma.application.count({ where: { status: "REJECTED" } }),
    prisma.certificate.count(),
    prisma.application.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      select: {
        id: true, fullName: true, type: true,
        status: true, university: true, createdAt: true,
      },
    }),
  ]);

  return {
    totalAmbassadorApps, totalInternshipApps,
    pendingApps, approvedApps, rejectedApps,
    totalCerts, recentApps,
  };
}

const statusConfig = {
  PENDING:      { color: "#F59E0B", bg: "rgba(245,158,11,0.12)",  border: "rgba(245,158,11,0.3)",  label: "Pending"      },
  UNDER_REVIEW: { color: "#7EC8D8", bg: "rgba(126,200,216,0.12)", border: "rgba(126,200,216,0.25)", label: "Under Review" },
  APPROVED:     { color: "#34D399", bg: "rgba(52,211,153,0.12)",  border: "rgba(52,211,153,0.25)",  label: "Approved"     },
  REJECTED:     { color: "#F87171", bg: "rgba(248,113,113,0.12)", border: "rgba(248,113,113,0.25)", label: "Rejected"     },
};

export default async function AdminPage() {
  const stats = await getStats();

  const statCards = [
    { icon: <Users size={18} />,     label: "Ambassador Apps", value: stats.totalAmbassadorApps, href: "/admin/applications?type=AMBASSADOR", color: "#7EC8D8" },
    { icon: <BookOpen size={18} />,  label: "Internship Apps", value: stats.totalInternshipApps, href: "/admin/applications?type=INTERNSHIP", color: "#A78BFA" },
    { icon: <Clock size={18} />,     label: "Pending Review",  value: stats.pendingApps,         href: "/admin/applications?status=PENDING",  color: "#F59E0B" },
    { icon: <CheckCircle size={18} />,label: "Approved",       value: stats.approvedApps,        href: "/admin/applications?status=APPROVED", color: "#34D399" },
    { icon: <XCircle size={18} />,   label: "Rejected",        value: stats.rejectedApps,        href: "/admin/applications?status=REJECTED", color: "#F87171" },
    { icon: <Award size={18} />,     label: "Certificates",    value: stats.totalCerts,          href: "/admin/certificates",                 color: "#188080" },
  ];

  return (
    <div className="px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 style={{ color: "#E8F4F8" }} className="text-2xl font-bold">
          Overview
        </h1>
        <p style={{ color: "rgba(126,200,216,0.45)" }} className="mt-1 text-sm">
          All applications, approvals, and platform activity at a glance.
        </p>
      </div>

      {/* Stat cards */}
      <div className="mb-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            style={{
              backgroundColor: "#082038",
              border: "1px solid rgba(126,200,216,0.1)",
            }}
            className="group flex flex-col rounded-xl p-5 transition-all hover:border-[rgba(126,200,216,0.3)] hover:-translate-y-0.5"
          >
            <span
              style={{ backgroundColor: `${card.color}18`, color: card.color }}
              className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg"
            >
              {card.icon}
            </span>
            <span style={{ color: "#E8F4F8" }} className="text-2xl font-bold">
              {card.value}
            </span>
            <span style={{ color: "rgba(126,200,216,0.45)" }} className="mt-0.5 text-xs">
              {card.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Recent applications */}
      <div>
        <div className="mb-5 flex items-center justify-between">
          <h2 style={{ color: "#E8F4F8" }} className="text-base font-semibold">
            Recent applications
          </h2>
          <Link
            href="/admin/applications"
            style={{ color: "#7EC8D8" }}
            className="flex items-center gap-1 text-xs transition-colors hover:text-[#188080]"
          >
            View all <ArrowRight size={12} />
          </Link>
        </div>

        <div
          style={{
            backgroundColor: "#082038",
            border: "1px solid rgba(126,200,216,0.1)",
          }}
          className="overflow-hidden rounded-xl"
        >
          {/* Table header */}
          <div
            style={{
              backgroundColor: "rgba(4,12,24,0.4)",
              borderBottom: "1px solid rgba(126,200,216,0.08)",
              gridTemplateColumns: "1fr 120px 140px 100px",
            }}
            className="grid px-5 py-3"
          >
            {["Applicant", "Type", "University", "Status"].map((h) => (
              <span
                key={h}
                style={{ color: "rgba(126,200,216,0.3)" }}
                className="text-[10px] font-semibold uppercase tracking-widest"
              >
                {h}
              </span>
            ))}
          </div>

          {/* Rows */}
          {stats.recentApps.length === 0 ? (
            <div className="py-10 text-center">
              <p style={{ color: "rgba(126,200,216,0.3)" }} className="text-sm">
                No applications yet
              </p>
            </div>
          ) : (
            stats.recentApps.map((app, i) => {
              const sc = statusConfig[app.status as keyof typeof statusConfig] ?? statusConfig.PENDING;
              return (
                <Link
                  key={app.id}
                  href={`/admin/applications/${app.id}`}
                  style={{
                    borderBottom:
                      i < stats.recentApps.length - 1
                        ? "1px solid rgba(126,200,216,0.06)"
                        : "none",
                  }}
                  className="grid items-center px-5 py-3.5 transition-colors hover:bg-[rgba(8,32,56,0.5)]"
                >
                  <div style={{ gridTemplateColumns: "1fr 120px 140px 100px" } as React.CSSProperties}
                    className="grid items-center w-full">
                    {/* Name */}
                    <p style={{ color: "#E8F4F8" }} className="truncate text-sm font-medium">
                      {app.fullName}
                    </p>
                    {/* Type */}
                    <span
                      style={{
                        color: app.type === "AMBASSADOR" ? "#7EC8D8" : "#A78BFA",
                        backgroundColor: app.type === "AMBASSADOR"
                          ? "rgba(126,200,216,0.08)"
                          : "rgba(167,139,250,0.08)",
                        border: `1px solid ${app.type === "AMBASSADOR"
                          ? "rgba(126,200,216,0.15)"
                          : "rgba(167,139,250,0.15)"}`,
                      }}
                      className="inline-block rounded-full px-2 py-0.5 text-[10px] font-medium"
                    >
                      {app.type === "AMBASSADOR" ? "Ambassador" : "Internship"}
                    </span>
                    {/* University */}
                    <p style={{ color: "rgba(126,200,216,0.45)" }} className="truncate text-xs">
                      {app.university}
                    </p>
                    {/* Status */}
                    <span
                      style={{
                        color: sc.color,
                        backgroundColor: sc.bg,
                        border: `1px solid ${sc.border}`,
                      }}
                      className="inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold"
                    >
                      {sc.label}
                    </span>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
