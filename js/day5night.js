(function () {
  const KEY = "llx.day5.night";
  const state = JSON.parse(localStorage.getItem(KEY) || "{}");
  const banned = /\b(btc|eth|sol|xbt|usdt|10x|return|profit|addorder|private.key|seed|secret)\b/i;

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  const keep = document.querySelector("[data-eve-keep]");
  const itch = document.querySelector("[data-eve-itch]");
  const evePhrase = document.querySelector("[data-eve-phrase]");
  const eveOut = document.querySelector("[data-eve-out]");
  const eveStatus = document.querySelector("[data-eve-status]");
  if (keep && state.keep) keep.value = state.keep;
  if (itch && state.itch) itch.value = state.itch;
  if (eveOut && state.eveText) eveOut.textContent = state.eveText;
  if (eveStatus && state.eveSealed) {
    eveStatus.textContent = "Evening sealed. Desk stays dark.";
  }
  const eveBtn = document.querySelector("[data-eve-btn]");
  if (eveBtn) {
    eveBtn.addEventListener("click", function () {
      const a = keep ? keep.value.trim() : "";
      const b = itch ? itch.value.trim() : "";
      const phrase = evePhrase ? evePhrase.value.trim().toUpperCase() : "";
      if (phrase !== "HOLD THE EVENING") {
        if (eveStatus) eveStatus.textContent = "Type HOLD THE EVENING.";
        return;
      }
      if (!a || !b) {
        if (eveStatus) eveStatus.textContent = "Two lines. What the watch keeps. What arrived after 16:01.";
        return;
      }
      if (banned.test(a + " " + b)) {
        if (eveStatus) eveStatus.textContent = "Void. Evening is a clock, not a ticker.";
        return;
      }
      const book = [
        "LYNXLOGIX.NET · EVENING WATCH",
        "Sunday 13 September 2026 · 17:18 PDT",
        "watch keeps: " + a,
        "arrived after 16:01: " + b,
        "version: A running · B/C paper",
        "sunday tickets: 0",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.keep = a;
      state.itch = b;
      state.eveText = book;
      state.eveSealed = true;
      state.eveAt = new Date().toISOString();
      save();
      if (eveOut) eveOut.textContent = book;
      if (eveStatus) eveStatus.textContent = "Sealed. Carry to /carriage.html.";
    });
  }

  const guest = document.querySelector("[data-car-guest]");
  const offer = document.querySelector("[data-car-offer]");
  const carPhrase = document.querySelector("[data-car-phrase]");
  const carOut = document.querySelector("[data-car-out]");
  const carStatus = document.querySelector("[data-car-status]");
  if (guest && state.guest) guest.value = state.guest;
  if (offer && state.offer) offer.value = state.offer;
  if (carOut && state.carText) carOut.textContent = state.carText;
  if (carStatus && state.carSealed) {
    carStatus.textContent = "Carriage sealed. Coins stay off the seat.";
  }
  const carBtn = document.querySelector("[data-car-btn]");
  if (carBtn) {
    carBtn.addEventListener("click", function () {
      const a = guest ? guest.value.trim() : "";
      const b = offer ? offer.value.trim() : "";
      const phrase = carPhrase ? carPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "SEND THE CARRIAGE") {
        if (carStatus) carStatus.textContent = "Type SEND THE CARRIAGE.";
        return;
      }
      if (!a || !b) {
        if (carStatus) carStatus.textContent = "Two lines. Who rides. What the house offers.";
        return;
      }
      if (banned.test(a + " " + b)) {
        if (carStatus) carStatus.textContent = "Void. No coins on the seat.";
        return;
      }
      const card = [
        "LYNXLOGIX.NET · PATRON CARRIAGE",
        "Sunday 13 September 2026 · 17:18 PDT",
        "rides: " + a,
        "offer: " + b,
        "product: Mangasm+",
        "coins sold: none",
        "sunday tickets: 0",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.guest = a;
      state.offer = b;
      state.carText = card;
      state.carSealed = true;
      state.carAt = new Date().toISOString();
      save();
      if (carOut) carOut.textContent = card;
      if (carStatus) carStatus.textContent = "Sealed. Carry to /keys.html.";
    });
  }

  const ring = document.querySelector("[data-keys-ring]");
  const house = document.querySelector("[data-keys-house]");
  const keysPhrase = document.querySelector("[data-keys-phrase]");
  const keysOut = document.querySelector("[data-keys-out]");
  const keysStatus = document.querySelector("[data-keys-status]");
  if (ring && state.ring) ring.value = state.ring;
  if (house && state.house) house.value = state.house;
  if (keysOut && state.keysText) keysOut.textContent = state.keysText;
  if (keysStatus && state.keysSealed) {
    keysStatus.textContent = "Key ring sealed. Venues stay dark.";
  }
  const keysBtn = document.querySelector("[data-keys-btn]");
  if (keysBtn) {
    keysBtn.addEventListener("click", function () {
      const a = ring ? ring.value.trim() : "";
      const b = house ? house.value.trim() : "";
      const phrase = keysPhrase ? keysPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "KEEP THE KEYS") {
        if (keysStatus) keysStatus.textContent = "Type KEEP THE KEYS.";
        return;
      }
      if (!a || !b) {
        if (keysStatus) keysStatus.textContent = "Two lines. Ring. House.";
        return;
      }
      if (banned.test(a + " " + b)) {
        if (keysStatus) keysStatus.textContent = "Void. Do not paste keys or tickers.";
        return;
      }
      const letter = [
        "LYNXLOGIX.NET · KEY RING",
        "Sunday 13 September 2026 · 17:18 PDT",
        "ring: " + a,
        "house: " + b,
        "repos: lynxlogix-net · house-landings · lynxlogix-house",
        "venues live: none",
        "superclaude / opencode: brainstorm only inside the house",
        "sunday tickets: 0",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.ring = a;
      state.house = b;
      state.keysText = letter;
      state.keysSealed = true;
      state.keysAt = new Date().toISOString();
      save();
      if (keysOut) keysOut.textContent = letter;
      if (keysStatus) keysStatus.textContent = "Sealed. Rest. Monday inherits a dark ring.";
    });
  }
})();
