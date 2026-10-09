"use client";
import { useMemo } from "react";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import { GridSkeleton } from "@/components/Skeletons";
import { getProducts } from "@/lib/api";
import { useAsync } from "@/lib/hooks";
import { bn } from "@/lib/format";
import type { Product } from "@/lib/types";

function Section({ id, title, sub, children }: { id?: string; title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="container-x py-8">
      <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>
      {sub && <p className="mb-4 text-sm text-ink/60">{sub}</p>}
      {!sub && <div className="mb-4" />}
      {children}
    </section>
  );
}

export default function Home() {
  const { data, loading, error } = useAsync(getProducts, []);
  const { risers, fallers } = useMemo(() => {
    const list: Product[] = data ?? [];
    const top = (dir: string) => list.filter((p) => p.change.dir === dir).sort((a, b) => b.change.pct - a.change.pct).slice(0, 6);
    return { risers: top("up"), fallers: top("down") };
  }, [data]);

  return (
    <>
      <Hero />
      {error ? (
        <div className="container-x py-10 text-center text-rise">ডেটা লোড করা যায়নি। অনুগ্রহ করে পরে আবার চেষ্টা করুন।</div>
      ) : (
        <>
          <Section title="আজ দাম বেড়েছে ▲" sub="গতকালের তুলনায় সবচেয়ে বেশি দাম বেড়েছে যেসব পণ্যের">
            {loading ? <GridSkeleton n={4} /> : <ProductGrid items={risers} />}
          </Section>
          <Section title="আজ দাম কমেছে ▼" sub="গতকালের তুলনায় সবচেয়ে বেশি দাম কমেছে যেসব পণ্যের">
            {loading ? <GridSkeleton n={4} /> : <ProductGrid items={fallers} />}
          </Section>
          <Section id="সব-পণ্য" title="সব পণ্য" sub={data ? `${bn(data.length)}টি নিত্যদিনের পণ্য` : "নিত্যদিনের পণ্যের তালিকা"}>
            {loading ? <GridSkeleton n={8} /> : <ProductGrid items={data ?? []} />}
          </Section>
        </>
      )}
    </>
  );
}
