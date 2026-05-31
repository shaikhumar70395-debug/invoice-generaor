import { readFile } from "node:fs/promises";
import { basename, resolve } from "node:path";
import { isLocalDatabase } from "@/lib/db";

export const dynamic = "force-dynamic";

function getDatabasePath() {
  const databaseUrl = process.env.DATABASE_URL ?? "file:./dev.db";
  if (!databaseUrl.startsWith("file:")) {
    throw new Error("Only local SQLite file backups are supported.");
  }
  return resolve(
    /* turbopackIgnore: true */ process.cwd(),
    databaseUrl.replace(/^file:/, ""),
  );
}

export async function GET() {
  if (!isLocalDatabase()) {
    return new Response("Only local SQLite database backups are supported.", { status: 400 });
  }

  try {
    const dbPath = getDatabasePath();
    const bytes = await readFile(dbPath);
    const date = new Date().toISOString().slice(0, 10);

    return new Response(bytes, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.sqlite3",
        "Content-Disposition": `attachment; filename=${basename(dbPath, ".db")}-${date}.db`,
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
  } catch {
    return new Response("Could not create database backup.", { status: 500 });
  }
}
