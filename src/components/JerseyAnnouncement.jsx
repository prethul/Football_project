import { Gift } from "lucide-react";
import Button from "./Button";

// Simple SVG football jersey. `number` and `colors` can be changed for variety.
function JerseySvg({ className = "", number = "09", body = "#1ed760", trim = "#0a1428" }) {
  const gradientId = `jersey-${body.replace("#", "")}`;
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={body} />
          <stop offset="1" stopColor={body} stopOpacity="0.75" />
        </linearGradient>
      </defs>
      <path
        d="M70 18 L30 38 L8 80 L40 96 L52 78 L52 184 Q100 196 148 184 L148 78 L160 96 L192 80 L170 38 L130 18 Q100 44 70 18 Z"
        fill={`url(#${gradientId})`}
        stroke={trim}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M70 18 Q100 44 130 18" fill="none" stroke={trim} strokeWidth="8" strokeLinecap="round" />
      <path d="M8 80 L40 96" stroke={trim} strokeWidth="7" strokeLinecap="round" />
      <path d="M192 80 L160 96" stroke={trim} strokeWidth="7" strokeLinecap="round" />
      <text x="100" y="128" textAnchor="middle" fontSize="42" fontWeight="800" fill={trim} fontFamily="Arial, sans-serif">
        {number}
      </text>
      <text x="100" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill={trim} fontFamily="Arial, sans-serif" letterSpacing="2">
        KNTS
      </text>
    </svg>
  );
}

export default function JerseyAnnouncement() {
  return (
    <section className="pitch-bg relative overflow-hidden py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
        <div className="order-2 md:order-1">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-gold-400 px-4 py-1.5 text-sm font-bold text-navy-950">
            <Gift className="h-4 w-4" aria-hidden="true" /> বিশেষ ঘোষণা
          </span>
          <h2 className="text-3xl font-extrabold leading-snug text-white sm:text-4xl lg:text-5xl">
            প্রতিটি অংশগ্রহণকারী দলের জন্য থাকছে <span className="text-gradient-gold">ফ্রি টিম জার্সি!</span>
          </h2>
          <p className="mt-5 max-w-lg text-lg text-slate-200">
            রেজিস্ট্রেশনের সময় প্রতিটি খেলোয়াড়ের জার্সি সাইজ দিন, বাকি দায়িত্ব আমাদের।
          </p>
          <div className="mt-7">
            <Button to="/register" variant="gold" size="lg">
              এখনই রেজিস্ট্রেশন করুন
            </Button>
          </div>
        </div>

        <div className="relative order-1 mx-auto flex w-full max-w-md items-center justify-center md:order-2">
          <div className="absolute h-72 w-72 rounded-full bg-neon-400/20 blur-3xl" aria-hidden="true" />
          <JerseySvg className="relative z-10 -mr-8 h-24 w-24 shrink-0 -rotate-12 drop-shadow-2xl transition-transform duration-500 hover:-rotate-6 sm:-mr-10 sm:h-48 sm:w-48" number="07" body="#ffc933" />
          <JerseySvg className="relative z-20 h-36 w-36 shrink-0 animate-float drop-shadow-2xl sm:h-64 sm:w-64" number="09" body="#1ed760" />
          <JerseySvg className="relative z-10 -ml-8 h-24 w-24 shrink-0 rotate-12 drop-shadow-2xl transition-transform duration-500 hover:rotate-6 sm:-ml-10 sm:h-48 sm:w-48" number="10" body="#ffffff" />
        </div>
      </div>
    </section>
  );
}
