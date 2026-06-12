import { PrismaClient, Role, SubmissionStatus } from "@prisma/client";
import { TRACKS, MOCK_USERS, WEEKLY_TASKS, BADGES, SUBMISSIONS } from "../lib/mock-data";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL,
    },
  },
});

async function main() {
  console.log("Seeding database...");

  // Delete all existing data to prevent primary key collisions on seeding
  await prisma.submission.deleteMany();
  await prisma.userBadge.deleteMany();
  await prisma.badge.deleteMany();
  await prisma.weeklyTask.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.user.deleteMany();
  await prisma.track.deleteMany();

  // Create Tracks
  await prisma.track.createMany({
    data: TRACKS.map((t) => ({
      id: t.id,
      title: t.title,
      slug: t.slug,
      description: t.description,
      icon: t.icon,
      color: t.color,
      durationWeeks: t.durationWeeks,
      isPublished: true,
    })),
  });
  console.log("Tracks seeded.");

  // Create Users
  await prisma.user.createMany({
    data: MOCK_USERS.map((u) => ({
      id: u.id,
      name: u.name,
      username: u.username,
      email: u.email,
      role: u.role as Role,
      points: u.points,
      createdAt: new Date(u.joinDate),
    })),
  });

  // Create Enrollments
  const enrollmentsData = MOCK_USERS.filter((u) => u.enrolledTrackId).map((u) => ({
    userId: u.id,
    trackId: u.enrolledTrackId,
    status: "ACTIVE" as const,
  }));
  if (enrollmentsData.length > 0) {
    await prisma.enrollment.createMany({
      data: enrollmentsData,
    });
  }
  console.log("Users and enrollments seeded.");

  // Create Weekly Tasks
  await prisma.weeklyTask.createMany({
    data: WEEKLY_TASKS.map((t) => ({
      id: t.id,
      trackId: t.trackId,
      weekNo: t.weekNo,
      dayNo: t.dayNo,
      title: t.title,
      taskDetails: t.taskDetails,
      instructions: t.instructions,
      estimatedHours: t.estimatedHours,
      points: t.points,
    })),
  });
  console.log("Weekly tasks seeded.");

  // Create Badges
  await prisma.badge.createMany({
    data: BADGES.map((b) => ({
      id: b.id,
      name: b.name,
      description: b.description,
      icon: b.icon,
      color: b.color,
    })),
  });

  // Create User Badges
  const userBadgesData = BADGES.filter((b) => b.earned).map((b) => ({
    userId: "usr_001",
    badgeId: b.id,
    earnedAt: b.earnedDate ? new Date(b.earnedDate) : new Date(),
  }));
  if (userBadgesData.length > 0) {
    await prisma.userBadge.createMany({
      data: userBadgesData,
    });
  }
  console.log("Badges seeded.");

  // Create Submissions
  await prisma.submission.createMany({
    data: SUBMISSIONS.map((sub) => ({
      id: sub.id,
      userId: sub.userId,
      taskId: sub.taskId,
      githubUrl: sub.githubUrl,
      liveUrl: sub.liveUrl,
      status: sub.status as SubmissionStatus,
      feedback: sub.feedback,
      submittedAt: new Date(sub.submittedAt),
      reviewedAt: sub.reviewedAt ? new Date(sub.reviewedAt) : null,
    })),
  });
  console.log("Submissions seeded.");
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
