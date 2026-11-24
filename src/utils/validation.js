import { jerseySizes } from "../data/tournament";

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";

// Convert Bengali digits to English digits ("০১৭" -> "017")
export function normalizeDigits(value = "") {
  return String(value).replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)));
}

// Convert English digits to Bengali digits (12 -> "১২")
export function toBn(value) {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}

// Bangladesh mobile number: 01XXXXXXXXX (optionally with +88 / 88)
export function isValidBdPhone(value = "") {
  const cleaned = normalizeDigits(value).replace(/[\s-]/g, "");
  return /^(?:\+?88)?01[3-9]\d{8}$/.test(cleaned);
}

/**
 * Validate the registration form.
 * Returns an errors object. Empty object = valid.
 * Shape: { teamName, captainName, phone, players: {0: {name, jerseySize}}, playersCount, terms }
 */
export function validateRegistration(values, squadSize) {
  const errors = {};

  if (!values.teamName.trim()) errors.teamName = "দলের নাম লিখুন।";
  if (!values.captainName.trim()) errors.captainName = "ক্যাপ্টেন/ম্যানেজারের নাম লিখুন।";

  if (!values.phone.trim()) {
    errors.phone = "যোগাযোগের ফোন নম্বর লিখুন।";
  } else if (!isValidBdPhone(values.phone)) {
    errors.phone = "সঠিক মোবাইল নম্বর দিন (যেমন: 01XXXXXXXXX)।";
  }

  if (values.players.length !== squadSize) {
    errors.playersCount = `দলে অবশ্যই ঠিক ${toBn(squadSize)} জন খেলোয়াড় থাকতে হবে।`;
  }

  const playerErrors = {};
  values.players.forEach((player, index) => {
    const e = {};
    if (!player.name.trim()) e.name = "খেলোয়াড়ের নাম লিখুন।";
    if (!player.jerseySize) e.jerseySize = "জার্সি সাইজ নির্বাচন করুন।";
    else if (!jerseySizes.includes(player.jerseySize)) e.jerseySize = "সঠিক জার্সি সাইজ নির্বাচন করুন।";
    if (Object.keys(e).length) playerErrors[index] = e;
  });
  if (Object.keys(playerErrors).length) errors.players = playerErrors;

  if (!values.acceptedTerms) errors.terms = "শর্তাবলিতে সম্মতি দিতে হবে।";

  return errors;
}
