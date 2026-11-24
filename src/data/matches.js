// ------------------------------------------------------------------
// Match data. Edit this file manually to update matches.
//
// status values:
//   "upcoming"  -> upcoming match
//   "live"      -> match currently being played (update score by hand)
//   "completed" -> finished match with final score
//
// Set `isSample: true` for demo rows. Remove the sample rows and
// add real matches when the fixture is announced.
//
// Later this array can be replaced by data fetched from
// Google Sheets / an admin dashboard (see src/services/matchService.js).
// ------------------------------------------------------------------

export const matches = [
  {
    id: "m-001",
    teamA: "দল ক",
    teamB: "দল খ",
    date: "তারিখ ঘোষণা করা হবে",
    time: "সময় ঘোষণা করা হবে",
    venue: "ভাওয়াল ইকো টার্ফ, বাসন, গাজীপুর",
    status: "upcoming",
    scoreA: null,
    scoreB: null,
    round: "নমুনা ম্যাচ",
    isSample: true,
  },
  {
    id: "m-002",
    teamA: "দল গ",
    teamB: "দল ঘ",
    date: "তারিখ ঘোষণা করা হবে",
    time: "সময় ঘোষণা করা হবে",
    venue: "ভাওয়াল ইকো টার্ফ, বাসন, গাজীপুর",
    status: "upcoming",
    scoreA: null,
    scoreB: null,
    round: "নমুনা ম্যাচ",
    isSample: true,
  },
  {
    id: "m-003",
    teamA: "দল ঙ",
    teamB: "দল চ",
    date: "তারিখ ঘোষণা করা হবে",
    time: "সময় ঘোষণা করা হবে",
    venue: "ভাওয়াল ইকো টার্ফ, বাসন, গাজীপুর",
    status: "completed",
    scoreA: 3,
    scoreB: 2,
    round: "নমুনা ফলাফল",
    isSample: true,
  },
  {
    id: "m-004",
    teamA: "দল ছ",
    teamB: "দল জ",
    date: "তারিখ ঘোষণা করা হবে",
    time: "সময় ঘোষণা করা হবে",
    venue: "ভাওয়াল ইকো টার্ফ, বাসন, গাজীপুর",
    status: "completed",
    scoreA: 1,
    scoreB: 1,
    round: "নমুনা ফলাফল",
    isSample: true,
  },
];

export const matchStatusLabels = {
  upcoming: "আসন্ন",
  live: "লাইভ",
  completed: "সমাপ্ত",
};
