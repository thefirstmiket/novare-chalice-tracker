# Novare Res Chalice Tracker 🍺

Track your progress through all 234 beers on the [Novare Res Bier Café](https://novareresbiercafe.com) chalice list in Portland, Maine.

## Features

- **Chalice progress tracking** — syncs from a Google Sheets spreadsheet (column H = drunk at Novare)
- **Draft & bottle availability** — cross-references current Novare Res draft and bottle PDFs
- **Choice slot matching** — identifies which bartender/special event choice slots have matches on current menus
- **Untappd ratings** — shows ratings with links to Untappd for each beer
- **Sort by ABV or rating** — toggle between sorting by alcohol content or Untappd score
- **New bottle alerts** — flags chalice beers newly added to the bottle list (tracked via Google Sheets)
- **Novare Res branding** — logos, links to draft/bottle PDFs, address + contact info
- **PWA support** — installable on iOS/Android via "Add to Home Screen"

## Data Sources

| Source | URL | Updated |
|--------|-----|--------|
| Draft List | [draught.pdf](https://novareresbiercafe.com/wp-content/uploads/draught.pdf) | 7/12/26 |
| Bottle List | [bottlelist.pdf](https://novareresbiercafe.com/wp-content/uploads/bottlelist.pdf) | 7/6/26 |
| Chalice Spreadsheet | Private Google Sheet | Col H = year drunk at Novare |

## How to Update

Paste this to Claude:

> Refresh the chalice tracker. Pull the latest chalice worksheet from the Novare Res Uprising spreadsheet, fetch the current draft list from the Novare Res website, and check the bottle list. Update the artifact and push to GitHub.

## Tech Stack

- React 18 (CDN, no build step)
- Babel standalone for JSX
- Service Worker for offline caching
- PWA manifest for iOS Add to Home Screen
- GitHub Pages for hosting

## Live Site

🔗 **[thefirstmiket.github.io/novare-chalice-tracker](https://thefirstmiket.github.io/novare-chalice-tracker)**

## License

Personal project. Not affiliated with Novare Res Bier Café.
