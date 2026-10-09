export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-line bg-paper p-4">
      <div className="skeleton mb-3 h-14 w-14 rounded-xl" />
      <div className="skeleton mb-2 h-4 w-3/4" />
      <div className="skeleton h-3 w-1/3" />
      <div className="mt-4 flex justify-between border-t border-line pt-3">
        <div className="skeleton h-6 w-24" />
        <div className="skeleton h-5 w-14 rounded-full" />
      </div>
    </div>
  );
}
export function GridSkeleton({ n = 8 }: { n?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: n }).map((_, i) => <CardSkeleton key={i} />)}
    </div>
  );
}
