import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function authorization(res, res) {
  const path = request.nexturl.pathname;
  const isPublicPath = path === "/" || path === "/register";
  const token = request.cookies.get("x-authToken")?.value || "";

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  } else if (token) {
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET_KEY)
      );

      if (isPublicPath) {
        return NextResponse.next();
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/register", "/ads"],
};
