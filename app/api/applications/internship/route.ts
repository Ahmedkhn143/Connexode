// app/api/applications/internship/route.ts
// Internship application API — saves to Prisma + sends confirmation email

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendInternshipConfirmation } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      fullName, email, university, semester,
      city, track, github, portfolio, whyJoin, experience,
    } = body;

    if (!fullName || !email || !university || !semester || !city || !track || !whyJoin) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const application = await prisma.application.create({
      data: {
        type: "INTERNSHIP",
        status: "PENDING",
        fullName,
        email,
        university,
        semester,
        city,
        whyJoin,
        track: track ?? null,
        github: github ?? null,
        portfolio: portfolio ?? null,
        experience: experience ?? null,
      },
    });

    try {
      await sendInternshipConfirmation({ name: fullName, email, track });
    } catch (emailErr) {
      console.error("Email send failed (application still saved):", emailErr);
    }

    return NextResponse.json(
      { success: true, id: application.id },
      { status: 201 }
    );
  } catch (err) {
    console.error("Internship application error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
