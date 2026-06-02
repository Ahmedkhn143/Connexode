import { PrismaClient, Role, SubmissionStatus } from "@prisma/client";
import { TRACKS, MOCK_USERS, WEEKLY_TASKS, BADGES, SUBMISSIONS } from "../lib/mock-data";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Seed Tracks
  for (const track of TRACKS) {
    await prisma.track.upsert({
      where: { id: track.id },
      update: {},
      create: {
        id: track.id,
        title: track.title,
        slug: track.slug,
        description: track.description,
        icon: track.icon,
        color: track.color,
        durationWeeks: track.durationWeeks,
        isPublished: true,
      },
    });
  }
  console.log("Tracks seeded.");

  // Seed Users & Enrollments
  for (const user of MOCK_USERS) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role as Role,
        points: user.points,
        createdAt: new Date(user.joinDate),
      },
    });

    await prisma.enrollment.upsert({
      where: { userId_trackId: { userId: user.id, trackId: user.enrolledTrackId } },
      update: {},
      create: {
        userId: user.id,
        trackId: user.enrolledTrackId,
        status: "ACTIVE",
      },
    });
  }
  console.log("Users and enrollments seeded.");

  // Seed Weekly Tasks
  for (const task of WEEKLY_TASKS) {
    await prisma.weeklyTask.upsert({
      where: { id: task.id },
      update: {},
      create: {
        id: task.id,
        trackId: task.trackId,
        weekNo: task.weekNo,
        dayNo: task.dayNo,
        title: task.title,
        taskDetails: task.taskDetails,
        instructions: task.instructions,
        estimatedHours: task.estimatedHours,
        points: task.points,
      },
    });
  }
  console.log("Weekly tasks seeded.");

  // Seed Badges
  for (const badge of BADGES) {
    await prisma.badge.upsert({
      where: { id: badge.id },
      update: {},
      create: {
        id: badge.id,
        name: badge.name,
        description: badge.description,
        icon: badge.icon,
        color: badge.color,
      },
    });

    // If earned by Alex Johnson (usr_001)
    if (badge.earned) {
      await prisma.userBadge.upsert({
        where: { userId_badgeId: { userId: "usr_001", badgeId: badge.id } },
        update: {},
        create: {
          userId: "usr_001",
          badgeId: badge.id,
          earnedAt: badge.earnedDate ? new Date(badge.earnedDate) : new Date(),
        },
      });
    }
  }
  console.log("Badges seeded.");

  // Seed Submissions
  for (const sub of SUBMISSIONS) {
    await prisma.submission.upsert({
      where: { id: sub.id },
      update: {},
      create: {
        id: sub.id,
        userId: sub.userId,
        taskId: sub.taskId,
        githubUrl: sub.githubUrl,
        liveUrl: sub.liveUrl,
        status: sub.status as SubmissionStatus,
        feedback: sub.feedback,
        submittedAt: new Date(sub.submittedAt),
        reviewedAt: sub.reviewedAt ? new Date(sub.reviewedAt) : null,
      },
    });
  }
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
