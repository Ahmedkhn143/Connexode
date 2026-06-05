"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Loader2, ArrowLeft, ShieldCheck, Wallet, ArrowRight, Upload, AlertCircle, Clock, FileText, Building2, Smartphone, User as UserIcon } from "lucide-react";
import { TRACKS, setPaymentStatus, enrollUserInTrack, getActiveUser } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const PAK_UNIVERSITIES = [
  "FAST NUCES",
  "National University of Sciences and Technology (NUST)",
  "COMSATS University",
  "University of Engineering and Technology (UET)",
  "Information Technology University (ITU)",
  "Lahore University of Management Sciences (LUMS)",
  "Institute of Business Administration (IBA)",
  "NED University of Engineering and Technology",
  "University of the Punjab",
  "University of Karachi",
  "Other"
];

const EXPERIENCE_LEVELS = [
  "Fresh Graduate",
  "Student (Undergraduate)",
  "Less than 1 year",
  "1 to 2 years",
  "More than 2 years"
];

export default function CheckoutPage() {
  const router = useRouter();
  const params = useParams();
  const trackId = params.trackId as string;

  const track = TRACKS.find((t) => t.id === trackId);
  
  // Form Fields
  const [fullName, setFullName] = useState("Alex Johnson");
  const [fatherName, setFatherName] = useState("Richard Johnson");
  const [mobileNumber, setMobileNumber] = useState("0300-1234567");
  const [cnic, setCnic] = useState("");
  const [address, setAddress] = useState("");
  const [institute, setInstitute] = useState("FAST NUCES");
  const [customInstitute, setCustomInstitute] = useState("");
  const [experience, setExperience] = useState("Fresh Graduate");
  const [projectsUrl, setProjectsUrl] = useState("");
  const [heardFrom, setHeardFrom] = useState("");
  const [expectations, setExpectations] = useState("");
  
  // File Uploads
  const [avatarImage, setAvatarImage] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<string | null>(null);
  const [resumeFileName, setResumeFileName] = useState("");
  const [receiptImage, setReceiptImage] = useState<string | null>(null);
  
  // Payment Details
  const [senderName, setSenderName] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("EasyPaisa");
  
  const [error, setError] = useState("");
  const [state, setState] = useState<"idle" | "pending_approval">("idle");

  const price = 500; // Rs. 500 (one-time fee for 2 months)

  if (!track) {
    return (
      <div className="min-h-screen bg-[#020B18] text-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-slate-500">Track not found.</p>
          <Link href="/dashboard" className="text-cyan-400 text-xs hover:underline mt-2 inline-block">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // File Upload Handlers
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      setError("Profile picture size must be less than 1MB");
      return;
    }

    setError("");
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      setError("Resume file size must be less than 1MB");
      return;
    }

    setError("");
    setResumeFileName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      setResumeFile(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      setError("Receipt image size must be less than 1MB");
      return;
    }

    setError("");
    const reader = new FileReader();
    reader.onloadend = () => {
      setReceiptImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Form Validations
    if (!avatarImage) return setError("Profile image is required");
    if (!fullName.trim()) return setError("Full Name is required");
    if (!fatherName.trim()) return setError("Father's Name is required");
    if (!mobileNumber.trim()) return setError("Mobile number is required");
    
    // Strict Mobile check: 03XX-XXXXXXX
    if (!/^03[0-9]{2}-[0-9]{7}$/.test(mobileNumber)) {
      return setError("Mobile number must be in format 03XX-XXXXXXX (e.g. 0300-1234567)");
    }
    
    if (!cnic.trim()) return setError("CNIC number is required");
    
    // Strict CNIC check: XXXXX-XXXXXXX-X
    if (!/^[0-9]{5}-[0-9]{7}-[0-9]{1}$/.test(cnic)) {
      return setError("CNIC must be in format XXXXX-XXXXXXX-X (e.g. 42101-1234567-1)");
    }
    
    if (!address.trim()) return setError("Permanent address is required");
    
    const finalInstitute = institute === "Other" ? customInstitute : institute;
    if (!finalInstitute.trim()) return setError("Institute / University name is required");
    
    if (!resumeFile) return setError("Resume file is required");
    if (!receiptImage) return setError("Payment screenshot is required");
    if (!senderName.trim()) return setError("Sender Name / Account Title is required");
    if (!transactionId.trim()) return setError("Transaction ID (TID) is required");

    // Submit
    try {
      const activeUserObj = getActiveUser();
      const pending = JSON.parse(localStorage.getItem("connexode_manual_payments") || "[]");
      const filtered = pending.filter((p: any) => p.trackId !== trackId);
      filtered.push({
        id: `tx_${Math.random().toString(36).substring(2, 9)}`,
        userId: activeUserObj.id,
        trackId,
        trackTitle: track.title,
        userName: fullName,
        fatherName,
        mobile: mobileNumber,
        cnic,
        address,
        institute: finalInstitute,
        experience,
        projectsUrl,
        heardFrom,
        expectations,
        avatarImage,
        resumeFileName,
        resumeFile,
        senderName,
        transactionId,
        paymentMethod,
        receiptImage,
        price,
        status: "PENDING",
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem("connexode_manual_payments", JSON.stringify(filtered));
      setPaymentStatus(trackId, "PAID", activeUserObj.id);
      enrollUserInTrack(trackId);
      setState("pending_approval");
    } catch (err) {
      console.error(err);
      setError("An error occurred during submission. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#020B18] text-slate-100 px-4 py-12 flex items-center justify-center relative overflow-y-auto">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-4xl relative z-10 space-y-6">
        
        {/* Header link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft size={13} />
          Cancel and return to dashboard
        </Link>

        {state === "idle" ? (
          <div className="rounded-2xl border border-white/8 bg-white/4 p-6 sm:p-8 backdrop-blur-xl space-y-8">
            {/* Header info */}
            <div>
              <span className="rounded bg-cyan-400/10 border border-cyan-400/25 px-2.5 py-1 text-[10px] font-extrabold text-cyan-400 uppercase tracking-wider">
                Internship Application
              </span>
              <h1 className="font-display text-2xl font-black text-white mt-3">
                Apply for {track.title} Internship
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Fill in the application details and attach proof of payment below.
              </p>
            </div>

            <form onSubmit={handleSubmitApplication} className="space-y-6">
              
              {/* Form Section 1: Candidate Bio */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider border-b border-white/8 pb-2">
                  Personal Details
                </h3>

                {/* Profile Pic Upload */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative group">
                    <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-white/10 bg-[#030c1c] flex items-center justify-center relative">
                      {avatarImage ? (
                        <img src={avatarImage} alt="Profile Preview" className="h-full w-full object-cover" />
                      ) : (
                        <UserIcon size={36} className="text-slate-600" />
                      )}
                      <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-all">
                        <Upload size={18} className="text-white" />
                        <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                      </label>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2 font-bold">Upload Profile Picture * (Max 1MB)</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#030c1c] px-4 py-3 text-xs text-slate-200 outline-none focus:border-cyan-400/40"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">
                      Father's Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fatherName}
                      onChange={(e) => setFatherName(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#030c1c] px-4 py-3 text-xs text-slate-200 outline-none focus:border-cyan-400/40"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">
                      Mobile Number * (03XX-XXXXXXX)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 0300-1234567"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#030c1c] px-4 py-3 text-xs text-slate-200 outline-none focus:border-cyan-400/40"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">
                      CNIC Number * (XXXXX-XXXXXXX-X)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 42101-1234567-1"
                      value={cnic}
                      onChange={(e) => setCnic(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#030c1c] px-4 py-3 text-xs text-slate-200 outline-none focus:border-cyan-400/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">
                    Permanent Address *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Complete residential address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#030c1c] px-4 py-3 text-xs text-slate-200 outline-none focus:border-cyan-400/40"
                  />
                </div>
              </div>

              {/* Form Section 2: Academics & Experience */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider border-b border-white/8 pb-2">
                  Academic & Professional Background
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">
                      Institute *
                    </label>
                    <select
                      value={institute}
                      onChange={(e) => setInstitute(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#030c1c] px-4 py-3 text-xs text-slate-300 outline-none"
                    >
                      {PAK_UNIVERSITIES.map((uni) => (
                        <option key={uni} value={uni}>{uni}</option>
                      ))}
                    </select>

                    {institute === "Other" && (
                      <input
                        type="text"
                        required
                        placeholder="Write your university name here"
                        value={customInstitute}
                        onChange={(e) => setCustomInstitute(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-[#030c1c] px-4 py-3 text-xs text-slate-200 outline-none focus:border-cyan-400/40 mt-3 animate-fade-in"
                      />
                    )}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">
                      Working Experience *
                    </label>
                    <select
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#030c1c] px-4 py-3 text-xs text-slate-300 outline-none"
                    >
                      {EXPERIENCE_LEVELS.map((exp) => (
                        <option key={exp} value={exp}>{exp}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">
                    Your Past Projects URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/... or Behance link"
                    value={projectsUrl}
                    onChange={(e) => setProjectsUrl(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#030c1c] px-4 py-3 text-xs text-slate-200 outline-none focus:border-cyan-400/40"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">
                      Where did you hear about Internee.pk?
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. LinkedIn, Friend, University"
                      value={heardFrom}
                      onChange={(e) => setHeardFrom(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#030c1c] px-4 py-3 text-xs text-slate-200 outline-none focus:border-cyan-400/40"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">
                      What do you expect from us?
                    </label>
                    <input
                      type="text"
                      placeholder="Expectations from program"
                      value={expectations}
                      onChange={(e) => setExpectations(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#030c1c] px-4 py-3 text-xs text-slate-200 outline-none focus:border-cyan-400/40"
                    />
                  </div>
                </div>

                {/* Resume Upload */}
                <div>
                  <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">
                    Upload Resume File * (Max 1MB)
                  </label>
                  <div className="flex flex-col items-center justify-center border border-dashed border-white/10 rounded-xl p-6 bg-white/2 hover:bg-white/3 transition-colors">
                    {resumeFile ? (
                      <div className="flex items-center gap-3 bg-white/5 px-4 py-2.5 rounded-lg border border-white/10">
                        <FileText className="text-cyan-400" size={18} />
                        <span className="text-xs font-semibold text-slate-200">{resumeFileName}</span>
                        <button
                          type="button"
                          onClick={() => { setResumeFile(null); setResumeFileName(""); }}
                          className="text-red-400 text-2xs hover:underline ml-4"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center cursor-pointer w-full py-2 text-slate-500 hover:text-slate-300">
                        <Upload size={22} className="mb-2 text-cyan-400" />
                        <span className="text-xs font-bold text-slate-300">Drag & Drop or Click to Upload Resume</span>
                        <span className="text-[10px] text-slate-500 mt-1">Accepts PDF, DOCX, Images</span>
                        <input type="file" accept=".pdf,.doc,.docx,image/*" onChange={handleResumeUpload} className="hidden" />
                      </label>
                    )}
                  </div>
                </div>
              </div>

              {/* Form Section 3: Payment Instructions */}
              <div className="space-y-4 pt-4 border-t border-white/8">
                <h3 className="text-xs font-bold text-yellow-400 uppercase tracking-wider flex items-center gap-2">
                  <Wallet size={14} /> Required Fee & Payment Instructions
                </h3>

                {/* Pricing / Bank cards grid */}
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-4.5 space-y-1">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Required Fee</p>
                    <h4 className="font-display text-xl font-black text-white">500 Rupees</h4>
                    <p className="text-[9px] text-slate-400 italic">Local Clients</p>
                    <hr className="border-white/5 my-2" />
                    <h4 className="font-display text-lg font-black text-slate-300">$5</h4>
                    <p className="text-[9px] text-slate-400 italic">International Clients</p>
                    <p className="text-[8px] text-yellow-500 font-bold mt-2 leading-tight">
                      * One time fee for 2 months program
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-white/2 p-4.5 space-y-2">
                    <div className="flex items-center gap-2">
                      <Building2 size={16} className="text-blue-400" />
                      <h4 className="text-xs font-bold text-white">Meezan Bank</h4>
                    </div>
                    <p className="text-[9px] text-slate-500 font-bold">Branch: SHAHRAHEORANGI-KHI</p>
                    <div className="text-[10px] space-y-1 leading-normal">
                      <div>
                        <span className="text-slate-500">Title:</span>{" "}
                        <span className="text-slate-300 font-medium">MUHAMMAD HAMMAD SHAIKH</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Acc No:</span>{" "}
                        <span className="text-cyan-400 font-mono font-bold select-all">99430106993383</span>
                      </div>
                      <div>
                        <span className="text-slate-500">IBAN:</span>{" "}
                        <span className="text-slate-300 font-mono text-[9px] select-all">PK86MEZN0099430106993383</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-white/2 p-4.5 space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Smartphone size={16} className="text-emerald-400" />
                        <h4 className="text-xs font-bold text-white">SadaPay (Mobile Account)</h4>
                      </div>
                      <div className="text-[10px] leading-normal">
                        <div><span className="text-slate-500">Title:</span> <span className="text-slate-300">Muhammad Hammad Shaikh</span></div>
                        <div><span className="text-slate-500">No:</span> <span className="text-cyan-400 font-mono font-bold select-all">03453191638</span></div>
                      </div>
                    </div>

                    <div className="space-y-1 pt-1 border-t border-white/5">
                      <div className="flex items-center gap-2">
                        <Smartphone size={16} className="text-green-500" />
                        <h4 className="text-xs font-bold text-white">EasyPaisa (Mobile Account)</h4>
                      </div>
                      <div className="text-[10px] leading-normal">
                        <div><span className="text-slate-500">IBAN:</span> <span className="text-slate-300 font-mono text-[9px] select-all">PK79TMFB0000000065167686</span></div>
                        <div><span className="text-slate-500">No:</span> <span className="text-cyan-400 font-mono font-bold select-all">0343208659</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Section 4: Upload Receipt Screenshot */}
              <div className="space-y-4 pt-4 border-t border-white/8">
                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  Payment Details Verification
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">
                      Payment Transfer Method Used *
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#030c1c] px-4 py-3 text-xs text-slate-300 outline-none"
                    >
                      <option value="EasyPaisa">EasyPaisa</option>
                      <option value="SadaPay">SadaPay</option>
                      <option value="Meezan Bank">Meezan Bank</option>
                      <option value="JazzCash">JazzCash</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">
                      Sender Name / Account Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Your account title used to send fee"
                      className="w-full rounded-xl border border-white/10 bg-[#030c1c] px-4 py-3 text-xs text-slate-200 outline-none focus:border-cyan-400/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">
                    Transaction ID (TID) *
                  </label>
                  <input
                    type="text"
                    required
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    placeholder="Enter the receipt Transaction ID (TID)"
                    className="w-full rounded-xl border border-white/10 bg-[#030c1c] px-4 py-3 text-xs text-slate-200 outline-none focus:border-cyan-400/40"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">
                    Upload Payment Screenshot * (Max 1MB)
                  </label>
                  <div className="flex flex-col items-center justify-center border border-dashed border-white/10 rounded-xl p-6 bg-white/2 hover:bg-white/3 transition-colors">
                    {receiptImage ? (
                      <div className="relative w-full max-h-[220px] overflow-hidden rounded-lg flex flex-col items-center justify-center">
                        <img src={receiptImage} alt="Receipt Preview" className="max-h-[180px] object-contain rounded border border-white/10" />
                        <button
                          type="button"
                          onClick={() => setReceiptImage(null)}
                          className="mt-2 text-red-400 text-2xs hover:underline"
                        >
                          Change Screenshot
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center cursor-pointer w-full py-2 text-slate-500 hover:text-slate-300">
                        <Upload size={22} className="mb-2 text-cyan-400" />
                        <span className="text-xs font-bold text-slate-300">Click to upload or drag & drop your screenshot here</span>
                        <input type="file" accept="image/*" onChange={handleReceiptUpload} className="hidden" />
                      </label>
                    )}
                  </div>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-xs text-red-400">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-cyan-400 py-3.5 text-xs font-bold text-[#020B18] shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] cursor-pointer"
              >
                Submit Internship Application
                <ArrowRight size={14} />
              </button>
            </form>
          </div>
        ) : (
          /* Verification Screen */
          <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-10 backdrop-blur-xl text-center space-y-6 max-w-xl mx-auto">
            <div className="flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-500/15 border border-yellow-500/25">
                <Clock size={28} className="text-yellow-500 animate-pulse" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="font-display text-xl font-bold text-white">Application & Payment Pending Verification</h2>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
                Your application details and payment proof have been successfully uploaded. Our admin team will verify your payment (TID: <span className="text-cyan-400 font-mono font-semibold">{transactionId}</span>) and activate your workspace in 2-4 hours.
              </p>
            </div>

            <button
              onClick={() => router.push("/dashboard")}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-yellow-500 py-3.5 text-xs font-bold text-[#020B18] shadow-[0_0_20px_rgba(234,179,8,0.2)] transition-all hover:scale-[1.01] cursor-pointer"
            >
              Go to Dashboard
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
