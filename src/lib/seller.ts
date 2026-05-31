import { DEFAULT_SELLER } from "@/lib/defaults";
import { prisma } from "@/lib/prisma";
import { sellerProfileToDb, toSellerProfile } from "@/lib/seller-map";
import type { SellerProfile } from "@/lib/types";

export async function getOrCreateSellerSettings(): Promise<SellerProfile> {
  const existing = await prisma.sellerSettings.findUnique({ where: { id: 1 } });

  if (existing) {
    return toSellerProfile(existing);
  }

  const created = await prisma.sellerSettings.create({
    data: { id: 1, ...sellerProfileToDb(DEFAULT_SELLER) },
  });

  return toSellerProfile(created);
}

export async function updateSellerSettings(
  profile: SellerProfile,
): Promise<SellerProfile> {
  const data = sellerProfileToDb(profile);

  const updated = await prisma.sellerSettings.upsert({
    where: { id: 1 },
    create: { id: 1, ...data },
    update: data,
  });

  return toSellerProfile(updated);
}
