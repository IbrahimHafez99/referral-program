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
      const users = await prisma.user.findMany({
        where: {
          isConfirmed: true,
        },
        skip: ((page ? Number(page) : 1) - 1) * 5,
        take: 5,
        select: {
          email: true,
          name: true,
          phoneNumber: true,
          isSuspended: true,
          User_Roles: {
            select: { roleId: true },
          },
        },
      });

      return res.status(200).json({ status: 200, data: users });
    } catch (error: any) {
      return res.status(500).json({ errorMessage: error.message });
    } finally {
      await prisma.$disconnect();
    }
  }
  if (req.method === "PATCH") {
    const { email, state } = req.body;
    try {
      const response = await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          isSuspended: !Boolean(JSON.parse(state)),
        },
      });
      console.log(response);
      return res.status(204).end();
    } catch (error: any) {
      return res.status(500).json({ errorMessage: error.message });
    } finally {
      await prisma.$disconnect();
    }
  }
}
