import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";
import cookie from "cookie";
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
      const role = await prisma.user_Roles.findFirst({
        where: {
          userId: userWithEmail?.id,
        },
      });
      if (!userWithEmail) {
        return res
          .status(401)
          .json({ errorMessage: "Email or password is invalid" });
      }
      if (!userWithEmail?.isConfirmed) {
        // The request could not be completed because it would result in a conflict with the current state of the resource.
        return res
          .status(409)
          .json({ errorMessage: "your email must be verified" });
      }
      if (userWithEmail?.isSuspended) {
        // The request could not be completed because it would result in a conflict with the current state of the resource.
        return res
          .status(403)
          .json({ errorMessage: "your account has been suspended" });
      }
      const isMatch = await bcrypt.compare(password, userWithEmail.password);
      if (!isMatch)
        return res
          .status(401)
          .json({ errorMessage: "Email or password is invalid" });
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const token = await new jose.SignJWT({ email, role: role?.roleId })
        .setProtectedHeader({
          alg: "HS256",
        })
        .setExpirationTime("24h")
        .sign(secret);
      // res.setHeader("Set-Cookie", cookie.serialize("jwt", token));
      return res.status(200).json({ message: "Logged in successfully", token });
    }
    return res.status(404).json({ message: " Unknown endpoint" });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
