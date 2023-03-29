import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { page } = req.query;
    try {
      const users = prisma.user.findMany({
        skip: 1,
      });
    } catch (error) {
    } finally {
      await prisma.$disconnect();
    }
  }
}
