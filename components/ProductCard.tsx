import Link from "next/link";
import type { Product } from "@/lib/types";
import { changeBadge, taka, unitLabel } from "@/lib/format";

export default function ProductCard({ p }: { p: Product }) {
  const b = changeBadge(p.change);
  return (
    <Link
      href={`/product/${p.slug}`}
      className="group block rounded-2xl border border-line bg-paper p-4 transition hover:-translate-y-0.5 hover:border-brand hover:shadow-md"
    >
      <div className="mb-3 grid h-14 w-14 place-items-center rounded-xl bg-mist text-3xl">{p.image}</div>
      <h3 className="font-semibold text-ink group-hover:text-brandDark">{p.nameBn}</h3>
      <p className="text-xs text-ink/60">{unitLabel(p.unit)}</p>
      <div className="mt-3 flex items-end justify-between gap-2 border-t border-line pt-3">
        <div>
          <p className="text-[11px] text-ink/60">আজকের দাম</p>
          <p className="text-lg font-bold">{taka(p.today)}</p>
        </div>
        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${b.cls}`}>{b.text}</span>
      </div>
    </Link>
  );
}
