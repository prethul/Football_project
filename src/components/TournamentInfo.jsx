import { Trophy, Building2, Banknote, ClipboardCheck, Users, MapPin, CalendarDays, Wallet } from "lucide-react";
import { tournament, prizes } from "../data/tournament";
import { cn } from "../utils/cn";

// Tournament information grid. All values come from src/data/tournament.js
export default function TournamentInfo() {
  const open = tournament.registrationOpen;

  const items = [
    { icon: Trophy, label: "টুর্নামেন্টের নাম", value: tournament.name },
    { icon: Building2, label: "আয়োজক", value: tournament.organizer },
    { icon: Banknote, label: "মোট প্রাইজমানি", value: prizes.total },
    {
      icon: ClipboardCheck,
      label: "টিম রেজিস্ট্রেশন",
      value: open ? "চলছে (Open)" : "বন্ধ (Closed)",
      badge: open ? "open" : "closed",
    },
    { icon: Users, label: "টিম স্কোয়াড", value: "৯ জন খেলোয়াড়" },
    { icon: Wallet, label: "এন্ট্রি ফি", value: tournament.entryFee },
    { icon: CalendarDays, label: "টুর্নামেন্ট শুরু", value: tournament.startDate },
    { icon: MapPin, label: "ভেন্যু", value: tournament.venue },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(({ icon: Icon, label, value, badge }) => (
        <div key={label} className="card-surface group rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-neon-400/40">
          <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-neon-400/15 text-neon-400 transition-colors group-hover:bg-neon-400 group-hover:text-navy-950">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </span>
          <p className="text-sm text-slate-400">{label}</p>
          <p
            className={cn(
              "mt-1 break-words text-lg font-bold text-white",
              badge === "open" && "text-neon-400",
              badge === "closed" && "text-red-400"
            )}
          >
            {badge && (
              <span
                className={cn("mr-2 inline-block h-2.5 w-2.5 rounded-full", badge === "open" ? "animate-pulse-dot bg-neon-400" : "bg-red-400")}
                aria-hidden="true"
              />
            )}
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}
