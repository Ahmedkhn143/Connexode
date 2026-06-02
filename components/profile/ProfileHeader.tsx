import { BadgeCheck, Calendar, Flame } from "lucide-react";
import { type User, type Track } from "@/lib/mock-data";

interface ProfileHeaderProps {
  user: User;
  track: Track;
}

export default function ProfileHeader({ user, track }: ProfileHeaderProps) {
  const joinDate = new Date(user.joinDate).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-white/4 p-8 backdrop-blur-xl">
      {/* Background gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 20% 50%, ${track.color}30 0%, transparent 60%)`,
        }}
      />

      <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        {/* Avatar */}
        <div className="relative">
          <div
            className="flex h-24 w-24 items-center justify-center rounded-3xl text-3xl font-extrabold text-[#020B18]"
            style={{
              background: `linear-gradient(135deg, ${track.color}, ${track.color}88)`,
              boxShadow: `0 0 40px ${track.color}40`,
            }}
          >
            {user.avatarInitials}
          </div>
          {/* Online indicator */}
          <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-[#020B18] bg-emerald-400" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <h1 className="font-display text-3xl font-extrabold text-white">{user.name}</h1>
            <div className="flex items-center gap-1.5 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-400">
              <BadgeCheck size={12} />
              Verified Intern
            </div>
          </div>

          <p className="mb-4 text-slate-500">@{user.username}</p>

          <div className="flex flex-wrap items-center gap-5 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: track.color }}
              />
              {track.title}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={13} />
              Joined {joinDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Flame size={13} className="text-orange-400" />
              {user.streak} day streak
            </span>
          </div>
        </div>

        {/* Points */}
        <div className="flex flex-col items-end gap-1 text-right">
          <p className="font-display text-4xl font-extrabold text-white">
            {user.points.toLocaleString()}
          </p>
          <p className="text-sm text-slate-500">total points</p>
          <p
            className="text-sm font-bold"
            style={{ color: track.color }}
          >
            {user.rank}
          </p>
        </div>
      </div>
    </div>
  );
}
