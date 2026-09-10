const { list } = require("../lib/inbox");

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "GET") return res.status(405).json({ ok: false });
  return res.status(200).json({
    ok: true,
    paper: true,
    count: list().length,
    signals: list(),
    note: "Warm-instance inbox. Cold starts empty until the next webhook. Desk merges into local ledger."
  });
};
