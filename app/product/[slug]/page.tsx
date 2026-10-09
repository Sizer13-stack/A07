"use client";
import { use } from "react";
import Link from "next/link";
import EmptyState from "@/components/EmptyState";
import { getProduct } from "@/lib/api";
import { useAsync } from "@/lib/hooks";
import { bn, changeBadge, taka, unitLabel } from "@/lib/format";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { data: p, loading, error } = useAsync(() => getProduct(slug), [slug]);

  if (loading)
    return (
      <div className="container-x space-y-4 py-8">
        <div className="skeleton h-32 w-full rounded-2xl" />
        <div className="grid gap-4 sm:grid-cols-3">{[0, 1, 2].map((i) => <div key={i} className="skeleton h-24 rounded-2xl" />)}</div>
        <div className="skeleton h-72 w-full rounded-2xl" />
      </div>
    );
  if (error || !p) return <EmptyState title="পণ্যটি পাওয়া যায়নি" text="আপনি যে পণ্যটি খুঁজছেন তা নেই।" />;

  const markets = p.markets ?? [];
  const mins = markets.map((m) => m.min), maxs = markets.map((m) => m.max);
  const min = mins.length ? Math.min(...mins) : p.today;
  const max = maxs.length ? Math.max(...maxs) : p.today;
  const avg = markets.length ? Math.round(markets.reduce((s, m) => s + (m.min + m.max) / 2, 0) / markets.length) : p.today;
  const b = changeBadge(p.change);
  const divisions = Array.from(new Set(markets.map((m) => m.division)));

  return (
    <div className="container-x py-8">
      <Link href={`/category/${p.category}`} className="text-sm text-brandDark hover:underline">← {p.categoryNameBn} বিভাগে ফিরুন</Link>

      <section className="mt-3 rounded-2xl border border-line bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="grid h-20 w-20 place-items-center rounded-2xl bg-mist text-5xl">{p.image}</div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold sm:text-3xl">{p.nameBn}</h1>
            <p className="mt-1 text-ink/70">
              আজকের গড় দাম {taka(p.today)} · {unitLabel(p.unit)} · গতকালের তুলনায় <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${b.cls}`}>{b.text}</span>
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              <span className="badge badge-lg border-line bg-mist">{p.categoryIcon} {p.categoryNameBn}</span>
              <span className="badge badge-lg border-line bg-mist">{unitLabel(p.unit)}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="mb-3 text-lg font-bold">দামের সারসংক্ষেপ</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["সর্বনিম্ন দাম", min, "text-brandDark"],
            ["সর্বোচ্চ দাম", max, "text-rise"],
            ["গড় দাম", avg, "text-ink"],
          ].map(([l, v, c]) => (
            <div key={l as string} className="rounded-2xl border border-line bg-white p-4">
              <p className="text-sm text-ink/60">{l}</p>
              <p className={`text-2xl font-bold ${c}`}>{taka(v as number)}</p>
              <p className="text-xs text-ink/50">{unitLabel(p.unit)}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          {[["গতকাল", p.yesterday], ["গত সপ্তাহ", p.lastWeek], ["গত মাস", p.lastMonth], ["আজ", p.today]].map(([l, v]) => (
            <div key={l as string} className="rounded-xl bg-white/70 px-3 py-2 ring-1 ring-line"><span className="text-ink/60">{l}: </span><b>{taka(v as number)}</b></div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <p className="mb-4 text-sm text-ink/60">{bn(markets.length)}টি বাজার অন্তর্ভুক্ত</p>
        {divisions.map((d) => (
          <div key={d} className="mb-5">
            <h3 className="mb-2 font-semibold text-brandDark">📍 {d}</h3>
            <div className="overflow-x-auto rounded-2xl border border-line bg-white">
              <table className="table">
                <thead><tr><th>বাজার</th><th className="text-right">সর্বনিম্ন</th><th className="text-right">সর্বোচ্চ</th><th className="text-right">গড়</th></tr></thead>
                <tbody>
                  {markets.filter((m) => m.division === d).map((m) => (
                    <tr key={m.market}>
                      <td className="font-medium">{m.market}</td>
                      <td className="text-right">{taka(m.min)}</td>
                      <td className="text-right">{taka(m.max)}</td>
                      <td className="text-right font-semibold">{taka(Math.round((m.min + m.max) / 2))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
