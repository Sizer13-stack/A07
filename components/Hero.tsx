import Image from "next/image";
export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-[#f3fbf4] to-mist">
      <div className="container-x grid items-center gap-8 py-10 md:grid-cols-2 md:py-16">
        <div>
          <p className="mb-3 inline-block rounded-full bg-[#e7f6ec] px-3 py-1 text-sm font-semibold text-brandDark">📊 আজকের বাজার দর</p>
          <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            প্রয়োজনীয় পণ্যের দাম <span className="text-brand">এক নজরে</span>
          </h1>
          <p className="mt-4 max-w-md text-ink/70">
            চাল, ডাল, তেল, সবজি, মাছ-মাংস ও মসলা — দেশের বিভিন্ন বাজারের সর্বশেষ দাম ও দাম বাড়া-কমার হিসাব দেখুন এক জায়গায়।
          </p>
          <a href="#সব-পণ্য" className="btn btn-primary mt-6 rounded-full px-8">সব পণ্য দেখুন ↓</a>
        </div>
        <div className="flex justify-center">
          <Image src="/bazar-hero.png" alt="বাজারের ঝুড়ি" width={420} height={380} priority className="h-auto w-full max-w-sm" />
        </div>
      </div>
    </section>
  );
}
