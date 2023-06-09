import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    return res.status(401).json({ message: "Not logged in" });
  }

  if (req.method === "POST") {
    const { title, description, location, salary } = req.body;

    await prisma.job.create({
      data: {
        title,
        description,
        location,
        salary,
        author: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    return res.status(201).end();
  }

  if (req.method === "PATCH") {
    const { id, task } = req.body;

    await prisma.job.update({
      where: { id: parseInt(id) },
      data: {
        published: task === "publish" ? true : false,
      },
    });

    return res.status(200).end();
  }

  return res.status(501).json({ message: "Method not allowed!" });
}
