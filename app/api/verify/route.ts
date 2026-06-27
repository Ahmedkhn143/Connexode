// app/api/verify/route.ts
// Certificate verification API
// GET /api/verify?q=CX-2025-A-00042  OR  ?q=email@example.com

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim();

  if (!q) {
    return NextResponse.json({ found: false }, { status: 400 });
  }

  try {
    // Search by certificate ID (starts with CX-) or by email
    const isEmail = q.includes("@");

    const certificate = await prisma.certificate.findFirst({
      where: isEmail
        ? { user: { email: q.toLowerCase() } }
        : { certId: q.toUpperCase() },
      include: {
        user: { select: { name: true, email: true } },
      },
    });

    if (!certificate) {
      return NextResponse.json({ found: false });
    }

    return NextResponse.json({
      found: true,
      data: {
        id: certificate.certId,
        holderName: certificate.user.name,
        type: certificate.type,
        track: certificate.track ?? null,
        issuedAt: certificate.issuedAt.toISOString(),
        status: certificate.status,
      },
    });
  } catch (err) {
    console.error("Verify API error:", err);
    return NextResponse.json({ found: false }, { status: 500 });
  }
}
