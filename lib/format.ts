const BN = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
const EN_MAP: Record<string, string> = Object.fromEntries(BN.map((d, i) => [d, String(i)]));

/** 1850 -> "১,৮৫০" */
export function bn(n: number | string, opts?: Intl.NumberFormatOptions) {
  const v = typeof n === "number" ? n : Number(toEn(String(n)));
  const s = Number.isFinite(v) ? new Intl.NumberFormat("en-US", { maximumFractionDigits: 1, ...opts }).format(v) : String(n);
  return s.replace(/\d/g, (d) => BN[+d]);
}
/** "১,৮৫০" -> 1850 (sorting safe) */
export function toEn(s: string) {
  return s.replace(/[০-৯]/g, (d) => EN_MAP[d]).replace(/,/g, "");
}
export const taka = (n: number) => `${bn(n)} টাকা`;

const UNITS: Record<string, string> = {
  kg: "প্রতি কেজি", kilogram: "প্রতি কেজি",
  litre: "প্রতি লিটার", liter: "প্রতি লিটার", l: "প্রতি লিটার", ltr: "প্রতি লিটার",
  dozen: "প্রতি ডজন", doz: "প্রতি ডজন",
  piece: "প্রতি পিস", pcs: "প্রতি পিস", pc: "প্রতি পিস", hali: "প্রতি হালি",
};
export function unitLabel(u: string) {
  const k = (u || "").toLowerCase().trim();
  if (UNITS[k]) return UNITS[k];
  return u?.startsWith("প্রতি") ? u : `প্রতি ${u}`;
}
export function unitShort(u: string) {
  return unitLabel(u).replace("প্রতি ", "");
}

export function changeBadge(c: { dir: string; pct: number }) {
  const pct = Math.abs(c.pct);
  if (c.dir === "up") return { text: `▲ ${bn(pct)}%`, cls: "text-brandDark bg-[#e7f6ec]", tone: "up" as const };
  if (c.dir === "down") return { text: `▼ ${bn(pct)}%`, cls: "text-rise bg-[#fdecec]", tone: "down" as const };
  return { text: `— ${bn(0)}%`, cls: "text-gray-500 bg-gray-100", tone: "flat" as const };
}

export function banglaDate(d = new Date()) {
  return new Intl.DateTimeFormat("bn-BD", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(d);
}