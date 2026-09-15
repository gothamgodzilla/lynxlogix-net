(function () {
  const KEY = "llx.day7.noon";
  const state = JSON.parse(localStorage.getItem(KEY) || "{}");
  const banned = /\b(addorder|private.key|seed|secret|mnemonic|withdraw|transfer)\b/i;
  const tickerBan = /\b(10x return|guaranteed|risk.?free)\b/i;
  function save() { localStorage.setItem(KEY, JSON.stringify(state)); }

  const scribe = document.querySelector("[data-so-scribe]");
  const brief = document.querySelector("[data-so-brief]");
  const soPhrase = document.querySelector("[data-so-phrase]");
  const soOut = document.querySelector("[data-so-out]");
  const soStatus = document.querySelector("[data-so-status]");
  if (scribe && state.scribe) scribe.value = state.scribe;
  if (brief && state.brief) brief.value = state.brief;
  if (soOut && state.soText) soOut.textContent = state.soText;
  if (soStatus && state.soSealed) soStatus.textContent = "Solarium sealed. Briefing is not spending.";
  const soBtn = document.querySelector("[data-so-btn]");
  if (soBtn) {
    soBtn.addEventListener("click", function () {
      const a = scribe ? scribe.value.trim() : "";
      const b = brief ? brief.value.trim() : "";
      const phrase = soPhrase ? soPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "KEEP THE SOLARIUM") { if (soStatus) soStatus.textContent = "Type KEEP THE SOLARIUM."; return; }
      if (!a || !b) { if (soStatus) soStatus.textContent = "Two lines. Who reads. The one sentence allowed."; return; }
      if (banned.test(a + " " + b) || tickerBan.test(a + " " + b)) { if (soStatus) soStatus.textContent = "Void. No keys. No promised return."; return; }
      const book = ["LYNXLOGIX.NET · SOLARIUM WATCH","Tuesday 15 September 2026 · 11:13 PDT","reader: " + a,"sentence allowed: " + b,"second ticket: DARK","version: A running · B/C paper","venue live: none","executed: false","sealed: " + new Date().toISOString()].join("\n");
      state.scribe = a; state.brief = b; state.soText = book; state.soSealed = true; save();
      if (soOut) soOut.textContent = book;
      if (soStatus) soStatus.textContent = "Sealed. Carry to /courtyard.html.";
    });
  }

  const invite = document.querySelector("[data-cy-invite]");
  const who = document.querySelector("[data-cy-who]");
  const cyPhrase = document.querySelector("[data-cy-phrase]");
  const cyOut = document.querySelector("[data-cy-out]");
  const cyStatus = document.querySelector("[data-cy-status]");
  if (invite && state.invite) invite.value = state.invite;
  if (who && state.who) who.value = state.who;
  if (cyOut && state.cyText) cyOut.textContent = state.cyText;
  if (cyStatus && state.cySealed) cyStatus.textContent = "Courtyard sealed. Coins stay off the invoice.";
  const cyBtn = document.querySelector("[data-cy-btn]");
  if (cyBtn) {
    cyBtn.addEventListener("click", function () {
      const a = invite ? invite.value.trim() : "";
      const b = who ? who.value.trim() : "";
      const phrase = cyPhrase ? cyPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "OPEN THE COURTYARD") { if (cyStatus) cyStatus.textContent = "Type OPEN THE COURTYARD."; return; }
      if (!a || !b) { if (cyStatus) cyStatus.textContent = "Two lines. The invitation. Who it is for."; return; }
      if (banned.test(a + " " + b) || tickerBan.test(a + " " + b)) { if (cyStatus) cyStatus.textContent = "Void. No coins in the courtyard."; return; }
      const card = ["LYNXLOGIX.NET · COURTYARD INVITE","Tuesday 15 September 2026 · 11:13 PDT","invitation: " + a,"offered to: " + b,"product: Mangasm+","door: https://www.mangasm.app/plus","also: /pay.html · ganesh.guru","coins sold: none","executed: false","sealed: " + new Date().toISOString()].join("\n");
      state.invite = a; state.who = b; state.cyText = card; state.cySealed = true; save();
      if (cyOut) cyOut.textContent = card;
      if (cyStatus) cyStatus.textContent = "Sealed. Carry to /rotunda.html.";
    });
  }

  const venues = document.querySelector("[data-ro-venues]");
  const vnState = document.querySelector("[data-ro-state]");
  const roPhrase = document.querySelector("[data-ro-phrase]");
  const roOut = document.querySelector("[data-ro-out]");
  const roStatus = document.querySelector("[data-ro-status]");
  if (venues && state.venues) venues.value = state.venues;
  if (vnState && state.vnState) vnState.value = state.vnState;
  if (roOut && state.roText) roOut.textContent = state.roText;
  if (roStatus && state.roSealed) roStatus.textContent = "Rotunda sealed. Version A still runs.";
  const roBtn = document.querySelector("[data-ro-btn]");
  if (roBtn) {
    roBtn.addEventListener("click", function () {
      const a = venues ? venues.value.trim() : "";
      const b = vnState ? vnState.value.trim() : "";
      const phrase = roPhrase ? roPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "COUNT THE ROTUNDA") { if (roStatus) roStatus.textContent = "Type COUNT THE ROTUNDA."; return; }
      if (!a || !b) { if (roStatus) roStatus.textContent = "Two lines. Venues that exist. Their state."; return; }
      if (banned.test(a + " " + b) || tickerBan.test(a + " " + b)) { if (roStatus) roStatus.textContent = "Void. Do not paste keys or seeds."; return; }
      const letter = ["LYNXLOGIX.NET · ROTUNDA CENSUS","Tuesday 15 September 2026 · 11:13 PDT","venues: " + a,"state: " + b,"Coinbase Advanced: DARK","Kraken: DARK","Phantom / Kraken Wallet: DARK","TradingView: paper hook only","CryptoHopper: architecture only","SuperClaude / OpenCode: inside the house","version: A running · B/C paper","10x: process quality, not a promised return","executed: false","sealed: " + new Date().toISOString()].join("\n");
      state.venues = a;
      state.vnState = b;
      state.roText = letter;
      state.roSealed = true;
      save();
      if (roOut) roOut.textContent = letter;
      if (roStatus) roStatus.textContent = "Sealed. Version A still runs the noon.";
    });
  }
})();
