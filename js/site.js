const STORE = { key: "lynxlogix.pass.v1", desk: "lynxlogix.desk.v2" };

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
    { id: "TV-0910-A", source: "TradingView webhook (paper)", pair: "BTC-USD", side: "buy", venue: "Coinbase Advanced", size: "0.25%", reason: "4h close above range + volume expansion. Not a guarantee.", risk: "Stop conceptually 1.4R under signal bar. Cap 0.25% equity.", status: "awaiting human" },
    { id: "CH-0910-B", source: "CryptoHopper-style script flag (paper)", pair: "ETH-USD", side: "hold", venue: "Kraken", size: "0%", reason: "Script fired, Grok risk desk vetoed: funding crowded, spread wide.", risk: "No ticket. Log only.", status: "vetoed by risk bot" },
    { id: "PH-0910-C", source: "Phantom watchlist (read-only)", pair: "SOL-USD", side: "sell", venue: "Kraken / Phantom (watch)", size: "trim 10% paper", reason: "Mean-reversion after extension. Human must confirm before any live wallet action.", risk: "Never auto-sign a wallet. Seed phrases never enter this system.", status: "awaiting human" }
  ];
}

function loadDesk() {
  const raw = localStorage.getItem(STORE.desk);
  if (raw) return JSON.parse(raw);
  const seed = { signals: seedSignals(), log: [] };
  localStorage.setItem(STORE.desk, JSON.stringify(seed));
  return seed;
}
function saveDesk(state) {
  localStorage.setItem(STORE.desk, JSON.stringify(state));
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

function renderDesk() {
  const root = document.querySelector("[data-desk]");
  if (!root) return;
  const state = loadDesk();
  root.innerHTML = state.signals.map((s) => `
    <article class="card ticket ${s.side}">
      <div class="tiny">${s.id} · ${s.source}</div>
      <h3>${String(s.side || "hold").toUpperCase()} ${s.pair}</h3>
      <p class="muted">${s.reason || ""}</p>
      <p class="note">${s.venue || "paper"} · size ${s.size || "n/a"}${s.price ? " · " + s.price : ""}<br>${s.risk || ""}</p>
      <p class="tiny">${s.status}</p>
      <div class="row" style="margin-top:14px">
        <button class="btn solid" data-act="approve" data-id="${s.id}">Approve paper ticket</button>
        <button class="btn" data-act="reject" data-id="${s.id}">Reject</button>
        <button class="btn ghost" data-act="note" data-id="${s.id}">Hold for later</button>
      </div>
    </article>
  `).join("") + `
    <article class="card">
      <div class="tiny">Human ledger</div>
      <h3>Decisions</h3>
      <div>${state.log.length ? state.log.slice(0, 20).map((l) => `<p class="note">${l}</p>`).join("") : "<p class='muted'>No decisions yet.</p>"}</div>
    </article>
  `;
}

function handleDeskClick(e) {
  const btn = e.target.closest("[data-act]");
  if (!btn) return;
  const state = loadDesk();
  const sig = state.signals.find((s) => s.id === btn.dataset.id);
  if (!sig) return;
  const stamp = new Date().toISOString();
  const act = btn.dataset.act;
  if (act === "approve") {
    sig.status = "approved — paper only";
    state.log.unshift(stamp + " APPROVE " + sig.id + " " + sig.side + " " + sig.pair + " — no live order routed.");
  } else if (act === "reject") {
    sig.status = "rejected by human";
    state.log.unshift(stamp + " REJECT " + sig.id);
  } else {
    sig.status = "held";
    state.log.unshift(stamp + " HOLD " + sig.id);
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
