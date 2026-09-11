const DUSK = { sat: "lynxlogix.saturday.line.v1" };

function parseIso(value) {
  const t = Date.parse(value);
  return Number.isFinite(t) ? t : null;
}

function clockRows(state) {
  const log = Array.isArray(state.log) ? state.log : [];
  return log.map((line) => {
    const text = String(line);
    const iso = text.slice(0, 24);
    const at = parseIso(iso);
    const kind = text.includes(" APPROVE ") ? "approve"
      : text.includes(" REJECT ") ? "reject"
      : text.includes(" HOLD ") ? "hold"
      : text.includes(" BLOCK ") ? "block"
      : text.includes(" INBOX ") ? "inbox"
      : text.includes(" CLOSE ") || text.includes(" KILL ") ? "close"
      : "note";
    return { text, at, kind };
  });
}

function clockCard() {
  const state = typeof loadDesk === "function" ? loadDesk() : { log: [], signals: [], closed: false };
  const rows = clockRows(state);
  const decided = rows.filter((r) => r.at && ["approve", "reject", "hold", "block"].includes(r.kind));
  const first = decided.length ? decided[decided.length - 1].at : null;
  const last = decided.length ? decided[0].at : null;
  const spanMin = first && last ? Math.max(0, Math.round((last - first) / 60000)) : 0;
  return [
    "LYNXLOGIX.NET — DECISION CLOCK",
    "exportedAt: " + new Date().toISOString(),
    "executed: false",
    "human decisions timed: " + decided.length,
    "session span minutes: " + spanMin,
    "deskClosed: " + !!state.closed,
    "law: latency is process, not alpha."
  ].join("\n");
}

function renderClock() {
  const stats = document.querySelector("[data-clock-stats]");
  const logRoot = document.querySelector("[data-clock-log]");
  if (!stats && !logRoot) return;
  const state = typeof loadDesk === "function" ? loadDesk() : { log: [], signals: [] };
  const rows = clockRows(state);
  const decided = rows.filter((r) => ["approve", "reject", "hold", "block"].includes(r.kind));
  const first = decided.filter((r) => r.at).slice(-1)[0];
  const last = decided.filter((r) => r.at)[0];
  const span = first && last && first.at && last.at ? Math.max(0, Math.round((last.at - first.at) / 60000)) : 0;
  if (stats) {
    stats.innerHTML = [
      ["Timed decisions", String(decided.length), "Approve, reject, hold, block."],
      ["Session span", span + " min", "First timed act to last."],
      ["Still awaiting", String((state.signals || []).filter((s) => String(s.status || "").includes("awaiting")).length), "The gate still owes a sentence."]
    ].map((c) => `<article class="card"><div class="tiny">${c[0]}</div><p class="stat">${c[1]}</p><p class="muted">${c[2]}</p></article>`).join("");
  }
  if (logRoot) {
    logRoot.innerHTML = rows.slice(0, 12).map((r) => `<article class="card ticket ${r.kind === "approve" ? "buy" : r.kind === "reject" || r.kind === "block" ? "sell" : "hold"}"><div class="tiny">${r.kind}</div><p class="note">${r.text}</p></article>`).join("") || "<p class='muted'>No timed lines yet. Decide one ticket on the desk.</p>";
  }
}

function handleClock(e) {
  const btn = e.target.closest("[data-clock]");
  if (!btn) return;
  const status = document.querySelector("[data-clock-status]");
  if (btn.dataset.clock === "refresh") {
    renderClock();
    if (status) status.textContent = "Clock recounted · executed: false.";
  }
  if (btn.dataset.clock === "copy") {
    const text = clockCard();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        if (status) status.textContent = "Clock card copied.";
      }).catch(() => {
        if (status) status.textContent = "Copy blocked — recount and select.";
      });
    }
  }
}

function renderSaturday() {
  const input = document.querySelector("[data-sat-line]");
  const status = document.querySelector("[data-sat-status]");
  if (!input) return;
  if (!input.dataset.bound) {
    input.value = localStorage.getItem(DUSK.sat) || "";
    input.dataset.bound = "1";
  }
  if (status && input.value.trim()) status.textContent = "Sentence stored on this browser.";
}

function handleSaturday(e) {
  const btn = e.target.closest("[data-sat]");
  if (!btn) return;
  const input = document.querySelector("[data-sat-line]");
  const status = document.querySelector("[data-sat-status]");
  if (btn.dataset.sat === "save" && input) {
    localStorage.setItem(DUSK.sat, input.value);
    if (status) status.textContent = input.value.trim() ? "Saturday sentence saved." : "Empty sentence stored — write one.";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderClock();
  renderSaturday();
  document.body.addEventListener("click", (e) => {
    handleClock(e);
    handleSaturday(e);
  });
});
