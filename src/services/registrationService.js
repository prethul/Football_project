// ------------------------------------------------------------------
// Registration service.
// ALL Google Sheets / backend logic stays in this file.
//
// - If VITE_GOOGLE_APPS_SCRIPT_URL is set  -> POST to Google Apps Script.
// - If it is empty                         -> demo mode: LocalStorage only
//                                             (data is NOT sent to the club).
//
// submitRegistration() returns:
//   { ok: true, mode: "remote" | "local", registrationId, submittedAt }
// and throws an Error (with a Bengali message) on failure.
// ------------------------------------------------------------------

const API_URL = (import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || "").trim();
const STORAGE_KEY = "knts_demo_registrations";

export const isRemoteConfigured = API_URL.length > 0;

function createRegistrationId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `KNTS-${stamp}-${rand}`;
}

// ---------- LocalStorage (demo mode) ----------
export function getLocalRegistrations() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToLocalStorage(record) {
  try {
    const list = getLocalRegistrations();
    list.push(record);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    throw new Error(
      "ব্রাউজারে তথ্য সংরক্ষণ করা যায়নি। প্রাইভেট মোড বন্ধ করে আবার চেষ্টা করুন।"
    );
  }
}

// ---------- Google Apps Script (real mode) ----------
async function sendToGoogleSheets(record) {
  let response;
  try {
    response = await fetch(API_URL, {
      method: "POST",
      // text/plain avoids a CORS preflight request, which Apps Script does not support.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(record),
    });
  } catch {
    throw new Error("সার্ভারের সাথে যোগাযোগ করা যায়নি। ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।");
  }

  if (!response.ok) {
    throw new Error("সার্ভার থেকে সঠিক সাড়া পাওয়া যায়নি। কিছুক্ষণ পর আবার চেষ্টা করুন।");
  }

  let result;
  try {
    result = await response.json();
  } catch {
    throw new Error("সার্ভারের উত্তর বোঝা যায়নি। আয়োজকদের সাথে যোগাযোগ করুন।");
  }

  // Your Apps Script must return JSON like: { "success": true }
  if (!result || result.success !== true) {
    throw new Error(result?.message || "রেজিস্ট্রেশন সংরক্ষণ করা সম্ভব হয়নি।");
  }
}

/**
 * Submit a team registration.
 * @param {{teamName:string, captainName:string, phone:string,
 *          players:{no:number,name:string,jerseySize:string}[],
 *          acceptedTerms:boolean}} registrationData
 */
export async function submitRegistration(registrationData) {
  const record = {
    ...registrationData,
    registrationId: createRegistrationId(),
    submittedAt: new Date().toISOString(),
  };

  if (isRemoteConfigured) {
    await sendToGoogleSheets(record);
    return { ok: true, mode: "remote", registrationId: record.registrationId, submittedAt: record.submittedAt };
  }

  // Demo mode: small delay so the loading state is visible
  await new Promise((resolve) => setTimeout(resolve, 700));
  saveToLocalStorage(record);
  return { ok: true, mode: "local", registrationId: record.registrationId, submittedAt: record.submittedAt };
}
