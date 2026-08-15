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

test("renderAllPricingHTML renders every group from the real pricing data", () => {
  const html = renderAllPricingHTML(pricingGroups, "it");
  for (const group of pricingGroups) {
    assert.match(html, new RegExp(group.title.it));
  }
});
