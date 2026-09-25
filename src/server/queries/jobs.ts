import "server-only";

import { prisma } from "@/lib/db";

export async function getPublishedJobs() {
  try {
    return await prisma.jobPosting.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      select: {
        id: true,
        slug: true,
        title: true,
        location: true,
        employmentType: true,
        description: true,
        publishedAt: true,
      },
    });
  } catch {
    return [];
  }
}

export async function getJobBySlugOrId(slugOrId: string) {
  try {
    return await prisma.jobPosting.findFirst({
      where: {
        OR: [{ slug: slugOrId }, { id: slugOrId }],
      },
      include: {
        postedBy: { select: { name: true } },
      },
    });
  } catch {
    return null;
  }
}

export async function getEmployeeJobs(postedById?: string) {
  return prisma.jobPosting.findMany({
    where: postedById ? { postedById } : undefined,
    orderBy: { updatedAt: "desc" },
    include: {
      _count: { select: { applications: true } },
    },
  });
}

export async function getJobForEmployee(id: string) {
  return prisma.jobPosting.findUnique({
    where: { id },
    include: {
      postedBy: { select: { name: true, email: true } },
      _count: { select: { applications: true } },
    },
  });
}

export const getEmployeeJob = getJobForEmployee;

export async function getPublishedJobById(id: string) {
  try {
    return await prisma.jobPosting.findFirst({
      where: { id, status: "PUBLISHED" },
    });
  } catch {
    return null;
  }
}

export async function getPublishedJobBySlug(slug: string) {
  try {
    return await prisma.jobPosting.findFirst({
      where: { slug, status: "PUBLISHED" },
    });
  } catch {
    return null;
  }
}

export async function getSavedJobIds(userId: string) {
  try {
    const rows = await prisma.savedJob.findMany({
      where: { userId },
      select: { jobId: true },
    });
    return new Set(rows.map((row) => row.jobId));
  } catch {
    return new Set<string>();
  }
}

export async function getSavedJobs(userId: string) {
  return prisma.savedJob.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { job: true },
  });
}
