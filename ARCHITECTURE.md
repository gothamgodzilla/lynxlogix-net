# Three turnkey desk versions

All three share the same law: **signals may be automatic. Money may not.**

No version below stores a seed phrase, signs a Phantom transaction unattended, or places a live Coinbase/Kraken order from this website.

## Version A — Signal Concierge (ship first · still running)

Flow

1. TradingView alert → HTTPS webhook → queue (`/grammar.html` is the payload recipe)
2. Brief Factory (`/brief.html`) or Grok bot writes a one-page ticket: pair, side, size as % of equity, invalidation, why-now, why-not
3. You receive the ticket (site desk + email/automation)
4. Human types PAPER ONLY, then taps Approve paper / Reject / Hold
5. Ledger appends. No live order.
6. Rehearse the kill on `/rehearse.html` before you need it.
7. Witness the book on `/witness.html` (JSON + family-office card).
8. Steward the blocks on `/steward.html`.
9. Time the gap on `/clock.html`.
10. End of session: Daily Close on /close.html. Type CLOSE THE DESK. Compose `/night.html`.
11. Pre-write the next day on `/saturday.html` so the house does not spawn another repo.
12. Audit dusk against facts on `/audit.html`.
13. Write one patron letter on `/letter.html` — the only checkout is Mangasm+.
14. Dry-run venues on `/dryrun.html` without keys.
15. Seal a family-office mandate on `/mandate.html`.
16. Invite one room on `/invite.html`.

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
Day 3 noon — 13 Brief Factory, 14 Kill-Switch Rehearsal, 15 One Money Door
Day 3 13:03 — 16 Witness Dossier, 17 Cathedral Card, 18 Proven vs Planned
Day 3 14:02 — 19 Session Steward, 20 Night Ledger, 21 One Hallway
Day 3 16:01 — 22 Patron Primer, 23 Decision Clock, 24 Saturday Board
Day 3 17:10 — 25 Evening Audit, 26 Patron Letter, 27 Dry-Run Passport
Day 3 18:16 — 28 Family Office Mandate, 29 Rebuild Invitation, 30 Signal Grammar

## Shared risk box

- Max 0.25–1.00% equity per ticket until 30 paper days exist
- Daily loss stop pauses new tickets
- Kill switch is a single “desk closed” flag plus the Daily Close phrase
- Monthly rehearsal of the kill is required texture, not optional theater
- No market-order language on first live week if you later add a private execution worker
- Record every “would have” fill in paper for 30 days before considering a private execution worker

## Honest meaning of “sell 10x”

Use it as **throughput of reviewed tickets** and **quality of briefs**, not as a return claim. Advertising 10x profit is how desks become defendants.

## House sales law

Every hallway ends at Mangasm+ or a house gift. LynxLogix.NET does not sell coins.

## Repo law

Do not open a third landing repository while lynxlogix-net and house-landings are alive. Upgrade the hallway. Point custom domains at the existing Vercel projects on the GothamGanesh team.
