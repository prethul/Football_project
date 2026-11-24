import { Link } from "react-router-dom";

export default function Logo({ className = "" }) {
  return (
    <Link to="/" className={`group inline-flex items-center gap-3 ${className}`} aria-label="KNTS Club হোম">
      <img
        src="/images/knts-club-logo.png"
        alt="KNTS Club logo"
        className="h-12 w-12 shrink-0 rounded-full object-contain shadow-lg shadow-gold-500/20 transition-transform group-hover:scale-105"
      />
      <span className="leading-tight">
        <span className="block text-xl font-extrabold tracking-wide text-white">
          KNTS <span className="text-neon-400">Club</span>
        </span>
        <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">
          Football League
        </span>
      </span>
    </Link>
  );
}
