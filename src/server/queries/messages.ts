import "server-only";

import { prisma } from "@/lib/db";

export async function getMessageThreads(userId: string, role: "CANDIDATE" | "EMPLOYEE") {
  return prisma.application.findMany({
    where:
      role === "CANDIDATE"
        ? { candidateUserId: userId, messages: { some: {} } }
        : { messages: { some: {} } },
    orderBy: { updatedAt: "desc" },
    include: {
      job: { select: { title: true, slug: true } },
      candidate: { select: { name: true, email: true } },
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
        include: { sender: { select: { name: true } } },
      },
    },
  });
}

export async function getUnreadNotifications(userId: string) {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
}
