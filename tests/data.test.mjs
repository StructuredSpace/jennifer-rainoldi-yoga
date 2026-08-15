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

test("every plan description (if present) is defined in both languages", () => {
  for (const group of pricingGroups) {
    for (const plan of group.plans) {
      if (plan.description) {
        assert.ok(plan.description.it, `plan ${plan.id} missing italian description`);
        assert.ok(plan.description.en, `plan ${plan.id} missing english description`);
      }
    }
  }
});
