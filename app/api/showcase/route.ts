// app/api/showcase/route.ts
// Project Showcase API — GET all projects (public)
// Admin can mark projects as featured via admin dashboard

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: { published: true },
      orderBy: [
        { featured: "desc" },
        { score: "desc" },
        { completedAt: "desc" },
      ],
      include: {
        intern: {
          select: { name: true },
        },
        application: {
          select: { university: true, track: true },
        },
      },
    });

    const formatted = projects.map((p) => ({
      id:          p.id,
      title:       p.title,
      description: p.description,
      internName:  p.intern.name,
      university:  p.application.university,
      track:       p.application.track ?? "General",
      stack:       p.stack,            // stored as String[] in Prisma
      githubUrl:   p.githubUrl ?? null,
      liveUrl:     p.liveUrl ?? null,
      score:       p.score,
      completedAt: p.completedAt.toISOString(),
      featured:    p.featured,
    }));

    return NextResponse.json({ projects: formatted });
  } catch (err) {
    console.error("Showcase API error:", err);
    return NextResponse.json({ projects: [] });
  }
}
