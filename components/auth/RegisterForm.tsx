"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Phone, Mail, Award, Lock, BookOpen, Upload, Eye, EyeOff, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RegisterForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form Fields State
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    email: "",
    mobile: "",
    gender: "male",
    degree: "",
    institute: "",
    graduationYear: "2026",
    trackInterest: "track_001",
    password: "",
    confirmPassword: "",
  });

  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Handle Input Changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Image Upload with size validation (Max 1MB)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      setErrors((prev) => ({ ...prev, avatar: "Image size must be less than 1MB" }));
      setAvatar(null);
      setAvatarPreview(null);
      return;
    }

    setErrors((prev) => ({ ...prev, avatar: "" }));
    setAvatar(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Validate Step 1 (Personal Details)
  const validateStep1 = () => {
    const stepErrors: Record<string, string> = {};
    if (!formData.name.trim()) stepErrors.name = "Full Name is required";
    if (!formData.fatherName.trim()) stepErrors.fatherName = "Father's Name is required";
    if (!formData.email.trim()) {
      stepErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      stepErrors.email = "Please enter a valid email address";
    }
    if (!formData.mobile.trim()) {
      stepErrors.mobile = "Mobile number is required";
    } else if (!/^\+?[0-9]{10,14}$/.test(formData.mobile)) {
      stepErrors.mobile = "Please enter a valid mobile number (10-14 digits)";
    }
    if (!avatar) stepErrors.avatar = "Profile image is required";

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  // Validate Step 2 (Academic Profile)
  const validateStep2 = () => {
    const stepErrors: Record<string, string> = {};
    if (!formData.degree.trim()) stepErrors.degree = "Degree / Program is required";
    if (!formData.institute.trim()) stepErrors.institute = "Institution / University is required";

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  // Validate Step 3 (Security)
  const validateStep3 = () => {
    const stepErrors: Record<string, string> = {};
    if (!formData.password) {
      stepErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      stepErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      stepErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    if (step === 2 && validateStep2()) setStep(3);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setLoading(true);
    // Simulate user creation and routing
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);

    alert("Registration completed successfully!");
    router.push("/dashboard");
  };

  return (
    <div className="w-full max-w-lg rounded-2xl border border-white/8 bg-white/4 p-7 backdrop-blur-xl">
      
      {/* Step Indicators */}
      <div className="mb-8 flex justify-between items-center text-xs font-bold">
        {[
          { label: "Personal", number: 1 },
          { label: "Academic", number: 2 },
          { label: "Security", number: 3 },
        ].map((s) => (
          <div key={s.number} className="flex flex-col items-center flex-1">
            <div
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full border mb-1.5 transition-all text-xs",
                step >= s.number
                  ? "bg-cyan-400 border-cyan-400 text-[#020B18]"
                  : "border-white/10 text-slate-500 bg-white/5"
              )}
            >
              {step > s.number ? <CheckCircle size={14} /> : s.number}
            </div>
            <span className={cn(step >= s.number ? "text-cyan-400" : "text-slate-500")}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Step 1: Personal Details */}
        {step === 1 && (
          <div className="space-y-4">
            
            {/* Avatar Upload Block */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative group">
                <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-white/10 bg-white/5 flex items-center justify-center relative">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar Preview" className="h-full w-full object-cover" />
                  ) : (
                    <User size={36} className="text-slate-600" />
                  )}
                  <label className="absolute inset-0 bg-black/45 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-all">
                    <Upload size={18} className="text-white" />
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 mt-2">Upload Profile Image (Max 1MB)</p>
              {errors.avatar && (
                <p className="mt-1 flex items-center gap-1 text-[11px] text-red-400">
                  <AlertCircle size={12} /> {errors.avatar}
                </p>
              )}
            </div>

            {/* Full Name */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-300">Full Name *</label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Alex Johnson"
                  className={cn(
                    "w-full rounded-xl border bg-white/5 py-3 pl-10 pr-4 text-xs text-slate-200 outline-none transition-all",
                    errors.name ? "border-red-400/40 focus:ring-1 focus:ring-red-400/10" : "border-white/10 focus:border-cyan-400/40"
                  )}
                />
                <User size={13} className="absolute left-3.5 top-4.5 text-slate-600" />
              </div>
              {errors.name && <p className="mt-1 text-[11px] text-red-400">{errors.name}</p>}
            </div>

            {/* Father's Name */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-300">Father's Name *</label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleInputChange}
                placeholder="e.g. Richard Johnson"
                className={cn(
                  "w-full rounded-xl border bg-white/5 px-4 py-3 text-xs text-slate-200 outline-none transition-all",
                  errors.fatherName ? "border-red-400/40" : "border-white/10 focus:border-cyan-400/40"
                )}
              />
              {errors.fatherName && <p className="mt-1 text-[11px] text-red-400">{errors.fatherName}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-300">Email Address *</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="alex@example.com"
                  className={cn(
                    "w-full rounded-xl border bg-white/5 py-3 pl-10 pr-4 text-xs text-slate-200 outline-none transition-all",
                    errors.email ? "border-red-400/40" : "border-white/10 focus:border-cyan-400/40"
                  )}
                />
                <Mail size={13} className="absolute left-3.5 top-4.5 text-slate-600" />
              </div>
              {errors.email && <p className="mt-1 text-[11px] text-red-400">{errors.email}</p>}
            </div>

            {/* Mobile Number & Gender Group */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-300">Mobile Number *</label>
                <div className="relative">
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="+923001234567"
                    className={cn(
                      "w-full rounded-xl border bg-white/5 py-3 pl-10 pr-4 text-xs text-slate-200 outline-none transition-all",
                      errors.mobile ? "border-red-400/40" : "border-white/10 focus:border-cyan-400/40"
                    )}
                  />
                  <Phone size={13} className="absolute left-3.5 top-4.5 text-slate-600" />
                </div>
                {errors.mobile && <p className="mt-1 text-[11px] text-red-400">{errors.mobile}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-300">Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/10 bg-[#030c1c] px-4 py-3 text-xs text-slate-300 outline-none focus:border-cyan-400/40"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="mt-4 flex w-full items-center justify-center rounded-xl bg-cyan-400 py-3.5 text-xs font-bold text-[#020B18] transition-all hover:scale-[1.01] cursor-pointer"
            >
              Continue to Academics
            </button>
          </div>
        )}

        {/* Step 2: Academic Profile */}
        {step === 2 && (
          <div className="space-y-4">
            
            {/* Degree */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-300">Degree / Program *</label>
              <div className="relative">
                <input
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleInputChange}
                  placeholder="e.g. BS Computer Science"
                  className={cn(
                    "w-full rounded-xl border bg-white/5 py-3 pl-10 pr-4 text-xs text-slate-200 outline-none transition-all",
                    errors.degree ? "border-red-400/40" : "border-white/10 focus:border-cyan-400/40"
                  )}
                />
                <BookOpen size={13} className="absolute left-3.5 top-4.5 text-slate-600" />
              </div>
              {errors.degree && <p className="mt-1 text-[11px] text-red-400">{errors.degree}</p>}
            </div>

            {/* Institution */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-300">Institution / University *</label>
              <input
                type="text"
                name="institute"
                value={formData.institute}
                onChange={handleInputChange}
                placeholder="e.g. FAST NUCES"
                className={cn(
                  "w-full rounded-xl border bg-white/5 px-4 py-3 text-xs text-slate-200 outline-none transition-all",
                  errors.institute ? "border-red-400/40" : "border-white/10 focus:border-cyan-400/40"
                )}
              />
              {errors.institute && <p className="mt-1 text-[11px] text-red-400">{errors.institute}</p>}
            </div>

            {/* Graduation Year & Track selection */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-300">Graduation Year *</label>
                <select
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/10 bg-[#030c1c] px-4 py-3 text-xs text-slate-300 outline-none"
                >
                  {["2024", "2025", "2026", "2027", "2028"].map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-300">Internship Track Interest *</label>
                <select
                  name="trackInterest"
                  value={formData.trackInterest}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/10 bg-[#030c1c] px-4 py-3 text-xs text-slate-300 outline-none"
                >
                  <option value="track_001">Full Stack Web</option>
                  <option value="track_007">Frontend Engineering</option>
                  <option value="track_008">Backend Engineering</option>
                  <option value="track_002">AI Engineering</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3.5 text-xs font-bold text-slate-300 hover:bg-white/8 transition-all cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 rounded-xl bg-cyan-400 py-3.5 text-xs font-bold text-[#020B18] transition-all hover:scale-[1.01] cursor-pointer"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Account Security */}
        {step === 3 && (
          <div className="space-y-4">
            
            {/* Password */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-300">Password *</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className={cn(
                    "w-full rounded-xl border bg-white/5 py-3 pl-10 pr-10 text-xs text-slate-200 outline-none transition-all",
                    errors.password ? "border-red-400/40" : "border-white/10 focus:border-cyan-400/40"
                  )}
                />
                <Lock size={13} className="absolute left-3.5 top-4.5 text-slate-600" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-slate-600 hover:text-slate-400"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-[11px] text-red-400">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-300">Confirm Password *</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className={cn(
                    "w-full rounded-xl border bg-white/5 py-3 pl-10 pr-10 text-xs text-slate-200 outline-none transition-all",
                    errors.confirmPassword ? "border-red-400/40" : "border-white/10 focus:border-cyan-400/40"
                  )}
                />
                <Lock size={13} className="absolute left-3.5 top-4.5 text-slate-600" />
              </div>
              {errors.confirmPassword && <p className="mt-1 text-[11px] text-red-400">{errors.confirmPassword}</p>}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleBack}
                disabled={loading}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3.5 text-xs font-bold text-slate-300 hover:bg-white/8 disabled:opacity-50 transition-all cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 py-3.5 text-xs font-bold text-[#020B18] shadow-[0_0_20px_rgba(0,245,255,0.25)] transition-all hover:scale-[1.01] disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Registering...
                  </>
                ) : (
                  <>Create Account</>
                )}
              </button>
            </div>
          </div>
        )}

      </form>
    </div>
  );
}
