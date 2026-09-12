const EVE = {
  audit: "lynxlogix.audit.v1",
  letterName: "lynxlogix.letter.name.v1",
  letterNote: "lynxlogix.letter.note.v1",
  dry: "lynxlogix.dryrun.v1"
};

function auditBoxes() {
  return Array.from(document.querySelectorAll("[data-audit-box]"));
}

function loadAuditMarks() {
  try {
    return JSON.parse(localStorage.getItem(EVE.audit) || "{}");
  } catch (_) {
    return {};
  }
}

function auditCard() {
  const state = typeof loadDesk === "function" ? loadDesk() : { log: [], signals: [], closed: false };
  const score = typeof scoreDesk === "function" ? scoreDesk(state) : { decisions: 0, approved: 0, awaiting: 0, closed: 0 };
  const marks = loadAuditMarks();
  const boxes = auditBoxes();
  const checked = boxes.filter((el) => el.checked).map((el) => el.dataset.auditBox);
  return [
    "LYNXLOGIX.NET — EVENING AUDIT",
    "exportedAt: " + new Date().toISOString(),
    "executed: false",
    "human decisions: " + score.decisions,
    "paper approved: " + score.approved,
    "awaiting human: " + score.awaiting,
    "deskClosed: " + !!state.closed,
    "marks: " + (checked.join(", ") || "none"),
    "saturdayLinePresent: " + !!(localStorage.getItem("lynxlogix.saturday.line.v1") || "").trim(),
    "law: dusk is scored against artifacts, not mood."
  ].join("\n");
}

function renderAudit() {
  const stats = document.querySelector("[data-audit-stats]");
  const preview = document.querySelector("[data-audit-preview]");
  const marks = loadAuditMarks();
  auditBoxes().forEach((el) => {
    el.checked = !!marks[el.dataset.auditBox];
  });
  if (stats && typeof loadDesk === "function") {
    const s = scoreDesk(loadDesk());
    stats.innerHTML = [
      ["Human decisions", String(s.decisions), "Approve, reject, hold, block, close."],
      ["Awaiting", String(s.awaiting), "Tickets still owed a sentence."],
      ["Desk sealed", s.closed ? "Yes" : "No", "CLOSE THE DESK is a signature."]
    ].map((c) => `<article class="card"><div class="tiny">${c[0]}</div><p class="stat">${c[1]}</p><p class="muted">${c[2]}</p></article>`).join("");
  }
  if (preview) preview.textContent = auditCard();
}

function handleAudit(e) {
  const btn = e.target.closest("[data-audit]");
  if (!btn) return;
  const status = document.querySelector("[data-audit-status]");
  if (btn.dataset.audit === "save") {
    const marks = {};
    auditBoxes().forEach((el) => { marks[el.dataset.auditBox] = !!el.checked; });
    localStorage.setItem(EVE.audit, JSON.stringify(marks));
    renderAudit();
    if (status) status.textContent = "Marks saved on this browser · executed: false.";
  }
  if (btn.dataset.audit === "copy") {
    const text = auditCard();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        if (status) status.textContent = "Audit card copied.";
      }).catch(() => {
        if (status) status.textContent = "Copy blocked — select the preview.";
      });
    }
  }
}

function composeLetter() {
  const nameEl = document.querySelector("[data-letter-name]");
  const noteEl = document.querySelector("[data-letter-note]");
  const name = nameEl && nameEl.value.trim() ? nameEl.value.trim() : "friend of the house";
  const note = noteEl && noteEl.value.trim() ? noteEl.value.trim() : "The desk is paper-only. No machine can spend.";
  return [
    name + ",",
    "",
    "LynxLogix.NET is not a casino and not a coin. It is a human-gated paper desk: signals may arrive by themselves; money may not leave by itself.",
    "",
    note,
    "",
    "If you want the living product — a safety-first home, not a harvest loop — start here:",
    "https://www.mangasm.app/plus",
    "",
    "If you want a house gift or a desk seat, write hello@lynxlogix.net. Planning figures stay behind the pass until Stripe exports replace them.",
    "",
    "— Mark Webster / Mangasm Enterprises"
  ].join("\n");
}

function renderLetter() {
  const nameEl = document.querySelector("[data-letter-name]");
  const noteEl = document.querySelector("[data-letter-note]");
  const preview = document.querySelector("[data-letter-preview]");
  if (!nameEl || !noteEl) return;
  if (!nameEl.dataset.bound) {
    nameEl.value = localStorage.getItem(EVE.letterName) || "";
    noteEl.value = localStorage.getItem(EVE.letterNote) || "";
    nameEl.dataset.bound = "1";
    noteEl.dataset.bound = "1";
  }
  if (preview) preview.textContent = composeLetter();
}

function handleLetter(e) {
  const btn = e.target.closest("[data-letter]");
  if (!btn) return;
  const nameEl = document.querySelector("[data-letter-name]");
  const noteEl = document.querySelector("[data-letter-note]");
  const status = document.querySelector("[data-letter-status]");
  const preview = document.querySelector("[data-letter-preview]");
  if (nameEl) localStorage.setItem(EVE.letterName, nameEl.value);
  if (noteEl) localStorage.setItem(EVE.letterNote, noteEl.value);
  const text = composeLetter();
  if (preview) preview.textContent = text;
  if (btn.dataset.letter === "copy" && navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      if (status) status.textContent = "Letter copied. Send it to one person.";
    }).catch(() => {
      if (status) status.textContent = "Copy blocked — select the preview.";
    });
  } else if (status) {
    status.textContent = "Letter composed on this browser.";
  }
}

function dryBoxes() {
  return Array.from(document.querySelectorAll("[data-dry]"));
}

function loadDry() {
  try {
    return JSON.parse(localStorage.getItem(EVE.dry) || "{}");
  } catch (_) {
    return {};
  }
}

function dryCard() {
  const marks = dryBoxes().filter((el) => el.checked).map((el) => el.dataset.dry);
  return [
    "LYNXLOGIX.NET — DRY-RUN PASSPORT",
    "exportedAt: " + new Date().toISOString(),
    "executed: false",
    "venues named: Coinbase Advanced, Kraken, Phantom watch, Kraken Wallet, TradingView, Hopper flag",
    "checked: " + (marks.join(", ") || "none"),
    "liveKeysOnThisSite: false",
    "law: a passport is not a signed order."
  ].join("\n");
}

function renderDry() {
  const saved = loadDry();
  dryBoxes().forEach((el) => { el.checked = !!saved[el.dataset.dry]; });
  const preview = document.querySelector("[data-dry-preview]");
  if (preview) preview.textContent = dryCard();
}

function handleDry(e) {
  const btn = e.target.closest("[data-dry-act]");
  if (!btn) return;
  const status = document.querySelector("[data-dry-status]");
  if (btn.dataset.dryAct === "save") {
    const marks = {};
    dryBoxes().forEach((el) => { marks[el.dataset.dry] = !!el.checked; });
    localStorage.setItem(EVE.dry, JSON.stringify(marks));
    renderDry();
    if (status) status.textContent = "Dry-run saved · no keys stored.";
  }
  if (btn.dataset.dryAct === "copy" && navigator.clipboard) {
    navigator.clipboard.writeText(dryCard()).then(() => {
      if (status) status.textContent = "Passport card copied.";
    }).catch(() => {
      if (status) status.textContent = "Copy blocked — select the preview.";
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderAudit();
  renderLetter();
  renderDry();
  document.body.addEventListener("click", (e) => {
    handleAudit(e);
    handleLetter(e);
    handleDry(e);
  });
});
