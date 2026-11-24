import { useRef, useState } from "react";
import { AlertTriangle, CheckCircle2, Info, Loader2, Lock, ShieldAlert, Trophy } from "lucide-react";
import PlayerRegistrationCard from "./PlayerRegistrationCard";
import Button from "./Button";
import { tournament } from "../data/tournament";
import { submitRegistration, isRemoteConfigured } from "../services/registrationService";
import { validateRegistration, toBn, normalizeDigits } from "../utils/validation";
import { Link } from "react-router-dom";

const SQUAD_SIZE = tournament.squadSize;

const createInitialValues = () => ({
  teamName: "",
  captainName: "",
  phone: "",
  players: Array.from({ length: SQUAD_SIZE }, () => ({ name: "", jerseySize: "" })),
  acceptedTerms: false,
});

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-sm text-red-400" role="alert">
      {message}
    </p>
  );
}

function SuccessView({ result, onReset }) {
  const isRemote = result.mode === "remote";
  return (
    <div className="card-surface mx-auto max-w-2xl rounded-3xl p-6 text-center sm:p-10">
      <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-neon-400/15 ring-8 ring-neon-400/10">
        <CheckCircle2 className="h-12 w-12 text-neon-400" aria-hidden="true" />
      </div>
      <h2 className="text-2xl font-extrabold text-white sm:text-3xl">রেজিস্ট্রেশন সম্পন্ন হয়েছে!</h2>

      <div className="my-6 rounded-2xl border border-gold-400/30 bg-gold-400/10 p-5">
        <p className="text-sm text-slate-300">আপনার দলের নাম</p>
        <p className="mt-1 flex items-center justify-center gap-2 break-words text-2xl font-bold text-gold-300">
          <Trophy className="h-6 w-6 shrink-0" aria-hidden="true" /> {result.teamName}
        </p>
        <p className="mt-3 text-xs text-slate-400">
          রেজিস্ট্রেশন আইডি: <span className="font-mono text-slate-200">{result.registrationId}</span>
        </p>
      </div>

      {isRemote ? (
        <p className="text-slate-200">
          আপনার রেজিস্ট্রেশন তথ্য সফলভাবে আয়োজকদের কাছে পাঠানো হয়েছে। প্রয়োজনে আমরা আপনার দেওয়া নম্বরে যোগাযোগ করব।
        </p>
      ) : (
        <div className="rounded-2xl border border-amber-400/40 bg-amber-400/10 p-4 text-left">
          <p className="flex items-center gap-2 font-semibold text-amber-300">
            <AlertTriangle className="h-5 w-5 shrink-0" aria-hidden="true" /> ডেমো মোড – গুরুত্বপূর্ণ নোট
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-200">
            এটি একটি ডেমো রেজিস্ট্রেশন। আপনার তথ্য শুধুমাত্র এই ব্রাউজারে সংরক্ষিত হয়েছে এবং ক্লাবের কাছে <strong>পাঠানো হয়নি</strong>। অফিসিয়াল
            রেজিস্ট্রেশনের জন্য আয়োজকদের সাথে সরাসরি যোগাযোগ করুন।
          </p>
        </div>
      )}

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button onClick={onReset} variant="primary">
          আরেকটি দল রেজিস্ট্রেশন করুন
        </Button>
        <Button to="/" variant="outline">
          হোমে ফিরে যান
        </Button>
      </div>
    </div>
  );
}

