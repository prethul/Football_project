import { Check } from "lucide-react";
import { posterRules } from "../data/rules";
import Button from "./Button";
import PosterImage from "./PosterImage";
import SectionHeading from "./SectionHeading";
import { images } from "../data/tournament";

// Short rules preview for the Home page, next to the official rules poster.
export default function RulesPreview() {
  return (
    <section className="bg-navy-900 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="খেলার নিয়মাবলি" title="গুরুত্বপূর্ণ নিয়মাবলি" description="অংশগ্রহণের আগে মূল নিয়মগুলো জেনে নিন।" />

        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="card-surface rounded-3xl p-3 sm:p-4">
            <PosterImage src={images.rulesPoster} alt="ফুটবল প্রিমিয়ার লীগ ২০২৬ খেলার নিয়মাবলি পোস্টার" fileName="knts-rules-poster.jpg" />
          </div>

          <div>
            <ul className="space-y-3">
              {posterRules.slice(0, 5).map((rule, i) => (
                <li key={rule} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-neon-400/40 hover:bg-white/10">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neon-400 text-navy-950">
                    <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span className="text-slate-100">
                    <span className="sr-only">{i + 1}. </span>
                    {rule}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <Button to="/rules" size="lg">
                সকল নিয়মাবলি দেখুন
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
