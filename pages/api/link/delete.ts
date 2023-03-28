import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    
    try {
      const referral = req.body.referral;
      const response = await prisma.link.delete({
        where: {
          referral,
        },
      });
      console.log(response);
      return res.status(204).end();
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ errorMessage: error.message });
    } finally {
      await prisma.$disconnect();
    }
  }
}
