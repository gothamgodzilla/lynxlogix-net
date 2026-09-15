(function () {
  const KEY = "llx.day7.pm";
  const state = JSON.parse(localStorage.getItem(KEY) || "{}");
  const banned = /\b(addorder|private.key|seed|secret|mnemonic|withdraw|transfer)\b/i;
  const tickerBan = /\b(10x return|guaranteed|risk.?free)\b/i;
  function save() { localStorage.setItem(KEY, JSON.stringify(state)); }

  const scribe = document.querySelector("[data-ob-scribe]");
  const brief = document.querySelector("[data-ob-brief]");
  const obPhrase = document.querySelector("[data-ob-phrase]");
  const obOut = document.querySelector("[data-ob-out]");
  const obStatus = document.querySelector("[data-ob-status]");
  if (scribe && state.scribe) scribe.value = state.scribe;
  if (brief && state.brief) brief.value = state.brief;
  if (obOut && state.obText) obOut.textContent = state.obText;
  if (obStatus && state.obSealed) obStatus.textContent = "Observatory sealed. Briefing is not spending.";
  const obBtn = document.querySelector("[data-ob-btn]");
  if (obBtn) {
    obBtn.addEventListener("click", function () {
      const a = scribe ? scribe.value.trim() : "";
      const b = brief ? brief.value.trim() : "";
      const phrase = obPhrase ? obPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "KEEP THE OBSERVATORY") { if (obStatus) obStatus.textContent = "Type KEEP THE OBSERVATORY."; return; }
      if (!a || !b) { if (obStatus) obStatus.textContent = "Two lines. Who reads. The one sentence allowed."; return; }
      if (banned.test(a + " " + b) || tickerBan.test(a + " " + b)) { if (obStatus) obStatus.textContent = "Void. No keys. No promised return."; return; }
      const book = ["LYNXLOGIX.NET · OBSERVATORY WATCH","Tuesday 15 September 2026 · 12:05 PDT","reader: " + a,"sentence allowed: " + b,"second ticket: DARK","version: A running · B/C paper","venue live: none","executed: false","sealed: " + new Date().toISOString()].join("\n");
      state.scribe = a; state.brief = b; state.obText = book; state.obSealed = true; save();
      if (obOut) obOut.textContent = book;
      if (obStatus) obStatus.textContent = "Sealed. Carry to /arcade.html.";
    });
  }

  const invite = document.querySelector("[data-ar-invite]");
  const who = document.querySelector("[data-ar-who]");
  const arPhrase = document.querySelector("[data-ar-phrase]");
  const arOut = document.querySelector("[data-ar-out]");
  const arStatus = document.querySelector("[data-ar-status]");
  if (invite && state.invite) invite.value = state.invite;
  if (who && state.who) who.value = state.who;
  if (arOut && state.arText) arOut.textContent = state.arText;
  if (arStatus && state.arSealed) arStatus.textContent = "Arcade sealed. Coins stay off the invoice.";
  const arBtn = document.querySelector("[data-ar-btn]");
  if (arBtn) {
    arBtn.addEventListener("click", function () {
      const a = invite ? invite.value.trim() : "";
      const b = who ? who.value.trim() : "";
      const phrase = arPhrase ? arPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "OPEN THE ARCADE") { if (arStatus) arStatus.textContent = "Type OPEN THE ARCADE."; return; }
      if (!a || !b) { if (arStatus) arStatus.textContent = "Two lines. The invitation. Who it is for."; return; }
      if (banned.test(a + " " + b) || tickerBan.test(a + " " + b)) { if (arStatus) arStatus.textContent = "Void. No coins in the arcade."; return; }
      const card = ["LYNXLOGIX.NET · ARCADE INVITE","Tuesday 15 September 2026 · 12:05 PDT","invitation: " + a,"offered to: " + b,"product: Mangasm+","door: https://www.mangasm.app/plus","also: /pay.html · ganesh.guru","coins sold: none","executed: false","sealed: " + new Date().toISOString()].join("\n");
      state.invite = a; state.who = b; state.arText = card; state.arSealed = true; save();
      if (arOut) arOut.textContent = card;
      if (arStatus) arStatus.textContent = "Sealed. Carry to /atrium.html.";
    });
  }

  const venues = document.querySelector("[data-at-venues]");
  const vnState = document.querySelector("[data-at-state]");
  const atPhrase = document.querySelector("[data-at-phrase]");
  const atOut = document.querySelector("[data-at-out]");
  const atStatus = document.querySelector("[data-at-status]");
  if (venues && state.venues) venues.value = state.venues;
  if (vnState && state.vnState) vnState.value = state.vnState;
  if (atOut && state.atText) atOut.textContent = state.atText;
  if (atStatus && state.atSealed) atStatus.textContent = "Atrium sealed. Version A still runs.";
  const atBtn = document.querySelector("[data-at-btn]");
  if (atBtn) {
    atBtn.addEventListener("click", function () {
      const a = venues ? venues.value.trim() : "";
      const b = vnState ? vnState.value.trim() : "";
      const phrase = atPhrase ? atPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "COUNT THE ATRIUM") { if (atStatus) atStatus.textContent = "Type COUNT THE ATRIUM."; return; }
      if (!a || !b) { if (atStatus) atStatus.textContent = "Two lines. Venues that exist. Their state."; return; }
      if (banned.test(a + " " + b) || tickerBan.test(a + " " + b)) { if (atStatus) atStatus.textContent = "Void. Do not paste keys or seeds."; return; }
      const letter = ["LYNXLOGIX.NET · ATRIUM CENSUS","Tuesday 15 September 2026 · 12:05 PDT","venues: " + a,"state: " + b,"Coinbase Advanced: DARK","Kraken: DARK","Phantom / Kraken Wallet: DARK","TradingView: paper hook only","CryptoHopper: architecture only","SuperClaude / OpenCode: inside the house","version: A running · B/C paper","10x: process quality, not a promised return","executed: false","sealed: " + new Date().toISOString()].join("\n");
      state.venues = a;
      state.vnState = b;
      state.atText = letter;
      state.atSealed = true;
      save();
      if (atOut) atOut.textContent = letter;
      if (atStatus) atStatus.textContent = "Sealed. Version A still runs the afternoon.";
    });
  }
})();
