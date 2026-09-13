(function () {
  const KEY = "llx.day5.late";
  const state = JSON.parse(localStorage.getItem(KEY) || "{}");
  const banned = /\b(btc|eth|sol|xbt|usdt|10x|return|profit|addorder|private.key|seed|secret)\b/i;

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  const dark = document.querySelector("[data-meridian-dark]");
  const tempt = document.querySelector("[data-meridian-tempt]");
  const merPhrase = document.querySelector("[data-meridian-phrase]");
  const merOut = document.querySelector("[data-meridian-out]");
  const merStatus = document.querySelector("[data-meridian-status]");
  if (dark && state.dark) dark.value = state.dark;
  if (tempt && state.tempt) tempt.value = state.tempt;
  if (merOut && state.meridianText) merOut.textContent = state.meridianText;
  if (merStatus && state.meridianSealed) {
    merStatus.textContent = "Meridian sealed. Money did not move.";
  }
  const merBtn = document.querySelector("[data-meridian-btn]");
  if (merBtn) {
    merBtn.addEventListener("click", function () {
      const a = dark ? dark.value.trim() : "";
      const b = tempt ? tempt.value.trim() : "";
      const phrase = merPhrase ? merPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "HOLD THE MERIDIAN") {
        if (merStatus) merStatus.textContent = "Type HOLD THE MERIDIAN.";
        return;
      }
      if (!a || !b) {
        if (merStatus) merStatus.textContent = "Two lines. What is dark. What tried to light.";
        return;
      }
      if (banned.test(a + " " + b)) {
        if (merStatus) merStatus.textContent = "Void. The meridian is a clock, not a ticker.";
        return;
      }
      const book = [
        "LYNXLOGIX.NET · MERIDIAN CHECK",
        "Sunday 13 September 2026 · 11:04 PDT",
        "still dark: " + a,
        "tried to light: " + b,
        "version: A running · B/C paper",
        "sunday tickets: 0",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.dark = a;
      state.tempt = b;
      state.meridianText = book;
      state.meridianSealed = true;
      state.meridianAt = new Date().toISOString();
      save();
      if (merOut) merOut.textContent = book;
      if (merStatus) merStatus.textContent = "Sealed. Carry to /parlor.html.";
    });
  }

  const who = document.querySelector("[data-parlor-who]");
  const why = document.querySelector("[data-parlor-why]");
  const parlorPhrase = document.querySelector("[data-parlor-phrase]");
  const parlorOut = document.querySelector("[data-parlor-out]");
  const parlorStatus = document.querySelector("[data-parlor-status]");
  if (who && state.parlorWho) who.value = state.parlorWho;
  if (why && state.parlorWhy) why.value = state.parlorWhy;
  if (parlorOut && state.parlorText) parlorOut.textContent = state.parlorText;
  if (parlorStatus && state.parlorSealed) {
    parlorStatus.textContent = "Parlor seated for " + state.parlorWho + ". Chart stays outside.";
  }
  const parlorBtn = document.querySelector("[data-parlor-btn]");
  if (parlorBtn) {
    parlorBtn.addEventListener("click", function () {
      const name = who ? who.value.trim() : "";
      const line = why ? why.value.trim() : "";
      const phrase = parlorPhrase ? parlorPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "SEAT THE PARLOR") {
        if (parlorStatus) parlorStatus.textContent = "Type SEAT THE PARLOR.";
        return;
      }
      if (!name || !line) {
        if (parlorStatus) parlorStatus.textContent = "Name the guest and what they buy besides a chart.";
        return;
      }
      if (banned.test(name + " " + line)) {
        if (parlorStatus) parlorStatus.textContent = "Void. The parlor sells the home, not a pair.";
        return;
      }
      if (state.parlorSealed) {
        if (parlorStatus) parlorStatus.textContent = "Sunday cap: one parlor guest.";
        return;
      }
      const card = [
        "LYNXLOGIX.NET · PRIVATE PARLOR",
        name + ",",
        "",
        line,
        "",
        "The chart stays in the hallway.",
        "Mangasm+: https://www.mangasm.app/plus",
        "Pass: https://lynxlogix-net.vercel.app/pay.html",
        "Owner book: https://lynxlogix-net.vercel.app/owner.html",
        "",
        "- LynxLogix / Mangasm Enterprises"
      ].join("\n");
      state.parlorWho = name;
      state.parlorWhy = line;
      state.parlorText = card;
      state.parlorSealed = true;
      state.parlorAt = new Date().toISOString();
      save();
      if (parlorOut) parlorOut.textContent = card;
      if (parlorStatus) parlorStatus.textContent = "Sealed. Carry to /send.html if they are waiting.";
    });
  }

  const sendWho = document.querySelector("[data-send-who]");
  const sendLine = document.querySelector("[data-send-line]");
  const sendPhrase = document.querySelector("[data-send-phrase]");
  const sendOut = document.querySelector("[data-send-out]");
  const sendStatus = document.querySelector("[data-send-status]");
  if (sendWho && state.sendWho) sendWho.value = state.sendWho;
  if (sendLine && state.sendLine) sendLine.value = state.sendLine;
  if (sendOut && state.sendText) sendOut.textContent = state.sendText;
  if (sendStatus && state.sendSealed) {
    sendStatus.textContent = "Send sealed for " + state.sendWho + ". Sunday cap is one card.";
  }
  const sendBtn = document.querySelector("[data-send-btn]");
  if (sendBtn) {
    sendBtn.addEventListener("click", function () {
      const name = sendWho ? sendWho.value.trim() : "";
      const line = sendLine ? sendLine.value.trim() : "";
      const phrase = sendPhrase ? sendPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "SEND THE HOME") {
        if (sendStatus) sendStatus.textContent = "Type SEND THE HOME.";
        return;
      }
      if (!name || !line) {
        if (sendStatus) sendStatus.textContent = "Name the guest and write one sentence.";
        return;
      }
      if (banned.test(name + " " + line)) {
        if (sendStatus) sendStatus.textContent = "Void. The send is a home, not a return.";
        return;
      }
      if (state.sendSealed) {
        if (sendStatus) sendStatus.textContent = "Sunday cap: one rebuild send.";
        return;
      }
      const letter = [
        "LYNXLOGIX.NET · REBUILD SEND",
        name + ",",
        "",
        line,
        "",
        "The membership is live.",
        "Mangasm+: https://www.mangasm.app/plus",
        "House pass: https://lynxlogix-net.vercel.app/pay.html",
        "Contact: https://lynxlogix-net.vercel.app/contact.html",
        "",
        "- LynxLogix / Mangasm Enterprises"
      ].join("\n");
      state.sendWho = name;
      state.sendLine = line;
      state.sendText = letter;
      state.sendSealed = true;
      state.sendAt = new Date().toISOString();
      save();
      if (sendOut) sendOut.textContent = letter;
      if (sendStatus) sendStatus.textContent = "Sealed. Open Mangasm+ once if they are waiting. Then rest.";
    });
  }
})();
