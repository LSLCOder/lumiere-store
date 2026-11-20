import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";
import { auth } from "@/lib/auth";

// Server-side session checks. These are the real access control: the proxy
// (`src/proxy.ts`) only redirects visitors who have no session cookie at all.
// A session is request data, so call these inside a <Suspense> boundary,
// never inside "use cache".

/** The current session, or null. Read once per request. */
export const getSession = cache(async () =>
  auth.api.getSession({ headers: await headers() }),
);

/**
 * For customer pages: returns the session, or sends the visitor to sign in
 * and back to `returnTo` afterwards.
 */
export async function requireUser(returnTo: string) {
  const session = await getSession();
  if (!session) {
    redirect(`/sign-in?next=${encodeURIComponent(returnTo)}`);
  }
  return session;
}

/**
 * For admin pages: signed-out visitors go to sign in; signed-in customers get
 * the 404 page, so the admin area isn't advertised.
 */
export async function requireAdmin(returnTo: string) {
  const session = await requireUser(returnTo);
  if (session.user.role !== "admin") notFound();
  return session;
}

/**
 * For admin server actions: throws unless the caller is an admin. Actions
 * are reachable by direct POST, so each one must check for itself.
 */
export async function assertAdmin() {
  const session = await getSession();
  if (session?.user.role !== "admin") {
    throw new Error("Not authorized.");
  }
  return session;
}

/**
 * Where to go after signing in. Only same-site paths are allowed, so a
 * crafted `?next=` can't send someone to another site.
 */
export function safeNext(value: string | string[] | undefined) {
  const next = Array.isArray(value) ? value[0] : value;
  if (
    !next ||
    !next.startsWith("/") ||
    next.startsWith("//") ||
    next.includes("\\")
  ) {
    return "/account";
  }
  return next;
}
