(function () {
  const KEY = "llx.day6.late";
  const state = JSON.parse(localStorage.getItem(KEY) || "{}");
  const banned = /\b(addorder|private.key|seed|secret|mnemonic|withdraw|transfer)\b/i;
  const tickerBan = /\b(10x return|guaranteed|risk.?free)\b/i;
  function save() { localStorage.setItem(KEY, JSON.stringify(state)); }

  const scribe = document.querySelector("[data-cv-scribe]");
  const brief = document.querySelector("[data-cv-brief]");
  const cvPhrase = document.querySelector("[data-cv-phrase]");
  const cvOut = document.querySelector("[data-cv-out]");
  const cvStatus = document.querySelector("[data-cv-status]");
  if (scribe && state.scribe) scribe.value = state.scribe;
  if (brief && state.brief) brief.value = state.brief;
  if (cvOut && state.cvText) cvOut.textContent = state.cvText;
  if (cvStatus && state.cvSealed) cvStatus.textContent = "Conservatory sealed. Briefing is not spending.";
  const cvBtn = document.querySelector("[data-cv-btn]");
  if (cvBtn) {
    cvBtn.addEventListener("click", function () {
      const a = scribe ? scribe.value.trim() : "";
      const b = brief ? brief.value.trim() : "";
      const phrase = cvPhrase ? cvPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "KEEP THE CONSERVATORY") { if (cvStatus) cvStatus.textContent = "Type KEEP THE CONSERVATORY."; return; }
      if (!a || !b) { if (cvStatus) cvStatus.textContent = "Two lines. Who writes. The one sentence allowed."; return; }
      if (banned.test(a + " " + b) || tickerBan.test(a + " " + b)) { if (cvStatus) cvStatus.textContent = "Void. No keys. No promised return."; return; }
      const book = ["LYNXLOGIX.NET · CONSERVATORY WATCH","Monday 14 September 2026 · 18:06 PDT","scribe: " + a,"sentence allowed: " + b,"second ticket: DARK","version: A running · B/C paper","venue live: none","executed: false","sealed: " + new Date().toISOString()].join("\n");
      state.scribe = a; state.brief = b; state.cvText = book; state.cvSealed = true; save();
      if (cvOut) cvOut.textContent = book;
      if (cvStatus) cvStatus.textContent = "Sealed. Carry to /pavilion.html.";
    });
  }

  const invite = document.querySelector("[data-pv-invite]");
  const who = document.querySelector("[data-pv-who]");
  const pvPhrase = document.querySelector("[data-pv-phrase]");
  const pvOut = document.querySelector("[data-pv-out]");
  const pvStatus = document.querySelector("[data-pv-status]");
  if (invite && state.invite) invite.value = state.invite;
  if (who && state.who) who.value = state.who;
  if (pvOut && state.pvText) pvOut.textContent = state.pvText;
  if (pvStatus && state.pvSealed) pvStatus.textContent = "Pavilion sealed. Coins stay off the invoice.";
  const pvBtn = document.querySelector("[data-pv-btn]");
  if (pvBtn) {
    pvBtn.addEventListener("click", function () {
      const a = invite ? invite.value.trim() : "";
      const b = who ? who.value.trim() : "";
      const phrase = pvPhrase ? pvPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "OPEN THE PAVILION") { if (pvStatus) pvStatus.textContent = "Type OPEN THE PAVILION."; return; }
      if (!a || !b) { if (pvStatus) pvStatus.textContent = "Two lines. The invitation. Who it is for."; return; }
      if (banned.test(a + " " + b) || tickerBan.test(a + " " + b)) { if (pvStatus) pvStatus.textContent = "Void. No coins in the pavilion."; return; }
      const card = ["LYNXLOGIX.NET · PAVILION INVITE","Monday 14 September 2026 · 18:06 PDT","invitation: " + a,"offered to: " + b,"product: Mangasm+","door: https://www.mangasm.app/plus","also: /pay.html · ganesh.guru","coins sold: none","executed: false","sealed: " + new Date().toISOString()].join("\n");
      state.invite = a; state.who = b; state.pvText = card; state.pvSealed = true; save();
      if (pvOut) pvOut.textContent = card;
      if (pvStatus) pvStatus.textContent = "Sealed. Carry to /gatehouse.html.";
    });
  }

  const venues = document.querySelector("[data-gh-venues]");
  const vnState = document.querySelector("[data-gh-state]");
  const ghPhrase = document.querySelector("[data-gh-phrase]");
  const ghOut = document.querySelector("[data-gh-out]");
  const ghStatus = document.querySelector("[data-gh-status]");
  if (venues && state.venues) venues.value = state.venues;
  if (vnState && state.vnState) vnState.value = state.vnState;
  if (ghOut && state.ghText) ghOut.textContent = state.ghText;
  if (ghStatus && state.ghSealed) ghStatus.textContent = "Gatehouse sealed. Version A still runs.";
  const ghBtn = document.querySelector("[data-gh-btn]");
  if (ghBtn) {
    ghBtn.addEventListener("click", function () {
      const a = venues ? venues.value.trim() : "";
      const b = vnState ? vnState.value.trim() : "";
      const phrase = ghPhrase ? ghPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "COUNT THE GATEHOUSE") { if (ghStatus) ghStatus.textContent = "Type COUNT THE GATEHOUSE."; return; }
      if (!a || !b) { if (ghStatus) ghStatus.textContent = "Two lines. Venues that exist. Their state."; return; }
      if (banned.test(a + " " + b) || tickerBan.test(a + " " + b)) { if (ghStatus) ghStatus.textContent = "Void. Do not paste keys or seeds."; return; }
      const letter = ["LYNXLOGIX.NET · GATEHOUSE CENSUS","Monday 14 September 2026 · 18:06 PDT","venues: " + a,"state: " + b,"Coinbase Advanced: DARK","Kraken: DARK","Phantom / Kraken Wallet: DARK","TradingView: paper hook only","CryptoHopper: architecture only","version: A running · B/C paper","10x: process quality, not a promised return","executed: false","sealed: " + new Date().toISOString()].join("\n");
      state.venues = a;
      state.vnState = b;
      state.ghText = letter;
      state.ghSealed = true;
      save();
      if (ghOut) ghOut.textContent = letter;
      if (ghStatus) ghStatus.textContent = "Sealed. Version A still runs the evening.";
    });
  }
})();
