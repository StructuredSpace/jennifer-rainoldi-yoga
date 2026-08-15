# Jennifer Ainoldi Yoga — Notion Page + Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static, bilingual (IT/EN) GitHub Pages website mirroring the studio's Linktree content (bio, philosophy, pricing, schedule/booking via Bookyway, gallery, contact), plus a paste-ready redesign of the existing Notion pricing page.

**Architecture:** Plain HTML/CSS/vanilla JS, no build step, no framework. Pricing and translation copy live in one data module (`data.js`) consumed by pure rendering functions (`render.js`, unit-tested) and a thin DOM-wiring script (`script.js`, manually verified in-browser). Deployed via GitHub Pages from the repo root.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript (ES modules), Node's built-in test runner (`node:test`) for the data/render logic — zero npm dependencies.

Reference spec: `docs/superpowers/specs/2026-08-15-yoga-pricing-site-design.md`

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `.gitignore`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "jennifer-ainoldi-yoga",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "test": "node --test tests/"
  }
}
```

- [ ] **Step 2: Create `.gitignore`**

```
node_modules/
.DS_Store
Thumbs.db
```

- [ ] **Step 3: Commit**

```bash
git add package.json .gitignore
git commit -m "chore: scaffold project"
```

---

### Task 2: Pricing & Translation Data (TDD)

**Files:**
- Create: `tests/data.test.mjs`
- Create: `data.js`

- [ ] **Step 1: Write the failing test**

Create `tests/data.test.mjs`:

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { translations, pricingGroups } from "../data.js";

function collectKeys(obj, prefix = "") {
  return Object.entries(obj).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      return collectKeys(value, path);
    }
    return [path];
  });
}

test("italian and english translations have the same keys", () => {
  const itKeys = collectKeys(translations.it).sort();
  const enKeys = collectKeys(translations.en).sort();
  assert.deepEqual(enKeys, itKeys);
});

test("every pricing plan has an italian and english name and a price", () => {
  for (const group of pricingGroups) {
    assert.ok(group.title.it && group.title.en, `group ${group.id} missing title`);
    for (const plan of group.plans) {
      assert.ok(plan.name.it, `plan ${plan.id} missing italian name`);
      assert.ok(plan.name.en, `plan ${plan.id} missing english name`);
      assert.ok(plan.price, `plan ${plan.id} missing price`);
      assert.equal(
        plan.details.it.length,
        plan.details.en.length,
        `plan ${plan.id} has mismatched detail counts between languages`
      );
    }
  }
});

test("exactly one pricing plan is highlighted (the semester offer)", () => {
  const highlighted = pricingGroups
    .flatMap((group) => group.plans)
    .filter((plan) => plan.highlight);
  assert.equal(highlighted.length, 1);
  assert.equal(highlighted[0].id, "semester");
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `node --test tests/data.test.mjs`
Expected: FAIL — `Cannot find module '../data.js'` (file doesn't exist yet).

- [ ] **Step 3: Implement `data.js`**

```js
export const translations = {
  it: {
    nav: {
      about: "Chi Sono",
      pricing: "Prezzi",
      schedule: "Calendario",
      gallery: "Galleria",
      contact: "Contatti",
    },
    hero: {
      tagline:
        "Creo spazi di pratica per coltivare presenza, ascolto e consapevolezza, respiro dopo respiro. Un cammino verso la propria libertà.",
      ctaBook: "Prenota una lezione",
      ctaCalendar: "Vedi il calendario",
    },
    about: {
      heading: "La Mia Storia",
      bio: "Mi chiamo Jennifer e il mio percorso nello yoga inizia nel 2012 con l'Hatha Yoga, diventando nel tempo una pratica quotidiana. Nel 2021 approfondisco lo studio con una formazione biennale in Hatha e Vinyasa Yoga presso Hari Om. Nel 2023 viaggio alla volta di Rishikesh, dove mi formo in Vinyasa e Ashtanga Yoga, disciplina che incontro qui per la prima volta, integrando anatomia, pranayama, meditazione e filosofia. Nel 2024 torno in India per un corso intensivo di Ashtanga Yoga con Sachin Badoni. Insegno dal 2022 e nel 2024 apro a Sondrio il mio studio. A Maggio 2026 completo una nuova formazione frequentando l'Assisting Academy presso Ashtanga Yoga Italia, guidata da Rosa Tagliafierro. Nel mondo immenso della pratica yogica resto prima di tutto una studentessa: la pratica è parte della mia quotidianità e il mio intento è condividere i benefici e la bellezza dello yoga che mi accompagnano sin dai primi passi. Con amore e cura accompagno ogni persona nel proprio personale percorso.",
      philosophyHeading: "La Mia Filosofia",
      philosophy:
        "Lo yoga è un cammino: non si tratta solo di partecipare a una lezione, ma di creare uno spazio di presenza, ascolto e trasformazione nella propria vita.",
    },
    pricing: {
      heading: "Abbonamenti & Costi",
      intro: "Trova il percorso più adatto a te.",
      signupNote: "Per iscriverti, compila il modulo:",
      signupCta: "Iscriviti Ora",
      perksHeading: "I Tuoi Vantaggi",
      perks: [
        "Lezione online gratuita ogni lunedì mattina (esclusi Pacchetto Flessibile e Percorso Introduzione)",
        "Libertà di scegliere i giorni di frequenza",
        "Possibilità di praticare in presenza oppure online (lunedì mattina)",
        "Tote bag omaggio con il primo abbonamento",
        "10% di sconto sui workshop per chi sceglie l'Abbonamento Semestrale",
      ],
    },
    schedule: {
      heading: "Calendario & Prenotazioni",
      body: "Consulta gli orari disponibili e prenota il tuo posto direttamente su Bookyway.",
      note: "Effettua il login (o registrati) su Bookyway per vedere gli orari disponibili e prenotare.",
      ctaCalendar: "Vedi il Calendario",
      ctaBook: "Prenota una Lezione",
    },
    gallery: {
      heading: "Galleria",
    },
    contact: {
      heading: "Contatti",
      body: "Hai domande? Scrivimi, sarò felice di risponderti.",
      whatsapp: "Scrivimi su WhatsApp",
      email: "Inviami una Email",
    },
    footer: {
      location: "Sondrio, Italia",
      rights: "Tutti i diritti riservati.",
    },
  },
  en: {
    nav: {
      about: "About",
      pricing: "Pricing",
      schedule: "Schedule",
      gallery: "Gallery",
      contact: "Contact",
    },
    hero: {
      tagline:
        "I create spaces for practice to cultivate presence, listening, and awareness, breath after breath. A path toward your own freedom.",
      ctaBook: "Book a Class",
      ctaCalendar: "View the Calendar",
    },
    about: {
      heading: "My Story",
      bio: "My name is Jennifer, and my yoga journey began in 2012 with Hatha Yoga, which over time became a daily practice. In 2021 I deepened my studies with a two-year training in Hatha and Vinyasa Yoga at Hari Om. In 2023 I traveled to Rishikesh, where I trained in Vinyasa and Ashtanga Yoga — a discipline I discovered there for the first time — integrating anatomy, pranayama, meditation, and philosophy. In 2024 I returned to India for an intensive Ashtanga Yoga course with Sachin Badoni. I have been teaching since 2022, and in 2024 I opened my own studio in Sondrio. In May 2026 I completed further training at the Assisting Academy of Ashtanga Yoga Italia, led by Rosa Tagliafierro. In the vast world of yoga practice, I remain first and foremost a student: practice is part of my daily life, and my intention is to share the benefits and beauty of yoga that have accompanied me since my first steps. With love and care, I accompany each person on their own personal journey.",
      philosophyHeading: "My Philosophy",
      philosophy:
        "Yoga is a path: it's not just about attending a class, but about creating a space of presence, listening, and transformation in your own life.",
    },
    pricing: {
      heading: "Packages & Pricing",
      intro: "Find the path that fits you best.",
      signupNote: "To sign up, fill out the form:",
      signupCta: "Sign Up Now",
      perksHeading: "Your Perks",
      perks: [
        "Free online class every Monday morning (excludes the Flexible Package and Introduction Path)",
        "Freedom to choose which days you attend",
        "Practice in person or online (Monday mornings)",
        "Free tote bag with your first subscription",
        "10% off workshops for Semester Subscription members",
      ],
    },
    schedule: {
      heading: "Schedule & Booking",
      body: "Check available times and book your spot directly on Bookyway.",
      note: "Log in (or sign up) on Bookyway to see available times and book.",
      ctaCalendar: "View the Calendar",
      ctaBook: "Book a Class",
    },
    gallery: {
      heading: "Gallery",
    },
    contact: {
      heading: "Contact",
      body: "Have questions? Get in touch, I'd love to hear from you.",
      whatsapp: "Message on WhatsApp",
      email: "Send an Email",
    },
    footer: {
      location: "Sondrio, Italy",
      rights: "All rights reserved.",
    },
  },
};

