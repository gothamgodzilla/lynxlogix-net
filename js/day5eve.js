(function () {
  const KEY = "llx.day5.eve";
  const state = JSON.parse(localStorage.getItem(KEY) || "{}");
  const banned = /\b(btc|eth|sol|xbt|usdt|10x|return|profit|addorder|private.key|seed|secret)\b/i;

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  const dark = document.querySelector("[data-compline-dark]");
  const itch = document.querySelector("[data-compline-itch]");
  const complinePhrase = document.querySelector("[data-compline-phrase]");
  const complineOut = document.querySelector("[data-compline-out]");
  const complineStatus = document.querySelector("[data-compline-status]");
  if (dark && state.dark) dark.value = state.dark;
  if (itch && state.itch) itch.value = state.itch;
  if (complineOut && state.complineText) complineOut.textContent = state.complineText;
  if (complineStatus && state.complineSealed) {
    complineStatus.textContent = "Compline sealed. Desk stays dark.";
  }
  const complineBtn = document.querySelector("[data-compline-btn]");
  if (complineBtn) {
    complineBtn.addEventListener("click", function () {
      const a = dark ? dark.value.trim() : "";
      const b = itch ? itch.value.trim() : "";
      const phrase = complinePhrase ? complinePhrase.value.trim().toUpperCase() : "";
      if (phrase !== "KEEP THE COMPLINE") {
        if (complineStatus) complineStatus.textContent = "Type KEEP THE COMPLINE.";
        return;
      }
      if (!a || !b) {
        if (complineStatus) complineStatus.textContent = "Two lines. What is dark. What tried to reopen.";
        return;
      }
      if (banned.test(a + " " + b)) {
        if (complineStatus) complineStatus.textContent = "Void. Compline is a clock, not a ticker.";
        return;
      }
      const book = [
        "LYNXLOGIX.NET · COMPLINE BOARD",
        "Sunday 13 September 2026 · 15:06 PDT",
        "still dark: " + a,
        "tried to reopen: " + b,
        "version: A running · B/C paper",
        "sunday tickets: 0",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.dark = a;
      state.itch = b;
      state.complineText = book;
      state.complineSealed = true;
      state.complineAt = new Date().toISOString();
      save();
      if (complineOut) complineOut.textContent = book;
      if (complineStatus) complineStatus.textContent = "Sealed. Carry to /salon.html.";
    });
  }

  const guest = document.querySelector("[data-salon-guest]");
  const offer = document.querySelector("[data-salon-offer]");
  const salonPhrase = document.querySelector("[data-salon-phrase]");
  const salonOut = document.querySelector("[data-salon-out]");
  const salonStatus = document.querySelector("[data-salon-status]");
  if (guest && state.guest) guest.value = state.guest;
  if (offer && state.offer) offer.value = state.offer;
  if (salonOut && state.salonText) salonOut.textContent = state.salonText;
  if (salonStatus && state.salonSealed) {
    salonStatus.textContent = "Salon sealed. Coins stay off the table.";
  }
  const salonBtn = document.querySelector("[data-salon-btn]");
  if (salonBtn) {
    salonBtn.addEventListener("click", function () {
      const a = guest ? guest.value.trim() : "";
      const b = offer ? offer.value.trim() : "";
      const phrase = salonPhrase ? salonPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "SEAT THE SALON") {
        if (salonStatus) salonStatus.textContent = "Type SEAT THE SALON.";
        return;
      }
      if (!a || !b) {
        if (salonStatus) salonStatus.textContent = "Two lines. Who sits. What the house offers.";
        return;
      }
      if (banned.test(a + " " + b)) {
        if (salonStatus) salonStatus.textContent = "Void. No coins on the table.";
        return;
      }
      const card = [
        "LYNXLOGIX.NET · EVENING SALON",
        "Sunday 13 September 2026 · 15:06 PDT",
        "sits: " + a,
        "offer: " + b,
        "product: Mangasm+",
        "coins sold: none",
        "sunday tickets: 0",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.guest = a;
      state.offer = b;
      state.salonText = card;
      state.salonSealed = true;
      state.salonAt = new Date().toISOString();
      save();
      if (salonOut) salonOut.textContent = card;
      if (salonStatus) salonStatus.textContent = "Sealed. Carry to /preview.html.";
    });
  }

  const inherit = document.querySelector("[data-preview-inherit]");
  const drawer = document.querySelector("[data-preview-drawer]");
  const previewPhrase = document.querySelector("[data-preview-phrase]");
  const previewOut = document.querySelector("[data-preview-out]");
  const previewStatus = document.querySelector("[data-preview-status]");
  if (inherit && state.inherit) inherit.value = state.inherit;
  if (drawer && state.drawer) drawer.value = state.drawer;
  if (previewOut && state.previewText) previewOut.textContent = state.previewText;
  if (previewStatus && state.previewSealed) {
    previewStatus.textContent = "Preview sealed. No ticket fired.";
  }
  const previewBtn = document.querySelector("[data-preview-btn]");
  if (previewBtn) {
    previewBtn.addEventListener("click", function () {
      const a = inherit ? inherit.value.trim() : "";
      const b = drawer ? drawer.value.trim() : "";
      const phrase = previewPhrase ? previewPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "PREVIEW THE NIGHT") {
        if (previewStatus) previewStatus.textContent = "Type PREVIEW THE NIGHT.";
        return;
      }
      if (!a || !b) {
        if (previewStatus) previewStatus.textContent = "Two lines. Monday inherit. Drawer.";
        return;
      }
      if (banned.test(a + " " + b)) {
        if (previewStatus) previewStatus.textContent = "Void. A preview is not a ticker.";
        return;
      }
      const letter = [
        "LYNXLOGIX.NET · NIGHT PREVIEW",
        "Sunday 13 September 2026 · 15:06 PDT",
        "monday inherits: " + a,
        "drawer: " + b,
        "repos: lynxlogix-net · house-landings · lynxlogix-house",
        "superclaude / opencode: brainstorm only inside the house",
        "sunday tickets: 0",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.inherit = a;
      state.drawer = b;
      state.previewText = letter;
      state.previewSealed = true;
      state.previewAt = new Date().toISOString();
      save();
      if (previewOut) previewOut.textContent = letter;
      if (previewStatus) previewStatus.textContent = "Sealed. Rest. Monday inherits a previewed night.";
    });
  }
})();
