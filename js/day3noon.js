(function () {
  const REHEARSE_KEY = "lynxlogix.rehearse.v1";

  function loadDrills() {
    try {
      return JSON.parse(localStorage.getItem(REHEARSE_KEY) || "[]");
    } catch (_) {
      return [];
    }
  }

  function saveDrills(list) {
    localStorage.setItem(REHEARSE_KEY, JSON.stringify(list.slice(0, 40)));
  }

  function rehearseOk() {
    const input = document.querySelector("[data-rehearse-phrase]");
    return input && String(input.value || "").trim().toUpperCase() === "REHEARSE THE KILL";
  }

  function renderRehearse() {
    const status = document.querySelector("[data-rehearse-status]");
    const logRoot = document.querySelector("[data-rehearse-log]");
    if (status) {
      status.textContent = rehearseOk()
        ? "Phrase accepted — you may log the drill."
        : "Type REHEARSE THE KILL.";
    }
    if (!logRoot) return;
    const drills = loadDrills();
    if (!drills.length) {
      logRoot.innerHTML = '<article class="card"><div class="tiny">Book</div><h3>No drills yet</h3><p class="muted">Wealth rehearses before the red day.</p></article>';
      return;
    }
    logRoot.innerHTML = drills
      .slice(0, 6)
      .map(
        (d) =>
          `<article class="card"><div class="tiny">${d.at}</div><h3>${d.ok ? "Drill logged" : "Blocked"}</h3><p class="muted">${d.note}</p></article>`
      )
      .join("");
  }

  function handleRehearseClick(e) {
    const btn = e.target.closest("[data-rehearse]");
    if (!btn) return;
    const status = document.querySelector("[data-rehearse-status]");
    const drills = loadDrills();
    if (!rehearseOk()) {
      drills.unshift({
        at: new Date().toISOString(),
        ok: false,
        note: "Blocked — phrase missing. A forgotten switch is not luxury."
      });
      saveDrills(drills);
      if (status) status.textContent = "Blocked — type REHEARSE THE KILL.";
      renderRehearse();
      return;
    }
    drills.unshift({
      at: new Date().toISOString(),
      ok: true,
      note: "Kill switch rehearsed. Desk not sealed. Close separately if the day is done."
    });
    saveDrills(drills);
    try {
      const deskRaw = localStorage.getItem("lynxlogix.desk.v3");
      if (deskRaw) {
        const desk = JSON.parse(deskRaw);
        desk.log = desk.log || [];
        desk.log.unshift(new Date().toISOString() + " REHEARSE kill-switch drill — desk not sealed");
        localStorage.setItem("lynxlogix.desk.v3", JSON.stringify(desk));
      }
    } catch (_) {}
    if (status) status.textContent = "Drill logged. Desk still open unless you close it.";
    renderRehearse();
    if (typeof renderScore === "function") renderScore();
  }

  function composePack(data) {
    const pair = data.pair || "BTC-USD";
    const side = data.side || "buy";
    const venue = data.venue || "paper";
    const source = data.source || "TradingView webhook";
    const note = data.note || "";
    return `You are the LynxLogix.NET ten-voice desk. Paper first. Human last.
Law: you may write. You may veto. You may not place a live Coinbase or Kraken order, sign a Phantom or Kraken Wallet transaction, request a seed phrase, or promise a return.

TICKET STUB
- Pair: ${pair}
- Claimed side: ${side}
- Venue: ${venue}
- Source: ${source}
- Raw note: ${note}

Write exactly ten labeled sections, short, tired-human readable:

01 INGESTOR — normalize the stub into {id, pair, side, venue, sizePct, invalidation, whyNow, whyNot}.
02 REGIME — name weather: trend / range / chaos. If chaos, size collapses toward 0.
03 RISK VETO — pass or veto. Crowding, correlation to any open paper book, gap risk.
04 SIZER — size as 0.25–1.00% of equity only. No all-in. No martingale.
05 SCRIBE — one-page brief: pair, side, why-now, why-not, invalidation, venue.
06 DEVIL — three sentences against the ticket. If you cannot, the ticket is fashion.
07 COMPLIANCE — strip “guaranteed”, “10x profit”, “can’t lose”, advice-to-the-public voice.
08 LIAISON — after the decision, the living product is Mangasm+ at https://www.mangasm.app/plus — never a coin.
09 NIGHT WATCH — what would wake a human. What must never auto-fill at 03:00.
10 JOURNAL — one line the human will log: APPROVE paper / REJECT / HOLD. executed: false.

End with a single recommendation line:
RECOMMEND: APPROVE PAPER | REJECT | HOLD
and the sentence: “No live order is routed until a human types PAPER ONLY on the desk.”`;
  }

  function handleBriefSubmit(e) {
    const form = e.target.closest("[data-brief-form]");
    if (!form || e.type !== "submit") return;
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const pack = composePack(data);
    const out = document.querySelector("[data-brief-out]");
    const status = document.querySelector("[data-brief-status]");
    if (out) out.value = pack;
    if (status) status.textContent = "Pack ready · paper · not executed";
    localStorage.setItem(
      "lynxlogix.brief.v1",
      JSON.stringify({ at: new Date().toISOString(), stub: data })
    );
  }

  function handleBriefCopy(e) {
    const btn = e.target.closest("[data-brief-copy]");
    if (!btn) return;
    const out = document.querySelector("[data-brief-out]");
    if (!out || !out.value) return;
    navigator.clipboard.writeText(out.value).then(
      () => {
        const status = document.querySelector("[data-brief-status]");
        if (status) status.textContent = "Copied. Paste into Grok. Then decide on the desk.";
      },
      () => {
        out.select();
        document.execCommand("copy");
      }
    );
  }

  document.addEventListener("DOMContentLoaded", () => {
    const phrase = document.querySelector("[data-rehearse-phrase]");
    if (phrase) {
      phrase.addEventListener("input", renderRehearse);
      renderRehearse();
    }
  });
  document.body.addEventListener("click", (e) => {
    handleRehearseClick(e);
    handleBriefCopy(e);
  });
  document.body.addEventListener("submit", handleBriefSubmit);
})();