export const pricingGroups = [
  {
    id: "start",
    title: { it: "Come Iniziare", en: "Getting Started" },
    plans: [
      {
        id: "trial",
        name: { it: "Lezione Prova", en: "Trial Class" },
        price: "10€",
        details: {
          it: ["Il modo più semplice per conoscere lo studio e l'insegnante."],
          en: ["The easiest way to try the studio and meet the teacher."],
        },
      },
      {
        id: "single",
        name: { it: "Lezione Singola", en: "Single Class" },
        price: "20€",
        details: {
          it: ["Senza abbonamento."],
          en: ["No subscription required."],
        },
      },
      {
        id: "intro",
        name: { it: "Percorso Introduzione allo Yoga", en: "Yoga Introduction Path" },
        price: "70€",
        details: {
          it: ["6 lezioni", "Validità 1 mese", "Riservato ai nuovi allievi"],
          en: ["6 classes", "Valid for 1 month", "New students only"],
        },
      },
    ],
  },
  {
    id: "flexible",
    title: { it: "Pacchetto Flessibile", en: "Flexible Package" },
    plans: [
      {
        id: "flex10",
        name: { it: "10 Lezioni", en: "10 Classes" },
        price: "172€",
        details: {
          it: [
            "Validità 6 mesi dalla data di acquisto",
            "Nessun obbligo di frequenza settimanale",
          ],
          en: ["Valid 6 months from the purchase date", "No fixed weekly commitment"],
        },
      },
    ],
  },
  {
    id: "bimonthly",
    title: { it: "Abbonamenti Bimestrali", en: "Bimonthly Subscriptions" },
    plans: [
      {
        id: "easy",
        name: { it: "Easy", en: "Easy" },
        price: "122€",
        details: {
          it: ["8 ingressi", "1 volta a settimana"],
          en: ["8 entries", "1x per week"],
        },
      },
      {
        id: "flex",
        name: { it: "Flex", en: "Flex" },
        price: "162€",
        details: {
          it: ["12 ingressi", "2 volte a settimana"],
          en: ["12 entries", "2x per week"],
        },
      },
      {
        id: "strong",
        name: { it: "Strong", en: "Strong" },
        price: "252€",
        details: {
          it: ["Ingressi illimitati", "In presenza oppure online"],
          en: ["Unlimited entries", "In-person or online"],
        },
      },
      {
        id: "students",
        name: { it: "Studenti & Online", en: "Students & Online" },
        price: "55€ / mese",
        details: {
          it: ["1 lezione a settimana", "Dedicato a studenti e pratica online"],
          en: ["1 class per week", "For students and online practice"],
        },
      },
    ],
  },
  {
    id: "semester",
    title: { it: "Abbonamento Semestrale", en: "Semester Subscription" },
    plans: [
      {
        id: "semester",
        name: { it: "Percorso di Trasformazione", en: "Transformation Path" },
        price: "580€",
        originalPrice: "756€",
        deadline: {
          it: "Offerta valida per iscrizioni entro il 30 Settembre.",
          en: "Offer valid for sign-ups by September 30.",
        },
        details: {
          it: [
            "Pratica illimitata per 6 mesi",
            "Risparmi 176€ rispetto al valore pieno",
            "10% di sconto sui workshop",
            "Tote bag in omaggio",
            "Lezione online inclusa",
          ],
          en: [
            "Unlimited practice for 6 months",
            "Save 176€ off full value",
            "10% off workshops",
            "Free tote bag",
            "Online class included",
          ],
        },
        highlight: true,
      },
    ],
  },
];
```

- [ ] **Step 4: Run the test and verify it passes**

Run: `node --test tests/data.test.mjs`
Expected: PASS — 3 tests passing, 0 failing.

- [ ] **Step 5: Commit**

```bash
git add data.js tests/data.test.mjs
git commit -m "feat: add pricing and translation data with tests"
```

---

### Task 3: Pure Rendering Functions (TDD)

**Files:**
- Create: `tests/render.test.mjs`
- Create: `render.js`

- [ ] **Step 1: Write the failing test**

Create `tests/render.test.mjs`:

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { getNested, renderPricingCardHTML, renderAllPricingHTML } from "../render.js";
import { pricingGroups } from "../data.js";

test("getNested reads a dotted path from a nested object", () => {
  const obj = { a: { b: { c: "value" } } };
  assert.equal(getNested(obj, "a.b.c"), "value");
});

test("getNested returns undefined for a missing path", () => {
  const obj = { a: {} };
  assert.equal(getNested(obj, "a.b.c"), undefined);
});

test("renderPricingCardHTML includes the plan name and price for the requested language", () => {
  const plan = {
    id: "sample",
    name: { it: "Prova", en: "Trial" },
    price: "10€",
    details: { it: ["dettaglio"], en: ["detail"] },
  };
  const html = renderPricingCardHTML(plan, "en");
  assert.match(html, /Trial/);
  assert.match(html, /10€/);
  assert.match(html, /detail/);
  assert.doesNotMatch(html, /Prova/);
});

test("renderPricingCardHTML marks the highlighted plan with the highlight class", () => {
  const plan = {
    id: "sample",
    name: { it: "X", en: "X" },
    price: "1€",
    details: { it: [], en: [] },
    highlight: true,
  };
  const html = renderPricingCardHTML(plan, "it");
  assert.match(html, /pricing-card--highlight/);
});

test("renderAllPricingHTML renders every group from the real pricing data", () => {
  const html = renderAllPricingHTML(pricingGroups, "it");
  for (const group of pricingGroups) {
    assert.match(html, new RegExp(group.title.it));
  }
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `node --test tests/render.test.mjs`
Expected: FAIL — `Cannot find module '../render.js'` (file doesn't exist yet).

- [ ] **Step 3: Implement `render.js`**

```js
export function getNested(obj, path) {
  return path.split(".").reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
}

