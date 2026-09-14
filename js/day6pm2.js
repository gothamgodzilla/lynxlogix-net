(function () {
  const KEY = "llx.day6.pm2";
  const state = JSON.parse(localStorage.getItem(KEY) || "{}");
  const banned = /\b(addorder|private.key|seed|secret|mnemonic|withdraw|transfer)\b/i;
  const tickerBan = /\b(10x return|guaranteed|risk.?free)\b/i;
  function save() { localStorage.setItem(KEY, JSON.stringify(state)); }

  const taught = document.querySelector("[data-as-taught]");
  const hold = document.querySelector("[data-as-hold]");
  const asPhrase = document.querySelector("[data-as-phrase]");
  const asOut = document.querySelector("[data-as-out]");
  const asStatus = document.querySelector("[data-as-status]");
  if (taught && state.taught) taught.value = state.taught;
  if (hold && state.hold) hold.value = state.hold;
  if (asOut && state.asText) asOut.textContent = state.asText;
  if (asStatus && state.asSealed) asStatus.textContent = "Afternoon scored. executed: false.";
  const asBtn = document.querySelector("[data-as-btn]");
  if (asBtn) {
    asBtn.addEventListener("click", function () {
      const a = taught ? taught.value.trim() : "";
      const b = hold ? hold.value.trim() : "";
      const phrase = asPhrase ? asPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "SCORE THE AFTERNOON") { if (asStatus) asStatus.textContent = "Type SCORE THE AFTERNOON."; return; }
      if (!a || !b) { if (asStatus) asStatus.textContent = "Two lines. What it taught. What stays paper."; return; }
      if (banned.test(a + " " + b) || tickerBan.test(a + " " + b)) { if (asStatus) asStatus.textContent = "Void. No keys. No promised return."; return; }
      const book = ["LYNXLOGIX.NET · AFTERNOON SCORE","Monday 14 September 2026 · 14:09 PDT","first ticket taught: " + a,"still paper: " + b,"second ticket: DARK","version: A running · B/C paper","venue live: none","executed: false","sealed: " + new Date().toISOString()].join("\n");
      state.taught = a; state.hold = b; state.asText = book; state.asSealed = true; save();
      if (asOut) asOut.textContent = book;
      if (asStatus) asStatus.textContent = "Sealed. Carry to /corridor.html.";
    });
  }

  const who = document.querySelector("[data-cr-who]");
  const door = document.querySelector("[data-cr-door]");
  const crPhrase = document.querySelector("[data-cr-phrase]");
  const crOut = document.querySelector("[data-cr-out]");
  const crStatus = document.querySelector("[data-cr-status]");
  if (who && state.who) who.value = state.who;
  if (door && state.door) door.value = state.door;
  if (crOut && state.crText) crOut.textContent = state.crText;
  if (crStatus && state.crSealed) crStatus.textContent = "Corridor sealed. Coins stay off the invoice.";
  const crBtn = document.querySelector("[data-cr-btn]");
  if (crBtn) {
    crBtn.addEventListener("click", function () {
      const a = who ? who.value.trim() : "";
      const b = door ? door.value.trim() : "";
      const phrase = crPhrase ? crPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "WALK THE CORRIDOR") { if (crStatus) crStatus.textContent = "Type WALK THE CORRIDOR."; return; }
      if (!a || !b) { if (crStatus) crStatus.textContent = "Two lines. Who walks. Which door."; return; }
      if (banned.test(a + " " + b) || tickerBan.test(a + " " + b)) { if (crStatus) crStatus.textContent = "Void. No coins in the corridor."; return; }
      const card = ["LYNXLOGIX.NET · PATRON CORRIDOR","Monday 14 September 2026 · 14:09 PDT","walker: " + a,"door offered: " + b,"product: Mangasm+","door: https://www.mangasm.app/plus","also: /pay.html · ganesh.guru","coins sold: none","executed: false","sealed: " + new Date().toISOString()].join("\n");
      state.who = a; state.door = b; state.crText = card; state.crSealed = true; save();
      if (crOut) crOut.textContent = card;
      if (crStatus) crStatus.textContent = "Sealed. Carry to /ring.html.";
    });
  }

  const named = document.querySelector("[data-rg-named]");
  const dark = document.querySelector("[data-rg-dark]");
  const rgPhrase = document.querySelector("[data-rg-phrase]");
  const rgOut = document.querySelector("[data-rg-out]");
  const rgStatus = document.querySelector("[data-rg-status]");
  if (named && state.named) named.value = state.named;
  if (dark && state.dark) dark.value = state.dark;
  if (rgOut && state.rgText) rgOut.textContent = state.rgText;
  if (rgStatus && state.rgSealed) rgStatus.textContent = "Ring sealed. Live venues stay dark.";
  const rgBtn = document.querySelector("[data-rg-btn]");
  if (rgBtn) {
    rgBtn.addEventListener("click", function () {
      const a = named ? named.value.trim() : "";
      const b = dark ? dark.value.trim() : "";
      const phrase = rgPhrase ? rgPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "KEEP THE RING DARK") { if (rgStatus) rgStatus.textContent = "Type KEEP THE RING DARK."; return; }
      if (!a || !b) { if (rgStatus) rgStatus.textContent = "Two lines. What is named. Why it stays dark."; return; }
      if (banned.test(a + " " + b) || tickerBan.test(a + " " + b)) { if (rgStatus) rgStatus.textContent = "Void. Do not paste keys or seeds."; return; }
      const letter = ["LYNXLOGIX.NET · VENUE RING","Monday 14 September 2026 · 14:09 PDT","named: " + a,"stays dark because: " + b,"Coinbase Advanced: DARK","Kraken: DARK","Phantom / Kraken Wallet: DARK","TradingView: paper hook only","CryptoHopper: architecture only","version: A running · B/C paper","executed: false","sealed: " + new Date().toISOString()].join("\n");
      state.named = a; state.dark = b; state.rgText = letter; state.rgSealed = true; save();
      if (rgOut) rgOut.textContent = letter;
      if (rgStatus) rgStatus.textContent = "Sealed. Version A still runs the week.";
    });
  }
})();
