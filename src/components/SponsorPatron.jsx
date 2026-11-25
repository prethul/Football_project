import { Crown } from "lucide-react";
import { patron } from "../data/tournament";

export default function SponsorPatron({ compact = false }) {
  return (
    <section
      className={compact ? "border-t border-white/10 bg-navy-950 py-8" : "bg-navy-950 py-10 sm:py-12"}
      aria-label="টুর্নামেন্টের পৃষ্ঠপোষক"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={
            compact
              ? "mx-auto max-w-4xl text-center"
              : "card-surface relative overflow-hidden rounded-3xl px-5 py-8 text-center sm:px-10 sm:py-10"
          }
        >
          {!compact && (
            <>
              <div className="absolute left-1/2 top-0 h-28 w-72 -translate-x-1/2 rounded-full bg-gold-400/10 blur-3xl" aria-hidden="true" />
              <div className="absolute left-5 top-5 h-px w-16 bg-gradient-to-r from-transparent to-gold-400/60" aria-hidden="true" />
              <div className="absolute right-5 top-5 h-px w-16 bg-gradient-to-l from-transparent to-gold-400/60" aria-hidden="true" />
            </>
          )}
          <div className="relative">
            <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-gold-400/30 bg-gold-400/10 text-gold-300">
              <Crown className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="mt-4 text-sm font-semibold tracking-wide text-gold-300">{patron.eyebrow}</p>
            <h2 className={compact ? "mt-2 text-2xl font-extrabold text-white" : "mt-3 text-2xl font-extrabold text-gradient-gold sm:text-4xl"}>
              {patron.name}
            </h2>
            <div className="mt-4 flex flex-col items-center gap-1 text-sm leading-relaxed text-slate-300 sm:text-base">
              <p>{patron.role}</p>
              <p className="font-semibold text-neon-300">{patron.organization}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
