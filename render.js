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
  const unit = plan.unit
    ? `<span class="pricing-card-unit">${plan.unit[lang]}</span>`
    : "";
  const deadline = plan.deadline
    ? `<p class="pricing-card-deadline">${plan.deadline[lang]}</p>`
    : "";
  const expandableClass = plan.description ? " pricing-card--expandable" : "";
  const interactiveAttrs = plan.description
    ? ` role="button" tabindex="0" aria-expanded="false"`
    : "";
  const more = plan.description
    ? `<p class="pricing-card-more" hidden>${plan.description[lang]}</p>`
    : "";
  const badge = plan.badge
    ? `<span class="pricing-card-badge">${plan.badge[lang]}</span>`
    : "";
  return `<div class="pricing-card${highlightClass}${expandableClass}"${interactiveAttrs}>
    ${badge}
    <h4 class="pricing-card-name">${name}</h4>
    <p class="pricing-card-price">${original}<span class="pricing-card-price-amount">${plan.price}</span>${unit}</p>
    <ul class="pricing-card-details">${details}</ul>
    ${deadline}
    ${more}
  </div>`;
}

export function renderPricingGroupHTML(group, lang) {
  const title = group.title[lang];
  const cards = group.plans.map((plan) => renderPricingCardHTML(plan, lang)).join("");
  const note = group.note
    ? `<p class="pricing-group-note">${group.note[lang]}</p>`
    : "";
  return `<div class="pricing-group" id="group-${group.id}">
    <h3 class="pricing-group-title">${title}</h3>
    ${note}
    <div class="pricing-cards">${cards}</div>
  </div>`;
}

export function renderAllPricingHTML(groups, lang) {
  return groups.map((group) => renderPricingGroupHTML(group, lang)).join("");
}

export function renderRegolamentoGroupHTML(group, lang) {
  const heading = group.heading[lang];
  const items = group.items[lang].map((item) => `<li>${item}</li>`).join("");
  const note = group.note
    ? `<p class="regolamento-note">${group.note[lang]}</p>`
    : "";
  return `<div class="regolamento-group">
    <h3 class="regolamento-group-title">${heading}</h3>
    <ul class="regolamento-list">${items}</ul>
    ${note}
  </div>`;
}

export function renderAllRegolamentoHTML(groups, lang) {
  return groups.map((group) => renderRegolamentoGroupHTML(group, lang)).join("");
}

export function renderFaqItemHTML(item, lang) {
  return `<details class="faq">
    <summary><span class="faq-question">${item.q[lang]}</span><span class="faq-icon">+</span></summary>
    <div class="faq-answer">${item.a[lang]}</div>
  </details>`;
}

export function renderFaqGroupHTML(group, lang) {
  const heading = group.heading[lang];
  const items = group.items.map((item) => renderFaqItemHTML(item, lang)).join("");
  return `<div class="faq-group">
    <h3 class="faq-group-title">${heading}</h3>
    <div class="faq-list">${items}</div>
  </div>`;
}

export function renderAllFaqHTML(groups, lang) {
  return groups.map((group) => renderFaqGroupHTML(group, lang)).join("");
}
