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
6. Saturday cap: one ticket only (`/one.html`). Seal the weekend on `/seal.html`.
7. Sunday: zero tickets (`/sunday.html`, `/window.html`). Rest is a control.
8. Treasury split (`/treasury.html`): product cash never recapitalizes the paper sleeve.
9. Domains bind to living Vercel projects (`/domains.html`). No seventh repo.
10. Seat the ten voices on `/orchestra.html` before the key.
11. Quiet desk on `/wealth.html` sells Mangasm+, not coins.
12. Planning book on `/book.html` stays labeled a model.
13. Rehearse the kill on `/rehearse.html` before you need it.
14. Witness the book on `/witness.html`.
15. Print the would-have on `/tape.html`. executed: false.
16. Send one concierge card from `/card.html`. No ticker in the copy.
17. Ring `/bell.html` at noon: CLOSE THE DESK or HOLD THE BELL once.
18. After noon, seal one sentence on `/after.html`.
19. Count Mangasm+ doors on `/doors.html`. Cap three.
20. Seat the evening watch on `/watch.html` with PAPER ONLY.
21. Dusk the book on `/dusk.html` with DUSK THE BOOK.
22. Constrain SuperClaude / OpenCode on `/opencode.html` with KEEP THE HOUSE.
23. Reserve one patron hour on `/hour.html`. No chart.
24. Seal Saturday on `/seal.html` with SEAL SATURDAY.
25. Write the sales liaison brief on `/sales.html` with SELL THE HOME.
26. Stamp venue readiness on `/ready.html` with KEYS STAY DARK.
27. Write Monday inherit on `/monday.html` with MONDAY INHERITS.
28. Seal one patron gift on `/gift.html` with GIFT THE HOUSE.
29. Stamp the till on `/till.html` with TILL THE HOUSE.
30. Seal the version key on `/gate.html` with KEEP VERSION A.
31. Seal Sunday dark on `/sunday.html` with SUNDAY STAYS DARK.
32. Walk to night on `/walk.html` with WALK TO NIGHT.
33. Light one lamp on `/lamp.html` with LIGHT THE LAMP.
34. Seal one velvet envelope on `/velvet.html` with SEAL THE VELVET.
35. Open one rebuild door on `/rebuild.html` with OPEN THE REBUILD.
36. Count the house at dawn on `/dawn.html` with COUNT THE HOUSE.
37. Keep the Sunday window dark on `/window.html` with KEEP THE WINDOW DARK.
38. Seat one patron breakfast on `/breakfast.html` with BREAKFAST THE HOUSE.
39. Carry the dawn on `/carry.html` with CARRY THE HOUSE.
40. Hush the venues on `/hush.html` with HUSH THE VENUES.
41. Lay patron linen on `/linen.html` with LAY THE LINEN.
42. End of session: Daily Close on /close.html. Type CLOSE THE DESK. Compose `/night.html`.

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
Day 4 09:18 — 31 House Treasury Split, 32 Single Paper Ticket, 33 Domain Binding Law
Day 4 10:18 — 34 Ten-Bot Score, 35 UHNW Quiet Desk, 36 Planning Book Seal
Day 4 11:08 — 37 Paper Tape, 38 Concierge Card, 39 Noon Bell
Day 4 12:05 — 40 After-Bell Receipt, 41 Patron Door Count, 42 Evening Watch
Day 4 13:00 — 43 Dusk After-Action, 44 SuperClaude / OpenCode Room, 45 One Patron Hour
Day 4 14:15 — 46 Saturday Seal, 47 Sales Liaison Brief, 48 Venue Readiness Card
Day 4 16:15 — 49 Monday Inherit, 50 Patron Gift, 51 House Till
Day 4 17:11 — 52 Version Key, 53 Sunday Dark, 54 Evening Walk
Day 4 18:19 — 55 Night Lamp, 56 Velvet Envelope, 57 Rebuild Door
Day 5 09:21 — 58 Dawn Census, 59 Dark Window, 60 Patron Breakfast
Day 5 10:11 — 61 Sunday Carry, 62 Venue Hush, 63 Patron Linen

## Shared risk box

- Max 0.25–1.00% equity per ticket until 30 paper days exist
- Daily loss stop pauses new tickets
- Saturday hard cap: one ticket
- Sunday: zero tickets
- Kill switch is a single “desk closed” flag plus the Daily Close phrase
- Noon bell: CLOSE THE DESK or one HOLD THE BELL
- After-bell: one sentence, no pair
- Door count: three Mangasm+ marks, then stop
- Dusk book: three lines, phrase DUSK THE BOOK
- OpenCode: phrase KEEP THE HOUSE, no third repo
- Patron hour: one reserved conversation, no chart
- Saturday seal: phrase SEAL SATURDAY
- Sales brief: phrase SELL THE HOME, no ticker
- Venue card: phrase KEYS STAY DARK
- Monday inherit: phrase MONDAY INHERITS
- Patron gift: phrase GIFT THE HOUSE, no chart
- House till: phrase TILL THE HOUSE
- Version key: phrase KEEP VERSION A
- Sunday dark: phrase SUNDAY STAYS DARK
- Evening walk: phrase WALK TO NIGHT
- Night lamp: phrase LIGHT THE LAMP
- Velvet envelope: phrase SEAL THE VELVET
- Rebuild door: phrase OPEN THE REBUILD
- Dawn census: phrase COUNT THE HOUSE
- Dark window: phrase KEEP THE WINDOW DARK
- Patron breakfast: phrase BREAKFAST THE HOUSE
- Sunday carry: phrase CARRY THE HOUSE
- Venue hush: phrase HUSH THE VENUES
- Patron linen: phrase LAY THE LINEN
- No market-order language on first live week if you later add a private execution worker
- Record every “would have” fill in paper for 30 days before considering a private execution worker
- Product revenue (Mangasm+, Coexist StoreKit) never tops up the paper sleeve mid-drawdown

## Honest meaning of “sell 10x”

Use it as **throughput of reviewed tickets** and **quality of briefs**, not as a return claim. Advertising 10x profit is how desks become defendants.

## House sales law

Every hallway ends at Mangasm+ or a house gift. LynxLogix.NET does not sell coins.

## Repo law

Do not open a fourth landing repository while lynxlogix-net, house-landings, and lynxlogix-house are alive. Upgrade the hallway. Point custom domains at the existing Vercel projects on GothamGanesh or COEXIST iNTeLLiGeNCE.
