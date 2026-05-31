import "dotenv/config";
import { createPrismaClient } from "../src/lib/db";

const prisma = createPrismaClient();

prisma.sellerSettings
  .findUnique({ where: { id: 1 } })
  .then((row) => {
    console.log("ok", row?.companyName ?? "no row yet");
  })
  .catch((error: Error) => {
    console.error("fail", error.message);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
