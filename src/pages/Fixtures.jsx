import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Clock,
  Crown,
  Info,
  Radio,
  Shield,
  Settings,
  Trophy,
  Users,
  X,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import { getMatches, getRegisteredTeams, saveMatches } from "../services/matchService";
import { cn } from "../utils/cn";

const roundNames = [
  { key: "r16", title: "রাউন্ড অফ ১৬", subtitle: "১৬ দল • ৮ ম্যাচ" },
  { key: "qf", title: "কোয়ার্টার-ফাইনাল", subtitle: "৮ দল • ৪ ম্যাচ" },
  { key: "sf", title: "সেমি-ফাইনাল", subtitle: "৪ দল • ২ ম্যাচ" },
  { key: "final", title: "গ্র্যান্ড ফাইনাল", subtitle: "২ দল • ১ ম্যাচ" },
];

const statusLabels = { upcoming: "Upcoming", live: "Live", completed: "Completed" };

function validWinner(match) {
  if (!match || match.status !== "completed") return null;
  const a = Number(match.scoreA);
  const b = Number(match.scoreB);
  if (!Number.isFinite(a) || !Number.isFinite(b) || a < 0 || b < 0) return null;

  if (a !== b) {
    if (a > b) return match.teamA || null;
    return match.teamB || null;
  }

  const pa = Number(match.penaltyA);
  const pb = Number(match.penaltyB);
  if (!Number.isFinite(pa) || !Number.isFinite(pb) || pa < 0 || pb < 0) return null;
  if (pa === pb) return null;
  return pa > pb ? match.teamA || null : match.teamB || null;
}

function loserOf(match) {
  const winner = validWinner(match);
  if (!winner) return null;
  return match.teamA === winner ? match.teamB : match.teamA;
}

function TeamBadge({ name, small = false }) {
  const initial = name && name !== "TBD" ? Array.from(name.trim())[0] || "?" : "?";
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full border border-gold-400/40 bg-gradient-to-br from-navy-700 to-navy-950 font-black text-gold-300 shadow-lg",
        small ? "h-7 w-7 text-xs" : "h-10 w-10 text-base"
      )}
      aria-hidden="true"
    >
      {initial}
    </span>
  );
}

function TrophySvg() {
  return (
    <svg viewBox="0 0 180 220" className="h-full w-full" role="img" aria-label="Golden championship trophy">
      <defs>
        <linearGradient id="cupGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff1a6" />
          <stop offset=".28" stopColor="#ffc933" />
          <stop offset=".62" stopColor="#b76e00" />
          <stop offset="1" stopColor="#ffe08a" />
        </linearGradient>
        <filter id="goldShadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#f5a70a" floodOpacity=".55" />
        </filter>
      </defs>
      <g filter="url(#goldShadow)">
        <path d="M52 35h76v38c0 27-17 49-38 49S52 100 52 73V35z" fill="url(#cupGold)" stroke="#ffe08a" strokeWidth="3" />
        <path d="M52 48H25c3 50 26 69 53 58" fill="none" stroke="url(#cupGold)" strokeWidth="14" strokeLinecap="round" />
        <path d="M128 48h27c-3 50-26 69-53 58" fill="none" stroke="url(#cupGold)" strokeWidth="14" strokeLinecap="round" />
        <path d="M90 120v34" stroke="#ffd45a" strokeWidth="12" />
        <path d="M58 171h64l-8 15H66z" fill="url(#cupGold)" />
        <ellipse cx="90" cy="188" rx="49" ry="12" fill="#d89408" stroke="#ffe08a" strokeWidth="3" />
        <ellipse cx="90" cy="184" rx="49" ry="12" fill="url(#cupGold)" />
        <circle cx="90" cy="76" r="20" fill="#7a4b08" opacity=".7" />
        <path d="M90 60l5 10 11 2-8 7 2 11-10-5-10 5 2-11-8-7 11-2z" fill="#ffd966" />
      </g>
    </svg>
  );
}

