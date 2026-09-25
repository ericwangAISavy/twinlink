import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { DEFAULT_COMPANY } from "../src/lib/constants";

const prisma = new PrismaClient();

async function main() {
  await prisma.companyProfile.upsert({
    where: { id: "singleton" },
    update: {
      name: DEFAULT_COMPANY.name,
      tagline: DEFAULT_COMPANY.tagline,
      intro: DEFAULT_COMPANY.intro,
      mission: DEFAULT_COMPANY.mission,
      vision: DEFAULT_COMPANY.vision,
      values: DEFAULT_COMPANY.values,
      capabilities: DEFAULT_COMPANY.capabilities,
      partnership: DEFAULT_COMPANY.partnership,
      benefits: DEFAULT_COMPANY.benefits,
      about: DEFAULT_COMPANY.about,
      website: DEFAULT_COMPANY.website,
      email: DEFAULT_COMPANY.email,
      phone: DEFAULT_COMPANY.phone,
      address: DEFAULT_COMPANY.address,
    },
    create: {
      id: "singleton",
      name: DEFAULT_COMPANY.name,
      tagline: DEFAULT_COMPANY.tagline,
      intro: DEFAULT_COMPANY.intro,
      mission: DEFAULT_COMPANY.mission,
      vision: DEFAULT_COMPANY.vision,
      values: DEFAULT_COMPANY.values,
      capabilities: DEFAULT_COMPANY.capabilities,
      partnership: DEFAULT_COMPANY.partnership,
      benefits: DEFAULT_COMPANY.benefits,
      about: DEFAULT_COMPANY.about,
      website: DEFAULT_COMPANY.website,
      email: DEFAULT_COMPANY.email,
      phone: DEFAULT_COMPANY.phone,
      address: DEFAULT_COMPANY.address,
    },
  });

  const adminEmail = (process.env.SEED_ADMIN_EMAIL ?? "admin@twinlink.example").toLowerCase();
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "ChangeMeNow!";
  const passwordHash = await hash(adminPassword, 12);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      role: "EMPLOYEE",
      passwordHash,
      name: "TwinLink Admin",
    },
    create: {
      email: adminEmail,
      passwordHash,
      name: "TwinLink Admin",
      role: "EMPLOYEE",
    },
  });

  await prisma.employeeProfile.upsert({
    where: { userId: admin.id },
    update: {
      title: "Managing Principal",
      bio: "Leads TwinLink delivery and client partnerships.",
    },
    create: {
      userId: admin.id,
      title: "Managing Principal",
      bio: "Leads TwinLink delivery and client partnerships.",
    },
  });

  const sampleJobs = [
    {
      slug: "senior-platform-engineer",
      title: "Senior Platform Engineer",
      location: "Remote · US",
      employmentType: "Full-time",
      description:
        "Design and operate cloud platforms for TwinLink clients. You will shape landing zones, CI/CD, observability, and the paved roads that keep product teams moving.",
      requirements:
        "7+ years building production platforms. Strong AWS or Azure. Terraform, Kubernetes, and a bias for operable systems.",
    },
    {
      slug: "product-engineer",
      title: "Product Engineer",
      location: "Remote · US",
      employmentType: "Full-time",
      description:
        "Ship customer-facing software as an embedded TwinLink engineer. You will own slices of product from discovery through production support.",
      requirements:
        "5+ years full-stack TypeScript. Comfortable in Next.js, React, and well-modeled APIs. Excellent written communication.",
    },
    {
      slug: "engagement-lead",
      title: "Engagement Lead",
      location: "Hybrid · Chicago",
      employmentType: "Full-time",
      description:
        "Own delivery quality and client outcomes for multi-workstream engagements. Pair technical judgment with crisp stakeholder communication.",
      requirements:
        "Prior consulting or in-house staff-plus leadership. Able to scope, staff, and quality-gate software programs.",
    },
  ];

  for (const job of sampleJobs) {
    await prisma.jobPosting.upsert({
      where: { slug: job.slug },
      update: {
        ...job,
        status: "PUBLISHED",
        publishedAt: new Date(),
      },
      create: {
        ...job,
        status: "PUBLISHED",
        publishedAt: new Date(),
        postedById: admin.id,
      },
    });
  }

  console.log(`Seeded TwinLink company profile, admin ${adminEmail}, and ${sampleJobs.length} jobs.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
