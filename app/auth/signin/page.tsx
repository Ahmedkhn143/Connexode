// app/auth/signin/page.tsx
// Custom sign in page
// Colors: Navy #082038 · Teal #188080 · Cyan #7EC8D8

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, LogIn } from "lucide-react";

const errorMessages: Record<string, string> = {
  CredentialsSignin: "Incorrect email or password. Please try again.",
  OAuthAccountNotLinked: "Please sign in with the same method you used to register.",
  default: "Something went wrong. Please try again.",
};

export default function SignInPage() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl  = searchParams.get("callbackUrl") ?? "/dashboard";
  const errorParam   = searchParams.get("error");

  const [form, setForm]         = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(
    errorParam ? (errorMessages[errorParam] ?? errorMessages.default) : ""
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email:    form.email.toLowerCase().trim(),
      password: form.password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError(errorMessages[result.error] ?? errorMessages.default);
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  }

  return (
    <main
      style={{ backgroundColor: "#040C18" }}
      className="flex min-h-screen items-center justify-center px-6 pt-24 pb-20 antialiased"
    >
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 flex items-center justify-center"
      >
        <div
          style={{ backgroundColor: "rgba(24,128,128,0.08)" }}
          className="h-[500px] w-[700px] rounded-full blur-[120px]"
        />
      </div>

      <div className="relative w-full max-w-md">

        {/* Header */}
        <div className="mb-8 text-center">
          <Link href="/" className="mb-6 inline-flex items-center gap-2">
            <span style={{ color: "#E8F4F8" }} className="text-xl font-bold">
              Conne<span style={{ color: "#7EC8D8" }}>x</span>ode
            </span>
          </Link>
          <h1 style={{ color: "#E8F4F8" }} className="mb-2 text-2xl font-bold">
            Welcome back
          </h1>
          <p style={{ color: "rgba(126,200,216,0.5)" }} className="text-sm">
            Sign in to access your dashboard
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            backgroundColor: "#082038",
            border: "1px solid rgba(126,200,216,0.12)",
          }}
          className="rounded-2xl p-8"
        >
          {/* Error */}
          {error && (
            <div
              style={{
                backgroundColor: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.25)",
                color: "#FCA5A5",
              }}
              className="mb-6 rounded-xl px-4 py-3 text-sm"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label
                style={{ color: "rgba(126,200,216,0.6)" }}
                className="mb-1.5 block text-xs font-medium"
              >
                Email address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                required
                autoComplete="email"
                style={{
                  backgroundColor: "#040C18",
                  border: "1px solid rgba(126,200,216,0.15)",
                  color: "#E8F4F8",
                }}
                className="w-full rounded-xl px-4 py-3 text-sm placeholder:text-[rgba(126,200,216,0.2)] outline-none focus:border-[rgba(126,200,216,0.45)] transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  style={{ color: "rgba(126,200,216,0.6)" }}
                  className="text-xs font-medium"
                >
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  style={{ color: "rgba(126,200,216,0.4)" }}
                  className="text-xs transition-colors hover:text-[#7EC8D8]"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  style={{
                    backgroundColor: "#040C18",
                    border: "1px solid rgba(126,200,216,0.15)",
                    color: "#E8F4F8",
                  }}
                  className="w-full rounded-xl px-4 py-3 pr-11 text-sm placeholder:text-[rgba(126,200,216,0.2)] outline-none focus:border-[rgba(126,200,216,0.45)] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  style={{ color: "rgba(126,200,216,0.35)" }}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors hover:text-[#7EC8D8]"
                  tabIndex={-1}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: loading ? "rgba(24,128,128,0.5)" : "#188080",
                color: "#E8F4F8",
              }}
              className="flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition-all hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div
                    style={{ borderTopColor: "#E8F4F8", borderColor: "rgba(255,255,255,0.2)" }}
                    className="h-4 w-4 animate-spin rounded-full border-2"
                  />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn size={15} />
                  Sign in
                </>
              )}
            </button>
          </form>
        </div>

        {/* Sign up link */}
        <p
          style={{ color: "rgba(126,200,216,0.4)" }}
          className="mt-6 text-center text-sm"
        >
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            style={{ color: "#7EC8D8" }}
            className="font-medium transition-colors hover:text-[#188080]"
          >
            Create one
          </Link>
        </p>

        <p
          style={{ color: "rgba(126,200,216,0.25)" }}
          className="mt-3 text-center text-xs"
        >
          Applied for Ambassador or Internship?{" "}
          <Link
            href="/auth/signup"
            style={{ color: "rgba(126,200,216,0.45)" }}
            className="underline"
          >
            Create account with same email
          </Link>{" "}
          to track your status.
        </p>
      </div>
    </main>
  );
}
