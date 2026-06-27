// app/error.tsx
// Global error boundary — shown when any page throws an uncaught error
// Must be a client component (Next.js requirement)

"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home, AlertTriangle } from "lucide-react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    // Log to console in dev — replace with Sentry or similar in prod
    console.error("Global error:", error);
  }, [error]);

  return (
    <main
      style={{ backgroundColor: "#040C18" }}
      className="flex min-h-screen flex-col items-center justify-center px-6 antialiased"
    >
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 flex items-center justify-center"
      >
        <div
          style={{ backgroundColor: "rgba(239,68,68,0.05)" }}
          className="h-[500px] w-[700px] rounded-full blur-[130px]"
        />
      </div>

      <div className="relative text-center max-w-md">

        {/* Icon */}
        <div
          style={{
            backgroundColor: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.2)",
          }}
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
        >
          <AlertTriangle
            size={28}
            style={{ color: "#F87171" }}
            strokeWidth={1.5}
          />
        </div>

        {/* Divider */}
        <div
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(239,68,68,0.5), transparent)",
          }}
          className="mx-auto mb-6 h-px w-20"
        />

        <h1
          style={{ color: "#E8F4F8" }}
          className="mb-3 text-2xl font-bold"
        >
          Something went wrong
        </h1>
        <p
          style={{ color: "rgba(126,200,216,0.5)" }}
          className="mb-8 text-sm leading-relaxed"
        >
          An unexpected error occurred. This has been noted.
          Try refreshing the page — if the issue persists, contact us.
        </p>

        {/* Error digest (for debugging) */}
        {error.digest && (
          <p
            style={{
              backgroundColor: "rgba(8,32,56,0.6)",
              border: "1px solid rgba(126,200,216,0.1)",
              color: "rgba(126,200,216,0.3)",
            }}
            className="mx-auto mb-8 w-fit rounded-lg px-4 py-2 font-mono text-xs"
          >
            Error ID: {error.digest}
          </p>
        )}

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={reset}
            style={{ backgroundColor: "#188080", color: "#E8F4F8" }}
            className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all hover:brightness-110 active:scale-95"
          >
            <RefreshCw size={14} />
            Try again
          </button>
          <Link
            href="/"
            style={{
              border: "1px solid rgba(126,200,216,0.2)",
              color: "rgba(126,200,216,0.6)",
            }}
            className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all hover:text-[#7EC8D8]"
          >
            <Home size={14} />
            Go home
          </Link>
          <Link
            href="/contact"
            style={{ color: "rgba(126,200,216,0.35)" }}
            className="text-sm transition-colors hover:text-[#7EC8D8]"
          >
            Report this issue
          </Link>
        </div>
      </div>
    </main>
  );
}
