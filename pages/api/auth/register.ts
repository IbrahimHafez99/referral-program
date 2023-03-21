import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import validator from "validator";
import parsePhoneNumber from "libphonenumber-js";
import * as jose from "jose";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

interface User {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client: User = req.body.user;
    const email: string = client.email;
    const isEmail = validator.isEmail(email);
    const isAlpha = validator.matches(client.name, /^[a-zA-Z\s]+$/);
    const isMobilePhone =
      validator.isMobilePhone(client.phoneNumber) &&
      parsePhoneNumber(client.phoneNumber)?.isValid;
    const isStrongPassword = validator.isStrongPassword(client.password);
    if (!isEmail || !isAlpha || !isMobilePhone || !isStrongPassword) {
      return res
        .status(401)
        .json({ message: "something wrong with the input" });
    }
    const checkUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    const checkPhone = await prisma.user.findUnique({
      where: {
        phoneNumber: client.phoneNumber,
      },
    });

    if (checkUser) {
      res.status(409).json({ message: "This email already exists." });
    } else if (checkPhone) {
      res.status(409).json({ message: "This phone number already exists." });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hash: string = await bcrypt.hash(client.password, salt);

      const user = await prisma.user.create({
        data: {
          ...client,
          password: hash,
          links: {
            create: {
              referral: uuidv4().substring(0, 8),
            },
          },
        },
        include: {
          links: true,
        },
      });
      res.status(201).json({ message: "Created!" });
    }
  } catch (error: any) {
    console.log(error);

    res.status(500).json({ message: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
