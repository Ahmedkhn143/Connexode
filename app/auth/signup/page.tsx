// app/auth/signup/page.tsx
// User registration page
// Colors: Navy #082038 · Teal #188080 · Cyan #7EC8D8

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, UserPlus, CheckCircle } from "lucide-react";

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "8+ characters",        pass: password.length >= 8         },
    { label: "One uppercase letter",  pass: /[A-Z]/.test(password)      },
    { label: "One number",            pass: /\d/.test(password)          },
  ];
  if (!password) return null;
  return (
    <div className="mt-2 space-y-1">
      {checks.map((c) => (
        <div key={c.label} className="flex items-center gap-1.5">
          <div
            style={{ backgroundColor: c.pass ? "#188080" : "rgba(126,200,216,0.15)" }}
            className="h-1.5 w-1.5 rounded-full transition-colors"
          />
          <span
            style={{ color: c.pass ? "#7EC8D8" : "rgba(126,200,216,0.3)" }}
            className="text-[10px] transition-colors"
          >
            {c.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPass, setShowPass]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");
  const [success, setSuccess]         = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    // Register
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name:     form.name.trim(),
        email:    form.email.toLowerCase().trim(),
        password: form.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Registration failed. Please try again.");
      setLoading(false);
      return;
    }

    // Auto sign in after registration
    const signInResult = await signIn("credentials", {
      email:    form.email.toLowerCase().trim(),
      password: form.password,
      redirect: false,
    });

    setLoading(false);

    if (signInResult?.ok) {
      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 1500);
    } else {
      // Registration succeeded but auto-login failed — send to sign in
      router.push("/auth/signin?registered=1");
    }
  }

  if (success) {
    return (
      <main
        style={{ backgroundColor: "#040C18" }}
        className="flex min-h-screen items-center justify-center px-6 antialiased"
      >
        <div className="text-center">
          <div
            style={{
              backgroundColor: "rgba(24,128,128,0.15)",
              border: "1px solid rgba(24,128,128,0.3)",
            }}
            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full"
          >
            <CheckCircle size={28} style={{ color: "#7EC8D8" }} strokeWidth={1.5} />
          </div>
          <h2 style={{ color: "#E8F4F8" }} className="mb-2 text-xl font-bold">
            Account created!
          </h2>
          <p style={{ color: "rgba(126,200,216,0.5)" }} className="text-sm">
            Taking you to your dashboard...
          </p>
        </div>
      </main>
    );
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
            Create your account
          </h1>
          <p style={{ color: "rgba(126,200,216,0.5)" }} className="text-sm">
            Use the same email you applied with to track your application
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

            {/* Full name */}
            <div>
              <label
                style={{ color: "rgba(126,200,216,0.6)" }}
                className="mb-1.5 block text-xs font-medium"
              >
                Full name *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ahmad Khan"
                required
                autoComplete="name"
                style={{
                  backgroundColor: "#040C18",
                  border: "1px solid rgba(126,200,216,0.15)",
                  color: "#E8F4F8",
                }}
                className="w-full rounded-xl px-4 py-3 text-sm placeholder:text-[rgba(126,200,216,0.2)] outline-none focus:border-[rgba(126,200,216,0.45)] transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label
                style={{ color: "rgba(126,200,216,0.6)" }}
                className="mb-1.5 block text-xs font-medium"
              >
                Email address *
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
              <p style={{ color: "rgba(126,200,216,0.3)" }} className="mt-1 text-xs">
                Use the same email you applied with
              </p>
            </div>

            {/* Password */}
            <div>
              <label
                style={{ color: "rgba(126,200,216,0.6)" }}
                className="mb-1.5 block text-xs font-medium"
              >
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Min. 8 characters"
                  required
                  autoComplete="new-password"
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
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 hover:text-[#7EC8D8]"
                  tabIndex={-1}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <PasswordStrength password={form.password} />
            </div>

            {/* Confirm password */}
            <div>
              <label
                style={{ color: "rgba(126,200,216,0.6)" }}
                className="mb-1.5 block text-xs font-medium"
              >
                Confirm password *
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={form.confirm}
                  onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                  placeholder="Repeat password"
                  required
                  autoComplete="new-password"
                  style={{
                    backgroundColor: "#040C18",
                    border: `1px solid ${
                      form.confirm && form.confirm !== form.password
                        ? "rgba(239,68,68,0.4)"
                        : "rgba(126,200,216,0.15)"
                    }`,
                    color: "#E8F4F8",
                  }}
                  className="w-full rounded-xl px-4 py-3 pr-11 text-sm placeholder:text-[rgba(126,200,216,0.2)] outline-none focus:border-[rgba(126,200,216,0.45)] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  style={{ color: "rgba(126,200,216,0.35)" }}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 hover:text-[#7EC8D8]"
                  tabIndex={-1}
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {form.confirm && form.confirm !== form.password && (
                <p style={{ color: "#FCA5A5" }} className="mt-1 text-xs">
                  Passwords do not match
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: loading ? "rgba(24,128,128,0.5)" : "#188080",
                color: "#E8F4F8",
              }}
              className="flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition-all hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <>
                  <div
                    style={{ borderTopColor: "#E8F4F8", borderColor: "rgba(255,255,255,0.2)" }}
                    className="h-4 w-4 animate-spin rounded-full border-2"
                  />
                  Creating account...
                </>
              ) : (
                <>
                  <UserPlus size={15} />
                  Create account
                </>
              )}
            </button>
          </form>
        </div>

        {/* Sign in link */}
        <p
          style={{ color: "rgba(126,200,216,0.4)" }}
          className="mt-6 text-center text-sm"
        >
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            style={{ color: "#7EC8D8" }}
            className="font-medium transition-colors hover:text-[#188080]"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
