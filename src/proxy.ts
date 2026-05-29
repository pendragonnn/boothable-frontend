import { NextRequest, NextResponse } from "next/server";

// Landing pages — accessible by everyone (public)
const LANDING_PAGE_ROUTES = [
  "/",
  "/events",
  "/about",
  "/contact",
];

// Admin-only routes
const ADMIN_ROUTES = ["/dashboard"];

// Organizer-only routes
const ORGANIZER_ROUTES = ["/organizer"];

// Auth routes (login/register)
const AUTH_ROUTES = ["/login", "/register"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get auth token from cookies
  const authCookie = request.cookies.get("auth");
  let isAuthenticated: string | null = null;
  let userRole: string | null = null;

  if (authCookie?.value) {
    try {
      const parsed = JSON.parse(authCookie.value);
      isAuthenticated = parsed.state?.accessToken || null;
      userRole = parsed.state?.user?.role || null;
    } catch {
      isAuthenticated = null;
    }
  }

  // Check route types
  const isAdminRoute = ADMIN_ROUTES.some((route) => pathname.startsWith(route));
  const isOrganizerRoute = ORGANIZER_ROUTES.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  const isLandingPage = LANDING_PAGE_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  // If user is authenticated
  if (isAuthenticated) {
    // Redirect authenticated users away from auth pages
    if (isAuthRoute) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Check role-based access for admin routes
    if (isAdminRoute && userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Check role-based access for organizer routes
    if (isOrganizerRoute && userRole !== "ORGANIZER" && userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // If user is NOT authenticated
  if (!isAuthenticated) {
    // Redirect unauthenticated users away from protected routes
    if (isAdminRoute || isOrganizerRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Allow landing pages for everyone
  if (isLandingPage) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.webp).*)",
  ],
};
