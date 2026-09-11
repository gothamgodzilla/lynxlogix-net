# Three turnkey desk versions

All three share the same law: **signals may be automatic. Money may not.**

No version below stores a seed phrase, signs a Phantom transaction unattended, or places a live Coinbase/Kraken order from this website.

## Version A — Signal Concierge (ship first · still running)

Flow

1. TradingView alert → HTTPS webhook → queue
2. Grok bot writes a one-page ticket: pair, side, size as % of equity, invalidation, why-now, why-not
3. You receive the ticket (site desk + email/automation)
4. Human types PAPER ONLY, then taps Approve paper / Reject / Hold
5. Ledger appends. No live order.
6. End of session: Daily Close on /close.html. Type CLOSE THE DESK.

Why it wins: one integration, visible gate, you already know the logic.

Do not build yet: exchange execution, smart-order routing.

## Version B — Multi-venue Paper Desk

Same tickets as A, plus read-only or paper adapters:

- Coinbase Advanced: balances + fills as *read* once API keys live in a private worker — never in the static site
- Kraken: same pattern
- Phantom / Kraken Wallet: watch addresses only. Display. Never request a signature from a bot.

Grok bots (roles, not 10 unsupervised spenders)

1. Ingestor
2. Regime
3. Risk veto
4. Sizer
5. Scribe
6. Devil’s advocate
7. Compliance tone
8. Mangasm sales liaison (never trades)
9. Night watch (alerts only)
10. Post-trade journal

All ten may speak. Only the human key releases.

## Version C — Dual-confirm Hopper

CryptoHopper or a Pine script may raise a flag.

Release requires:

- Script flag
- Grok risk bot does not veto
- Human approve (plus PAPER ONLY on this build)

If any one is missing, the ticket dies.

## Design ledger

Day 2 — 04 Morning Board, 05 Dual-Phrase Gate, 06 Patron Hallway
Day 3 morning — 07 Venue Passport, 08 Family Office Packet, 09 Quiet Room
Day 3 afternoon — 10 Daily Close, 11 Thirty-Day Paper Scoreboard, 12 Salon Night

## Shared risk box

- Max 0.25–1.00% equity per ticket until 30 paper days exist
- Daily loss stop pauses new tickets
- Kill switch is a single “desk closed” flag plus the Daily Close phrase
- No market-order language on first live week if you later add a private execution worker
- Record every “would have” fill in paper for 30 days before considering a private execution worker

## Honest meaning of “sell 10x”

Use it as **throughput of reviewed tickets** and **quality of briefs**, not as a return claim. Advertising 10x profit is how desks become defendants.
