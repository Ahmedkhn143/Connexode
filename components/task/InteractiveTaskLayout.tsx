"use client";

import { useState } from "react";
import { FileText, Sparkles } from "lucide-react";
import TaskInstructions from "@/components/task/TaskInstructions";
import AiAssistantTab from "@/components/task/AiAssistantTab";
import SubmissionForm from "@/components/task/SubmissionForm";
import { cn } from "@/lib/utils";

interface InteractiveTaskLayoutProps {
  task: any;
  submission: any;
}

export default function InteractiveTaskLayout({ task, submission }: InteractiveTaskLayoutProps) {
  const [activeTab, setActiveTab] = useState<"instructions" | "ai">("instructions");

  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      {/* Left Column — Tabs for Instructions & AI Assistant */}
      <div className="space-y-4">
        {/* Tab Headers */}
        <div className="flex gap-2 rounded-xl border border-white/8 bg-white/4 p-1 backdrop-blur-xl">
          <button
            onClick={() => setActiveTab("instructions")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold transition-all",
              activeTab === "instructions"
                ? "bg-cyan-400 text-[#020B18]"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            )}
          >
            <FileText size={14} />
            Task Instructions
          </button>
          <button
            onClick={() => setActiveTab("ai")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold transition-all",
              activeTab === "ai"
                ? "bg-cyan-400 text-[#020B18]"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            )}
          >
            <Sparkles size={14} />
            AI Task Assistant
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "instructions" ? (
          <TaskInstructions task={task} />
        ) : (
          <AiAssistantTab taskId={task.id} taskTitle={task.title} />
        )}
      </div>

      {/* Right Column — Submission Panel & Mentor Feedback */}
      <div className="space-y-4">
        <SubmissionForm
          taskId={task.id}
          taskTitle={task.title}
          currentStatus={submission?.status ?? task.status}
        />

        {/* Mentor feedback (if reviewed) */}
        {submission?.feedback && (
          <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/5 p-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Mentor Feedback
            </p>
            <p className="text-sm leading-relaxed text-slate-300 italic">
              &quot;{submission.feedback}&quot;
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
