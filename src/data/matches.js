const roundConfig = [
  ["r16", "রাউন্ড অফ ১৬", 8],
  ["qf", "কোয়ার্টার-ফাইনাল", 4],
  ["sf", "সেমি-ফাইনাল", 2],
  ["final", "গ্র্যান্ড ফাইনাল", 1],
];

export const matches = roundConfig.flatMap(([round, label, count]) =>
  Array.from({ length: count }, (_, index) => ({
    id: `${round}-${index + 1}`,
    round,
    roundLabel: label,
    slot: index,
    teamA: "",
    teamB: "",
    date: "",
    time: "",
    venue: "ভাওয়াল ইকো টার্ফ, বাসন, গাজীপুর",
    status: "upcoming",
    scoreA: null,
    scoreB: null,
    penaltyA: null,
    penaltyB: null,
  }))
);

export const matchStatusLabels = {
  upcoming: "আসন্ন",
  live: "লাইভ",
  completed: "সমাপ্ত",
};
