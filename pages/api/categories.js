import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const categories = await prisma.category.findMany({});
    return res.status(200).json(categories);
  }

  return res.status(501).json({ msg: "Method  not allowed!" });
}
