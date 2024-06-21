import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "./auth/authConfig";
import NextAuth from "next-auth";
import { LOGIN, PROTECTED_SUB_ROUTES, PUBLIC_ROUTES, ROOT } from "./lib/routes";

const { auth } = NextAuth(authConfig);

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const session = await auth();
  console.log("user session:", session);
  const isAuthenticated = !!session?.user;
  console.log(isAuthenticated, nextUrl.pathname);

  const isPublicRoute =
    (PUBLIC_ROUTES.find((route) => nextUrl.pathname.startsWith(route)) ||
      nextUrl.pathname === ROOT) &&
    !PROTECTED_SUB_ROUTES.find((route) => nextUrl.pathname.includes(route));
  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL(LOGIN, nextUrl));
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
