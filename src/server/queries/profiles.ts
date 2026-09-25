import "server-only";

import { prisma } from "@/lib/db";

export async function getEmployeeProfile(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    include: { employeeProfile: true },
  });
}

export async function getCandidateProfile(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    include: {
      candidateProfile: {
        include: {
          resumeFile: true,
          experiences: { orderBy: { startDate: "desc" } },
        },
      },
    },
  });
}

export async function getCandidateForReview(userId: string) {
  return prisma.user.findFirst({
    where: { id: userId, role: "CANDIDATE" },
    include: {
      candidateProfile: {
        include: {
          resumeFile: true,
          experiences: { orderBy: { startDate: "desc" } },
        },
      },
      applications: {
        orderBy: { createdAt: "desc" },
        include: { job: { select: { id: true, title: true, slug: true } } },
      },
    },
  });
}
