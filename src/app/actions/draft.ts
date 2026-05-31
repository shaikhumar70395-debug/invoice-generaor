"use server";

import { saveDraftToDb, clearDraftFromDb } from "@/lib/draft-db";
import type { InvoiceDraft } from "@/lib/types";

/**
 * Auto-save the current in-progress draft to the database.
 * Called from InvoiceWorkspace via a debounced useEffect.
 */
export async function saveDraftAction(
  draft: InvoiceDraft,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await saveDraftToDb(draft);
    return { ok: true };
  } catch {
    return { ok: false, error: "Could not save draft." };
  }
}

/**
 * Clear the draft from the database.
 * Called after a draft is submitted as a real invoice, or when the user resets the form.
 */
export async function clearDraftAction(): Promise<
  { ok: true } | { ok: false; error: string }
> {
  try {
    await clearDraftFromDb();
    return { ok: true };
  } catch {
    return { ok: false, error: "Could not clear draft." };
  }
}
