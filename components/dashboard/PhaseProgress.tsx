import ProgressBar from "@/components/ui/ProgressBar";
import { PHASE_PROGRESS } from "@/lib/mock-data";


export default function PhaseProgress() {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-white">Internship Progress</h2>
        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-400">
          Week 1 of 8
        </span>
      </div>

      <div className="space-y-5">
        {PHASE_PROGRESS.map((phase) => (
          <div key={phase.phase}>
            <ProgressBar
              label={`Phase ${phase.phase}: ${phase.label}`}
              percentage={phase.percentage}
              color={phase.color}
              height="md"
              animate
            />
          </div>
        ))}
      </div>

      {/* Overall */}
      <div className="mt-6 rounded-xl bg-white/4 p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Overall Completion</span>
          <span className="font-bold text-white">
            {Math.round(
              PHASE_PROGRESS.reduce((s, p) => s + p.percentage, 0) / PHASE_PROGRESS.length
            )}%
          </span>
        </div>
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/8">
          <div
            className="h-full rounded-full"
            style={{
              width: `${Math.round(PHASE_PROGRESS.reduce((s, p) => s + p.percentage, 0) / PHASE_PROGRESS.length)}%`,
              background: "linear-gradient(90deg, #00F5FF, #A855F7, #00BFA5)",
              boxShadow: "0 0 12px rgba(0,245,255,0.4)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
