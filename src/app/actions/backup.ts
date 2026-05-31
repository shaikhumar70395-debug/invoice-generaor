"use server";

import { copyFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { revalidatePath } from "next/cache";
import { isLocalDatabase } from "@/lib/db";

function getDatabasePath() {
  const databaseUrl = process.env.DATABASE_URL ?? "file:./dev.db";
  if (!databaseUrl.startsWith("file:")) {
    throw new Error("Only local SQLite file restores are supported.");
  }
  return resolve(
    /* turbopackIgnore: true */ process.cwd(),
    databaseUrl.replace(/^file:/, ""),
  );
}

export async function restoreDatabaseAction(
  formData: FormData,
): Promise<{ ok: true; backupPath: string } | { ok: false; error: string }> {
  if (!isLocalDatabase()) {
    return { ok: false, error: "Database restore is only supported for local SQLite databases." };
  }

  try {
    const file = formData.get("backup");
    if (!(file instanceof File) || file.size === 0) {
      return { ok: false, error: "Choose a SQLite .db backup file first." };
    }
    if (file.size > 25 * 1024 * 1024) {
      return { ok: false, error: "Backup file is too large." };
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const signature = bytes.subarray(0, 16).toString("binary");
    if (signature !== "SQLite format 3\u0000") {
      return { ok: false, error: "That file is not a valid SQLite database." };
    }

    const dbPath = getDatabasePath();
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupPath = `${dbPath}.before-restore-${timestamp}`;

    await copyFile(dbPath, backupPath);
    await writeFile(dbPath, bytes);

    revalidatePath("/");
    revalidatePath("/invoices");
    revalidatePath("/customers");
    revalidatePath("/products");
    revalidatePath("/settings");

    return { ok: true, backupPath };
  } catch {
    return {
      ok: false,
      error:
        "Could not restore the backup. Close other database tools and try again.",
    };
  }
}
