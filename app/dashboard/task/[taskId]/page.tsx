import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import TaskInstructions from "@/components/task/TaskInstructions";
import SubmissionForm from "@/components/task/SubmissionForm";
import { WEEKLY_TASKS, SUBMISSIONS } from "@/lib/mock-data";

interface PageProps {
  params: Promise<{ taskId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { taskId } = await params;
  const task = WEEKLY_TASKS.find((t) => t.id === taskId);
  return {
    title: task ? `${task.title} — Connexode` : "Task — Connexode",
  };
}

export async function generateStaticParams() {
  return WEEKLY_TASKS.map((t) => ({ taskId: t.id }));
}

export default async function TaskPage({ params }: PageProps) {
  const { taskId } = await params;
  const task = WEEKLY_TASKS.find((t) => t.id === taskId);
  if (!task) notFound();

  const submission = SUBMISSIONS.find((s) => s.taskId === taskId);

  return (
    <div className="mx-auto max-w-4xl">
      {/* Breadcrumb */}
      <Link
        href="/dashboard"
        className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-cyan-400"
      >
        <ChevronLeft size={14} />
        Back to Dashboard
      </Link>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Left — Instructions */}
        <TaskInstructions task={task} />

        {/* Right — Submission */}
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
                "{submission.feedback}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
