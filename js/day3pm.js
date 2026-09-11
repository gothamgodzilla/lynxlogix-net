const PM = {
  steward: "lynxlogix.steward.2026-09-11",
  night: "lynxlogix.nightline.v1"
};

const BLOCKS = [
  {
    id: "b1",
    title: "Witness the book",
    mins: "40 min",
    href: "witness.html",
    doneWhen: "Witness JSON exists with executed: false"
  },
  {
    id: "b2",
    title: "Send the cathedral",
    mins: "25 min",
    href: "https://www.mangasm.app/plus",
    doneWhen: "One real person received Mangasm+"
  },
  {
    id: "b3",
    title: "Honest book",
    mins: "25 min",
    href: "owner.html",
    doneWhen: "One proven sentence written — zero is allowed"
  }
];

function loadMarks() {
  try {
    return JSON.parse(localStorage.getItem(PM.steward) || "{}");
  } catch (_) {
    return {};
  }
}

function saveMarks(marks) {
  localStorage.setItem(PM.steward, JSON.stringify(marks));
}

function renderSteward() {
  const root = document.querySelector("[data-steward-blocks]");
  if (!root) return;
  const marks = loadMarks();
  root.innerHTML = BLOCKS.map((b) => {
    const on = !!marks[b.id];
    return `<article class="card">
      <div class="tiny">${b.mins} · ${on ? "marked done" : "open"}</div>
      <h3>${b.title}</h3>
      <p class="muted">${b.doneWhen}</p>
      <div class="row" style="margin-top:14px">
        <a class="btn" href="${b.href}">${on ? "Reopen" : "Start"}</a>
        <button class="btn ${on ? "ghost" : "solid"}" data-steward-mark="${b.id}">${on ? "Unmark" : "Mark done"}</button>
      </div>
    </article>`;
  }).join("");
  const stamp = document.querySelector("[data-steward-stamp]");
  if (stamp) {
    const n = BLOCKS.filter((b) => marks[b.id]).length;
    stamp.textContent = n + " of 3 blocks marked · local only · no exchange.";
  }
}

function handleSteward(e) {
  const reset = e.target.closest("[data-steward='reset']");
  if (reset) {
    localStorage.removeItem(PM.steward);
    renderSteward();
    return;
  }
  const mark = e.target.closest("[data-steward-mark]");
  if (!mark) return;
  const marks = loadMarks();
  const id = mark.dataset.stewardMark;
  marks[id] = !marks[id];
  saveMarks(marks);
  renderSteward();
}

function nightPage() {
  const state = typeof loadDesk === "function" ? loadDesk() : { signals: [], log: [], closed: false };
  const s = typeof scoreDesk === "function" ? scoreDesk(state) : {};
  const line = (document.querySelector("[data-night-line]") || {}).value || localStorage.getItem(PM.night) || "(no proven sentence yet)";
  return [
    "LYNXLOGIX.NET — NIGHT LEDGER",
    "date: Friday 11 September 2026",
    "exportedAt: " + new Date().toISOString(),
    "executed: false",
    "version: A · Signal Concierge · paper",
    "deskClosed: " + !!state.closed,
    "tickets: " + (s.tickets || 0),
    "awaiting human: " + (s.awaiting || 0),
    "paper approved: " + (s.approved || 0),
    "rejected: " + (s.rejected || 0),
    "human decisions: " + (s.decisions || 0),
    "open paper %: " + (typeof s.openPct === "number" ? s.openPct.toFixed(2) : "0.00"),
    "proven this month:",
    line.trim(),
    "law: signals may be automatic; money may not.",
    "sales door: https://www.mangasm.app/plus",
    "this desk does not sell coins."
  ].join("\n");
}

function renderNight() {
  const input = document.querySelector("[data-night-line]");
  const preview = document.querySelector("[data-night-preview]");
  if (input && !input.dataset.bound) {
    input.value = localStorage.getItem(PM.night) || "";
    input.dataset.bound = "1";
    input.addEventListener("input", () => localStorage.setItem(PM.night, input.value));
  }
  if (preview) preview.textContent = nightPage();
}

function handleNight(e) {
  const btn = e.target.closest("[data-night]");
  if (!btn) return;
  const status = document.querySelector("[data-night-status]");
  if (btn.dataset.night === "compose") {
    renderNight();
    if (status) status.textContent = "Night page composed · executed: false.";
  }
  if (btn.dataset.night === "copy") {
    const text = nightPage();
    renderNight();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        if (status) status.textContent = "Night page copied.";
      }).catch(() => {
        if (status) status.textContent = "Copy blocked — select the preview.";
      });
    }
  }
  if (btn.dataset.night === "print") {
    renderNight();
    window.print();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderSteward();
  renderNight();
  document.body.addEventListener("click", (e) => {
    handleSteward(e);
    handleNight(e);
  });
});
