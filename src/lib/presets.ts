import { roundMoney } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import type { CustomerPreset, ProductPreset } from "@/lib/types";

export async function listCustomers(query = ""): Promise<CustomerPreset[]> {
  const q = query.trim();
  return prisma.customer.findMany({
    where: q
      ? {
          OR: [
            { name: { contains: q } },
            { gstin: { contains: q } },
            { stateName: { contains: q } },
          ],
        }
      : undefined,
    orderBy: [{ name: "asc" }, { id: "asc" }],
    take: 200,
  });
}

export async function listProducts(query = ""): Promise<ProductPreset[]> {
  const q = query.trim();
  return prisma.product.findMany({
    where: q
      ? {
          OR: [
            { description: { contains: q } },
            { hsnSac: { contains: q } },
            { unit: { contains: q } },
          ],
        }
      : undefined,
    orderBy: [{ description: "asc" }, { id: "asc" }],
    take: 200,
  });
}

export async function saveCustomerPreset(
  customer: Omit<CustomerPreset, "id"> & { id?: number },
) {
  const data = {
    name: customer.name.trim(),
    address: customer.address.trim(),
    gstin: customer.gstin.trim().toUpperCase(),
    stateName: customer.stateName.trim(),
    stateCode: customer.stateCode.trim(),
  };
  if (customer.id) {
    return prisma.customer.update({ where: { id: customer.id }, data });
  }

  const existing = data.gstin
    ? await prisma.customer.findFirst({ where: { gstin: data.gstin } })
    : await prisma.customer.findFirst({
        where: { name: data.name, address: data.address },
      });
  if (existing) return prisma.customer.update({ where: { id: existing.id }, data });
  return prisma.customer.create({ data });
}

export async function saveProductPreset(
  product: Omit<ProductPreset, "id"> & { id?: number },
) {
  const data = {
    description: product.description.trim(),
    hsnSac: product.hsnSac.trim(),
    unit: product.unit.trim() || "Nos",
    defaultRate: roundMoney(product.defaultRate),
    defaultGstRatePercent: Number(product.defaultGstRatePercent) || 0,
  };
  if (product.id) {
    return prisma.product.update({ where: { id: product.id }, data });
  }

  const existing = await prisma.product.findFirst({
    where: { description: data.description, hsnSac: data.hsnSac },
  });
  if (existing) return prisma.product.update({ where: { id: existing.id }, data });
  return prisma.product.create({ data });
}

export async function deleteCustomerPreset(id: number) {
  return prisma.customer.delete({ where: { id } });
}

export async function deleteProductPreset(id: number) {
  return prisma.product.delete({ where: { id } });
}