export function renderPricingCardHTML(plan, lang) {
  const name = plan.name[lang];
  const details = plan.details[lang].map((detail) => `<li>${detail}</li>`).join("");
  const highlightClass = plan.highlight ? " pricing-card--highlight" : "";
  const original = plan.originalPrice
    ? `<span class="pricing-card-original">${plan.originalPrice}</span>`
    : "";
  const deadline = plan.deadline
    ? `<p class="pricing-card-deadline">${plan.deadline[lang]}</p>`
    : "";
  return `<div class="pricing-card${highlightClass}">
    <h4 class="pricing-card-name">${name}</h4>
    <p class="pricing-card-price">${original}<span class="pricing-card-price-amount">${plan.price}</span></p>
    <ul class="pricing-card-details">${details}</ul>
    ${deadline}
  </div>`;
}

export function renderPricingGroupHTML(group, lang) {
  const title = group.title[lang];
  const cards = group.plans.map((plan) => renderPricingCardHTML(plan, lang)).join("");
  return `<div class="pricing-group" id="group-${group.id}">
    <h3 class="pricing-group-title">${title}</h3>
    <div class="pricing-cards">${cards}</div>
  </div>`;
}

export function renderAllPricingHTML(groups, lang) {
  return groups.map((group) => renderPricingGroupHTML(group, lang)).join("");
}
```

- [ ] **Step 4: Run the test and verify it passes**

Run: `node --test tests/render.test.mjs`
Expected: PASS — 5 tests passing, 0 failing.

- [ ] **Step 5: Run the full test suite**

Run: `npm test`
Expected: PASS — all 8 tests (3 from Task 2 + 5 from Task 3) passing.

- [ ] **Step 6: Commit**

```bash
git add render.js tests/render.test.mjs
git commit -m "feat: add pure pricing render functions with tests"
```

---

### Task 4: HTML Skeleton

**Files:**
- Create: `index.html`

- [ ] **Step 1: Write `index.html`**

```html
<!doctype html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Jennifer Ainoldi Yoga — Sondrio</title>
  <meta name="description" content="Lezioni di yoga a Sondrio con Jennifer Ainoldi. Hatha, Vinyasa e Ashtanga Yoga in presenza e online." />
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <header class="site-header">
    <div class="container header-inner">
      <a class="logo" href="#hero">Jennifer Ainoldi <span>Yoga</span></a>
      <button id="nav-toggle" class="nav-toggle" aria-label="Menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <nav id="nav-menu" class="nav-menu">
        <a href="#about" data-i18n="nav.about">Chi Sono</a>
        <a href="#pricing" data-i18n="nav.pricing">Prezzi</a>
        <a href="#schedule" data-i18n="nav.schedule">Calendario</a>
        <a href="#gallery" data-i18n="nav.gallery">Galleria</a>
        <a href="#contact" data-i18n="nav.contact">Contatti</a>
        <div class="lang-toggle">
          <button data-lang="it" type="button">IT</button>
          <button data-lang="en" type="button">EN</button>
        </div>
      </nav>
    </div>
  </header>

  <main>
    <section id="hero" class="hero">
      <div class="container hero-inner">
        <h1 data-i18n="hero.tagline">Creo spazi di pratica per coltivare presenza, ascolto e consapevolezza, respiro dopo respiro. Un cammino verso la propria libertà.</h1>
        <div class="hero-ctas">
          <a class="button button--primary" href="https://admin.bookyway.com/v2/account/login" target="_blank" rel="noopener" data-i18n="hero.ctaBook">Prenota una lezione</a>
          <a class="button button--secondary" href="https://admin.bookyway.com/v2/account/login" target="_blank" rel="noopener" data-i18n="hero.ctaCalendar">Vedi il calendario</a>
        </div>
      </div>
    </section>

    <section id="about" class="about">
      <div class="container">
        <h2 data-i18n="about.heading">La Mia Storia</h2>
        <p data-i18n="about.bio">Bio in caricamento…</p>
        <h3 data-i18n="about.philosophyHeading">La Mia Filosofia</h3>
        <p class="philosophy" data-i18n="about.philosophy">Filosofia in caricamento…</p>
      </div>
    </section>

    <section id="pricing" class="pricing">
      <div class="container">
        <h2 data-i18n="pricing.heading">Abbonamenti & Costi</h2>
        <p data-i18n="pricing.intro">Trova il percorso più adatto a te.</p>
        <div id="pricing-groups"></div>
        <div class="pricing-perks">
          <h3 data-i18n="pricing.perksHeading">I Tuoi Vantaggi</h3>
          <ul data-i18n-list="pricing.perks"></ul>
        </div>
        <p class="pricing-signup">
          <span data-i18n="pricing.signupNote">Per iscriverti, compila il modulo:</span>
          <a href="https://forms.gle/MRuU7H5H3K93dkGL6" target="_blank" rel="noopener" class="button button--primary" data-i18n="pricing.signupCta">Iscriviti Ora</a>
        </p>
      </div>
    </section>

    <section id="schedule" class="schedule">
      <div class="container">
        <h2 data-i18n="schedule.heading">Calendario & Prenotazioni</h2>
        <p data-i18n="schedule.body">Consulta gli orari disponibili e prenota il tuo posto direttamente su Bookyway.</p>
        <div class="schedule-ctas">
          <a class="button button--primary" href="https://admin.bookyway.com/v2/account/login" target="_blank" rel="noopener" data-i18n="schedule.ctaBook">Prenota una Lezione</a>
          <a class="button button--secondary" href="https://admin.bookyway.com/v2/account/login" target="_blank" rel="noopener" data-i18n="schedule.ctaCalendar">Vedi il Calendario</a>
        </div>
        <p class="schedule-note" data-i18n="schedule.note">Effettua il login (o registrati) su Bookyway per vedere gli orari disponibili e prenotare.</p>
      </div>
    </section>

    <section id="gallery" class="gallery">
      <div class="container">
        <h2 data-i18n="gallery.heading">Galleria</h2>
        <div class="gallery-grid">
          <div class="gallery-placeholder"></div>
          <div class="gallery-placeholder"></div>
          <div class="gallery-placeholder"></div>
          <div class="gallery-placeholder"></div>
        </div>
      </div>
    </section>

    <section id="contact" class="contact">
      <div class="container">
        <h2 data-i18n="contact.heading">Contatti</h2>
        <p data-i18n="contact.body">Hai domande? Scrivimi, sarò felice di risponderti.</p>
        <div class="contact-links">
          <a class="button button--primary" href="https://api.whatsapp.com/send?phone=393420198207" target="_blank" rel="noopener" data-i18n="contact.whatsapp">Scrivimi su WhatsApp</a>
          <a class="button button--secondary" href="mailto:jenniferainoldi@gmail.com" data-i18n="contact.email">Inviami una Email</a>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container footer-inner">
      <p data-i18n="footer.location">Sondrio, Italia</p>
      <p data-i18n="footer.rights">Tutti i diritti riservati.</p>
    </div>
  </footer>

  <script type="module" src="script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat: add site HTML skeleton"
