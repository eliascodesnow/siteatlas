import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required");
}

const globalForDb = globalThis as typeof globalThis & {
  __siteAtlasPostgresqlPool?: Pool;
};

export const pool =
  globalForDb.__siteAtlasPostgresqlPool ??
  new Pool({
    connectionString: databaseUrl,
    max: Number(process.env.DATABASE_POOL_MAX ?? 10),
    idleTimeoutMillis: Number(process.env.DATABASE_IDLE_TIMEOUT_MS ?? 30_000),
    connectionTimeoutMillis: Number(process.env.DATABASE_CONNECTION_TIMEOUT_MS ?? 5_000),
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__siteAtlasPostgresqlPool = pool;
}

export const db = drizzle(pool);
