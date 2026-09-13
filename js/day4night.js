(function () {
  const KEY = "llx.day4.night";
  const state = JSON.parse(localStorage.getItem(KEY) || "{}");
  const banned = /\b(btc|eth|sol|xbt|usdt|10x|return|coinbase|kraken|phantom|hopper)\b/i;

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  const rooms = document.querySelector("[data-lamp-rooms]");
  const dark = document.querySelector("[data-lamp-dark]");
  const lampPhrase = document.querySelector("[data-lamp-phrase]");
  const lampOut = document.querySelector("[data-lamp-out]");
  const lampStatus = document.querySelector("[data-lamp-status]");
  if (rooms && state.rooms) rooms.value = state.rooms;
  if (dark && state.dark) dark.value = state.dark;
  if (lampOut && state.lampText) lampOut.textContent = state.lampText;
  if (lampStatus && state.lampSealed) {
    lampStatus.textContent = "Night lamp sealed. The book stays closed.";
  }
  const lampBtn = document.querySelector("[data-lamp-btn]");
  if (lampBtn) {
    lampBtn.addEventListener("click", function () {
      const a = rooms ? rooms.value.trim() : "";
      const b = dark ? dark.value.trim() : "";
      const phrase = lampPhrase ? lampPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "LIGHT THE LAMP") {
        if (lampStatus) lampStatus.textContent = "Type LIGHT THE LAMP.";
        return;
      }
      if (!a || !b) {
        if (lampStatus) lampStatus.textContent = "Two lines. What the lamp lights. What stays dark.";
        return;
      }
      if (banned.test(a + " " + b)) {
        if (lampStatus) lampStatus.textContent = "Void. The lamp is not a ticker.";
        return;
      }
      const book = [
        "LYNXLOGIX.NET · NIGHT LAMP",
        "Saturday 12 September 2026 · 18:19 PDT",
        "lights: " + a,
        "stays dark: " + b,
        "version: A running · B/C paper",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.rooms = a;
      state.dark = b;
      state.lampText = book;
      state.lampSealed = true;
      state.lampAt = new Date().toISOString();
      save();
      if (lampOut) lampOut.textContent = book;
      if (lampStatus) lampStatus.textContent = "Sealed. Carry to /velvet.html.";
    });
  }

  const who = document.querySelector("[data-vel-who]");
  const note = document.querySelector("[data-vel-note]");
  const velPhrase = document.querySelector("[data-vel-phrase]");
  const velOut = document.querySelector("[data-vel-out]");
  const velStatus = document.querySelector("[data-vel-status]");
  if (who && state.velWho) who.value = state.velWho;
  if (note && state.velNote) note.value = state.velNote;
  if (velOut && state.velText) velOut.textContent = state.velText;
  if (velStatus && state.velSealed) {
    velStatus.textContent = "Velvet sealed for " + state.velWho + ". Cap is one Saturday envelope.";
  }
  const velBtn = document.querySelector("[data-vel-btn]");
  if (velBtn) {
    velBtn.addEventListener("click", function () {
      const name = who ? who.value.trim() : "";
      const line = note ? note.value.trim() : "";
      const phrase = velPhrase ? velPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "SEAL THE VELVET") {
        if (velStatus) velStatus.textContent = "Type SEAL THE VELVET.";
        return;
      }
      if (!name || !line) {
        if (velStatus) velStatus.textContent = "Name the patron and write one private line.";
        return;
      }
      if (banned.test(name + " " + line)) {
        if (velStatus) velStatus.textContent = "Void. Velvet is texture, not a venue.";
        return;
      }
      if (state.velSealed) {
        if (velStatus) velStatus.textContent = "Saturday cap: one velvet envelope.";
        return;
      }
      const letter = [
        "LYNXLOGIX.NET · VELVET ENVELOPE",
        name + ",",
        "",
        line,
        "",
        "The desk is paper. The membership is live.",
        "Mangasm+: https://www.mangasm.app/plus",
        "Hour: https://lynxlogix-net.vercel.app/hour.html",
        "Pass: https://lynxlogix-net.vercel.app/pay.html",
        "",
        "- LynxLogix / Mangasm Enterprises"
      ].join("\n");
      state.velWho = name;
      state.velNote = line;
      state.velText = letter;
      state.velSealed = true;
      state.velAt = new Date().toISOString();
      save();
      if (velOut) velOut.textContent = letter;
      if (velStatus) velStatus.textContent = "Sealed. Send from /contact.html. Then open /rebuild.html.";
    });
  }

  const rebWho = document.querySelector("[data-reb-who]");
  const rebWhy = document.querySelector("[data-reb-why]");
  const rebPhrase = document.querySelector("[data-reb-phrase]");
  const rebOut = document.querySelector("[data-reb-out]");
  const rebStatus = document.querySelector("[data-reb-status]");
  if (rebWho && state.rebWho) rebWho.value = state.rebWho;
  if (rebWhy && state.rebWhy) rebWhy.value = state.rebWhy;
  if (rebOut && state.rebText) rebOut.textContent = state.rebText;
  if (rebStatus && state.rebSealed) {
    rebStatus.textContent = "Rebuild door sealed. Send Mangasm+ once.";
  }
  const rebBtn = document.querySelector("[data-reb-btn]");
  if (rebBtn) {
    rebBtn.addEventListener("click", function () {
      const name = rebWho ? rebWho.value.trim() : "";
      const why = rebWhy ? rebWhy.value.trim() : "";
      const phrase = rebPhrase ? rebPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "OPEN THE REBUILD") {
        if (rebStatus) rebStatus.textContent = "Type OPEN THE REBUILD.";
        return;
      }
      if (!name || !why) {
        if (rebStatus) rebStatus.textContent = "Name the room and why the home, not a coin.";
        return;
      }
      if (banned.test(name + " " + why)) {
        if (rebStatus) rebStatus.textContent = "Void. The door is Mangasm+, not a pair.";
        return;
      }
      if (state.rebSealed) {
        if (rebStatus) rebStatus.textContent = "Saturday cap: one rebuild door. Send it or stop.";
        return;
      }
      const card = [
        "LYNXLOGIX.NET · REBUILD DOOR",
        "Saturday 12 September 2026 · 18:19 PDT",
        "to: " + name,
        "why home: " + why,
        "checkout: https://www.mangasm.app/plus",
        "house pass: https://lynxlogix-net.vercel.app/pay.html",
        "live money door: Mangasm+",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.rebWho = name;
      state.rebWhy = why;
      state.rebText = card;
      state.rebSealed = true;
      state.rebAt = new Date().toISOString();
      save();
      if (rebOut) rebOut.textContent = card;
      if (rebStatus) rebStatus.textContent = "Sealed. Open https://www.mangasm.app/plus once. Then CLOSE THE DESK.";
    });
  }
})();
