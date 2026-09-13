(function () {
  const KEY = "llx.day5.pm";
  const state = JSON.parse(localStorage.getItem(KEY) || "{}");
  const banned = /\b(btc|eth|sol|xbt|usdt|10x|return|profit|addorder|private.key|seed|secret)\b/i;

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  const held = document.querySelector("[data-afternoon-held]");
  const itch = document.querySelector("[data-afternoon-itch]");
  const afternoonPhrase = document.querySelector("[data-afternoon-phrase]");
  const afternoonOut = document.querySelector("[data-afternoon-out]");
  const afternoonStatus = document.querySelector("[data-afternoon-status]");
  if (held && state.held) held.value = state.held;
  if (itch && state.itch) itch.value = state.itch;
  if (afternoonOut && state.afternoonText) afternoonOut.textContent = state.afternoonText;
  if (afternoonStatus && state.afternoonSealed) {
    afternoonStatus.textContent = "Afternoon sealed. Hook stays dark.";
  }
  const afternoonBtn = document.querySelector("[data-afternoon-btn]");
  if (afternoonBtn) {
    afternoonBtn.addEventListener("click", function () {
      const a = held ? held.value.trim() : "";
      const b = itch ? itch.value.trim() : "";
      const phrase = afternoonPhrase ? afternoonPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "KEEP THE AFTERNOON") {
        if (afternoonStatus) afternoonStatus.textContent = "Type KEEP THE AFTERNOON.";
        return;
      }
      if (!a || !b) {
        if (afternoonStatus) afternoonStatus.textContent = "Two lines. What held. What asked again.";
        return;
      }
      if (banned.test(a + " " + b)) {
        if (afternoonStatus) afternoonStatus.textContent = "Void. Afternoon is a clock, not a ticker.";
        return;
      }
      const book = [
        "LYNXLOGIX.NET · AFTERNOON RECEIPT",
        "Sunday 13 September 2026 · 13:15 PDT",
        "still held: " + a,
        "asked again: " + b,
        "version: A running · B/C paper",
        "sunday tickets: 0",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.held = a;
      state.itch = b;
      state.afternoonText = book;
      state.afternoonSealed = true;
      state.afternoonAt = new Date().toISOString();
      save();
      if (afternoonOut) afternoonOut.textContent = book;
      if (afternoonStatus) afternoonStatus.textContent = "Sealed. Carry to /tea.html.";
    });
  }

  const courtesy = document.querySelector("[data-tea-courtesy]");
  const door = document.querySelector("[data-tea-door]");
  const teaPhrase = document.querySelector("[data-tea-phrase]");
  const teaOut = document.querySelector("[data-tea-out]");
  const teaStatus = document.querySelector("[data-tea-status]");
  if (courtesy && state.courtesy) courtesy.value = state.courtesy;
  if (door && state.door) door.value = state.door;
  if (teaOut && state.teaText) teaOut.textContent = state.teaText;
  if (teaStatus && state.teaSealed) {
    teaStatus.textContent = "Tea sealed. Chart stays outside.";
  }
  const teaBtn = document.querySelector("[data-tea-btn]");
  if (teaBtn) {
    teaBtn.addEventListener("click", function () {
      const a = courtesy ? courtesy.value.trim() : "";
      const b = door ? door.value.trim() : "";
      const phrase = teaPhrase ? teaPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "POUR THE TEA") {
        if (teaStatus) teaStatus.textContent = "Type POUR THE TEA.";
        return;
      }
      if (!a || !b) {
        if (teaStatus) teaStatus.textContent = "Two lines. Courtesy. Sales door.";
        return;
      }
      if (banned.test(a + " " + b)) {
        if (teaStatus) teaStatus.textContent = "Void. No coins on the saucer.";
        return;
      }
      const card = [
        "LYNXLOGIX.NET · PATRON TEA",
        "Sunday 13 September 2026 · 13:15 PDT",
        "courtesy: " + a,
        "door: " + b,
        "product: Mangasm+",
        "coins sold: none",
        "sunday tickets: 0",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.courtesy = a;
      state.door = b;
      state.teaText = card;
      state.teaSealed = true;
      state.teaAt = new Date().toISOString();
      save();
      if (teaOut) teaOut.textContent = card;
      if (teaStatus) teaStatus.textContent = "Sealed. Carry to /inherit.html.";
    });
  }

  const page = document.querySelector("[data-inherit-page]");
  const refuse = document.querySelector("[data-inherit-refuse]");
  const inheritPhrase = document.querySelector("[data-inherit-phrase]");
  const inheritOut = document.querySelector("[data-inherit-out]");
  const inheritStatus = document.querySelector("[data-inherit-status]");
  if (page && state.inheritPage) page.value = state.inheritPage;
  if (refuse && state.inheritRefuse) refuse.value = state.inheritRefuse;
  if (inheritOut && state.inheritText) inheritOut.textContent = state.inheritText;
  if (inheritStatus && state.inheritSealed) {
    inheritStatus.textContent = "Inherit locked. Monday gets one page.";
  }
  const inheritBtn = document.querySelector("[data-inherit-btn]");
  if (inheritBtn) {
    inheritBtn.addEventListener("click", function () {
      const a = page ? page.value.trim() : "";
      const b = refuse ? refuse.value.trim() : "";
      const phrase = inheritPhrase ? inheritPhrase.value.trim().toUpperCase() : "";
      if (phrase !== "LOCK THE INHERIT") {
        if (inheritStatus) inheritStatus.textContent = "Type LOCK THE INHERIT.";
        return;
      }
      if (!a || !b) {
        if (inheritStatus) inheritStatus.textContent = "Two lines. Monday page. What agents must not touch.";
        return;
      }
      if (banned.test(a + " " + b)) {
        if (inheritStatus) inheritStatus.textContent = "Void. The lock is a leash, not a ticker.";
        return;
      }
      const letter = [
        "LYNXLOGIX.NET · INHERIT LOCK",
        "Sunday 13 September 2026 · 13:15 PDT",
        "monday page: " + a,
        "must not touch: " + b,
        "repos: lynxlogix-net · house-landings · lynxlogix-house",
        "superclaude / opencode: brainstorm only inside the house",
        "sunday tickets: 0",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.inheritPage = a;
      state.inheritRefuse = b;
      state.inheritText = letter;
      state.inheritSealed = true;
      state.inheritAt = new Date().toISOString();
      save();
      if (inheritOut) inheritOut.textContent = letter;
      if (inheritStatus) inheritStatus.textContent = "Sealed. Rest. Monday inherits a closed desk.";
    });
  }
})();
