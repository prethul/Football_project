// Shared page banner used on inner pages (rules, register, matches, tournament)
export default function PageHeader({ eyebrow, title, description }) {
  return (
    <section className="hero-bg relative overflow-hidden border-b border-white/10">
      <div className="pointer-events-none absolute -bottom-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full border-2 border-white/10 sm:h-96 sm:w-96" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20">
        {eyebrow && (
          <span className="mb-4 inline-flex rounded-full border border-neon-400/30 bg-neon-400/10 px-4 py-1 text-sm font-semibold text-neon-300">{eyebrow}</span>
        )}
        <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-5xl">{title}</h1>
        {description && <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">{description}</p>}
      </div>
    </section>
  );
}
