// app/admin/applications/page.tsx
// All applications — filterable by type + status
// Server component — reads from Prisma directly

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ArrowRight, Filter } from "lucide-react";

export const dynamic = "force-dynamic";

const statusConfig = {
  PENDING:      { color: "#F59E0B", bg: "rgba(245,158,11,0.12)",  border: "rgba(245,158,11,0.3)",  label: "Pending"      },
  UNDER_REVIEW: { color: "#7EC8D8", bg: "rgba(126,200,216,0.12)", border: "rgba(126,200,216,0.25)", label: "Under Review" },
  APPROVED:     { color: "#34D399", bg: "rgba(52,211,153,0.12)",  border: "rgba(52,211,153,0.25)",  label: "Approved"     },
  REJECTED:     { color: "#F87171", bg: "rgba(248,113,113,0.12)", border: "rgba(248,113,113,0.25)", label: "Rejected"     },
};

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: { type?: string; status?: string };
}) {
  const typeFilter   = searchParams.type   as "AMBASSADOR" | "INTERNSHIP" | undefined;
  const statusFilter = searchParams.status as keyof typeof statusConfig | undefined;

  const applications = await prisma.application.findMany({
    where: {
      ...(typeFilter   ? { type:   typeFilter   } : {}),
      ...(statusFilter ? { status: statusFilter } : {}),
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true, fullName: true, email: true, type: true,
      status: true, university: true, track: true,
      createdAt: true, city: true,
    },
  });

  const typeFilters   = ["All", "AMBASSADOR", "INTERNSHIP"];
  const statusFilters = ["All", "PENDING", "UNDER_REVIEW", "APPROVED", "REJECTED"];

  return (
    <div className="px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 style={{ color: "#E8F4F8" }} className="text-2xl font-bold">
          Applications
        </h1>
        <p style={{ color: "rgba(126,200,216,0.45)" }} className="mt-1 text-sm">
          {applications.length} result{applications.length !== 1 ? "s" : ""}
          {typeFilter ? ` · ${typeFilter}` : ""}
          {statusFilter ? ` · ${statusFilter}` : ""}
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-6">
        {/* Type filter */}
        <div>
          <p style={{ color: "rgba(126,200,216,0.35)" }} className="mb-2 text-[10px] font-semibold uppercase tracking-widest">
            Type
          </p>
          <div className="flex gap-2">
            {typeFilters.map((t) => {
              const active = t === "All" ? !typeFilter : typeFilter === t;
              const href = t === "All"
                ? `/admin/applications${statusFilter ? `?status=${statusFilter}` : ""}`
                : `/admin/applications?type=${t}${statusFilter ? `&status=${statusFilter}` : ""}`;
              return (
                <Link
                  key={t}
                  href={href}
                  style={{
                    backgroundColor: active ? "#188080" : "#082038",
                    border: `1px solid ${active ? "#188080" : "rgba(126,200,216,0.12)"}`,
                    color: active ? "#E8F4F8" : "rgba(126,200,216,0.5)",
                  }}
                  className="rounded-full px-3 py-1.5 text-xs font-medium transition-all hover:border-[rgba(126,200,216,0.35)]"
                >
                  {t === "AMBASSADOR" ? "Ambassador" : t === "INTERNSHIP" ? "Internship" : t}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Status filter */}
        <div>
          <p style={{ color: "rgba(126,200,216,0.35)" }} className="mb-2 text-[10px] font-semibold uppercase tracking-widest">
            Status
          </p>
          <div className="flex flex-wrap gap-2">
            {statusFilters.map((s) => {
              const active = s === "All" ? !statusFilter : statusFilter === s;
              const sc = s !== "All" ? statusConfig[s as keyof typeof statusConfig] : null;
              const href = s === "All"
                ? `/admin/applications${typeFilter ? `?type=${typeFilter}` : ""}`
                : `/admin/applications?status=${s}${typeFilter ? `&type=${typeFilter}` : ""}`;
              return (
                <Link
                  key={s}
                  href={href}
                  style={{
                    backgroundColor: active && sc ? sc.bg : active ? "#188080" : "#082038",
                    border: `1px solid ${active && sc ? sc.border : active ? "#188080" : "rgba(126,200,216,0.12)"}`,
                    color: active && sc ? sc.color : active ? "#E8F4F8" : "rgba(126,200,216,0.5)",
                  }}
                  className="rounded-full px-3 py-1.5 text-xs font-medium transition-all"
                >
                  {s === "UNDER_REVIEW" ? "Under Review" : s === "All" ? s : s.charAt(0) + s.slice(1).toLowerCase()}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Applications table */}
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
            display: "grid",
            gridTemplateColumns: "1fr 110px 140px 100px 80px",
          }}
          className="px-5 py-3"
        >
          {["Applicant", "Type", "University", "Status", "Action"].map((h) => (
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
        {applications.length === 0 ? (
          <div className="py-14 text-center">
            <Filter size={24} style={{ color: "rgba(126,200,216,0.15)" }} className="mx-auto mb-3" />
            <p style={{ color: "rgba(126,200,216,0.3)" }} className="text-sm">
              No applications match this filter
            </p>
          </div>
        ) : (
          applications.map((app, i) => {
            const sc = statusConfig[app.status as keyof typeof statusConfig] ?? statusConfig.PENDING;
            const date = new Date(app.createdAt).toLocaleDateString("en-GB", {
              day: "numeric", month: "short",
            });

            return (
              <div
                key={app.id}
                style={{
                  borderBottom: i < applications.length - 1 ? "1px solid rgba(126,200,216,0.06)" : "none",
                  display: "grid",
                  gridTemplateColumns: "1fr 110px 140px 100px 80px",
                }}
                className="items-center px-5 py-4 transition-colors hover:bg-[rgba(8,32,56,0.4)]"
              >
                {/* Name + email */}
                <div>
                  <p style={{ color: "#E8F4F8" }} className="truncate text-sm font-semibold">
                    {app.fullName}
                  </p>
                  <p style={{ color: "rgba(126,200,216,0.35)" }} className="truncate text-xs">
                    {app.email} · {date}
                  </p>
                </div>

                {/* Type */}
                <span
                  style={{
                    color: app.type === "AMBASSADOR" ? "#7EC8D8" : "#A78BFA",
                    backgroundColor: app.type === "AMBASSADOR"
                      ? "rgba(126,200,216,0.08)" : "rgba(167,139,250,0.08)",
                    border: `1px solid ${app.type === "AMBASSADOR"
                      ? "rgba(126,200,216,0.15)" : "rgba(167,139,250,0.15)"}`,
                  }}
                  className="inline-block rounded-full px-2 py-0.5 text-[10px] font-medium"
                >
                  {app.type === "AMBASSADOR" ? "Ambassador" : app.track ?? "Internship"}
                </span>

                {/* University */}
                <p style={{ color: "rgba(126,200,216,0.5)" }} className="truncate text-xs">
                  {app.university}
                </p>

                {/* Status */}
                <span
                  style={{
                    color: sc.color, backgroundColor: sc.bg,
                    border: `1px solid ${sc.border}`,
                  }}
                  className="inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold"
                >
                  {sc.label}
                </span>

                {/* Action */}
                <Link
                  href={`/admin/applications/${app.id}`}
                  style={{ color: "rgba(126,200,216,0.5)" }}
                  className="flex items-center gap-1 text-xs font-medium transition-colors hover:text-[#7EC8D8]"
                >
                  Review <ArrowRight size={11} />
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
