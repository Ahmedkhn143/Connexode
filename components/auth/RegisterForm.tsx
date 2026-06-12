"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2, AlertCircle, CheckCircle, ArrowRight, ShieldAlert, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_USERS } from "@/lib/mock-data";

export default function RegisterForm({ initialSignUp = false }: { initialSignUp?: boolean }) {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(initialSignUp);
  const [isMentorApply, setIsMentorApply] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Mentor Application Form States
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [bio, setBio] = useState("");
  const [avatarImage, setAvatarImage] = useState("");

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

    if (isMentorApply) {
      // ── Mentor Application Logic ──
      try {
        const mentorApps = JSON.parse(localStorage.getItem("connexode_mentor_applications") || "[]");
        const existsApp = mentorApps.some((a: any) => a.email.toLowerCase() === email.toLowerCase());
        const existsDynamic = JSON.parse(localStorage.getItem("connexode_dynamic_users") || "[]").some((u: any) => u.email.toLowerCase() === email.toLowerCase());
        const existsStatic = MOCK_USERS.some((u: any) => u.email.toLowerCase() === email.toLowerCase());

        if (existsApp || existsDynamic || existsStatic) {
          setLoading(false);
          setError("An account or application with this email already exists.");
          return;
        }

        const newApplication = {
          id: `app_${Math.random().toString(36).substring(2, 9)}`,
          name: name.trim(),
          fatherName: fatherName.trim(),
          email: email.toLowerCase().trim(),
          linkedinUrl: linkedinUrl.trim(),
          githubUrl: githubUrl.trim(),
          specialization: specialization.trim(),
          experience: experience.trim(),
          bio: bio.trim(),
          password,
          status: "PENDING",
          appliedAt: new Date().toISOString(),
          avatarImage,
        };

        mentorApps.push(newApplication);
        localStorage.setItem("connexode_mentor_applications", JSON.stringify(mentorApps));

        setSuccess("Application submitted! We will respond within 24 hours.");
        
        // Reset form
        setName("");
        setFatherName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setLinkedinUrl("");
        setGithubUrl("");
        setSpecialization("");
        setExperience("");
        setBio("");
        setAvatarImage("");

        setTimeout(() => {
          setIsMentorApply(false);
          setIsSignUp(false);
          setSuccess("");
          setLoading(false);
        }, 3000);
      } catch (err) {
        console.error(err);
        setLoading(false);
        setError("Application submission failed. Please try again.");
      }
    } else if (isSignUp) {
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
          name: name.trim() || (username.charAt(0).toUpperCase() + username.slice(1).replace(/-/g, " ")),
          username,
          email: email.toLowerCase(),
          role: "STUDENT",
          points: 0,
          avatarInitials: name.trim() ? name.trim().substring(0, 2).toUpperCase() : username.substring(0, 2).toUpperCase(),
          enrolledTrackId: "",
          joinDate: new Date().toISOString().split("T")[0],
          streak: 0,
          rank: "Newcomer",
          currentWeek: 1,
          currentDay: 1,
          password,
          avatarImage,
        };

        dynamicUsers.push(newUser);
        localStorage.setItem("connexode_dynamic_users", JSON.stringify(dynamicUsers));
        localStorage.setItem("connexode_active_user", newUser.id);

        // Flag for WelcomeBanner on landing page
        sessionStorage.setItem("connexode_just_registered", "1");

        setSuccess("Account created! Redirecting to Ambassador application...");
        setTimeout(() => {
          router.push("/ambassador");
        }, 800);
      } catch (err) {
        console.error(err);
        setLoading(false);
        setError("Registration failed. Please try again.");
      }
    } else {
      // ── Sign In Logic ──
      const emailLower = email.toLowerCase().trim();

      // Check Mentor Applications first to block pending/rejected logins
      const mentorApps = JSON.parse(localStorage.getItem("connexode_mentor_applications") || "[]");
      const matchedApp = mentorApps.find((a: any) => a.email.toLowerCase() === emailLower);
      if (matchedApp) {
        if (matchedApp.status === "PENDING") {
          setLoading(false);
          setError("Your mentor application is pending review. We will respond within 24 hours.");
          return;
        } else if (matchedApp.status === "REJECTED") {
          setLoading(false);
          setError("Your application to join as a mentor was declined. Please contact support.");
          return;
        }
      }

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
          setSuccess("Logged in! Redirecting to Ambassador Program...");
          setTimeout(() => { router.push("/ambassador"); }, 900);
        }
        return;
      }

      setLoading(false);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md space-y-5">
      <div className="rounded-2xl border border-white/8 bg-white/4 p-6 sm:p-8 backdrop-blur-xl space-y-6">
        {/* Auth Toggle Tabs */}
        {isMentorApply ? (
          <div className="text-center space-y-1">
            <h3 className="font-display text-base font-bold text-white">Apply as a Mentor</h3>
            <p className="text-[10px] text-slate-400">Join our team of expert mentors to guide virtual interns</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 rounded-xl bg-black/20 p-1 border border-white/5">
            <button
              type="button"
              onClick={() => { setIsSignUp(false); setIsMentorApply(false); setError(""); setSuccess(""); }}
              className={cn(
                "rounded-lg py-2.5 text-xs font-bold transition-all",
                !isSignUp ? "bg-cyan-400 text-[#020B18] shadow-[0_0_12px_rgba(0,245,255,0.3)]" : "text-slate-400 hover:text-slate-200"
              )}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setIsSignUp(true); setIsMentorApply(false); setError(""); setSuccess(""); }}
              className={cn(
                "rounded-lg py-2.5 text-xs font-bold transition-all",
                isSignUp ? "bg-cyan-400 text-[#020B18] shadow-[0_0_12px_rgba(0,245,255,0.3)]" : "text-slate-400 hover:text-slate-200"
              )}
            >
              Create Account
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Mentor-specific fields (Full Name, Father's Name) */}
          {isMentorApply && (
            <>
              <div>
                <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Marcus Aurelius"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 px-4 text-xs text-slate-200 outline-none focus:border-cyan-400/40 transition-colors"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">
                  Father's Name
                </label>
                <input
                  type="text"
                  required
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  placeholder="Father's Name"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 px-4 text-xs text-slate-200 outline-none focus:border-cyan-400/40 transition-colors"
                />
              </div>
            </>
          )}

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

          {/* Mentor Professional details */}
          {isMentorApply && (
            <>
              <div>
                <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">
                  LinkedIn Profile Link
                </label>
                <input
                  type="url"
                  required
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 px-4 text-xs text-slate-200 outline-none focus:border-cyan-400/40 transition-colors"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">
                  GitHub Profile Link
                </label>
                <input
                  type="url"
                  required
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/username"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 px-4 text-xs text-slate-200 outline-none focus:border-cyan-400/40 transition-colors"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">
                  Role / Specialization
                </label>
                <input
                  type="text"
                  required
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  placeholder="e.g. Senior Frontend Developer"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 px-4 text-xs text-slate-200 outline-none focus:border-cyan-400/40 transition-colors"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">
                  Experience Description / Years
                </label>
                <input
                  type="text"
                  required
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="e.g. 5+ Years"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 px-4 text-xs text-slate-200 outline-none focus:border-cyan-400/40 transition-colors"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">
                  Brief Bio / Mentor Experience Details
                </label>
                <textarea
                  required
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about your background and mentoring approach..."
                  rows={3}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 px-4 text-xs text-slate-200 outline-none focus:border-cyan-400/40 transition-colors"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">
                  Profile Image URL
                </label>
                <input
                  type="url"
                  value={avatarImage}
                  onChange={(e) => setAvatarImage(e.target.value)}
                  placeholder="https://example.com/avatar.png"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 px-4 text-xs text-slate-200 outline-none focus:border-cyan-400/40 transition-colors"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">
                  Upload Profile Image (Max 1MB)
                </label>
                <label className="flex flex-col items-center justify-center w-full h-20 rounded-xl border-2 border-dashed border-white/10 bg-white/5 hover:bg-white/8 hover:border-cyan-500/35 transition-all cursor-pointer group">
                  <div className="flex flex-col items-center justify-center pt-2 pb-2">
                    <p className="text-[10px] text-slate-400 group-hover:text-slate-300"><span className="font-semibold">Click to upload image</span></p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (file.size > 1024 * 1024) {
                          alert("File size exceeds 1MB limit!");
                          e.target.value = "";
                          return;
                        }
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setAvatarImage(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                  />
                </label>
                {avatarImage && (
                  <div className="mt-2 flex items-center gap-2 rounded-xl bg-white/4 border border-white/5 p-2">
                    <img src={avatarImage} alt="Preview" className="h-8 w-8 rounded-full object-cover border border-cyan-400/30" />
                    <span className="text-[10px] text-slate-300 truncate flex-1">Image Loaded</span>
                    <button type="button" onClick={() => setAvatarImage("")} className="text-red-400 hover:text-red-300 text-[10px] font-bold">Remove</button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Student Sign Up specific fields */}
          {isSignUp && !isMentorApply && (
            <>
              <div>
                <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">
                  Full Name (Optional)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Johnson"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 px-4 text-xs text-slate-200 outline-none focus:border-cyan-400/40 transition-colors"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">
                  Profile Image URL (Optional)
                </label>
                <input
                  type="url"
                  value={avatarImage}
                  onChange={(e) => setAvatarImage(e.target.value)}
                  placeholder="https://example.com/avatar.png"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 px-4 text-xs text-slate-200 outline-none focus:border-cyan-400/40 transition-colors"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">
                  Upload Profile Image (Optional)
                </label>
                <label className="flex flex-col items-center justify-center w-full h-20 rounded-xl border-2 border-dashed border-white/10 bg-white/5 hover:bg-white/8 hover:border-cyan-500/35 transition-all cursor-pointer group">
                  <div className="flex flex-col items-center justify-center pt-2 pb-2">
                    <p className="text-[10px] text-slate-400 group-hover:text-slate-300"><span className="font-semibold">Click to upload avatar</span></p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (file.size > 1024 * 1024) {
                          alert("File size exceeds 1MB limit!");
                          e.target.value = "";
                          return;
                        }
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setAvatarImage(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                  />
                </label>
                {avatarImage && (
                  <div className="mt-2 flex items-center gap-2 rounded-xl bg-white/4 border border-white/5 p-2">
                    <img src={avatarImage} alt="Preview" className="h-8 w-8 rounded-full object-cover border border-cyan-400/30" />
                    <span className="text-[10px] text-slate-300 truncate flex-1">Image Loaded</span>
                    <button type="button" onClick={() => setAvatarImage("")} className="text-red-400 hover:text-red-300 text-[10px] font-bold">Remove</button>
                  </div>
                )}
              </div>
            </>
          )}

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

          {/* Confirm Password (Sign Up or Mentor Apply Only) */}
          {(isSignUp || isMentorApply) && (
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
            <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 p-3.5 text-xs text-red-400 animate-fade-in">
              <AlertCircle size={15} />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3.5 text-xs text-emerald-400 animate-fade-in">
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
                {isMentorApply ? "Submitting Application..." : isSignUp ? "Creating Account..." : "Signing In..."}
              </>
            ) : (
              <>
                {isMentorApply ? "Submit Application" : isSignUp ? "Create My Account" : "Sign In to Platform"}
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        {/* Mentor Application Trigger Commented Out */}
        {/* <div className="text-center pt-2 border-t border-white/5">
          {!isMentorApply ? (
            <button
              type="button"
              onClick={() => {
                setIsMentorApply(true);
                setIsSignUp(false);
                setError("");
                setSuccess("");
              }}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 hover:underline transition-all"
            >
              Join Connexode as a Mentor →
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setIsMentorApply(false);
                setIsSignUp(false);
                setError("");
                setSuccess("");
              }}
              className="text-xs font-semibold text-slate-400 hover:text-slate-200 hover:underline transition-all"
            >
              ← Back to Student Sign In / Sign Up
            </button>
          )}
        </div> */}
      </div>
    </div>
  );
}
