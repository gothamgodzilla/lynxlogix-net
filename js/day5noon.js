(function () {
  const KEY = "llx.day5.noon";
  const state = JSON.parse(localStorage.getItem(KEY) || "{}");
  const banned = /\b(btc|eth|sol|xbt|usdt|10x|return|profit|addorder|private.key|seed|secret)\b/i;

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  const closed = document.querySelector("[data-silence-closed]");
  const itch = document.querySelector("[data-silence-itch]");
  const silencePhrase = document.querySelector("[data-silence-phrase]");
  const silenceOut = document.querySelector("[data-silence-out]");
  const silenceStatus = document.querySelector("[data-silence-status]");
  if (closed && state.closed) closed.value = state.closed;
  if (itch && state.itch) itch.value = state.itch;
  if (silenceOut && state.silenceText) silenceOut.textContent = state.silenceText;
  if (silenceStatus && state.silenceSealed) {
    silenceStatus.textContent = "Noon silence sealed. Hook stays dark.";
  }
  const silenceBtn = document.querySelector("[data-silence-btn]");
  if (silenceBtn) {
    silenceBtn.addEventListener("click", function () {
      const a = closed ? closed.value.trim() : "";
      const b = itch ? itch.value.trim() : "";
      const phrase = silencePhrase ? silencePhrase.value.trim().toUpperCase() : "";
      if (phrase !== "HOLD THE SILENCE") {
        if (silenceStatus) silenceStatus.textContent = "Type HOLD THE SILENCE.";
        return;
      }
      if (!a || !b) {
        if (silenceStatus) silenceStatus.textContent = "Two lines. What stayed closed. What asked to open.";
        return;
      }
      if (banned.test(a + " " + b)) {
        if (silenceStatus) silenceStatus.textContent = "Void. Silence is a clock, not a ticker.";
        return;
      }
      const book = [
        "LYNXLOGIX.NET · NOON SILENCE",
        "Sunday 13 September 2026 · 12:12 PDT",
        "still closed: " + a,
        "asked to open: " + b,
        "version: A running · B/C paper",
        "sunday tickets: 0",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.closed = a;
      state.itch = b;
      state.silenceText = book;
      state.silenceSealed = true;
      state.silenceAt = new Date().toISOString();
      save();
      if (silenceOut) silenceOut.textContent = book;
      if (silenceStatus) silenceStatus.textContent = "Sealed. Carry to /voices.html.";
    });
  }

  const pick = document.querySelector("[data-voices-pick]");
  const refuse = document.querySelector("[data-voices-refuse]");
  const voicesPhrase = document.querySelector("[data-voices-phrase]");
  const voicesOut = document.querySelector("[data-voices-out]");
  const voicesStatus = document.querySelector("[data-voices-status]");
  if (pick && state.voicesPick) pick.value = state.voicesPick;
  if (refuse && state.voicesRefuse) refuse.value = state.voicesRefuse;
  if (voicesOut && state.voicesText) voicesOut.textContent = state.voicesText;
  if (voicesStatus && state.voicesSealed) {
    voicesStatus.textContent = "Voices seated. None of them spend.";
  }
  const voicesBtn = document.querySelector("[data-voices-btn]");
  if (voicesBtn) {
    voicesBtn.addEventListener("click", function () {
      const a = pick ? pick.value.trim() : "";
      const b = refuse ? refuse.value.trim() : "";
      const phrase = voicesPhrase ? voicesPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "SEAT THE VOICES") {
        if (voicesStatus) voicesStatus.textContent = "Type SEAT THE VOICES.";
        return;
      }
      if (!a || !b) {
        if (voicesStatus) voicesStatus.textContent = "Two lines. Who sits first. What no voice may do.";
        return;
      }
      if (banned.test(a + " " + b)) {
        if (voicesStatus) voicesStatus.textContent = "Void. Do not paste secrets or promise returns.";
        return;
      }
      const card = [
        "LYNXLOGIX.NET · THREE VOICES",
        "Sunday 13 September 2026 · 12:12 PDT",
        "sits first: " + a,
        "forbidden: " + b,
        "roster: Scribe · Veto · Liaison",
        "spend rights: none",
        "sunday tickets: 0",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.voicesPick = a;
      state.voicesRefuse = b;
      state.voicesText = card;
      state.voicesSealed = true;
      state.voicesAt = new Date().toISOString();
      save();
      if (voicesOut) voicesOut.textContent = card;
      if (voicesStatus) voicesStatus.textContent = "Sealed. Carry to /spec.html.";
    });
  }

  const monday = document.querySelector("[data-spec-monday]");
  const specRefuse = document.querySelector("[data-spec-refuse]");
  const specPhrase = document.querySelector("[data-spec-phrase]");
  const specOut = document.querySelector("[data-spec-out]");
  const specStatus = document.querySelector("[data-spec-status]");
  if (monday && state.specMonday) monday.value = state.specMonday;
  if (specRefuse && state.specRefuse) specRefuse.value = state.specRefuse;
  if (specOut && state.specText) specOut.textContent = state.specText;
  if (specStatus && state.specSealed) {
    specStatus.textContent = "Spec sealed. SuperClaude stays in the house.";
  }
  const specBtn = document.querySelector("[data-spec-btn]");
  if (specBtn) {
    specBtn.addEventListener("click", function () {
      const a = monday ? monday.value.trim() : "";
      const b = specRefuse ? specRefuse.value.trim() : "";
      const phrase = specPhrase ? specPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "KEEP THE SPEC") {
        if (specStatus) specStatus.textContent = "Type KEEP THE SPEC.";
        return;
      }
      if (!a || !b) {
        if (specStatus) specStatus.textContent = "Two lines. Monday page. What agents must not touch.";
        return;
      }
      if (banned.test(a + " " + b)) {
        if (specStatus) specStatus.textContent = "Void. The spec is a leash, not a ticker.";
        return;
      }
      const letter = [
        "LYNXLOGIX.NET · SPEC GATE",
        "Sunday 13 September 2026 · 12:12 PDT",
        "monday inherit: " + a,
        "must not touch: " + b,
        "repos: lynxlogix-net · house-landings · lynxlogix-house",
        "superclaude / opencode: brainstorm only inside the house",
        "sunday tickets: 0",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.specMonday = a;
      state.specRefuse = b;
      state.specText = letter;
      state.specSealed = true;
      state.specAt = new Date().toISOString();
      save();
      if (specOut) specOut.textContent = letter;
      if (specStatus) specStatus.textContent = "Sealed. Rest. Monday inherits a closed desk.";
    });
  }
})();
