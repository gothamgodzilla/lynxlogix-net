const LATE = {
  office: "lynxlogix.mandate.office.v1",
  cap: "lynxlogix.mandate.cap.v1",
  venues: "lynxlogix.mandate.venues.v1",
  forbid: "lynxlogix.mandate.forbid.v1"
};

function mandateText() {
  const office = (document.querySelector("[data-mandate-office]") || {}).value || "house account";
  const cap = (document.querySelector("[data-mandate-cap]") || {}).value || "0.50% of marked equity";
  const venues = (document.querySelector("[data-mandate-venues]") || {}).value || "paper venues only";
  const forbid = (document.querySelector("[data-mandate-forbid]") || {}).value || "No live unattended order.";
  return [
    "LYNXLOGIX.NET — FAMILY OFFICE MANDATE",
    "sealedAt: " + new Date().toISOString(),
    "principal: " + office.trim(),
    "maxPaperSize: " + cap,
    "venuesNamed: " + venues.trim(),
    "forbidden: " + forbid.trim(),
    "executed: false",
    "tenVoicesMayDraft: true",
    "humanLastKey: true",
    "consumerCheckout: https://www.mangasm.app/plus",
    "law: signals may be automatic. money may not."
  ].join("\n");
}

function bindMandateFields() {
  const office = document.querySelector("[data-mandate-office]");
  const cap = document.querySelector("[data-mandate-cap]");
  const venues = document.querySelector("[data-mandate-venues]");
  const forbid = document.querySelector("[data-mandate-forbid]");
  if (!office) return;
  if (!office.dataset.bound) {
    const savedOffice = localStorage.getItem(LATE.office);
    const savedCap = localStorage.getItem(LATE.cap);
    const savedVenues = localStorage.getItem(LATE.venues);
    const savedForbid = localStorage.getItem(LATE.forbid);
    if (savedOffice) office.value = savedOffice;
    if (savedCap && cap) cap.value = savedCap;
    if (savedVenues && venues) venues.value = savedVenues;
    if (savedForbid && forbid) forbid.value = savedForbid;
    office.dataset.bound = "1";
  }
  const preview = document.querySelector("[data-mandate-preview]");
  if (preview) preview.textContent = mandateText();
}

function handleMandate(e) {
  const btn = e.target.closest("[data-mandate]");
  if (!btn) return;
  const office = document.querySelector("[data-mandate-office]");
  const cap = document.querySelector("[data-mandate-cap]");
  const venues = document.querySelector("[data-mandate-venues]");
  const forbid = document.querySelector("[data-mandate-forbid]");
  if (office) localStorage.setItem(LATE.office, office.value);
  if (cap) localStorage.setItem(LATE.cap, cap.value);
  if (venues) localStorage.setItem(LATE.venues, venues.value);
  if (forbid) localStorage.setItem(LATE.forbid, forbid.value);
  const preview = document.querySelector("[data-mandate-preview]");
  const status = document.querySelector("[data-mandate-status]");
  const text = mandateText();
  if (preview) preview.textContent = text;
  if (btn.dataset.mandate === "copy" && navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      if (status) status.textContent = "Mandate card copied.";
    }).catch(() => {
      if (status) status.textContent = "Copy blocked — select the preview.";
    });
  } else if (status) {
    status.textContent = "Mandate sealed on this browser · executed: false.";
  }
}

function handleInvite(e) {
  const btn = e.target.closest("[data-invite]");
  if (!btn) return;
  const script = document.querySelector("[data-invite-script]");
  const status = document.querySelector("[data-invite-status]");
  const text = (script ? script.textContent.trim() : "") + "\n\nhttps://www.mangasm.app/plus";
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      if (status) status.textContent = "Invitation copied. Send to one room.";
    }).catch(() => {
      if (status) status.textContent = "Copy blocked — select the paragraph.";
    });
  }
}

function handleGrammar(e) {
  const btn = e.target.closest("[data-grammar]");
  if (!btn) return;
  const block = document.querySelector("[data-grammar-json]");
  const status = document.querySelector("[data-grammar-status]");
  const text = block ? block.textContent.trim() : "";
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      if (status) status.textContent = "JSON copied. Webhook still paper-only.";
    }).catch(() => {
      if (status) status.textContent = "Copy blocked — select the block.";
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  bindMandateFields();
  document.body.addEventListener("click", (e) => {
    handleMandate(e);
    handleInvite(e);
    handleGrammar(e);
  });
});
