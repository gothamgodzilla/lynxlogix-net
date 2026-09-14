(function () {
  const KEY = "llx.day6.noon";
  const state = JSON.parse(localStorage.getItem(KEY) || "{}");
  const banned = /\b(addorder|create.?order|private.key|seed|secret|mnemonic|withdraw|transfer)\b/i;
  const tickerBan = /\b(10x return|guaranteed|risk.?free)\b/i;

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  const carry = document.querySelector("[data-md-carry]");
  const hold = document.querySelector("[data-md-hold]");
  const mdPhrase = document.querySelector("[data-md-phrase]");
  const mdOut = document.querySelector("[data-md-out]");
  const mdStatus = document.querySelector("[data-md-status]");
  if (carry && state.carry) carry.value = state.carry;
  if (hold && state.hold) hold.value = state.hold;
  if (mdOut && state.mdText) mdOut.textContent = state.mdText;
  if (mdStatus && state.mdSealed) mdStatus.textContent = "Midday held. executed: false.";
  const mdBtn = document.querySelector("[data-md-btn]");
  if (mdBtn) {
    mdBtn.addEventListener("click", function () {
      const a = carry ? carry.value.trim() : "";
      const b = hold ? hold.value.trim() : "";
      const phrase = mdPhrase ? mdPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "HOLD THE MIDDAY") {
        if (mdStatus) mdStatus.textContent = "Type HOLD THE MIDDAY.";
        return;
      }
      if (!a || !b) {
        if (mdStatus) mdStatus.textContent = "Two lines. What morning sealed. Why noon stays paper.";
        return;
      }
      if (banned.test(a + " " + b) || tickerBan.test(a + " " + b)) {
        if (mdStatus) mdStatus.textContent = "Void. No keys. No promised return.";
        return;
      }
      const book = [
        "LYNXLOGIX.NET · MIDDAY RECEIPT",
        "Monday 14 September 2026 · 12:17 PDT",
        "morning carried: " + a,
        "noon holds because: " + b,
        "version: A running · B/C paper",
        "hook: POST /api/hook?key=paper",
        "venue live: none",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.carry = a;
      state.hold = b;
      state.mdText = book;
      state.mdSealed = true;
      save();
      if (mdOut) mdOut.textContent = book;
      if (mdStatus) mdStatus.textContent = "Sealed. Carry to /luncheon.html.";
    });
  }

  const guest = document.querySelector("[data-ln-guest]");
  const garment = document.querySelector("[data-ln-garment]");
  const lnPhrase = document.querySelector("[data-ln-phrase]");
  const lnOut = document.querySelector("[data-ln-out]");
  const lnStatus = document.querySelector("[data-ln-status]");
  if (guest && state.guest) guest.value = state.guest;
  if (garment && state.garment) garment.value = state.garment;
  if (lnOut && state.lnText) lnOut.textContent = state.lnText;
  if (lnStatus && state.lnSealed) lnStatus.textContent = "Luncheon seated. Coins stay off the table.";
  const lnBtn = document.querySelector("[data-ln-btn]");
  if (lnBtn) {
    lnBtn.addEventListener("click", function () {
      const a = guest ? guest.value.trim() : "";
      const b = garment ? garment.value.trim() : "";
      const phrase = lnPhrase ? lnPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "SEAT THE LUNCHEON") {
        if (lnStatus) lnStatus.textContent = "Type SEAT THE LUNCHEON.";
        return;
      }
      if (!a || !b) {
        if (lnStatus) lnStatus.textContent = "Two lines. Who sits. What is served.";
        return;
      }
      if (banned.test(a + " " + b) || tickerBan.test(a + " " + b)) {
        if (lnStatus) lnStatus.textContent = "Void. No coins on the luncheon.";
        return;
      }
      const card = [
        "LYNXLOGIX.NET · PATRON LUNCHEON",
        "Monday 14 September 2026 · 12:17 PDT",
        "seated: " + a,
        "served: " + b,
        "sales door: https://www.mangasm.app/plus",
        "house door: /pay.html",
        "coins sold: none",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.guest = a;
      state.garment = b;
      state.lnText = card;
      state.lnSealed = true;
      save();
      if (lnOut) lnOut.textContent = card;
      if (lnStatus) lnStatus.textContent = "Sealed. Carry to /tenvoices.html.";
    });
  }

  const sit = document.querySelector("[data-tv-sit]");
  const dark = document.querySelector("[data-tv-dark]");
  const tvPhrase = document.querySelector("[data-tv-phrase]");
  const tvOut = document.querySelector("[data-tv-out]");
  const tvStatus = document.querySelector("[data-tv-status]");
  if (sit && state.sit) sit.value = state.sit;
  if (dark && state.dark) dark.value = state.dark;
  if (tvOut && state.tvText) tvOut.textContent = state.tvText;
  if (tvStatus && state.tvSealed) tvStatus.textContent = "Ten named. Three seated. Keys stay dark.";
  const tvBtn = document.querySelector("[data-tv-btn]");
  if (tvBtn) {
    tvBtn.addEventListener("click", function () {
      const a = sit ? sit.value.trim() : "";
      const b = dark ? dark.value.trim() : "";
      const phrase = tvPhrase ? tvPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "NAME THE TEN") {
        if (tvStatus) tvStatus.textContent = "Type NAME THE TEN.";
        return;
      }
      if (!a || !b) {
        if (tvStatus) tvStatus.textContent = "Two lines. Who sits. Who stands.";
        return;
      }
      if (banned.test(a + " " + b) || tickerBan.test(a + " " + b)) {
        if (tvStatus) tvStatus.textContent = "Void. Do not paste keys or live order verbs.";
        return;
      }
      const letter = [
        "LYNXLOGIX.NET · TEN VOICES",
        "Monday 14 September 2026 · 12:17 PDT",
        "seated: " + a,
        "standing: " + b,
        "orchestra: Ingestor, Regime, Veto, Sizer, Scribe, Advocate, Compliance, Liaison, Night watch, Journal",
        "this week seated: Scribe · Veto · Liaison",
        "venues live: none",
        "repos: lynxlogix-net · house-landings · lynxlogix-house",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.sit = a;
      state.dark = b;
      state.tvText = letter;
      state.tvSealed = true;
      save();
      if (tvOut) tvOut.textContent = letter;
      if (tvStatus) tvStatus.textContent = "Sealed. Version A still runs the week.";
    });
  }
})();
