import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const token = req.headers["authorization"] as string;
    const bearerToken = token.split(" ")[1];
    const payload: any = jwt.decode(bearerToken);
    const email: string = payload.email;
    const data = await prisma.user.findMany({
      where: { email },
      select: {
        links: { select: { referral: true } },
      },
    });
    const response = data.length > 0 ? data[0].links : [];
    return res.status(200).json({ data: response });
  } catch (error: unknown) {
    console.log(error);
    return res.status(500).json({ message: "Error" });
  } finally {
    await prisma.$disconnect();
  }
}
