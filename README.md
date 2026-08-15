# Jennifer Rainoldi Yoga — Website

Static site for the yoga studio (Sondrio, Italy), built with plain
HTML/CSS/JS — no build step, no framework.

## Local preview

```bash
npx --yes serve .
```

Then open the printed local URL in your browser.

## Running tests

```bash
npm test
```

Tests cover the pricing/translation data (`data.js`) and the pure HTML
render functions (`render.js`) — the parts of the site with real logic.
The HTML/CSS/DOM-wiring is verified manually in a browser.

## Page structure (single scrolling page)

1. **Hero** — full-bleed photo background, tagline, and two buttons that
   scroll down to the story/philosophy anchors (`#storia`, `#approccio`).
2. **About** (`#about`) — bio ("La Mia Storia") and philosophy ("La Mia
   Filosofia"), each with its own scroll anchor for the hero buttons.
3. **Calendar** (`#calendar`) — full-width weekly schedule image
   (`assets/weekly-schedule.png`).
4. **Pricing** (`#pricing`) — "Pacchetti & Abbonamenti". Cards mirror the
   studio's real pricing; cards with extra descriptive text are clickable
   to expand (keyboard-accessible via Enter/Space, `aria-expanded` synced).
5. **Bookyway** (`#bookyway`) — a single CTA linking out to Bookyway
   (`https://admin.bookyway.com/v2/account/login`) for viewing the live
   schedule and booking.
6. **Contact** (`#contact`) — WhatsApp, email, and a Google Maps link to
   the studio.

## Deploying to GitHub Pages

1. Create a new GitHub repository.
2. Push this project to it:
   ```bash
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```
3. In the GitHub repo, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to `Deploy from a branch`,
   branch `main`, folder `/ (root)`.
5. Save. GitHub publishes the site at
   `https://<your-username>.github.io/<repo-name>/` within a minute or two.

## Updating content

- Prices, packages, and all text (Italian + English): edit `data.js`.
- Page structure/sections: edit `index.html`.
- Look and feel: edit `styles.css`.
- Logo, hero photo, and schedule image: replace the files in `assets/`
  (`logo-mark.png`, `wordmark.png`, `hero-photo.jpg`,
  `weekly-schedule.png`) — keep the same filenames, or update the
  references in `index.html`/`styles.css` if you rename them.
- Booking link: currently points to Bookyway
  (`https://admin.bookyway.com/v2/account/login`) — update every occurrence
  in `index.html` if that link ever changes.
