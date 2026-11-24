import { useEffect, useState } from "react";
import { ImagePlus, X, ZoomIn } from "lucide-react";

// Shows a poster image from /public/images.
// - If the file is missing, a friendly placeholder tells you where to put it.
// - Click the image to open it full screen.
export default function PosterImage({ src, alt, fileName, caption }) {
  const [failed, setFailed] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (failed) {
    return (
      <div className="flex aspect-[3/2] w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-neon-400/40 bg-navy-900/80 p-6 text-center">
        <ImagePlus className="h-10 w-10 text-neon-400" aria-hidden="true" />
        <p className="text-lg font-semibold text-white">অফিসিয়াল পোস্টার শীঘ্রই যুক্ত হবে</p>
        <p className="text-sm text-slate-400">
          ছবিটি <code className="rounded bg-white/10 px-1.5 py-0.5 text-neon-300">public/images/{fileName}</code> নামে রাখুন
        </p>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-400"
        aria-label={`${alt} - বড় করে দেখুন`}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-navy-950/80 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
          <ZoomIn className="h-4 w-4" aria-hidden="true" /> বড় করে দেখুন
        </span>
      </button>
      {caption && <p className="mt-3 text-center text-sm text-slate-400">{caption}</p>}

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 sm:p-8"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={() => setOpen(false)}
            aria-label="বন্ধ করুন"
          >
            <X className="h-6 w-6" />
          </button>
          <img src={src} alt={alt} className="max-h-full max-w-full rounded-lg object-contain" />
        </div>
      )}
    </>
  );
}
