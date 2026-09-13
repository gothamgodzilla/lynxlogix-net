(function () {
  const KEY = "llx.day5.mid";
  const state = JSON.parse(localStorage.getItem(KEY) || "{}");
  const banned = /\b(btc|eth|sol|xbt|usdt|10x|return|profit|addorder|private.key|seed|secret)\b/i;

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  const held = document.querySelector("[data-carry-held]");
  const tempt = document.querySelector("[data-carry-tempt]");
  const carryPhrase = document.querySelector("[data-carry-phrase]");
  const carryOut = document.querySelector("[data-carry-out]");
  const carryStatus = document.querySelector("[data-carry-status]");
  if (held && state.held) held.value = state.held;
  if (tempt && state.tempt) tempt.value = state.tempt;
  if (carryOut && state.carryText) carryOut.textContent = state.carryText;
  if (carryStatus && state.carrySealed) {
    carryStatus.textContent = "Sunday carry sealed. Do not reopen the till.";
  }
  const carryBtn = document.querySelector("[data-carry-btn]");
  if (carryBtn) {
    carryBtn.addEventListener("click", function () {
      const a = held ? held.value.trim() : "";
      const b = tempt ? tempt.value.trim() : "";
      const phrase = carryPhrase ? carryPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "CARRY THE HOUSE") {
        if (carryStatus) carryStatus.textContent = "Type CARRY THE HOUSE.";
        return;
      }
      if (!a || !b) {
        if (carryStatus) carryStatus.textContent = "Two lines. What is held. What must not reopen.";
        return;
      }
      if (banned.test(a + " " + b)) {
        if (carryStatus) carryStatus.textContent = "Void. The carry is rooms, not tickers.";
        return;
      }
      const book = [
        "LYNXLOGIX.NET · SUNDAY CARRY",
        "Sunday 13 September 2026 · 10:11 PDT",
        "held: " + a,
        "must not reopen: " + b,
        "version: A running · B/C paper",
        "sunday tickets: 0",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.held = a;
      state.tempt = b;
      state.carryText = book;
      state.carrySealed = true;
      state.carryAt = new Date().toISOString();
      save();
      if (carryOut) carryOut.textContent = book;
      if (carryStatus) carryStatus.textContent = "Sealed. Carry to /hush.html.";
    });
  }

  const pass = document.querySelector("[data-hush-pass]");
  const refuse = document.querySelector("[data-hush-refuse]");
  const hushPhrase = document.querySelector("[data-hush-phrase]");
  const hushOut = document.querySelector("[data-hush-out]");
  const hushStatus = document.querySelector("[data-hush-status]");
  if (pass && state.pass) pass.value = state.pass;
  if (refuse && state.refuse) refuse.value = state.refuse;
  if (hushOut && state.hushText) hushOut.textContent = state.hushText;
  if (hushStatus && state.hushSealed) {
    hushStatus.textContent = "Venue hush sealed. Keys stay dark.";
  }
  const hushBtn = document.querySelector("[data-hush-btn]");
  if (hushBtn) {
    hushBtn.addEventListener("click", function () {
      const a = pass ? pass.value.trim() : "";
      const b = refuse ? refuse.value.trim() : "";
      const phrase = hushPhrase ? hushPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "HUSH THE VENUES") {
        if (hushStatus) hushStatus.textContent = "Type HUSH THE VENUES.";
        return;
      }
      if (!a || !b) {
        if (hushStatus) hushStatus.textContent = "Two lines. Passports. Silence.";
        return;
      }
      if (banned.test(a + " " + b)) {
        if (hushStatus) hushStatus.textContent = "Void. Do not paste secrets or promise returns.";
        return;
      }
      const card = [
        "LYNXLOGIX.NET · VENUE HUSH",
        "Sunday 13 September 2026 · 10:11 PDT",
        "passports: " + a,
        "silent today: " + b,
        "coinbase / kraken / phantom / hopper: named only",
        "hook: dark",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.pass = a;
      state.refuse = b;
      state.hushText = card;
      state.hushSealed = true;
      state.hushAt = new Date().toISOString();
      save();
      if (hushOut) hushOut.textContent = card;
      if (hushStatus) hushStatus.textContent = "Sealed. Carry to /linen.html.";
    });
  }

  const who = document.querySelector("[data-linen-who]");
  const line = document.querySelector("[data-linen-line]");
  const linenPhrase = document.querySelector("[data-linen-phrase]");
  const linenOut = document.querySelector("[data-linen-out]");
  const linenStatus = document.querySelector("[data-linen-status]");
  if (who && state.linenWho) who.value = state.linenWho;
  if (line && state.linenLine) line.value = state.linenLine;
  if (linenOut && state.linenText) linenOut.textContent = state.linenText;
  if (linenStatus && state.linenSealed) {
    linenStatus.textContent = "Linen sealed for " + state.linenWho + ". Sunday cap is one cloth.";
  }
  const linenBtn = document.querySelector("[data-linen-btn]");
  if (linenBtn) {
    linenBtn.addEventListener("click", function () {
      const name = who ? who.value.trim() : "";
      const why = line ? line.value.trim() : "";
      const phrase = linenPhrase ? linenPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "LAY THE LINEN") {
        if (linenStatus) linenStatus.textContent = "Type LAY THE LINEN.";
        return;
      }
      if (!name || !why) {
        if (linenStatus) linenStatus.textContent = "Name the guest and why the cloth, not the chart.";
        return;
      }
      if (banned.test(name + " " + why)) {
        if (linenStatus) linenStatus.textContent = "Void. Linen sells the home, not a pair.";
        return;
      }
      if (state.linenSealed) {
        if (linenStatus) linenStatus.textContent = "Sunday cap: one linen card.";
        return;
      }
      const letter = [
        "LYNXLOGIX.NET · PATRON LINEN",
        name + ",",
        "",
        why,
        "",
        "Sunday the venues stay silent. The membership is live.",
        "Mangasm+: https://www.mangasm.app/plus",
        "Pass: https://lynxlogix-net.vercel.app/pay.html",
        "Contact: https://lynxlogix-net.vercel.app/contact.html",
        "",
        "- LynxLogix / Mangasm Enterprises"
      ].join("\n");
      state.linenWho = name;
      state.linenLine = why;
      state.linenText = letter;
      state.linenSealed = true;
      state.linenAt = new Date().toISOString();
      save();
      if (linenOut) linenOut.textContent = letter;
      if (linenStatus) linenStatus.textContent = "Sealed. Send Mangasm+ once if they are waiting. Then rest.";
    });
  }
})();
