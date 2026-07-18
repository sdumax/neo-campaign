import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const session = request.cookies.get("session_token");
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/control-center")) {
    if (!session) {
      return NextResponse.redirect(new URL("/mylogin", request.url));
    }
  }

  if (pathname === "/mylogin") {
    if (session) {
      return NextResponse.redirect(new URL("/control-center", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/control-center/:path*", "/mylogin"],
};
