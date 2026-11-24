import { useEffect, useState } from "react";
import { Radio, CalendarClock, Flag, Info } from "lucide-react";
import PageHeader from "../components/PageHeader";
import MatchCard from "../components/MatchCard";
import { getMatches, groupMatchesByStatus } from "../services/matchService";

function MatchGroup({ icon: Icon, title, matches, emptyText, accent }) {
  return (
    <section className="mb-14">
      <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-white">
        <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent}`}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        {title}
        <span className="rounded-full bg-white/10 px-3 py-0.5 text-sm font-medium text-slate-300">{matches.length}</span>
      </h2>
      {matches.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {matches.map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-6 text-center text-slate-400">{emptyText}</p>
      )}
    </section>
  );
}

export default function Matches() {
  const [groups, setGroups] = useState({ live: [], upcoming: [], completed: [] });
  const [hasSample, setHasSample] = useState(false);

  useEffect(() => {
    getMatches().then((list) => {
      setGroups(groupMatchesByStatus(list));
      setHasSample(list.some((m) => m.isSample));
    });
  }, []);

  return (
    <>
      <PageHeader eyebrow="ম্যাচ আপডেট" title="ম্যাচ সূচি ও ফলাফল" description="আসন্ন ম্যাচ, চলমান ম্যাচ এবং সমাপ্ত ম্যাচের ফলাফল এক জায়গায়।" />

      <section className="bg-navy-950 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {hasSample && (
            <div className="mb-10 flex items-start gap-3 rounded-2xl border border-gold-400/40 bg-gold-400/10 p-4 text-gold-100">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold-300" aria-hidden="true" />
              <p className="text-sm leading-relaxed sm:text-base">
                নিচের ম্যাচগুলো <strong>নমুনা তথ্য</strong>। অফিসিয়াল ম্যাচ সূচি ও ফলাফল প্রকাশিত হলে এখানে হালনাগাদ করা হবে।
              </p>
            </div>
          )}

          <MatchGroup icon={Radio} title="লাইভ ম্যাচ" matches={groups.live} emptyText="বর্তমানে কোনো ম্যাচ চলছে না।" accent="bg-red-500/20 text-red-300" />
          <MatchGroup icon={CalendarClock} title="আসন্ন ম্যাচ" matches={groups.upcoming} emptyText="আসন্ন কোনো ম্যাচের তথ্য এখনও প্রকাশ করা হয়নি।" accent="bg-sky-400/20 text-sky-300" />
          <MatchGroup icon={Flag} title="সমাপ্ত ম্যাচ ও ফলাফল" matches={groups.completed} emptyText="এখনও কোনো ম্যাচের ফলাফল নেই।" accent="bg-neon-400/20 text-neon-300" />
        </div>
      </section>
    </>
  );
}
