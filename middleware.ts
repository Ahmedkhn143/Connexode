// middleware.ts — root level (next to app/)
// Route protection — runs on every request BEFORE page renders
// Blocks unauthenticated users from /dashboard routes
// Blocks non-admin users from /admin routes

import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that require login
const PROTECTED = ["/dashboard", "/admin"];

// Routes only accessible when NOT logged in
const AUTH_ONLY = ["/auth/signin", "/auth/signup"];

// Role-based route map
const ROLE_ROUTES: Record<string, string[]> = {
  ADMIN:      ["/admin", "/dashboard"],
  MENTOR:     ["/dashboard/mentor"],
  AMBASSADOR: ["/dashboard/ambassador"],
  STUDENT:    ["/dashboard/student"],
};

export default auth(function middleware(req) {
  const { pathname } = req.nextUrl;
  const session = req.auth;
  const isLoggedIn = !!session?.user;
  const role = (session?.user as { role?: string })?.role ?? null;

  // ── 1. Redirect logged-in users away from auth pages ──────────────────────
  if (isLoggedIn && AUTH_ONLY.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // ── 2. Block unauthenticated access to protected routes ───────────────────
  if (!isLoggedIn && PROTECTED.some((p) => pathname.startsWith(p))) {
    const signInUrl = new URL("/auth/signin", req.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // ── 3. Block non-admin from /admin routes ─────────────────────────────────
  if (pathname.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // ── 4. Redirect /dashboard to role-specific dashboard ────────────────────
  if (pathname === "/dashboard" && isLoggedIn && role) {
    const destinations: Record<string, string> = {
      ADMIN:      "/admin",
      MENTOR:     "/dashboard/mentor",
      AMBASSADOR: "/dashboard/ambassador",
      STUDENT:    "/dashboard/student",
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
