"use client";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

export default function Profile() {
  const { data, isPending } = useSession();
  const u = data?.user;
  return (
    <div className="container-x grid place-items-center py-12">
      <div className="w-full max-w-md rounded-2xl border border-line bg-white p-6 text-center shadow-sm sm:p-8">
        <h1 className="mb-5 text-2xl font-bold">আমার প্রোফাইল</h1>
        {isPending || !u ? (
          <div className="space-y-3"><div className="skeleton mx-auto h-24 w-24 rounded-full" /><div className="skeleton mx-auto h-5 w-40" /><div className="skeleton mx-auto h-4 w-56" /></div>
        ) : (
          <>
            {u.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={u.image} alt={u.name} referrerPolicy="no-referrer" className="mx-auto h-24 w-24 rounded-full object-cover" />
            ) : (
              <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-brand text-4xl font-bold text-white">{u.name?.[0]?.toUpperCase()}</div>
            )}
            <h2 className="mt-4 text-xl font-semibold">{u.name}</h2>
            <p className="text-ink/60">{u.email}</p>
            <Link href="/profile/update" className="btn btn-primary mt-6 rounded-full">তথ্য আপডেট করুন</Link>
          </>
        )}
      </div>
    </div>
  );
}
