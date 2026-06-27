// app/api/admin/projects/[id]/route.ts
// Update project published / featured / score — admin only

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const allowed = ["published", "featured", "score"];
    const data = Object.fromEntries(
      Object.entries(body).filter(([k]) => allowed.includes(k))
    );

    const updated = await prisma.project.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json({ success: true, project: updated });
  } catch (err) {
    console.error("Project update error:", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
