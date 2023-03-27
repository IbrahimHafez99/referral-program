import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import { emailHTML } from "@/public/html/email-page";

const prisma = new PrismaClient();

let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST!,
  port: parseInt(process.env.EMAIL_PORT!),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const referral = req.body.referral;
      if (referral) {
        const email = await prisma.link.findUnique({
          where: { referral: referral },
          select: { User: { select: { email: true } } },
        });
        console.log(email?.User?.email);
        const message = {
          from: email?.User?.email,
          to: "ibrahim.hafez99@hotmail.com",
          subject: `QRLIX | A Purchases was made using your referral ${referral}!`,
          html: emailHTML,
        };
        transporter.sendMail(message, (err, info) => {
          if (err) {
            return res.status(500).json({ data: err });
          } else {
            return res.status(200).json({ data: info });
          }
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    } finally {
      await prisma.$disconnect();
    }
  }
}
