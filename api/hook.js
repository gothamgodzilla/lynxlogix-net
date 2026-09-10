const { push, normalize } = require("../lib/inbox");

function readKey(req) {
  const q = req.query || {};
  const header = req.headers["x-lynx-key"] || req.headers["x-webhook-key"] || "";
  return String(q.key || q.k || header || "").trim();
}

function allowed(key) {
  const expected = process.env.LYNX_HOOK_KEY;
  if (expected) return key === expected;
  return key === "paper";
}

function parseBody(req) {
  if (!req.body) return {};
  if (typeof req.body === "object") return req.body;
  if (typeof req.body === "string") {
    const text = req.body.trim();
    if (!text) return {};
    try { return JSON.parse(text); } catch (_) {
      return { message: text };
    }
  }
  return {};
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-lynx-key");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      error: "POST only",
      hint: "TradingView Alert → Webhook URL → this path. Body is JSON. Query key required."
    });
  }
  const key = readKey(req);
  if (!allowed(key)) {
    return res.status(401).json({
      ok: false,
      error: "bad key",
      hint: "Set LYNX_HOOK_KEY on Vercel, or use ?key=paper while unset."
    });
  }
  const body = parseBody(req);
  const ticket = normalize(body, { source: body.source || "tradingview-webhook" });
  push(ticket);
  return res.status(200).json({
    ok: true,
    paper: true,
    executed: false,
    ticket
  });
};