function BracketMatch({ match, roundIndex, eliminated }) {
  const winner = validWinner(match);
  const scoreAvailable =
    match.status === "completed" &&
    match.scoreA !== null &&
    match.scoreB !== null &&
    match.scoreA !== "" &&
    match.scoreB !== "";
  const draw = scoreAvailable && Number(match.scoreA) === Number(match.scoreB);
  const teamA = match.teamA || "TBD";
  const teamB = match.teamB || "TBD";

  return (
    <article
      className={cn(
        "bracket-match min-w-[238px] rounded-2xl border bg-navy-900/95 shadow-2xl",
        match.status === "live" ? "border-red-400/60" : "border-white/10",
        winner && "border-gold-400/50"
      )}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
          Match {match.slot + 1}
        </span>
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-[10px] font-bold",
            match.status === "live"
              ? "bg-red-500/20 text-red-300"
              : match.status === "completed"
                ? "bg-neon-400/15 text-neon-300"
                : "bg-sky-400/10 text-sky-300"
          )}
        >
          {statusLabels[match.status]}
        </span>
      </div>

      {[["A", teamA, match.scoreA, eliminated.has(teamA)], ["B", teamB, match.scoreB, eliminated.has(teamB)]].map(
        ([side, team, score, isEliminated]) => {
          const isWinner = Boolean(winner && winner === team);
          return (
            <div
              key={side}
              className={cn(
                "grid grid-cols-[32px_1fr_auto] items-center gap-2 px-3 py-2.5",
                isWinner && "bg-gold-400/10 text-gold-200",
                isEliminated && team !== "TBD" && "opacity-40"
              )}
            >
              <TeamBadge name={team} small />
              <span className={cn("truncate text-sm font-bold", isWinner ? "text-gold-200" : "text-white")}>{team}</span>
              <span className={cn("min-w-6 text-right text-lg font-black", isWinner ? "text-gold-300" : "text-slate-300")}>
                {score === null || score === "" ? "–" : score}
              </span>
            </div>
          );
        }
      )}

      {draw && match.status === "completed" && (
        <div className="border-t border-white/10 px-3 py-1.5 text-xs text-gold-300">
          Penalties: {match.penaltyA ?? "–"} – {match.penaltyB ?? "–"}
        </div>
      )}
      <div className="flex items-center gap-3 border-t border-white/10 px-3 py-2 text-[11px] text-slate-400">
        <span className="flex items-center gap-1">
          <CalendarDays className="h-3.5 w-3.5" /> {match.date || "Date TBD"}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" /> {match.time || "Time TBD"}
        </span>
      </div>
    </article>
  );
}

function ChampionModal({ champion, onClose }) {
  if (!champion) return null;
  return (
    <div className="champion-overlay fixed inset-0 z-[100] flex items-center justify-center overflow-hidden px-4" role="dialog" aria-modal="true">
      <button className="absolute right-4 top-4 z-20 rounded-full bg-black/40 p-2 text-white" onClick={onClose} aria-label="Close">
        <X className="h-6 w-6" />
      </button>
      <div className="champion-confetti" aria-hidden="true" />
      <div className="stadium-lights" aria-hidden="true" />
      <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
        <div className="champion-trophy h-44 w-36 sm:h-56 sm:w-44">
          <TrophySvg />
        </div>
        <TeamBadge name={champion} />
        <p className="mt-5 text-gold-300 text-sm font-bold uppercase tracking-[0.32em]">KNTS Champion</p>
        <h2 className="mt-2 text-3xl font-black text-gradient-gold sm:text-5xl">{champion}</h2>
        <h3 className="mt-5 text-xl font-black text-white sm:text-3xl">CHAMPIONS OF KNTS FOOTBALL TOURNAMENT!</h3>
      </div>
    </div>
  );
}

