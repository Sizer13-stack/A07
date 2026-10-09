import { NextRequest, NextResponse } from "next/server";

// Protected: product detail + profile pages. Redirects to /signin with a toast reason.
// (Cheap cookie-presence check; the session itself is validated by BetterAuth on the client.)
const hasSession = (req: NextRequest) =>
  req.cookies.getAll().some((c) => c.name.endsWith("better-auth.session_token") && c.value);

export function middleware(req: NextRequest) {
  if (!hasSession(req)) {
    const url = new URL("/signin", req.url);
    url.searchParams.set("redirect", req.nextUrl.pathname);
    url.searchParams.set("reason", "protected");
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/product/:path*", "/profile/:path*", "/profile"] };
