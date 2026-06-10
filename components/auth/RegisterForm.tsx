"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2, AlertCircle, CheckCircle, ArrowRight, ShieldAlert, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_USERS } from "@/lib/mock-data";

export default function RegisterForm({ initialSignUp = false }: { initialSignUp?: boolean }) {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(initialSignUp);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (isSignUp && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (isSignUp && password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));

    if (isSignUp) {
      // ── Sign Up Logic ──
      try {
        const dynamicUsers = JSON.parse(localStorage.getItem("connexode_dynamic_users") || "[]");

        const existsDynamic = dynamicUsers.some((u: any) => u.email.toLowerCase() === email.toLowerCase());
        const existsStatic = MOCK_USERS.some((u: any) => u.email.toLowerCase() === email.toLowerCase());

        if (existsDynamic || existsStatic) {
          setLoading(false);
          setError("An account with this email already exists. Please sign in.");
          return;
        }

        const username = email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "-");
        const newUser = {
          id: `usr_${Math.random().toString(36).substring(2, 9)}`,
          name: username.charAt(0).toUpperCase() + username.slice(1).replace(/-/g, " "),
          username,
          email: email.toLowerCase(),
          role: "STUDENT",
          points: 0,
          avatarInitials: username.substring(0, 2).toUpperCase(),
          enrolledTrackId: "",
          joinDate: new Date().toISOString().split("T")[0],
          streak: 0,
          rank: "Newcomer",
          currentWeek: 1,
          currentDay: 1,
          password,
        };

        dynamicUsers.push(newUser);
        localStorage.setItem("connexode_dynamic_users", JSON.stringify(dynamicUsers));
        localStorage.setItem("connexode_active_user", newUser.id);

        setSuccess("Account created! Choose your internship track below.");
        setTimeout(() => {
          router.push("/#tracks");
        }, 800);
      } catch (err) {
        console.error(err);
        setLoading(false);
        setError("Registration failed. Please try again.");
      }
    } else {
      // ── Sign In Logic ──
      const emailLower = email.toLowerCase().trim();

      // 1. Check Static MOCK_USERS (admin, mentor, demo students)
      const staticUser = MOCK_USERS.find((u: any) => u.email.toLowerCase() === emailLower);
      if (staticUser) {
        const staticUserAny = staticUser as any;
        // If user has a password set, validate it
        if (staticUserAny.password && staticUserAny.password !== password) {
          setLoading(false);
          setError("Incorrect password. Please try again.");
          return;
        }

        localStorage.setItem("connexode_active_user", staticUser.id);
        const role = staticUser.role;

        if (role === "ADMIN") {
          setSuccess("Welcome Admin! Redirecting to Admin Dashboard...");
          setTimeout(() => { router.push("/admin"); }, 900);
        } else if (role === "MENTOR") {
          setSuccess("Welcome Mentor! Redirecting to Mentor Dashboard...");
          setTimeout(() => { router.push("/mentor"); }, 900);
        } else {
          // Student — check if enrolled
          const enrolledTrackId = (staticUser as any).enrolledTrackId;
          if (enrolledTrackId) {
            setSuccess("Welcome back! Redirecting to your Dashboard...");
            setTimeout(() => { router.push("/dashboard"); }, 900);
          } else {
            setSuccess("Logged in! Redirecting to homepage...");
            setTimeout(() => { router.push("/"); window.location.reload(); }, 900);
          }
        }
        return;
      }

      // 2. Check Dynamic Users (registered via sign-up)
      const dynamicUsers = JSON.parse(localStorage.getItem("connexode_dynamic_users") || "[]");
      const dynamicUser = dynamicUsers.find(
        (u: any) => u.email.toLowerCase() === emailLower && u.password === password
      );

      if (dynamicUser) {
        localStorage.setItem("connexode_active_user", dynamicUser.id);
        const enrolledTrackId = dynamicUser.enrolledTrackId ||
          localStorage.getItem(`connexode_user_track_${dynamicUser.id}`);

        if (enrolledTrackId) {
          setSuccess("Welcome back! Redirecting to your Dashboard...");
          setTimeout(() => { router.push("/dashboard"); }, 900);
        } else {
          setSuccess("Logged in! Choose your internship track.");
          setTimeout(() => { router.push("/#tracks"); }, 900);
        }
        return;
      }

      setLoading(false);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md space-y-5">
      {/* Credentials hint for demo */}
      {!isSignUp && (
        <div className="rounded-xl border border-cyan-500/10 bg-cyan-500/5 px-4 py-3 text-[10px] text-slate-400 space-y-1">
          <p className="font-bold text-cyan-400 uppercase tracking-wider text-[9px]">Demo Credentials</p>
          <p><span className="text-slate-300 font-mono">admin@connexode.pk</span> · <span className="font-mono">admin123</span> → Admin Panel</p>
          <p><span className="text-slate-300 font-mono">mentor@connexode.pk</span> · <span className="font-mono">mentor123</span> → Mentor Panel</p>
        </div>
      )}

      <div className="rounded-2xl border border-white/8 bg-white/4 p-6 sm:p-8 backdrop-blur-xl space-y-6">
        {/* Auth Toggle Tabs */}
        <div className="grid grid-cols-2 gap-2 rounded-xl bg-black/20 p-1 border border-white/5">
          <button
            type="button"
            onClick={() => { setIsSignUp(false); setError(""); setSuccess(""); }}
            className={cn(
              "rounded-lg py-2.5 text-xs font-bold transition-all",
              !isSignUp ? "bg-cyan-400 text-[#020B18] shadow-[0_0_12px_rgba(0,245,255,0.3)]" : "text-slate-400 hover:text-slate-200"
            )}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsSignUp(true); setError(""); setSuccess(""); }}
            className={cn(
              "rounded-lg py-2.5 text-xs font-bold transition-all",
              isSignUp ? "bg-cyan-400 text-[#020B18] shadow-[0_0_12px_rgba(0,245,255,0.3)]" : "text-slate-400 hover:text-slate-200"
            )}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">
              Email Address
            </label>
            <div className="relative">
              <Mail size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. name@example.com"
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-xs text-slate-200 outline-none focus:border-cyan-400/40 transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">
              Password
            </label>
            <div className="relative">
              <Lock size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-10 text-xs text-slate-200 outline-none focus:border-cyan-400/40 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
              </button>
            </div>
          </div>

          {/* Confirm Password (Sign Up Only) */}
          {isSignUp && (
            <div>
              <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">
                Confirm Password
              </label>
              <div className="relative">
                <Lock size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-xs text-slate-200 outline-none focus:border-cyan-400/40 transition-colors"
                />
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 p-3.5 text-xs text-red-400">
              <AlertCircle size={15} />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3.5 text-xs text-emerald-400">
              <CheckCircle size={15} />
              <span>{success}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 py-3.5 text-xs font-bold text-[#020B18] shadow-[0_0_20px_rgba(0,245,255,0.2)] hover:scale-[1.01] transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                {isSignUp ? "Creating Account..." : "Signing In..."}
              </>
            ) : (
              <>
                {isSignUp ? "Create My Account" : "Sign In to Platform"}
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
