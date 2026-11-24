// ------------------------------------------------------------------
// Match service.
// Today it simply returns the local data file.
// Later, replace the body of getMatches() with a fetch() call to a
// Google Sheets (Apps Script) endpoint or an admin API.
// Pages only use getMatches(), so nothing else needs to change.
// ------------------------------------------------------------------
import { matches } from "../data/matches";

export async function getMatches() {
  return matches;
}

export function groupMatchesByStatus(list) {
  return {
    live: list.filter((m) => m.status === "live"),
    upcoming: list.filter((m) => m.status === "upcoming"),
    completed: list.filter((m) => m.status === "completed"),
  };
}
