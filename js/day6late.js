(function () {
  const KEY = "llx.day6.late";
  const state = JSON.parse(localStorage.getItem(KEY) || "{}");
  const banned = /\b(addorder|create.?order|private.key|seed|secret|mnemonic|withdraw|transfer)\b/i;
  const tickerBan = /\b(10x return|guaranteed|risk.?free)\b/i;

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  const fill = document.querySelector("[data-ld-fill]");
  const veto = document.querySelector("[data-ld-veto]");
  const ldPhrase = document.querySelector("[data-ld-phrase]");
  const ldOut = document.querySelector("[data-ld-out]");
  const ldStatus = document.querySelector("[data-ld-status]");
  if (fill && state.fill) fill.value = state.fill;
  if (veto && state.veto) veto.value = state.veto;
  if (ldOut && state.ldText) ldOut.textContent = state.ldText;
  if (ldStatus && state.ldSealed) ldStatus.textContent = "Paper scored. executed: false.";
  const ldBtn = document.querySelector("[data-ld-btn]");
  if (ldBtn) {
    ldBtn.addEventListener("click", function () {
      const a = fill ? fill.value.trim() : "";
      const b = veto ? veto.value.trim() : "";
      const phrase = ldPhrase ? ldPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "SCORE THE PAPER") {
        if (ldStatus) ldStatus.textContent = "Type SCORE THE PAPER.";
        return;
      }
      if (!a || !b) {
        if (ldStatus) ldStatus.textContent = "Two lines. Would-have fill. Why unexecuted.";
        return;
      }
      if (banned.test(a + " " + b) || tickerBan.test(a + " " + b)) {
        if (ldStatus) ldStatus.textContent = "Void. No keys. No promised return.";
        return;
      }
      const book = [
        "LYNXLOGIX.NET · PAPER LEDGER",
        "Monday 14 September 2026 · 11:02 PDT",
        "would-have: " + a,
        "stays paper because: " + b,
        "version: A running · B/C paper",
        "size if graduated later: 0.25–1.00% equity",
        "venue live: none",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.fill = a;
      state.veto = b;
      state.ldText = book;
      state.ldSealed = true;
      save();
      if (ldOut) ldOut.textContent = book;
      if (ldStatus) ldStatus.textContent = "Sealed. Carry to /menu.html.";
    });
  }

  const one = document.querySelector("[data-mn-one]");
  const two = document.querySelector("[data-mn-two]");
  const three = document.querySelector("[data-mn-three]");
  const mnPhrase = document.querySelector("[data-mn-phrase]");
  const mnOut = document.querySelector("[data-mn-out]");
  const mnStatus = document.querySelector("[data-mn-status]");
  if (one && state.one) one.value = state.one;
  if (two && state.two) two.value = state.two;
  if (three && state.three) three.value = state.three;
  if (mnOut && state.mnText) mnOut.textContent = state.mnText;
  if (mnStatus && state.mnSealed) mnStatus.textContent = "Menu sealed. Coins stay off the card.";
  const mnBtn = document.querySelector("[data-mn-btn]");
  if (mnBtn) {
    mnBtn.addEventListener("click", function () {
      const a = one ? one.value.trim() : "";
      const b = two ? two.value.trim() : "";
      const c = three ? three.value.trim() : "";
      const phrase = mnPhrase ? mnPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "MENU THE HOUSE") {
        if (mnStatus) mnStatus.textContent = "Type MENU THE HOUSE.";
        return;
      }
      if (!a || !b || !c) {
        if (mnStatus) mnStatus.textContent = "Three garments. One must be product, not a ticker.";
        return;
      }
      const blob = a + " " + b + " " + c;
      if (banned.test(blob) || tickerBan.test(blob)) {
        if (mnStatus) mnStatus.textContent = "Void. No coins on the menu.";
        return;
      }
      const card = [
        "LYNXLOGIX.NET · UHNW MENU",
        "Monday 14 September 2026 · 11:02 PDT",
        "garment 1: " + a,
        "garment 2: " + b,
        "garment 3: " + c,
        "sales door: https://www.mangasm.app/plus",
        "house door: /pay.html",
        "coins sold: none",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.one = a;
      state.two = b;
      state.three = c;
      state.mnText = card;
      state.mnSealed = true;
      save();
      if (mnOut) mnOut.textContent = card;
      if (mnStatus) mnStatus.textContent = "Sealed. Carry to /dryfire.html.";
    });
  }

  const payload = document.querySelector("[data-df-payload]");
  const result = document.querySelector("[data-df-result]");
  const dfPhrase = document.querySelector("[data-df-phrase]");
  const dfOut = document.querySelector("[data-df-out]");
  const dfStatus = document.querySelector("[data-df-status]");
  if (payload && state.payload) payload.value = state.payload;
  if (result && state.result) result.value = state.result;
  if (dfOut && state.dfText) dfOut.textContent = state.dfText;
  if (dfStatus && state.dfSealed) dfStatus.textContent = "Dry-fire sealed. Hook key remains paper.";
  const dfBtn = document.querySelector("[data-df-btn]");
  if (dfBtn) {
    dfBtn.addEventListener("click", function () {
      const a = payload ? payload.value.trim() : "";
      const b = result ? result.value.trim() : "";
      const phrase = dfPhrase ? dfPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "DRY FIRE THE HOOK") {
        if (dfStatus) dfStatus.textContent = "Type DRY FIRE THE HOOK.";
        return;
      }
      if (!a || !b) {
        if (dfStatus) dfStatus.textContent = "Two lines. Payload. What the desk does.";
        return;
      }
      if (banned.test(a + " " + b) || tickerBan.test(a + " " + b)) {
        if (dfStatus) dfStatus.textContent = "Void. Do not paste keys or live order verbs.";
        return;
      }
      const letter = [
        "LYNXLOGIX.NET · HOOK DRY-FIRE",
        "Monday 14 September 2026 · 11:02 PDT",
        "payload: " + a,
        "desk does: " + b,
        "endpoint: POST /api/hook?key=paper",
        "venues live: none",
        "repos: lynxlogix-net · house-landings · lynxlogix-house",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.payload = a;
      state.result = b;
      state.dfText = letter;
      state.dfSealed = true;
      save();
      if (dfOut) dfOut.textContent = letter;
      if (dfStatus) dfStatus.textContent = "Sealed. Version A still runs the week.";
    });
  }
})();
