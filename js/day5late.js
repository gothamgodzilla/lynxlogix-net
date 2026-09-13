(function () {
  const KEY = "llx.day5.late";
  const state = JSON.parse(localStorage.getItem(KEY) || "{}");
  const banned = /\b(btc|eth|sol|xbt|usdt|10x|return|profit|addorder|private.key|seed|secret)\b/i;

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  const dark = document.querySelector("[data-vespers-dark]");
  const itch = document.querySelector("[data-vespers-itch]");
  const vespersPhrase = document.querySelector("[data-vespers-phrase]");
  const vespersOut = document.querySelector("[data-vespers-out]");
  const vespersStatus = document.querySelector("[data-vespers-status]");
  if (dark && state.dark) dark.value = state.dark;
  if (itch && state.itch) itch.value = state.itch;
  if (vespersOut && state.vespersText) vespersOut.textContent = state.vespersText;
  if (vespersStatus && state.vespersSealed) {
    vespersStatus.textContent = "Vespers sealed. Desk stays dark.";
  }
  const vespersBtn = document.querySelector("[data-vespers-btn]");
  if (vespersBtn) {
    vespersBtn.addEventListener("click", function () {
      const a = dark ? dark.value.trim() : "";
      const b = itch ? itch.value.trim() : "";
      const phrase = vespersPhrase ? vespersPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "KEEP THE VESPERS") {
        if (vespersStatus) vespersStatus.textContent = "Type KEEP THE VESPERS.";
        return;
      }
      if (!a || !b) {
        if (vespersStatus) vespersStatus.textContent = "Two lines. What is dark. What tried to reopen.";
        return;
      }
      if (banned.test(a + " " + b)) {
        if (vespersStatus) vespersStatus.textContent = "Void. Vespers is a clock, not a ticker.";
        return;
      }
      const book = [
        "LYNXLOGIX.NET · VESPERS BOARD",
        "Sunday 13 September 2026 · 14:09 PDT",
        "still dark: " + a,
        "tried to reopen: " + b,
        "version: A running · B/C paper",
        "sunday tickets: 0",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.dark = a;
      state.itch = b;
      state.vespersText = book;
      state.vespersSealed = true;
      state.vespersAt = new Date().toISOString();
      save();
      if (vespersOut) vespersOut.textContent = book;
      if (vespersStatus) vespersStatus.textContent = "Sealed. Carry to /correspondence.html.";
    });
  }

  const who = document.querySelector("[data-letter-who]");
  const offer = document.querySelector("[data-letter-offer]");
  const letterPhrase = document.querySelector("[data-letter-phrase]");
  const letterOut = document.querySelector("[data-letter-out]");
  const letterStatus = document.querySelector("[data-letter-status]");
  if (who && state.who) who.value = state.who;
  if (offer && state.offer) offer.value = state.offer;
  if (letterOut && state.letterText) letterOut.textContent = state.letterText;
  if (letterStatus && state.letterSealed) {
    letterStatus.textContent = "Letter sealed. Coins stay out of the envelope.";
  }
  const letterBtn = document.querySelector("[data-letter-btn]");
  if (letterBtn) {
    letterBtn.addEventListener("click", function () {
      const a = who ? who.value.trim() : "";
      const b = offer ? offer.value.trim() : "";
      const phrase = letterPhrase ? letterPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "WRITE THE HOUSE") {
        if (letterStatus) letterStatus.textContent = "Type WRITE THE HOUSE.";
        return;
      }
      if (!a || !b) {
        if (letterStatus) letterStatus.textContent = "Two lines. Who. What the house offers.";
        return;
      }
      if (banned.test(a + " " + b)) {
        if (letterStatus) letterStatus.textContent = "Void. No coins in the envelope.";
        return;
      }
      const card = [
        "LYNXLOGIX.NET · PATRON CORRESPONDENCE",
        "Sunday 13 September 2026 · 14:09 PDT",
        "receives: " + a,
        "offer: " + b,
        "product: Mangasm+",
        "coins sold: none",
        "sunday tickets: 0",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.who = a;
      state.offer = b;
      state.letterText = card;
      state.letterSealed = true;
      state.letterAt = new Date().toISOString();
      save();
      if (letterOut) letterOut.textContent = card;
      if (letterStatus) letterStatus.textContent = "Sealed. Carry to /inventory.html.";
    });
  }

  const alive = document.querySelector("[data-inventory-alive]");
  const refuse = document.querySelector("[data-inventory-refuse]");
  const inventoryPhrase = document.querySelector("[data-inventory-phrase]");
  const inventoryOut = document.querySelector("[data-inventory-out]");
  const inventoryStatus = document.querySelector("[data-inventory-status]");
  if (alive && state.alive) alive.value = state.alive;
  if (refuse && state.refuse) refuse.value = state.refuse;
  if (inventoryOut && state.inventoryText) inventoryOut.textContent = state.inventoryText;
  if (inventoryStatus && state.inventorySealed) {
    inventoryStatus.textContent = "Inventory sealed. Three doors. No fourth.";
  }
  const inventoryBtn = document.querySelector("[data-inventory-btn]");
  if (inventoryBtn) {
    inventoryBtn.addEventListener("click", function () {
      const a = alive ? alive.value.trim() : "";
      const b = refuse ? refuse.value.trim() : "";
      const phrase = inventoryPhrase ? inventoryPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "COUNT THE DESK") {
        if (inventoryStatus) inventoryStatus.textContent = "Type COUNT THE DESK.";
        return;
      }
      if (!a || !b) {
        if (inventoryStatus) inventoryStatus.textContent = "Two lines. What is alive. What must not open.";
        return;
      }
      if (banned.test(a + " " + b)) {
        if (inventoryStatus) inventoryStatus.textContent = "Void. The count is a leash, not a ticker.";
        return;
      }
      const letter = [
        "LYNXLOGIX.NET · DESK INVENTORY",
        "Sunday 13 September 2026 · 14:09 PDT",
        "alive: " + a,
        "must not open: " + b,
        "repos: lynxlogix-net · house-landings · lynxlogix-house",
        "superclaude / opencode: brainstorm only inside the house",
        "sunday tickets: 0",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.alive = a;
      state.refuse = b;
      state.inventoryText = letter;
      state.inventorySealed = true;
      state.inventoryAt = new Date().toISOString();
      save();
      if (inventoryOut) inventoryOut.textContent = letter;
      if (inventoryStatus) inventoryStatus.textContent = "Sealed. Rest. Monday inherits a counted desk.";
    });
  }
})();
