"use client";
import { use, useMemo, useState } from "react";
import EmptyState from "../../../components/EmptyState";
import ProductGrid from "../../../components/ProductGrid";
import SortSelect, { SortKey } from "../../../components/SortSelect";
import { GridSkeleton } from "../../../components/Skeletons";
import { getCategory, getProductsByCategory } from "../../../lib/api";
import { useAsync } from "../../../lib/hooks";
import { bn } from "../../../lib/format";

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [sort, setSort] = useState<SortKey>("default");
  const cat = useAsync(() => getCategory(slug), [slug]);
  const prods = useAsync(() => getProductsByCategory(slug), [slug]);

  const sorted = useMemo(() => {
    const list = [...(prods.data ?? [])];
    // numeric sort — `today` is a number, never a Bengali string
    if (sort === "asc") list.sort((a, b) => Number(a.today) - Number(b.today));
    if (sort === "desc") list.sort((a, b) => Number(b.today) - Number(a.today));
    return list;
  }, [prods.data, sort]);

  const loading = cat.loading || prods.loading;
  if (!loading && (cat.error || !cat.data || !prods.data?.length)) {
    return <EmptyState title="এই বিভাগে কোনো পণ্য পাওয়া যায়নি" text="বিভাগটি হয়তো নেই, অথবা এখানে এখনও কোনো পণ্য যোগ হয়নি।" />;
  }

  return (
    <div className="container-x py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        {loading ? (
          <div className="skeleton h-9 w-48" />
        ) : (
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold sm:text-3xl"><span>{cat.data?.icon}</span>{cat.data?.nameBn}</h1>
            <p className="text-sm text-ink/60">{bn(prods.data?.length ?? 0)}টি বিভাগের তথ্য</p>
          </div>
        )}
        <SortSelect value={sort} onChange={setSort} />
      </div>
      {loading ? <GridSkeleton n={8} /> : <ProductGrid items={sorted} />}
    </div>
  );
}