export default function RegistrationForm() {
  const [values, setValues] = useState(createInitialValues);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const submittingRef = useRef(false); // blocks double clicks immediately
  const formTopRef = useRef(null);

  const closed = !tournament.registrationOpen;

  const updateField = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const updatePlayer = (index, field, value) => {
    setValues((prev) => ({
      ...prev,
      players: prev.players.map((p, i) => (i === index ? { ...p, [field]: value } : p)),
    }));
    if (errors.players?.[index]?.[field]) {
      setErrors((prev) => {
        const players = { ...prev.players };
        players[index] = { ...players[index], [field]: undefined };
        return { ...prev, players };
      });
    }
  };

  const scrollToFirstError = () => {
    setTimeout(() => {
      const el = document.querySelector('[aria-invalid="true"], [data-error="true"]');
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.focus?.({ preventScroll: true });
      }
    }, 50);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submittingRef.current || closed) return;

    const found = validateRegistration(values, SQUAD_SIZE);
    setErrors(found);
    setSubmitError("");
    if (Object.keys(found).length > 0) {
      scrollToFirstError();
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);
    try {
      const payload = {
        teamName: values.teamName.trim(),
        captainName: values.captainName.trim(),
        phone: normalizeDigits(values.phone).replace(/[\s-]/g, ""),
        players: values.players.map((p, i) => ({ no: i + 1, name: p.name.trim(), jerseySize: p.jerseySize })),
        acceptedTerms: values.acceptedTerms,
      };
      const response = await submitRegistration(payload);
      setResult({ ...response, teamName: payload.teamName });
      setValues(createInitialValues()); // reset only after success
      setErrors({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setSubmitError(err.message || "কিছু ভুল হয়েছে। আবার চেষ্টা করুন।");
      formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  if (result) {
    return <SuccessView result={result} onReset={() => setResult(null)} />;
  }

  const errorCount = Object.keys(errors).filter((k) => errors[k]).length;
  const disabled = isSubmitting || closed;

  return (
    <form onSubmit={handleSubmit} noValidate className="mx-auto max-w-5xl space-y-8" ref={formTopRef}>
      {/* Notices */}
      {closed && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-400/40 bg-red-500/10 p-4 text-red-200">
          <Lock className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p>বর্তমানে টিম রেজিস্ট্রেশন বন্ধ আছে। নতুন তথ্যের জন্য আয়োজকদের সাথে যোগাযোগ করুন।</p>
        </div>
      )}

      {!isRemoteConfigured && !closed && (
        <div className="flex items-start gap-3 rounded-2xl border border-amber-400/40 bg-amber-400/10 p-4 text-amber-100">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" aria-hidden="true" />
          <p className="text-sm leading-relaxed sm:text-base">
            <strong>ডেমো মোড:</strong> এই ফর্মের তথ্য শুধুমাত্র আপনার বর্তমান ব্রাউজারে সংরক্ষিত হবে, ক্লাবের কাছে পাঠানো হবে না। অফিসিয়াল
            রেজিস্ট্রেশনের জন্য আয়োজকদের সাথে যোগাযোগ করুন।
          </p>
        </div>
      )}

      {submitError && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-400/40 bg-red-500/10 p-4 text-red-200" role="alert">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p>{submitError}</p>
        </div>
      )}

      {errorCount > 0 && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-400/40 bg-red-500/10 p-4 text-red-200" role="alert">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p>ফর্মে কিছু তথ্য অনুপস্থিত বা ভুল আছে। লাল চিহ্নিত ঘরগুলো সংশোধন করে আবার চেষ্টা করুন।</p>
        </div>
      )}

      {/* A. Team info + B. Contact */}
      <fieldset disabled={disabled} className="card-surface rounded-3xl p-5 sm:p-8">
        <legend className="sr-only">দলের তথ্য</legend>
        <h2 className="mb-6 flex items-center gap-3 text-xl font-bold text-white sm:text-2xl">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-neon-400 text-navy-950">১</span>
          দল ও যোগাযোগের তথ্য
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label htmlFor="teamName" className="mb-1.5 block text-sm font-medium text-slate-300">
              দলের নাম <span className="text-red-400">*</span>
            </label>
            <input
              id="teamName"
              type="text"
              className="field-input"
              placeholder="আপনার দলের নাম লিখুন"
              value={values.teamName}
              onChange={(e) => updateField("teamName", e.target.value)}
              aria-invalid={Boolean(errors.teamName)}
              aria-describedby={errors.teamName ? "teamName-error" : undefined}
              autoComplete="organization"
            />
            <FieldError id="teamName-error" message={errors.teamName} />
          </div>

          <div>
            <label htmlFor="captainName" className="mb-1.5 block text-sm font-medium text-slate-300">
              টিম ক্যাপ্টেন / ম্যানেজারের নাম <span className="text-red-400">*</span>
            </label>
            <input
              id="captainName"
              type="text"
              className="field-input"
              placeholder="ক্যাপ্টেন বা ম্যানেজারের নাম"
              value={values.captainName}
              onChange={(e) => updateField("captainName", e.target.value)}
              aria-invalid={Boolean(errors.captainName)}
              aria-describedby={errors.captainName ? "captainName-error" : undefined}
              autoComplete="name"
            />
            <FieldError id="captainName-error" message={errors.captainName} />
          </div>

          <div>
            <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-slate-300">
              যোগাযোগের ফোন নম্বর <span className="text-red-400">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              inputMode="tel"
              className="field-input"
              placeholder="01XXXXXXXXX"
              value={values.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              autoComplete="tel"
            />
            <FieldError id="phone-error" message={errors.phone} />
          </div>
        </div>
      </fieldset>

      {/* C. Players */}
      <fieldset disabled={disabled} className="card-surface rounded-3xl p-5 sm:p-8">
        <legend className="sr-only">খেলোয়াড়দের তথ্য</legend>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-3 text-xl font-bold text-white sm:text-2xl">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-neon-400 text-navy-950">২</span>
            খেলোয়াড়দের তথ্য
          </h2>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-slate-200">
            <Info className="h-4 w-4 text-neon-400" aria-hidden="true" />
            ঠিক {toBn(SQUAD_SIZE)} জন খেলোয়াড় আবশ্যক
          </span>
        </div>

        {errors.playersCount && (
          <p className="mb-4 text-sm text-red-400" role="alert" data-error="true">
            {errors.playersCount}
          </p>
        )}

        <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {values.players.map((player, index) => (
            <PlayerRegistrationCard
              key={index}
              index={index}
              player={player}
              errors={errors.players?.[index] || {}}
              disabled={disabled}
              onChange={updatePlayer}
            />
          ))}
        </div>
      </fieldset>

      {/* D. Terms */}
      <div className="card-surface rounded-3xl p-5 sm:p-8">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            className="mt-1.5 h-5 w-5 shrink-0 cursor-pointer accent-[#1ed760]"
            checked={values.acceptedTerms}
            disabled={disabled}
            onChange={(e) => updateField("acceptedTerms", e.target.checked)}
            aria-invalid={Boolean(errors.terms)}
            aria-describedby={errors.terms ? "terms-error" : undefined}
          />
          <span className="text-base leading-relaxed text-slate-200">
            আমি নিশ্চিত করছি যে, আমার দেওয়া সকল তথ্য সঠিক এবং আমি টুর্নামেন্টের{" "}
            <Link to="/rules" target="_blank" className="font-semibold text-neon-300 underline underline-offset-2">
              নিয়মাবলি
            </Link>{" "}
            মেনে চলতে সম্মত।
          </span>
        </label>
        <FieldError id="terms-error" message={errors.terms} />

        {/* E. Submit */}
        <Button type="submit" size="lg" className="mt-6 w-full" disabled={disabled} aria-busy={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="inline h-5 w-5 animate-spin" aria-hidden="true" /> জমা দেওয়া হচ্ছে...
            </>
          ) : (
            "টিম রেজিস্ট্রেশন সম্পন্ন করুন"
          )}
        </Button>
      </div>
    </form>
  );
}
