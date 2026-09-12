(function () {
  const KEY = "llx.day4.saturday";
  const state = JSON.parse(localStorage.getItem(KEY) || "{}");

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  const a = document.querySelector('[data-treas="a"]');
  const b = document.querySelector('[data-treas="b"]');
  const tStatus = document.querySelector("[data-treas-status]");
  if (a && state.pileA) a.value = state.pileA;
  if (b && state.pileB) b.value = state.pileB;
  if (tStatus && state.sealed) tStatus.textContent = "Treasury split sealed on this browser.";

  const seal = document.querySelector('[data-treas="seal"]');
  if (seal) {
    seal.addEventListener("click", function () {
      state.pileA = a ? a.value.trim() : "";
      state.pileB = b ? b.value.trim() : "";
      state.sealed = true;
      state.sealedAt = new Date().toISOString();
      save();
      if (tStatus) tStatus.textContent = "Sealed. Product cash and paper sleeve stay named separately.";
    });
  }

  const phrase = document.querySelector("[data-one-phrase]");
  const note = document.querySelector("[data-one-note]");
  const status = document.querySelector("[data-one-status]");
  if (note && state.ticketNote) note.value = state.ticketNote;
  if (status && state.ticket) {
    status.textContent = "Saturday ticket already sealed: " + state.ticket + ". Lid is closed.";
  }

  document.querySelectorAll("[data-one]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (state.ticket) {
        if (status) status.textContent = "Lid closed. Design 32 allows one Saturday ticket.";
        return;
      }
      const gate = phrase ? phrase.value.trim().toUpperCase() : "";
      if (gate !== "PAPER ONLY") {
        if (status) status.textContent = "Type PAPER ONLY before a decision.";
        return;
      }
      state.ticket = btn.getAttribute("data-one");
      state.ticketNote = note ? note.value.trim() : "";
      state.ticketAt = new Date().toISOString();
      state.executed = false;
      save();
      if (status) status.textContent = "Sealed " + state.ticket + ". executed: false. Export the witness and stop.";
    });
  });
})();
