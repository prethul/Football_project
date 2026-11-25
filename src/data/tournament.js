// ------------------------------------------------------------------
// Tournament configuration.
// Edit this file to change tournament info, prizes, contacts and links.
// Values marked "null" or "ঘোষণা করা হবে" are not confirmed yet.
// ------------------------------------------------------------------

export const tournament = {
  name: "KNTS Football League",
  nameBn: "ফুটসাল প্রিমিয়ার লীগ ২০২৬",
  seasonLabel: "সিজন-৩",
  format: "ফুটসাল",
  organizer: "KNTS Club",
  organizerFullBn: "কড্ডা নান্দুন তরুণ সংঘ (কনাতস)",

  // true = registration open, false = registration closed
  registrationOpen: true,

  squadSize: 9, // exactly 9 players per team
  playersOnField: 6, // 6 on field + 3 substitutes (from official poster)

  entryFee: "৫,০০০ টাকা",

  // Not announced yet. Replace with real values when confirmed.
  registrationDeadline: "ঘোষণা করা হবে",
  startDate: "ঘোষণা করা হবে",
  venue: "ভাওয়াল ইকো টার্ফ, কড্ডা নান্দুন, ১৪ নং ওয়ার্ড, বাসন, গাজীপুর",
};

export const prizes = {
  total: "৫০,০০০ টাকা",
  champion: { title: "চ্যাম্পিয়ন", amount: "৩০,০০০ টাকা", extra: "+ ট্রফি" },
  runnerUp: { title: "রানার্স-আপ", amount: "২০,০০০ টাকা", extra: "+ ট্রফি" },
};

// Image paths: put your files inside public/images/ with these names.
export const images = {
  tournamentPoster: "/images/knts-tournament-poster.jpg",
  rulesPoster: "/images/knts-rules-poster.jpg",
};

// Contact placeholders. Replace with real details if needed.
export const contacts = [
  { name: "রিফাত", phone: "01712794430", display: "০১৭১২৭৯৪৪৩০" },
  { name: "সুমন", phone: "01942213466", display: "০১৯৪২২১৩৪৬৬" },
  { name: "আবিদ", phone: "01929603884", display: "০১৯২৯৬০৩৮৮৪" },
  // The 4th number on the poster (শিশির) looked incomplete.
  // Add it here after confirming the full 11-digit number.
  // { name: "শিশির", phone: "01XXXXXXXXX", display: "০১XXXXXXXXX" },
];

export const contactInfo = {
  email: "", // Not published yet. The UI shows "ঘোষণা করা হবে"
  address: "কড্ডা নান্দুন, ১৪ নং ওয়ার্ড, বাসন, গাজীপুর",
  facebookUrl: "",
  facebookLabel: "ফেসবুক পেজ",
};

export const sponsorship = {
  heading: "আমাদের টুর্নামেন্টের স্পনসর হতে আগ্রহী?",
  description:
    "আমাদের এই ফুটবল টুর্নামেন্টকে আরও সুন্দর ও সফল করে তুলতে আপনিও হতে পারেন আমাদের সহযোগী। ব্যক্তি, প্রতিষ্ঠান কিংবা ব্যবসায়িক প্রতিষ্ঠান—সবার জন্যই রয়েছে আমাদের টুর্নামেন্টের স্পনসর হওয়ার সুযোগ। আপনার সহযোগিতায় স্থানীয় ফুটবল ও তরুণ খেলোয়াড়দের এগিয়ে নেওয়ার এই আয়োজনে যুক্ত হোন।",
  benefitsHeading: "কেন আমাদের স্পনসর হবেন?",
  opportunityHeading: "আপনার সহযোগিতাই আমাদের অনুপ্রেরণা",
  opportunityDescription:
    "আপনি আমাদের টুর্নামেন্টের প্রধান স্পনসর, সহযোগী স্পনসর কিংবা সাধারণ স্পনসর হিসেবে যুক্ত হতে পারেন। স্পনসরশিপের বিস্তারিত তথ্য এবং সুযোগ-সুবিধা জানতে আমাদের আয়োজকদের সঙ্গে যোগাযোগ করুন।",
};

// Social links: replace "#" with real URLs.
export const socialLinks = [
  { label: "Facebook", href: "#", key: "facebook" },
  { label: "YouTube", href: "#", key: "youtube" },
  { label: "Instagram", href: "#", key: "instagram" },
];

export const jerseySizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

export const navLinks = [
  { to: "/", label: "হোম" },
  { to: "/tournament", label: "টুর্নামেন্ট" },
  { to: "/rules", label: "নিয়মাবলি" },
  { to: "/matches", label: "ম্যাচ আপডেট" },
  { to: "/fixtures", label: "ফিক্সচার ও ব্র্যাকেট" },
  { to: "/register", label: "টিম রেজিস্ট্রেশন" },
];
