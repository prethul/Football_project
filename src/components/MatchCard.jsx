import { CalendarDays, Clock, MapPin } from "lucide-react";
import { matchStatusLabels } from "../data/matches";
import { toBn } from "../utils/validation";
import { cn } from "../utils/cn";

// Placeholder team badge using the first letter of the team name.
function TeamBadge({ name, tone }) {
  const initial = Array.from(name.trim())[0] || "?";
  return (
    <span
      className={cn(
        "flex h-14 w-14 items-center justify-center rounded-full border-2 text-xl font-extrabold shadow-lg sm:h-16 sm:w-16 sm:text-2xl",
        tone === "a"
          ? "border-neon-400/60 bg-gradient-to-br from-pitch-600 to-pitch-800 text-neon-300"
          : "border-gold-400/60 bg-gradient-to-br from-navy-700 to-navy-800 text-gold-300"
      )}
      aria-hidden="true"
    >
      {initial}
    </span>
  );
}

const statusStyles = {
  upcoming: "bg-sky-400/15 text-sky-300 border-sky-400/30",
  live: "bg-red-500/20 text-red-300 border-red-400/40",
  completed: "bg-neon-400/15 text-neon-300 border-neon-400/30",
};

export default function MatchCard({ match }) {
  const { teamA, teamB, date, time, venue, status, scoreA, scoreB, round, isSample } = match;
  const hasScore = scoreA !== null && scoreA !== undefined && scoreB !== null && scoreB !== undefined;

  return (
    <article className="card-surface group overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:border-neon-400/40">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b border-white/10 bg-black/20 px-4 py-3 sm:px-5">
        <span className="truncate text-sm font-medium text-slate-400">
          {round || "ম্যাচ"}
          {isSample && <span className="ml-2 rounded bg-gold-400/20 px-1.5 py-0.5 text-[11px] text-gold-300">নমুনা</span>}
        </span>
        <span className={cn("inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold", statusStyles[status])}>
          {status === "live" && <span className="h-2 w-2 animate-pulse-dot rounded-full bg-red-400" />}
          {matchStatusLabels[status] || status}
        </span>
      </div>

      {/* Scoreboard */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-3 py-6 sm:gap-4 sm:px-6">
        <div className="flex min-w-0 flex-col items-center gap-3 text-center">
          <TeamBadge name={teamA} tone="a" />
          <span className="w-full break-words text-sm font-bold text-white sm:text-lg">{teamA}</span>
        </div>

        <div className="flex min-w-[76px] flex-col items-center">
          {hasScore ? (
            <div className="flex items-center gap-2 rounded-2xl bg-navy-950/80 px-4 py-2 text-3xl font-extrabold text-white ring-1 ring-white/10 sm:text-4xl">
              <span className={scoreA > scoreB ? "text-neon-400" : ""}>{toBn(scoreA)}</span>
              <span className="text-slate-500">-</span>
              <span className={scoreB > scoreA ? "text-neon-400" : ""}>{toBn(scoreB)}</span>
            </div>
          ) : (
            <span className="rounded-full bg-white/10 px-4 py-2 text-lg font-extrabold tracking-widest text-gold-300">VS</span>
          )}
        </div>

        <div className="flex min-w-0 flex-col items-center gap-3 text-center">
          <TeamBadge name={teamB} tone="b" />
          <span className="w-full break-words text-sm font-bold text-white sm:text-lg">{teamB}</span>
        </div>
      </div>

      {/* Details */}
      <ul className="space-y-2 border-t border-white/10 bg-black/20 px-4 py-4 text-sm text-slate-300 sm:px-5">
        <li className="flex items-start gap-2">
          <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-neon-400" aria-hidden="true" />
          <span>{date}</span>
        </li>
        <li className="flex items-start gap-2">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-neon-400" aria-hidden="true" />
          <span>{time}</span>
        </li>
        <li className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-neon-400" aria-hidden="true" />
          <span>{venue}</span>
        </li>
      </ul>
    </article>
  );
}
