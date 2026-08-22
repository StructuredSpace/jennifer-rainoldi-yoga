import { test } from "node:test";
import assert from "node:assert/strict";
import {
  getNested,
  renderPricingCardHTML,
  renderPricingGroupHTML,
  renderAllPricingHTML,
  renderRegolamentoGroupHTML,
  renderAllRegolamentoHTML,
  renderFaqItemHTML,
  renderFaqGroupHTML,
  renderAllFaqHTML,
} from "../render.js";
import { pricingGroups, regolamentoGroups, faqGroups } from "../data.js";

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

test("renderPricingCardHTML renders the unit suffix in the requested language when present", () => {
  const plan = {
    id: "sample",
    name: { it: "X", en: "X" },
    price: "55€",
    unit: { it: "/ mese", en: "/ month" },
    details: { it: [], en: [] },
  };
  const htmlEn = renderPricingCardHTML(plan, "en");
  assert.match(htmlEn, /\/ month/);
  assert.doesNotMatch(htmlEn, /\/ mese/);
  const htmlIt = renderPricingCardHTML(plan, "it");
  assert.match(htmlIt, /\/ mese/);
});

test("renderPricingCardHTML omits the unit suffix entirely when not present", () => {
  const plan = {
    id: "sample",
    name: { it: "X", en: "X" },
    price: "10€",
    details: { it: [], en: [] },
  };
  const html = renderPricingCardHTML(plan, "en");
  assert.doesNotMatch(html, /undefined/);
  assert.doesNotMatch(html, /pricing-card-unit/);
});

test("renderPricingCardHTML renders the deadline text in the requested language when present", () => {
  const plan = {
    id: "sample",
    name: { it: "X", en: "X" },
    price: "1€",
    deadline: { it: "Scade il 30 settembre", en: "Expires September 30" },
    details: { it: [], en: [] },
  };
  const htmlEn = renderPricingCardHTML(plan, "en");
  assert.match(htmlEn, /Expires September 30/);
  assert.doesNotMatch(htmlEn, /Scade il 30 settembre/);
  const htmlIt = renderPricingCardHTML(plan, "it");
  assert.match(htmlIt, /Scade il 30 settembre/);
});

test("renderPricingCardHTML omits the deadline paragraph entirely when not present", () => {
  const plan = {
    id: "sample",
    name: { it: "X", en: "X" },
    price: "1€",
    details: { it: [], en: [] },
  };
  const html = renderPricingCardHTML(plan, "en");
  assert.doesNotMatch(html, /pricing-card-deadline/);
});

test("renderPricingCardHTML renders the description as a hidden expandable block, with interactive attributes, when present", () => {
  const plan = {
    id: "sample",
    name: { it: "X", en: "X" },
    price: "1€",
    description: { it: "Descrizione italiana", en: "English description" },
    details: { it: [], en: [] },
  };
  const htmlEn = renderPricingCardHTML(plan, "en");
  assert.match(htmlEn, /pricing-card--expandable/);
  assert.match(htmlEn, /role="button"/);
  assert.match(htmlEn, /tabindex="0"/);
  assert.match(htmlEn, /aria-expanded="false"/);
  assert.match(htmlEn, /<p class="pricing-card-more" hidden>English description<\/p>/);
  assert.doesNotMatch(htmlEn, /Descrizione italiana/);
});

test("renderPricingCardHTML omits the description block and interactive attributes when not present", () => {
  const plan = {
    id: "sample",
    name: { it: "X", en: "X" },
    price: "1€",
    details: { it: [], en: [] },
  };
  const html = renderPricingCardHTML(plan, "en");
  assert.doesNotMatch(html, /pricing-card--expandable/);
  assert.doesNotMatch(html, /pricing-card-more/);
  assert.doesNotMatch(html, /role="button"/);
});

test("renderPricingCardHTML renders the badge text in the requested language when present", () => {
  const plan = {
    id: "sample",
    name: { it: "X", en: "X" },
    price: "1€",
    badge: { it: "Offerta Limitata", en: "Limited Offer" },
    details: { it: [], en: [] },
  };
  const htmlEn = renderPricingCardHTML(plan, "en");
  assert.match(htmlEn, /Limited Offer/);
  assert.doesNotMatch(htmlEn, /Offerta Limitata/);
});

