import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = Boolean(req.auth?.user?.id);
  const role = req.auth?.user?.role;

  if (pathname.startsWith("/dashboard")) {
    if (!isLoggedIn) {
      const login = new URL("/login", req.nextUrl.origin);
      login.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(login);
    }

    if (pathname.startsWith("/dashboard/employee") && role !== "EMPLOYEE") {
      return NextResponse.redirect(new URL("/dashboard/candidate", req.nextUrl.origin));
    }

    if (pathname.startsWith("/dashboard/candidate") && role !== "CANDIDATE") {
      return NextResponse.redirect(new URL("/dashboard/employee", req.nextUrl.origin));
    }
  }

  if ((pathname === "/login" || pathname === "/register") && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
