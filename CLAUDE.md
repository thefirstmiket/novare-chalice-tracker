# Novare Res Chalice Tracker — Instructions for Claude Code

This is a small static PWA (React via CDN + Babel standalone, no build step) that
tracks progress through the Novare Res Bier Café chalice list. It's hosted on
GitHub Pages from this repo.

## Files

- `index.html` — shell, loads React/Babel from CDN and the scripts below
- `app.jsx` — UI components and logic
- `data.js` — the full 234-beer dataset (name, ABV, style, rating, drunk/draft/bottle flags)
- `patch.js` — small runtime patches applied on top of `data.js` (see below)
- `sw.js` / `manifest.json` — PWA/offline support

## CRITICAL: How to make updates

`data.js` is ~40K characters and `app.jsx` is ~28K. **Never regenerate either file
in full for a routine update.** Doing so is slow, burns context for no reason, and
is the exact thing this workflow exists to avoid. Instead:

1. **Marking beers drunk / removing from draft or bottle lists** → append an entry
   to the `patches` array in `patch.js`. Do not touch `data.js` directly for this.

2. **Adding a genuinely new beer to the chalice list** → use `str_replace` to insert
   just that one object into the `BEERS` array in `data.js`. Never re-emit the
   whole array.

3. **New draft/bottle availability from the PDFs** → this changes `draft`/`bottle`
   booleans on existing beer objects. Use `str_replace` on the individual fields,
   not a full-file rewrite.

4. **UI/logic changes** → edit only the specific function/component in `app.jsx`
   with `str_replace`. Read the file first to get exact context, but don't paste
   the whole file back.

5. Once changes are made, `git add`, commit with a short message describing what
   changed (e.g. "Mark 3 beers drunk, update draft list from 5/2/26 PDF"), and
   push to `main`. GitHub Pages will redeploy automatically.

## Routine refresh procedure

When asked to "refresh the tracker":

1. Fetch the current draft PDF: https://novareresbiercafe.com/wp-content/uploads/draught.pdf
2. Fetch the current bottle PDF: https://novareresbiercafe.com/wp-content/uploads/bottlelist.pdf
3. Compare against `data.js` — identify only the beers whose `draft`/`bottle`/`drunk`
   status actually changed.
4. Apply only those changes via `patch.js` (preferred) or targeted `str_replace`
   edits to `data.js`.
5. Update the "Updated" dates in `README.md`'s Data Sources table.
6. Bump the cache-busting query string on `<script src="data.js?v=...">` in `index.html`
   (use `YYYYMMDD` of the refresh date) — without this, browsers/CDN can keep serving a
   stale `data.js` even after push, since there's no service worker caching it anymore.
7. Commit and push.

## What NOT to do

- Don't ask for or regenerate the entire `data.js` file "to be safe."
- Don't keep one long chat/session open across many refresh cycles — each refresh
  should be its own session so context doesn't balloon.
- Don't inline the Google Sheet's full contents into a message — read only the
  columns/rows needed.