```

---

### Task 5: Stylesheet

**Files:**
- Create: `styles.css`

- [ ] **Step 1: Write `styles.css`**

```css
:root {
  --color-bg: #faf7f2;
  --color-bg-alt: #f1e9df;
  --color-surface: #ffffff;
  --color-text: #33302a;
  --color-muted: #746c60;
  --color-accent: #7c8b5d;
  --color-accent-dark: #5f6d45;
  --color-highlight: #c97b4a;
  --color-highlight-bg: #fbeee3;
  --color-border: #e7e0d5;
  --radius: 14px;
  --shadow: 0 8px 24px rgba(51, 48, 42, 0.08);
  --max-width: 1080px;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: var(--color-text);
  background: var(--color-bg);
  line-height: 1.6;
}

h1, h2, h3, h4 {
  font-family: Georgia, "Times New Roman", serif;
  font-weight: 600;
  line-height: 1.25;
  margin: 0 0 0.6em;
}

p {
  margin: 0 0 1em;
}

a {
  color: inherit;
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
}

.site-header {
  position: sticky;
  top: 0;
  background: rgba(250, 247, 242, 0.92);
  backdrop-filter: blur(6px);
  border-bottom: 1px solid var(--color-border);
  z-index: 100;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  padding-bottom: 16px;
  position: relative;
}

