(function () {
  const KEY = "llx.day4.pm2";
  const state = JSON.parse(localStorage.getItem(KEY) || "{}");
  const banned = /\b(btc|eth|sol|xbt|usdt|10x|return|coinbase|kraken|phantom|hopper)\b/i;

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  const tickets = document.querySelector("[data-seal-tickets]");
  const doors = document.querySelector("[data-seal-doors]");
  const next = document.querySelector("[data-seal-next]");
  const sealPhrase = document.querySelector("[data-seal-phrase]");
  const sealOut = document.querySelector("[data-seal-out]");
  const sealStatus = document.querySelector("[data-seal-status]");
  if (tickets && state.tickets) tickets.value = state.tickets;
  if (doors && state.doors) doors.value = state.doors;
  if (next && state.next) next.value = state.next;
  if (sealOut && state.sealText) sealOut.textContent = state.sealText;
  if (sealStatus && state.sealSealed) {
    sealStatus.textContent = "Saturday sealed. executed: false. No second ticket.";
  }
  const sealBtn = document.querySelector("[data-seal-btn]");
  if (sealBtn) {
    sealBtn.addEventListener("click", function () {
      const t = tickets ? tickets.value.trim() : "";
      const d = doors ? doors.value.trim() : "";
      const n = next ? next.value.trim() : "";
      const gate = sealPhrase ? sealPhrase.value.trim().toUpperCase() : "";
      if (gate !== "SEAL SATURDAY") {
        if (sealStatus) sealStatus.textContent = "Type SEAL SATURDAY.";
        return;
      }
      if (!t || !d || !n) {
        if (sealStatus) sealStatus.textContent = "Three facts. Tickets, doors, Monday.";
        return;
      }
      if (banned.test(t + " " + d + " " + n)) {
        if (sealStatus) sealStatus.textContent = "Void. Remove pairs, venues, and return claims.";
        return;
      }
      const book = [
        "LYNXLOGIX.NET · SATURDAY SEAL",
        "Saturday 12 September 2026 · 14:15 PDT",
        "tickets: " + t,
        "doors: " + d,
        "monday inherits: " + n,
        "version: A running · B/C paper",
        "second ticket: refused",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.tickets = t;
      state.doors = d;
      state.next = n;
      state.sealText = book;
      state.sealSealed = true;
      state.sealAt = new Date().toISOString();
      save();
      if (sealOut) sealOut.textContent = book;
      if (sealStatus) sealStatus.textContent = "Sealed. Carry to /witness.html. Do not fire another ticket.";
    });
  }

  const who = document.querySelector("[data-sales-who]");
  const why = document.querySelector("[data-sales-why]");
  const salesPhrase = document.querySelector("[data-sales-phrase]");
  const salesOut = document.querySelector("[data-sales-out]");
  const salesStatus = document.querySelector("[data-sales-status]");
  if (who && state.salesWho) who.value = state.salesWho;
  if (why && state.salesWhy) why.value = state.salesWhy;
  if (salesOut && state.salesText) salesOut.textContent = state.salesText;
  if (salesStatus && state.salesSealed) {
    salesStatus.textContent = "Brief sealed for " + state.salesWho + ". Cap is one outbound.";
  }
  const salesBtn = document.querySelector("[data-sales-btn]");
  if (salesBtn) {
    salesBtn.addEventListener("click", function () {
      const name = who ? who.value.trim() : "";
      const line = why ? why.value.trim() : "";
      const gate = salesPhrase ? salesPhrase.value.trim().toUpperCase() : "";
      if (gate !== "SELL THE HOME") {
        if (salesStatus) salesStatus.textContent = "Type SELL THE HOME.";
        return;
      }
      if (!name || !line) {
        if (salesStatus) salesStatus.textContent = "Name the patron and write why the home.";
        return;
      }
      if (banned.test(name + " " + line)) {
        if (salesStatus) salesStatus.textContent = "Void. Remove tickers, venues, and return claims.";
        return;
      }
      if (state.salesSealed) {
        if (salesStatus) salesStatus.textContent = "Saturday cap: one outbound. Send it or stop.";
        return;
      }
      const note = [
        name + ",",
        "",
        line,
        "",
        "The desk does not sell coins. The living product is the rebuild.",
        "Mangasm+: https://www.mangasm.app/plus",
        "House pass: https://lynxlogix-net.vercel.app/pay.html",
        "Owner book: https://lynxlogix-net.vercel.app/owner.html",
        "",
        "- LynxLogix / Mangasm Enterprises"
      ].join("\n");
      state.salesWho = name;
      state.salesWhy = line;
      state.salesText = note;
      state.salesSealed = true;
      state.salesAt = new Date().toISOString();
      save();
      if (salesOut) salesOut.textContent = note;
      if (salesStatus) salesStatus.textContent = "Sealed. Send from /contact.html. Do not attach a market.";
    });
  }

  const paper = document.querySelector("[data-ready-paper]");
  const kill = document.querySelector("[data-ready-kill]");
  const worker = document.querySelector("[data-ready-worker]");
  const dark = document.querySelector("[data-ready-dark]");
  const readyPhrase = document.querySelector("[data-ready-phrase]");
  const readyOut = document.querySelector("[data-ready-out]");
  const readyStatus = document.querySelector("[data-ready-status]");
  if (paper) paper.checked = !!state.paperDays;
  if (kill) kill.checked = !!state.killWorks;
  if (worker) worker.checked = !!state.privateWorker;
  if (dark) dark.checked = !!state.keysDark;
  if (readyOut && state.readyText) readyOut.textContent = state.readyText;
  if (readyStatus && state.readySealed) {
    readyStatus.textContent = state.readyOpen
      ? "Card stamped. Version B is still architecture until a private worker exists."
      : "Card stamped. Version B stays closed.";
  }
  const readyBtn = document.querySelector("[data-ready-btn]");
  if (readyBtn) {
    readyBtn.addEventListener("click", function () {
      const gate = readyPhrase ? readyPhrase.value.trim().toUpperCase() : "";
      if (gate !== "KEYS STAY DARK") {
        if (readyStatus) readyStatus.textContent = "Type KEYS STAY DARK.";
        return;
      }
      const flags = {
        paperDays: !!(paper && paper.checked),
        killWorks: !!(kill && kill.checked),
        privateWorker: !!(worker && worker.checked),
        keysDark: !!(dark && dark.checked)
      };
      const open = flags.paperDays && flags.killWorks && flags.privateWorker && flags.keysDark;
      const card = [
        "LYNXLOGIX.NET · VENUE READINESS",
        "Saturday 12 September 2026 · 14:15 PDT",
        "30 paper days: " + flags.paperDays,
        "daily close works: " + flags.killWorks,
        "private worker off-site: " + flags.privateWorker,
        "secrets absent from this site: " + flags.keysDark,
        "version B open: " + open,
        "coinbase / kraken / phantom: unread on this site",
        "executed: false",
        "stamped: " + new Date().toISOString()
      ].join("\n");
      state.paperDays = flags.paperDays;
      state.killWorks = flags.killWorks;
      state.privateWorker = flags.privateWorker;
      state.keysDark = flags.keysDark;
      state.readyOpen = open;
      state.readyText = card;
      state.readySealed = true;
      state.readyAt = new Date().toISOString();
      save();
      if (readyOut) readyOut.textContent = card;
      if (readyStatus) {
        readyStatus.textContent = open
          ? "All boxes true — still do not paste keys here. Version B lives in a private worker only."
          : "Version B stays closed. Keep Version A. Keys stay dark.";
      }
    });
  }
})();
