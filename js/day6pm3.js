(function () {
  const KEY = "llx.day6.pm3";
  const state = JSON.parse(localStorage.getItem(KEY) || "{}");
  const banned = /\b(addorder|private.key|seed|secret|mnemonic|withdraw|transfer)\b/i;
  const tickerBan = /\b(10x return|guaranteed|risk.?free)\b/i;
  function save() { localStorage.setItem(KEY, JSON.stringify(state)); }

  const who = document.querySelector("[data-st-who]");
  const allow = document.querySelector("[data-st-allow]");
  const stPhrase = document.querySelector("[data-st-phrase]");
  const stOut = document.querySelector("[data-st-out]");
  const stStatus = document.querySelector("[data-st-status]");
  if (who && state.who) who.value = state.who;
  if (allow && state.allow) allow.value = state.allow;
  if (stOut && state.stText) stOut.textContent = state.stText;
  if (stStatus && state.stSealed) stStatus.textContent = "Hour sealed. Sitting is not spending.";
  const stBtn = document.querySelector("[data-st-btn]");
  if (stBtn) {
    stBtn.addEventListener("click", function () {
      const a = who ? who.value.trim() : "";
      const b = allow ? allow.value.trim() : "";
      const phrase = stPhrase ? stPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "STEWARD THE HOUR") { if (stStatus) stStatus.textContent = "Type STEWARD THE HOUR."; return; }
      if (!a || !b) { if (stStatus) stStatus.textContent = "Two lines. Who sits. What they may do."; return; }
      if (banned.test(a + " " + b) || tickerBan.test(a + " " + b)) { if (stStatus) stStatus.textContent = "Void. No keys. No promised return."; return; }
      const book = ["LYNXLOGIX.NET · STEWARD HOUR","Monday 14 September 2026 · 15:16 PDT","who sits: " + a,"this hour may: " + b,"second ticket: DARK","version: A running · B/C paper","venue live: none","executed: false","sealed: " + new Date().toISOString()].join("\n");
      state.who = a; state.allow = b; state.stText = book; state.stSealed = true; save();
      if (stOut) stOut.textContent = book;
      if (stStatus) stStatus.textContent = "Sealed. Carry to /relic.html.";
    });
  }

  const object = document.querySelector("[data-rl-object]");
  const patron = document.querySelector("[data-rl-who]");
  const rlPhrase = document.querySelector("[data-rl-phrase]");
  const rlOut = document.querySelector("[data-rl-out]");
  const rlStatus = document.querySelector("[data-rl-status]");
  if (object && state.object) object.value = state.object;
  if (patron && state.patron) patron.value = state.patron;
  if (rlOut && state.rlText) rlOut.textContent = state.rlText;
  if (rlStatus && state.rlSealed) rlStatus.textContent = "Relic sealed. Coins stay off the invoice.";
  const rlBtn = document.querySelector("[data-rl-btn]");
  if (rlBtn) {
    rlBtn.addEventListener("click", function () {
      const a = object ? object.value.trim() : "";
      const b = patron ? patron.value.trim() : "";
      const phrase = rlPhrase ? rlPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "KEEP THE RELIC") { if (rlStatus) rlStatus.textContent = "Type KEEP THE RELIC."; return; }
      if (!a || !b) { if (rlStatus) rlStatus.textContent = "Two lines. The relic. Who it is for."; return; }
      if (banned.test(a + " " + b) || tickerBan.test(a + " " + b)) { if (rlStatus) rlStatus.textContent = "Void. No coins in the hall."; return; }
      const card = ["LYNXLOGIX.NET · RELIC HALL","Monday 14 September 2026 · 15:16 PDT","relic: " + a,"offered to: " + b,"product: Mangasm+","door: https://www.mangasm.app/plus","also: /pay.html · ganesh.guru","coins sold: none","executed: false","sealed: " + new Date().toISOString()].join("\n");
      state.object = a; state.patron = b; state.rlText = card; state.rlSealed = true; save();
      if (rlOut) rlOut.textContent = card;
      if (rlStatus) rlStatus.textContent = "Sealed. Carry to /mandate.html.";
    });
  }

  const law = document.querySelector("[data-md-law]");
  const forbid = document.querySelector("[data-md-forbid]");
  const mdPhrase = document.querySelector("[data-md-phrase]");
  const mdOut = document.querySelector("[data-md-out]");
  const mdStatus = document.querySelector("[data-md-status]");
  if (law && state.law) law.value = state.law;
  if (forbid && state.forbid) forbid.value = state.forbid;
  if (mdOut && state.mdText) mdOut.textContent = state.mdText;
  if (mdStatus && state.mdSealed) mdStatus.textContent = "Mandate sealed. Version A still runs.";
  const mdBtn = document.querySelector("[data-md-btn]");
  if (mdBtn) {
    mdBtn.addEventListener("click", function () {
      const a = law ? law.value.trim() : "";
      const b = forbid ? forbid.value.trim() : "";
      const phrase = mdPhrase ? mdPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "MANDATE THE PAPER") { if (mdStatus) mdStatus.textContent = "Type MANDATE THE PAPER."; return; }
      if (!a || !b) { if (mdStatus) mdStatus.textContent = "Two lines. The law. What stays forbidden."; return; }
      if (banned.test(a + " " + b) || tickerBan.test(a + " " + b)) { if (mdStatus) mdStatus.textContent = "Void. Do not paste keys or seeds."; return; }
      const letter = ["LYNXLOGIX.NET · PAPER MANDATE","Monday 14 September 2026 · 15:16 PDT","law: " + a,"forbidden: " + b,"Coinbase Advanced: DARK","Kraken: DARK","Phantom / Kraken Wallet: DARK","TradingView: paper hook only","CryptoHopper: architecture only","version: A running · B/C paper","10x: process quality, not a promised return","executed: false","sealed: " + new Date().toISOString()].join("\n");
      state.law = a; state.forbid = b; state.mdText = letter; state.mdSealed = true; save();
      if (mdOut) mdOut.textContent = letter;
      if (mdStatus) mdStatus.textContent = "Sealed. Version A still runs the week.";
    });
  }
})();