.logo {
  font-family: Georgia, serif;
  font-size: 1.2rem;
  text-decoration: none;
  color: var(--color-text);
}

.logo span {
  color: var(--color-accent-dark);
}

.nav-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
}

.nav-toggle span {
  width: 22px;
  height: 2px;
  background: var(--color-text);
  display: block;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-menu a {
  text-decoration: none;
  color: var(--color-text);
  font-size: 0.95rem;
}

.nav-menu a:hover {
  color: var(--color-accent-dark);
}

.lang-toggle {
  display: flex;
  gap: 4px;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  padding: 2px;
}

.lang-toggle button {
  border: none;
  background: none;
  padding: 4px 10px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 0.8rem;
  color: var(--color-muted);
}

.lang-toggle button.active {
  background: var(--color-accent);
  color: #fff;
}

.button {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 999px;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 600;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.button--primary {
  background: var(--color-accent);
  color: #fff;
}

.button--secondary {
  background: transparent;
  color: var(--color-accent-dark);
  border: 1px solid var(--color-accent);
}

.button:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow);
}

.hero {
  padding: 96px 0 72px;
  background: radial-gradient(circle at top right, var(--color-highlight-bg), var(--color-bg) 60%);
  text-align: center;
}

.hero-inner h1 {
  max-width: 640px;
  margin: 0 auto 32px;
  font-size: clamp(1.6rem, 3vw, 2.4rem);
}

