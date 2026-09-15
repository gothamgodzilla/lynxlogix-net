(function () {
  const KEY = "llx.day7.morning";
  const state = JSON.parse(localStorage.getItem(KEY) || "{}");
  const banned = /\b(addorder|private.key|seed|secret|mnemonic|withdraw|transfer)\b/i;
  const tickerBan = /\b(10x return|guaranteed|risk.?free)\b/i;
  function save() { localStorage.setItem(KEY, JSON.stringify(state)); }

  const scribe = document.querySelector("[data-lb-scribe]");
  const brief = document.querySelector("[data-lb-brief]");
  const lbPhrase = document.querySelector("[data-lb-phrase]");
  const lbOut = document.querySelector("[data-lb-out]");
  const lbStatus = document.querySelector("[data-lb-status]");
  if (scribe && state.scribe) scribe.value = state.scribe;
  if (brief && state.brief) brief.value = state.brief;
  if (lbOut && state.lbText) lbOut.textContent = state.lbText;
  if (lbStatus && state.lbSealed) lbStatus.textContent = "Library sealed. Briefing is not spending.";
  const lbBtn = document.querySelector("[data-lb-btn]");
  if (lbBtn) {
    lbBtn.addEventListener("click", function () {
      const a = scribe ? scribe.value.trim() : "";
      const b = brief ? brief.value.trim() : "";
      const phrase = lbPhrase ? lbPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "KEEP THE LIBRARY") { if (lbStatus) lbStatus.textContent = "Type KEEP THE LIBRARY."; return; }
      if (!a || !b) { if (lbStatus) lbStatus.textContent = "Two lines. Who reads. The one sentence allowed."; return; }
      if (banned.test(a + " " + b) || tickerBan.test(a + " " + b)) { if (lbStatus) lbStatus.textContent = "Void. No keys. No promised return."; return; }
      const book = ["LYNXLOGIX.NET · LIBRARY WATCH","Tuesday 15 September 2026 · 09:17 PDT","reader: " + a,"sentence allowed: " + b,"second ticket: DARK","version: A running · B/C paper","venue live: none","executed: false","sealed: " + new Date().toISOString()].join("\n");
      state.scribe = a; state.brief = b; state.lbText = book; state.lbSealed = true; save();
      if (lbOut) lbOut.textContent = book;
      if (lbStatus) lbStatus.textContent = "Sealed. Carry to /terrace.html.";
    });
  }

  const invite = document.querySelector("[data-tr-invite]");
  const who = document.querySelector("[data-tr-who]");
  const trPhrase = document.querySelector("[data-tr-phrase]");
  const trOut = document.querySelector("[data-tr-out]");
  const trStatus = document.querySelector("[data-tr-status]");
  if (invite && state.invite) invite.value = state.invite;
  if (who && state.who) who.value = state.who;
  if (trOut && state.trText) trOut.textContent = state.trText;
  if (trStatus && state.trSealed) trStatus.textContent = "Terrace sealed. Coins stay off the invoice.";
  const trBtn = document.querySelector("[data-tr-btn]");
  if (trBtn) {
    trBtn.addEventListener("click", function () {
      const a = invite ? invite.value.trim() : "";
      const b = who ? who.value.trim() : "";
      const phrase = trPhrase ? trPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "OPEN THE TERRACE") { if (trStatus) trStatus.textContent = "Type OPEN THE TERRACE."; return; }
      if (!a || !b) { if (trStatus) trStatus.textContent = "Two lines. The invitation. Who it is for."; return; }
      if (banned.test(a + " " + b) || tickerBan.test(a + " " + b)) { if (trStatus) trStatus.textContent = "Void. No coins on the terrace."; return; }
      const card = ["LYNXLOGIX.NET · TERRACE INVITE","Tuesday 15 September 2026 · 09:17 PDT","invitation: " + a,"offered to: " + b,"product: Mangasm+","door: https://www.mangasm.app/plus","also: /pay.html · ganesh.guru","coins sold: none","executed: false","sealed: " + new Date().toISOString()].join("\n");
      state.invite = a; state.who = b; state.trText = card; state.trSealed = true; save();
      if (trOut) trOut.textContent = card;
      if (trStatus) trStatus.textContent = "Sealed. Carry to /vestibule.html.";
    });
  }

  const venues = document.querySelector("[data-vb-venues]");
  const vnState = document.querySelector("[data-vb-state]");
  const vbPhrase = document.querySelector("[data-vb-phrase]");
  const vbOut = document.querySelector("[data-vb-out]");
  const vbStatus = document.querySelector("[data-vb-status]");
  if (venues && state.venues) venues.value = state.venues;
  if (vnState && state.vnState) vnState.value = state.vnState;
  if (vbOut && state.vbText) vbOut.textContent = state.vbText;
  if (vbStatus && state.vbSealed) vbStatus.textContent = "Vestibule sealed. Version A still runs.";
  const vbBtn = document.querySelector("[data-vb-btn]");
  if (vbBtn) {
    vbBtn.addEventListener("click", function () {
      const a = venues ? venues.value.trim() : "";
      const b = vnState ? vnState.value.trim() : "";
      const phrase = vbPhrase ? vbPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "COUNT THE VESTIBULE") { if (vbStatus) vbStatus.textContent = "Type COUNT THE VESTIBULE."; return; }
      if (!a || !b) { if (vbStatus) vbStatus.textContent = "Two lines. Venues that exist. Their state."; return; }
      if (banned.test(a + " " + b) || tickerBan.test(a + " " + b)) { if (vbStatus) vbStatus.textContent = "Void. Do not paste keys or seeds."; return; }
      const letter = ["LYNXLOGIX.NET · VESTIBULE CENSUS","Tuesday 15 September 2026 · 09:17 PDT","venues: " + a,"state: " + b,"Coinbase Advanced: DARK","Kraken: DARK","Phantom / Kraken Wallet: DARK","TradingView: paper hook only","CryptoHopper: architecture only","version: A running · B/C paper","10x: process quality, not a promised return","executed: false","sealed: " + new Date().toISOString()].join("\n");
      state.venues = a;
      state.vnState = b;
      state.vbText = letter;
      state.vbSealed = true;
      save();
      if (vbOut) vbOut.textContent = letter;
      if (vbStatus) vbStatus.textContent = "Sealed. Version A still runs the morning.";
    });
  }
})();
