# Version A webhook

Paper tickets only. The hook never talks to Coinbase, Kraken, or Phantom.

## URL

```
POST https://lynxlogix-net-gothamganesh.vercel.app/api/hook?key=paper
```

After you set `LYNX_HOOK_KEY` in Vercel → Project → Settings → Environment Variables, replace `paper` with that value. Send the same value as header `x-lynx-key` if you prefer not to put it in the query string.

## TradingView message

Alert → Notifications → Webhook URL. Message body:

```json
{
  "source": "tradingview",
  "pair": "{{ticker}}",
  "side": "{{strategy.order.action}}",
  "price": "{{close}}",
  "comment": "{{strategy.order.comment}}"
}
```

`side` may be `buy`, `sell`, `long`, `short`. Anything else becomes `hold`.

## Prove it without TradingView

From the desk page use **Fire test signal**, or curl. Then open `/desk.html`. The desk polls `/api/signals` and merges new ids into the human ledger.

## What this will not do

- Place an order
- Sign a wallet
- Survive every serverless cold start (tickets also save in the browser once seen)
- Accept traffic if `LYNX_HOOK_KEY` is set and the request key is wrong