test("renderPricingCardHTML omits the badge entirely when not present", () => {
  const plan = {
    id: "sample",
    name: { it: "X", en: "X" },
    price: "1€",
    details: { it: [], en: [] },
  };
  const html = renderPricingCardHTML(plan, "en");
  assert.doesNotMatch(html, /pricing-card-badge/);
});

test("renderAllPricingHTML renders every group from the real pricing data", () => {
  const html = renderAllPricingHTML(pricingGroups, "it");
  for (const group of pricingGroups) {
    assert.match(html, new RegExp(group.title.it));
  }
});

test("renderPricingGroupHTML renders the group note in the requested language when present", () => {
  const group = {
    id: "sample",
    title: { it: "Gruppo", en: "Group" },
    note: { it: "Nota italiana", en: "English note" },
    plans: [],
  };
  const htmlEn = renderPricingGroupHTML(group, "en");
  assert.match(htmlEn, /pricing-group-note/);
  assert.match(htmlEn, /English note/);
  assert.doesNotMatch(htmlEn, /Nota italiana/);
});

test("renderPricingGroupHTML omits the note entirely when not present", () => {
  const group = { id: "sample", title: { it: "Gruppo", en: "Group" }, plans: [] };
  const html = renderPricingGroupHTML(group, "en");
  assert.doesNotMatch(html, /pricing-group-note/);
});

test("renderRegolamentoGroupHTML renders the heading, items, and optional note in the requested language", () => {
  const group = {
    id: "sample",
    heading: { it: "Titolo", en: "Heading" },
    items: { it: ["voce uno"], en: ["item one"] },
    note: { it: "nota", en: "note" },
  };
  const htmlEn = renderRegolamentoGroupHTML(group, "en");
  assert.match(htmlEn, /Heading/);
  assert.match(htmlEn, /item one/);
  assert.match(htmlEn, /class="regolamento-note">note</);
  assert.doesNotMatch(htmlEn, /Titolo|voce uno|>nota</);
});

test("renderRegolamentoGroupHTML omits the note entirely when not present", () => {
  const group = { id: "sample", heading: { it: "T", en: "H" }, items: { it: ["a"], en: ["a"] } };
  const html = renderRegolamentoGroupHTML(group, "en");
  assert.doesNotMatch(html, /regolamento-note/);
});

test("renderAllRegolamentoHTML renders every group from the real regolamento data", () => {
  const html = renderAllRegolamentoHTML(regolamentoGroups, "it");
  for (const group of regolamentoGroups) {
    assert.match(html, new RegExp(group.heading.it));
  }
});

test("renderFaqItemHTML renders the question and answer in the requested language as a native details/summary", () => {
  const item = {
    q: { it: "Domanda?", en: "Question?" },
    a: { it: "Risposta.", en: "Answer." },
  };
  const htmlEn = renderFaqItemHTML(item, "en");
  assert.match(htmlEn, /<details class="faq">/);
  assert.match(htmlEn, /Question\?/);
  assert.match(htmlEn, /Answer\./);
  assert.doesNotMatch(htmlEn, /Domanda\?|Risposta\./);
});

test("renderFaqGroupHTML renders the group heading and every item", () => {
  const group = {
    id: "sample",
    heading: { it: "Gruppo", en: "Group" },
    items: [
      { q: { it: "D1", en: "Q1" }, a: { it: "R1", en: "A1" } },
      { q: { it: "D2", en: "Q2" }, a: { it: "R2", en: "A2" } },
    ],
  };
  const html = renderFaqGroupHTML(group, "en");
  assert.match(html, /Group/);
  assert.match(html, /Q1/);
  assert.match(html, /Q2/);
  assert.equal((html.match(/<details class="faq">/g) || []).length, 2);
});

test("renderAllFaqHTML renders every group and every question from the real FAQ data", () => {
  const html = renderAllFaqHTML(faqGroups, "it");
  for (const group of faqGroups) {
    assert.match(html, new RegExp(group.heading.it));
    for (const item of group.items) {
      assert.match(html, new RegExp(escapeRegExp(item.q.it)));
    }
  }
});

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
