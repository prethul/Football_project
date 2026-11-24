# KNTS Football League Website

কড্ডা নান্দুন তরুণ সংঘ (কনাতস) / KNTS Club-এর ফুটসাল প্রিমিয়ার লীগের অফিসিয়াল ওয়েবসাইট।
React + Vite + Tailwind CSS v4 + React Router + Lucide React. No backend.

## 1. Installation

```bash
npm install
```

## 2. Development server

```bash
npm run dev
```

## 3. Production build

```bash
npm run build      # output: dist/
npm run preview    # preview the production build locally
```

## 4. Folder structure

```
public/images/            -> poster images (see below)
src/
  components/             -> Navbar, Footer, HeroSection, TournamentPoster, PrizeMoneyCard,
                             JerseyAnnouncement, MatchCard, PlayerRegistrationCard,
                             RegistrationForm, SectionHeading, Button, ...
  pages/                  -> Home, Tournament, Rules, Register, Matches
  data/
    tournament.js         -> tournament info, prizes, contacts, social links, nav links
    rules.js              -> all rules text
    matches.js            -> match list (edit manually)
  services/
    registrationService.js-> submitRegistration() (LocalStorage demo / Google Sheets)
    matchService.js       -> getMatches() (local data now, API later)
  utils/                  -> cn(), validation helpers
  App.jsx                 -> routes (App.tsx simply re-exports it)
```

Routing uses `HashRouter` (`/#/rules`, `/#/register`...), so every page works on any static host without rewrite rules.

## 5. Replace the tournament posters

Put your images in `public/images/` using these exact names (overwrite if they exist):

| File | Used for |
| --- | --- |
| `knts-tournament-poster.jpg` | Main tournament poster (Home + Tournament page) |
| `knts-rules-poster.jpg` | Rules poster (Home preview + Rules page) |

If you want different names/paths, change them in `src/data/tournament.js` (`images`).
Until the files exist, a placeholder box is shown instead of a broken image.

## 6. Update match information

Edit `src/data/matches.js`. Each match has: `teamA`, `teamB`, `date`, `time`, `venue`,
`status` (`"upcoming"`, `"live"`, `"completed"`), `scoreA`, `scoreB`.
The default rows have `isSample: true` – delete them and add your real matches
(rows without `isSample` hide the "sample data" notice automatically).

## 7. Edit tournament info, prizes and rules

- Tournament info, registration open/closed (`registrationOpen`), prize money, contacts, social links → `src/data/tournament.js`
- Rules → `src/data/rules.js` (`configurable: true` shows an "organizer will announce" badge)

## 8. Registration: demo mode vs Google Sheets

Copy `.env.example` to `.env`:

```
VITE_GOOGLE_APPS_SCRIPT_URL=
```

- **Empty** → demo mode. Data is saved in the visitor's browser (LocalStorage key `knts_demo_registrations`) only and is **not** sent to the club. The UI says so clearly.
- **Set** → `submitRegistration()` POSTs JSON to your Google Apps Script. Success is shown as "sent" only if the script returns `{ "success": true }`.

### Google Sheets integration guide

1. Create a Google Sheet with header row: `registrationId, submittedAt, teamName, captainName, phone, p1Name, p1Size, ... p9Name, p9Size`.
2. In the sheet: **Extensions → Apps Script**, paste:

```js
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var row = [data.registrationId, data.submittedAt, data.teamName, data.captainName, "'" + data.phone];
    data.players.forEach(function (p) { row.push(p.name, p.jerseySize); });
    sheet.appendRow(row);
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. **Deploy → New deployment → Web app**, execute as *Me*, access *Anyone*. Copy the Web app URL.
4. Put the URL in `.env` as `VITE_GOOGLE_APPS_SCRIPT_URL` (and in Vercel → Project Settings → Environment Variables). Redeploy.
5. Never put secret keys in `VITE_` variables – they are public in the browser.

For match data later: change `getMatches()` in `src/services/matchService.js` to `fetch` a published Google Sheet / Apps Script JSON.

## 9. Deploy to Vercel

1. Push the project to GitHub.
2. On vercel.com → **Add New Project** → import the repo.
3. Framework preset: **Vite**. Build command `npm run build`, output directory `dist`.
4. (Optional) add `VITE_GOOGLE_APPS_SCRIPT_URL` environment variable.
5. Deploy. Netlify works the same way (build `npm run build`, publish `dist`).

## 10. Checklist before launch

- [ ] Poster images added to `public/images/`
- [ ] Real matches added to `src/data/matches.js`
- [ ] Start date / registration deadline filled in `src/data/tournament.js`
- [ ] 4th contact number (শিশির) confirmed and added to `contacts`
- [ ] Social links and email placeholders replaced
- [ ] Google Sheets URL configured (otherwise registration stays in demo mode)
