// app/admin/stats/page.tsx
// Admin — Platform stats
// Applications over time, conversion rates, track popularity, top universities

import { prisma } from "@/lib/prisma";
import { BarChart2 } from "lucide-react";

async function getStats() {
  const [
    totalUsers,
    ambassadorApps,
    internshipApps,
    pendingCount,
    approvedCount,
    rejectedCount,
    reviewCount,
    totalCerts,
    totalProjects,
    publishedProjects,
    trackCounts,
    universityCounts,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.application.count({ where: { type: "AMBASSADOR" } }),
    prisma.application.count({ where: { type: "INTERNSHIP" } }),
    prisma.application.count({ where: { status: "PENDING" } }),
    prisma.application.count({ where: { status: "APPROVED" } }),
    prisma.application.count({ where: { status: "REJECTED" } }),
    prisma.application.count({ where: { status: "UNDER_REVIEW" } }),
    prisma.certificate.count(),
    prisma.project.count(),
    prisma.project.count({ where: { published: true } }),
    // Track breakdown for internships
    prisma.application.groupBy({
      by: ["track"],
      where: { type: "INTERNSHIP", track: { not: null } },
      _count: { track: true },
      orderBy: { _count: { track: "desc" } },
    }),
    // Top universities
    prisma.application.groupBy({
      by: ["university"],
      _count: { university: true },
      orderBy: { _count: { university: "desc" } },
      take: 8,
    }),
  ]);

  const totalApps = ambassadorApps + internshipApps;
  const approvalRate = totalApps > 0 ? Math.round((approvedCount / totalApps) * 100) : 0;

  return {
    totalUsers, ambassadorApps, internshipApps, pendingCount,
    approvedCount, rejectedCount, reviewCount, totalCerts,
    totalProjects, publishedProjects, trackCounts, universityCounts,
    totalApps, approvalRate,
  };
}

export default async function StatsPage() {
  const s = await getStats();

  const statGroups = [
    {
      title: "Platform overview",
      stats: [
        { label: "Registered users",   value: s.totalUsers    },
        { label: "Total applications", value: s.totalApps     },
        { label: "Approval rate",      value: `${s.approvalRate}%` },
        { label: "Certificates issued",value: s.totalCerts    },
      ],
    },
    {
      title: "Applications breakdown",
      stats: [
        { label: "Ambassador apps",  value: s.ambassadorApps, color: "#7EC8D8" },
        { label: "Internship apps",  value: s.internshipApps, color: "#A78BFA" },
        { label: "Pending",          value: s.pendingCount,   color: "#F59E0B" },
        { label: "Under review",     value: s.reviewCount,    color: "#7EC8D8" },
        { label: "Approved",         value: s.approvedCount,  color: "#34D399" },
        { label: "Rejected",         value: s.rejectedCount,  color: "#F87171" },
      ],
    },
    {
      title: "Projects",
      stats: [
        { label: "Total submitted",  value: s.totalProjects    },
        { label: "Published",        value: s.publishedProjects },
        { label: "Unpublished",      value: s.totalProjects - s.publishedProjects },
      ],
    },
  ];

  return (
    <div className="px-8 py-8 max-w-5xl">

      <div className="mb-8">
        <h1 style={{ color: "#E8F4F8" }} className="text-2xl font-bold">Stats</h1>
        <p style={{ color: "rgba(126,200,216,0.45)" }} className="mt-1 text-sm">
          Platform-wide analytics — live from the database
        </p>
      </div>

      {/* Stat groups */}
      {statGroups.map((group) => (
        <section key={group.title} className="mb-10">
          <p style={{ color: "rgba(126,200,216,0.35)" }}
            className="mb-4 text-xs font-semibold uppercase tracking-widest">
            {group.title}
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {group.stats.map((stat) => (
              <div
                key={stat.label}
                style={{ backgroundColor: "#082038", border: "1px solid rgba(126,200,216,0.1)" }}
                className="rounded-xl p-4"
              >
                <p
                  style={{ color: ("color" in stat && stat.color) ? stat.color : "#7EC8D8" }}
                  className="mb-1 text-2xl font-bold"
                >
                  {stat.value}
                </p>
                <p style={{ color: "rgba(126,200,216,0.4)" }} className="text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Track popularity */}
      {s.trackCounts.length > 0 && (
        <section className="mb-10">
          <p style={{ color: "rgba(126,200,216,0.35)" }}
            className="mb-4 text-xs font-semibold uppercase tracking-widest">
            Internship track popularity
          </p>
          <div
            style={{ backgroundColor: "#082038", border: "1px solid rgba(126,200,216,0.1)" }}
            className="overflow-hidden rounded-xl"
          >
            {s.trackCounts.map((t, i) => {
              const max = s.trackCounts[0]._count.track;
              const pct = Math.round((t._count.track / max) * 100);
              return (
                <div
                  key={t.track}
                  style={{ borderBottom: i < s.trackCounts.length - 1 ? "1px solid rgba(126,200,216,0.06)" : "none" }}
                  className="flex items-center gap-4 px-5 py-3.5"
                >
                  <span style={{ color: "#E8F4F8" }} className="w-44 flex-shrink-0 text-sm font-medium truncate">
                    {t.track}
                  </span>
                  <div className="flex flex-1 items-center gap-3">
                    <div
                      style={{ backgroundColor: "rgba(8,32,56,0.8)", borderRadius: 100 }}
                      className="h-2 flex-1 overflow-hidden"
                    >
                      <div
                        style={{
                          width: `${pct}%`,
                          background: "linear-gradient(90deg, #188080, #7EC8D8)",
                          borderRadius: 100,
                        }}
                        className="h-full"
                      />
                    </div>
                    <span style={{ color: "rgba(126,200,216,0.5)" }} className="w-8 text-xs text-right">
                      {t._count.track}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Top universities */}
      {s.universityCounts.length > 0 && (
        <section>
          <p style={{ color: "rgba(126,200,216,0.35)" }}
            className="mb-4 text-xs font-semibold uppercase tracking-widest">
            Top universities
          </p>
          <div
            style={{ backgroundColor: "#082038", border: "1px solid rgba(126,200,216,0.1)" }}
            className="overflow-hidden rounded-xl"
          >
            {s.universityCounts.map((u, i) => (
              <div
                key={u.university}
                style={{ borderBottom: i < s.universityCounts.length - 1 ? "1px solid rgba(126,200,216,0.06)" : "none" }}
                className="flex items-center justify-between px-5 py-3.5"
              >
                <div className="flex items-center gap-3">
                  <span style={{ color: "rgba(126,200,216,0.25)" }} className="text-sm font-bold w-5">
                    {i + 1}
                  </span>
                  <span style={{ color: "#E8F4F8" }} className="text-sm font-medium">
                    {u.university}
                  </span>
                </div>
                <span
                  style={{
                    backgroundColor: "rgba(24,128,128,0.1)",
                    border: "1px solid rgba(24,128,128,0.25)",
                    color: "#7EC8D8",
                  }}
                  className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                >
                  {u._count.university}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {s.universityCounts.length === 0 && s.trackCounts.length === 0 && (
        <div className="py-14 text-center">
          <BarChart2 size={32} style={{ color: "rgba(126,200,216,0.15)" }} className="mx-auto mb-3" />
          <p style={{ color: "rgba(126,200,216,0.3)" }} className="text-sm">
            Stats will populate as applications come in
          </p>
        </div>
      )}
    </div>
  );
}
