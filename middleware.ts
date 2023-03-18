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
  // validate the user is authenticated
  const verifiedToken = (await verifyAuth(req).catch((err) => {
    console.error(err.message);
  })) as UserJwtPayload;

  if (!verifiedToken) {
    return NextResponse.redirect("http://localhost:3000/login");
    // return new NextResponse(
    //   JSON.stringify({ error: { message: "authentication required" } }),
    //   { status: 401 }
    // );
  }
  const email: string = Object.values(verifiedToken)[0];
  const response = await AuthAPI.auth(email);
  if (response.status === 404) {
    return NextResponse.redirect("http://localhost:3000/login");
  }
  // req.user = user as { name: string; phoneNumber: string; email: string };
  return NextResponse.next();
}
