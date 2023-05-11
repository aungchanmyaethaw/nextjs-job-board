import axios from "axios";

export async function getJobs(prisma) {
  const jobs = await prisma.job.findMany({
    where: {
      published: true,
    },
    include: {
      author: true,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
  });

  return jobs;
}

export async function getJobsbyCategory(categoryId, prisma) {
  const jobs = await prisma.job.findMany({
    where: {
      published: true,
      categoryId: parseInt(categoryId),
    },
    include: {
      author: true,
      category: true,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
  });

  return jobs;
}

export async function getJob(prisma, id) {
  const jobs = await prisma.job.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      author: true,
    },
  });

  return jobs;
}
export async function getUser(prisma, id) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  return user;
}

export async function getCompanyJobs(prisma, id) {
  const jobs = await prisma.job.findMany({
    where: {
      published: true,
      authorId: id,
    },
    include: {
      author: true,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
  });

  return jobs;
}

export async function getJobsPosted(id, prisma) {
  const jobs = await prisma.job.findMany({
    where: {
      authorId: id,
    },
    include: {
      author: true,
      applications: true,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
  });

  return jobs;
}

export async function getUserApplications(id, prisma) {
  const applications = await prisma.application.findMany({
    where: { authorId: id },
    include: {
      author: true,
      job: true,
    },
    orderBy: [{ id: "desc" }],
  });

  return applications;
}

export async function checkAlreadyApplied(userId, jobId, prisma) {
  const applications = await prisma.application.findMany({
    where: {
      jobId: parseInt(jobId),
      authorId: userId,
    },
    include: {
      author: true,
      job: true,
    },
  });

  if (applications.length > 0) {
    return true;
  }

  return false;
}

export async function getCategories(prisma) {
  const categories = await prisma.category.findMany({
    include: {
      jobs: true,
    },
  });
  return categories;
}
