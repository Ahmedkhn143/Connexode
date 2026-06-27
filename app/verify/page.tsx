// app/verify/page.tsx
// Certificate Verification — public page
// Anyone can verify a Connexode certificate by ID or email
// Colors: Navy #082038 · Teal #188080 · Cyan #7EC8D8

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  CheckCircle,
  XCircle,
  Shield,
  Award,
  Calendar,
  BookOpen,
  Users,
  ArrowRight,
} from "lucide-react";

type VerifyResult = {
  found: boolean;
  valid?: boolean;
  data?: {
    id: string;
    holderName: string;
    type: "AMBASSADOR" | "INTERNSHIP";
    track?: string;
    issuedAt: string;
    status: "ACTIVE" | "REVOKED";
  };
};

export default function VerifyPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    setResult(null);

    try {
      const res = await fetch(`/api/verify?q=${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ found: false });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{ backgroundColor: "#040C18" }}
      className="min-h-screen pt-24 pb-20 antialiased"
    >
      {/* ── Hero ── */}
      <section className="mx-auto max-w-3xl px-6 py-14 text-center">
        <span
          style={{
            border: "1px solid rgba(126,200,216,0.2)",
            color: "#7EC8D8",
            backgroundColor: "rgba(8,32,56,0.6)",
          }}
          className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-widest"
        >
          <Shield size={11} /> Certificate Verification
        </span>
        <h1
          style={{ color: "#E8F4F8" }}
          className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl"
        >
          Verify a Connexode
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #7EC8D8 0%, #188080 60%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            certificate
          </span>
        </h1>
        <p
          style={{ color: "rgba(126,200,216,0.5)" }}
          className="mx-auto max-w-xl text-base leading-relaxed"
        >
          Enter a certificate ID to confirm it is real, who it belongs to,
          and whether it is currently active. Every Connexode certificate has
          a unique ID printed on it.
        </p>
      </section>

      {/* ── Search box ── */}
      <section className="mx-auto max-w-xl px-6 pb-10">
        <form onSubmit={handleVerify}>
          <div
            style={{
              backgroundColor: "#082038",
              border: "1px solid rgba(126,200,216,0.15)",
            }}
            className="flex items-center gap-3 rounded-2xl px-5 py-3 transition-all focus-within:border-[rgba(126,200,216,0.45)]"
          >
            <Search size={18} style={{ color: "rgba(126,200,216,0.4)", flexShrink: 0 }} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter certificate ID  (e.g. CX-2025-A-00042)"
              style={{
                backgroundColor: "transparent",
                color: "#E8F4F8",
                outline: "none",
                flex: 1,
              }}
              className="text-sm placeholder:text-[rgba(126,200,216,0.25)]"
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              style={{
                backgroundColor:
                  loading || !query.trim()
                    ? "rgba(24,128,128,0.4)"
                    : "#188080",
                color: "#E8F4F8",
                flexShrink: 0,
              }}
              className="rounded-full px-4 py-2 text-xs font-semibold transition-all hover:brightness-110 disabled:cursor-not-allowed"
            >
              {loading ? "Checking..." : "Verify"}
            </button>
          </div>
          <p
            style={{ color: "rgba(126,200,216,0.25)" }}
            className="mt-2 text-center text-xs"
          >
            You can also search by the certificate holder&apos;s email address
          </p>
        </form>
      </section>

      {/* ── Result ── */}
      {searched && !loading && result && (
        <section className="mx-auto max-w-xl px-6 pb-16">

          {/* Not found */}
          {!result.found && (
            <div
              style={{
                backgroundColor: "#082038",
                border: "1px solid rgba(239,68,68,0.25)",
              }}
              className="rounded-2xl p-8 text-center"
            >
              <div
                style={{
                  backgroundColor: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.25)",
                }}
                className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full"
              >
                <XCircle size={24} style={{ color: "#EF4444" }} strokeWidth={1.5} />
              </div>
              <h2 style={{ color: "#E8F4F8" }} className="mb-2 text-lg font-bold">
                Certificate not found
              </h2>
              <p
                style={{ color: "rgba(126,200,216,0.45)" }}
                className="text-sm leading-relaxed"
              >
                No certificate matches &quot;{query}&quot;. Double-check the
                ID on the certificate — it should start with{" "}
                <strong style={{ color: "#7EC8D8" }}>CX-</strong> and include
                the year and type.
              </p>
            </div>
          )}

          {/* Found — Revoked */}
          {result.found && result.data?.status === "REVOKED" && (
            <div
              style={{
                backgroundColor: "#082038",
                border: "1px solid rgba(239,68,68,0.25)",
              }}
              className="rounded-2xl p-8 text-center"
            >
              <div
                style={{
                  backgroundColor: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.25)",
                }}
                className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full"
              >
                <XCircle size={24} style={{ color: "#EF4444" }} strokeWidth={1.5} />
              </div>
              <h2 style={{ color: "#E8F4F8" }} className="mb-2 text-lg font-bold">
                Certificate revoked
              </h2>
              <p
                style={{ color: "rgba(126,200,216,0.45)" }}
                className="mb-6 text-sm leading-relaxed"
              >
                This certificate was found but has been revoked and is no
                longer valid. Contact us if you believe this is an error.
              </p>
              <CertificateCard data={result.data!} revoked />
            </div>
          )}

          {/* Found — Valid */}
          {result.found && result.data?.status === "ACTIVE" && (
            <div
              style={{
                backgroundColor: "#082038",
                border: "1px solid rgba(24,128,128,0.35)",
              }}
              className="overflow-hidden rounded-2xl"
            >
              {/* Green top bar */}
              <div style={{ backgroundColor: "#188080", height: 4 }} />

              <div className="p-8">
                {/* Valid badge */}
                <div className="mb-6 flex items-center justify-center">
                  <div
                    style={{
                      backgroundColor: "rgba(24,128,128,0.15)",
                      border: "1px solid rgba(24,128,128,0.35)",
                    }}
                    className="flex items-center gap-2 rounded-full px-4 py-2"
                  >
                    <CheckCircle
                      size={15}
                      style={{ color: "#7EC8D8" }}
                      strokeWidth={2}
                    />
                    <span
                      style={{ color: "#7EC8D8" }}
                      className="text-sm font-semibold"
                    >
                      Valid certificate
                    </span>
                  </div>
                </div>

                <CertificateCard data={result.data!} />

                <div
                  style={{ borderTop: "1px solid rgba(126,200,216,0.08)" }}
                  className="mt-6 pt-5 text-center"
                >
                  <p
                    style={{ color: "rgba(126,200,216,0.3)" }}
                    className="text-xs"
                  >
                    This certificate was issued by Connexode and is
                    cryptographically unique. Certificate ID:{" "}
                    <strong style={{ color: "rgba(126,200,216,0.5)" }}>
                      {result.data!.id}
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ── How it works ── */}
      {!searched && (
        <section className="mx-auto max-w-3xl px-6 pb-16">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                icon: <Award size={18} strokeWidth={1.5} />,
                title: "Unique ID per certificate",
                desc: "Every certificate issued by Connexode has a unique ID printed on it — format: CX-YEAR-TYPE-NUMBER",
              },
              {
                icon: <Shield size={18} strokeWidth={1.5} />,
                title: "Employer verification",
                desc: "Employers and universities can verify any certificate here in seconds — no account needed.",
              },
              {
                icon: <CheckCircle size={18} strokeWidth={1.5} />,
                title: "Active or revoked",
                desc: "The system shows whether a certificate is currently active or has been revoked.",
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  backgroundColor: "#082038",
                  border: "1px solid rgba(126,200,216,0.1)",
                }}
                className="rounded-xl p-5"
              >
                <span
                  style={{
                    backgroundColor: "rgba(24,128,128,0.15)",
                    color: "#7EC8D8",
                  }}
                  className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg"
                >
                  {item.icon}
                </span>
                <p
                  style={{ color: "#E8F4F8" }}
                  className="mb-1.5 text-sm font-semibold"
                >
                  {item.title}
                </p>
                <p
                  style={{ color: "rgba(126,200,216,0.45)" }}
                  className="text-xs leading-relaxed"
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="mx-auto max-w-3xl px-6 text-center">
        <p style={{ color: "rgba(126,200,216,0.35)" }} className="mb-4 text-sm">
          Want to earn a Connexode certificate?
        </p>
        <Link
          href="/join"
          style={{ backgroundColor: "#188080", color: "#E8F4F8" }}
          className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-all hover:brightness-110 active:scale-95"
        >
          Join Connexode <ArrowRight size={14} />
        </Link>
      </section>
    </main>
  );
}

// ── Certificate card ──────────────────────────────────────────────────────────
function CertificateCard({
  data,
  revoked = false,
}: {
  data: NonNullable<VerifyResult["data"]>;
  revoked?: boolean;
}) {
  const isAmb = data.type === "AMBASSADOR";
  const issued = new Date(data.issuedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      style={{
        backgroundColor: "rgba(4,12,24,0.6)",
        border: "1px solid rgba(126,200,216,0.1)",
      }}
      className="rounded-xl p-6 space-y-4"
    >
      {/* Header row */}
      <div className="flex items-center gap-3">
        <span
          style={{
            backgroundColor: isAmb
              ? "rgba(126,200,216,0.12)"
              : "rgba(24,128,128,0.15)",
            border: `1px solid ${isAmb ? "rgba(126,200,216,0.25)" : "rgba(24,128,128,0.3)"}`,
            color: "#7EC8D8",
          }}
          className="flex h-10 w-10 items-center justify-center rounded-xl"
        >
          {isAmb ? (
            <Users size={18} strokeWidth={1.5} />
          ) : (
            <BookOpen size={18} strokeWidth={1.5} />
          )}
        </span>
        <div>
          <p style={{ color: "#E8F4F8" }} className="text-sm font-bold">
            {isAmb ? "Ambassador Certificate" : "Internship Certificate"}
          </p>
          <p style={{ color: "rgba(126,200,216,0.4)" }} className="text-xs">
            Connexode · Campus Talent Network
          </p>
        </div>
      </div>

      {/* Details */}
      {[
        { icon: <Award size={13} />, label: "Certificate holder", value: data.holderName },
        { icon: <BookOpen size={13} />, label: "Program", value: isAmb ? "Campus Ambassador Program" : `Internship — ${data.track ?? "General"}` },
        { icon: <Calendar size={13} />, label: "Issued on", value: issued },
        { icon: <Shield size={13} />, label: "Status", value: revoked ? "Revoked" : "Active", highlight: !revoked },
      ].map((row) => (
        <div
          key={row.label}
          style={{ borderTop: "1px solid rgba(126,200,216,0.06)" }}
          className="flex items-center justify-between pt-3"
        >
          <div className="flex items-center gap-2">
            <span style={{ color: "rgba(126,200,216,0.35)" }}>{row.icon}</span>
            <span style={{ color: "rgba(126,200,216,0.45)" }} className="text-xs">
              {row.label}
            </span>
          </div>
          <span
            style={{
              color: row.highlight ? "#7EC8D8" : revoked && row.label === "Status" ? "#EF4444" : "#E8F4F8",
              fontWeight: 600,
            }}
            className="text-sm"
          >
            {row.value}
          </span>
        </div>
      ))}
    </div>
  );
}
