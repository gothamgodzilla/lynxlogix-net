(function () {
  const KEY = "llx.day6.pm4";
  const state = JSON.parse(localStorage.getItem(KEY) || "{}");
  const banned = /\b(addorder|private.key|seed|secret|mnemonic|withdraw|transfer)\b/i;
  const tickerBan = /\b(10x return|guaranteed|risk.?free)\b/i;
  function save() { localStorage.setItem(KEY, JSON.stringify(state)); }

  const scribe = document.querySelector("[data-ac-scribe]");
  const brief = document.querySelector("[data-ac-brief]");
  const acPhrase = document.querySelector("[data-ac-phrase]");
  const acOut = document.querySelector("[data-ac-out]");
  const acStatus = document.querySelector("[data-ac-status]");
  if (scribe && state.scribe) scribe.value = state.scribe;
  if (brief && state.brief) brief.value = state.brief;
  if (acOut && state.acText) acOut.textContent = state.acText;
  if (acStatus && state.acSealed) acStatus.textContent = "Antechamber sealed. Briefing is not spending.";
  const acBtn = document.querySelector("[data-ac-btn]");
  if (acBtn) {
    acBtn.addEventListener("click", function () {
      const a = scribe ? scribe.value.trim() : "";
      const b = brief ? brief.value.trim() : "";
      const phrase = acPhrase ? acPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "SEAT THE ANTECHAMBER") { if (acStatus) acStatus.textContent = "Type SEAT THE ANTECHAMBER."; return; }
      if (!a || !b) { if (acStatus) acStatus.textContent = "Two lines. Who writes. The one sentence allowed."; return; }
      if (banned.test(a + " " + b) || tickerBan.test(a + " " + b)) { if (acStatus) acStatus.textContent = "Void. No keys. No promised return."; return; }
      const book = ["LYNXLOGIX.NET · ANTECHAMBER BRIEF","Monday 14 September 2026 · 16:16 PDT","scribe: " + a,"sentence allowed: " + b,"second ticket: DARK","version: A running · B/C paper","venue live: none","executed: false","sealed: " + new Date().toISOString()].join("\n");
      state.scribe = a; state.brief = b; state.acText = book; state.acSealed = true; save();
      if (acOut) acOut.textContent = book;
      if (acStatus) acStatus.textContent = "Sealed. Carry to /cloister.html.";
    });
  }

  const invite = document.querySelector("[data-cl-invite]");
  const who = document.querySelector("[data-cl-who]");
  const clPhrase = document.querySelector("[data-cl-phrase]");
  const clOut = document.querySelector("[data-cl-out]");
  const clStatus = document.querySelector("[data-cl-status]");
  if (invite && state.invite) invite.value = state.invite;
  if (who && state.who) who.value = state.who;
  if (clOut && state.clText) clOut.textContent = state.clText;
  if (clStatus && state.clSealed) clStatus.textContent = "Cloister sealed. Coins stay off the invoice.";
  const clBtn = document.querySelector("[data-cl-btn]");
  if (clBtn) {
    clBtn.addEventListener("click", function () {
      const a = invite ? invite.value.trim() : "";
      const b = who ? who.value.trim() : "";
      const phrase = clPhrase ? clPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "KEEP THE CLOISTER") { if (clStatus) clStatus.textContent = "Type KEEP THE CLOISTER."; return; }
      if (!a || !b) { if (clStatus) clStatus.textContent = "Two lines. The invitation. Who it is for."; return; }
      if (banned.test(a + " " + b) || tickerBan.test(a + " " + b)) { if (clStatus) clStatus.textContent = "Void. No coins in the cloister."; return; }
      const card = ["LYNXLOGIX.NET · CLOISTER INVITE","Monday 14 September 2026 · 16:16 PDT","invitation: " + a,"offered to: " + b,"product: Mangasm+","door: https://www.mangasm.app/plus","also: /pay.html · ganesh.guru","coins sold: none","executed: false","sealed: " + new Date().toISOString()].join("\n");
      state.invite = a; state.who = b; state.clText = card; state.clSealed = true; save();
      if (clOut) clOut.textContent = card;
      if (clStatus) clStatus.textContent = "Sealed. Carry to /colonnade.html.";
    });
  }

  const venues = document.querySelector("[data-cn-venues]");
  const vnState = document.querySelector("[data-cn-state]");
  const cnPhrase = document.querySelector("[data-cn-phrase]");
  const cnOut = document.querySelector("[data-cn-out]");
  const cnStatus = document.querySelector("[data-cn-status]");
  if (venues && state.venues) venues.value = state.venues;
  if (vnState && state.vnState) vnState.value = state.vnState;
  if (cnOut && state.cnText) cnOut.textContent = state.cnText;
  if (cnStatus && state.cnSealed) cnStatus.textContent = "Colonnade sealed. Version A still runs.";
  const cnBtn = document.querySelector("[data-cn-btn]");
  if (cnBtn) {
    cnBtn.addEventListener("click", function () {
      const a = venues ? venues.value.trim() : "";
      const b = vnState ? vnState.value.trim() : "";
      const phrase = cnPhrase ? cnPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "COUNT THE COLONNADE") { if (cnStatus) cnStatus.textContent = "Type COUNT THE COLONNADE."; return; }
      if (!a || !b) { if (cnStatus) cnStatus.textContent = "Two lines. Venues that exist. Their state."; return; }
      if (banned.test(a + " " + b) || tickerBan.test(a + " " + b)) { if (cnStatus) cnStatus.textContent = "Void. Do not paste keys or seeds."; return; }
      const letter = ["LYNXLOGIX.NET · COLONNADE CENSUS","Monday 14 September 2026 · 16:16 PDT","venues: " + a,"state: " + b,"Coinbase Advanced: DARK","Kraken: DARK","Phantom / Kraken Wallet: DARK","TradingView: paper hook only","CryptoHopper: architecture only","version: A running · B/C paper","10x: process quality, not a promised return","executed: false","sealed: " + new Date().toISOString()].join("\n");
      state.venues = a; state.vnState = b; state.cnText = letter; state.cnSealed = true; save();
      if (cnOut) cnOut.textContent = letter;
      if (cnStatus) cnStatus.textContent = "Sealed. Version A still runs the week.";
    });
  }
})();
