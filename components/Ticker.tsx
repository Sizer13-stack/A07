"use client";
import { getProducts } from "@/lib/api";
import { useAsync } from "@/lib/hooks";
import { bn, changeBadge, unitShort } from "@/lib/format";

export default function Ticker() {
  const { data } = useAsync(getProducts, []);
  if (!data) return <div className="skeleton h-9 w-full rounded-none bg-ink/90" />;
  const items = data.map((p) => {
    const b = changeBadge(p.change);
    const color = b.tone === "up" ? "text-[#4ade80]" : b.tone === "down" ? "text-[#fca5a5]" : "text-gray-300";
    return (
      <span key={p.id} className="mx-5 inline-flex items-center gap-2 text-sm">
        <span>{p.image}</span>
        <span className="font-medium">{p.nameBn}</span>
        <span className="text-white/80">{bn(p.today)} টাকা/{unitShort(p.unit)}</span>
        <span className={`font-semibold ${color}`}>{b.text}</span>
      </span>
    );
  });
  return (
    <div className="overflow-hidden bg-ink py-2 text-white" aria-label="দামের টিকার">
      <div className="flex w-max animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
        <div className="flex">{items}</div>
        <div className="flex" aria-hidden>{items}</div>
      </div>
    </div>
  );
}
