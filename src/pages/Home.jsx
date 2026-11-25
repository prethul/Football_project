import { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import TournamentPoster from "../components/TournamentPoster";
import PrizeSection from "../components/PrizeSection";
import JerseyAnnouncement from "../components/JerseyAnnouncement";
import TournamentInfo from "../components/TournamentInfo";
import RulesPreview from "../components/RulesPreview";
import MatchCard from "../components/MatchCard";
import SectionHeading from "../components/SectionHeading";
import Button from "../components/Button";
import { getMatches } from "../services/matchService";
import SponsorshipSection from "../components/SponsorshipSection";

export default function Home() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    getMatches().then(setMatches);
  }, []);

  // Show live matches first, then upcoming, then completed
  const order = { live: 0, upcoming: 1, completed: 2 };
  const latest = [...matches].sort((a, b) => order[a.status] - order[b.status]).slice(0, 3);

  return (
    <>
      <HeroSection />
      <TournamentPoster />
      <PrizeSection />
      <SponsorshipSection />
      <JerseyAnnouncement />

      <section className="bg-navy-950 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="টুর্নামেন্ট তথ্য" title="টুর্নামেন্ট এক নজরে" />
          <TournamentInfo />
        </div>
      </section>

      <RulesPreview />

      <section className="pitch-bg py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="ম্যাচ আপডেট" title="সর্বশেষ ম্যাচ আপডেট" description="আসন্ন ম্যাচ ও সাম্প্রতিক ফলাফল এখানে দেখুন।" />
          {latest.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {latest.map((m) => (
                <MatchCard key={m.id} match={m} />
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-300">ম্যাচের তথ্য শীঘ্রই প্রকাশ করা হবে।</p>
          )}
          <div className="mt-10 text-center">
            <Button to="/matches" size="lg" variant="outline">
              সকল ম্যাচ দেখুন
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
