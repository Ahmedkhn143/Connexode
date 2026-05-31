import { Clock, CheckSquare, FileText } from "lucide-react";
import { type WeeklyTask } from "@/lib/mock-data";

interface TaskInstructionsProps {
  task: WeeklyTask;
}

export default function TaskInstructions({ task }: TaskInstructionsProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-white/8 bg-white/4 p-7 backdrop-blur-xl">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-400">
            Week {task.weekNo} · Day {task.dayNo}
          </span>
          <span className="flex items-center gap-1.5 rounded-lg border border-white/8 bg-white/5 px-3 py-1 text-xs text-slate-400">
            <Clock size={11} />~{task.estimatedHours} hours
          </span>
          <span className="rounded-lg border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs font-semibold text-yellow-400">
            {task.points} pts
          </span>
        </div>

        <h1 className="font-display mb-3 text-2xl font-extrabold text-white lg:text-3xl">
          {task.title}
        </h1>
        <p className="text-slate-400 leading-relaxed">{task.taskDetails}</p>
      </div>

      {/* Instructions */}
      <div className="rounded-2xl border border-white/8 bg-white/4 p-7 backdrop-blur-xl">
        <h2 className="font-display mb-5 flex items-center gap-2.5 text-lg font-bold text-white">
          <FileText size={18} className="text-cyan-400" />
          Step-by-Step Instructions
        </h2>

        <ol className="space-y-4">
          {task.instructions.map((instruction, i) => (
            <li key={i} className="flex gap-4">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-400/15 text-xs font-bold text-cyan-400">
                {i + 1}
              </div>
              <p className="pt-0.5 text-sm leading-relaxed text-slate-300">{instruction}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Deliverables Reminder */}
      <div className="rounded-2xl border border-teal-400/15 bg-teal-400/5 p-5">
        <p className="flex items-center gap-2 text-sm font-semibold text-teal-400">
          <CheckSquare size={15} />
          Deliverables required for this task:
        </p>
        <ul className="mt-3 space-y-1.5 text-sm text-slate-400">
          <li className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-teal-400" />
            A public GitHub repository with your code
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-teal-400" />
            A live deployment URL (Vercel, Netlify, or similar)
          </li>
        </ul>
      </div>
    </div>
  );
}
