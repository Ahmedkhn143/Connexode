"use client";

import { useState } from "react";
import { 
  GitPullRequest, 
  Sparkles, 
  Terminal, 
  ShieldAlert, 
  Bug, 
  Zap, 
  Check, 
  ChevronRight, 
  RefreshCw, 
  Code2, 
  MessageSquareText,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_REVIEWS = [
  {
    score: 87,
    bugs: 2,
    warnings: 1,
    optimizations: 3,
    overview: "Your pull request has been evaluated. We found some high-priority bugs regarding state dependencies and some missing safety checks in your API routes. Styling and design are outstanding.",
    diffs: [
      {
        fileName: "app/api/submissions/route.ts",
        language: "typescript",
        description: "Fixed unsafe SQL query construction that could lead to SQL injection vulnerabilities. Replaced it with Prisma parameterized inputs.",
        lines: [
          { type: "normal", content: "export async function POST(request: Request) {", num: 12 },
          { type: "normal", content: "  const { userId, taskId, codeUrl } = await request.json();", num: 13 },
          { type: "delete", content: "  // UNSAFE: Direct interpolation", num: 14 },
          { type: "delete", content: "  const query = `SELECT * FROM submissions WHERE userId = '${userId}'`;", num: 15 },
          { type: "delete", content: "  const result = await db.$queryRawUnsafe(query);", num: 16 },
          { type: "add", content: "  // SAFE: Parameterized Prisma database query", num: 14 },
          { type: "add", content: "  const result = await db.submission.findMany({", num: 15 },
          { type: "add", content: "    where: { userId, taskId }", num: 16 },
          { type: "add", content: "  });", num: 17 },
          { type: "normal", content: "  return NextResponse.json(result);", num: 18 },
          { type: "normal", content: "}", num: 19 }
        ]
      },
      {
        fileName: "components/dashboard/StreakMeter.tsx",
        language: "typescript",
        description: "Fixed React hydration mismatch warning and infinite loop caused by missing useEffect dependency array.",
        lines: [
          { type: "normal", content: "export function StreakMeter() {", num: 28 },
          { type: "delete", content: "  const [days, setDays] = useState(localStorage.getItem('streak') || 0);", num: 29 },
          { type: "delete", content: "  useEffect(() => {", num: 30 },
          { type: "delete", content: "    setDays(Number(localStorage.getItem('streak')) || 0);", num: 31 },
          { type: "delete", content: "  }); // Missing dependency array", num: 32 },
          { type: "add", content: "  const [days, setDays] = useState(0);", num: 29 },
          { type: "add", content: "  useEffect(() => {", num: 30 },
          { type: "add", content: "    setDays(Number(localStorage.getItem('streak')) || 0);", num: 31 },
          { type: "add", content: "  }, []); // Safe dependency array on mount", num: 32 },
          { type: "normal", content: "  return <div className=\"text-cyan-400\">{days} Days Streak</div>;", num: 33 }
        ]
      }
    ]
  }
];

export default function AiReviewerDemo() {
  const [prUrl, setPrUrl] = useState("");
  const [error, setError] = useState("");
  const [reviewState, setReviewState] = useState<"idle" | "loading" | "resolved">("idle");
  const [progressMsg, setProgressMsg] = useState("");
  const [selectedDiff, setSelectedDiff] = useState(0);

  const handleAudit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!prUrl.trim()) {
      setError("Please enter a Pull Request URL.");
      return;
    }

    if (!prUrl.includes("github.com") || !prUrl.includes("/pull/")) {
      setError("Please enter a valid GitHub Pull Request URL (e.g. github.com/owner/repo/pull/1)");
      return;
    }

    setReviewState("loading");
    
    // Fake loading steps simulation
    const steps = [
      "Connecting to GitHub API...",
      "Cloning diff modifications...",
      "Parsing AST nodes...",
      "Analyzing against security rulesets (OWASP)...",
      "Running AI generative code audit...",
      "Generating health metrics..."
    ];

    let currentStep = 0;
    setProgressMsg(steps[0]);

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setProgressMsg(steps[currentStep]);
      } else {
        clearInterval(interval);
        setReviewState("resolved");
      }
    }, 800);
  };

  const resetReview = () => {
    setPrUrl("");
    setReviewState("idle");
  };

  const reviewData = MOCK_REVIEWS[0];

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-4 py-8">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-400 border border-cyan-500/20 mb-3 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <Sparkles size={12} className="animate-pulse" />
            AI Labs
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight font-display">
            Connexode AI Code Reviewer
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Analyze your GitHub Pull Requests instantly for security, styling, and structural bugs.
          </p>
        </div>
      </div>

      {reviewState === "idle" && (
        <div className="rounded-2xl border border-white/10 bg-white/3 backdrop-blur-xl p-8 max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan-400/10 rounded-full blur-2xl" />
          <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <GitPullRequest className="text-cyan-400" size={18} />
            Submit Pull Request
          </h2>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
            Provide a public GitHub pull request link to automatically run our static analysis engines and Gemini audit models.
          </p>

          <form onSubmit={handleAudit} className="space-y-4">
            <div>
              <label className="block text-2xs uppercase tracking-wider text-slate-500 font-semibold mb-2">
                GitHub PR URL
              </label>
              <input
                type="url"
                value={prUrl}
                onChange={(e) => setPrUrl(e.target.value)}
                placeholder="https://github.com/Ahmedkhn143/Connexode/pull/1"
                className={cn(
                  "w-full rounded-xl border bg-black/40 px-4 py-3.5 text-xs text-slate-200 placeholder-slate-600 outline-none transition-all",
                  "focus:ring-2 focus:ring-cyan-500/20",
                  error ? "border-red-500/40 focus:border-red-500/50" : "border-white/10 focus:border-cyan-400/40"
                )}
              />
              {error && (
                <p className="mt-2 flex items-center gap-1.5 text-xs text-red-400">
                  <AlertCircle size={12} />
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 py-3.5 text-xs font-bold text-[#020B18] shadow-[0_0_20px_rgba(0,245,255,0.2)] hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(0,245,255,0.3)] transition-all cursor-pointer"
            >
              <Sparkles size={14} />
              Submit for AI Review
            </button>
          </form>
        </div>
      )}

      {reviewState === "loading" && (
        <div className="rounded-2xl border border-white/10 bg-white/3 backdrop-blur-xl p-12 max-w-xl mx-auto text-center space-y-6 shadow-2xl">
          <div className="flex justify-center">
            <div className="relative flex items-center justify-center">
              {/* Spinning outer rings */}
              <div className="h-16 w-16 rounded-full border-4 border-cyan-400/10 border-t-cyan-400 animate-spin" />
              <div className="absolute h-10 w-10 rounded-full border-4 border-teal-400/10 border-b-teal-400 animate-spin animate-duration-1000" />
              <Sparkles className="absolute text-cyan-400 animate-pulse" size={20} />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-white text-md">AI Analysis in Progress</h3>
            <p className="text-xs text-slate-400 font-mono select-none animate-pulse">
              {progressMsg}
            </p>
          </div>

          <div className="bg-black/30 border border-white/5 rounded-lg p-3 max-w-xs mx-auto flex items-center justify-center gap-2.5">
            <Terminal size={14} className="text-cyan-400" />
            <span className="text-[10px] text-slate-500 font-mono tracking-tight">gemini-2.5-flash-pipeline</span>
          </div>
        </div>
      )}

      {reviewState === "resolved" && (
        <div className="grid gap-8 lg:grid-cols-3 items-start animate-fade-in">
          {/* Sidebar Panels (Score & Summary) */}
          <div className="space-y-6 lg:col-span-1">
            {/* Score Ring Panel */}
            <div className="rounded-2xl border border-white/10 bg-white/3 backdrop-blur-xl p-6 shadow-xl relative overflow-hidden flex flex-col items-center text-center">
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl" />
              
              <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 mb-6">
                Code Health Index
              </h3>

              <div className="relative flex items-center justify-center mb-4">
                <svg className="w-36 h-36 transform -rotate-90">
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    stroke="rgba(255,255,255,0.03)"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    stroke="url(#cyanGradient)"
                    strokeWidth="10"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 60}
                    strokeDashoffset={2 * Math.PI * 60 * (1 - reviewData.score / 100)}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#14b8a6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-black text-white">{reviewData.score}</span>
                  <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">Passed</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed px-2">
                Great job! Code matches general enterprise lint standards with minor structural changes.
              </p>
            </div>

            {/* Bugs List Panel */}
            <div className="rounded-2xl border border-white/10 bg-white/3 backdrop-blur-xl p-6 shadow-xl space-y-4">
              <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
                Analysis Summary
              </h3>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-red-500/10 bg-red-500/5 p-3 text-center space-y-1">
                  <Bug className="text-red-400 mx-auto" size={16} />
                  <span className="block text-lg font-black text-white">{reviewData.bugs}</span>
                  <span className="block text-[8px] uppercase font-bold text-slate-500">Bugs</span>
                </div>
                <div className="rounded-xl border border-yellow-500/10 bg-yellow-500/5 p-3 text-center space-y-1">
                  <ShieldAlert className="text-yellow-400 mx-auto" size={16} />
                  <span className="block text-lg font-black text-white">{reviewData.warnings}</span>
                  <span className="block text-[8px] uppercase font-bold text-slate-500">Alerts</span>
                </div>
                <div className="rounded-xl border border-teal-500/10 bg-teal-500/5 p-3 text-center space-y-1">
                  <Zap className="text-teal-400 mx-auto" size={16} />
                  <span className="block text-lg font-black text-white">{reviewData.optimizations}</span>
                  <span className="block text-[8px] uppercase font-bold text-slate-500">Speedups</span>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4 space-y-3">
                <div className="flex items-start gap-2.5 text-xs">
                  <div className="mt-0.5 rounded bg-red-400/10 p-1 text-red-400">
                    <Bug size={12} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-300">SQL Injection Threat</h4>
                    <p className="text-[10px] text-slate-500 leading-tight">Unsafe inline raw query inside `submissions` api route.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 text-xs">
                  <div className="mt-0.5 rounded bg-yellow-400/10 p-1 text-yellow-400">
                    <ShieldAlert size={12} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-300">Infinite Render Loop</h4>
                    <p className="text-[10px] text-slate-500 leading-tight">StreakMeter components trigger constant re-renders.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Code Diff & Chat (Audit Results) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview / Conversational AI */}
            <div className="rounded-2xl border border-white/10 bg-white/3 backdrop-blur-xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/10 border border-cyan-400/20 text-cyan-400">
                  <MessageSquareText size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">AI Explainer Chat</h4>
                  <p className="text-[10px] text-slate-500">Gemini-Powered Workspace Audit</p>
                </div>
              </div>

              <div className="rounded-xl border border-cyan-500/10 bg-cyan-500/5 p-4 text-xs text-slate-300 leading-relaxed border-l-2 border-l-cyan-400">
                {reviewData.overview}
              </div>
            </div>

            {/* Code Diff Interface */}
            <div className="rounded-2xl border border-white/10 bg-white/3 backdrop-blur-xl shadow-xl overflow-hidden">
              <div className="border-b border-white/5 bg-white/1 px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Code2 size={14} className="text-cyan-400" />
                  Suggested Code Fixes
                </span>
                
                {/* File selectors tabs */}
                <div className="flex gap-2">
                  {reviewData.diffs.map((diff, idx) => (
                    <button
                      key={diff.fileName}
                      onClick={() => setSelectedDiff(idx)}
                      className={cn(
                        "rounded px-3 py-1.5 text-[10px] font-bold border outline-none transition-all cursor-pointer",
                        selectedDiff === idx
                          ? "bg-cyan-400/10 text-cyan-400 border-cyan-400/30"
                          : "bg-transparent text-slate-500 border-white/5 hover:text-slate-300 hover:border-white/10"
                      )}
                    >
                      {diff.fileName.split("/").pop()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Code Diff Display */}
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono select-none">
                    {reviewData.diffs[selectedDiff].fileName}
                  </span>
                  <p className="text-xs text-slate-400">
                    {reviewData.diffs[selectedDiff].description}
                  </p>
                </div>

                <div className="rounded-xl border border-white/5 bg-black/40 overflow-x-auto font-mono text-xs select-text leading-relaxed">
                  <div className="py-3 min-w-[500px]">
                    {reviewData.diffs[selectedDiff].lines.map((line, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "flex items-stretch px-4 py-0.5 border-l-2",
                          line.type === "delete"
                            ? "bg-red-500/10 border-l-red-500 text-red-200"
                            : line.type === "add"
                            ? "bg-emerald-500/10 border-l-emerald-500 text-emerald-200"
                            : "border-l-transparent text-slate-400"
                        )}
                      >
                        <span className="w-8 select-none text-[10px] text-slate-600 border-r border-white/5 mr-4 text-right pr-2">
                          {line.num}
                        </span>
                        <span className="whitespace-pre">
                          {line.type === "delete" ? "-" : line.type === "add" ? "+" : " "} {line.content}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex justify-end gap-3">
              <button
                onClick={resetReview}
                className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/2 px-5 py-3 text-xs font-bold text-slate-300 hover:bg-white/5 hover:text-white transition-all cursor-pointer"
              >
                <RefreshCw size={12} />
                Audit New Pull Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
