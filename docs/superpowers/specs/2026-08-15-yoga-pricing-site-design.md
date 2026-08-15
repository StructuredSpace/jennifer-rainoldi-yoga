# Jennifer Ainoldi Yoga — Notion Pricing Page + GitHub Pages Website

Date: 2026-08-15
Status: Approved (pending final self-review)

## Goal

Two related deliverables for the yoga studio currently represented by
`linktr.ee/jenniferainoldiyoga`:

1. A visually restructured **Notion pricing page** (content unchanged, layout improved).
2. A **static website hosted on GitHub Pages** that carries the same content as the
   Linktree (bio, philosophy, pricing, schedule/booking, gallery, contact) as one
   scrolling page, in Italian and English.

Both mirror the studio's existing source of truth — nothing about the actual
prices, packages, or booking system changes. This is a presentation upgrade, not a
business-model change.

## Source content (already collected)

- Pricing: scraped from the current public Notion page
  (`marbled-suggestion-68e.notion.site/Abbonamenti-Costi-...`).
- Bio ("LA MIA STORIA in pillole"): scraped from the Linktree accordion.
- Tagline: "Creo spazi di pratica per coltivare presenza, ascolto e consapevolezza,
  respiro dopo respiro. Un cammino verso la propria libertà ✨"
- Contact: WhatsApp `https://api.whatsapp.com/send?phone=393420198207`,
  email `jenniferainoldi@gmail.com`.
- Booking/calendar: Bookyway, `https://admin.bookyway.com/v2/account/login`
  (confirmed by owner as the correct link students use — same portal for
  viewing schedule and booking).

**Known gaps to fill before publishing (placeholders will be used until then):**
- "CONOSCI IL MIO APPROCCIO" text (couldn't be extracted from Linktree's
  accordion via automation) — owner to supply, or approve reusing the
  philosophy line already on the pricing page as a stand-in.
- Real photos (hero background, gallery, headshot) — placeholders until supplied.
- Studio address/location, if it should appear in Contact.

**Explicitly out of scope for this version:** "MINI Pratica Serale" lead magnet
and the "Hai Domande?" open contact form/Google Form embed from the Linktree.
Can be added later as their own small tasks if wanted.

## 1. Notion pricing page redesign

Same numbers and rules as today; restructured using native Notion blocks so it
reads as a designed pricing page instead of a plain list:

- Header **callout** with the philosophy line as a soft intro banner.
- **Toggle list** "Come iniziare" grouping the entry options: Lezione Prova (10€),
  Lezione Singola (20€), Percorso Introduzione allo Yoga (70€).
- **3-column layout** for the bimonthly tiers (Easy 122€ / Flex 162€ / Strong 252€)
  so they're visually comparable.
- **Highlighted callout** for the Abbonamento Semestrale (580€, valore 756€,
  scadenza 30 settembre) — the flagship offer, visually the most prominent block
  on the page.
- Separate **toggle** for "Studenti & Online" (55€/mese).
- **Callout** listing "I tuoi vantaggi" (perks) as a checklist.
- **Divider** + closing CTA block linking to the existing Google Form
  (`forms.gle/MRuU7H5H3K93dkGL6`).

Delivered as a paste-ready document using Notion's markdown-paste conventions
(`>` callouts, nested toggles, a table for the tier comparison), plus a short list
of manual touch-ups for the ~10% Notion's paste-import won't auto-convert
(turning the tier table into a true 3-column board, adding icons/emoji).

## 2. Website

### Architecture

- Plain **HTML + CSS + vanilla JS**, no framework, no build step.
- Files: `index.html`, `styles.css`, `script.js`, `assets/` (images), plus this
  `docs/` folder for specs.
- Deployed via **GitHub Pages** from the repo root (`main` branch), default URL
  (`username.github.io/reponame`) — no custom domain for now.
- Pricing and translation strings live in a single JS data object in `script.js`
  (not scattered across markup), so future edits touch one place per language.

### Sections (single scrolling page, in order)

1. **Hero** — tagline, background image (placeholder), two primary CTAs:
   "Prenota una lezione" / "Vedi il calendario" (both → Bookyway).
2. **About & Philosophy** — bio content from "LA MIA STORIA" + philosophy
   paragraph (approccio text: placeholder pending owner input).
3. **Pricing** — cards mirroring the Notion structure: trial/single/intro,
   flexible package, the three bimonthly tiers, Semestrale (highlighted),
   students/online. Same copy and numbers as the Notion page.
4. **Schedule & Booking** — "View Calendar" and "Book a Class" buttons, both
   opening `admin.bookyway.com/v2/account/login` in a new tab, with a short
   explanatory note (students log in there to see availability and book).
5. **Gallery** — placeholder image grid, swappable later.
6. **Contact** — WhatsApp click-to-chat button
   (`https://api.whatsapp.com/send?phone=393420198207`), email
   (`jenniferainoldi@gmail.com`).

### Italian / English

- Header language toggle switches all visible text via a translations object in
  `script.js` (`data-i18n` attributes on elements) — no page reload, no
  duplicated HTML per language.
- Italian copy is the source (from existing content); English is a translation
  done as part of this work.

### Visual style

- Calm/earthy palette: warm neutrals, one accent color (sage or terracotta),
  soft serif or rounded sans headings — minimal, generous whitespace. A
  yoga-studio feel rather than a generic SaaS/startup look.
- Fully responsive (mobile-first, since most Linktree traffic is mobile).

## Explicitly not building

- No backend, database, or payment processing — Bookyway remains the system of
  record for bookings and payments.
- No custom domain setup (can be added later if the owner buys one).
- No CMS — content is edited directly in `script.js`/`index.html`.

## Open items before publish (not blockers for building the first draft)

- [ ] Real "CONOSCI IL MIO APPROCCIO" text
- [ ] Real photos (hero, gallery)
- [ ] Confirm whether studio address should appear in Contact
