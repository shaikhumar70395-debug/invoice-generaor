import "dotenv/config";
import { createClient } from "@libsql/client";

async function main() {
  const url = process.env.DATABASE_URL;
  const authToken = process.env.DATABASE_AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }

  const client = createClient({ url, authToken });

  console.log("Connecting to database at", url);

  try {
    await client.execute(`
      CREATE TABLE IF NOT EXISTS "SecuritySettings" (
          "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
          "authEnabled" BOOLEAN NOT NULL DEFAULT 1,
          "authType" TEXT NOT NULL DEFAULT 'PIN',
          "authHash" TEXT,
          "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Table SecuritySettings created successfully.");
  } catch (error) {
    console.error("Error creating table:", error);
  }
}

main();
