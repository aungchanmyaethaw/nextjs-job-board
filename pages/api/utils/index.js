import prisma from "@/lib/prisma";
import { faker } from "@faker-js/faker";

function generateFakeJob(user) {
  console.log(user);

  return {
    title: faker.name.jobTitle(),
    description: faker.lorem.paragraphs(),
    author: {
      connect: { id: user.id },
    },
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  //   type-1

  if (req.body.task === "clean_database") {
    await prisma.job.deleteMany({});
    await prisma.user.deleteMany({});
  }

  //   type-2

  if (req.body.task === "generate_users_and_jobs") {
    let count = 0;

    while (count < 10) {
      await prisma.user.create({
        data: {
          name: faker.internet.userName().toLowerCase(),
          email: faker.internet.email().toLowerCase(),
          isCompany: faker.datatype.boolean(),
        },
      });

      count++;
    }

    const users = await prisma.user.findMany({
      where: {
        isCompany: true,
      },
    });

    users.forEach(async (user) => {
      await prisma.job.create({
        data: generateFakeJob(user),
      });
    });
  }

  //   type-3

  if (req.body.task === "generate_one_job") {
    const users = await prisma.user.findMany({
      where: {
        isCompany: true,
      },
    });

    console.log(users);

    await prisma.job.create({
      data: generateFakeJob(users[0]),
    });
  }
}
