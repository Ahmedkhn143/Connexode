// middleware.ts — root level (next to app/)
// Route protection — runs on every request BEFORE page renders
// /admin routes are protected (NextAuth only)
// /dashboard is open at middleware level — page itself handles both
//   NextAuth session users AND mock-auth (localStorage) users

import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes only accessible when NOT logged in (NextAuth users)
const AUTH_ONLY = ["/auth/signin", "/auth/signup"];

export default auth(function middleware(req) {
  const { pathname } = req.nextUrl;
  const session = req.auth;
  const isLoggedIn = !!session?.user;
  const role = (session?.user as { role?: string })?.role ?? null;

  // ── 1. Redirect logged-in (NextAuth) users away from auth pages ────────────
  if (isLoggedIn && AUTH_ONLY.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // ── 2. Admin route protection — only ADMIN role allowed ───────────────────
  if (pathname.startsWith("/admin") && role !== "ADMIN") {
    if (!isLoggedIn) {
      const signInUrl = new URL("/auth/signin", req.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // ── 3. Redirect NextAuth users from /dashboard to role-specific view ───────
  if (pathname === "/dashboard" && isLoggedIn && role) {
    const destinations: Record<string, string> = {
      ADMIN:  "/admin",
      MENTOR: "/dashboard/mentor",
    };
    const dest = destinations[role];
    if (dest) return NextResponse.redirect(new URL(dest, req.url));
  }

  return NextResponse.next();
});

// Matcher — run middleware on these paths only (skip static files)
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/auth/signin",
    "/auth/signup",
  ],
};
