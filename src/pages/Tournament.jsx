import PageHeader from "../components/PageHeader";
import TournamentPoster from "../components/TournamentPoster";
import TournamentInfo from "../components/TournamentInfo";
import PrizeSection from "../components/PrizeSection";
import JerseyAnnouncement from "../components/JerseyAnnouncement";
import SectionHeading from "../components/SectionHeading";
import Button from "../components/Button";
import { contacts } from "../data/tournament";
import { Phone } from "lucide-react";

export default function Tournament() {
  return (
    <>
      <PageHeader
        eyebrow="টুর্নামেন্ট"
        title="KNTS ফুটসাল প্রিমিয়ার লীগ ২০২৬"
        description="কড্ডা নান্দুন তরুণ সংঘ (কনাতস) আয়োজিত অর্ধ লক্ষ টাকার ফুটসাল টুর্নামেন্ট – সিজন-৩।"
      />
      <TournamentPoster showHeading={false} />

      <section className="bg-navy-950 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="বিস্তারিত" title="টুর্নামেন্ট তথ্য" />
          <TournamentInfo />
        </div>
      </section>

      <PrizeSection />
      <JerseyAnnouncement />

      <section className="bg-navy-900 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <SectionHeading eyebrow="যোগাযোগ" title="রেজিস্ট্রেশন বা তথ্যের জন্য যোগাযোগ করুন" />
          <div className="grid gap-4 sm:grid-cols-3">
            {contacts.map((c) => (
              <a key={c.phone} href={`tel:${c.phone}`} className="card-surface rounded-2xl p-5 transition hover:-translate-y-1 hover:border-neon-400/40">
                <Phone className="mx-auto mb-2 h-6 w-6 text-neon-400" aria-hidden="true" />
                <p className="font-bold text-white">{c.name}</p>
                <p className="text-slate-300">{c.display}</p>
              </a>
            ))}
          </div>
          <div className="mt-10">
            <Button to="/register" size="lg">
              টিম রেজিস্ট্রেশন করুন
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
