(function () {
  const KEY = "llx.day4.dusk";
  const state = JSON.parse(localStorage.getItem(KEY) || "{}");
  const banned = /\b(btc|eth|sol|xbt|usdt|10x|return|coinbase|kraken|phantom|hopper)\b/i;

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  const desk = document.querySelector("[data-dusk-desk]");
  const sales = document.querySelector("[data-dusk-sales]");
  const bots = document.querySelector("[data-dusk-bots]");
  const duskPhrase = document.querySelector("[data-dusk-phrase]");
  const duskOut = document.querySelector("[data-dusk-out]");
  const duskStatus = document.querySelector("[data-dusk-status]");
  if (desk && state.desk) desk.value = state.desk;
  if (sales && state.sales) sales.value = state.sales;
  if (bots && state.bots) bots.value = state.bots;
  if (duskOut && state.duskText) duskOut.textContent = state.duskText;
  if (duskStatus && state.duskSealed) {
    duskStatus.textContent = "Dusk book sealed. executed: false. No second ticket.";
  }
  const duskBtn = document.querySelector("[data-dusk-seal]");
  if (duskBtn) {
    duskBtn.addEventListener("click", function () {
      const d = desk ? desk.value.trim() : "";
      const s = sales ? sales.value.trim() : "";
      const b = bots ? bots.value.trim() : "";
      const gate = duskPhrase ? duskPhrase.value.trim().toUpperCase() : "";
      if (gate !== "DUSK THE BOOK") {
        if (duskStatus) duskStatus.textContent = "Type DUSK THE BOOK.";
        return;
      }
      if (!d || !s || !b) {
        if (duskStatus) duskStatus.textContent = "Three lines. Desk, sales, bots.";
        return;
      }
      if (banned.test(d + " " + s + " " + b)) {
        if (duskStatus) duskStatus.textContent = "Void. Remove pairs, venues, and return claims.";
        return;
      }
      const book = [
        "LYNXLOGIX.NET · DUSK AFTER-ACTION",
        "Saturday 12 September 2026 · 13:00 PDT",
        "desk: " + d,
        "sales: " + s,
        "bots: " + b,
        "venues: unread",
        "second ticket: refused",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.desk = d;
      state.sales = s;
      state.bots = b;
      state.duskText = book;
      state.duskSealed = true;
      state.duskAt = new Date().toISOString();
      save();
      if (duskOut) duskOut.textContent = book;
      if (duskStatus) duskStatus.textContent = "Sealed. Carry to /witness.html. Do not reopen the tape.";
    });
  }

  const ask = document.querySelector("[data-open-ask]");
  const openPhrase = document.querySelector("[data-open-phrase]");
  const openOut = document.querySelector("[data-open-out]");
  const openStatus = document.querySelector("[data-open-status]");
  if (ask && state.ask) ask.value = state.ask;
  if (openOut && state.openText) openOut.textContent = state.openText;
  if (openStatus && state.openSealed) {
    openStatus.textContent = "Prompt sealed. Keep the house. No third repo.";
  }
  const openBtn = document.querySelector("[data-open-seal]");
  if (openBtn) {
    openBtn.addEventListener("click", function () {
      const q = ask ? ask.value.trim() : "";
      const gate = openPhrase ? openPhrase.value.trim().toUpperCase() : "";
      if (gate !== "KEEP THE HOUSE") {
        if (openStatus) openStatus.textContent = "Type KEEP THE HOUSE.";
        return;
      }
      if (!q) {
        if (openStatus) openStatus.textContent = "Write the next invention first.";
        return;
      }
      if (banned.test(q) || /live key|api secret|auto-?execut|seed phrase/i.test(q)) {
        if (openStatus) openStatus.textContent = "Void. Live routing and secrets are refused.";
        return;
      }
      const prompt = [
        "SUPERCLAUDE / OPENCODE · HOUSE CONSTRAINTS",
        "Repos: gothamgodzilla/lynxlogix-net and gothamgodzilla/house-landings only.",
        "Team: GothamGanesh Vercel. Do not create a new landing repository.",
        "Law: signals may be automatic; money may not.",
        "Running version: A — Signal Concierge. B and C stay paper architecture.",
        "Sales door: https://www.mangasm.app/plus and /pay.html",
        "Do not wire Coinbase Advanced, Kraken AddOrder, Hopper live bots, or Phantom signing.",
        "Do not publish planning MAR/ARR as proven cash.",
        "Invent three designs that upgrade existing pages.",
        "Ask: " + q,
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.ask = q;
      state.openText = prompt;
      state.openSealed = true;
      state.openAt = new Date().toISOString();
      save();
      if (openOut) openOut.textContent = prompt;
      if (openStatus) openStatus.textContent = "Sealed. Paste into SuperClaude / OpenCode. Do not leave the house.";
    });
  }

  const who = document.querySelector("[data-hour-who]");
  const note = document.querySelector("[data-hour-note]");
  const hourOut = document.querySelector("[data-hour-out]");
  const hourStatus = document.querySelector("[data-hour-status]");
  if (who && state.hourWho) who.value = state.hourWho;
  if (note && state.hourNote) note.value = state.hourNote;
  if (hourOut && state.hourText) hourOut.textContent = state.hourText;
  if (hourStatus && state.hourSealed) {
    hourStatus.textContent = "Hour reserved for " + state.hourWho + ". Cap is one.";
  }
  const hourBtn = document.querySelector("[data-hour-seal]");
  if (hourBtn) {
    hourBtn.addEventListener("click", function () {
      const name = who ? who.value.trim() : "";
      const line = note ? note.value.trim() : "";
      if (!name) {
        if (hourStatus) hourStatus.textContent = "Name the patron or write self rehearsal.";
        return;
      }
      if (banned.test(name + " " + line)) {
        if (hourStatus) hourStatus.textContent = "Void. Remove tickers, venues, and return claims.";
        return;
      }
      if (state.hourSealed) {
        if (hourStatus) hourStatus.textContent = "Saturday cap: one hour. Do not book a second.";
        return;
      }
      const invite = [
        name + ",",
        "",
        "One hour. No chart.",
        line || "The piano is not a casino. The living product is the rebuild.",
        "",
        "If you want the home: https://www.mangasm.app/plus",
        "If you want the desk: https://lynxlogix-net.vercel.app/",
        "",
        "- LynxLogix / Mangasm Enterprises"
      ].join("\n");
      state.hourWho = name;
      state.hourNote = line;
      state.hourText = invite;
      state.hourSealed = true;
      state.hourAt = new Date().toISOString();
      save();
      if (hourOut) hourOut.textContent = invite;
      if (hourStatus) hourStatus.textContent = "Reserved. Send from /contact.html. Do not attach a market.";
    });
  }
})();
