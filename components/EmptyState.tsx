import Link from "next/link";
export default function EmptyState({ title = "পাওয়া যায়নি", text = "আপনি যে পৃষ্ঠাটি খুঁজছেন তা পাওয়া যায়নি।" }: { title?: string; text?: string }) {
  return (
    <div className="container-x py-20 text-center">
      <p className="text-7xl font-extrabold text-brand">৪০৪</p>
      <h2 className="mt-3 text-2xl font-bold">{title}</h2>
      <p className="mt-1 text-ink/60">{text}</p>
      <Link href="/" className="btn btn-primary mt-6 rounded-full">হোম পেজে ফিরে যান</Link>
    </div>
  );
}
