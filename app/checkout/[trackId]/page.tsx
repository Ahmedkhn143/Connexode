"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Loader2, ArrowLeft, ShieldCheck, Wallet, ArrowRight, Upload, AlertCircle, Clock } from "lucide-react";
import { TRACKS, setPaymentStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const params = useParams();
  const trackId = params.trackId as string;

  const track = TRACKS.find((t) => t.id === trackId);
  const [method, setMethod] = useState<"easypaisa" | "jazzcash" | "manual">("easypaisa");
  
  // Checkout States
  const [mobileNumber, setMobileNumber] = useState("");
  const [senderName, setSenderName] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [receiptImage, setReceiptImage] = useState<string | null>(null);
  
  const [error, setError] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "countdown" | "success" | "pending_approval">("idle");
  const [timer, setTimer] = useState(30);

  // Price calculation
  const price = trackId === "track_001" ? 3500 : trackId === "track_002" ? 5000 : 4000;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (state === "countdown" && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (state === "countdown" && timer === 0) {
      handlePaymentComplete();
    }
    return () => clearInterval(interval);
  }, [state, timer]);

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

  // Handle receipt image selection
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

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (method === "manual") {
      if (!senderName.trim()) {
        setError("Sender Name is required");
        return;
      }
      if (!transactionId.trim()) {
        setError("Transaction ID (TID) is required");
        return;
      }
      if (!receiptImage) {
        setError("Receipt screenshot is required");
        return;
      }

      // Submit manual receipt
      try {
        const pending = JSON.parse(localStorage.getItem("connexode_manual_payments") || "[]");
        // Remove existing transaction for this track if any
        const filtered = pending.filter((p: any) => p.trackId !== trackId);
        filtered.push({
          id: `tx_${Math.random().toString(36).substring(2, 9)}`,
          trackId,
          trackTitle: track.title,
          userName: "Alex Johnson",
          userId: "usr_001",
          method: "manual",
          senderName,
          transactionId,
          receiptImage,
          price,
          status: "PENDING",
          submittedAt: new Date().toISOString(),
        });
        localStorage.setItem("connexode_manual_payments", JSON.stringify(filtered));
        setPaymentStatus(trackId, "PENDING_VERIFICATION");
        setState("pending_approval");
      } catch (err) {
        console.error(err);
      }
      return;
    }

    if (!mobileNumber) {
      setError("Mobile number is required");
      return;
    }

    if (!/^(03|00923|\+923)[0-9]{9}$/.test(mobileNumber)) {
      setError("Please enter a valid Pakistani mobile number (e.g. 03001234567)");
      return;
    }

    setState("sending");
    setTimeout(() => {
      setState("countdown");
      setTimer(30);
    }, 2000);
  };

  const handlePaymentComplete = () => {
    setPaymentStatus(trackId, "PAID");
    setState("success");
  };

  return (
    <div className="min-h-screen bg-[#020B18] text-slate-100 px-6 py-12 flex items-center justify-center relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-xl relative z-10 space-y-6">
        
        {/* Header link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft size={13} />
          Cancel and return
        </Link>

        {/* Step 1: Input details */}
        {state === "idle" && (
          <div className="rounded-2xl border border-white/8 bg-white/4 p-7 backdrop-blur-xl space-y-6">
            <div>
              <span className="rounded bg-cyan-400/10 border border-cyan-400/20 px-2 py-0.5 text-3xs font-extrabold text-cyan-400 uppercase">
                Secure checkout
              </span>
              <h1 className="font-display text-xl font-extrabold text-white mt-2">
                Enroll in {track.title}
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Unlock daily internship roadmaps, mentoring reviews, and verified certificates.
              </p>
            </div>

            {/* Price block */}
            <div className="flex justify-between items-center rounded-xl bg-white/3 border border-white/5 p-4.5">
              <span className="text-xs text-slate-400">Total Program Enrollment Fee</span>
              <span className="font-display text-lg font-black text-white">Rs. {price.toLocaleString()}</span>
            </div>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMethod("easypaisa");
                  setError("");
                }}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 rounded-xl py-2.5 border transition-all text-[11px] font-bold",
                  method === "easypaisa"
                    ? "bg-[#3EB149]/15 border-[#3EB149] text-[#3EB149]"
                    : "bg-white/4 border-white/8 text-slate-500 hover:text-slate-300"
                )}
              >
                <Wallet size={12} />
                EasyPaisa
              </button>
              <button
                type="button"
                onClick={() => {
                  setMethod("jazzcash");
                  setError("");
                }}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 rounded-xl py-2.5 border transition-all text-[11px] font-bold",
                  method === "jazzcash"
                    ? "bg-[#D9232A]/15 border-[#D9232A] text-[#D9232A]"
                    : "bg-white/4 border-white/8 text-slate-500 hover:text-slate-300"
                )}
              >
                <Wallet size={12} />
                JazzCash
              </button>
              <button
                type="button"
                onClick={() => {
                  setMethod("manual");
                  setError("");
                }}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 rounded-xl py-2.5 border transition-all text-[11px] font-bold",
                  method === "manual"
                    ? "bg-cyan-500/15 border-cyan-400 text-cyan-400"
                    : "bg-white/4 border-white/8 text-slate-500 hover:text-slate-300"
                )}
              >
                <Upload size={12} />
                Upload Receipt
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handlePay} className="space-y-4">
              
              {method !== "manual" ? (
                // Digital wallet forms
                <div>
                  <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">
                    {method === "easypaisa" ? "EasyPaisa" : "JazzCash"} Account Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="e.g. 03001234567"
                    className={cn(
                      "w-full rounded-xl border bg-white/5 px-4 py-3.5 text-xs text-slate-200 outline-none transition-all",
                      error ? "border-red-400/40 focus:ring-1 focus:ring-red-400/10" : "border-white/10 focus:border-cyan-400/40"
                    )}
                  />
                  {error && <p className="mt-1 text-[11px] text-red-400">{error}</p>}
                  <p className="mt-2 text-[10px] text-slate-500 leading-normal">
                    Make sure you have sufficient balance in your mobile wallet and that your device is unlocked to accept the auto PIN request.
                  </p>
                </div>
              ) : (
                // Manual upload form (internee.pk style)
                <div className="space-y-4">
                  <div className="rounded-xl border border-yellow-500/10 bg-yellow-500/5 p-4 text-[10px] text-slate-400 leading-normal">
                    💡 **Instructions:** Send **Rs. {price.toLocaleString()}** to our Mobile Account (EasyPaisa/JazzCash: **0300-1234567**), then upload the screenshot and enter transaction details below.
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
                      placeholder="e.g. Alex Johnson"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-200 outline-none"
                    />
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
                      placeholder="e.g. 8092178942"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-200 outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">
                      Upload Receipt Screenshot *
                    </label>
                    <div className="flex flex-col items-center justify-center border border-dashed border-white/10 rounded-xl p-4 bg-white/3">
                      {receiptImage ? (
                        <div className="relative w-full max-h-[160px] overflow-hidden rounded-lg flex items-center justify-center">
                          <img src={receiptImage} alt="Receipt Preview" className="max-h-[150px] object-contain rounded border border-white/10" />
                          <button
                            type="button"
                            onClick={() => setReceiptImage(null)}
                            className="absolute top-1 right-1 rounded-full bg-black/60 px-2 py-0.5 text-3xs text-white"
                          >
                            Change
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center cursor-pointer w-full py-4 text-slate-500 hover:text-slate-300">
                          <Upload size={20} className="mb-1 text-cyan-400" />
                          <span className="text-3xs font-semibold">Select image (Max 1MB)</span>
                          <input type="file" accept="image/*" onChange={handleReceiptUpload} className="hidden" />
                        </label>
                      )}
                    </div>
                  </div>
                  {error && <p className="mt-1 text-[11px] text-red-400">{error}</p>}
                </div>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-cyan-400 py-3.5 text-xs font-bold text-[#020B18] shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] cursor-pointer"
              >
                {method === "manual" ? "Submit Receipt Verification" : `Pay Rs. ${price.toLocaleString()}`}
                <ArrowRight size={14} />
              </button>
            </form>
          </div>
        )}

        {/* Step 2: USSD sending state */}
        {state === "sending" && (
          <div className="rounded-2xl border border-white/8 bg-white/4 p-10 backdrop-blur-xl text-center space-y-4.5">
            <div className="flex justify-center">
              <Loader2 size={36} className="text-cyan-400 animate-spin" />
            </div>
            <div className="space-y-2">
              <h2 className="font-display text-lg font-bold text-white">Sending Payment Prompt</h2>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                Communicating with the {method === "easypaisa" ? "EasyPaisa" : "JazzCash"} gateway. Please keep your mobile device nearby.
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Countdown USSD input verification */}
        {state === "countdown" && (
          <div className="rounded-2xl border border-white/8 bg-white/4 p-8 backdrop-blur-xl text-center space-y-6">
            <div className="flex justify-center">
              <div className="h-14 w-14 rounded-full border border-cyan-400/20 bg-cyan-400/10 flex items-center justify-center text-cyan-400 font-display text-lg font-black animate-pulse">
                {timer}s
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="font-display text-lg font-bold text-white">Authorize on Your Mobile</h2>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
                A pop-up has been pushed to your mobile device at <span className="font-bold text-slate-200">{mobileNumber}</span>. Please enter your account **PIN** to verify and approve.
              </p>
            </div>

            <div className="rounded-xl bg-white/2 border border-white/5 p-4 text-[10px] text-slate-500 leading-normal max-w-sm mx-auto">
              If the prompt does not appear, dial **\*786#** (for EasyPaisa) or **\*786#** (for JazzCash) to check your pending approvals.
            </div>

            <div className="flex gap-3 max-w-sm mx-auto">
              <button
                type="button"
                onClick={() => setState("idle")}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-2xs font-bold text-slate-400 hover:bg-white/8 hover:text-slate-200 transition-all cursor-pointer"
              >
                Reset Mobile Wallet
              </button>
              <button
                type="button"
                onClick={handlePaymentComplete}
                className="flex-1 rounded-xl bg-cyan-400 py-3 text-2xs font-bold text-[#020B18] transition-all hover:scale-[1.01] cursor-pointer"
              >
                Approve Manually
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Success confirmation screen */}
        {state === "success" && (
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-10 backdrop-blur-xl text-center space-y-6">
            <div className="flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/25">
                <CheckCircle2 size={28} className="text-emerald-400" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="font-display text-xl font-bold text-white">Enrollment Successful!</h2>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                Thank you! Your payment of Rs. {price.toLocaleString()} has been confirmed. Your virtual internship workspace has been successfully unlocked.
              </p>
            </div>

            <button
              onClick={() => router.push("/dashboard")}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-400 py-3.5 text-xs font-bold text-[#020B18] shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all hover:scale-[1.01] cursor-pointer"
            >
              Enter Internship Workspace
            </button>
          </div>
        )}

        {/* Step 5: Pending verification dashboard */}
        {state === "pending_approval" && (
          <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-10 backdrop-blur-xl text-center space-y-6">
            <div className="flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-500/15 border border-yellow-500/25">
                <Clock size={28} className="text-yellow-500 animate-pulse" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="font-display text-xl font-bold text-white">Verification Pending</h2>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                Your payment screenshot has been uploaded. Our admin team will verify the Transaction ID (TID): **{transactionId}** and unlock your internship dashboard in 2-4 hours.
              </p>
            </div>

            <button
              onClick={() => router.push("/dashboard")}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-yellow-500 py-3.5 text-xs font-bold text-[#020B18] shadow-[0_0_20px_rgba(234,179,8,0.2)] transition-all hover:scale-[1.01] cursor-pointer"
            >
              Go to Student Dashboard
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
