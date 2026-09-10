const g = globalThis;
if (!g.__lynxInbox) g.__lynxInbox = [];

function list() {
  return g.__lynxInbox;
}

function push(ticket) {
  g.__lynxInbox.unshift(ticket);
  if (g.__lynxInbox.length > 200) g.__lynxInbox.length = 200;
  return ticket;
}

function normalize(body, meta) {
  const raw = body && typeof body === "object" ? body : {};
  const pair = String(raw.pair || raw.ticker || raw.symbol || "UNKNOWN").toUpperCase();
  const action = String(raw.side || raw.action || raw.order || raw.strategy || "hold").toLowerCase();
  let side = "hold";
  if (["buy", "long", "enterlong", "cover"].some((w) => action.includes(w))) side = "buy";
  if (["sell", "short", "entershort", "exit"].some((w) => action.includes(w))) side = "sell";
  const size = String(raw.size || raw.qty || "0.25%");
  const venue = String(raw.venue || "paper / unassigned");
  const source = String(raw.source || meta.source || "webhook");
  const reason = String(raw.reason || raw.comment || raw.message || raw.text || "Inbound signal. Human must decide.");
  const id = `WH-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`.toUpperCase();
  return {
    id,
    source,
    pair,
    side,
    venue,
    size,
    price: raw.price || raw.close || null,
    reason,
    risk: "Paper ticket only. No live order. Cap remains a percent of equity. Human gate required.",
    status: "awaiting human",
    receivedAt: new Date().toISOString(),
    paper: true
  };
}

module.exports = { list, push, normalize };