.hero-ctas {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

section {
  padding: 72px 0;
}

section h2 {
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  text-align: center;
  margin-bottom: 12px;
}

.about p,
.pricing > .container > p,
.schedule p {
  max-width: 680px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.philosophy {
  font-style: italic;
  color: var(--color-accent-dark);
}

.pricing-group {
  margin: 40px 0;
}

.pricing-group-title {
  text-align: center;
  color: var(--color-accent-dark);
  font-size: 1.2rem;
}

.pricing-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.pricing-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 24px;
  box-shadow: var(--shadow);
}

.pricing-card--highlight {
  background: var(--color-highlight-bg);
  border: 2px solid var(--color-highlight);
}

.pricing-card-name {
  margin-bottom: 8px;
  font-size: 1.1rem;
}

.pricing-card-price {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-accent-dark);
  margin-bottom: 12px;
}

.pricing-card--highlight .pricing-card-price {
  color: var(--color-highlight);
}

.pricing-card-original {
  font-size: 1rem;
  color: var(--color-muted);
  text-decoration: line-through;
  margin-right: 8px;
  font-weight: 400;
}

.pricing-card-details {
  margin: 0;
  padding-left: 18px;
  color: var(--color-muted);
  font-size: 0.9rem;
}

.pricing-card-deadline {
  margin-top: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-highlight);
}

.pricing-perks {
  max-width: 640px;
  margin: 48px auto 0;
  background: var(--color-surface);
  border-radius: var(--radius);
  padding: 24px 32px;
  box-shadow: var(--shadow);
}

.pricing-perks h3 {
  text-align: center;
}

.pricing-signup {
  text-align: center;
  margin-top: 32px;
}

.pricing-signup span {
  display: block;
  margin-bottom: 12px;
  color: var(--color-muted);
}

.schedule {
  background: var(--color-bg-alt);
  text-align: center;
}

.schedule-ctas {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  margin: 24px 0;
}

.schedule-note {
  font-size: 0.85rem;
  color: var(--color-muted);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 32px;
}

.gallery-placeholder {
  aspect-ratio: 1;
  border-radius: var(--radius);
  background: linear-gradient(135deg, var(--color-accent), var(--color-highlight-bg));
  position: relative;
}

.gallery-placeholder::after {
  content: "✿";
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.7);
}

.contact {
  text-align: center;
}

.contact-links {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 24px;
}

.site-footer {
  border-top: 1px solid var(--color-border);
  padding: 32px 0;
  text-align: center;
  color: var(--color-muted);
  font-size: 0.85rem;
}

.footer-inner p {
  margin: 4px 0;
}

@media (max-width: 768px) {
  .nav-toggle {
    display: flex;
  }

  .nav-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--color-surface);
    flex-direction: column;
    align-items: flex-start;
    padding: 16px 24px;
    gap: 16px;
    display: none;
    border-bottom: 1px solid var(--color-border);
  }

  .nav-menu.open {
    display: flex;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add styles.css
git commit -m "feat: add site stylesheet"
```

---

### Task 6: DOM Wiring & Manual Verification

**Files:**
- Create: `script.js`

- [ ] **Step 1: Write `script.js`**

```js
import { translations, pricingGroups } from "./data.js";
import { getNested, renderAllPricingHTML } from "./render.js";

const STORAGE_KEY = "jay-lang";

function applyLanguage(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const path = el.getAttribute("data-i18n");
    const value = getNested(translations[lang], path);
    if (value !== undefined) {
      el.textContent = value;
    }
  });

  document.querySelectorAll("[data-i18n-list]").forEach((el) => {
    const path = el.getAttribute("data-i18n-list");
    const items = getNested(translations[lang], path);
    if (Array.isArray(items)) {
      el.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
    }
  });

  const pricingContainer = document.getElementById("pricing-groups");
  if (pricingContainer) {
    pricingContainer.innerHTML = renderAllPricingHTML(pricingGroups, lang);
  }

  document.querySelectorAll(".lang-toggle button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  localStorage.setItem(STORAGE_KEY, lang);
}

