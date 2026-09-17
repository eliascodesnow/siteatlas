import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// Keep module evaluation safe during builds and in serverless environments where
// the database secret may not be injected until runtime. Connection failures
// are surfaced when a query is actually made, rather than during import.
const databaseUrl = process.env.DATABASE_URL ?? "postgresql://localhost:5432/siteatlas";

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
