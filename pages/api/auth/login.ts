import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";
const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const errors: string[] = [];
      const { email, password } = req.body.user;
      const validationSchema = [
        { valid: validator.isEmail(email), errorMessage: "Email is invalid" },
        {
          valid: validator.isStrongPassword(password),
          errorMessage: "Password is invalid",
        },
      ];
      validationSchema.forEach((field) => {
        if (!field.valid) {
          errors.push(field.errorMessage);
        }
      });
      if (errors.length) {
        return res.status(400).json({ errorMessage: errors });
      }

      const userWithEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!userWithEmail) {
        return res
          .status(401)
          .json({ errorMessage: "Email or password is invalid" });
      }
      const isMatch = await bcrypt.compare(password, userWithEmail.password);
      if (!isMatch)
        return res
          .status(401)
          .json({ errorMessage: "Email or password is invalid" });
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const token = await new jose.SignJWT({ jti: email })
        .setProtectedHeader({
          alg: "HS256",
        })
        .setExpirationTime("24h")
        .sign(secret);
      return res
        .status(200)
        .json({ message: "Logged in successfully", data: token });
    }
    return res.status(404).json({ message: " Unknown endpoint" });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
