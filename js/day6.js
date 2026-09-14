(function () {
  const KEY = "llx.day6.morning";
  const state = JSON.parse(localStorage.getItem(KEY) || "{}");
  const banned = /\b(btc|eth|sol|xbt|usdt|10x|return|profit|addorder|private.key|seed|secret)\b/i;

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  const inherit = document.querySelector("[data-mon-inherit]");
  const itch = document.querySelector("[data-mon-itch]");
  const monPhrase = document.querySelector("[data-mon-phrase]");
  const monOut = document.querySelector("[data-mon-out]");
  const monStatus = document.querySelector("[data-mon-status]");
  if (inherit && state.inherit) inherit.value = state.inherit;
  if (itch && state.itch) itch.value = state.itch;
  if (monOut && state.monText) monOut.textContent = state.monText;
  if (monStatus && state.monSealed) monStatus.textContent = "Monday sealed. First paper ticket may be written.";
  const monBtn = document.querySelector("[data-mon-btn]");
  if (monBtn) {
    monBtn.addEventListener("click", function () {
      const a = inherit ? inherit.value.trim() : "";
      const b = itch ? itch.value.trim() : "";
      const phrase = monPhrase ? monPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "OPEN THE MONDAY") {
        if (monStatus) monStatus.textContent = "Type OPEN THE MONDAY.";
        return;
      }
      if (!a || !b) {
        if (monStatus) monStatus.textContent = "Two lines. Inherit. Itch.";
        return;
      }
      if (banned.test(a + " " + b)) {
        if (monStatus) monStatus.textContent = "Void. Monday is a clock, not a ticker.";
        return;
      }
      const book = [
        "LYNXLOGIX.NET · MONDAY OPEN",
        "Monday 14 September 2026 · 09:29 PDT",
        "inherits: " + a,
        "first itch: " + b,
        "version: A running · B/C paper",
        "week tickets cap: paper only",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.inherit = a;
      state.itch = b;
      state.monText = book;
      state.monSealed = true;
      save();
      if (monOut) monOut.textContent = book;
      if (monStatus) monStatus.textContent = "Sealed. Carry to /atelier.html.";
    });
  }

  const guest = document.querySelector("[data-at-guest]");
  const fit = document.querySelector("[data-at-fit]");
  const atPhrase = document.querySelector("[data-at-phrase]");
  const atOut = document.querySelector("[data-at-out]");
  const atStatus = document.querySelector("[data-at-status]");
  if (guest && state.guest) guest.value = state.guest;
  if (fit && state.fit) fit.value = state.fit;
  if (atOut && state.atText) atOut.textContent = state.atText;
  if (atStatus && state.atSealed) atStatus.textContent = "Atelier sealed. Coins stay off the fitting.";
  const atBtn = document.querySelector("[data-at-btn]");
  if (atBtn) {
    atBtn.addEventListener("click", function () {
      const a = guest ? guest.value.trim() : "";
      const b = fit ? fit.value.trim() : "";
      const phrase = atPhrase ? atPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "SEAT THE ATELIER") {
        if (atStatus) atStatus.textContent = "Type SEAT THE ATELIER.";
        return;
      }
      if (!a || !b) {
        if (atStatus) atStatus.textContent = "Two lines. Who is fitted. What is fitted.";
        return;
      }
      if (banned.test(a + " " + b)) {
        if (atStatus) atStatus.textContent = "Void. No coins on the fitting.";
        return;
      }
      const card = [
        "LYNXLOGIX.NET · PATRON ATELIER",
        "Monday 14 September 2026 · 09:29 PDT",
        "fitted: " + a,
        "garment: " + b,
        "product: Mangasm+",
        "coins sold: none",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.guest = a;
      state.fit = b;
      state.atText = card;
      state.atSealed = true;
      save();
      if (atOut) atOut.textContent = card;
      if (atStatus) atStatus.textContent = "Sealed. Carry to /sleeve.html.";
    });
  }

  const sit = document.querySelector("[data-sl-sit]");
  const dark = document.querySelector("[data-sl-dark]");
  const slPhrase = document.querySelector("[data-sl-phrase]");
  const slOut = document.querySelector("[data-sl-out]");
  const slStatus = document.querySelector("[data-sl-status]");
  if (sit && state.sit) sit.value = state.sit;
  if (dark && state.dark) dark.value = state.dark;
  if (slOut && state.slText) slOut.textContent = state.slText;
  if (slStatus && state.slSealed) slStatus.textContent = "Sleeve chartered. Live venues stay dark.";
  const slBtn = document.querySelector("[data-sl-btn]");
  if (slBtn) {
    slBtn.addEventListener("click", function () {
      const a = sit ? sit.value.trim() : "";
      const b = dark ? dark.value.trim() : "";
      const phrase = slPhrase ? slPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "CHARTER THE SLEEVE") {
        if (slStatus) slStatus.textContent = "Type CHARTER THE SLEEVE.";
        return;
      }
      if (!a || !b) {
        if (slStatus) slStatus.textContent = "Two lines. Who sits. What stays dark.";
        return;
      }
      if (banned.test(a + " " + b)) {
        if (slStatus) slStatus.textContent = "Void. Do not paste keys or tickers.";
        return;
      }
      const letter = [
        "LYNXLOGIX.NET · SLEEVE CHARTER",
        "Monday 14 September 2026 · 09:29 PDT",
        "seated: " + a,
        "dark: " + b,
        "orchestra: Ingestor, Regime, Veto, Sizer, Scribe, Advocate, Compliance, Liaison, Night watch, Journal",
        "this week seated: Scribe · Veto · Liaison",
        "venues live: none",
        "repos: lynxlogix-net · house-landings · lynxlogix-house",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.sit = a;
      state.dark = b;
      state.slText = letter;
      state.slSealed = true;
      save();
      if (slOut) slOut.textContent = letter;
      if (slStatus) slStatus.textContent = "Sealed. Version A runs the week.";
    });
  }
})();