function initLanguageToggle() {
  document.querySelectorAll(".lang-toggle button").forEach((btn) => {
    btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
  });
}

function initMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");
  if (!toggle || !menu) return;
  toggle.addEventListener("click", () => {
    menu.classList.toggle("open");
    toggle.classList.toggle("open");
  });
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => menu.classList.remove("open"));
  });
}

function init() {
  const savedLang = localStorage.getItem(STORAGE_KEY);
  const initialLang = savedLang === "en" ? "en" : "it";
  initLanguageToggle();
  initMobileNav();
  applyLanguage(initialLang);
}

document.addEventListener("DOMContentLoaded", init);
```

- [ ] **Step 2: Serve the site locally**

Run: `npx --yes serve .`
Expected: prints a local URL such as `http://localhost:3000`.

- [ ] **Step 3: Manually verify in the browser**

Open the printed URL and confirm:
- The hero tagline, About bio, and philosophy text render in Italian.
- All 4 pricing groups render as cards with the correct prices (10€, 20€, 70€, 172€, 122€, 162€, 252€, 55€/mese, 580€ with 756€ struck through).
- The Semestrale card is visually highlighted (terracotta border/background) and shows the September 30 deadline.
- The "I Tuoi Vantaggi" list shows all 5 perks.
- Clicking "EN" switches every section (nav, hero, about, pricing cards, perks, schedule, contact) to English, and the active language button is visually indicated.
- Reloading the page keeps the last-selected language (localStorage persistence).
- "Prenota una lezione" / "Vedi il calendario" / "Book a Class" buttons open `admin.bookyway.com` in a new tab.
- The WhatsApp button opens `https://api.whatsapp.com/send?phone=393420198207`; the email button opens a `mailto:` composer.
- On a narrow viewport (resize below 768px), the nav collapses into a hamburger menu that opens/closes correctly.

- [ ] **Step 4: Commit**

```bash
git add script.js
git commit -m "feat: wire up language toggle, pricing render, and mobile nav"
```

---

### Task 7: Notion Paste-Ready Pricing Page

**Files:**
- Create: `notion/pricing-page.md`
- Create: `notion/README.md`

- [ ] **Step 1: Write `notion/pricing-page.md`**

```markdown
# Abbonamenti & Costi

> Lo yoga è un cammino: non si tratta solo di partecipare a una lezione, ma di creare uno spazio di presenza, ascolto e trasformazione nella propria vita.

## Come Iniziare

**Lezione Prova — 10€**
Il modo più semplice per conoscere lo studio e l'insegnante.

**Lezione Singola — 20€** (senza abbonamento)

**Percorso Introduzione allo Yoga — 70€**
- 6 lezioni
- Validità 1 mese
- Riservato ai nuovi allievi

## Pacchetto Flessibile

**10 Lezioni — 172€**
- Validità 6 mesi dalla data di acquisto
- Nessun obbligo di frequenza settimanale

## Abbonamenti Bimestrali

**Easy — 122€**
- 8 ingressi
- 1 volta a settimana

**Flex — 162€**
- 12 ingressi
- 2 volte a settimana

**Strong — 252€**
- Ingressi illimitati
- In presenza oppure online

**Studenti & Online — 55€ / mese**
- 1 lezione a settimana
- Dedicato a studenti e pratica online

## 🌟 Abbonamento Semestrale — Percorso di Trasformazione

~~756€~~ **580€** (risparmi 176€)

Offerta valida per iscrizioni entro il 30 Settembre.

- Pratica illimitata per 6 mesi
- 10% di sconto sui workshop
- Tote bag in omaggio
- Lezione online inclusa

## I Tuoi Vantaggi

- Lezione online gratuita ogni lunedì mattina (esclusi Pacchetto Flessibile e Percorso Introduzione)
- Libertà di scegliere i giorni di frequenza
- Possibilità di praticare in presenza oppure online (lunedì mattina)
- Tote bag omaggio con il primo abbonamento
- 10% di sconto sui workshop per chi sceglie l'Abbonamento Semestrale

---

**Pronta a iniziare?** [Iscriviti qui](https://forms.gle/MRuU7H5H3K93dkGL6)
```

