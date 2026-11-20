import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Fast, optimistic gate for signed-in areas: with no session cookie at all,
 * redirect to sign in before rendering anything. It does not check that the
 * cookie is valid; every protected page does that with `requireUser` /
 * `requireAdmin` from `src/lib/session.ts`.
 */
export function proxy(request: NextRequest) {
  if (!getSessionCookie(request)) {
    const { pathname, search } = request.nextUrl;
    const signIn = new URL("/sign-in", request.url);
    signIn.searchParams.set("next", pathname + search);
    return NextResponse.redirect(signIn);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/admin/:path*"],
};
