import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getPayload } from "@/lib/getPayload";
const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const payload: any = getPayload(req);
    const email: string = payload.email;
    try {
      const referral = req.body.referral;

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (user) {
        const linkCount = await prisma.link.count({
          where: { userId: user.id },
        });
        console.log(linkCount);
        if (linkCount === 1) {
          return res
            .status(400)
            .json({ errorMessage: "You cannot delete all links" });
        } else {
          const response = await prisma.link.delete({
            where: {
              referral,
            },
          });
          return res.status(204).end();
        }
      }
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ errorMessage: error.message });
    } finally {
      await prisma.$disconnect();
    }
  }
}
