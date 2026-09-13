(function () {
  const KEY = "llx.day5.dawn";
  const state = JSON.parse(localStorage.getItem(KEY) || "{}");
  const banned = /\b(btc|eth|sol|xbt|usdt|10x|return|coinbase|kraken|phantom|hopper)\b/i;

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  const hold = document.querySelector("[data-dawn-hold]");
  const unbuilt = document.querySelector("[data-dawn-unbuilt]");
  const dawnPhrase = document.querySelector("[data-dawn-phrase]");
  const dawnOut = document.querySelector("[data-dawn-out]");
  const dawnStatus = document.querySelector("[data-dawn-status]");
  if (hold && state.hold) hold.value = state.hold;
  if (unbuilt && state.unbuilt) unbuilt.value = state.unbuilt;
  if (dawnOut && state.dawnText) dawnOut.textContent = state.dawnText;
  if (dawnStatus && state.dawnSealed) {
    dawnStatus.textContent = "Dawn census sealed. Do not open a fourth repo.";
  }
  const dawnBtn = document.querySelector("[data-dawn-btn]");
  if (dawnBtn) {
    dawnBtn.addEventListener("click", function () {
      const a = hold ? hold.value.trim() : "";
      const b = unbuilt ? unbuilt.value.trim() : "";
      const phrase = dawnPhrase ? dawnPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "COUNT THE HOUSE") {
        if (dawnStatus) dawnStatus.textContent = "Type COUNT THE HOUSE.";
        return;
      }
      if (!a || !b) {
        if (dawnStatus) dawnStatus.textContent = "Two lines. What exists. What stays unbuilt.";
        return;
      }
      if (banned.test(a + " " + b)) {
        if (dawnStatus) dawnStatus.textContent = "Void. The census is rooms, not tickers.";
        return;
      }
      const book = [
        "LYNXLOGIX.NET · DAWN CENSUS",
        "Sunday 13 September 2026 · 09:21 PDT",
        "holds: " + a,
        "unbuilt today: " + b,
        "repos: lynxlogix-net · house-landings · lynxlogix-house",
        "version: A running · B/C paper",
        "sunday tickets: 0",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.hold = a;
      state.unbuilt = b;
      state.dawnText = book;
      state.dawnSealed = true;
      state.dawnAt = new Date().toISOString();
      save();
      if (dawnOut) dawnOut.textContent = book;
      if (dawnStatus) dawnStatus.textContent = "Sealed. Carry to /window.html.";
    });
  }

  const allow = document.querySelector("[data-win-allow]");
  const refuse = document.querySelector("[data-win-refuse]");
  const winPhrase = document.querySelector("[data-win-phrase]");
  const winOut = document.querySelector("[data-win-out]");
  const winStatus = document.querySelector("[data-win-status]");
  if (allow && state.allow) allow.value = state.allow;
  if (refuse && state.refuse) refuse.value = state.refuse;
  if (winOut && state.winText) winOut.textContent = state.winText;
  if (winStatus && state.winSealed) {
    winStatus.textContent = "Dark window sealed. Sunday tickets stay at zero.";
  }
  const winBtn = document.querySelector("[data-win-btn]");
  if (winBtn) {
    winBtn.addEventListener("click", function () {
      const a = allow ? allow.value.trim() : "";
      const b = refuse ? refuse.value.trim() : "";
      const phrase = winPhrase ? winPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "KEEP THE WINDOW DARK") {
        if (winStatus) winStatus.textContent = "Type KEEP THE WINDOW DARK.";
        return;
      }
      if (!a || !b) {
        if (winStatus) winStatus.textContent = "Two lines. What may show. What is refused.";
        return;
      }
      if (banned.test(a + " " + b)) {
        if (winStatus) winStatus.textContent = "Void. Name rooms, not venues as live keys.";
        return;
      }
      const card = [
        "LYNXLOGIX.NET · DARK WINDOW",
        "Sunday 13 September 2026 · 09:21 PDT",
        "may show: " + a,
        "refuses: " + b,
        "venues: named as passports only",
        "hook: dark",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.allow = a;
      state.refuse = b;
      state.winText = card;
      state.winSealed = true;
      state.winAt = new Date().toISOString();
      save();
      if (winOut) winOut.textContent = card;
      if (winStatus) winStatus.textContent = "Sealed. Carry to /breakfast.html.";
    });
  }

  const who = document.querySelector("[data-brk-who]");
  const why = document.querySelector("[data-brk-why]");
  const brkPhrase = document.querySelector("[data-brk-phrase]");
  const brkOut = document.querySelector("[data-brk-out]");
  const brkStatus = document.querySelector("[data-brk-status]");
  if (who && state.brkWho) who.value = state.brkWho;
  if (why && state.brkWhy) why.value = state.brkWhy;
  if (brkOut && state.brkText) brkOut.textContent = state.brkText;
  if (brkStatus && state.brkSealed) {
    brkStatus.textContent = "Breakfast sealed for " + state.brkWho + ". Sunday cap is one card.";
  }
  const brkBtn = document.querySelector("[data-brk-btn]");
  if (brkBtn) {
    brkBtn.addEventListener("click", function () {
      const name = who ? who.value.trim() : "";
      const line = why ? why.value.trim() : "";
      const phrase = brkPhrase ? brkPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "BREAKFAST THE HOUSE") {
        if (brkStatus) brkStatus.textContent = "Type BREAKFAST THE HOUSE.";
        return;
      }
      if (!name || !line) {
        if (brkStatus) brkStatus.textContent = "Name the guest and why they sit at a table.";
        return;
      }
      if (banned.test(name + " " + line)) {
        if (brkStatus) brkStatus.textContent = "Void. Breakfast sells the home, not a pair.";
        return;
      }
      if (state.brkSealed) {
        if (brkStatus) brkStatus.textContent = "Sunday cap: one breakfast card.";
        return;
      }
      const letter = [
        "LYNXLOGIX.NET · PATRON BREAKFAST",
        name + ",",
        "",
        line,
        "",
        "Sunday the desk stays dark. The membership is live.",
        "Mangasm+: https://www.mangasm.app/plus",
        "Hour: https://lynxlogix-net.vercel.app/hour.html",
        "Pass: https://lynxlogix-net.vercel.app/pay.html",
        "",
        "- LynxLogix / Mangasm Enterprises"
      ].join("\n");
      state.brkWho = name;
      state.brkWhy = line;
      state.brkText = letter;
      state.brkSealed = true;
      state.brkAt = new Date().toISOString();
      save();
      if (brkOut) brkOut.textContent = letter;
      if (brkStatus) brkStatus.textContent = "Sealed. Send Mangasm+ once if they are waiting. Then rest.";
    });
  }
})();
