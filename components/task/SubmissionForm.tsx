"use client";

import { useState } from "react";
import { ExternalLink, Globe, Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
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

export default function SubmissionForm({ taskId, taskTitle, currentStatus }: SubmissionFormProps) {
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [errors, setErrors] = useState<{ github?: string; live?: string }>({});
  const [status, setStatus] = useState<"idle" | "loading" | "submitted">(
    currentStatus === "SUBMITTED" || currentStatus === "APPROVED" ? "submitted" : "idle"
  );

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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("submitted");
  };

  if (status === "submitted") {
    return (
      <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/8 p-8 text-center backdrop-blur-xl">
        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/15">
            <CheckCircle2 size={32} className="text-emerald-400" />
          </div>
        </div>
        <h3 className="font-display mb-2 text-xl font-bold text-white">Task Submitted!</h3>
        <p className="text-sm text-slate-400">
          Your submission is now <span className="font-semibold text-emerald-400">Pending Review</span>. A mentor will review it within 24 hours and provide feedback.
        </p>
        <div className="mt-6 rounded-xl border border-white/8 bg-white/4 px-5 py-3 text-left text-sm">
          <p className="font-semibold text-slate-300">{taskTitle}</p>
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-400"
            >
              <ExternalLink size={11} /> {githubUrl}
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 hover:text-teal-400"
            >
              <Globe size={11} /> {liveUrl}
            </a>
          )}
        </div>
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
