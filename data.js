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
      bio: "Mi chiamo Jennifer e il mio percorso nello yoga inizia nel 2012 con l'Hatha Yoga, diventando nel tempo una pratica quotidiana. Nel 2021 approfondisco lo studio con una formazione biennale in Hatha e Vinyasa Yoga presso Hari Om. Nel 2023 viaggio alla volta di Rishikesh, dove mi formo in Vinyasa e Ashtanga Yoga, disciplina che incontro qui per la prima volta, integrando anatomia, pranayama, meditazione e filosofia. Nel 2024 torno in India per un corso intensivo di Ashtanga Yoga con Sachin Badoni. Insegno dal 2022 e nel 2024 apro a Sondrio il mio studio. A maggio 2026 completo una nuova formazione frequentando l'Assisting Academy presso Ashtanga Yoga Italia, guidata da Rosa Tagliafierro. Nel mondo immenso della pratica yogica resto prima di tutto una studentessa: la pratica è parte della mia quotidianità e il mio intento è condividere i benefici e la bellezza dello yoga che mi accompagnano sin dai primi passi. Con amore e cura accompagno ogni persona nel proprio personale percorso.",
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
        price: "55€",
        unit: { it: "/ mese", en: "/ month" },
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
          it: "Offerta valida per iscrizioni entro il 30 settembre.",
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
