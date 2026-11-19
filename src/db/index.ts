import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// Reuse one pool across hot reloads in development, so `next dev` doesn't
// open a new set of connections every time a file changes.
const globalForDb = globalThis as unknown as { lumierePool?: Pool };

function createPool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Add it to .env.local (see README, Getting started).",
    );
  }
  return new Pool({ connectionString });
}

const pool = globalForDb.lumierePool ?? createPool();

if (process.env.NODE_ENV !== "production") {
  globalForDb.lumierePool = pool;
}

export const db = drizzle(pool);
