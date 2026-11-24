import { jerseySizes } from "../data/tournament";
import { toBn } from "../utils/validation";

// One numbered card with the two player fields: name + jersey size.
export default function PlayerRegistrationCard({ index, player, errors = {}, disabled, onChange }) {
  const number = String(index + 1).padStart(2, "0");
  const nameId = `player-${index}-name`;
  const sizeId = `player-${index}-size`;

  return (
    <div className="card-surface relative rounded-2xl p-4 pt-8 transition-colors hover:border-neon-400/40 sm:p-5 sm:pt-9">
      <span className="absolute -top-4 left-4 flex h-10 min-w-10 items-center justify-center rounded-xl bg-gradient-to-br from-neon-300 to-neon-500 px-2 text-lg font-extrabold text-navy-950 shadow-lg shadow-neon-500/30">
        {toBn(number)}
      </span>
      <h4 className="mb-3 text-base font-semibold text-white">প্লেয়ার {toBn(number)}</h4>

      <div className="space-y-3">
        <div>
          <label htmlFor={nameId} className="mb-1.5 block text-sm font-medium text-slate-300">
            খেলোয়াড়ের নাম <span className="text-red-400">*</span>
          </label>
          <input
            id={nameId}
            type="text"
            className="field-input"
            placeholder={`প্লেয়ার ${toBn(number)}-এর নাম`}
            value={player.name}
            disabled={disabled}
            autoComplete="off"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${nameId}-error` : undefined}
            onChange={(e) => onChange(index, "name", e.target.value)}
          />
          {errors.name && (
            <p id={`${nameId}-error`} className="mt-1 text-sm text-red-400">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={sizeId} className="mb-1.5 block text-sm font-medium text-slate-300">
            জার্সি সাইজ <span className="text-red-400">*</span>
          </label>
          <select
            id={sizeId}
            className="field-input"
            value={player.jerseySize}
            disabled={disabled}
            aria-invalid={Boolean(errors.jerseySize)}
            aria-describedby={errors.jerseySize ? `${sizeId}-error` : undefined}
            onChange={(e) => onChange(index, "jerseySize", e.target.value)}
          >
            <option value="">সাইজ নির্বাচন করুন</option>
            {jerseySizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          {errors.jerseySize && (
            <p id={`${sizeId}-error`} className="mt-1 text-sm text-red-400">
              {errors.jerseySize}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
