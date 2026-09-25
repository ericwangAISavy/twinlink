import "server-only";

import type { ApplicationStatus } from "@prisma/client";
import { prisma } from "@/lib/db";

export async function getCandidateApplication(jobId: string, candidateUserId: string) {
  return prisma.application.findUnique({
    where: { jobId_candidateUserId: { jobId, candidateUserId } },
  });
}

export async function getCandidateApplications(candidateUserId: string) {
  return prisma.application.findMany({
    where: { candidateUserId },
    orderBy: { updatedAt: "desc" },
    include: {
      job: {
        select: {
          id: true,
          slug: true,
          title: true,
          location: true,
          employmentType: true,
          status: true,
        },
      },
      _count: { select: { messages: true } },
    },
  });
}

export async function getApplicationForUser(applicationId: string, userId: string, role: "CANDIDATE" | "EMPLOYEE") {
  return prisma.application.findFirst({
    where: {
      id: applicationId,
      ...(role === "CANDIDATE" ? { candidateUserId: userId } : {}),
    },
    include: {
      job: true,
      candidate: {
        select: {
          id: true,
          name: true,
          email: true,
          candidateProfile: {
            include: {
              resumeFile: true,
              experiences: { orderBy: { startDate: "desc" } },
            },
          },
        },
      },
      messages: {
        orderBy: { createdAt: "asc" },
        include: {
          sender: { select: { id: true, name: true, role: true } },
        },
      },
    },
  });
}

export async function listApplications(filters?: {
  status?: ApplicationStatus;
  jobId?: string;
}) {
  return prisma.application.findMany({
    where: {
      status: filters?.status,
      jobId: filters?.jobId,
    },
    orderBy: { updatedAt: "desc" },
    include: {
      job: { select: { id: true, title: true, slug: true } },
      candidate: {
        select: {
          id: true,
          name: true,
          email: true,
          candidateProfile: { select: { headline: true, location: true } },
        },
      },
      _count: { select: { messages: true } },
    },
  });
}

export async function getSavedJobIds(userId: string) {
  const rows = await prisma.savedJob.findMany({
    where: { userId },
    select: { jobId: true },
  });
  return new Set(rows.map((row) => row.jobId));
}

export async function getSavedJobs(userId: string) {
  return prisma.savedJob.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      job: {
        select: {
          id: true,
          slug: true,
          title: true,
          location: true,
          employmentType: true,
          status: true,
          description: true,
        },
      },
    },
  });
}

export const getExistingApplication = getCandidateApplication;
export const getAllApplications = listApplications;

export async function getApplicationForCandidate(applicationId: string, userId: string) {
  return getApplicationForUser(applicationId, userId, "CANDIDATE");
}

export async function getApplicationForEmployee(applicationId: string) {
  return getApplicationForUser(applicationId, "", "EMPLOYEE");
}

export async function getJobApplications(jobId: string) {
  return listApplications({ jobId });
}

export async function getMessageThreadsForUser(
  userId: string,
  role: string,
) {
  const { getMessageThreads } = await import("@/server/queries/messages");
  return getMessageThreads(userId, role === "EMPLOYEE" ? "EMPLOYEE" : "CANDIDATE");
}
