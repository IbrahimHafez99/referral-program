import { NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";
import { PrismaClient } from "@prisma/client";

interface UserJwtPayload {
  jti: string;
  iat: number;
}
export const config = {
  matcher: ["/api/auth/me"],
};

export async function middleware(req: NextRequest, res: NextResponse) {
  const prisma = new PrismaClient();
  // validate the user is authenticated
  const verifiedToken = (await verifyAuth(req).catch((err) => {
    console.error(err.message);
  })) as UserJwtPayload;

  if (!verifiedToken) {
    // if this an API request, respond with JSON
    return new NextResponse(
      JSON.stringify({ error: { message: "authentication required" } }),
      { status: 401 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email: verifiedToken.jti,
    },
    select: {
      name: true,
      phoneNumber: true,
      email: true,
    },
  });
  if (!user) {
    return new NextResponse(
      JSON.stringify({ errorMessage: "User not found" }),
      { status: 404 }
    );
  }
  req.user = user as { name: string; phoneNumber: string; email: string };
  return NextResponse.next();
}
