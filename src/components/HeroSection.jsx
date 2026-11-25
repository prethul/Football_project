import { Trophy, Users, Shirt, CircleDot } from "lucide-react";
import Button from "./Button";
import { prizes, tournament } from "../data/tournament";

export default function HeroSection() {
  return (
    <section className="hero-bg relative overflow-hidden">
      {/* Decorative pitch circle + stadium light beams */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-24 top-0 h-[120%] w-40 rotate-12 bg-gradient-to-b from-white/10 to-transparent blur-2xl" />
        <div className="absolute -right-24 top-0 h-[120%] w-40 -rotate-12 bg-gradient-to-b from-white/10 to-transparent blur-2xl" />
        <div className="absolute -bottom-40 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full border-2 border-white/10 sm:h-[620px] sm:w-[620px]" />
        <div className="absolute bottom-0 left-1/2 h-px w-full -translate-x-1/2 bg-white/10" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.2fr_1fr] lg:px-8 lg:py-28">
        <div className="animate-fade-up">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-1.5 text-sm font-semibold text-gold-300">
            <CircleDot className="h-4 w-4" aria-hidden="true" />
            {tournament.format} {tournament.nameBn} · {tournament.seasonLabel}
          </span>

          <h1 className="text-4xl font-extrabold leading-[1.25] text-white sm:text-5xl lg:text-6xl">
            ফুটবলের উত্তেজনায়, <span className="text-gradient">জয়ের লড়াইয়ে</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
            KNTs Club ফুটবল টুর্নামেন্টে অংশগ্রহণ করুন, নিজের দল নিয়ে মাঠে নামুন এবং জয়ের লড়াইয়ে নিজের সেরাটা দিন।
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/register" size="lg" icon={Users}>
              টিম রেজিস্ট্রেশন করুন
            </Button>
            <Button to="/tournament" size="lg" variant="outline" icon={Trophy}>
              টুর্নামেন্ট সম্পর্কে জানুন
            </Button>
          </div>

          <dl className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            {[
              { icon: Trophy, label: "মোট প্রাইজমানি", value: prizes.total },
              { icon: Users, label: "প্রতি দলে", value: "৯ জন" },
              { icon: Shirt, label: "টিম জার্সি", value: "ফ্রি" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="glass rounded-2xl p-3 text-center sm:p-4">
                <Icon className="mx-auto mb-1 h-5 w-5 text-neon-400" aria-hidden="true" />
                <dd className="text-sm font-bold text-white sm:text-lg">{value}</dd>
                <dt className="text-[11px] text-slate-400 sm:text-xs">{label}</dt>
              </div>
            ))}
          </dl>
        </div>

        {/* Tournament logo */}
        <div className="relative mx-auto hidden w-full max-w-md lg:block" aria-hidden="true">
          <div className="absolute inset-10 rounded-full bg-neon-500/20 blur-3xl" />
          <div className="relative animate-float">
            <img
              src="/images/futsal-premier-league-logo.png"
              alt=""
              className="mx-auto h-[390px] w-[390px] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.55)]"
            />
            <div className="glass absolute -left-4 top-6 rounded-2xl px-4 py-3 shadow-xl">
              <p className="text-xs text-slate-400">চ্যাম্পিয়ন</p>
              <p className="text-lg font-bold text-gold-300">{prizes.champion.amount}</p>
            </div>
            <div className="glass absolute -right-2 bottom-6 rounded-2xl px-4 py-3 shadow-xl">
              <p className="text-xs text-slate-400">রানার্স-আপ</p>
              <p className="text-lg font-bold text-neon-300">{prizes.runnerUp.amount}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
