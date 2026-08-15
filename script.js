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

  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const path = el.getAttribute("data-i18n-html");
    const value = getNested(translations[lang], path);
    if (value !== undefined) {
      el.innerHTML = value;
    }
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
    const path = el.getAttribute("data-i18n-alt");
    const value = getNested(translations[lang], path);
    if (value !== undefined) {
      el.setAttribute("alt", value);
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
    initPricingExpanders(pricingContainer);
  }

  document.querySelectorAll(".lang-toggle button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  localStorage.setItem(STORAGE_KEY, lang);
}

function togglePricingCard(card) {
  const more = card.querySelector(".pricing-card-more");
  if (!more) return;
  const isExpanded = card.getAttribute("aria-expanded") === "true";
  card.setAttribute("aria-expanded", String(!isExpanded));
  card.classList.toggle("expanded", !isExpanded);
  more.hidden = isExpanded;
}

function initPricingExpanders(container) {
  container.querySelectorAll(".pricing-card--expandable").forEach((card) => {
    card.addEventListener("click", () => togglePricingCard(card));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        togglePricingCard(card);
      }
    });
  });
}

function toggleReveal(targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;
  const wasHidden = target.hidden;
  target.hidden = !wasHidden;
  document.querySelectorAll(`[data-reveal="${targetId}"]`).forEach((trigger) => {
    trigger.setAttribute("aria-expanded", String(wasHidden));
  });
  if (wasHidden) {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
  }
}

function initRevealToggles() {
  document.querySelectorAll("[data-reveal]").forEach((trigger) => {
    trigger.setAttribute("aria-expanded", "false");
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      toggleReveal(trigger.getAttribute("data-reveal"));
    });
  });
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
    const isOpen = menu.classList.toggle("open");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function init() {
  const savedLang = localStorage.getItem(STORAGE_KEY);
  const initialLang = savedLang === "en" ? "en" : "it";
  initLanguageToggle();
  initMobileNav();
  initRevealToggles();
  applyLanguage(initialLang);
}

document.addEventListener("DOMContentLoaded", init);
