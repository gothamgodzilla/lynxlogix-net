const STORE = { key: "lynxlogix.pass.v1", desk: "lynxlogix.desk.v3", phrase: "lynxlogix.phrase.v1" };

function hasPass() {
  return localStorage.getItem(STORE.key) === "patron" || localStorage.getItem(STORE.key) === "desk";
}
function setPass(level) {
  localStorage.setItem(STORE.key, level);
  renderLocks();
}
function renderLocks() {
  const unlocked = hasPass();
  document.querySelectorAll("[data-lock]").forEach((el) => {
    el.classList.toggle("is-open", unlocked);
    const veil = el.querySelector(".veil");
    if (veil) veil.style.display = unlocked ? "none" : "flex";
  });
  const badge = document.querySelector("[data-pass-badge]");
  if (badge) badge.textContent = unlocked ? "Pass active" : "Gallery view";
}

function seedSignals() {
  return [
    { id: "TV-0911-A", source: "TradingView webhook (paper)", pair: "BTC-USD", side: "buy", venue: "Coinbase Advanced", size: "0.25%", reason: "4h close above range + volume expansion. Not a guarantee.", risk: "Stop conceptually 1.4R under signal bar. Cap 0.25% equity.", status: "awaiting human" },
    { id: "CH-0911-B", source: "CryptoHopper-style script flag (paper)", pair: "ETH-USD", side: "hold", venue: "Kraken", size: "0%", reason: "Script fired, Grok risk desk vetoed: funding crowded, spread wide.", risk: "No ticket. Log only.", status: "vetoed by risk bot" },
    { id: "PH-0911-C", source: "Phantom watchlist (read-only)", pair: "SOL-USD", side: "sell", venue: "Kraken / Phantom (watch)", size: "0.25%", reason: "Mean-reversion after extension. Human must confirm before any live wallet action.", risk: "Never auto-sign a wallet. Seed phrases never enter this system.", status: "awaiting human" }
  ];
}

function composeBrief(sig) {
  const pair = String(sig.pair || "UNKNOWN");
  const side = String(sig.side || "hold").toLowerCase();
  const source = String(sig.source || "").toLowerCase();
  let weather = "range";
  if (source.includes("hopper") || side === "hold") weather = "crowded / veto-leaning";
  else if (side === "buy") weather = "trend attempt";
  else if (side === "sell") weather = "extension / mean-revert";
  const devil =
    side === "buy"
      ? "Breakouts fail in quiet tape. A 4h close can be a stop hunt. If you cannot name invalidation in one sentence, this is fashion."
      : side === "sell"
        ? "Extensions can extend. Selling strength because it looks expensive is how books get run over. Watch-only wallets are not exits."
        : "A hold that still occupies attention is a hidden position. If risk vetoed it, do not dress it as patience.";
  return {
    regime: "Regime: " + weather + " on " + pair + ". Size stays a percent of equity.",
    devil: "Devil: " + devil,
    liaison: "Liaison: after you decide, the living product is Mangasm+ — not a coin."
  };
}

function loadDesk() {
  const raw = localStorage.getItem(STORE.desk);
  if (raw) {
    const parsed = JSON.parse(raw);
    if (typeof parsed.closed !== "boolean") parsed.closed = false;
    if (!Array.isArray(parsed.log)) parsed.log = [];
    if (!Array.isArray(parsed.signals)) parsed.signals = seedSignals();
    return parsed;
  }
  const seed = { signals: seedSignals(), log: [], closed: false };
  localStorage.setItem(STORE.desk, JSON.stringify(seed));
  return seed;
}
function saveDesk(state) {
  localStorage.setItem(STORE.desk, JSON.stringify(state));
}

