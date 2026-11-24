import { ScrollText, ClipboardList, UserCheck, Timer, Clock, Flag, HeartHandshake, Gavel, Info } from "lucide-react";
import PageHeader from "../components/PageHeader";
import PosterImage from "../components/PosterImage";
import Button from "../components/Button";
import { ruleSections } from "../data/rules";
import { images } from "../data/tournament";
import { toBn } from "../utils/validation";

const icons = { ScrollText, ClipboardList, UserCheck, Timer, Clock, Flag, HeartHandshake, Gavel };

export default function Rules() {
  return (
    <>
      <PageHeader
        eyebrow="নিয়মাবলি"
        title="টুর্নামেন্টের নিয়মাবলি"
        description="অংশগ্রহণের আগে সকল নিয়ম মনোযোগ দিয়ে পড়ুন। সব দলকে এই নিয়ম মেনে চলতে হবে।"
      />

      <section className="bg-navy-900 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="card-surface rounded-3xl p-3 sm:p-4">
            <PosterImage src={images.rulesPoster} alt="ফুটবল প্রিমিয়ার লীগ ২০২৬ খেলার নিয়মাবলি – অফিসিয়াল পোস্টার" fileName="knts-rules-poster.jpg" caption="অফিসিয়াল খেলার নিয়মাবলি পোস্টার" />
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-start gap-3 rounded-2xl border border-sky-400/30 bg-sky-400/10 p-4 text-sky-100">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-sky-300" aria-hidden="true" />
            <p className="text-sm leading-relaxed sm:text-base">
              <span className="mr-1 rounded bg-neon-400/20 px-1.5 py-0.5 text-xs font-semibold text-neon-300">অফিসিয়াল</span> চিহ্নিত নিয়মগুলো পোস্টার থেকে নেওয়া।{" "}
              <span className="mr-1 rounded bg-gold-400/20 px-1.5 py-0.5 text-xs font-semibold text-gold-300">আয়োজক ঘোষণা করবেন</span> চিহ্নিত বিষয়গুলো এখনও নিশ্চিত নয়।
            </p>
          </div>

          <div className="space-y-6">
            {ruleSections.map((section, sIndex) => {
              const Icon = icons[section.icon] || ScrollText;
              return (
                <article key={section.id} id={section.id} className="card-surface scroll-mt-24 rounded-3xl p-5 sm:p-8">
                  <h2 className="mb-5 flex items-center gap-3 text-xl font-bold text-white sm:text-2xl">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-neon-300 to-neon-500 text-navy-950">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="mr-2 text-neon-400">{toBn(sIndex + 1)}.</span>
                      {section.title}
                    </span>
                  </h2>
                  <ol className="space-y-3">
                    {section.rules.map((rule, rIndex) => (
                      <li key={rule.text} className="flex items-start gap-3 rounded-xl bg-white/5 p-3 sm:p-4">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy-700 text-sm font-bold text-neon-300">
                          {toBn(rIndex + 1)}
                        </span>
                        <p className="min-w-0 flex-1 break-words text-slate-100">
                          {rule.text}{" "}
                          {rule.configurable && (
                            <span className="inline-block rounded-full bg-gold-400/20 px-2.5 py-0.5 text-xs font-semibold text-gold-300">আয়োজক ঘোষণা করবেন</span>
                          )}
                          {rule.fromPoster && (
                            <span className="inline-block rounded-full bg-neon-400/15 px-2.5 py-0.5 text-xs font-semibold text-neon-300">অফিসিয়াল</span>
                          )}
                        </p>
                      </li>
                    ))}
                  </ol>
                </article>
              );
            })}
          </div>

          <div className="mt-12 rounded-3xl border border-neon-400/30 bg-gradient-to-br from-pitch-800 to-navy-900 p-8 text-center">
            <h3 className="text-2xl font-bold text-white">নিয়মগুলো পড়া হয়েছে?</h3>
            <p className="mt-2 text-slate-300">এখনই আপনার দলের রেজিস্ট্রেশন সম্পন্ন করুন।</p>
            <div className="mt-6">
              <Button to="/register" size="lg">
                টিম রেজিস্ট্রেশন করুন
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
