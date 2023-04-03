import { getPayload } from "@/lib/getPayload";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import * as jose from "jose";
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
      const role = await prisma.user_Roles.findFirst({
        where: {
          userId: user?.id,
        },
      });

      const token = await new jose.SignJWT({
        email: user.email,
        role: role?.roleId,
      })
        .setProtectedHeader({
          alg: "HS256",
        })
        .setExpirationTime("24h")
        .sign(new TextEncoder().encode(process.env.JWT_SECRET));
      return res.status(200).json({ data: { token } });
    } catch (error) {
      return res.status(500).json({ errorMessage: "something went wrong" });
    } finally {
      await prisma.$disconnect();
    }
  }
}
