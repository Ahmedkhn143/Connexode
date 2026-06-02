import Link from "next/link";
import { CheckCircle2, Clock, Lock, Send, ChevronRight } from "lucide-react";
import { WEEKLY_TASKS, MOCK_USER, type TaskStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<
  TaskStatus,
  { label: string; color: string; bg: string; border: string; Icon: React.ComponentType<{ size?: number; className?: string }> }
> = {
  APPROVED:    { label: "Approved",     color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20", Icon: CheckCircle2 },
  SUBMITTED:   { label: "Pending Review", color: "text-blue-400",  bg: "bg-blue-400/10",   border: "border-blue-400/20",   Icon: Send },
  IN_PROGRESS: { label: "In Progress",  color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/20", Icon: Clock },
  LOCKED:      { label: "Locked",       color: "text-slate-600",  bg: "bg-white/4",       border: "border-white/8",       Icon: Lock },
};

interface TaskListProps {
  weekNo?: number;
}

export default function TaskList({ weekNo }: TaskListProps) {
  const activeWeek = weekNo ?? MOCK_USER.currentWeek;
  const tasks = WEEKLY_TASKS.filter(
    (t) => t.weekNo === activeWeek && t.trackId === MOCK_USER.enrolledTrackId
  );
  const completedCount = tasks.filter((t) => t.status === "APPROVED").length;

  if (!tasks.length) {
    return (
      <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-white">
            Week {activeWeek} — Day-by-Day Tasks
          </h2>
          <span className="text-xs text-slate-500">0/0 completed</span>
        </div>
        <div className="rounded-xl border border-white/6 bg-white/4 p-4 text-sm text-slate-400">
          Tasks for this week will unlock soon. Check the 8-week roadmap to preview
          what is coming next.
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-white">
          Week {activeWeek} — Day-by-Day Tasks
        </h2>
        <span className="text-xs text-slate-500">
          {completedCount}/{tasks.length} completed
        </span>
      </div>

      <div className="space-y-3">
        {tasks.map((task, i) => {
          const cfg = STATUS_CONFIG[task.status];
          const StatusIcon = cfg.Icon;
          const isClickable = task.status !== "LOCKED";

          const CardContent = (
            <div
              className={cn(
                "group relative flex items-center gap-4 rounded-xl border p-4 transition-all duration-200",
                cfg.border,
                isClickable
                  ? "hover:bg-white/6 hover:border-opacity-60 cursor-pointer"
                  : "opacity-60 cursor-not-allowed",
                task.status === "IN_PROGRESS" &&
                  "ring-1 ring-yellow-400/20 shadow-[0_0_20px_rgba(234,179,8,0.06)]"
              )}
            >
              {/* Day badge */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/6 text-sm font-bold text-slate-300">
                D{task.dayNo}
              </div>

              {/* Task info */}
              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    "text-sm font-semibold",
                    isClickable ? "text-slate-100" : "text-slate-500"
                  )}
                >
                  {task.title}
                </p>
                <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock size={10} />
                    ~{task.estimatedHours}h
                  </span>
                  <span>{task.points} pts</span>
                </div>
              </div>

              {/* Status badge */}
              <div
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold",
                  cfg.bg, cfg.border, cfg.color
                )}
              >
                <StatusIcon size={11} />
                {cfg.label}
              </div>

              {/* Arrow */}
              {isClickable && (
                <ChevronRight
                  size={14}
                  className="shrink-0 text-slate-600 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-400"
                />
              )}

              {/* Active glow line */}
              {task.status === "IN_PROGRESS" && (
                <div className="absolute left-0 top-1/4 bottom-1/4 w-0.5 rounded-full bg-yellow-400" />
              )}
            </div>
          );

          return isClickable ? (
            <Link key={task.id} href={`/dashboard/task/${task.id}`}>
              {CardContent}
            </Link>
          ) : (
            <div key={task.id}>{CardContent}</div>
          );
        })}
      </div>
    </div>
  );
}