function MatchEditor({ matches, teams, onSave, onClose }) {
  const [draft, setDraft] = useState(matches.map((match) => ({ ...match })));
  const update = (id, field, value) => {
    setDraft((list) => list.map((match) => (match.id === id ? { ...match, [field]: value } : match)));
  };
  const scoreUpdate = (id, field, value) => update(id, field, value === "" ? null : Number(value));

  const submit = async (event) => {
    event.preventDefault();
    await onSave(draft);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[90] overflow-y-auto bg-navy-950/95 p-4 backdrop-blur-xl sm:p-8">
      <form onSubmit={submit} className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-gold-300">MATCH MANAGEMENT</p>
            <h2 className="text-2xl font-black text-white">Fixture & result editor</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-full bg-white/10 p-2 text-white"><X /></button>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {draft.map((match) => {
            const draw = match.status === "completed" && match.scoreA !== null && match.scoreB !== null && Number(match.scoreA) === Number(match.scoreB);
            return (
              <fieldset key={match.id} className="card-surface rounded-2xl p-4">
                <legend className="px-2 text-sm font-bold text-gold-300">{match.roundLabel} • Match {match.slot + 1}</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="text-xs text-slate-400">Team A
                    <select className="field-input mt-1" value={match.teamA} onChange={(e) => update(match.id, "teamA", e.target.value)}>
                      <option value="">TBD</option>
                      {teams.map((team) => <option key={team} value={team}>{team}</option>)}
                    </select>
                  </label>
                  <label className="text-xs text-slate-400">Team B
                    <select className="field-input mt-1" value={match.teamB} onChange={(e) => update(match.id, "teamB", e.target.value)}>
                      <option value="">TBD</option>
                      {teams.map((team) => <option key={team} value={team}>{team}</option>)}
                    </select>
                  </label>
                  <label className="text-xs text-slate-400">Date
                    <input className="field-input mt-1" type="text" value={match.date || ""} onChange={(e) => update(match.id, "date", e.target.value)} />
                  </label>
                  <label className="text-xs text-slate-400">Time
                    <input className="field-input mt-1" type="text" value={match.time || ""} onChange={(e) => update(match.id, "time", e.target.value)} />
                  </label>
                  <label className="text-xs text-slate-400">Status
                    <select className="field-input mt-1" value={match.status} onChange={(e) => update(match.id, "status", e.target.value)}>
                      <option value="upcoming">Upcoming</option>
                      <option value="live">Live</option>
                      <option value="completed">Completed</option>
                    </select>
                  </label>
                  <div />
                  <label className="text-xs text-slate-400">Team A score
                    <input className="field-input mt-1" type="number" min="0" value={match.scoreA ?? ""} onChange={(e) => scoreUpdate(match.id, "scoreA", e.target.value)} />
                  </label>
                  <label className="text-xs text-slate-400">Team B score
                    <input className="field-input mt-1" type="number" min="0" value={match.scoreB ?? ""} onChange={(e) => scoreUpdate(match.id, "scoreB", e.target.value)} />
                  </label>
                  {draw && (
                    <>
                      <label className="text-xs text-slate-400">Team A penalties
                        <input className="field-input mt-1" type="number" min="0" value={match.penaltyA ?? ""} onChange={(e) => scoreUpdate(match.id, "penaltyA", e.target.value)} />
                      </label>
                      <label className="text-xs text-slate-400">Team B penalties
                        <input className="field-input mt-1" type="number" min="0" value={match.penaltyB ?? ""} onChange={(e) => scoreUpdate(match.id, "penaltyB", e.target.value)} />
                      </label>
                    </>
                  )}
                </div>
              </fieldset>
            );
          })}
        </div>
        <div className="sticky bottom-0 mt-6 flex justify-end bg-navy-950/90 p-3">
          <button type="submit" className="rounded-xl bg-gold-400 px-6 py-3 font-black text-navy-950">Save matches</button>
        </div>
      </form>
    </div>
  );
}

