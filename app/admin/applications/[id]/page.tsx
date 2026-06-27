// app/admin/applications/[id]/page.tsx
// Single application detail + approve / reject / under-review actions

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ApplicationActions } from "@/components/admin/ApplicationActions";

export default async function ApplicationDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const app = await prisma.application.findUnique({
    where: { id: params.id },
  });

  if (!app) notFound();

  const fields =
    app.type === "AMBASSADOR"
      ? [
          { label: "Full name",     value: app.fullName    },
          { label: "Email",         value: app.email       },
          { label: "University",    value: app.university  },
          { label: "Semester",      value: app.semester    },
          { label: "City",          value: app.city        },
          { label: "Instagram",     value: app.instagram ?? "—" },
          { label: "LinkedIn",      value: app.linkedin  ?? "—" },
          { label: "Availability",  value: app.availability ?? "—" },
          { label: "Why join",      value: app.whyJoin,  full: true },
        ]
      : [
          { label: "Full name",     value: app.fullName    },
          { label: "Email",         value: app.email       },
          { label: "University",    value: app.university  },
          { label: "Semester",      value: app.semester    },
          { label: "City",          value: app.city        },
          { label: "Track",         value: app.track ?? "—" },
          { label: "Experience",    value: app.experience ?? "—" },
          { label: "GitHub",        value: app.github    ?? "—" },
          { label: "Portfolio",     value: app.portfolio ?? "—" },
          { label: "Why join",      value: app.whyJoin,  full: true },
        ];

  const statusConfig = {
    PENDING:      { color: "#F59E0B", label: "Pending"      },
    UNDER_REVIEW: { color: "#7EC8D8", label: "Under Review" },
    APPROVED:     { color: "#34D399", label: "Approved"     },
    REJECTED:     { color: "#F87171", label: "Rejected"     },
  };
  const sc = statusConfig[app.status as keyof typeof statusConfig] ?? statusConfig.PENDING;

  return (
    <div className="px-8 py-8 max-w-3xl">
      {/* Back */}
      <Link
        href="/admin/applications"
        style={{ color: "rgba(126,200,216,0.45)" }}
        className="mb-6 inline-flex items-center gap-1.5 text-sm transition-colors hover:text-[#7EC8D8]"
      >
        <ArrowLeft size={14} /> All applications
      </Link>

      {/* Header */}
      <div className="mb-7 flex items-start justify-between">
        <div>
          <h1 style={{ color: "#E8F4F8" }} className="text-2xl font-bold">
            {app.fullName}
          </h1>
          <div className="mt-2 flex items-center gap-3">
            <span
              style={{
                color: app.type === "AMBASSADOR" ? "#7EC8D8" : "#A78BFA",
                backgroundColor: app.type === "AMBASSADOR"
                  ? "rgba(126,200,216,0.1)" : "rgba(167,139,250,0.1)",
                border: `1px solid ${app.type === "AMBASSADOR"
                  ? "rgba(126,200,216,0.2)" : "rgba(167,139,250,0.2)"}`,
              }}
              className="rounded-full px-2.5 py-0.5 text-xs font-medium"
            >
              {app.type === "AMBASSADOR" ? "Ambassador Program" : `Internship · ${app.track ?? "General"}`}
            </span>
            <span style={{ color: sc.color }} className="text-xs font-semibold">
              {sc.label}
            </span>
            <span style={{ color: "rgba(126,200,216,0.3)" }} className="text-xs">
              Applied {new Date(app.createdAt).toLocaleDateString("en-GB", {
                day: "numeric", month: "long", year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Application fields */}
      <div
        style={{
          backgroundColor: "#082038",
          border: "1px solid rgba(126,200,216,0.1)",
        }}
        className="mb-6 overflow-hidden rounded-xl"
      >
        {fields.map((field, i) => (
          <div
            key={field.label}
            style={{
              borderBottom:
                i < fields.length - 1
                  ? "1px solid rgba(126,200,216,0.06)"
                  : "none",
              display: field.full ? "block" : "grid",
              gridTemplateColumns: field.full ? undefined : "140px 1fr",
            }}
            className="px-6 py-4"
          >
            <span
              style={{ color: "rgba(126,200,216,0.4)" }}
              className="text-xs font-medium"
            >
              {field.label}
            </span>
            <span
              style={{ color: "#E8F4F8" }}
              className={`text-sm leading-relaxed ${field.full ? "mt-2 block" : ""}`}
            >
              {field.value}
            </span>
          </div>
        ))}
      </div>

      {/* Action buttons — client component */}
      <ApplicationActions
        applicationId={app.id}
        currentStatus={app.status}
        applicantEmail={app.email}
        applicantName={app.fullName}
        applicationType={app.type as "AMBASSADOR" | "INTERNSHIP"}
      />
    </div>
  );
}
