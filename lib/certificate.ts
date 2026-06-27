// lib/certificate.ts
// Certificate generation utility
// Called by admin when approving an intern/ambassador + marking as complete
// Usage: await issueCertificate({ userId, type: "INTERNSHIP", track: "Frontend Development" })

import { prisma } from "@/lib/prisma";

type IssueParams = {
  userId: string;
  type: "AMBASSADOR" | "INTERNSHIP";
  track?: string;
};

// Generate human-readable cert ID: CX-2025-A-00042
async function generateCertId(type: "AMBASSADOR" | "INTERNSHIP"): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = type === "AMBASSADOR" ? "A" : "I";

  // Count existing certs of this type this year to get next number
  const count = await prisma.certificate.count({
    where: {
      type,
      issuedAt: {
        gte: new Date(`${year}-01-01`),
        lte: new Date(`${year}-12-31`),
      },
    },
  });

  const number = String(count + 1).padStart(5, "0");
  return `CX-${year}-${prefix}-${number}`;
}

export async function issueCertificate({ userId, type, track }: IssueParams) {
  // Check not already issued
  const existing = await prisma.certificate.findUnique({ where: { userId } });
  if (existing) {
    throw new Error(`Certificate already issued for user ${userId}`);
  }

  const certId = await generateCertId(type);

  const certificate = await prisma.certificate.create({
    data: {
      certId,
      userId,
      type,
      track: track ?? null,
      status: "ACTIVE",
    },
    include: { user: { select: { name: true, email: true } } },
  });

  return certificate;
}

// Admin: revoke a certificate
export async function revokeCertificate(certId: string) {
  return prisma.certificate.update({
    where: { certId },
    data: { status: "REVOKED" },
  });
}
