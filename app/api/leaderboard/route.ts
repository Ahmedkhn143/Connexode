// app/api/leaderboard/route.ts
// Leaderboard API — reads from Prisma, assigns ranks + badges
// GET /api/leaderboard

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Badge logic — based on score/reach
function ambassadorBadge(rank: number, reach: number) {
  if (rank === 1) return "gold";
  if (rank === 2) return "silver";
  if (rank === 3) return "bronze";
  if (reach >= 500) return "rising";
  return "rising";
}

function internBadge(rank: number, score: number) {
  if (rank === 1) return "gold";
  if (rank === 2) return "silver";
  if (rank === 3) return "bronze";
  if (score >= 80) return "rising";
  return "rising";
}

export async function GET() {
  try {
    // ── Ambassador leaderboard ──────────────────────────────────────────────
    // Reads from AmbassadorStats model — admin/mentor updates these scores
    // via admin dashboard (to be built in V2 admin panel)
    const ambassadorStats = await prisma.ambassadorStats.findMany({
      orderBy: { communityReach: "desc" },
      take: 20,
      include: {
        user: { select: { name: true } },
        application: { select: { university: true, city: true } },
      },
    });

    const ambassadors = ambassadorStats.map((s, i) => ({
      rank: i + 1,
      name: s.user.name,
      university: s.application.university,
      city: s.application.city,
      sessionsHosted: s.sessionsHosted,
      webinars: s.webinarsHosted,
      communityReach: s.communityReach,
      badge: ambassadorBadge(i + 1, s.communityReach),
    }));

    // ── Intern leaderboard ──────────────────────────────────────────────────
    // Reads from InternStats model — mentor grades tasks and updates scores
    const internStats = await prisma.internStats.findMany({
      orderBy: { averageScore: "desc" },
      take: 20,
      include: {
        user: { select: { name: true } },
        application: { select: { university: true, track: true } },
      },
    });

    const interns = internStats.map((s, i) => ({
      rank: i + 1,
      name: s.user.name,
      university: s.application.university,
      track: s.application.track ?? "General",
      projectScore: Math.round(s.averageScore),
      tasksCompleted: s.tasksCompleted,
      badge: internBadge(i + 1, Math.round(s.averageScore)),
    }));

    return NextResponse.json({ ambassadors, interns });
  } catch (err) {
    console.error("Leaderboard API error:", err);
    // Return empty arrays — page handles empty state gracefully
    return NextResponse.json({ ambassadors: [], interns: [] });
  }
}
