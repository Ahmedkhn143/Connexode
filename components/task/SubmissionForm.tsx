"use client";

import { useState, useEffect } from "react";
import { ExternalLink, Globe, Send, CheckCircle2, Loader2, AlertCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubmissionFormProps {
  taskId: string;
  taskTitle: string;
  currentStatus: string; // accepts both SubmissionStatus and TaskStatus
}

function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

const LinkedinIcon = ({ size = 14, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

export default function SubmissionForm({ taskId, taskTitle, currentStatus }: SubmissionFormProps) {
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [errors, setErrors] = useState<{ github?: string; live?: string; linkedin?: string }>({});
  const [status, setStatus] = useState<"idle" | "loading" | "submitted">(
    currentStatus === "SUBMITTED" || currentStatus === "APPROVED" ? "submitted" : "idle"
  );
  
  // AI pre-check states
  const [aiScore, setAiScore] = useState<number | null>(null);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);

  // Load existing submission if any (including localStorage items)
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const localSubs = JSON.parse(localStorage.getItem("connexode_custom_submissions") || "[]");
        const found = localSubs.find((s: any) => s.taskId === taskId);
        if (found) {
          setGithubUrl(found.githubUrl || "");
          setLiveUrl(found.liveUrl || "");
          setLinkedinUrl(found.linkedinUrl || "");
          setAiScore(found.aiScore || null);
          setAiFeedback(found.aiFeedback || null);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [taskId]);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!githubUrl) {
      newErrors.github = "GitHub URL is required";
    } else if (!isValidUrl(githubUrl)) {
      newErrors.github = "Please enter a valid URL";
    } else if (!githubUrl.includes("github.com")) {
      newErrors.github = "Must be a github.com URL";
    }
    if (liveUrl && !isValidUrl(liveUrl)) {
      newErrors.live = "Please enter a valid URL";
    }
    if (!linkedinUrl) {
      newErrors.linkedin = "LinkedIn URL is required";
    } else if (!isValidUrl(linkedinUrl)) {
      newErrors.linkedin = "Please enter a valid URL";
    } else if (!linkedinUrl.includes("linkedin.com")) {
      newErrors.linkedin = "Must be a linkedin.com URL";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");

    let scoreVal = null;
    let auditVal = null;

    // Trigger real-time AI code auditor API
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "audit",
          taskId,
          githubUrl,
          liveUrl,
          linkedinUrl,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        scoreVal = data.score;
        auditVal = data.audit;
        setAiScore(data.score);
        setAiFeedback(data.audit);
      }
    } catch (err) {
      console.error("AI Audit Error:", err);
    }
    
    // Save to local storage for demo mock persist
    try {
      const submissions = JSON.parse(localStorage.getItem("connexode_custom_submissions") || "[]");
      // Remove old submission for same task if exists
      const filtered = submissions.filter((s: any) => s.taskId !== taskId);
      filtered.push({
        id: `sub_${Math.random().toString(36).substring(2, 9)}`,
        taskId,
        githubUrl,
        liveUrl,
        linkedinUrl,
        status: "PENDING",
        submittedAt: new Date().toISOString(),
        aiScore: scoreVal,
        aiFeedback: auditVal
      });
      localStorage.setItem("connexode_custom_submissions", JSON.stringify(filtered));
    } catch (e) {
      console.error(e);
    }
    
    setStatus("submitted");
  };

  if (status === "submitted") {
    return (
      <div className="space-y-4">
        <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/8 p-6 text-center backdrop-blur-xl">
          <div className="mb-3 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400/15">
              <CheckCircle2 size={24} className="text-emerald-400" />
            </div>
          </div>
          <h3 className="font-display mb-1.5 text-lg font-bold text-white">Task Submitted!</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Your submission is now <span className="font-semibold text-emerald-400">Pending Review</span>. A mentor will review it within 24 hours.
          </p>
          <div className="mt-4 rounded-xl border border-white/8 bg-white/4 px-4 py-3 text-left text-xs space-y-1">
            <p className="font-semibold text-slate-300 mb-1">{taskTitle}</p>
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-slate-500 hover:text-cyan-400"
              >
                <ExternalLink size={10} /> {githubUrl}
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-slate-500 hover:text-teal-400"
              >
                <Globe size={10} /> {liveUrl}
              </a>
            )}
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-slate-500 hover:text-blue-400"
              >
                <LinkedinIcon size={10} /> {linkedinUrl}
              </a>
            )}
          </div>
        </div>

        {/* AI Pre-Check Audit Panel */}
        {aiFeedback && (
          <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Sparkles size={13} className="text-indigo-400 animate-pulse" />
                AI Pre-Check Audit
              </span>
              {aiScore && (
                <span className="rounded-md bg-indigo-500/15 px-2 py-0.5 text-2xs font-extrabold text-indigo-400">
                  Pre-Check Score: {aiScore}/100
                </span>
              )}
            </div>
            <div className="text-2xs text-slate-400 leading-relaxed max-h-[220px] overflow-y-auto custom-scrollbar font-mono whitespace-pre-wrap">
              {aiFeedback}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/8 bg-white/4 p-7 backdrop-blur-xl">
      <h2 className="font-display mb-6 flex items-center gap-2.5 text-lg font-bold text-white">
        <Send size={18} className="text-cyan-400" />
        Submit Your Work
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input type="hidden" name="taskId" value={taskId} />
        {/* GitHub URL */}
        <div>
          <label
            htmlFor="github-url"
            className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300"
          >
            <ExternalLink size={14} className="text-slate-500" />
            GitHub Repository URL
            <span className="text-red-400">*</span>
          </label>
          <input
            id="github-url"
            type="url"
            value={githubUrl}
            onChange={(e) => {
              setGithubUrl(e.target.value);
              if (errors.github) setErrors((prev) => ({ ...prev, github: undefined }));
            }}
            placeholder="https://github.com/your-username/your-repo"
            className={cn(
              "w-full rounded-xl border bg-white/5 px-4 py-3.5 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all",
              "focus:ring-2",
              errors.github
                ? "border-red-400/40 focus:border-red-400/60 focus:ring-red-400/15"
                : "border-white/10 focus:border-cyan-400/40 focus:ring-cyan-400/15"
            )}
          />
          {errors.github && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
              <AlertCircle size={11} /> {errors.github}
            </p>
          )}
          <p className="mt-2 text-xs text-slate-500">
            Mentors review this GitHub link to check your code quality.
          </p>
        </div>

        {/* Live URL */}
        <div>
          <label
            htmlFor="live-url"
            className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300"
          >
            <Globe size={14} className="text-slate-500" />
            Live Demo URL
            <span className="ml-1 text-xs text-slate-600">(optional)</span>
          </label>
          <input
            id="live-url"
            type="url"
            value={liveUrl}
            onChange={(e) => {
              setLiveUrl(e.target.value);
              if (errors.live) setErrors((prev) => ({ ...prev, live: undefined }));
            }}
            placeholder="https://your-project.vercel.app"
            className={cn(
              "w-full rounded-xl border bg-white/5 px-4 py-3.5 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all",
              "focus:ring-2",
              errors.live
                ? "border-red-400/40 focus:border-red-400/60 focus:ring-red-400/15"
                : "border-white/10 focus:border-teal-400/40 focus:ring-teal-400/15"
            )}
          />
          {errors.live && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
              <AlertCircle size={11} /> {errors.live}
            </p>
          )}
        </div>

        {/* LinkedIn Post URL */}
        <div>
          <label
            htmlFor="linkedin-url"
            className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300"
          >
            <LinkedinIcon size={14} className="text-[#0A66C2]" />
            LinkedIn Post URL
          </label>
          <input
            id="linkedin-url"
            type="url"
            value={linkedinUrl}
            onChange={(e) => {
              setLinkedinUrl(e.target.value);
              if (errors.linkedin) setErrors((prev) => ({ ...prev, linkedin: undefined }));
            }}
            placeholder="https://www.linkedin.com/posts/your-activity-id"
            className={cn(
              "w-full rounded-xl border bg-white/5 px-4 py-3.5 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all",
              "focus:ring-2",
              errors.linkedin
                ? "border-red-400/40 focus:border-red-400/60 focus:ring-red-400/15"
                : "border-white/10 focus:border-[#0A66C2]/40 focus:ring-[#0A66C2]/15"
            )}
          />
          {errors.linkedin && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
              <AlertCircle size={11} /> {errors.linkedin}
            </p>
          )}
          <p className="mt-2 text-xs text-slate-500">
            Submit your learning post on LinkedIn. Mentors will verify and approve the link.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 py-4 text-sm font-bold text-[#020B18] shadow-[0_0_20px_rgba(0,245,255,0.25)] transition-all hover:scale-[1.01] hover:shadow-[0_0_35px_rgba(0,245,255,0.4)] disabled:opacity-70 disabled:scale-100"
        >
          {status === "loading" ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Submitting…
            </>
          ) : (
            <>
              <Send size={16} className="transition-transform group-hover:translate-x-0.5" />
              Submit Task for Review
            </>
          )}
        </button>

        <p className="text-center text-xs text-slate-600">
          Your submission will be reviewed by a mentor within 24 hours.
        </p>
      </form>
    </div>
  );
}
