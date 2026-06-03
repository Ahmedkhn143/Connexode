"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Lock, Mail, Loader2, AlertCircle, CheckCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_USERS } from "@/lib/mock-data";

export default function RegisterForm() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Login and Register
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form Fields
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

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200)); // Smooth micro-animation wait

    if (isSignUp) {
      // ── Sign Up Logic ──
      try {
        const dynamicUsers = JSON.parse(localStorage.getItem("connexode_dynamic_users") || "[]");
        
        // Check if user already exists
        const existsDynamic = dynamicUsers.some((u: any) => u.email.toLowerCase() === email.toLowerCase());
        const existsStatic = MOCK_USERS.some((u: any) => u.email.toLowerCase() === email.toLowerCase());

        if (existsDynamic || existsStatic) {
          setLoading(false);
          setError("User already registered with this email.");
          return;
        }

        const username = email.split("@")[0];
        const newUser = {
          id: `usr_${Math.random().toString(36).substring(2, 9)}`,
          name: username.charAt(0).toUpperCase() + username.slice(1),
          username: username,
          email: email.toLowerCase(),
          role: "STUDENT",
          points: 0,
          avatarInitials: username.substring(0, 2).toUpperCase(),
          enrolledTrackId: "", // Starts unenrolled
          joinDate: new Date().toISOString().split("T")[0],
          streak: 0,
          rank: "Newcomer",
          currentWeek: 1,
          currentDay: 1,
          password: password, // Store password in dynamic mock DB
        };

        dynamicUsers.push(newUser);
        localStorage.setItem("connexode_dynamic_users", JSON.stringify(dynamicUsers));
        localStorage.setItem("connexode_active_user", newUser.id);
        
        setSuccess("Account registered successfully! Redirecting...");
        setTimeout(() => {
          router.push("/dashboard");
          window.location.reload();
        }, 1000);
      } catch (err) {
        console.error(err);
        setError("Registration failed. Please try again.");
      }
    } else {
      // ── Sign In Logic ──
      const emailLower = email.toLowerCase();
      
      // 1. Check Static Users
      const staticUser = MOCK_USERS.find((u) => u.email.toLowerCase() === emailLower);
      if (staticUser) {
        // For static mock users, accept any password or password 'password' for convenience
        localStorage.setItem("connexode_active_user", staticUser.id);
        setSuccess("Logged in successfully! Redirecting...");
        setTimeout(() => {
          router.push("/dashboard");
          window.location.reload();
        }, 1000);
        return;
      }

      // 2. Check Dynamic Users
      const dynamicUsers = JSON.parse(localStorage.getItem("connexode_dynamic_users") || "[]");
      const dynamicUser = dynamicUsers.find(
        (u: any) => u.email.toLowerCase() === emailLower && u.password === password
      );

      if (dynamicUser) {
        localStorage.setItem("connexode_active_user", dynamicUser.id);
        setSuccess("Logged in successfully! Redirecting...");
        setTimeout(() => {
          router.push("/dashboard");
          window.location.reload();
        }, 1000);
        return;
      }

      setLoading(false);
      setError("Invalid email address or incorrect password.");
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/8 bg-white/4 p-6 sm:p-8 backdrop-blur-xl space-y-6">
      {/* Auth Toggle Tabs */}
      <div className="grid grid-cols-2 gap-2 rounded-xl bg-black/20 p-1 border border-white/5">
        <button
          type="button"
          onClick={() => {
            setIsSignUp(false);
            setError("");
            setSuccess("");
          }}
          className={cn(
            "rounded-lg py-2 text-xs font-bold transition-all",
            !isSignUp ? "bg-cyan-400 text-[#020B18]" : "text-slate-400 hover:text-slate-200"
          )}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => {
            setIsSignUp(true);
            setError("");
            setSuccess("");
          }}
          className={cn(
            "rounded-lg py-2 text-xs font-bold transition-all",
            isSignUp ? "bg-cyan-400 text-[#020B18]" : "text-slate-400 hover:text-slate-200"
          )}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Address */}
        <div>
          <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. name@example.com"
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-xs text-slate-200 outline-none focus:border-cyan-400/40 transition-colors"
            />
            <Mail size={13} className="absolute left-3.5 top-4.5 text-slate-500" />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-xs text-slate-200 outline-none focus:border-cyan-400/40 transition-colors"
            />
            <Lock size={13} className="absolute left-3.5 top-4.5 text-slate-500" />
          </div>
        </div>

        {/* Confirm Password (Sign Up Only) */}
        {isSignUp && (
          <div>
            <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-xs text-slate-200 outline-none focus:border-cyan-400/40 transition-colors"
              />
              <Lock size={13} className="absolute left-3.5 top-4.5 text-slate-500" />
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
              Processing...
            </>
          ) : (
            <>
              {isSignUp ? "Register Account" : "Access Platform"}
              <ArrowRight size={14} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
