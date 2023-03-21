import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";
interface UserJwtPayload {
  jti: string;
  iat: number;
}
export const config = {
  matcher: ["/api/link/get", "/login", "/", "/home", "/register"],
};
// "/api/link/get"
export async function middleware(req: NextRequest, res: NextResponse) {
  let bearerToken;
  const token = req.headers.get("authorization") as string;
  if (token) bearerToken = token && token.split(" ")[1];
  else bearerToken = req.cookies.get("jwt")?.value;
  console.log(req.nextUrl.pathname, bearerToken);
  const verifiedToken =
    bearerToken &&
    ((await verifyAuth(bearerToken).catch((err) => {
      console.error(err.message);
    })) as UserJwtPayload);
  if (
    (req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register")) &&
    !verifiedToken
  ) {
    return;
  }
  if (
    (req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register")) &&
    verifiedToken
  ) {
    return NextResponse.redirect(new URL("/home", req.url));
  }
  if (!verifiedToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // return NextResponse.next();
}
