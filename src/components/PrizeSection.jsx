import PrizeMoneyCard from "./PrizeMoneyCard";
import SectionHeading from "./SectionHeading";
import { prizes } from "../data/tournament";

export default function PrizeSection() {
  return (
    <section className="hero-bg py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="প্রাইজ পুল" title={`মোট প্রাইজমানি: ${prizes.total}`} description="সেরা দলের জন্য অপেক্ষা করছে আকর্ষণীয় নগদ পুরস্কার ও ট্রফি।" />
        <div className="grid items-center gap-6 md:grid-cols-3">
          <PrizeMoneyCard variant="runnerUp" title={prizes.runnerUp.title} amount={prizes.runnerUp.amount} extra={prizes.runnerUp.extra} />
          <PrizeMoneyCard variant="total" featured title="মোট প্রাইজমানি" amount={prizes.total} />
          <PrizeMoneyCard variant="champion" title={prizes.champion.title} amount={prizes.champion.amount} extra={prizes.champion.extra} />
        </div>
      </div>
    </section>
  );
}
