"use server";

import { updateSellerSettings as saveSeller } from "@/lib/seller";
import type { SellerProfile } from "@/lib/types";
import { SellerProfileSchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";

export async function saveSellerSettingsAction(
  profile: SellerProfile,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const parsed = SellerProfileSchema.safeParse(profile);
    if (!parsed.success) {
      console.error("Validation failed for saveSellerSettings:", parsed.error);
      return { ok: false, error: "Invalid seller profile data provided." };
    }
    await saveSeller(parsed.data);
    revalidatePath("/settings");
    revalidatePath("/invoices/new");
    revalidatePath("/invoices");
    revalidatePath("/");
    return { ok: true };
  } catch (error) {
    console.error("saveSellerSettingsAction crashed:", error);
    return { ok: false, error: "Could not save settings. Please try again." };
  }
}
