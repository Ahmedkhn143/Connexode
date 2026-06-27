// app/admin/certificates/page.tsx
// Admin — Certificates management
// Issue certificates to approved interns/ambassadors, revoke if needed

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Award, ArrowRight } from "lucide-react";
import { IssueCertificateButton } from "@/components/admin/IssueCertificateButton";

export const dynamic = "force-dynamic";

async function getData() {
  const [certificates, eligibleUsers] = await Promise.all([
    // All issued certificates
    prisma.certificate.findMany({
      orderBy: { issuedAt: "desc" },
      include: { user: { select: { name: true, email: true } } },
    }),
    // Approved users who don't have a certificate yet
    prisma.application.findMany({
      where: {
        status: "APPROVED",
        user: { certificate: null },
      },
      include: { user: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: "desc" },
    }),
  ]);
  return { certificates, eligibleUsers };
}

export default async function CertificatesPage() {
  const { certificates, eligibleUsers } = await getData();

  return (
    <div className="px-8 py-8 max-w-5xl">

      {/* Header */}
      <div className="mb-8">
        <h1 style={{ color: "#E8F4F8" }} className="text-2xl font-bold">Certificates</h1>
        <p style={{ color: "rgba(126,200,216,0.45)" }} className="mt-1 text-sm">
          {certificates.length} issued · {eligibleUsers.length} eligible and waiting
        </p>
      </div>

      {/* Eligible — not yet issued */}
      {eligibleUsers.length > 0 && (
        <section className="mb-10">
          <p style={{ color: "#F59E0B" }} className="mb-4 text-xs font-semibold uppercase tracking-widest">
            ⏳ Approved — certificate not issued yet
          </p>
          <div className="space-y-3">
            {eligibleUsers.map((app) => (
              <div
                key={app.id}
                style={{
                  backgroundColor: "#082038",
                  border: "1px solid rgba(245,158,11,0.2)",
                }}
                className="flex items-center justify-between rounded-xl px-5 py-4"
              >
                <div>
                  <p style={{ color: "#E8F4F8" }} className="text-sm font-semibold">
                    {app.user?.name ?? app.fullName}
                  </p>
                  <p style={{ color: "rgba(126,200,216,0.4)" }} className="text-xs">
                    {app.email} · {app.type === "AMBASSADOR" ? "Ambassador Program" : `Internship — ${app.track ?? "General"}`}
                  </p>
                </div>
                {app.user && (
                  <IssueCertificateButton
                    userId={app.user.id}
                    applicationType={app.type as "AMBASSADOR" | "INTERNSHIP"}
                    track={app.track ?? undefined}
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Issued certificates */}
      <section>
        <p style={{ color: "rgba(126,200,216,0.35)" }} className="mb-4 text-xs font-semibold uppercase tracking-widest">
          All issued certificates
        </p>
        <div
          style={{ backgroundColor: "#082038", border: "1px solid rgba(126,200,216,0.1)" }}
          className="overflow-hidden rounded-xl"
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "rgba(4,12,24,0.4)",
              borderBottom: "1px solid rgba(126,200,216,0.08)",
              display: "grid",
              gridTemplateColumns: "1fr 120px 140px 100px 80px",
            }}
            className="px-5 py-3"
          >
            {["Holder", "Type", "Cert ID", "Issued", "Status"].map((h) => (
              <span key={h} style={{ color: "rgba(126,200,216,0.3)" }}
                className="text-[10px] font-semibold uppercase tracking-widest">{h}</span>
            ))}
          </div>

          {certificates.length === 0 ? (
            <div className="py-14 text-center">
              <Award size={24} style={{ color: "rgba(126,200,216,0.15)" }} className="mx-auto mb-3" />
              <p style={{ color: "rgba(126,200,216,0.3)" }} className="text-sm">No certificates issued yet</p>
            </div>
          ) : (
            certificates.map((cert, i) => (
              <div
                key={cert.id}
                style={{
                  borderBottom: i < certificates.length - 1 ? "1px solid rgba(126,200,216,0.06)" : "none",
                  display: "grid",
                  gridTemplateColumns: "1fr 120px 140px 100px 80px",
                }}
                className="items-center px-5 py-3.5 hover:bg-[rgba(8,32,56,0.4)]"
              >
                <div>
                  <p style={{ color: "#E8F4F8" }} className="text-sm font-semibold">{cert.user.name}</p>
                  <p style={{ color: "rgba(126,200,216,0.35)" }} className="text-xs">{cert.user.email}</p>
                </div>
                <span style={{ color: cert.type === "AMBASSADOR" ? "#7EC8D8" : "#A78BFA" }}
                  className="text-xs font-medium">
                  {cert.type === "AMBASSADOR" ? "Ambassador" : cert.track ?? "Internship"}
                </span>
                <span style={{ color: "rgba(126,200,216,0.5)" }} className="font-mono text-xs">{cert.certId}</span>
                <span style={{ color: "rgba(126,200,216,0.4)" }} className="text-xs">
                  {new Date(cert.issuedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </span>
                <span
                  style={{
                    color: cert.status === "ACTIVE" ? "#34D399" : "#F87171",
                    backgroundColor: cert.status === "ACTIVE" ? "rgba(52,211,153,0.1)" : "rgba(248,113,113,0.1)",
                    border: `1px solid ${cert.status === "ACTIVE" ? "rgba(52,211,153,0.25)" : "rgba(248,113,113,0.25)"}`,
                  }}
                  className="inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold"
                >
                  {cert.status}
                </span>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Verify link */}
      <div className="mt-6">
        <Link
          href="/verify"
          target="_blank"
          style={{ color: "rgba(126,200,216,0.45)" }}
          className="inline-flex items-center gap-1.5 text-xs transition-colors hover:text-[#7EC8D8]"
        >
          Public verification page <ArrowRight size={11} />
        </Link>
      </div>
    </div>
  );
}
