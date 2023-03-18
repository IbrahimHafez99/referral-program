import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const email = req.body?.user?.email;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        name: true,
        phoneNumber: true,
        email: true,
      },
    });
    return res.status(200).json({ message: "Found", status: 200, data: user });
  } catch (error) {
    return res.status(200).json({ message: "Not Found", status: 404 });
  } finally {
    await prisma.$disconnect();
  }
}
