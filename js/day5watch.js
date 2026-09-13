(function () {
  const KEY = "llx.day5.watch";
  const state = JSON.parse(localStorage.getItem(KEY) || "{}");
  const banned = /\b(btc|eth|sol|xbt|usdt|10x|return|profit|addorder|private.key|seed|secret)\b/i;

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  const sealed = document.querySelector("[data-still-sealed]");
  const itch = document.querySelector("[data-still-itch]");
  const stillPhrase = document.querySelector("[data-still-phrase]");
  const stillOut = document.querySelector("[data-still-out]");
  const stillStatus = document.querySelector("[data-still-status]");
  if (sealed && state.sealed) sealed.value = state.sealed;
  if (itch && state.itch) itch.value = state.itch;
  if (stillOut && state.stillText) stillOut.textContent = state.stillText;
  if (stillStatus && state.stillSealed) {
    stillStatus.textContent = "Stillness sealed. Desk stays dark.";
  }
  const stillBtn = document.querySelector("[data-still-btn]");
  if (stillBtn) {
    stillBtn.addEventListener("click", function () {
      const a = sealed ? sealed.value.trim() : "";
      const b = itch ? itch.value.trim() : "";
      const phrase = stillPhrase ? stillPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "KEEP THE STILLNESS") {
        if (stillStatus) stillStatus.textContent = "Type KEEP THE STILLNESS.";
        return;
      }
      if (!a || !b) {
        if (stillStatus) stillStatus.textContent = "Two lines. What remains sealed. What arrived after 15:06.";
        return;
      }
      if (banned.test(a + " " + b)) {
        if (stillStatus) stillStatus.textContent = "Void. Stillness is a clock, not a ticker.";
        return;
      }
      const book = [
        "LYNXLOGIX.NET · STILLNESS BOARD",
        "Sunday 13 September 2026 · 16:01 PDT",
        "remains sealed: " + a,
        "arrived after 15:06: " + b,
        "version: A running · B/C paper",
        "sunday tickets: 0",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.sealed = a;
      state.itch = b;
      state.stillText = book;
      state.stillSealed = true;
      state.stillAt = new Date().toISOString();
      save();
      if (stillOut) stillOut.textContent = book;
      if (stillStatus) stillStatus.textContent = "Sealed. Carry to /table.html.";
    });
  }

  const guest = document.querySelector("[data-table-guest]");
  const offer = document.querySelector("[data-table-offer]");
  const tablePhrase = document.querySelector("[data-table-phrase]");
  const tableOut = document.querySelector("[data-table-out]");
  const tableStatus = document.querySelector("[data-table-status]");
  if (guest && state.guest) guest.value = state.guest;
  if (offer && state.offer) offer.value = state.offer;
  if (tableOut && state.tableText) tableOut.textContent = state.tableText;
  if (tableStatus && state.tableSealed) {
    tableStatus.textContent = "Table sealed. Coins stay off the linen.";
  }
  const tableBtn = document.querySelector("[data-table-btn]");
  if (tableBtn) {
    tableBtn.addEventListener("click", function () {
      const a = guest ? guest.value.trim() : "";
      const b = offer ? offer.value.trim() : "";
      const phrase = tablePhrase ? tablePhrase.value.trim().toUpperCase() : "";
      if (phrase !== "SET THE TABLE") {
        if (tableStatus) tableStatus.textContent = "Type SET THE TABLE.";
        return;
      }
      if (!a || !b) {
        if (tableStatus) tableStatus.textContent = "Two lines. Who sits. What the house offers.";
        return;
      }
      if (banned.test(a + " " + b)) {
        if (tableStatus) tableStatus.textContent = "Void. No coins on the table.";
        return;
      }
      const card = [
        "LYNXLOGIX.NET · PATRON TABLE",
        "Sunday 13 September 2026 · 16:01 PDT",
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
      state.tableText = card;
      state.tableSealed = true;
      state.tableAt = new Date().toISOString();
      save();
      if (tableOut) tableOut.textContent = card;
      if (tableStatus) tableStatus.textContent = "Sealed. Carry to /drawer.html.";
    });
  }

  const held = document.querySelector("[data-drawer-held]");
  const house = document.querySelector("[data-drawer-house]");
  const drawerPhrase = document.querySelector("[data-drawer-phrase]");
  const drawerOut = document.querySelector("[data-drawer-out]");
  const drawerStatus = document.querySelector("[data-drawer-status]");
  if (held && state.held) held.value = state.held;
  if (house && state.house) house.value = state.house;
  if (drawerOut && state.drawerText) drawerOut.textContent = state.drawerText;
  if (drawerStatus && state.drawerSealed) {
    drawerStatus.textContent = "Drawer locked. Keys stay dark.";
  }
  const drawerBtn = document.querySelector("[data-drawer-btn]");
  if (drawerBtn) {
    drawerBtn.addEventListener("click", function () {
      const a = held ? held.value.trim() : "";
      const b = house ? house.value.trim() : "";
      const phrase = drawerPhrase ? drawerPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "LOCK THE DRAWER") {
        if (drawerStatus) drawerStatus.textContent = "Type LOCK THE DRAWER.";
        return;
      }
      if (!a || !b) {
        if (drawerStatus) drawerStatus.textContent = "Two lines. Drawer. House.";
        return;
      }
      if (banned.test(a + " " + b)) {
        if (drawerStatus) drawerStatus.textContent = "Void. Do not paste keys or tickers.";
        return;
      }
      const letter = [
        "LYNXLOGIX.NET · DRAWER LOCK",
        "Sunday 13 September 2026 · 16:01 PDT",
        "drawer: " + a,
        "house: " + b,
        "repos: lynxlogix-net · house-landings · lynxlogix-house",
        "venues live: none",
        "superclaude / opencode: brainstorm only inside the house",
        "sunday tickets: 0",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.held = a;
      state.house = b;
      state.drawerText = letter;
      state.drawerSealed = true;
      state.drawerAt = new Date().toISOString();
      save();
      if (drawerOut) drawerOut.textContent = letter;
      if (drawerStatus) drawerStatus.textContent = "Sealed. Rest. Monday inherits a locked drawer.";
    });
  }
})();
