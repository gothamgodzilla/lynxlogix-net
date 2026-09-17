(function () {
  const KEY = "llx.day5.close";
  const state = JSON.parse(localStorage.getItem(KEY) || "{}");
  const banned = /\b(btc|eth|sol|xbt|usdt|10x|return|profit|addorder|coinbase|kraken|hopper|phantom|private\.key|seed|secret)\b/i;

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  function readFieldValue(field) {
    if (!field) return "";
    const value = field.value.trim();
    const fallback = String(field.getAttribute("placeholder") || "").trim();
    return value || fallback;
  }

  const keep = document.querySelector("[data-noc-keep]");
  const itch = document.querySelector("[data-noc-itch]");
  const nocPhrase = document.querySelector("[data-noc-phrase]");
  const nocOut = document.querySelector("[data-noc-out]");
  const nocStatus = document.querySelector("[data-noc-status]");
  if (keep && state.keep) keep.value = state.keep;
  if (itch && state.itch) itch.value = state.itch;
  if (nocOut && state.nocText) nocOut.textContent = state.nocText;
  if (nocStatus && state.nocSealed) {
    nocStatus.textContent = "Nocturne sealed. Desk stays dark.";
  }
  const nocBtn = document.querySelector("[data-noc-btn]");
  if (nocBtn) {
    nocBtn.addEventListener("click", function () {
      const a = readFieldValue(keep);
      const b = readFieldValue(itch);
      const phrase = nocPhrase ? nocPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "KEEP THE NOCTURNE") {
        if (nocStatus) nocStatus.textContent = "Type KEEP THE NOCTURNE.";
        return;
      }
      if (banned.test(a + " " + b)) {
        if (nocStatus) nocStatus.textContent = "Void. Nocturne is a clock, not a ticker.";
        return;
      }
      const book = [
        "LYNXLOGIX.NET · NOCTURNE BOARD",
        "Sunday 13 September 2026 · 18:14 PDT",
        "night keeps: " + a,
        "arrived after 17:18: " + b,
        "version: A running · B/C paper",
        "sunday tickets: 0",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.keep = a;
      state.itch = b;
      state.nocText = book;
      state.nocSealed = true;
      state.nocAt = new Date().toISOString();
      save();
      if (nocOut) nocOut.textContent = book;
      if (nocStatus) nocStatus.textContent = "Sealed. Carry to /loge.html.";
    });
  }

  const guest = document.querySelector("[data-loge-guest]");
  const offer = document.querySelector("[data-loge-offer]");
  const logePhrase = document.querySelector("[data-loge-phrase]");
  const logeOut = document.querySelector("[data-loge-out]");
  const logeStatus = document.querySelector("[data-loge-status]");
  if (guest && state.guest) guest.value = state.guest;
  if (offer && state.offer) offer.value = state.offer;
  if (logeOut && state.logeText) logeOut.textContent = state.logeText;
  if (logeStatus && state.logeSealed) {
    logeStatus.textContent = "Loge sealed. Coins stay off the rail.";
  }
  const logeBtn = document.querySelector("[data-loge-btn]");
  if (logeBtn) {
    logeBtn.addEventListener("click", function () {
      const a = readFieldValue(guest);
      const b = readFieldValue(offer);
      const phrase = logePhrase ? logePhrase.value.trim().toUpperCase() : "";
      if (phrase !== "SEAT THE LOGE") {
        if (logeStatus) logeStatus.textContent = "Type SEAT THE LOGE.";
        return;
      }
      if (banned.test(a + " " + b)) {
        if (logeStatus) logeStatus.textContent = "Void. No coins on the rail.";
        return;
      }
      const card = [
        "LYNXLOGIX.NET · PATRON LOGE",
        "Sunday 13 September 2026 · 18:14 PDT",
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
      state.logeText = card;
      state.logeSealed = true;
      state.logeAt = new Date().toISOString();
      save();
      if (logeOut) logeOut.textContent = card;
      if (logeStatus) logeStatus.textContent = "Sealed. Carry to /hinge.html.";
    });
  }

  const ring = document.querySelector("[data-hinge-ring]");
  const house = document.querySelector("[data-hinge-house]");
  const hingePhrase = document.querySelector("[data-hinge-phrase]");
  const hingeOut = document.querySelector("[data-hinge-out]");
  const hingeStatus = document.querySelector("[data-hinge-status]");
  if (ring && state.ring) ring.value = state.ring;
  if (house && state.house) house.value = state.house;
  if (hingeOut && state.hingeText) hingeOut.textContent = state.hingeText;
  if (hingeStatus && state.hingeSealed) {
    hingeStatus.textContent = "Hinge sealed. Three repos. No fourth.";
  }
  const hingeBtn = document.querySelector("[data-hinge-btn]");
  if (hingeBtn) {
    hingeBtn.addEventListener("click", function () {
      const a = readFieldValue(ring);
      const b = readFieldValue(house);
      const phrase = hingePhrase ? hingePhrase.value.trim().toUpperCase() : "";
      if (phrase !== "KEEP THE HINGE") {
        if (hingeStatus) hingeStatus.textContent = "Type KEEP THE HINGE.";
        return;
      }
      if (banned.test(a + " " + b)) {
        if (hingeStatus) hingeStatus.textContent = "Void. Do not paste keys or tickers.";
        return;
      }
      if (/\blynxlogix-holdings\b/i.test(b)) {
        if (hingeStatus) hingeStatus.textContent = "Void. Three living repos only. No fourth landing repo.";
        return;
      }
      const letter = [
        "LYNXLOGIX.NET · VAULT HINGE",
        "Sunday 13 September 2026 · 18:14 PDT",
        "hinge: " + a,
        "house: " + b,
        "repos: lynxlogix-net · house-landings · lynxlogix-house",
        "venues live: none",
        "coinbase advanced: DARK",
        "kraken addorder: DARK",
        "cryptohopper bots: DARK",
        "phantom signing: DARK",
        "superclaude / opencode: brainstorm only inside the house",
        "sunday tickets: 0",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.ring = a;
      state.house = b;
      state.hingeText = letter;
      state.hingeSealed = true;
      state.hingeAt = new Date().toISOString();
      save();
      if (hingeOut) hingeOut.textContent = letter;
      if (hingeStatus) hingeStatus.textContent = "Sealed. Rest. Monday inherits a dark hinge.";
    });
  }
})();
