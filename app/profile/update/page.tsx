"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { updateUser, useSession } from "@/lib/auth-client";

export default function UpdateProfile() {
  const router = useRouter();
  const { data } = useSession();
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => { if (data?.user?.name) setName(data.user.name); }, [data?.user?.name]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("নাম খালি রাখা যাবে না");
    setBusy(true);
    const { error } = await updateUser({ name: name.trim() });
    setBusy(false);
    if (error) return toast.error(error.message || "আপডেট ব্যর্থ হয়েছে");
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  };

  return (
    <div className="container-x grid place-items-center py-12">
      <form onSubmit={submit} className="w-full max-w-md space-y-4 rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
        <label className="form-control"><span className="label-text mb-1">নাম</span>
          <input className="input input-bordered" value={name} onChange={(e) => setName(e.target.value)} /></label>
        <button disabled={busy} className="btn btn-primary w-full rounded-full">{busy ? <span className="loading loading-spinner loading-sm" /> : "তথ্য আপডেট করুন"}</button>
      </form>
    </div>
  );
}
