export function getFinancialYear(date = new Date()): string {
  const month = date.getMonth();
  const year = date.getFullYear();
  const startYear = month >= 3 ? year : year - 1;
  const endYear = startYear + 1;
  return `${String(startYear).slice(-2)}-${String(endYear).slice(-2)}`;
}

export function formatInvoiceNumber(
  prefix: string,
  financialYear: string,
  sequenceNumber: number,
): string {
  return `${prefix}/${financialYear}/${sequenceNumber}`;
}

export function getNextInvoiceNumber(
  prefix: string,
  financialYear: string,
  lastNumber: number,
): string {
  return formatInvoiceNumber(prefix, financialYear, lastNumber + 1);
}
