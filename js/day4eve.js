(function () {
  const KEY = "llx.day4.eve";
  const state = JSON.parse(localStorage.getItem(KEY) || "{}");
  const banned = /\b(btc|eth|sol|xbt|usdt|10x|return|coinbase|kraken|phantom|hopper)\b/i;

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  const inherit = document.querySelector("[data-mon-inherit]");
  const refuse = document.querySelector("[data-mon-refuse]");
  const first = document.querySelector("[data-mon-first]");
  const monPhrase = document.querySelector("[data-mon-phrase]");
  const monOut = document.querySelector("[data-mon-out]");
  const monStatus = document.querySelector("[data-mon-status]");
  if (inherit && state.inherit) inherit.value = state.inherit;
  if (refuse && state.refuse) refuse.value = state.refuse;
  if (first && state.first) first.value = state.first;
  if (monOut && state.monText) monOut.textContent = state.monText;
  if (monStatus && state.monSealed) {
    monStatus.textContent = "Monday inherit sealed. Version A still runs.";
  }
  const monBtn = document.querySelector("[data-mon-btn]");
  if (monBtn) {
    monBtn.addEventListener("click", function () {
      const a = inherit ? inherit.value.trim() : "";
      const b = refuse ? refuse.value.trim() : "";
      const c = first ? first.value.trim() : "";
      const gate = monPhrase ? monPhrase.value.trim().toUpperCase() : "";
      if (gate !== "MONDAY INHERITS") {
        if (monStatus) monStatus.textContent = "Type MONDAY INHERITS.";
        return;
      }
      if (!a || !b || !c) {
        if (monStatus) monStatus.textContent = "Three lines. Inherit, refuse, first hour.";
        return;
      }
      if (banned.test(a + " " + b + " " + c)) {
        if (monStatus) monStatus.textContent = "Void. Remove pairs, venues, and return claims.";
        return;
      }
      const book = [
        "LYNXLOGIX.NET · MONDAY INHERIT",
        "Saturday 12 September 2026 · 16:15 PDT",
        "inherits: " + a,
        "refuses: " + b,
        "first hour: " + c,
        "version: A running · B/C paper",
        "executed: false",
        "sealed: " + new Date().toISOString()
      ].join("\n");
      state.inherit = a;
      state.refuse = b;
      state.first = c;
      state.monText = book;
      state.monSealed = true;
      state.monAt = new Date().toISOString();
      save();
      if (monOut) monOut.textContent = book;
      if (monStatus) monStatus.textContent = "Sealed. Carry to /witness.html. Do not open a fourth repo.";
    });
  }

  const who = document.querySelector("[data-gift-who]");
  const what = document.querySelector("[data-gift-what]");
  const giftPhrase = document.querySelector("[data-gift-phrase]");
  const giftOut = document.querySelector("[data-gift-out]");
  const giftStatus = document.querySelector("[data-gift-status]");
  if (who && state.giftWho) who.value = state.giftWho;
  if (what && state.giftWhat) what.value = state.giftWhat;
  if (giftOut && state.giftText) giftOut.textContent = state.giftText;
  if (giftStatus && state.giftSealed) {
    giftStatus.textContent = "Gift sealed for " + state.giftWho + ". Cap is one Saturday gift.";
  }
  const giftBtn = document.querySelector("[data-gift-btn]");
  if (giftBtn) {
    giftBtn.addEventListener("click", function () {
      const name = who ? who.value.trim() : "";
      const line = what ? what.value.trim() : "";
      const gate = giftPhrase ? giftPhrase.value.trim().toUpperCase() : "";
      if (gate !== "GIFT THE HOUSE") {
        if (giftStatus) giftStatus.textContent = "Type GIFT THE HOUSE.";
        return;
      }
      if (!name || !line) {
        if (giftStatus) giftStatus.textContent = "Name the patron and the gift.";
        return;
      }
      if (banned.test(name + " " + line)) {
        if (giftStatus) giftStatus.textContent = "Void. The gift is texture, not a ticker.";
        return;
      }
      if (state.giftSealed) {
        if (giftStatus) giftStatus.textContent = "Saturday cap: one gift. Send it or stop.";
        return;
      }
      const note = [
        "LYNXLOGIX.NET · PATRON GIFT",
        name + ",",
        "",
        line,
        "",
        "This is not a trade. This is a room.",
        "Mangasm+: https://www.mangasm.app/plus",
        "Hour: https://lynxlogix-net.vercel.app/hour.html",
        "Pass: https://lynxlogix-net.vercel.app/pay.html",
        "",
        "- LynxLogix / Mangasm Enterprises"
      ].join("\n");
      state.giftWho = name;
      state.giftWhat = line;
      state.giftText = note;
      state.giftSealed = true;
      state.giftAt = new Date().toISOString();
      save();
      if (giftOut) giftOut.textContent = note;
      if (giftStatus) giftStatus.textContent = "Sealed. Send from /contact.html. Do not attach a chart.";
    });
  }

  const plus = document.querySelector("[data-till-plus]");
  const invoice = document.querySelector("[data-till-invoice]");
  const noSecrets = document.querySelector("[data-till-dark]");
  const tillPhrase = document.querySelector("[data-till-phrase]");
  const tillOut = document.querySelector("[data-till-out]");
  const tillStatus = document.querySelector("[data-till-status]");
  if (plus) plus.checked = !!state.plusLive;
  if (invoice) invoice.checked = !!state.invoicePath;
  if (noSecrets) noSecrets.checked = !!state.noSecrets;
  if (tillOut && state.tillText) tillOut.textContent = state.tillText;
  if (tillStatus && state.tillSealed) {
    tillStatus.textContent = "Till stamped. Live money today is Mangasm+.";
  }
  const tillBtn = document.querySelector("[data-till-btn]");
  if (tillBtn) {
    tillBtn.addEventListener("click", function () {
      const gate = tillPhrase ? tillPhrase.value.trim().toUpperCase() : "";
      if (gate !== "TILL THE HOUSE") {
        if (tillStatus) tillStatus.textContent = "Type TILL THE HOUSE.";
        return;
      }
      const flags = {
        plusLive: !!(plus && plus.checked),
        invoicePath: !!(invoice && invoice.checked),
        noSecrets: !!(noSecrets && noSecrets.checked)
      };
      const card = [
        "LYNXLOGIX.NET · HOUSE TILL",
        "Saturday 12 September 2026 · 16:15 PDT",
        "mangasm+ checkout reachable: " + flags.plusLive,
        "house gift invoice path: " + flags.invoicePath,
        "exchange secrets absent: " + flags.noSecrets,
        "live money door: Mangasm+",
        "house pass: local atelier key until Payment Link pasted",
        "executed: false",
        "stamped: " + new Date().toISOString()
      ].join("\n");
      state.plusLive = flags.plusLive;
      state.invoicePath = flags.invoicePath;
      state.noSecrets = flags.noSecrets;
      state.tillText = card;
      state.tillSealed = true;
      state.tillAt = new Date().toISOString();
      save();
      if (tillOut) tillOut.textContent = card;
      if (tillStatus) {
        tillStatus.textContent = flags.plusLive && flags.invoicePath && flags.noSecrets
          ? "Till honest. Product cash is Mangasm+. Desk paper stays paper."
          : "Stamp only what is true. Do not invent a second checkout.";
      }
    });
  }
})();
