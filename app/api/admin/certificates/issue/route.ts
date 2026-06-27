// app/api/admin/certificates/issue/route.ts
// Issue certificate — admin only

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { issueCertificate } from "@/lib/certificate";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { userId, type, track } = await req.json();
    if (!userId || !type) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const cert = await issueCertificate({ userId, type, track });
    return NextResponse.json({ success: true, certId: cert.certId }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
