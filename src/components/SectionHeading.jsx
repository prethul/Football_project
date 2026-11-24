import { cn } from "../utils/cn";

export default function SectionHeading({ eyebrow, title, description, align = "center", className }) {
  return (
    <div
      className={cn(
        "mb-10 max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-neon-400/30 bg-neon-400/10 px-4 py-1 text-sm font-semibold text-neon-300">
          <span className="h-1.5 w-1.5 rounded-full bg-neon-400" />
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">{title}</h2>
      <div
        className={cn(
          "mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-neon-400 to-gold-400",
          align === "center" && "mx-auto"
        )}
      />
      {description && <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">{description}</p>}
    </div>
  );
}
