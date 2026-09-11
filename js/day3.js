function venueBook() {
  return [
    { name: "Coinbase Advanced", role: "Spot book · paper adapter", status: "read-only / paper", law: "May label a pair and a side. May not call Create Order. Keys never live in this repo." },
    { name: "Kraken", role: "Spot / funding weather", status: "read-only / paper", law: "May inform the risk veto. May not AddOrder. Withdrawals are unthinkable here." },
    { name: "Kraken Wallet", role: "Self-custody watch", status: "watch only", law: "A balance you can see is not a balance this site may move." },
    { name: "Phantom", role: "SOL watchlist", status: "watch only", law: "No seed field. No transaction signing. No deep link that spends." },
    { name: "TradingView", role: "Signal bell", status: "webhook ingest", law: "POST /api/hook. Alert in, ticket out. Never a fill." },
    { name: "CryptoHopper-style script", role: "Second machine", status: "flag only", law: "A script may recommend. Version C still requires the human key." }
  ];
}
function renderVenues() {
  const root = document.querySelector("[data-venues]");
  if (!root) return;
  root.innerHTML = venueBook().map((v) => `
    <article class="card">
      <div class="tiny">${v.status}</div>
      <h3>${v.name}</h3>
      <p class="muted">${v.role}</p>
      <p class="note">${v.law}</p>
    </article>
  `).join("");
}
function renderPacket() {
  const root = document.querySelector("[data-packet]");
  if (!root) return;
  const state = loadDesk();
  const open = paperOpenPct(state);
  const decided = state.log.slice(0, 12);
  const tickets = state.signals.slice(0, 8);
  root.innerHTML = `
    <article class="card">
      <div class="tiny">LynxLogix · weekly packet · paper</div>
      <h3>Week of 11 September 2026</h3>
      <p class="muted">Operator: Mark Webster · Mangasm Enterprises. Desk is a ritual, not a broker.</p>
      <table>
        <thead><tr><th>Line</th><th>Figure</th></tr></thead>
        <tbody>
          <tr><td>Open paper book</td><td>${open.toFixed(2)}% of equity</td></tr>
          <tr><td>Ticket cap</td><td>1.00%</td></tr>
          <tr><td>Book cap</td><td>3.00%</td></tr>
          <tr><td>Desk</td><td>${state.closed ? "closed" : "open"}</td></tr>
          <tr><td>Executed</td><td>false</td></tr>
          <tr><td>Live keys on this site</td><td>none</td></tr>
        </tbody>
      </table>
    </article>
    <article class="card" style="margin-top:18px">
      <div class="tiny">Tickets</div>
      <h3>What the machines offered</h3>
      ${tickets.map((s) => `<p class="note"><strong>${s.id}</strong> · ${String(s.side || "").toUpperCase()} ${s.pair} · ${s.status} · ${s.venue || "paper"}</p>`).join("") || "<p class='muted'>No tickets.</p>"}
    </article>
    <article class="card" style="margin-top:18px">
      <div class="tiny">Human ledger</div>
      <h3>What you decided</h3>
      ${decided.map((l) => `<p class="note">${l}</p>`).join("") || "<p class='muted'>No decisions yet. Open the desk first.</p>"}
    </article>
  `;
}
document.addEventListener("DOMContentLoaded", () => {
  renderVenues();
  renderPacket();
});
document.addEventListener("click", (e) => {
  if (e.target.closest("[data-print]")) window.print();
});
