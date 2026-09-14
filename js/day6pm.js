(function () {
  const KEY = "llx.day6.pm";
  const state = JSON.parse(localStorage.getItem(KEY) || "{}");
  const banned = /\b(addorder|private.key|seed|secret|mnemonic|withdraw|transfer)\b/i;
  const tickerBan = /\b(10x return|guaranteed|risk.?free)\b/i;

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  const first = document.querySelector("[data-sc-first]");
  const why = document.querySelector("[data-sc-why]");
  const scPhrase = document.querySelector("[data-sc-phrase]");
  const scOut = document.querySelector("[data-sc-out]");
  const scStatus = document.querySelector("[data-sc-status]");
  if (first && state.first) first.value = state.first;
  if (why && state.why) why.value = state.why;
  if (scOut && state.scText) scOut.textContent = state.scText;
  if (scStatus && state.scSealed) scStatus.textContent = "Second law sealed. executed: false.";
  const scBtn = document.querySelector("[data-sc-btn]");
  if (scBtn) {
    scBtn.addEventListener("click", function () {
      const a = first ? first.value.trim() : "";
      const b = why ? why.value.trim() : "";
      const phrase = scPhrase ? scPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "HOLD THE SECOND") {
        if (scStatus) scStatus.textContent = "Type HOLD THE SECOND.";
        return;
      }
      if (!a || !b) {
        if (scStatus) scStatus.textContent = "Two lines. First ticket. Why the second stays dark.";
        return;
      }
      if (banned.test(a + " " + b) || tickerBan.test(a + " " + b)) {
        if (scStatus) scStatus.textContent = "Void. No keys. No promised return.";
        return;
      }
      const book = [
        "LYNXLOGIX.NET · SECOND TICKET LAW",
        "Monday 14 September 2026 · 13:01 PDT",
        "first still is: " + a,
        "second stays dark because: " + b,
        "version: A running · B/C paper",
        "monday cap: first paper ticket already named",
        "venue live: none",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.first = a;
      state.why = b;
      state.scText = book;
      state.scSealed = true;
      save();
      if (scOut) scOut.textContent = book;
      if (scStatus) scStatus.textContent = "Sealed. Carry to /gallery.html.";
    });
  }

  const who = document.querySelector("[data-gy-who]");
  const piece = document.querySelector("[data-gy-piece]");
  const gyPhrase = document.querySelector("[data-gy-phrase]");
  const gyOut = document.querySelector("[data-gy-out]");
  const gyStatus = document.querySelector("[data-gy-status]");
  if (who && state.who) who.value = state.who;
  if (piece && state.piece) piece.value = state.piece;
  if (gyOut && state.gyText) gyOut.textContent = state.gyText;
  if (gyStatus && state.gySealed) gyStatus.textContent = "Gallery sealed. Coins stay off the wall.";
  const gyBtn = document.querySelector("[data-gy-btn]");
  if (gyBtn) {
    gyBtn.addEventListener("click", function () {
      const a = who ? who.value.trim() : "";
      const b = piece ? piece.value.trim() : "";
      const phrase = gyPhrase ? gyPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "OPEN THE GALLERY") {
        if (gyStatus) gyStatus.textContent = "Type OPEN THE GALLERY.";
        return;
      }
      if (!a || !b) {
        if (gyStatus) gyStatus.textContent = "Two lines. Who walks. What hangs.";
        return;
      }
      if (banned.test(a + " " + b) || tickerBan.test(a + " " + b)) {
        if (gyStatus) gyStatus.textContent = "Void. No coins on the gallery wall.";
        return;
      }
      const card = [
        "LYNXLOGIX.NET · PATRON GALLERY",
        "Monday 14 September 2026 · 13:01 PDT",
        "walker: " + a,
        "piece: " + b,
        "product: Mangasm+",
        "door: https://www.mangasm.app/plus",
        "coins sold: none",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.who = a;
      state.piece = b;
      state.gyText = card;
      state.gySealed = true;
      save();
      if (gyOut) gyOut.textContent = card;
      if (gyStatus) gyStatus.textContent = "Sealed. Carry to /drill.html.";
    });
  }

  const call = document.querySelector("[data-dr-call]");
  const human = document.querySelector("[data-dr-human]");
  const drPhrase = document.querySelector("[data-dr-phrase]");
  const drOut = document.querySelector("[data-dr-out]");
  const drStatus = document.querySelector("[data-dr-status]");
  if (call && state.call) call.value = state.call;
  if (human && state.human) human.value = state.human;
  if (drOut && state.drText) drOut.textContent = state.drText;
  if (drStatus && state.drSealed) drStatus.textContent = "Drill sealed. Live venues stay dark.";
  const drBtn = document.querySelector("[data-dr-btn]");
  if (drBtn) {
    drBtn.addEventListener("click", function () {
      const a = call ? call.value.trim() : "";
      const b = human ? human.value.trim() : "";
      const phrase = drPhrase ? drPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "DRILL THE GATE") {
        if (drStatus) drStatus.textContent = "Type DRILL THE GATE.";
        return;
      }
      if (!a || !b) {
        if (drStatus) drStatus.textContent = "Two lines. Trio speech. Human act.";
        return;
      }
      if (banned.test(a + " " + b) || tickerBan.test(a + " " + b)) {
        if (drStatus) drStatus.textContent = "Void. Do not paste keys or seeds.";
        return;
      }
      const letter = [
        "LYNXLOGIX.NET · HUMAN GATE DRILL",
        "Monday 14 September 2026 · 13:01 PDT",
        "seated trio would say: " + a,
        "only the human may: " + b,
        "seated: Scribe · Veto · Liaison",
        "standing: Ingestor · Regime · Sizer · Devil · Compliance · Night watch · Journal",
        "version: A running · B/C paper",
        "venues: Coinbase Advanced · Kraken · Phantom · Hopper — dark",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.call = a;
      state.human = b;
      state.drText = letter;
      state.drSealed = true;
      save();
      if (drOut) drOut.textContent = letter;
      if (drStatus) drStatus.textContent = "Sealed. Version A still runs the week.";
    });
  }
})();