function parseSize(size) {
  const n = parseFloat(String(size || "0").replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function paperOpenPct(state) {
  return state.signals
    .filter((s) => String(s.status || "").startsWith("approved"))
    .reduce((sum, s) => sum + parseSize(s.size), 0);
}

function phraseOk() {
  const input = document.querySelector("[data-phrase]");
  const typed = input ? String(input.value || "").trim().toUpperCase() : String(sessionStorage.getItem(STORE.phrase) || "").toUpperCase();
  return typed === "PAPER ONLY";
}

function renderPhrase() {
  const input = document.querySelector("[data-phrase]");
  const status = document.querySelector("[data-phrase-status]");
  if (!input || !status) return;
  if (!input.dataset.bound) {
    input.value = sessionStorage.getItem(STORE.phrase) || "";
    input.dataset.bound = "1";
    input.addEventListener("input", () => {
      sessionStorage.setItem(STORE.phrase, input.value);
      renderPhrase();
    });
  }
  status.textContent = phraseOk() ? "Phrase accepted — paper approvals allowed." : "Phrase empty or wrong — type PAPER ONLY.";
}

function showHallway() {
  const el = document.querySelector("[data-hallway]");
  if (el) el.style.display = "block";
}

function renderRisk(state) {
  const openEl = document.querySelector("[data-risk-open]");
  const note = document.querySelector("[data-risk-note]");
  const title = document.querySelector("[data-desk-state]");
  if (!openEl && !title) return;
  const open = paperOpenPct(state);
  if (openEl) openEl.textContent = open.toFixed(2) + "%";
  if (title) title.textContent = state.closed ? "Desk closed" : "Desk open";
  if (note) {
    if (state.closed) note.textContent = "Kill switch on. Approvals blocked. Signals still journal.";
    else if (open >= 3) note.textContent = "Open paper book at cap. Reject or hold until something clears.";
    else note.textContent = "Desk open. Per-ticket cap 1.00%. Book cap 3.00%.";
  }
}

function mergeInbox(remote) {
  if (!Array.isArray(remote) || !remote.length) return;
  const state = loadDesk();
  const have = new Set(state.signals.map((s) => s.id));
  let added = 0;
  remote.forEach((ticket) => {
    if (!ticket || !ticket.id || have.has(ticket.id)) return;
    state.signals.unshift(ticket);
    have.add(ticket.id);
    added += 1;
    state.log.unshift((ticket.receivedAt || new Date().toISOString()) + " INBOX " + ticket.id + " " + ticket.side + " " + ticket.pair);
  });
  if (added) saveDesk(state);
}

async function pollInbox() {
  const status = document.querySelector("[data-fire-status]");
  try {
    const res = await fetch("/api/signals", { cache: "no-store" });
    if (!res.ok) throw new Error("signals " + res.status);
    const data = await res.json();
    mergeInbox(data.signals || []);
    renderDesk();
    if (status && status.dataset.hold !== "1") status.textContent = "Inbox " + (data.count || 0) + " warm";
  } catch (_) {
    if (status && status.dataset.hold !== "1") status.textContent = "Inbox unreachable — local ledger only";
  }
}

function exportLedger() {
  const state = loadDesk();
  const blob = new Blob([JSON.stringify({
    exportedAt: new Date().toISOString(),
    paper: true,
    executed: false,
    openPaperPct: paperOpenPct(state),
    deskClosed: state.closed,
    phraseGate: "PAPER ONLY required",
    signals: state.signals,
    log: state.log
  }, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "lynxlogix-paper-ledger.json";
  a.click();
  URL.revokeObjectURL(a.href);
}

function resetLedger() {
  if (!confirm("Reset the local paper book on this browser? This does not touch any exchange.")) return;
  localStorage.removeItem(STORE.desk);
  renderDesk();
}

function renderDesk() {
  const root = document.querySelector("[data-desk]");
  const state = loadDesk();
  renderRisk(state);
  renderPhrase();
  if (!root) return;
  root.innerHTML = state.signals.map((s) => {
    const brief = composeBrief(s);
    return `
    <article class="card ticket ${s.side}">
      <div class="tiny">${s.id} · ${s.source}</div>
      <h3>${String(s.side || "hold").toUpperCase()} ${s.pair}</h3>
      <p class="muted">${s.reason || ""}</p>
      <p class="note">${brief.regime}<br>${brief.devil}<br>${brief.liaison}</p>
      <p class="note">${s.venue || "paper"} · size ${s.size || "n/a"}${s.price ? " · " + s.price : ""}<br>${s.risk || ""}</p>
      <p class="tiny">${s.status}</p>
      <div class="row" style="margin-top:14px">
        <button class="btn solid" data-act="approve" data-id="${s.id}">Approve paper ticket</button>
        <button class="btn" data-act="reject" data-id="${s.id}">Reject</button>
        <button class="btn ghost" data-act="note" data-id="${s.id}">Hold for later</button>
      </div>
    </article>
  `;
  }).join("") + `
    <article class="card">
      <div class="tiny">Human ledger</div>
      <h3>Decisions</h3>
      <div>${state.log.length ? state.log.slice(0, 20).map((l) => `<p class="note">${l}</p>`).join("") : "<p class='muted'>No decisions yet.</p>"}</div>
    </article>
  `;
}

function handleDeskClick(e) {
  const ledger = e.target.closest("[data-ledger]");
  if (ledger) {
    if (ledger.dataset.ledger === "export") exportLedger();
    if (ledger.dataset.ledger === "reset") resetLedger();
    return;
  }
  const kill = e.target.closest("[data-kill]");
  if (kill) {
    const state = loadDesk();
    state.closed = kill.dataset.kill === "close";
    state.log.unshift(new Date().toISOString() + (state.closed ? " KILL desk closed" : " OPEN desk reopened"));
    saveDesk(state);
    renderDesk();
    return;
  }
  const btn = e.target.closest("[data-act]");
  if (!btn) return;
  const state = loadDesk();
  const sig = state.signals.find((s) => s.id === btn.dataset.id);
  if (!sig) return;
  const stamp = new Date().toISOString();
  const act = btn.dataset.act;
  if (act === "approve") {
    if (!phraseOk()) {
      sig.status = "blocked — type PAPER ONLY";
      state.log.unshift(stamp + " BLOCK " + sig.id + " dual-phrase gate");
    } else if (state.closed) {
      sig.status = "blocked — desk closed";
      state.log.unshift(stamp + " BLOCK " + sig.id + " desk closed — would-have only");
    } else if (parseSize(sig.size) > 1) {
      sig.status = "blocked — size over 1%";
      state.log.unshift(stamp + " BLOCK " + sig.id + " size cap");
    } else if (paperOpenPct(state) + parseSize(sig.size) > 3.01 && !String(sig.status).startsWith("approved")) {
      sig.status = "blocked — book cap";
      state.log.unshift(stamp + " BLOCK " + sig.id + " 3% book cap");
    } else {
      sig.status = "approved — paper only";
      state.log.unshift(stamp + " APPROVE " + sig.id + " " + sig.side + " " + sig.pair + " — no live order routed.");
    }
    showHallway();
  } else if (act === "reject") {
    sig.status = "rejected by human";
    state.log.unshift(stamp + " REJECT " + sig.id);
    showHallway();
  } else {
    sig.status = "held";
    state.log.unshift(stamp + " HOLD " + sig.id);
    showHallway();
  }
  saveDesk(state);
  renderDesk();
}

async function handleFire(e) {
  const form = e.target.closest("[data-fire]");
  if (!form || e.type !== "submit") return;
  e.preventDefault();
  const status = document.querySelector("[data-fire-status]");
  const data = Object.fromEntries(new FormData(form).entries());
  if (status) {
    status.dataset.hold = "1";
    status.textContent = "Posting…";
  }
  try {
    const res = await fetch("/api/hook?key=" + encodeURIComponent(data.key || "paper"), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        source: "desk-test",
        pair: data.pair,
        side: data.side,
        comment: data.comment
      })
    });
    const json = await res.json();
    if (!res.ok || !json.ok) throw new Error(json.error || res.status);
    mergeInbox([json.ticket]);
    renderDesk();
    if (status) status.textContent = "Landed " + json.ticket.id + " · paper · not executed";
  } catch (err) {
    if (status) status.textContent = "Hook failed: " + err.message;
  } finally {
    if (status) setTimeout(() => { status.dataset.hold = "0"; }, 4000);
  }
}

function handlePay(e) {
  const btn = e.target.closest("[data-pay]");
  if (!btn) return;
  if (btn.dataset.pay === "mangasm") {
    window.open("https://www.mangasm.app/plus", "_blank", "noopener");
    return;
  }
  if (btn.dataset.pay === "demo-unlock") {
    setPass(btn.dataset.level || "patron");
    alert("Local pass granted on this browser. Connect a Stripe Payment Link before taking real money.");
    return;
  }
  if (btn.dataset.href) window.open(btn.dataset.href, "_blank", "noopener");
}

function handleContact(e) {
  const form = e.target.closest("[data-contact]");
  if (!form || e.type !== "submit") return;
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  const box = JSON.parse(localStorage.getItem("lynxlogix.mail") || "[]");
  box.unshift(Object.assign({}, data, { at: new Date().toISOString() }));
  localStorage.setItem("lynxlogix.mail", JSON.stringify(box));
  const subject = encodeURIComponent("LynxLogix — " + (data.intent || "note"));
  const body = encodeURIComponent(data.name + "\n" + data.email + "\n\n" + data.message);
  window.location.href = "mailto:hello@lynxlogix.net?subject=" + subject + "&body=" + body;
  form.reset();
}

document.addEventListener("DOMContentLoaded", () => {
  renderLocks();
  renderDesk();
  pollInbox();
  setInterval(pollInbox, 15000);
  document.body.addEventListener("click", (e) => {
    handleDeskClick(e);
    handlePay(e);
  });
  document.body.addEventListener("submit", (e) => {
    handleFire(e);
    handleContact(e);
  });
});
