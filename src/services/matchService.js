// ------------------------------------------------------------------
// Match service.
// Today it simply returns the local data file.
// Later, replace the body of getMatches() with a fetch() call to a
// Google Sheets (Apps Script) endpoint or an admin API.
// Pages only use getMatches(), so nothing else needs to change.
// ------------------------------------------------------------------
import { matches } from "../data/matches";
import { getLocalRegistrations } from "./registrationService";

const STORAGE_KEY = "knts_knockout_matches";

export async function getMatches() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const list = JSON.parse(saved);
      if (Array.isArray(list) && list.length === 15) return list;
    }
  } catch {
    // Keep the static bracket as the safe fallback.
  }
  return matches.map((match) => ({ ...match }));
}

export async function saveMatches(list) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return list;
}

export function getRegisteredTeams() {
  const seen = new Set();
  return getLocalRegistrations()
    .map((registration) => registration.teamName?.trim())
    .filter((name) => {
      if (!name || seen.has(name)) return false;
      seen.add(name);
      return true;
    })
    .slice(0, 16);
}

export function groupMatchesByStatus(list) {
  return {
    live: list.filter((m) => m.status === "live"),
    upcoming: list.filter((m) => m.status === "upcoming"),
    completed: list.filter((m) => m.status === "completed"),
  };
}
