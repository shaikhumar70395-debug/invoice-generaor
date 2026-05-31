import "dotenv/config";
import { DEFAULT_SELLER } from "../src/lib/defaults";
import { createPrismaClient } from "../src/lib/db";
import { sellerProfileToDb } from "../src/lib/seller-map";

const prisma = createPrismaClient();

async function main() {
  await prisma.sellerSettings.upsert({
    where: { id: 1 },
    create: { id: 1, ...sellerProfileToDb(DEFAULT_SELLER) },
    update: sellerProfileToDb(DEFAULT_SELLER),
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
