(function () {
  const KEY = "llx.day6.eve";
  const state = JSON.parse(localStorage.getItem(KEY) || "{}");
  const banned = /\b(addorder|private.key|seed|secret|mnemonic|withdraw|transfer)\b/i;
  const tickerBan = /\b(10x return|guaranteed|risk.?free)\b/i;
  function save() { localStorage.setItem(KEY, JSON.stringify(state)); }

  const scribe = document.querySelector("[data-or-scribe]");
  const brief = document.querySelector("[data-or-brief]");
  const orPhrase = document.querySelector("[data-or-phrase]");
  const orOut = document.querySelector("[data-or-out]");
  const orStatus = document.querySelector("[data-or-status]");
  if (scribe && state.scribe) scribe.value = state.scribe;
  if (brief && state.brief) brief.value = state.brief;
  if (orOut && state.orText) orOut.textContent = state.orText;
  if (orStatus && state.orSealed) orStatus.textContent = "Oratory sealed. Briefing is not spending.";
  const orBtn = document.querySelector("[data-or-btn]");
  if (orBtn) {
    orBtn.addEventListener("click", function () {
      const a = scribe ? scribe.value.trim() : "";
      const b = brief ? brief.value.trim() : "";
      const phrase = orPhrase ? orPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "SEAT THE ORATORY") { if (orStatus) orStatus.textContent = "Type SEAT THE ORATORY."; return; }
      if (!a || !b) { if (orStatus) orStatus.textContent = "Two lines. Who writes. The one sentence allowed."; return; }
      if (banned.test(a + " " + b) || tickerBan.test(a + " " + b)) { if (orStatus) orStatus.textContent = "Void. No keys. No promised return."; return; }
      const book = ["LYNXLOGIX.NET · ORATORY WATCH","Monday 14 September 2026 · 17:20 PDT","scribe: " + a,"sentence allowed: " + b,"second ticket: DARK","version: A running · B/C paper","venue live: none","executed: false","sealed: " + new Date().toISOString()].join("\n");
      state.scribe = a; state.brief = b; state.orText = book; state.orSealed = true; save();
      if (orOut) orOut.textContent = book;
      if (orStatus) orStatus.textContent = "Sealed. Carry to /loggia.html.";
    });
  }

  const invite = document.querySelector("[data-lg-invite]");
  const who = document.querySelector("[data-lg-who]");
  const lgPhrase = document.querySelector("[data-lg-phrase]");
  const lgOut = document.querySelector("[data-lg-out]");
  const lgStatus = document.querySelector("[data-lg-status]");
  if (invite && state.invite) invite.value = state.invite;
  if (who && state.who) who.value = state.who;
  if (lgOut && state.lgText) lgOut.textContent = state.lgText;
  if (lgStatus && state.lgSealed) lgStatus.textContent = "Loggia sealed. Coins stay off the invoice.";
  const lgBtn = document.querySelector("[data-lg-btn]");
  if (lgBtn) {
    lgBtn.addEventListener("click", function () {
      const a = invite ? invite.value.trim() : "";
      const b = who ? who.value.trim() : "";
      const phrase = lgPhrase ? lgPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "OPEN THE LOGGIA") { if (lgStatus) lgStatus.textContent = "Type OPEN THE LOGGIA."; return; }
      if (!a || !b) { if (lgStatus) lgStatus.textContent = "Two lines. The invitation. Who it is for."; return; }
      if (banned.test(a + " " + b) || tickerBan.test(a + " " + b)) { if (lgStatus) lgStatus.textContent = "Void. No coins in the loggia."; return; }
      const card = ["LYNXLOGIX.NET · LOGGIA INVITE","Monday 14 September 2026 · 17:20 PDT","invitation: " + a,"offered to: " + b,"product: Mangasm+","door: https://www.mangasm.app/plus","also: /pay.html · ganesh.guru","coins sold: none","executed: false","sealed: " + new Date().toISOString()].join("\n");
      state.invite = a; state.who = b; state.lgText = card; state.lgSealed = true; save();
      if (lgOut) lgOut.textContent = card;
      if (lgStatus) lgStatus.textContent = "Sealed. Carry to /portico.html.";
    });
  }

  const venues = document.querySelector("[data-pt-venues]");
  const vnState = document.querySelector("[data-pt-state]");
  const ptPhrase = document.querySelector("[data-pt-phrase]");
  const ptOut = document.querySelector("[data-pt-out]");
  const ptStatus = document.querySelector("[data-pt-status]");
  if (venues && state.venues) venues.value = state.venues;
  if (vnState && state.vnState) vnState.value = state.vnState;
  if (ptOut && state.ptText) ptOut.textContent = state.ptText;
  if (ptStatus && state.ptSealed) ptStatus.textContent = "Portico sealed. Version A still runs.";
  const ptBtn = document.querySelector("[data-pt-btn]");
  if (ptBtn) {
    ptBtn.addEventListener("click", function () {
      const a = venues ? venues.value.trim() : "";
      const b = vnState ? vnState.value.trim() : "";
      const phrase = ptPhrase ? ptPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "COUNT THE PORTICO") { if (ptStatus) ptStatus.textContent = "Type COUNT THE PORTICO."; return; }
      if (!a || !b) { if (ptStatus) ptStatus.textContent = "Two lines. Venues that exist. Their state."; return; }
      if (banned.test(a + " " + b) || tickerBan.test(a + " " + b)) { if (ptStatus) ptStatus.textContent = "Void. Do not paste keys or seeds."; return; }
      const letter = ["LYNXLOGIX.NET · PORTICO CENSUS","Monday 14 September 2026 · 17:20 PDT","venues: " + a,"state: " + b,"Coinbase Advanced: DARK","Kraken: DARK","Phantom / Kraken Wallet: DARK","TradingView: paper hook only","CryptoHopper: architecture only","version: A running · B/C paper","10x: process quality, not a promised return","executed: false","sealed: " + new Date().toISOString()].join("\n");
      state.venues = a;
      state.vnState = b;
      state.ptText = letter;
      state.ptSealed = true;
      save();
      if (ptOut) ptOut.textContent = letter;
      if (ptStatus) ptStatus.textContent = "Sealed. Version A still runs the evening.";
    });
  }
})();
