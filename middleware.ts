import { NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";
import { AuthAPI } from "./src/apis/authAPI";
interface UserJwtPayload {
  jti: string;
  iat: number;
}
export const config = {
  matcher: ["/api/auth/me", "/home"],
};

export async function middleware(req: NextRequest, res: NextResponse) {
  // const token = req.headers.get("authorization")?.split(" ")[1] as string;
  console.log(req.geo);
  const token = req.cookies.get("jwt")?.value as string;
  const verifiedToken = (await verifyAuth(token).catch((err) => {
    console.error(err.message);
  })) as UserJwtPayload;

  if (!verifiedToken) {
    return NextResponse.redirect("http://localhost:3000/login");
  }
  const email: string = Object.values(verifiedToken)[0];
  const response = await AuthAPI.auth(email);
  if (response.status === 404) {
    return NextResponse.redirect("http://localhost:3000/login");
  }
  return NextResponse.next();
}
