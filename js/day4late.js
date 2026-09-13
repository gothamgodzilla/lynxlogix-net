(function () {
  const KEY = "llx.day4.late";
  const state = JSON.parse(localStorage.getItem(KEY) || "{}");
  const banned = /\b(btc|eth|sol|xbt|usdt|10x|return|coinbase|kraken|phantom|hopper)\b/i;

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  const vote = document.querySelector("[data-gate-vote]");
  const why = document.querySelector("[data-gate-why]");
  const gatePhrase = document.querySelector("[data-gate-phrase]");
  const gateOut = document.querySelector("[data-gate-out]");
  const gateStatus = document.querySelector("[data-gate-status]");
  if (vote && state.vote) vote.value = state.vote;
  if (why && state.why) why.value = state.why;
  if (gateOut && state.gateText) gateOut.textContent = state.gateText;
  if (gateStatus && state.gateSealed) {
    gateStatus.textContent = "Version key sealed: " + state.vote + ".";
  }
  const gateBtn = document.querySelector("[data-gate-btn]");
  if (gateBtn) {
    gateBtn.addEventListener("click", function () {
      const v = vote ? vote.value : "";
      const line = why ? why.value.trim() : "";
      const phrase = gatePhrase ? gatePhrase.value.trim().toUpperCase() : "";
      if (phrase !== "KEEP VERSION A") {
        if (gateStatus) gateStatus.textContent = "Type KEEP VERSION A. B and C stay paper.";
        return;
      }
      if (v !== "A") {
        if (gateStatus) gateStatus.textContent = "Tonight the running desk is A. Mark A or walk away.";
        return;
      }
      if (!line) {
        if (gateStatus) gateStatus.textContent = "One sentence: why A still runs.";
        return;
      }
      if (banned.test(line)) {
        if (gateStatus) gateStatus.textContent = "Void. No venues, pairs, or return claims.";
        return;
      }
      const book = [
        "LYNXLOGIX.NET · VERSION KEY",
        "Saturday 12 September 2026 · 17:11 PDT",
        "running: Version A — Signal Concierge",
        "held: Version B — Multi-venue Paper Desk",
        "last: Version C — Dual-confirm Hopper",
        "why A: " + line,
        "human gate: required",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.vote = v;
      state.why = line;
      state.gateText = book;
      state.gateSealed = true;
      state.gateAt = new Date().toISOString();
      save();
      if (gateOut) gateOut.textContent = book;
      if (gateStatus) gateStatus.textContent = "Sealed. A runs. Carry to /sunday.html.";
    });
  }

  const rest = document.querySelector("[data-sun-rest]");
  const refuse = document.querySelector("[data-sun-refuse]");
  const sunPhrase = document.querySelector("[data-sun-phrase]");
  const sunOut = document.querySelector("[data-sun-out]");
  const sunStatus = document.querySelector("[data-sun-status]");
  if (rest && state.rest) rest.value = state.rest;
  if (refuse && state.sunRefuse) refuse.value = state.sunRefuse;
  if (sunOut && state.sunText) sunOut.textContent = state.sunText;
  if (sunStatus && state.sunSealed) {
    sunStatus.textContent = "Sunday is dark. No second ticket.";
  }
  const sunBtn = document.querySelector("[data-sun-btn]");
  if (sunBtn) {
    sunBtn.addEventListener("click", function () {
      const a = rest ? rest.value.trim() : "";
      const b = refuse ? refuse.value.trim() : "";
      const phrase = sunPhrase ? sunPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "SUNDAY STAYS DARK") {
        if (sunStatus) sunStatus.textContent = "Type SUNDAY STAYS DARK.";
        return;
      }
      if (!a || !b) {
        if (sunStatus) sunStatus.textContent = "Two lines. Rest, and refuse.";
        return;
      }
      if (banned.test(a + " " + b)) {
        if (sunStatus) sunStatus.textContent = "Void. Sunday is not a chart.";
        return;
      }
      const book = [
        "LYNXLOGIX.NET · SUNDAY DARK",
        "Saturday 12 September 2026 · 17:11 PDT",
        "sunday may: " + a,
        "sunday may not: " + b,
        "tickets allowed: 0",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.rest = a;
      state.sunRefuse = b;
      state.sunText = book;
      state.sunSealed = true;
      state.sunAt = new Date().toISOString();
      save();
      if (sunOut) sunOut.textContent = book;
      if (sunStatus) sunStatus.textContent = "Sealed. Walk to /walk.html. Do not fire a ticket.";
    });
  }

  const seen = document.querySelector("[data-walk-seen]");
  const next = document.querySelector("[data-walk-next]");
  const walkPhrase = document.querySelector("[data-walk-phrase]");
  const walkOut = document.querySelector("[data-walk-out]");
  const walkStatus = document.querySelector("[data-walk-status]");
  if (seen && state.seen) seen.value = state.seen;
  if (next && state.next) next.value = state.next;
  if (walkOut && state.walkText) walkOut.textContent = state.walkText;
  if (walkStatus && state.walkSealed) {
    walkStatus.textContent = "Evening walk sealed. Close the desk.";
  }
  const walkBtn = document.querySelector("[data-walk-btn]");
  if (walkBtn) {
    walkBtn.addEventListener("click", function () {
      const a = seen ? seen.value.trim() : "";
      const b = next ? next.value.trim() : "";
      const phrase = walkPhrase ? walkPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "WALK TO NIGHT") {
        if (walkStatus) walkStatus.textContent = "Type WALK TO NIGHT.";
        return;
      }
      if (!a || !b) {
        if (walkStatus) walkStatus.textContent = "Two lines. What you saw. What night inherits.";
        return;
      }
      if (banned.test(a + " " + b)) {
        if (walkStatus) walkStatus.textContent = "Void. No pair names on the walk.";
        return;
      }
      const book = [
        "LYNXLOGIX.NET · EVENING WALK",
        "Saturday 12 September 2026 · 17:11 PDT",
        "saw: " + a,
        "night inherits: " + b,
        "designs: 52–54",
        "version: A running",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.seen = a;
      state.next = b;
      state.walkText = book;
      state.walkSealed = true;
      state.walkAt = new Date().toISOString();
      save();
      if (walkOut) walkOut.textContent = book;
      if (walkStatus) walkStatus.textContent = "Sealed. Open /close.html. Type CLOSE THE DESK.";
    });
  }
})();
