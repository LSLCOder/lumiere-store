import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import * as authSchema from "@/db/auth-schema";

/**
 * Better Auth, server side. Email and password only; sessions live in the
 * `sessions` table (7 days, refreshed daily) behind an httpOnly cookie.
 * The cookie cache is left off, so every session check reads the database
 * and a sign-out or role change applies on the next request.
 *
 * Reads BETTER_AUTH_SECRET and BETTER_AUTH_URL from the environment.
 */
export const auth = betterAuth({
  appName: "Lumière",
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema: authSchema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: ["customer", "admin"],
        defaultValue: "customer",
        // Never accepted from sign-up or profile updates. Admins are made
        // with `npm run auth:make-admin`.
        input: false,
      },
    },
  },
});

export type Session = typeof auth.$Infer.Session;
