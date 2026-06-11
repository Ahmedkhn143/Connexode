"use client";

import TaskInstructions from "@/components/task/TaskInstructions";
import SubmissionForm from "@/components/task/SubmissionForm";

interface InteractiveTaskLayoutProps {
  task: any;
  submission: any;
}

export default function InteractiveTaskLayout({ task, submission }: InteractiveTaskLayoutProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      {/* Left Column — Task Instructions */}
      <div className="space-y-4">
        <TaskInstructions task={task} />
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
