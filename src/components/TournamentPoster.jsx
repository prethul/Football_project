import PosterImage from "./PosterImage";
import SectionHeading from "./SectionHeading";
import { images } from "../data/tournament";

// Official tournament poster area.
// To replace the poster: overwrite public/images/knts-tournament-poster.jpg
export default function TournamentPoster({ showHeading = true }) {
  return (
    <section className="relative bg-navy-900 py-16 sm:py-20" id="poster">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {showHeading && (
          <SectionHeading
            eyebrow="অফিসিয়াল পোস্টার"
            title="ফুটসাল প্রিমিয়ার লীগ ২০২৬ – সিজন-৩"
            description="টুর্নামেন্টের সকল গুরুত্বপূর্ণ তথ্য একনজরে দেখে নিন।"
          />
        )}

        <div className="relative">
          <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-neon-400/40 via-transparent to-gold-400/40 blur-xl" aria-hidden="true" />
          <div className="relative rounded-[1.75rem] border border-white/15 bg-navy-950 p-2 shadow-2xl shadow-black/50 sm:p-3">
            <PosterImage
              src={images.tournamentPoster}
              alt="KNTS ফুটসাল প্রিমিয়ার লীগ ২০২৬ অফিসিয়াল টুর্নামেন্ট পোস্টার"
              fileName="knts-tournament-poster.jpg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
