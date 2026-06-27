import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Admin
  const adminEmail = "admin@connexode.pk";
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        email: adminEmail,
        name: "Admin Connexode",
        role: UserRole.ADMIN,
        hashedPassword: bcrypt.hashSync("admin123", 10),
      },
    });
    console.log("Admin account created.");
  }

  // 2. Mentor
  const mentorEmail = "mentor@connexode.pk";
  const existingMentor = await prisma.user.findUnique({ where: { email: mentorEmail } });
  if (!existingMentor) {
    await prisma.user.create({
      data: {
        email: mentorEmail,
        name: "Mentor Connexode",
        role: UserRole.MENTOR,
        hashedPassword: bcrypt.hashSync("mentor123", 10),
      },
    });
    console.log("Mentor account created.");
  }

  // 3. Student
  const studentEmail = "alex@example.com";
  const existingStudent = await prisma.user.findUnique({ where: { email: studentEmail } });
  if (!existingStudent) {
    await prisma.user.create({
      data: {
        email: studentEmail,
        name: "Alex Dev",
        role: UserRole.STUDENT,
        hashedPassword: bcrypt.hashSync("alex123", 10),
      },
    });
    console.log("Student account created.");
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