- [ ] **Step 2: Write `notion/README.md`**

```markdown
# Notion pricing page — how to apply this redesign

Notion's markdown paste does most of the formatting automatically, but a few
block types (callouts, toggles, columns) need a manual conversion step after
pasting. Do this once:

1. In Notion, create a new page (or open the existing "Abbonamenti & Costi"
   page and clear its contents), then paste the full contents of
   `pricing-page.md`.
2. Select the italic quote at the top ("Lo yoga è un cammino…") → type
   `/callout`, choose a soft green background, add a 🌿 icon.
3. Select the three "Come Iniziare" items (Lezione Prova, Lezione Singola,
   Percorso Introduzione) → type `/toggle`, title it "Come Iniziare", then
   drag the three items inside the toggle.
4. Select the Easy / Flex / Strong blocks (not Studenti & Online) → drag them
   side by side (Notion turns this into a column layout automatically), or
   use `/columns` → "3 columns" and place one plan per column.
5. Select the "🌟 Abbonamento Semestrale" section → type `/callout`, choose a
   peach/orange background so it visually stands out as the flagship offer.
6. Select "Studenti & Online" → type `/toggle` to keep it visually separate
   from the bimonthly tiers.
7. Select the "I Tuoi Vantaggi" list → type `/callout`, choose a neutral
   background, and switch the bullets to a checklist (`/to-do list`) if you
   want checkable items.
8. Add a divider (`/divider`) above the closing line.
9. Select the "Iscriviti qui" link → type `/button`, set the action to "Open
   a link", and paste `https://forms.gle/MRuU7H5H3K93dkGL6` so it renders as
   a clickable CTA button instead of plain text.

All prices and rules are unchanged from the current live page — only the
visual structure changes.
```

- [ ] **Step 3: Commit**

```bash
git add notion/pricing-page.md notion/README.md
git commit -m "docs: add Notion paste-ready pricing redesign"
```

---

### Task 8: Project README & Deployment Guide

**Files:**
- Create: `README.md`

- [ ] **Step 1: Write `README.md`**

```markdown
# Jennifer Ainoldi Yoga — Website

Static site for the yoga studio (Sondrio, Italy), built with plain
HTML/CSS/JS — no build step, no framework.

## Local preview

\`\`\`bash
npx --yes serve .
\`\`\`

Then open the printed local URL in your browser.

## Running tests

\`\`\`bash
npm test
\`\`\`

Tests cover the pricing/translation data (`data.js`) and the pure HTML
render functions (`render.js`) — the parts of the site with real logic.
The HTML/CSS/DOM-wiring is verified manually in a browser (see Task 6 of
the implementation plan in `docs/superpowers/plans/`).

## Deploying to GitHub Pages

1. Create a new GitHub repository (e.g. `jenniferainoldiyoga-site`).
2. Push this project to it:
   \`\`\`bash
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git branch -M main
   git push -u origin main
   \`\`\`
3. In the GitHub repo, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to `Deploy from a branch`,
   branch `main`, folder `/ (root)`.
5. Save. GitHub publishes the site at
   `https://<your-username>.github.io/<repo-name>/` within a minute or two.

## Updating content

- Prices, packages, and all text (Italian + English): edit `data.js`.
- Page structure/sections: edit `index.html`.
- Look and feel: edit `styles.css`.
- Booking/calendar link: currently points to Bookyway
  (`https://admin.bookyway.com/v2/account/login`) — update every occurrence
  in `index.html` if that link ever changes.

## Known placeholders to replace before publishing

- Gallery images are decorative CSS color blocks — replace with real photos
  in an `assets/` folder and update `index.html`/`styles.css` to reference
  them.
- The About/Philosophy text currently reuses the philosophy line from the
  pricing page as a stand-in for "CONOSCI IL MIO APPROCCIO" — replace
  `about.philosophy` (and its English translation) in `data.js` with the
  real approach text once available.
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add project README with deployment instructions"
```

---

### Task 9: Publish to GitHub Pages (manual, requires your go-ahead)

This task publishes the site publicly and is **not** something to run
automatically — it needs your own GitHub account and explicit confirmation
before pushing, per the deployment steps already documented in `README.md`.

- [ ] **Step 1: Create the GitHub repository** (via github.com or `gh repo create`, your choice)
- [ ] **Step 2: Push this project** using the commands in `README.md` → "Deploying to GitHub Pages"
- [ ] **Step 3: Enable GitHub Pages** in the repo's Settings → Pages, as documented
- [ ] **Step 4: Visit the published URL and re-run the Task 6 manual verification checklist against the live site**
