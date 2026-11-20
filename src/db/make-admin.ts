import { eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { users } from "./auth-schema";

// Gives an existing account the admin role:
//   npm run auth:make-admin -- someone@example.com
// The person must have signed up first. The change applies on their next
// request; they don't need to sign in again.

const email = process.argv[2]?.trim().toLowerCase();
if (!email) {
  console.error("Usage: npm run auth:make-admin -- <email>");
  process.exit(1);
}

const connectionString =
  process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Add it to .env.local (see README, Getting started).",
  );
}
const pool = new Pool({ connectionString });
const db = drizzle(pool);

async function makeAdmin(email: string) {
  const [user] = await db
    .update(users)
    .set({ role: "admin" })
    .where(eq(sql`lower(${users.email})`, email))
    .returning({ email: users.email });

  if (!user) {
    console.error(`No account uses ${email}. Sign up first, then run this.`);
    process.exitCode = 1;
    return;
  }
  console.log(`${user.email} is now an admin.`);
}

makeAdmin(email)
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
