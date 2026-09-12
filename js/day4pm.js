(function () {
  const KEY = "llx.day4.pm";
  const state = JSON.parse(localStorage.getItem(KEY) || "{}");
  const banned = /\b(btc|eth|sol|xbt|usdt|10x|return|coinbase|kraken|phantom|hopper)\b/i;

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  const line = document.querySelector("[data-after-line]");
  const afterOut = document.querySelector("[data-after-out]");
  const afterStatus = document.querySelector("[data-after-status]");
  if (line && state.afterLine) line.value = state.afterLine;
  if (afterOut && state.afterText) afterOut.textContent = state.afterText;
  if (afterStatus && state.afterSealed) {
    afterStatus.textContent = "After-bell receipt sealed. executed: false.";
  }
  const afterBtn = document.querySelector("[data-after-seal]");
  if (afterBtn) {
    afterBtn.addEventListener("click", function () {
      const text = line ? line.value.trim() : "";
      if (!text) {
        if (afterStatus) afterStatus.textContent = "Write one sentence first.";
        return;
      }
      if (banned.test(text)) {
        if (afterStatus) afterStatus.textContent = "Void. Remove pairs, venues, and return claims.";
        return;
      }
      const receipt = [
        "LYNXLOGIX.NET · AFTER-BELL RECEIPT",
        "Saturday 12 September 2026 · 12:05 PDT cycle",
        "truth: " + text,
        "venues: none",
        "second ticket: refused",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.afterLine = text;
      state.afterText = receipt;
      state.afterSealed = true;
      state.afterAt = new Date().toISOString();
      save();
      if (afterOut) afterOut.textContent = receipt;
      if (afterStatus) afterStatus.textContent = "Sealed. Carry to /witness.html if you want the book.";
    });
  }

  const who = document.querySelector("[data-door-who]");
  const countEl = document.querySelector("[data-door-count]");
  const doorStatus = document.querySelector("[data-door-status]");
  const doors = Array.isArray(state.doors) ? state.doors : [];
  state.doors = doors;
  function paintDoors() {
    if (countEl) countEl.textContent = String(doors.length);
  }
  paintDoors();
  if (who && state.doorWho) who.value = state.doorWho;
  if (doorStatus && doors.length) {
    doorStatus.textContent = doors.length + " door(s) marked. Living paywall is Mangasm+.";
  }
  const mark = document.querySelector("[data-door-mark]");
  if (mark) {
    mark.addEventListener("click", function () {
      const name = who ? who.value.trim() : "";
      if (!name) {
        if (doorStatus) doorStatus.textContent = "Name the patron or hallway first.";
        return;
      }
      if (banned.test(name)) {
        if (doorStatus) doorStatus.textContent = "Void. A ticker is not a door.";
        return;
      }
      if (doors.length >= 3) {
        if (doorStatus) doorStatus.textContent = "Saturday cap reached. A fourth door is refused.";
        return;
      }
      doors.push({ who: name, at: new Date().toISOString() });
      state.doorWho = name;
      save();
      paintDoors();
      if (doorStatus) doorStatus.textContent = "Marked for " + name + ". Open Mangasm+. Do not attach a chart.";
    });
  }

  const phrase = document.querySelector("[data-watch-phrase]");
  const watchStatus = document.querySelector("[data-watch-status]");
  if (watchStatus && state.watchSeated) {
    watchStatus.textContent = "Evening watch seated on this browser. Ten voices. Zero spenders.";
  }
  const seat = document.querySelector("[data-watch-seat]");
  if (seat) {
    seat.addEventListener("click", function () {
      const gate = phrase ? phrase.value.trim().toUpperCase() : "";
      if (gate !== "PAPER ONLY") {
        if (watchStatus) watchStatus.textContent = "Type PAPER ONLY to seat the watch.";
        return;
      }
      state.watchSeated = true;
      state.watchAt = new Date().toISOString();
      save();
      if (watchStatus) watchStatus.textContent = "Seated. Alerts may speak. Money may not move.";
    });
  }
})();
