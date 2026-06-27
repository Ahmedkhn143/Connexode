// components/admin/ApplicationActions.tsx
// Client component — approve / reject / under-review buttons
// Calls /api/admin/applications/[id]/status

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle, Eye, Loader2 } from "lucide-react";

type Props = {
  applicationId: string;
  currentStatus: string;
  applicantEmail: string;
  applicantName: string;
  applicationType: "AMBASSADOR" | "INTERNSHIP";
};

export function ApplicationActions({
  applicationId,
  currentStatus,
  applicantEmail,
  applicantName,
  applicationType,
}: Props) {
  const router  = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [done, setDone]       = useState<string | null>(null);
  const [error, setError]     = useState("");

  async function updateStatus(status: string) {
    setLoading(status);
    setError("");

    try {
      const res = await fetch(`/api/admin/applications/${applicationId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          applicantEmail,
          applicantName,
          applicationType: applicationType.toLowerCase(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Update failed. Try again.");
      } else {
        setDone(status);
        router.refresh();
      }
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(null);
    }
  }

  if (currentStatus === "APPROVED" || done === "APPROVED") {
    return (
      <div
        style={{
          backgroundColor: "rgba(52,211,153,0.08)",
          border: "1px solid rgba(52,211,153,0.25)",
          color: "#34D399",
        }}
        className="flex items-center gap-2 rounded-xl px-5 py-4 text-sm font-semibold"
      >
        <CheckCircle size={16} strokeWidth={2} />
        Application approved — confirmation email sent to applicant
      </div>
    );
  }

  if (currentStatus === "REJECTED" || done === "REJECTED") {
    return (
      <div
        style={{
          backgroundColor: "rgba(248,113,113,0.08)",
          border: "1px solid rgba(248,113,113,0.25)",
          color: "#F87171",
        }}
        className="flex items-center gap-2 rounded-xl px-5 py-4 text-sm font-semibold"
      >
        <XCircle size={16} strokeWidth={2} />
        Application rejected — applicant notified
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#082038",
        border: "1px solid rgba(126,200,216,0.1)",
      }}
      className="rounded-xl p-6"
    >
      <p style={{ color: "#E8F4F8" }} className="mb-1.5 text-sm font-semibold">
        Take action
      </p>
      <p style={{ color: "rgba(126,200,216,0.4)" }} className="mb-6 text-xs leading-relaxed">
        Approving will unlock the applicant&apos;s dashboard and send them a
        confirmation email. Rejecting will notify them politely.
      </p>

      {error && (
        <p style={{ color: "#FCA5A5" }} className="mb-4 text-xs">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        {/* Approve */}
        <button
          onClick={() => updateStatus("APPROVED")}
          disabled={!!loading}
          style={{
            backgroundColor: loading === "APPROVED" ? "rgba(52,211,153,0.4)" : "rgba(52,211,153,0.15)",
            border: "1px solid rgba(52,211,153,0.35)",
            color: "#34D399",
          }}
          className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:bg-[rgba(52,211,153,0.25)] disabled:cursor-not-allowed"
        >
          {loading === "APPROVED" ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <CheckCircle size={14} strokeWidth={2} />
          )}
          Approve
        </button>

        {/* Under review */}
        {currentStatus === "PENDING" && (
          <button
            onClick={() => updateStatus("UNDER_REVIEW")}
            disabled={!!loading}
            style={{
              backgroundColor: "rgba(126,200,216,0.08)",
              border: "1px solid rgba(126,200,216,0.2)",
              color: "#7EC8D8",
            }}
            className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all hover:bg-[rgba(126,200,216,0.15)] disabled:cursor-not-allowed"
          >
            {loading === "UNDER_REVIEW" ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Eye size={14} />
            )}
            Mark under review
          </button>
        )}

        {/* Reject */}
        <button
          onClick={() => updateStatus("REJECTED")}
          disabled={!!loading}
          style={{
            backgroundColor: "rgba(248,113,113,0.08)",
            border: "1px solid rgba(248,113,113,0.2)",
            color: "#F87171",
          }}
          className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all hover:bg-[rgba(248,113,113,0.15)] disabled:cursor-not-allowed"
        >
          {loading === "REJECTED" ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <XCircle size={14} />
          )}
          Reject
        </button>
      </div>
    </div>
  );
}
