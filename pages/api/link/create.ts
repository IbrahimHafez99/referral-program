import { getPayload } from "@/lib/getPayload";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const payload: any = getPayload(req);
    const email: string = payload.email;
    const link: string = req.body.link;
    console.log(link)
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      const linkCount = await prisma.link.count({
        where: { userId: user.id },
      });
      console.log("link count", linkCount);
      if (linkCount < 5) {
        const newLink = await prisma.link.create({
          data: {
            referral: link ? link : uuidv4().substring(0, 8),
            User: {
              connect: {
                id: user.id,
              },
            },
          },
        });
        return res.status(201).json({
          message: "a new referral link successfully created",
          data: newLink,
          status: 201,
        });
      } else {
        return res.status(401).json({
          message: "You've reached the maximum number of referral links",
          status: 401,
        });
      }
    }
    return res.status(404).json({ message: "User or link not found" });
  } catch (error: unknown) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  } finally {
    await prisma.$disconnect();
  }
}
