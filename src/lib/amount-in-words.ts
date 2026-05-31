const ones = [
  "",
  "ONE",
  "TWO",
  "THREE",
  "FOUR",
  "FIVE",
  "SIX",
  "SEVEN",
  "EIGHT",
  "NINE",
  "TEN",
  "ELEVEN",
  "TWELVE",
  "THIRTEEN",
  "FOURTEEN",
  "FIFTEEN",
  "SIXTEEN",
  "SEVENTEEN",
  "EIGHTEEN",
  "NINETEEN",
];

const tens = [
  "",
  "",
  "TWENTY",
  "THIRTY",
  "FORTY",
  "FIFTY",
  "SIXTY",
  "SEVENTY",
  "EIGHTY",
  "NINETY",
];

function twoDigits(n: number): string {
  if (n < 20) return ones[n];
  const t = Math.floor(n / 10);
  const o = n % 10;
  return o ? `${tens[t]} ${ones[o]}` : tens[t];
}

function threeDigits(n: number): string {
  if (n === 0) return "";
  const h = Math.floor(n / 100);
  const rest = n % 100;
  const hundred = h ? `${ones[h]} HUNDRED` : "";
  const tail = rest ? twoDigits(rest) : "";
  if (hundred && tail) return `${hundred} ${tail}`;
  return hundred || tail;
}

function section(n: number, label: string): string {
  if (n === 0) return "";
  return `${threeDigits(n)} ${label}`.trim();
}

/** Convert amount to Indian invoice wording (rupees; optional paise). */
export function amountInWords(amount: number): string {
  const rupees = Math.floor(Math.abs(amount));
  const paise = Math.round((Math.abs(amount) - rupees) * 100);

  if (rupees === 0 && paise === 0) {
    return "ZERO RUPEES ONLY";
  }

  const crore = Math.floor(rupees / 10000000);
  const lakh = Math.floor((rupees % 10000000) / 100000);
  const thousand = Math.floor((rupees % 100000) / 1000);
  const hundredPart = rupees % 1000;

  const parts = [
    section(crore, "CRORE"),
    section(lakh, "LAKH"),
    section(thousand, "THOUSAND"),
    threeDigits(hundredPart),
  ].filter(Boolean);

  let words = parts.join(" ").replace(/\s+/g, " ").trim();
  words = words ? `${words} RUPEES` : "";

  if (paise > 0) {
    const paiseWords = `${twoDigits(paise)} PAISE`;
    words = words ? `${words} AND ${paiseWords}` : paiseWords;
  }

  return `${words} ONLY`.replace(/\s+/g, " ").trim();
}
