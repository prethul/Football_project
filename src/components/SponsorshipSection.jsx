import { BadgeCheck, Megaphone, HandHeart, Award, ArrowDown } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Button from "./Button";
import { sponsorship } from "../data/tournament";

const benefits = [
  {
    icon: Megaphone,
    title: "ব্র্যান্ড প্রচারের সুযোগ",
    description: "টুর্নামেন্টের মাধ্যমে আপনার প্রতিষ্ঠান বা ব্যবসার পরিচিতি বাড়ানোর সুযোগ।",
  },
  {
    icon: BadgeCheck,
    title: "ব্র্যান্ড পরিচিতি",
    description: "খেলোয়াড়, দর্শক ও ফুটবলপ্রেমীদের কাছে আপনার প্রতিষ্ঠানের পরিচিতি তুলে ধরার সুযোগ।",
  },
  {
    icon: HandHeart,
    title: "সামাজিক অবদান",
    description: "স্থানীয় ফুটবল ও তরুণ প্রতিভাদের এগিয়ে নিতে সহযোগিতা করার সুযোগ।",
  },
  {
    icon: Award,
    title: "বিশেষ স্বীকৃতি",
    description: "টুর্নামেন্টের স্পনসর হিসেবে আপনার প্রতিষ্ঠানকে যথাযথ স্বীকৃতি দেওয়ার সুযোগ।",
  },
];

function scrollToContact() {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function SponsorshipSection() {
  return (
    <section id="sponsorship" className="bg-navy-900 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-gold-400/25 bg-gradient-to-br from-navy-800 to-pitch-900 px-5 py-10 text-center shadow-2xl sm:px-10 sm:py-14">
          <div className="absolute -left-16 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full bg-neon-400/10 blur-3xl" aria-hidden="true" />
          <div className="absolute -right-16 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full bg-gold-400/10 blur-3xl" aria-hidden="true" />
          <div className="relative mx-auto max-w-4xl">
            <span className="mb-4 inline-flex rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1 text-sm font-semibold text-gold-300">
              স্পনসরশিপ
            </span>
            <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">{sponsorship.heading}</h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {sponsorship.description}
            </p>
            <Button onClick={scrollToContact} variant="gold" size="lg" icon={ArrowDown} className="mt-8">
              স্পনসর হতে যোগাযোগ করুন
            </Button>
          </div>
        </div>

        <div className="pt-14 sm:pt-16">
          <SectionHeading eyebrow="সহযোগিতার সুযোগ" title={sponsorship.benefitsHeading} />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="card-surface group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-gold-400/30 bg-gold-400/10 text-gold-300 transition-colors group-hover:bg-gold-400 group-hover:text-navy-950">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{description}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-navy-950 px-6 py-8 text-center sm:px-10 sm:py-10">
            <h3 className="text-2xl font-extrabold text-white sm:text-3xl">{sponsorship.opportunityHeading}</h3>
            <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-slate-300">
              {sponsorship.opportunityDescription}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
