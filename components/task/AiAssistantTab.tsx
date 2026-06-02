"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Sparkles, Code2, AlertCircle, Bot, User, CheckCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AiAssistantTabProps {
  taskId: string;
  taskTitle: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AiAssistantTab({ taskId, taskTitle }: AiAssistantTabProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hello! I am your AI Task Assistant. Ask me how to get started on **"${taskTitle}"** or paste code questions below!`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Code Audit States
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [auditResult, setAuditResult] = useState<string | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditError, setAuditError] = useState<string | null>(null);
  const [estimatedScore, setEstimatedScore] = useState<number | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "chat",
          taskId,
          message: userMsg,
          messages: messages.slice(1), // Exclude greeting
        }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        throw new Error(data.error || "No response");
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I had trouble connecting to the server. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const triggerAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubUrl || isAuditing) return;
    setAuditError(null);
    setAuditResult(null);
    setIsAuditing(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "audit",
          taskId,
          githubUrl,
          linkedinUrl: linkedinUrl || "https://linkedin.com/mock-post-checking",
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setAuditResult(data.audit);
        setEstimatedScore(data.score);
      } else {
        throw new Error(data.error || "Audit failed");
      }
    } catch (err: any) {
      setAuditError(err.message || "Failed to perform AI code audit");
    } finally {
      setIsAuditing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Assistant Chat Card */}
      <div className="flex flex-col rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl h-[450px]">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display flex items-center gap-2.5 text-lg font-bold text-white">
            <Sparkles size={18} className="text-cyan-400 animate-pulse" />
            AI Task Assistant
          </h2>
          <span className="rounded-md bg-cyan-400/10 px-2 py-0.5 text-2xs font-semibold text-cyan-400">
            Next-Gen Gemini Active
          </span>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-3.5 custom-scrollbar mb-4 text-sm">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "flex gap-3 max-w-[85%] rounded-xl p-3.5 leading-relaxed",
                msg.role === "user"
                  ? "ml-auto bg-cyan-500/10 border border-cyan-500/25 text-slate-200"
                  : "bg-white/4 border border-white/5 text-slate-300"
              )}
            >
              <div className="mt-0.5 shrink-0">
                {msg.role === "user" ? (
                  <User size={15} className="text-cyan-400" />
                ) : (
                  <Bot size={15} className="text-indigo-400" />
                )}
              </div>
              <div className="space-y-1 overflow-x-auto">
                {msg.content.startsWith("###") || msg.content.includes("```") ? (
                  // Simple markdown parsing fallback for nice aesthetics
                  <div className="prose prose-invert prose-xs text-xs whitespace-pre-wrap">
                    {msg.content}
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 max-w-[85%] rounded-xl p-3.5 bg-white/4 border border-white/5 text-slate-300">
              <Bot size={15} className="text-indigo-400 animate-bounce mt-0.5" />
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500" style={{ animationDelay: "0ms" }} />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500" style={{ animationDelay: "150ms" }} />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about components, routes, CSS transitions..."
            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/10"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="flex items-center justify-center rounded-xl bg-cyan-400 px-4 text-slate-900 transition-all hover:scale-[1.03] active:scale-100 disabled:opacity-50"
          >
            <Send size={14} />
          </button>
        </form>
      </div>

      {/* Real-time Code Auditor Card */}
      <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl">
        <h2 className="font-display mb-2 flex items-center gap-2.5 text-lg font-bold text-white">
          <Code2 size={18} className="text-teal-400" />
          Pre-Check Code Auditor
        </h2>
        <p className="mb-4 text-xs text-slate-400 leading-relaxed">
          Test your deliverables! Paste your GitHub repo link to trigger our AI reviewer system.
        </p>

        <form onSubmit={triggerAudit} className="space-y-4">
          <div>
            <label htmlFor="audit-github" className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">
              GitHub URL
            </label>
            <input
              id="audit-github"
              type="url"
              required
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/your-username/repo-name"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-teal-400/40 focus:ring-1 focus:ring-teal-400/10"
            />
          </div>

          <button
            type="submit"
            disabled={isAuditing || !githubUrl}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-400 py-3 text-xs font-bold text-[#020B18] shadow-[0_0_15px_rgba(20,184,166,0.15)] transition-all hover:scale-[1.01] hover:shadow-[0_0_25px_rgba(20,184,166,0.25)] disabled:opacity-50"
          >
            {isAuditing ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Auditing Repository...
              </>
            ) : (
              <>
                <Sparkles size={13} />
                Run AI Code Pre-Check
              </>
            )}
          </button>
        </form>

        {/* Audit Results Panel */}
        {auditError && (
          <div className="mt-4 flex gap-2.5 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-xs text-red-400">
            <AlertCircle size={15} className="shrink-0" />
            <p>{auditError}</p>
          </div>
        )}

        {auditResult && (
          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between rounded-xl border border-teal-500/20 bg-teal-500/10 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <CheckCircle size={16} className="text-teal-400" />
                <span className="text-xs font-bold text-white">AI Evaluation Status</span>
              </div>
              {estimatedScore !== null && (
                <div className="text-right">
                  <span className="text-xs text-slate-400">Estimated Grade: </span>
                  <span className="text-sm font-extrabold text-teal-400">{estimatedScore}/100</span>
                </div>
              )}
            </div>

            <div className="rounded-xl border border-white/5 bg-white/2 p-4 text-xs text-slate-300 font-mono overflow-x-auto max-h-[300px] custom-scrollbar whitespace-pre-wrap leading-relaxed">
              {auditResult}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
