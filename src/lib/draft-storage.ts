/**
 * @deprecated Draft storage has moved to the database (src/lib/draft-db.ts).
 * These localStorage functions are no longer called by InvoiceWorkspace.
 * Kept here as a no-op shim so any stale imports don't cause build errors.
 */
import type { InvoiceDraft } from "@/lib/types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function saveDraftToStorage(_draft: InvoiceDraft): boolean {
  return true;
}

export function loadDraftFromStorage(): InvoiceDraft | null {
  return null;
}

export function clearDraftFromStorage(): void {
  // no-op — drafts are now cleared via clearDraftAction() server action
}
