import { createAuthClient } from "better-auth/react";

/**
 * Better Auth in the browser. Sign-up, sign-in and sign-out go through
 * `/api/auth`, so Better Auth's rate limiting applies to them.
 */
export const authClient = createAuthClient();
