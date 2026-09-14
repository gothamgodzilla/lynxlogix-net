(function () {
  const KEY = "llx.day6.mid";
  const state = JSON.parse(localStorage.getItem(KEY) || "{}");
  const banned = /\b(addorder|private.key|seed|secret|mnemonic|withdraw|transfer)\b/i;
  const tickerBan = /\b(10x return|guaranteed|risk.?free)\b/i;

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  const itch = document.querySelector("[data-ft-itch]");
  const why = document.querySelector("[data-ft-why]");
  const ftPhrase = document.querySelector("[data-ft-phrase]");
  const ftOut = document.querySelector("[data-ft-out]");
  const ftStatus = document.querySelector("[data-ft-status]");
  if (itch && state.itch) itch.value = state.itch;
  if (why && state.why) why.value = state.why;
  if (ftOut && state.ftText) ftOut.textContent = state.ftText;
  if (ftStatus && state.ftSealed) ftStatus.textContent = "First ticket sealed. executed: false.";
  const ftBtn = document.querySelector("[data-ft-btn]");
  if (ftBtn) {
    ftBtn.addEventListener("click", function () {
      const a = itch ? itch.value.trim() : "";
      const b = why ? why.value.trim() : "";
      const phrase = ftPhrase ? ftPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "FIRST THE TICKET") {
        if (ftStatus) ftStatus.textContent = "Type FIRST THE TICKET.";
        return;
      }
      if (!a || !b) {
        if (ftStatus) ftStatus.textContent = "Two lines. Itch. Why paper now.";
        return;
      }
      if (banned.test(a + " " + b) || tickerBan.test(a + " " + b)) {
        if (ftStatus) ftStatus.textContent = "Void. No keys. No promised return.";
        return;
      }
      const book = [
        "LYNXLOGIX.NET · FIRST TICKET",
        "Monday 14 September 2026 · 10:22 PDT",
        "itch: " + a,
        "why paper: " + b,
        "version: A running · B/C paper",
        "size: 0.25–1.00% equity if this ever graduates",
        "venue live: none",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.itch = a;
      state.why = b;
      state.ftText = book;
      state.ftSealed = true;
      save();
      if (ftOut) ftOut.textContent = book;
      if (ftStatus) ftStatus.textContent = "Sealed. Carry to /commission.html.";
    });
  }

  const guest = document.querySelector("[data-cm-guest]");
  const garment = document.querySelector("[data-cm-garment]");
  const cmPhrase = document.querySelector("[data-cm-phrase]");
  const cmOut = document.querySelector("[data-cm-out]");
  const cmStatus = document.querySelector("[data-cm-status]");
  if (guest && state.guest) guest.value = state.guest;
  if (garment && state.garment) garment.value = state.garment;
  if (cmOut && state.cmText) cmOut.textContent = state.cmText;
  if (cmStatus && state.cmSealed) cmStatus.textContent = "Commission sealed. Coins stay off the fitting.";
  const cmBtn = document.querySelector("[data-cm-btn]");
  if (cmBtn) {
    cmBtn.addEventListener("click", function () {
      const a = guest ? guest.value.trim() : "";
      const b = garment ? garment.value.trim() : "";
      const phrase = cmPhrase ? cmPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "COMMISSION THE HOUSE") {
        if (cmStatus) cmStatus.textContent = "Type COMMISSION THE HOUSE.";
        return;
      }
      if (!a || !b) {
        if (cmStatus) cmStatus.textContent = "Two lines. Who is commissioned. What is fitted.";
        return;
      }
      if (banned.test(a + " " + b) || tickerBan.test(a + " " + b)) {
        if (cmStatus) cmStatus.textContent = "Void. No coins on the commission.";
        return;
      }
      const card = [
        "LYNXLOGIX.NET · PATRON COMMISSION",
        "Monday 14 September 2026 · 10:22 PDT",
        "commissioned: " + a,
        "garment: " + b,
        "product: Mangasm+",
        "door: https://www.mangasm.app/plus",
        "coins sold: none",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.guest = a;
      state.garment = b;
      state.cmText = card;
      state.cmSealed = true;
      save();
      if (cmOut) cmOut.textContent = card;
      if (cmStatus) cmStatus.textContent = "Sealed. Carry to /venues.html.";
    });
  }

  const seen = document.querySelector("[data-vn-seen]");
  const dark = document.querySelector("[data-vn-dark]");
  const vnPhrase = document.querySelector("[data-vn-phrase]");
  const vnOut = document.querySelector("[data-vn-out]");
  const vnStatus = document.querySelector("[data-vn-status]");
  if (seen && state.seen) seen.value = state.seen;
  if (dark && state.dark) dark.value = state.dark;
  if (vnOut && state.vnText) vnOut.textContent = state.vnText;
  if (vnStatus && state.vnSealed) vnStatus.textContent = "Venues counted. Live orders stay dark.";
  const vnBtn = document.querySelector("[data-vn-btn]");
  if (vnBtn) {
    vnBtn.addEventListener("click", function () {
      const a = seen ? seen.value.trim() : "";
      const b = dark ? dark.value.trim() : "";
      const phrase = vnPhrase ? vnPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "COUNT THE VENUES") {
        if (vnStatus) vnStatus.textContent = "Type COUNT THE VENUES.";
        return;
      }
      if (!a || !b) {
        if (vnStatus) vnStatus.textContent = "Two lines. What a passport would see. What stays dark.";
        return;
      }
      if (banned.test(a + " " + b) || tickerBan.test(a + " " + b)) {
        if (vnStatus) vnStatus.textContent = "Void. Do not paste keys or seeds.";
        return;
      }
      const letter = [
        "LYNXLOGIX.NET · VENUE CENSUS",
        "Monday 14 September 2026 · 10:22 PDT",
        "passport would see: " + a,
        "stays dark: " + b,
        "venues named: Coinbase Advanced · Kraken · Phantom · Kraken Wallet · Hopper",
        "mode: paper / read-only later · never unattended live",
        "repos: lynxlogix-net · house-landings · lynxlogix-house",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.seen = a;
      state.dark = b;
      state.vnText = letter;
      state.vnSealed = true;
      save();
      if (vnOut) vnOut.textContent = letter;
      if (vnStatus) vnStatus.textContent = "Sealed. Version A runs the week.";
    });
  }
})();
