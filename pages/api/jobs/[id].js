import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { id } = req.query;

    await prisma.job.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json({ message: "Job deleted!" });
  }

  return res.status(501).json({ message: "Method not  allowed!" });
}
