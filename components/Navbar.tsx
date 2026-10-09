"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getCategories } from "@/lib/api";
import { useAsync } from "@/lib/hooks";
import { banglaDate } from "@/lib/format";
import { signOut, useSession } from "@/lib/auth-client";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: cats, loading } = useAsync(getCategories, []);
  const { data: session, isPending } = useSession();
  const [date, setDate] = useState("");
  useEffect(() => setDate(banglaDate()), []);

  const logout = async () => {
    await signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  };

  const linkCls = (active: boolean) =>
    `whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition ${active ? "bg-brand text-white" : "text-ink/80 hover:bg-mist"}`;

  return (
    <nav className="border-b border-line bg-white">
      <div className="container-x flex items-center justify-between gap-3 py-2.5">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-icon.png" alt="লোগো" width={32} height={32} className="h-8 w-8" />
          <span className="leading-tight">
            <span className="block text-lg font-bold text-ink sm:text-xl">🛒 বাজার দর</span>
            <span className="block min-h-4 text-[11px] text-ink/60">{date}</span>
          </span>
        </Link>

        <div className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          <Link href="/" className={linkCls(pathname === "/")}>সব পণ্য</Link>
          {cats?.map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`} className={linkCls(pathname === `/category/${c.slug}`)}>
              {c.nameBn}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="skeleton h-9 w-28 rounded-full" />
          ) : session?.user ? (
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="btn btn-sm sm:btn-md btn-ghost gap-2 rounded-full">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-brand text-sm font-bold text-white">
                  {session.user.name?.[0]?.toUpperCase() ?? "U"}
                </span>
                <span className="hidden max-w-24 truncate sm:inline">{session.user.name}</span>
              </button>
              <ul tabIndex={0} className="menu dropdown-content z-50 mt-2 w-52 rounded-box border border-line bg-white p-2 shadow">
                <li><Link href="/profile">আমার প্রোফাইল</Link></li>
                <li><button onClick={logout}>সাইন আউট</button></li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/signin" className="btn btn-sm sm:btn-md btn-outline btn-primary rounded-full">সাইন ইন</Link>
              <Link href="/signup" className="btn btn-sm sm:btn-md btn-primary rounded-full">সাইন আপ</Link>
            </>
          )}
        </div>
      </div>

      {/* second row on small / medium screens */}
      <div className="container-x flex gap-1 overflow-x-auto pb-2 lg:hidden">
        <Link href="/" className={linkCls(pathname === "/")}>সব পণ্য</Link>
        {loading
          ? Array.from({ length: 5 }).map((_, i) => <div key={i} className="skeleton h-8 w-16 shrink-0 rounded-full" />)
          : cats?.map((c) => (
              <Link key={c.slug} href={`/category/${c.slug}`} className={linkCls(pathname === `/category/${c.slug}`)}>
                {c.icon} {c.nameBn}
              </Link>
            ))}
      </div>
    </nav>
  );
}
