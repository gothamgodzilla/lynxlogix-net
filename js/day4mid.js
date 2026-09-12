(function () {
  const KEY = "llx.day4.mid";
  const state = JSON.parse(localStorage.getItem(KEY) || "{}");
  if (!state.chairs) state.chairs = { veto: true, scribe: true };

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  const pair = document.querySelector("[data-orch-pair]");
  const orchStatus = document.querySelector("[data-orch-status]");
  if (pair && state.pair) pair.value = state.pair;

  function paintChairs() {
    document.querySelectorAll("[data-chair]").forEach(function (card) {
      const id = card.getAttribute("data-chair");
      const on = !!state.chairs[id];
      card.style.borderColor = on ? "rgba(196,165,116,0.85)" : "";
    });
    document.querySelectorAll("[data-chair-toggle]").forEach(function (btn) {
      const id = btn.getAttribute("data-chair-toggle");
      btn.textContent = state.chairs[id] ? "Seated" : "Seat";
    });
  }

  document.querySelectorAll("[data-chair-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const id = btn.getAttribute("data-chair-toggle");
      state.chairs[id] = !state.chairs[id];
      save();
      paintChairs();
    });
  });

  const sealOrch = document.querySelector("[data-orch-seal]");
  if (sealOrch) {
    paintChairs();
    if (state.scoreSealed && orchStatus) {
      orchStatus.textContent = "Score sealed. Required chairs: risk veto, scribe. executed: false.";
    }
    sealOrch.addEventListener("click", function () {
      state.chairs.veto = true;
      state.chairs.scribe = true;
      state.pair = pair ? pair.value.trim() : "";
      state.scoreSealed = true;
      state.scoreAt = new Date().toISOString();
      save();
      if (orchStatus) orchStatus.textContent = "Score sealed for " + (state.pair || "unnamed paper pair") + ". Carry it to /one.html. Do not add a second Saturday ticket.";
      paintChairs();
    });
  }

  const who = document.querySelector("[data-wealth-who]");
  const note = document.querySelector("[data-wealth-note]");
  const wealthStatus = document.querySelector("[data-wealth-status]");
  if (who && state.who) who.value = state.who;
  if (note && state.wealthNote) note.value = state.wealthNote;
  if (wealthStatus && state.wealthSealed) {
    wealthStatus.textContent = "Quiet invite sealed for " + state.who + ".";
  }
  const wealthSeal = document.querySelector("[data-wealth-seal]");
  if (wealthSeal) {
    wealthSeal.addEventListener("click", function () {
      const name = who ? who.value.trim() : "";
      if (!name) {
        if (wealthStatus) wealthStatus.textContent = "Name the patron or house first.";
        return;
      }
      state.who = name;
      state.wealthNote = note ? note.value.trim() : "";
      state.wealthSealed = true;
      state.wealthAt = new Date().toISOString();
      save();
      if (wealthStatus) wealthStatus.textContent = "Sealed. Send Mangasm+ or the house pass. Do not attach a ticker.";
    });
  }

  const phrase = document.querySelector("[data-book-phrase]");
  const bookStatus = document.querySelector("[data-book-status]");
  const bookSeal = document.querySelector("[data-book-seal]");
  if (bookStatus && state.bookSealed) {
    bookStatus.textContent = "Planning book sealed on this browser. Hope is not cash.";
  }
  if (bookSeal) {
    bookSeal.addEventListener("click", function () {
      const gate = phrase ? phrase.value.trim().toUpperCase() : "";
      if (gate !== "PLANNING ONLY") {
        if (bookStatus) bookStatus.textContent = "Type PLANNING ONLY before the seal.";
        return;
      }
      state.bookSealed = true;
      state.bookAt = new Date().toISOString();
      save();
      if (bookStatus) bookStatus.textContent = "Sealed. MAR $12,600 / ARR ~$151k remains a model until exports replace the cells.";
    });
  }
})();
