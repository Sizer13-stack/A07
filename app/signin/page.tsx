"use client";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import SocialButtons from "@/components/SocialButtons";
import { signIn } from "@/lib/auth-client";

function Form() {
  const router = useRouter();
  const sp = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (sp.get("reason") === "protected") toast.error("এই পৃষ্ঠা দেখতে হলে আগে সাইন ইন করুন", { id: "protected" });
  }, [sp]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (!email || !password) { const m = "ইমেইল ও পাসওয়ার্ড দিন"; setErr(m); toast.error(m); return; }
    setBusy(true);
    const { error } = await signIn.email({ email, password });
    setBusy(false);
    if (error) { const m = error.message || "ইমেইল বা পাসওয়ার্ড ভুল"; setErr(m); toast.error(m); return; }
    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(sp.get("redirect") || "/");
    router.refresh();
  };

  return (
    <div className="container-x grid place-items-center py-12">
      <div className="w-full max-w-md rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold">সাইন ইন করুন</h1>
        <p className="mb-5 text-sm text-ink/60">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
        <form onSubmit={submit} className="space-y-3">
          <label className="form-control"><span className="label-text mb-1">ইমেইল</span>
            <input type="email" className="input input-bordered" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
          <label className="form-control"><span className="label-text mb-1">পাসওয়ার্ড</span>
            <input type="password" className="input input-bordered" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
          {err && <p className="text-sm text-rise">{err}</p>}
          <button disabled={busy} className="btn btn-primary w-full rounded-full">{busy ? <span className="loading loading-spinner loading-sm" /> : "সাইন ইন"}</button>
        </form>
        <div className="divider text-xs">অথবা</div>
        <SocialButtons />
        <p className="mt-5 text-center text-sm">অ্যাকাউন্ট নেই? <Link href="/signup" className="font-semibold text-brandDark hover:underline">অ্যাকাউন্ট তৈরি করুন</Link></p>
      </div>
    </div>
  );
}
export default function SignIn() { return <Suspense><Form /></Suspense>; }
