(function () {
  const KEY = "llx.day4.noon";
  const state = JSON.parse(localStorage.getItem(KEY) || "{}");
  const banned = /\b(btc|eth|sol|xbt|usdt|10x|return|coinbase|kraken|phantom|hopper)\b/i;

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  const pair = document.querySelector("[data-tape-pair]");
  const size = document.querySelector("[data-tape-size]");
  const why = document.querySelector("[data-tape-why]");
  const tapeOut = document.querySelector("[data-tape-out]");
  const tapeStatus = document.querySelector("[data-tape-status]");
  if (pair && state.pair) pair.value = state.pair;
  if (size && state.size) size.value = state.size;
  if (why && state.why) why.value = state.why;
  if (tapeOut && state.tape) tapeOut.textContent = state.tape;
  if (tapeStatus && state.tapePrinted) {
    tapeStatus.textContent = "Tape printed. executed: false. Do not fire a second Saturday ticket.";
  }
  const printBtn = document.querySelector("[data-tape-print]");
  if (printBtn) {
    printBtn.addEventListener("click", function () {
      const p = pair ? pair.value.trim() : "";
      const s = parseFloat(size ? size.value : "");
      const w = why ? why.value.trim() : "";
      if (!p) {
        if (tapeStatus) tapeStatus.textContent = "Name the paper pair first.";
        return;
      }
      if (!(s > 0) || s > 1) {
        if (tapeStatus) tapeStatus.textContent = "Size must be a percent of equity between 0.01 and 1.00.";
        return;
      }
      const lines = [
        "LYNXLOGIX.NET · PAPER TAPE",
        "Saturday 12 September 2026",
        "pair: " + p,
        "size: " + s.toFixed(2) + "% of paper sleeve",
        "why: " + (w || "unspoken"),
        "venues: none",
        "executed: false",
        "lid: one Saturday ticket only",
        "printed: " + new Date().toISOString()
      ];
      state.pair = p;
      state.size = String(s);
      state.why = w;
      state.tape = lines.join("\n");
      state.tapePrinted = true;
      state.tapeAt = new Date().toISOString();
      save();
      if (tapeOut) tapeOut.textContent = state.tape;
      if (tapeStatus) tapeStatus.textContent = "Tape sealed. Carry it to /witness.html. Do not route it.";
    });
  }

  const who = document.querySelector("[data-card-who]");
  const note = document.querySelector("[data-card-note]");
  const cardOut = document.querySelector("[data-card-out]");
  const cardStatus = document.querySelector("[data-card-status]");
  if (who && state.who) who.value = state.who;
  if (note && state.cardNote) note.value = state.cardNote;
  if (cardOut && state.cardText) cardOut.textContent = state.cardText;
  if (cardStatus && state.cardSealed) {
    cardStatus.textContent = "Card sealed for " + state.who + ". Send Mangasm+ only.";
  }
  function draftCard() {
    const name = who ? who.value.trim() : "";
    const line = note ? note.value.trim() : "";
    if (!name) return "";
    if (banned.test(name + " " + line)) return "VOID";
    return (
      name +
      — \n\nThe house stayed quiet. We did not send a market. We kept a hallway." +
      (line ? "\n\n" + line : "") +
      "\n\nIf you want the rebuild rather than another extraction machine: https://www.mangasm.app/plus\n\n— LynxLogix / Mangasm Enterprises"
    );
  }
  const sealCard = document.querySelector("[data-card-seal]");
  if (sealCard) {
    sealCard.addEventListener("click", function () {
      const text = draftCard();
      if (!text) {
        if (cardStatus) cardStatus.textContent = "Name the patron first.";
        return;
      }
      if (text === "VOID") {
        if (cardStatus) cardStatus.textContent = "Void. Remove pair names, venues, and return claims.";
        return;
      }
      state.who = who.value.trim();
      state.cardNote = note ? note.value.trim() : "";
      state.cardText = text;
      state.cardSealed = true;
      state.cardAt = new Date().toISOString();
      save();
      if (cardOut) cardOut.textContent = text;
      if (cardStatus) cardStatus.textContent = "Sealed. Copy it. Do not attach a chart.";
    });
  }
  const copyCard = document.querySelector("[data-card-copy]");
  if (copyCard) {
    copyCard.addEventListener("click", function () {
      const text = state.cardText || draftCard();
      if (!text || text === "VOID") {
        if (cardStatus) cardStatus.textContent = "Seal a clean card before copying.";
        return;
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          if (cardStatus) cardStatus.textContent = "Copied. Send Mangasm+. Never a ticker.";
        });
      } else if (cardStatus) {
        cardStatus.textContent = "Copy by hand from the card above.";
      }
    });
  }

  const clock = document.querySelector("[data-bell-clock]");
  const phrase = document.querySelector("[data-bell-phrase]");
  const bellStatus = document.querySelector("[data-bell-status]");
  function paintClock() {
    if (!clock) return;
    const now = new Date();
    clock.textContent = now.toLocaleTimeString("en-US", {
      timeZone: "America/Los_Angeles",
      hour: "numeric",
      minute: "2-digit"
    }) + " PDT";
  }
  if (clock) {
    paintClock();
    setInterval(paintClock, 30000);
  }
  if (bellStatus && state.bell) {
    bellStatus.textContent =
      state.bell === "close"
        ? "Noon bell closed the desk on this browser."
        : "Bell held once. Do not print a second Saturday ticket.";
  }
  const ring = document.querySelector("[data-bell-seal]");
  if (ring) {
    ring.addEventListener("click", function () {
      const gate = phrase ? phrase.value.trim().toUpperCase() : "";
      if (gate === "CLOSE THE DESK") {
        state.bell = "close";
        state.bellAt = new Date().toISOString();
        save();
        if (bellStatus) bellStatus.textContent = "Closed. Walk to /close.html and /night.html. No second ticket.";
        return;
      }
      if (gate === "HOLD THE BELL") {
        if (state.bell === "hold") {
          if (bellStatus) bellStatus.textContent = "Hold already used. Type CLOSE THE DESK.";
          return;
        }
        state.bell = "hold";
        state.bellAt = new Date().toISOString();
        save();
        if (bellStatus) bellStatus.textContent = "Held once. Finish the tape and the card. Then close.";
        return;
      }
      if (bellStatus) bellStatus.textContent = "Type CLOSE THE DESK or HOLD THE BELL.";
    });
  }
})();
