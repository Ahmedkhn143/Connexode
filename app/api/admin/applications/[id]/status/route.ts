// app/api/admin/applications/[id]/status/route.ts
// Update application status + send email notification
// PATCH /api/admin/applications/[id]/status

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { sendStatusUpdate } from "@/lib/email";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // ── Auth check ───────────────────────────────────────────────────────────
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { status, applicantEmail, applicantName, applicationType } =
      await req.json();

    const validStatuses = ["PENDING", "UNDER_REVIEW", "APPROVED", "REJECTED"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    // ── Update DB ─────────────────────────────────────────────────────────
    const updated = await prisma.application.update({
      where: { id: params.id },
      data:  { status },
    });

    // ── Send status email (non-blocking) ──────────────────────────────────
    if (status === "APPROVED" || status === "REJECTED" || status === "UNDER_REVIEW") {
      try {
        await sendStatusUpdate({
          name:  applicantName,
          email: applicantEmail,
          type:  applicationType as "ambassador" | "internship",
          status: status as "APPROVED" | "REJECTED" | "UNDER_REVIEW",
        });
      } catch (emailErr) {
        // Email failure should not block status update
        console.error("Status email failed:", emailErr);
      }
    }

    return NextResponse.json({ success: true, status: updated.status });
  } catch (err) {
    console.error("Status update error:", err);
    return NextResponse.json(
      { error: "Update failed. Please try again." },
      { status: 500 }
    );
  }
}
