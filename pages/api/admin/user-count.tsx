import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const count = await prisma.user.count({
        where: {
          isConfirmed: true,
        },
      });

      return res.status(200).json({ status: 200, data: count });
    } catch (error: any) {
      return res.status(500).json({ errorMessage: error.message });
    } finally {
      await prisma.$disconnect();
    }
  }
}
