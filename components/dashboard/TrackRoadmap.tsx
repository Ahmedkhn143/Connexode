import { CheckCircle2, Lock, Map } from "lucide-react";
import { MOCK_USER, TRACK_ROADMAPS, TRACKS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function TrackRoadmap() {
  const track = TRACKS.find((t) => t.id === MOCK_USER.enrolledTrackId);
  if (!track) return null;

  const roadmap = TRACK_ROADMAPS[track.id] ?? [];
  const totalWeeks = track.durationWeeks;
  const currentWeek = Math.min(MOCK_USER.currentWeek, totalWeeks);

  if (!roadmap.length) {
    return (
      <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-white">8-Week Track Roadmap</h2>
          <span className="text-xs text-slate-500">Track: {track.title}</span>
        </div>
        <div className="rounded-xl border border-white/6 bg-white/4 p-4 text-sm text-slate-400">
          Roadmap details are being prepared for this track.
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-display flex items-center gap-2 text-lg font-bold text-white">
          <Map size={16} className="text-cyan-400" />
          8-Week Track Roadmap
        </h2>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
          {track.title}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {roadmap.map((week) => {
          const isCompleted = week.weekNo < currentWeek;
          const isCurrent = week.weekNo === currentWeek;
          const StatusIcon = isCompleted ? CheckCircle2 : Lock;
          const statusLabel = isCompleted ? "Completed" : isCurrent ? "Current Week" : "Upcoming";

          return (
            <div
              key={`${track.id}-week-${week.weekNo}`}
              className={cn(
                "rounded-2xl border p-4 transition-colors",
                isCurrent
                  ? "border-cyan-400/40 bg-cyan-400/10"
                  : "border-white/8 bg-white/3"
              )}
            >
              <div className="mb-3 flex items-center justify-between">
                <span
                  className="rounded-full border px-2.5 py-1 text-xs font-semibold"
                  style={{
                    borderColor: `${track.color}40`,
                    color: track.color,
                    backgroundColor: `${track.color}12`,
                  }}
                >
                  Week {week.weekNo}
                </span>
                <span
                  className={cn(
                    "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold",
                    isCompleted
                      ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-400"
                      : isCurrent
                      ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-400"
                      : "border-white/10 bg-white/5 text-slate-400"
                  )}
                >
                  <StatusIcon size={12} />
                  {statusLabel}
                </span>
              </div>

              <h3 className="text-sm font-semibold text-white">{week.title}</h3>
              <p className="mt-1 text-xs text-slate-400">{week.focus}</p>

              <ul className="mt-3 space-y-1.5 text-xs text-slate-400">
                {week.outcomes.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full" style={{ backgroundColor: track.color }} />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-3 rounded-lg border border-white/8 bg-white/5 px-3 py-2 text-xs text-slate-300">
                <span className="text-slate-500">Project:</span> {week.project}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
