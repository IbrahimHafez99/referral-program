import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

interface UserJwtPayload {
  jti: string;
  iat: number;
}

export class AuthError extends Error {}

/**
 * Verifies the user's JWT token and returns its payload if it's valid.
 */
export async function verifyAuth(req: NextRequest) {
  const getJwtSecretKey = process.env.JWT_SECRET;
  const token = req.headers.get("authorization")?.split(" ")[1] as string;

  if (!token) throw new AuthError("Missing user token");

  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey)
    );
    return verified.payload as UserJwtPayload;
  } catch (err) {
    throw new AuthError("Your token has expired.");
  }
}