export default function Fixtures() {
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editor, setEditor] = useState(false);
  const [championModal, setChampionModal] = useState(false);
  const [notice, setNotice] = useState("");

  const refresh = async () => {
    setLoading(true);
    const [matchList, registeredTeams] = await Promise.all([getMatches(), Promise.resolve(getRegisteredTeams())]);
    setMatches(matchList);
    setTeams(registeredTeams);
    setLoading(false);
  };

  useEffect(() => { refresh(); }, []);

  const bracket = useMemo(() => {
    const rounds = roundNames.map((round) => {
      const count = round.key === "r16" ? 8 : round.key === "qf" ? 4 : round.key === "sf" ? 2 : 1;
      return matches.filter((match) => match.round === round.key).slice(0, count);
    });

    for (let roundIndex = 1; roundIndex < rounds.length; roundIndex += 1) {
      const previous = rounds[roundIndex - 1];
      rounds[roundIndex] = rounds[roundIndex].map((match, slot) => ({
        ...match,
        teamA: validWinner(previous[slot * 2]) || "",
        teamB: validWinner(previous[slot * 2 + 1]) || "",
      }));
    }
    return rounds;
  }, [matches]);

  const allEliminated = useMemo(() => {
    const eliminated = new Set();
    matches.forEach((match) => {
      const loser = loserOf(match);
      if (loser) eliminated.add(loser);
    });
    return eliminated;
  }, [matches]);

  const completedCount = matches.filter((match) => validWinner(match)).length;
  const upcomingCount = matches.filter((match) => match.status === "upcoming").length;
  const finalMatch = bracket[3]?.[0];
  const champion = finalMatch ? validWinner(finalMatch) : null;

  let currentRound = "চূড়ান্ত ফলাফল অপেক্ষমান";
  for (const round of bracket) {
    if (round.some((match) => match.status !== "completed" || !validWinner(match))) {
      currentRound = roundNames.find((item) => item.key === round[0]?.round)?.title || "ফিক্সচার অপেক্ষমান";
      break;
    }
  }
  if (completedCount === 15 && champion) currentRound = "টুর্নামেন্ট সম্পন্ন";

  const trophyClick = () => {
    if (!champion) {
      setNotice("The Champion Has Not Been Decided Yet!");
      window.setTimeout(() => setNotice(""), 3200);
      return;
    }
    setChampionModal(true);
  };

  const save = async (draft) => {
    await saveMatches(draft);
    await refresh();
  };

  return (
    <>
      <PageHeader eyebrow="KNOCKOUT 2026" title="Fixtures & Knockout Bracket" description="১৬ দল, ১৫ ম্যাচ — প্রতিটি বিজয়ী পরের রাউন্ডে এগিয়ে যাবে।" />
      {notice && <div className="fixed left-1/2 top-24 z-[80] -translate-x-1/2 rounded-2xl border border-gold-400/40 bg-navy-900 px-5 py-3 text-center font-bold text-gold-200 shadow-2xl">{notice}</div>}

      <section className="relative min-h-screen overflow-hidden bg-navy-950 py-10 sm:py-14">
        <div className="bracket-ambient absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1500px] px-4 sm:px-6">
          <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
            {[
              [Users, "দল", "16"],
              [Trophy, "ম্যাচ", "15"],
              [Shield, "সম্পন্ন", String(completedCount)],
              [Radio, "আসন্ন", String(upcomingCount)],
              [Crown, "বিদায়প্রাপ্ত", String(allEliminated.size)],
              [Settings, "বর্তমান রাউন্ড", currentRound],
            ].map(([Icon, label, value]) => (
              <div key={label} className="card-surface min-h-24 rounded-2xl p-4">
                <Icon className="mb-2 h-5 w-5 text-gold-400" />
                <p className="text-xs text-slate-400">{label}</p>
                <p className="mt-1 truncate text-base font-black text-white">{value}</p>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between text-xs font-bold text-slate-400">
              <span>টুর্নামেন্ট প্রগ্রেস</span><span>{completedCount}/15</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-neon-500 via-gold-400 to-gold-300 transition-all duration-700" style={{ width: `${(completedCount / 15) * 100}%` }} />
            </div>
          </div>

          {loading ? (
            <div className="card-surface rounded-2xl p-10 text-center text-slate-300">Loading knockout bracket...</div>
          ) : (
            <div className="bracket-scroll overflow-x-auto pb-8">
              <div className="grid min-w-[1160px] grid-cols-[260px_260px_260px_260px_170px] gap-x-10">
                {bracket.map((round, roundIndex) => (
                  <section key={roundNames[roundIndex].key} className="bracket-round">
                    <div className="mb-5 text-center">
                      <h2 className="text-lg font-black text-white">{roundNames[roundIndex].title}</h2>
                      <p className="mt-1 text-xs text-gold-300">{roundNames[roundIndex].subtitle}</p>
                    </div>
                    <div
                      className="flex flex-col"
                      style={{ gap: roundIndex === 0 ? "28px" : roundIndex === 1 ? "105px" : roundIndex === 2 ? "258px" : "0" }}
                    >
                      {round.map((match) => (
                        <BracketMatch key={match.id} match={match} roundIndex={roundIndex} eliminated={allEliminated} />
                      ))}
                    </div>
                  </section>
                ))}

                <section className="flex flex-col items-center pt-12">
                  <button type="button" onClick={trophyClick} className="trophy-button h-52 w-44" aria-label="Reveal tournament champion">
                    <TrophySvg />
                  </button>
                  <p className="mt-3 text-center text-xs font-bold uppercase tracking-[0.2em] text-gold-300">Tap to reveal</p>
                  {champion && <p className="mt-3 text-center text-lg font-black text-white">{champion}</p>}
                </section>
              </div>
            </div>
          )}

          <div className="mt-4 flex flex-col items-start justify-between gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 sm:flex-row sm:items-center">
            <p className="flex items-start gap-2 text-sm text-slate-400">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              Drawn matches require penalty shootout scores before the winner can advance.
            </p>
            {import.meta.env.VITE_KNTS_ADMIN_PIN ? (
              <button
                type="button"
                onClick={() => {
                  const pin = window.prompt("Admin PIN");
                  if (pin === import.meta.env.VITE_KNTS_ADMIN_PIN) setEditor(true);
                  else if (pin !== null) setNotice("Incorrect admin PIN.");
                }}
                className="shrink-0 rounded-xl border border-gold-400/40 bg-gold-400/10 px-4 py-2 text-sm font-bold text-gold-300"
              >
                Match Manager
              </button>
            ) : (
              <span className="text-xs text-slate-500">Admin editor disabled until VITE_KNTS_ADMIN_PIN is configured</span>
            )}
          </div>
        </div>
      </section>

      {editor && <MatchEditor matches={matches} teams={teams} onSave={save} onClose={() => setEditor(false)} />}
      {championModal && <ChampionModal champion={champion} onClose={() => setChampionModal(false)} />}
    </>
  );
}
