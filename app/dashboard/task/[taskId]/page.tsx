import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import InteractiveTaskLayout from "@/components/task/InteractiveTaskLayout";
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

      <InteractiveTaskLayout task={task} submission={submission} />
    </div>
  );
}

