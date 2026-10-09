"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SocialButtons from "@/components/SocialButtons";
import { signUp } from "@/lib/auth-client";

export default function SignUp() {
  const router = useRouter();
  const [f, setF] = useState({ name: "", email: "", password: "" });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    const fail = (m: string) => { setErr(m); toast.error(m); };
    if (!f.name.trim()) return fail("আপনার নাম দিন");
    if (!/^\S+@\S+\.\S+$/.test(f.email)) return fail("সঠিক ইমেইল দিন");
    if (f.password.length < 6) return fail("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
    setBusy(true);
    const { error } = await signUp.email({ name: f.name.trim(), email: f.email, password: f.password });
    setBusy(false);
    if (error) return fail(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন");
    router.push("/signin");
  };

  return (
    <div className="container-x grid place-items-center py-12">
      <div className="w-full max-w-md rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="mb-5 text-sm text-ink/60">নতুন অ্যাকাউন্ট খুলুন</p>
        <form onSubmit={submit} className="space-y-3">
          <label className="form-control"><span className="label-text mb-1">নাম</span>
            <input className="input input-bordered" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></label>
          <label className="form-control"><span className="label-text mb-1">ইমেইল</span>
            <input type="email" className="input input-bordered" placeholder="you@example.com" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></label>
          <label className="form-control"><span className="label-text mb-1">পাসওয়ার্ড</span>
            <input type="password" className="input input-bordered" placeholder="কমপক্ষে ৬ অক্ষর" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} /></label>
          {err && <p className="text-sm text-rise">{err}</p>}
          <button disabled={busy} className="btn btn-primary w-full rounded-full">{busy ? <span className="loading loading-spinner loading-sm" /> : "সাইন আপ"}</button>
        </form>
        <div className="divider text-xs">অথবা</div>
        <SocialButtons />
        <p className="mt-5 text-center text-sm">অ্যাকাউন্ট আছে? <Link href="/signin" className="font-semibold text-brandDark hover:underline">সাইন ইন করুন</Link></p>
      </div>
    </div>
  );
}
