import { NextRequest, NextResponse } from "next/server";
import { validateSessionInMiddleware } from "@/lib/session";
import { cookies } from "next/headers";

// 1. Specify protected and public routes
const protectedRoutes = ["/dashboard", "/records", "/settings"];
const authRotes = ["/signin", "/signup"];
// const publicRoutes = ["/", "/forgot-password"];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.find((r) => path.startsWith(r));
  // const isPublicRoute = publicRoutes.find((r) => path.startsWith(r));
  const isAuthRoute = authRotes.find((r) => path.startsWith(r));

  // 3. Decrypt the session from the cookie
  let session;
  let flag = false;
  const accessToken = cookies().get("access_token")?.value;
  const refreshToken = cookies().get("refresh_token")?.value;
  if (accessToken || refreshToken) {
    session = await validateSessionInMiddleware(accessToken, refreshToken);
    flag = true;
  }

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.payload) {
    const response = NextResponse.redirect(new URL("/signin", req.nextUrl));
    if (flag) {
      response.cookies.delete("access_token");
      response.cookies.delete("refresh_token");
    }
    return response;
  }

  // 5. Redirect to /dashboard if the user is authenticated
  if (isAuthRoute && session?.payload) {
    const response = NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    if (session?.newSession) {
      response.cookies.set("access_token", session.newSession.token);
      response.cookies.set("refresh_token", session.newSession.refreshToken);
    }
    return response;
  }

  const response = NextResponse.next();
  if (flag && !session?.payload) {
    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");
  }
  if (session?.newSession) {
    response.cookies.set("access_token", session.newSession.token);
    response.cookies.set("refresh_token", session.newSession.refreshToken);
  }
  return response;
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
