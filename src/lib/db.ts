import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "@/generated/prisma/client";

function getDatabaseUrl(): string {
  return process.env.DATABASE_URL ?? "file:./dev.db";
}

function getDatabaseAuthToken(): string | undefined {
  return process.env.DATABASE_AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN || undefined;
}

export function isLocalDatabase(): boolean {
  const url = getDatabaseUrl();
  return url.startsWith("file:");
}

export function createPrismaClient(): PrismaClient {
  const url = getDatabaseUrl();
  const authToken = getDatabaseAuthToken();
  const adapter = new PrismaLibSql({ url, authToken });
  return new PrismaClient({ adapter });
}
