import { Trophy, Medal, Crown } from "lucide-react";
import { cn } from "../utils/cn";

const styles = {
  total: {
    icon: Crown,
    wrap: "border-gold-400/40 bg-gradient-to-br from-gold-400/20 via-navy-800 to-navy-900",
    iconWrap: "bg-gradient-to-br from-gold-300 to-gold-500 text-navy-950",
    amount: "text-gradient-gold",
  },
  champion: {
    icon: Trophy,
    wrap: "border-neon-400/40 bg-gradient-to-br from-neon-500/20 via-pitch-800 to-navy-900",
    iconWrap: "bg-gradient-to-br from-neon-300 to-neon-500 text-navy-950",
    amount: "text-neon-300",
  },
  runnerUp: {
    icon: Medal,
    wrap: "border-slate-300/30 bg-gradient-to-br from-slate-300/15 via-navy-800 to-navy-900",
    iconWrap: "bg-gradient-to-br from-slate-100 to-slate-400 text-navy-950",
    amount: "text-slate-100",
  },
};

export default function PrizeMoneyCard({ variant = "total", title, amount, extra, featured = false }) {
  const s = styles[variant];
  const Icon = s.icon;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl border p-6 text-center shadow-xl shadow-black/30 transition-all duration-300 hover:-translate-y-2 sm:p-8",
        s.wrap,
        featured && "md:scale-105"
      )}
    >
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/5 transition-transform duration-500 group-hover:scale-150" aria-hidden="true" />
      <div className={cn("mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg", s.iconWrap)}>
        <Icon className="h-8 w-8" aria-hidden="true" />
      </div>
      <p className="text-lg font-semibold text-slate-200">{title}</p>
      <p className={cn("mt-2 text-3xl font-extrabold sm:text-4xl", s.amount)}>{amount}</p>
      {extra && <p className="mt-2 inline-block rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-slate-200">{extra}</p>}
    </div>
  );
}
