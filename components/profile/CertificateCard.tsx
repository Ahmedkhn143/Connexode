import { Award, BadgeCheck, Download } from "lucide-react";
import { type User, type Track, PHASE_PROGRESS } from "@/lib/mock-data";

interface CertificateCardProps {
  user: User;
  track: Track;
}

export default function CertificateCard({ user, track }: CertificateCardProps) {
  const overallProgress = Math.round(
    PHASE_PROGRESS.reduce((s, p) => s + p.percentage, 0) / PHASE_PROGRESS.length
  );
  const isEligible = overallProgress >= 80;

  return (
    <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl">
      <h2 className="font-display mb-5 text-lg font-bold text-white">Verified Certificate</h2>

      {/* Certificate Preview */}
      <div
        className="relative mb-5 overflow-hidden rounded-2xl border p-6"
        style={{
          borderColor: isEligible ? `${track.color}40` : "rgba(255,255,255,0.08)",
          background: isEligible
            ? `linear-gradient(135deg, ${track.color}10, rgba(2,11,24,0.8))`
            : "rgba(255,255,255,0.03)",
        }}
      >
        {/* Corner accents */}
        <div
          className="absolute left-4 top-4 h-6 w-6 rounded-tl-xl border-l-2 border-t-2"
          style={{ borderColor: isEligible ? track.color : "#334155" }}
        />
        <div
          className="absolute right-4 top-4 h-6 w-6 rounded-tr-xl border-r-2 border-t-2"
          style={{ borderColor: isEligible ? track.color : "#334155" }}
        />
        <div
          className="absolute bottom-4 left-4 h-6 w-6 rounded-bl-xl border-b-2 border-l-2"
          style={{ borderColor: isEligible ? track.color : "#334155" }}
        />
        <div
          className="absolute bottom-4 right-4 h-6 w-6 rounded-br-xl border-b-2 border-r-2"
          style={{ borderColor: isEligible ? track.color : "#334155" }}
        />

        {/* Content */}
        <div className="text-center">
          <div className="mb-3 flex justify-center">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full"
              style={{
                backgroundColor: isEligible ? `${track.color}18` : "rgba(255,255,255,0.05)",
                border: `2px solid ${isEligible ? track.color : "#334155"}`,
                boxShadow: isEligible ? `0 0 24px ${track.color}30` : "none",
              }}
            >
              <Award size={26} style={{ color: isEligible ? track.color : "#475569" }} />
            </div>
          </div>
          <p
            className="mb-0.5 text-xs font-semibold uppercase tracking-widest"
            style={{ color: isEligible ? track.color : "#475569" }}
          >
            Certificate of Completion
          </p>
          <p className="font-display text-lg font-extrabold text-white">
            {isEligible ? user.name : "Your Name Here"}
          </p>
          <p className="mt-1 text-xs text-slate-500">has successfully completed</p>
          <p className="font-display mt-1.5 text-base font-bold text-slate-200">
            {track.title}
          </p>
          <p className="mt-0.5 text-xs text-slate-600">Connexode Virtual Internship — 2026</p>

          {isEligible && (
            <div className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-cyan-400">
              <BadgeCheck size={13} />
              Industry Verified
            </div>
          )}
        </div>
      </div>

      {/* Progress toward cert */}
      {!isEligible && (
        <div className="mb-4 rounded-xl bg-white/4 p-4">
          <div className="mb-2 flex justify-between text-xs">
            <span className="text-slate-400">Progress toward certificate</span>
            <span className="font-semibold text-slate-300">{overallProgress}% / 80%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/8">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${Math.min((overallProgress / 80) * 100, 100)}%`,
                background: `linear-gradient(90deg, ${track.color}88, ${track.color})`,
              }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-600">
            Complete {80 - overallProgress}% more to unlock your certificate.
          </p>
        </div>
      )}

      <button
        disabled={!isEligible}
        className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all"
        style={
          isEligible
            ? {
                background: `linear-gradient(135deg, ${track.color}, ${track.color}cc)`,
                color: "#020B18",
                boxShadow: `0 0 20px ${track.color}30`,
              }
            : {
                backgroundColor: "rgba(255,255,255,0.05)",
                color: "#475569",
                cursor: "not-allowed",
              }
        }
      >
        <Download size={15} />
        {isEligible ? "Download Certificate" : "Certificate Locked"}
      </button>
    </div>
  );
}
