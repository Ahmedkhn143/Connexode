import { ExternalLink, Globe, CheckCircle2, Clock } from "lucide-react";
import { type Submission } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface ProjectShowcaseProps {
  submissions: Submission[];
}

const STATUS_MAP = {
  APPROVED:  { label: "Approved", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20", Icon: CheckCircle2 },
  PENDING:   { label: "Pending Review", color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20", Icon: Clock },
  REVIEWING: { label: "Under Review", color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/20", Icon: Clock },
  REJECTED:  { label: "Needs Revision", color: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/20", Icon: Clock },
};

export default function ProjectShowcase({ submissions }: ProjectShowcaseProps) {
  const visible = submissions.filter(
    (s) => s.status === "APPROVED" || s.status === "PENDING"
  );

  return (
    <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-white">Project Submissions</h2>
        <span className="rounded-full border border-white/8 bg-white/5 px-3 py-1 text-xs text-slate-500">
          {visible.length} project{visible.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="space-y-3">
        {visible.length === 0 && (
          <p className="py-8 text-center text-sm text-slate-600">
            No submissions yet. Complete tasks to build your proof-of-work portfolio.
          </p>
        )}
        {visible.map((sub) => {
          const cfg = STATUS_MAP[sub.status] ?? STATUS_MAP.PENDING;
          const StatusIcon = cfg.Icon;
          return (
            <div
              key={sub.id}
              className="flex flex-col gap-3 rounded-xl border border-white/8 bg-white/4 p-5 transition-colors hover:bg-white/6 sm:flex-row sm:items-start"
            >
              <div className="flex-1 min-w-0">
                <div className="mb-1.5 flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-semibold text-slate-100">{sub.taskTitle}</h3>
                  <span
                    className={cn(
                      "flex items-center gap-1 rounded-lg border px-2 py-0.5 text-xs font-semibold",
                      cfg.color, cfg.bg, cfg.border
                    )}
                  >
                    <StatusIcon size={10} />
                    {cfg.label}
                  </span>
                </div>

                {sub.feedback && (
                  <p className="mb-3 rounded-lg bg-white/4 px-3 py-2 text-xs leading-relaxed text-slate-400 italic">
                    &quot;{sub.feedback}&quot;
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={sub.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-slate-500 transition-colors hover:text-cyan-400"
                  >
                    <ExternalLink size={12} />
                    GitHub Repo
                  </a>
                  {sub.liveUrl && (
                    <a
                      href={sub.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-slate-500 transition-colors hover:text-teal-400"
                    >
                      <Globe size={12} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>

              <div className="shrink-0 text-right text-xs text-slate-600">
                <p>{new Date(sub.submittedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                {sub.status === "APPROVED" && (
                  <p className="mt-0.5 font-bold text-emerald-400">+{sub.points} pts</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
