import { getPayload } from "@/lib/getPayload";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    const payload: any = getPayload(req);
    const { email } = payload;
    try {
      const user = await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          isConfirmed: true,
        },
      });
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ errorMessage: "something went wrong" });
    } finally {
      await prisma.$disconnect();
    }
  }
}
